import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import reference_constants

TARGET_PREPROCESSED_CSV_HEADER = reference_constants.TARGET_PREPROCESSED_CSV_HEADER

def cast_me_dhhs_status(status):
    status = status.strip().lower()

    if status == 'no':
        return 0
    elif status == 'yes':
        return 1
    elif status == 'yes, but for established patients only':
        return 2
    else:
        print('status: ', status)
        raise Exception('Maine standing order status must have an exact match to one of our three predefined statuses. See cast_me_dhhs_status function.')

def clean_text_field(field):
    field = field.strip()

    return field

def clean_yes_no_field(field):
    field = field.strip().lower()

    if field == 'no':
        return 'No'
    elif field == 'yes' or field == 'preferred':
        return 'Yes'
    elif field == '':
        return ''
    else:
        print('field: ', field)
        raise Exception('One or more Yes/No fields contained an incorrect value. Valid values for these fields are Yes, No, and an empty string')

def preprocess_csv(row_obj):

    free_testing_for_all = None 
    est_result_days_min = None
    est_result_days_max = None

    drive_thru_flag = clean_yes_no_field(row_obj['Drive through?'])
    app_req_flag = clean_yes_no_field(row_obj['Appt Required?'])
    provider_ref_flag = clean_yes_no_field(row_obj['Provider  referral required?  '])
    doc_screen_flag = clean_yes_no_field(row_obj['Provider screening required?'])
    me_dhhs_status = cast_me_dhhs_status(row_obj['Testing available consistent with ME DHHS Standing Order issued 6/18/2020'])

    me_state_contracted_facility = clean_yes_no_field(row_obj['State Contracted Swab & Send'])
    if me_state_contracted_facility == 'Yes':
        free_testing_for_all = 'Yes'
        est_result_days_min = 2
        est_result_days_max = 3

    street_address = row_obj['Street address']
    city = row_obj['Municipality']
    state = 'ME'
    zip_code = row_obj['Zipcode']

    name = clean_text_field(row_obj['Name'])
    description = clean_text_field(row_obj['Appointment procedure'])
    phone = row_obj['Phone']
    url = clean_text_field(row_obj['URL'])

    out_row = [
        '',
        name,
        street_address,
        city,
        state,
        zip_code,
        phone,
        url,
        app_req_flag,
        doc_screen_flag,
        drive_thru_flag,
        provider_ref_flag,
        'Yes',
        description,
        None,
        me_dhhs_status,
        free_testing_for_all,
        est_result_days_min,
        est_result_days_max
    ]
    
    return out_row