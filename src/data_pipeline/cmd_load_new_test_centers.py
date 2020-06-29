import csv
import os
import importlib
import click
import sys
import signal
from helpers import preprocessing_utils, gtc_auth, gtc_api_helpers, gmaps_utils, aws_utils, test_center_csv, gtc_merge_logic, file_utils
from helpers.cache import Cache
from dotenv import load_dotenv
from termcolor import colored
import datetime

load_dotenv(override=True)
REC_PROD_GTC_API_URL = 'https://api.get-tested-covid19.org'
GTC_AWS_ACCOUNT_ID = '496778160066'

GTC_API_URL = REC_PROD_GTC_API_URL
if os.getenv('GTC_API_URL') != None:
    GTC_API_URL = os.getenv('GTC_API_URL')

GMAPS_API_KEY = os.getenv('GOOGLE_API_KEY')

THIS_DIR = os.path.dirname(os.path.abspath(__file__))
LOGS_PATH = os.path.join(THIS_DIR, 'logs')

def print_startup_messaging():
    print('The following are required to use this utility: \n' +
    '1. An AWS Account with our organization (GTC). The credentials should be setup in your ~/.aws/profile.\n' +
    '2. A working Google Maps API key with the geolocation API enabled. This should be in your .env file, see .env.sample for naming. \n' +
    '3. Valid credentials for the GTC production API\n\n')

def validate_credentials(): 
    
    if(GTC_API_URL != REC_PROD_GTC_API_URL):
        print(colored('WARNING: You are currently using API URL: ' + GTC_API_URL, 'yellow'))
        print(colored('If you are uploading new test centers, use the production API: ' + REC_PROD_GTC_API_URL, 'yellow'))
        print(colored('If you are developing new code, it is OK to use a localhost or staging API for testing purposes.', 'yellow'))
    else:
        print(colored('You are using the correct API URL: ' + GTC_API_URL, 'green'))

    gmaps_key_valid = gmaps_utils.check_gmaps_key_valid(GMAPS_API_KEY)
    if(gmaps_key_valid == False):
        raise Exception('Your Google Maps API key stored at GOOGLE_API_KEY in the .env file is invalid.')
    else:
        print(colored('\nYour Google Maps key is working correctly!\n', 'green'))

    aws_ident = aws_utils.get_loaded_aws_account_info()
    if(aws_ident != GTC_AWS_ACCOUNT_ID):
        print(colored('The AWS account you are loading is incorrect. Your Account ID is: ' + aws_ident + ' . Please adjust your profile to use account ID: ' + GTC_AWS_ACCOUNT_ID + '\n\n', 'red'))
        raise Exception('Invalid AWS credentials')
    else:
        print(colored('Your AWS account ID is correct: ' + aws_ident + '\n\n', 'green'))

def pretty_print_results(dump_obj, job_handle, staging_s3_diff_obj_handle, master_s3_diff_obj_handle, job_local_path):
    print('Proposed test center rows to be added to UnverifiedTestCenters table: ', dump_obj['post_processing_stats']['unmatched_row_count'])
    print('Rows: ')
    
    unmatched_rows = dump_obj['post_processing_stats']['unmatched_rows']
    #for row in unmatched_rows:
    #    print('Staging ID: ', row['id'], ' Name: ', row['name'], ' OrigAddr: ', row['address'], ' FormtAddr: ', row['formatted_address_obj']['formatted_address'])

    print(colored('The full diff object can be found on your local filesystem at: ' + job_local_path, 'green'))
    print('Please examine this local file. The test centers to be added to the database are in post_processing_stats.unmatched_rows. Please ensure these look correct.\n')

    print('NOTE: The diff object is also uploaded to S3, where it will be loaded by our system when your code is merged to staging/master branches.')
    print('During the code review process, your reviewer should access this file on S3 and review the contents to make sure the merge is reasonable.\n\n')

    print(colored('NOTE: These changes have not been added to the database. To upload your changes, do the following:', 'red'))
    print('1. Create a new branch on the main repository (not a fork), and create a pull request called "WIP: Data Merge"')
    print('2. Add the following key to the BOTTOM of the array in the CHRONOLOGICAL_DIFF_KEYS file: ', colored(job_handle, 'green'))
    print('3. Request a code review from a project maintainer. Once your PR is merged to staging/master, the data will be deployed to those respective environments in the UnverifiedTestCenters table.')

def get_current_datetime_formatted():
    current_dt = datetime.datetime.now()
    return current_dt.strftime("%Y%m%d%H%M%S")

def run_diff(staging_test_center_rows, merge_fill_blanks, gtc_auth_token, app_cache):

    def normalize_test_center_rows(rows):
        normalized_rows = [normalize_test_center_row(row) for row in rows]
        return normalized_rows

    def normalize_test_center_row(row):
        google_place_id = None
        if 'google_place_id' in row:
            google_place_id = row['google_place_id']

        row['formatted_address_obj'] = preprocessing_utils.get_formatted_address(row['address'], app_cache=app_cache, google_place_id=google_place_id)
        return row

    # Create diff obj - calculate which new test centers will be added to Unverified table.
    get_gtc_verified_test_centers = gtc_api_helpers.generate_gtc_get_request(GTC_API_URL,  "/api/v1/internal/verified-test-centers/", gtc_auth_token, normalize_test_center_rows)
    get_gtc_unverified_test_centers = gtc_api_helpers.generate_gtc_get_request(GTC_API_URL,  "/api/v1/internal/unverified-test-centers/", gtc_auth_token, normalize_test_center_rows)
    verified_test_center_rows = get_gtc_verified_test_centers()
    unverified_test_center_rows = get_gtc_unverified_test_centers()
    normalized_staging_test_center_rows = normalize_test_center_rows(staging_test_center_rows)

    print('Database contains Unverified Test Centers: ', len(unverified_test_center_rows), ' , Verified Test Centers: ', len(verified_test_center_rows))
    print('Generating diff... (this may take a moment)\n\n')

    merge_diff = gtc_merge_logic.generate_unverified_update_diff_obj(normalized_staging_test_center_rows, unverified_test_center_rows, verified_test_center_rows, merge_fill_blanks)
    current_dt = get_current_datetime_formatted()
    job_handle = 'su_' + current_dt + '_report.json'

    # Put results to S3
    staging_s3_diff_obj_handle, master_s3_diff_obj_handle = aws_utils.put_diff_dump_to_s3(job_handle, merge_diff)
    
    # Write results to local /logs folder, for easy access/review
    job_local_path = os.path.join(LOGS_PATH, job_handle)
    file_utils.write_json_outfile(job_local_path, merge_diff)

    # Print short summary of results
    pretty_print_results(merge_diff, job_handle, staging_s3_diff_obj_handle, master_s3_diff_obj_handle, job_local_path)

def run_standard_workflow(csv_file, gtc_auth_token, app_cache):

    # Load and process CSV:
    test_center_rows = test_center_csv.load_valid_csv_rows(csv_file)
    print(colored('loaded: ' + str(len(test_center_rows)) + ' test center rows from CSV.\n', 'green'))
    print(test_center_rows)

    # Insert to Inbounds
    print('Inserting to Inbounds table...')
    post_gtc_inbound = gtc_api_helpers.generate_gtc_post_request(GTC_API_URL, "/api/v1/internal/inbound/", gtc_auth_token)
    inbounds_test_center_rows = gtc_api_helpers.submit_test_centers_to_inbounds(test_center_rows, post_gtc_inbound)

    print(colored('All test centers inserted into Inbounds!\n', 'green'))

    # Insert Inbounds to Staging
    post_gtc_staging = gtc_api_helpers.generate_gtc_post_request(GTC_API_URL, "/api/v1/internal/test-centers-staging", gtc_auth_token)
    format_converter = gtc_api_helpers.convert_inbound_row_to_staging_row
    preprocessor = preprocessing_utils.generate_test_center_details

    staging_test_center_rows = gtc_api_helpers.submit_rows_to_staging(test_center_rows=inbounds_test_center_rows, format_converter=format_converter, preprocessor=preprocessor, post_staging_test_center=post_gtc_staging, app_cache=app_cache)

    return staging_test_center_rows
    
    
def run_preprocessed_workflow(csv_file, gtc_auth_token, app_cache):

    # Load and process CSV:
    test_center_rows = test_center_csv.load_valid_csv_rows(csv_file, is_preprocessed=True)
    print(colored('loaded: ' + str(len(test_center_rows)) + ' test center rows from CSV.\n', 'green'))

    post_gtc_staging = gtc_api_helpers.generate_gtc_post_request(GTC_API_URL, "/api/v1/internal/test-centers-staging", gtc_auth_token)
    format_converter = gtc_api_helpers.convert_preprocessed_row_to_staging_row
    preprocessor = preprocessing_utils.get_formatted_address

    staging_test_center_rows = gtc_api_helpers.submit_rows_to_staging(test_center_rows=test_center_rows, format_converter=format_converter, preprocessor=preprocessor, post_staging_test_center=post_gtc_staging, app_cache=app_cache)

    return staging_test_center_rows

def main_tool_process(csv_file, is_preprocessed, merge_fill_blanks, app_cache):
    print_startup_messaging()

    # Help user identify correctness of API URL, Google key, and AWS account credentials
    validate_credentials()

    # Token is good for 15 minutes. If process takes longer than 15 minutes, it may fail prematurely.
    gtc_auth_token = gtc_auth.authenticate_gtc(GTC_API_URL)

    proceed_yes = input('Do you want to proceed using these credentials? (only \'yes\' is accepted)')
    if(proceed_yes != 'yes'):
        raise Exception('Closing due to user input.')
    
    staging_test_center_rows = []
    if is_preprocessed:
        staging_test_center_rows = run_preprocessed_workflow(csv_file, gtc_auth_token, app_cache)
    else:
        staging_test_center_rows = run_standard_workflow(csv_file, gtc_auth_token, app_cache)
    
    print(colored('All test centers inserted to Staging!\n', 'green'))

    run_diff(staging_test_center_rows, merge_fill_blanks, gtc_auth_token, app_cache)

# Command line interface
# Get all recent staged test center rows that aren't already in our verified or unverified datasets
@click.command()
@click.option('--csv_file', default=None, help='CSV file containing scraped test center rows.')
@click.option('--is_preprocessed', default=False, type=bool, help='Set to True if providing a spreadsheet with preprocessed details like is_drivethru, appointment_required, ... In practice, this should almost always be False.')
@click.option('--merge_fill_blanks', default=False, type=bool, help='Set to True to propose updates to existing UnverifiedTestCenter records. This only shows proposed additions of data where existing records have empty columns (no overwriting).')
def exec_tool(csv_file, is_preprocessed, merge_fill_blanks):
    app_cache = Cache()
    app_cache.load_cache_file()

    def terminateProcess(signalNumber, frame):
        print ('SIG-', signalNumber, ': Dumping cache, then terminating process...')
        app_cache.write_cache_file()
        sys.exit()

    # Catch kill signals and dump cache before exiting
    signal.signal(signal.SIGTERM, terminateProcess)
    signal.signal(signal.SIGINT, terminateProcess)

    try:
        main_tool_process(csv_file, is_preprocessed, merge_fill_blanks, app_cache)
    except:
        app_cache.write_cache_file()
        raise
    else:
        app_cache.write_cache_file()

if __name__ == '__main__':
    exec_tool()
    