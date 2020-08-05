import csv
import re
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import reference_constants

TARGET_DELETIONS_CSV_HEADER = reference_constants.TARGET_DELETIONS_CSV_HEADER
TARGET_CSV_HEADER = reference_constants.TARGET_CSV_HEADER
TARGET_PREPROCESSED_CSV_HEADER = reference_constants.TARGET_PREPROCESSED_CSV_HEADER

def load_valid_csv_rows(csv_file, is_preprocessed = False, is_delete = False):
    valid_test_centers = []

    with open(csv_file) as test_centers_file:
        test_center_reader = csv.reader(test_centers_file)

        header = next(test_center_reader)
        valid_test_centers = []

        if is_preprocessed:
            check_if_valid_header_row(header, TARGET_PREPROCESSED_CSV_HEADER)
            valid_test_centers = extract_valid_rows(test_center_reader, extract_preprocessed_test_center_row) 
        elif is_delete:
            check_if_valid_header_row(header, TARGET_DELETIONS_CSV_HEADER)
            valid_test_centers = extract_valid_rows(test_center_reader, extract_deletion_test_center_row)
        else:
            check_if_valid_header_row(header, TARGET_CSV_HEADER)
            valid_test_centers = extract_valid_rows(test_center_reader, extract_test_center_row)
        
        return valid_test_centers
        

def extract_valid_rows(test_center_reader, row_extractor):
    valid_test_centers = []

    for test_center in test_center_reader:
        valid_test_center = row_extractor(test_center)
        if(valid_test_center != None):
            valid_test_centers.append(valid_test_center)
        
    return valid_test_centers

def check_if_valid_header_row(header, target_header):
    if header != target_header:
        raise Exception('CSV_HEADER_FORMAT_INVALID', 'Proper CSV header (and format): ' + str(target_header) + '\n\nYour header: ' + str(header))

    return True  

def yes_no_to_bool(col_val):
    upper_col_val = str(col_val).upper()
    if upper_col_val == 'YES':
        return True
    elif upper_col_val == 'NO':
        return False
    else:
        return None

# The VA has asked not to have their test centers displayed publicly
def is_VA_test_center(name):
    va_flag = re.search('^VA | VA ', name)
    if(va_flag != None):
        return True
    return False

# The standard scraped CSV should have 5 columns, as follows:
# This format mirrors the Inbounds table.
def extract_test_center_row(csv_row):
    if(len(csv_row) != 5):
        return None

    if(csv_row[0] == '' or csv_row[1] == '' or csv_row[2] == ''):
        return None
    
    if(is_VA_test_center(csv_row[0])):
        return None
        
    test_center = {
        'name': csv_row[0],
        'full_address': csv_row[1],
        'phone': csv_row[2],
        'url': csv_row[3],
        'description': csv_row[4]
    }

    return test_center

def extract_deletion_test_center_row(csv_row):
    if(len(csv_row) != 1):
        return None

    return csv_row[0]

# For inbound data that is heavily formatted, we use a 19-column format.
# If utilizing this input format, we aim for completeness. But missing fields are OK. 
def extract_preprocessed_test_center_row(csv_row):
    if(len(csv_row) != 19):
        return None
    
    csv_row = [field.replace('"', '') for field in csv_row]
    
    # Normalize data
    app_req_flag = yes_no_to_bool(csv_row[8])
    doc_screen_flag = yes_no_to_bool(csv_row[9])
    drive_thru_flag = yes_no_to_bool(csv_row[10])
    phys_ref_flag = yes_no_to_bool(csv_row[11])
    verif_phone_ext_flag = yes_no_to_bool(csv_row[12])
    free_testing_flag = yes_no_to_bool(csv_row[16])

    test_center = {
        'external_id': csv_row[0],
        'name': csv_row[1],
        'street_address': csv_row[2],
        'city': csv_row[3],
        'state': csv_row[4],
        'zip_code': csv_row[5],
        'phone': csv_row[6],
        'website': csv_row[7],
        'app_req_flag': app_req_flag,
        'doc_screen_flag': doc_screen_flag,
        'drive_thru_flag': drive_thru_flag,
        'phys_ref_flag': phys_ref_flag,
        'verif_phone_ext_flag': verif_phone_ext_flag,
        'description': csv_row[13],
        'hours_of_operation': csv_row[14],
        'me_dhhs_status': csv_row[15],
        'free_testing_for_all': free_testing_flag,
        'confirmed_result_days_min': csv_row[17],
        'confirmed_result_days_max': csv_row[18]
    }

    return test_center

def extract_csv_row_from_public_test_center_obj(test_center_obj):
    #Format matches TARGET_PREPROCESSED_CSV_HEADER

    csv_row = [
        '',
        test_center_obj['name'],
        test_center_obj['address'],
        '',
        '',
        '',
        test_center_obj['phone_number'],
        test_center_obj['website'],
        test_center_obj['appointment_required'],
        test_center_obj['doctor_screen_required_beforehand'],
        test_center_obj['drive_thru_site'],
        test_center_obj['physician_referral_required'],
        test_center_obj['verified_by_phone_external_party'],
        test_center_obj['description'],
        test_center_obj['hours_of_operation'],
        '',
        '',
        '',
        ''
    ]
    
    return csv_row

def write_test_center_array_to_csv(test_center_objs, csv_outfile_name):
    with open(csv_outfile_name, 'w') as out_file:
        out_writer = csv.writer(out_file, delimiter=',', quoting=csv.QUOTE_MINIMAL)
        out_writer.writerow(TARGET_PREPROCESSED_CSV_HEADER)

        for test_center in test_center_objs:
            test_center_row = extract_csv_row_from_public_test_center_obj(test_center)
            out_writer.writerow(test_center_row)