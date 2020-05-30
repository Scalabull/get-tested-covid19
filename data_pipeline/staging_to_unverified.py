
# Generate a report of all new staged test centers, optionally push to Unverified table.

import requests
import os
import importlib
from helpers import preprocessing_utils, gtc_auth
from dotenv import load_dotenv
import time
import click
import json

DAY_IN_MILLIS = 60 * 60 * 24 * 1000

load_dotenv(override=True)
GTC_API_URL = os.getenv('GTC_API_URL')

auth_token = gtc_auth.authenticate_gtc()
headers = {'Authorization': 'Bearer ' + auth_token}

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


# Command line interface
# Get all recent staged test center rows that aren't already in our verified or unverified datasets
@click.command()
@click.option('--days', default=7, help='Use staging table rows from up to X days ago.')   
def map_test_centers(days):
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
    # TODO: write outfiles to S3 bucket instead of local filesys
    dump_obj = {
        'staging_row_deduplication_groups': grouped_staging_row_dict,
        'staging_row_deduplicated_count': len(deduplicated_staging_rows),
        'post_processing_stats': stats,
        'processed_rows': processed_rows
    }
    print('results of preprocessing: \n\n', json.dumps(dump_obj, indent=4))
    with open('./logs/su_' + str(time.time()) + '_report.json', 'w') as outfile:
        json.dump(dump_obj, outfile, indent=4)

if __name__ == '__main__':
    map_test_centers()