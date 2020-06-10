import requests
import json
from operator import itemgetter

def submit_test_centers_to_inbounds(test_center_rows, post_inbound_test_centers):
    formatted_req_body = {
        'scrapedRows': test_center_rows
    }
    submitted_rows = post_inbound_test_centers(formatted_req_body)

    return submitted_rows

def generate_gtc_post_request(base_api_url, request_path, auth_token):
    def post_request(data):
        headers = {'Authorization': 'Bearer ' + auth_token}
        r = requests.post(base_api_url + request_path, json=data, headers=headers)
        r.raise_for_status()

        body = r.json()
        return body
    
    return post_request

def generate_gtc_get_request(base_api_url, request_path, auth_token, normalization_func=None):
    def get_request():
        headers = {'Authorization': 'Bearer ' + auth_token}
        query_response = requests.get(base_api_url + request_path, headers=headers)
        body = query_response.json()

        if(normalization_func != None):
            mod_body = normalization_func(body)
            return mod_body

        return body

    return get_request


# test_center_details_obj to be loaded from preprocessing utils.
def submit_inbounds_test_center_to_staging(inbounds_test_center_obj, test_center_details_obj, post_staging_test_center):
    
    staging_test_center_obj = {
        "inbounds_id": inbounds_test_center_obj['id'],
        "public": False,
        "name": inbounds_test_center_obj['name'],
        "address": test_center_details_obj['address_components']['formatted_address'],
        "latitude": test_center_details_obj['address_components']['lat_lng']['lat'],
        "longitude": test_center_details_obj['address_components']['lat_lng']['lng'],
        "phone_number": test_center_details_obj['formatted_phone'],
        "website": inbounds_test_center_obj['url'],
        "appointment_required": test_center_details_obj['app_required'],
        "drive_thru_site": test_center_details_obj['drive_thru'],
        "doctor_screen_required_beforehand": test_center_details_obj['screen_required'],
        "description": inbounds_test_center_obj['description'],
        "address_freetext_blob": inbounds_test_center_obj['full_address']
    }

    print('prepped test center: ', staging_test_center_obj, '\n\n')

    staging_test_center = post_staging_test_center(staging_test_center_obj)
    return staging_test_center

#intended preprocessor function is: preprocessing_utils.generate_test_center_details
def submit_inbound_test_center_rows_to_staging(inbound_test_center_rows, preprocessor, post_staging_test_center):
    staging_test_centers = []
    for test_center in inbound_test_center_rows:
        full_address, phone, url, description = itemgetter('full_address', 'phone', 'url', 'description')(test_center)
        details_obj = preprocessor(full_address, phone, url, description)

        staging_test_center = submit_inbounds_test_center_to_staging(test_center, details_obj, post_staging_test_center)
        staging_test_centers.append(staging_test_center)
    return staging_test_centers