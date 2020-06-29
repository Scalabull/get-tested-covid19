
# Generate a report of all new staged test centers, optionally push to Unverified table.

import requests
import os
import importlib
from helpers import preprocessing_utils, gtc_auth
from dotenv import load_dotenv
import time
import click
import json
import boto3

DAY_IN_MILLIS = 60 * 60 * 24 * 1000
S3_BUCKET = 'staging-gtc-data-batches'

load_dotenv(override=True)
GTC_API_URL = os.getenv('GTC_API_URL')

auth_token = gtc_auth.authenticate_gtc()
headers = {'Authorization': 'Bearer ' + auth_token}

def post_unverified_test_center(test_center_obj):
    res = requests.post(GTC_API_URL + "/api/v1/internal/unverified-test-centers/", test_center_obj, headers=headers)
    return res

def get_recent_staged_test_center_rows(from_timestamp):
    recent_staged_response = requests.get(GTC_API_URL + "/api/v1/internal/test-centers-staging/fresh?since=" + from_timestamp, headers=headers)
    staged_rows = recent_staged_response.json()

    normalized_rows = [normalize_test_center_row(staged_row) for staged_row in staged_rows]
    return normalized_rows

def get_unverified_test_centers():
    query_response = requests.get(GTC_API_URL + "/api/v1/internal/unverified-test-centers/", headers=headers)
    rows = query_response.json()
    
    normalized_rows = [normalize_test_center_row(row) for row in rows]
    return normalized_rows

def get_verified_test_centers():
    query_response = requests.get(GTC_API_URL + "/api/v1/internal/verified-test-centers/", headers=headers)
    rows = query_response.json()
    
    normalized_rows = [normalize_test_center_row(row) for row in rows]
    return normalized_rows

# All tables have same 'address' field and 'name' field, so normalization of data
# is not currently required.
def normalize_test_center_row(row):
    # TODO: handle formatting failures by discarding row, log bad rows in report.
    row['formatted_address_obj'] = preprocessing_utils.get_formatted_address(row['address'])
    return row

def format_unverified_test_center_row(decorated_staging_row):
    formatted_address_obj = decorated_staging_row['formatted_address_obj']
    lat_lng = formatted_address_obj['lat_lng']

    unverified_output_row = {
        'full_formatted_address': formatted_address_obj['formatted_address'],
        'latitude': lat_lng['lat'],
        'longitude': lat_lng['lng'],
        'google_place_id': formatted_address_obj['google_place_id'],
        'staging_row_id': decorated_staging_row['id'],
        'name': decorated_staging_row['name'],
        'phone_number': decorated_staging_row['phone_number'],
        'website': decorated_staging_row['website'],
        'public_description': decorated_staging_row['description'],
        'appointment_required': decorated_staging_row['appointment_required'],
        'doctor_screen_required_beforehand': decorated_staging_row['doctor_screen_required_beforehand'],
        'drive_thru_site': decorated_staging_row['drive_thru_site'],
        'estimated_daily_test_capacity': decorated_staging_row['estimated_daily_test_capacity']
    }
    return unverified_output_row

# Check whether two normalized test center rows refer to the same test center
def check_test_center_match(row1, row2):
    ident_flags = []
    warn_flags = []

    row1_formatted_address_obj = row1['formatted_address_obj']
    row2_formatted_address_obj = row2['formatted_address_obj']

    if row1['name'] == row2['name']:
        ident_flags.append('NAME_MATCH')
    
    if(row1_formatted_address_obj['google_place_id'] == row2_formatted_address_obj['google_place_id']):
        ident_flags.append('GOOG_PLACEID_MATCH')

    if(row1_formatted_address_obj['formatted_address'] == row2_formatted_address_obj['formatted_address']):
        ident_flags.append('FORMATTED_ADDR_MATCH')

    if(check_test_centers_near(row1_formatted_address_obj, row2_formatted_address_obj)):
        warn_flags.append('CLOSE_GEO_RANGE')
    
    return ident_flags, warn_flags
    
# This is rough math, may need to revise due to Python's round() behavior
# Want to return test centers within 100 meters   
def check_test_centers_near(row1_formatted_address_obj, row2_formatted_address_obj):
    row1_lat = round(row1_formatted_address_obj['lat_lng']['lat'], 3)
    row1_lng = round(row1_formatted_address_obj['lat_lng']['lng'], 3)

    row2_lat = round(row2_formatted_address_obj['lat_lng']['lat'], 3)
    row2_lng = round(row2_formatted_address_obj['lat_lng']['lng'], 3)

    if(row1_lat == row2_lat and row1_lng == row2_lng):
        return True
    
    return False

def check_row_against_ver_unver(staged_row, unverified_rows, verified_rows):
    staged_row['matches'] = []

    for unverified_row in unverified_rows:
        ident_flags, warn_flags = check_test_center_match(staged_row, unverified_row)

        if(len(ident_flags) > 0 or len(warn_flags) > 0):
            staged_row['matches'].append({'ident_flags': ident_flags, 'warn_flags': warn_flags, 'type': 'UNVERIFIED', 'unverified_row_id': unverified_row['id'] })
    
    for verified_row in verified_rows:
        ident_flags, warn_flags = check_test_center_match(staged_row, verified_row)

        if(len(ident_flags) > 0 or len(warn_flags) > 0):
            staged_row['matches'].append({'ident_flags': ident_flags, 'warn_flags': warn_flags, 'type': 'VERIFIED', 'verified_row_id': verified_row['id'] })
    
    return staged_row


def get_mapping_stats(mapped_rows):
    ver_unver_match_count = 0
    unverified_match_count = 0
    verified_match_count = 0
    unmatched_rows = []

    for row in mapped_rows:
        unver_count = 0
        ver_count = 0

        for match in row['matches']:
            if match['type'] == 'VERIFIED':
                ver_count = ver_count + 1
            elif match['type'] == 'UNVERIFIED':
                unver_count = unver_count + 1
        
        if unver_count > 0 and ver_count > 0:
            ver_unver_match_count = ver_unver_match_count + 1
        elif unver_count > 0:
            unverified_match_count = unverified_match_count + 1
        elif ver_count > 0:
            verified_match_count = verified_match_count + 1
        else:
            unmatched_rows.append(row)
    
    return { 
        'ver_unver_match_count': ver_unver_match_count, 
        'unverified_match_count': unverified_match_count, 
        'verified_match_count': verified_match_count, 
        'unmatched_rows': unmatched_rows,
        'unmatched_row_count': len(unmatched_rows)
    }

def group_staging_rows(staging_rows):
    staging_row_groups = {}
    for row in staging_rows:
        google_place_id = row['formatted_address_obj']['google_place_id']
        if google_place_id in staging_row_groups:
            staging_row_groups[google_place_id].append(row)
        else:
            staging_row_groups[google_place_id] = [row]
    
    # For any duplicate staging rows, our selection of which row to use for matching is arbitrary
    deduplicated_staging_rows = []
    for row_group in staging_row_groups.values():
        deduplicated_staging_rows.append(row_group[0])

    return staging_row_groups, deduplicated_staging_rows

# Meant to give quick feedback about status of job during manual usage of tool
def pretty_print_results(dump_obj, commit_job_filename):
    print('Proposed test center rows to be added to UnverifiedTestCenters table: ', dump_obj['post_processing_stats']['unmatched_row_count'])
    print('Rows: ')
    unmatched_rows = dump_obj['post_processing_stats']['unmatched_rows']
    for row in unmatched_rows:
        print('Staging ID: ', row['id'], ' Name: ', row['name'], ' OrigAddr: ', row['address'], ' FormtAddr: ', row['formatted_address_obj']['formatted_address'])

    print('\n\nCommit Job Filename: ', commit_job_filename)
    print('(pass this commit_job back into the tool to upload to Unverified API)')

# Command line interface
# Get all recent staged test center rows that aren't already in our verified or unverified datasets
@click.command()
@click.option('--days', default=7, help='Use staging table rows from up to X days ago.')   
@click.option('--commit_job', default=None, help='Pass in the file name of a JSON output dump from a prior run of this script.'
+ ' The specified file will be loaded and the results will be pushed to the Unverified API.')
def exec_tool(days, commit_job):
    aws_ident = boto3.client('sts').get_caller_identity().get('Account')
    print('Using AWS Identity: ', aws_ident)

    if commit_job:
        load_job_dump_and_push_to_api(commit_job)
    else:
        map_test_centers(days)

def load_job_dump_and_push_to_api(commit_job_filename):
    with open('./logs/' + commit_job_filename) as json_file:
        dump_obj = json.load(json_file)
        new_test_center_rows = dump_obj['post_processing_stats']['unmatched_rows']

        for test_center in new_test_center_rows:
            unverified_test_center_row = format_unverified_test_center_row(test_center)
            print('Formatted test center row: ', unverified_test_center_row)
            post_status = post_unverified_test_center(unverified_test_center_row)
            print('Row POSTed successfully? ', post_status)


def map_test_centers(days):
    s3 = boto3.client('s3')

    ms = str(int(round(time.time() * 1000)) - DAY_IN_MILLIS * days)

    recent_staged_rows = get_recent_staged_test_center_rows(ms)
    grouped_staging_row_dict, deduplicated_staging_rows = group_staging_rows(recent_staged_rows)
    unverified_rows = get_unverified_test_centers()
    verified_rows = get_verified_test_centers()

    print('Staged test centers since: ', ms, '. Row count: ', len(recent_staged_rows))
    print('Staged test centers (deduplicated): ', len(deduplicated_staging_rows))
    print('Total unverified rows: ', len(unverified_rows))
    print('Total verified rows: ', len(verified_rows))

    #simple brute force for visibility/traceability
    processed_rows = [check_row_against_ver_unver(staged_row, unverified_rows, verified_rows) for staged_row in deduplicated_staging_rows]
    stats = get_mapping_stats(processed_rows)

    # Dump results of processing, currently dumps to standard I/O and also writes to a file in /logs - for passive analysis.
    dump_obj = {
        'staging_row_deduplication_groups': grouped_staging_row_dict,
        'staging_row_deduplicated_count': len(deduplicated_staging_rows),
        'post_processing_stats': stats,
        'processed_rows': processed_rows
    }
    commit_job_filename = 'su_' + str(time.time()) + '_report.json'
    pretty_print_results(dump_obj, commit_job_filename)
    
    with open('./logs/' + commit_job_filename, 'w') as outfile:
        json.dump(dump_obj, outfile, indent=4)
    
    S3_OBJECT_KEY = 'unver-staged-jobs/' + commit_job_filename
    s3.put_object(Bucket=S3_BUCKET, 
                Body=(bytes(json.dumps(dump_obj, indent=4).encode('UTF-8'))),
                Key= S3_OBJECT_KEY)
    S3_OBJECT_URL = 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + S3_OBJECT_KEY
    print('s3 object URL: ', S3_OBJECT_URL)

if __name__ == '__main__':
    exec_tool()