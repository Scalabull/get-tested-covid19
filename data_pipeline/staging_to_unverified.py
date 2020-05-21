
# Generate a report of all new staged test centers, optionally push to Unverified table.

import requests
import os
import importlib
from helpers import preprocessing_utils, gtc_auth
from dotenv import load_dotenv
import time

WEEK_IN_MILLIS = 60 * 60 * 24 * 7 * 1000

load_dotenv(override=True)
GTC_API_URL = os.getenv('GTC_API_URL')

auth_token = gtc_auth.authenticate_gtc()
headers = {'Authorization': 'Bearer ' + auth_token}

def get_recent_staged_test_center_rows():
    ms = str(int(round(time.time() * 1000)) - WEEK_IN_MILLIS)

    recent_staged_response = requests.get(GTC_API_URL + "/api/v1/internal/test-centers-staging/fresh?since=" + ms, headers=headers)
    staged_rows = recent_staged_response.json()

    print('Staged test centers since: ', ms, '. Row count: ', len(staged_rows))
    return staged_rows

def get_unverified_test_centers():
    query_response = requests.get(GTC_API_URL + "/api/v1/internal/unverified-test-centers/", headers=headers)
    rows = query_response.json()
    row_dict = {}
    for row in rows:
        row_dict[str(row['id'])] = row

    print('Total unverified rows: ', len(rows))
    #print('unverified dict: ', row_dict)
    return rows, row_dict

def get_verified_test_centers():
    query_response = requests.get(GTC_API_URL + "/api/v1/internal/verified-test-centers/", headers=headers)
    rows = query_response.json()
    row_dict = {}
    for row in rows:
        row_dict[str(row['id'])] = row

    print('Total verified rows: ', len(rows))
    #print('verified dict: ', row_dict)
    return rows, row_dict

# Currently all tables are the same, but formats are shifting.
# May remove this if formats stabilize and tables are consistent.
def normalize_test_center_row(row, source):
    if source == 'STAGING':
        return {
            'address': row['address'],
            'name': row['name']
        }
    elif source == 'VERIFIED':
        return {
            'address': row['address'],
            'name': row['name']
        }
    elif source == 'UNVERIFIED':
        return {
            'address': row['address'],
            'name': row['name']
        }
    else:
        return None

# Check whether two normalized test center rows refer to the same test center
def check_test_center_match(row1, row2):
    ident_flags = []
    warn_flags = []

    row1_formatted_address_obj = preprocessing_utils.get_formatted_address(row1['address'])
    row2_formatted_address_obj = preprocessing_utils.get_formatted_address(row2['address'])

    if row1['name'] == row2['name']:
        ident_flags.append('NAME_MATCH')
    
    if(row1_formatted_address_obj['google_place_id'] == row2_formatted_address_obj['google_place_id']):
        ident_flags.append('GOOG_PLACEID_MATCH')

    if(row1_formatted_address_obj['formatted_address'] == row2_formatted_address_obj['formatted_address']):
        ident_flags.append('FORMATTED_ADDR_MATCH')

    if(check_test_centers_near(row1_formatted_address_obj, row2_formatted_address_obj)):
        warn_flags.append('CLOSE_GEO_RANGE')
    
    return ident_flags, warn_flags
    
    
def check_test_centers_near(row1_formatted_address_obj, row2_formatted_address_obj):
    row1_lat = round(row1_formatted_address_obj['lat_lng']['lat'], 3)
    row1_lng = round(row1_formatted_address_obj['lat_lng']['lng'], 3)

    row2_lat = round(row2_formatted_address_obj['lat_lng']['lat'], 3)
    row2_lng = round(row2_formatted_address_obj['lat_lng']['lng'], 3)

    if(row1_lat == row2_lat and row1_lng == row2_lng):
        return True
    
    return False


# Get all recent staged test center rows that aren't already in our verified or unverified datasets
def map_test_centers():
    recent_staged_rows = get_recent_staged_test_center_rows()
    unverified_rows, unverified_dict = get_unverified_test_centers()
    verified_rows, verified_dict = get_verified_test_centers()

    #simple brute force for visibility/traceability
    for staged_row in recent_staged_rows:
        norm_staged_row = normalize_test_center_row(staged_row, 'STAGING')

        for unverified_row in unverified_rows:
            norm_unverified_row = normalize_test_center_row(unverified_row, 'UNVERIFIED')

            ident_flags, warn_flags = check_test_center_match(norm_staged_row, norm_unverified_row)
            if(len(ident_flags) > 0 or len(warn_flags) > 0):
                print('staged row: ', staged_row, ' MATCH unverified row: ', unverified_row)
                print('ident_flags: ', ident_flags, ' warn_flags: ', warn_flags)


map_test_centers()