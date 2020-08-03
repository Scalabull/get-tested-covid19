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
import urllib.parse

load_dotenv(override=True)
REC_PROD_GTC_API_URL = 'https://api.get-tested-covid19.org'

GTC_API_URL = REC_PROD_GTC_API_URL
if os.getenv('GTC_API_URL') != None:
    GTC_API_URL = os.getenv('GTC_API_URL')

def print_startup_messaging():
    print('The following are required to use this utility: \n' +
    '1. Valid credentials for the GTC production API\n\n')

def validate_credentials(): 
    
    if(GTC_API_URL != REC_PROD_GTC_API_URL):
        print(colored('WARNING: You are currently using API URL: ' + GTC_API_URL, 'yellow'))
        print(colored('If you are searching for live test centers, use the production API: ' + REC_PROD_GTC_API_URL, 'yellow'))
        print(colored('If you are searching for test centers on other environments, it is OK to use a localhost or staging API for testing purposes.', 'yellow'))
    else:
        print(colored('You are using the correct API URL: ' + GTC_API_URL, 'green'))

def run_search_export_workflow(search_string, csv_outfile, gtc_auth_token):
    
    get_gtc_search = gtc_api_helpers.generate_gtc_get_request(GTC_API_URL, "/api/v1/internal/unverified-test-centers/addressTextSearch/" + search_string, gtc_auth_token)
    search_results = get_gtc_search()

    print(colored('Results include: ' + str(search_results['numRows']) + ' total test centers', 'green'))

    test_center_csv.write_test_center_array_to_csv(search_results['matchedTestCenters'], csv_outfile)

    print(colored('CSV successfully written to: ' + csv_outfile, 'green'))


def main_tool_process(search_string, csv_outfile):
    print_startup_messaging()

    # Help user identify correctness of API URL
    validate_credentials()

    # Token is good for 15 minutes. If process takes longer than 15 minutes, it may fail prematurely.
    gtc_auth_token = gtc_auth.authenticate_gtc(GTC_API_URL)

    proceed_yes = input('Do you want to proceed using these credentials? (only \'yes\' is accepted)')
    if(proceed_yes != 'yes'):
        raise Exception('Closing due to user input.')
        
    if search_string and csv_outfile:
        run_search_export_workflow(search_string, csv_outfile, gtc_auth_token)
    else:
        raise Exception('Must provide valid search_string and csv_outfile to use this utility.')

# Command line interface
# Get all recent staged test center rows that aren't already in our verified or unverified datasets
@click.command()
@click.option('--search_string', default=None, help='Search for test centers with addresses containing this string (URI encoded)')
@click.option('--csv_outfile', default=None, help='Path to write results to CSV (e.g. ./tmp_data/sample.csv)')

def exec_tool(search_string, csv_outfile):
    main_tool_process(search_string, csv_outfile)

if __name__ == '__main__':
    exec_tool()
    