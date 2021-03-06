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

def generate_gtc_get_request(base_api_url, request_path, auth_token, normalization_func=None, qs_params=None):
    def get_request():
        headers = {'Authorization': 'Bearer ' + auth_token}

        query_response = requests.get(base_api_url + request_path, headers=headers, params=qs_params)
        body = query_response.json()

        if(normalization_func != None):
            mod_body = normalization_func(body)
            return mod_body

        return body

    return get_request

def generate_staging_test_center_object(*ignore, name, phone, website, description, formatted_address_obj, app_req_flag = None, drive_thru_flag = None, doc_screen_flag = None, phys_ref_flag = None, verif_phone_ext_flag = None, inbound_row_id = None, external_id = None, address_freetext = None, hours_of_operation = None, custom_question_1 = None, free_testing_for_all=None, confirmed_result_days_min=None, confirmed_result_days_max=None):
    formatted_ext_id = None
    formatted_cust_quest_1 = None
    formatted_conf_result_days_min = None
    formatted_conf_result_days_max = None

    if(external_id != ''):
        formatted_ext_id = external_id
    if(custom_question_1 != ''):
        formatted_cust_quest_1 = custom_question_1
    if(confirmed_result_days_min != '' and confirmed_result_days_min != None):
        formatted_conf_result_days_min = int(str(confirmed_result_days_min))
    if(confirmed_result_days_max != '' and confirmed_result_days_max != None):
        formatted_conf_result_days_max = int(str(confirmed_result_days_max))
    

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
        "physician_referral_required": phys_ref_flag,
        "verified_by_phone_external_party": verif_phone_ext_flag,
        "description": description,
        "hours_of_operation": hours_of_operation,
        "address_freetext_blob": address_freetext,
        "external_id": formatted_ext_id,
        "google_place_id": formatted_address_obj['google_place_id'],
        "me_dhhs_status": formatted_cust_quest_1,
        "free_testing_for_all": free_testing_for_all,
        "confirmed_result_days_min": formatted_conf_result_days_min,
        "confirmed_result_days_max": formatted_conf_result_days_max
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

# 12-column format (with optional extra columns)
def convert_preprocessed_row_to_staging_row(test_center_row, formatted_address_preprocessor, app_cache=None):
    external_id, name, street_address, city, state, zip_code, phone, url, app_req_flag, doc_screen_flag, drive_thru_flag, phys_ref_flag, verif_phone_ext_flag, description, hours_of_operation, me_dhhs_status, free_testing_for_all, confirmed_result_days_min, confirmed_result_days_max = itemgetter('external_id', 'name', 'street_address', 'city', 'state', 'zip_code', 'phone', 'website', 'app_req_flag', 'doc_screen_flag', 'drive_thru_flag', 'phys_ref_flag', 'verif_phone_ext_flag', 'description', 'hours_of_operation', 'me_dhhs_status', 'free_testing_for_all', 'confirmed_result_days_min', 'confirmed_result_days_max' )(test_center_row)
    full_address = street_address + ' ' + city + ', ' + state + ' ' + zip_code
    formatted_address = formatted_address_preprocessor(full_address, app_cache=app_cache)

    staging_test_center_obj = None
    if formatted_address != None:
        staging_test_center_obj = generate_staging_test_center_object(name=name, phone=phone, website=url, description=description, formatted_address_obj=formatted_address, app_req_flag=app_req_flag, drive_thru_flag=drive_thru_flag, doc_screen_flag=doc_screen_flag, phys_ref_flag=phys_ref_flag, verif_phone_ext_flag=verif_phone_ext_flag, external_id=external_id, address_freetext=full_address, hours_of_operation=hours_of_operation, custom_question_1=me_dhhs_status, free_testing_for_all=free_testing_for_all, confirmed_result_days_min=confirmed_result_days_min, confirmed_result_days_max=confirmed_result_days_max)
    
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
