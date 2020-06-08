

def submit_test_centers_to_inbounds(test_center_rows, post_inbound_test_centers):
    formatted_req_body = {
        'scrapedRows': test_center_rows
    }
    submitted_rows = post_inbound_test_centers(formatted_req_body)

    return submitted_rows

# "/api/v1/internal/test-centers-staging"
def gtc_post_request(base_api_url, request_path, auth_token, data):
    headers = {'Authorization': 'Bearer ' + auth_token}
    r = requests.post(base_api_url + request_path, data=data, headers=headers)
    
    r.raise_for_status()

    body = r.json()
    return body

def submit_inbounds_test_center_to_staging(inbounds_test_center_obj, post_staging_test_center, preprocessing_utils):
    address_components = preprocessing_utils.get_formatted_address(inbounds_test_center_obj['full_address'])
    formatted_phone = preprocessing_utils.get_formatted_phone(inbounds_test_center_obj['phone'])
    drive_thru = preprocessing_utils.is_likely_drive_thru(inbounds_test_center_obj['description'])
    app_required = preprocessing_utils.is_likely_appointment_required(inbounds_test_center_obj['description'])
    screen_required = preprocessing_utils.is_likely_screen_required(inbounds_test_center_obj['description'])
    valid_url_flag = preprocessing_utils.is_valid_URL(inbounds_test_center_obj['url'])
    
    staging_test_center_obj = {
        "inbounds_id": inbounds_test_center_obj['id'],
        "public": False,
        "name": inbounds_test_center_obj['name'],
        "address": address_components['formatted_address'],
        "latitude": address_components['lat_lng']['lat'],
        "longitude": address_components['lat_lng']['lng'],
        "phone_number": formatted_phone,
        "website": inbounds_test_center_obj['url'],
        "appointment_required": app_required,
        "drive_thru_site": drive_thru,
        "doctor_screen_required_beforehand": screen_required,
        "description": inbounds_test_center_obj['description'],
        "address_freetext_blob": inbounds_test_center_obj['full_address']
    }

    post_staging_test_center(staging_test_center_obj)