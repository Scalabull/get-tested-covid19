import csv
import os
import importlib
import click
import sys
from helpers import preprocessing_utils, gtc_auth, gtc_api_helpers, gmaps_utils, aws_utils, test_center_csv, gtc_merge_logic, file_utils
from dotenv import load_dotenv
from termcolor import colored
import datetime

load_dotenv(override=True)
GTC_API_URL = os.getenv('GTC_API_URL')
GMAPS_API_KEY = os.getenv('GOOGLE_API_KEY')
REC_PROD_GTC_API_URL = 'https://api.get-tested-covid19.org'
GTC_AWS_ACCOUNT_ID = '496778160066'
THIS_DIR = os.path.dirname(os.path.abspath(__file__))
LOGS_PATH = os.path.join(THIS_DIR, 'logs')

def print_startup_messaging():
    print('The following are required to use this utility: \n' +
    '1. An AWS Account with our organization (GTC). The credentials should be setup in your ~/.aws/profile.\n' +
    '2. A working Google Maps API key with the geolocation API enabled. This should be in your .env file, see .env.sample for naming. \n' +
    '3. Valid credentials for the GTC production API\n\n')

def validate_credentials(): 
    print('You are currently using API URL: ', GTC_API_URL)
    if(GTC_API_URL != REC_PROD_GTC_API_URL):
        print(colored('If you are uploading new test centers, this too must be run against our production API: ' + REC_PROD_GTC_API_URL, 'yellow'))
        print(colored('If you are developing new code, it is OK to use a localhost or staging API for testing purposes.', 'yellow'))

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

def pretty_print_results(dump_obj, job_handle, s3_diff_obj_handle, job_local_path):
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
    
def normalize_test_center_rows(rows):
    normalized_rows = [normalize_test_center_row(row) for row in rows]
    return normalized_rows

def normalize_test_center_row(row):
    row['formatted_address_obj'] = preprocessing_utils.get_formatted_address(row['address'])
    return row

def get_current_datetime_formatted():
    current_dt = datetime.datetime.now()
    return current_dt.strftime("%Y%m%d%H%M%S")

# Command line interface
# Get all recent staged test center rows that aren't already in our verified or unverified datasets
@click.command()
@click.option('--csv_file', default=None, help='CSV file containing scraped test center rows.')
@click.option('--is_preprocessed', default=False, help='Set to True if providing a spreadsheet with preprocessed details like is_drivethru, appointment_required, ... In practice, this should almost always be False.')
def exec_tool(csv_file, is_preprocessed):
    print_startup_messaging()

    # Token is good for 15 minutes. If process takes longer than 15 minutes, it may fail prematurely.
    gtc_auth_token = gtc_auth.authenticate_gtc()

    # Help user identify correctness of API URL, Google key, and AWS account credentials
    validate_credentials()
    proceed_yes = input('Do you want to proceed using these credentials? (only \'yes\' is accepted)')
    if(proceed_yes != 'yes'):
        raise Exception('Closing due to user input.')
    
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
    staging_test_center_rows = gtc_api_helpers.submit_inbound_test_center_rows_to_staging(inbounds_test_center_rows, preprocessing_utils.generate_test_center_details, post_gtc_staging)

    print(colored('All test centers inserted to Staging!\n', 'green'))

    # Create diff obj - calculate which new test centers will be added to Unverified table.
    get_gtc_verified_test_centers = gtc_api_helpers.generate_gtc_get_request(GTC_API_URL,  "/api/v1/internal/verified-test-centers/", gtc_auth_token, normalize_test_center_rows)
    get_gtc_unverified_test_centers = gtc_api_helpers.generate_gtc_get_request(GTC_API_URL,  "/api/v1/internal/unverified-test-centers/", gtc_auth_token, normalize_test_center_rows)
    verified_test_center_rows = get_gtc_verified_test_centers()
    unverified_test_center_rows = get_gtc_unverified_test_centers()
    normalized_staging_test_center_rows = normalize_test_center_rows(staging_test_center_rows)

    print('Database contains Unverified Test Centers: ', len(unverified_test_center_rows), ' , Verified Test Centers: ', len(verified_test_center_rows))
    print('Generating diff... (this may take a moment)\n\n')

    merge_diff = gtc_merge_logic.generate_unverified_update_diff_obj(normalized_staging_test_center_rows, unverified_test_center_rows, verified_test_center_rows)
    current_dt = get_current_datetime_formatted()
    job_handle = 'su_' + current_dt + '_report.json'

    # Put results to S3
    s3_diff_obj_handle = aws_utils.put_diff_dump_to_s3(job_handle, merge_diff)
    
    # Write results to local /logs folder, for easy access/review
    job_local_path = os.path.join(LOGS_PATH, job_handle)
    file_utils.write_json_outfile(job_local_path, merge_diff)

    # Print short summary of results
    pretty_print_results(merge_diff, job_handle, s3_diff_obj_handle, job_local_path)
    

if __name__ == '__main__':
    exec_tool()
    