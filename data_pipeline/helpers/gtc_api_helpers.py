

def submit_test_center_to_inbounds(test_center_dict, post_inbound_test_center):
    res = post_inbound_test_center(test_center_dict)
    test_center_dict['inbounds_id'] = res.id
    return test_center_dict

def post_inbounds(base_api_url, auth_token, data):
    headers = {'Authorization': 'Bearer ' + auth_token}
    r = requests.post(base_api_url + "/api/v1/internal/test-centers-staging", data=data, headers=headers)
    if r.status_code == 401 or r.status_code == 500:
        r.raise_for_status()

    body = r.json()
    return body

