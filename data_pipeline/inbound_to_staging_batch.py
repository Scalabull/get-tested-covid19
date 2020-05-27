# Batch script to be run in e.g. hourly increments

import requests
import os
import importlib
from helpers import preprocessing_utils
from dotenv import load_dotenv

load_dotenv(override=True)

GTC_API_URL = os.getenv('GTC_API_URL')

# Load username and password from environment
gtc_user = os.getenv('GTC_USERNAME')
gtc_pass = os.getenv('GTC_PASSWORD')

print("Authenticating with GTC User: ", gtc_user)
print("Using API URL: ", GTC_API_URL)

# Get Auth Token
authResponse = requests.post(GTC_API_URL + "/api/v1/auth/login", data={"email": "test@test.com","password": "testtest"})
authToken = authResponse.json()['token']
headers = {'Authorization': 'Bearer ' + authToken}

freshInboundRows = requests.get(GTC_API_URL + "/api/v1/internal/inbound/", headers=headers)
print('Status: ', freshInboundRows)

rows = freshInboundRows.json()

def push_staging_test_center_obj(test_center_obj):
    headers = {'Authorization': 'Bearer ' + authToken}

    status = requests.post(GTC_API_URL + "/api/v1/internal/test-centers-staging", data=test_center_obj, headers=headers)
    print('\nSubmission status: ', status, ': ', status.json(), '\n')

print('Handling: ', len(rows), ' Inbound rows.')

for row in rows:
    #Extract structured fields from full_address
    
    address_components = preprocessing_utils.get_formatted_address(row['full_address'])
    formatted_phone = preprocessing_utils.get_formatted_phone(row['phone'])
    drive_thru = preprocessing_utils.is_likely_drive_thru(row['description'])
    app_required = preprocessing_utils.is_likely_appointment_required(row['description'])
    screen_required = preprocessing_utils.is_likely_screen_required(row['description'])
    valid_url_flag = preprocessing_utils.is_valid_URL(row['url'])
    
    staging_test_center_obj = {
        "inbounds_id": row['id'],
        "public": False,
        "name": row['name'],
        "address": address_components['formatted_address'],
        "latitude": address_components['lat_lng']['lat'],
        "longitude": address_components['lat_lng']['lng'],
        "phone_number": formatted_phone,
        "website": row['url'],
        "appointment_required": app_required,
        "drive_thru_site": drive_thru,
        "doctor_screen_required_beforehand": screen_required,
        "description": row['description'],
        "address_freetext_blob": row['full_address']
    }

    print('\norig row: ', row, ' \nStaging obj: ', staging_test_center_obj)
    push_staging_test_center_obj(staging_test_center_obj)

print('All rows complete')