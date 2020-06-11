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

        if r.status_code == 400 or r.status_code == 500:
            print('Request failed with submit body: ', str(data))
            print('Response: ', str(r.content))
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

def generate_staging_test_center_object(*ignore, name, phone, website, description, formatted_address_obj, app_req_flag = None, drive_thru_flag = None, doc_screen_flag = None, inbound_row_id = None, external_id = None, address_freetext = None):
    staging_test_center_obj = {
        "inbounds_id": inbound_row_id,
        "public": False,
        "name": name,
        "address": formatted_address_obj['formatted_address'],
        "latitude": formatted_address_obj['lat_lng']['lat'],
        "longitude": formatted_address_obj['lat_lng']['lng'],
        "phone_number": phone,
        "website": website,
        "appointment_required": app_req_flag,
        "drive_thru_site": drive_thru_flag,
        "doctor_screen_required_beforehand": doc_screen_flag,
        "description": description,
        "address_freetext_blob": address_freetext,
        "external_id": external_id
    }

    return staging_test_center_obj

# 5-column format
def convert_inbound_row_to_staging_row(inbound_test_center_row, preprocessor, app_cache=None):
    inbound_row_id, name, full_address, phone, url, description = itemgetter('id', 'name', 'full_address', 'phone', 'url', 'description')(inbound_test_center_row)
    
    details_obj = preprocessor(full_address, phone, url, description, app_cache=app_cache)
    formatted_address, app_req_flag, drive_thru_flag, doc_screen_flag, formatted_phone = itemgetter('address_components', 'app_required', 'drive_thru', 'screen_required','formatted_phone')(details_obj)

    staging_test_center_obj = None
    if formatted_address != None:
        staging_test_center_obj = generate_staging_test_center_object(name=name, phone=formatted_phone, website=url, description=description, formatted_address_obj=formatted_address, app_req_flag=app_req_flag, drive_thru_flag=drive_thru_flag, doc_screen_flag=doc_screen_flag, inbound_row_id=inbound_row_id, address_freetext=full_address)
    
    return staging_test_center_obj

# 12-column format
def convert_preprocessed_row_to_staging_row(test_center_row, formatted_address_preprocessor, app_cache=None):
    external_id, name, street_address, city, state, zip_code, phone, url, app_req_flag, doc_screen_flag, drive_thru_flag, description = itemgetter('external_id', 'name', 'street_address', 'city', 'state', 'zip_code', 'phone', 'website', 'app_req_flag', 'doc_screen_flag', 'drive_thru_flag', 'description')(test_center_row)
    full_address = street_address + ' ' + city + ', ' + state + ' ' + zip_code
    formatted_address = formatted_address_preprocessor(full_address, app_cache=app_cache)

    staging_test_center_obj = None
    if formatted_address != None:
        staging_test_center_obj = generate_staging_test_center_object(name=name, phone=phone, website=url, description=description, formatted_address_obj=formatted_address, app_req_flag=app_req_flag, drive_thru_flag=drive_thru_flag, doc_screen_flag=doc_screen_flag, external_id=external_id, address_freetext=full_address)
    
    return staging_test_center_obj

def submit_rows_to_staging(test_center_rows, format_converter, preprocessor, post_staging_test_center, app_cache=None):
    staging_test_centers = []
    for test_center in test_center_rows:

        staging_test_center_obj = format_converter(test_center, preprocessor, app_cache)
        if staging_test_center_obj != None:

            submitted_staging_test_center = post_staging_test_center(staging_test_center_obj)
            if submitted_staging_test_center:
                staging_test_centers.append(submitted_staging_test_center)
            
    return staging_test_centers
