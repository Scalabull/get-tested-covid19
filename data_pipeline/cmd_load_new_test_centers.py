import csv
import os
import importlib
import click
import sys
from helpers import preprocessing_utils, gtc_auth, gtc_api_helpers, gmaps_utils, aws_utils, test_center_csv
from dotenv import load_dotenv
from termcolor import colored

load_dotenv(override=True)
GTC_API_URL = os.getenv('GTC_API_URL')
GMAPS_API_KEY = os.getenv('GOOGLE_API_KEY')
REC_PROD_GTC_API_URL = 'https://api.get-tested-covid19.org'
GTC_AWS_ACCOUNT_ID = '496778160066'

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

def normalize_test_center_rows(rows):
    normalized_rows = [normalize_test_center_row(row) for row in rows]
    return normalized_rows

def normalize_test_center_row(row):
    row['formatted_address_obj'] = preprocessing_utils.get_formatted_address(row['address'])
    return row

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

    print(colored('Test centers all loaded successfully!\n', 'green'))

    # Insert Inbounds to Staging
    

if __name__ == '__main__':
    exec_tool()