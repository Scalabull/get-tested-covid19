import csv
import re

TARGET_CSV_HEADER = [
    'NAME',
    'FULL_ADDRESS',
    'PHONE',
    'URL',
    'DESCRIPTION'
]

TARGET_PREPROCESSED_CSV_HEADER = [
    'EXTERNAL_ID',
    'NAME',
    'STREET_ADDRESS',
    'CITY',
    'STATE',
    'ZIP_CODE',
    'PHONE_NUMBER',
    'WEBSITE',
    'APPOINTMENT_REQUIRED',
    'DOCTOR_SCREEN_REQUIRED',
    'DRIVE_THRU_SITE',
    'PHYSICIAN_REFERRAL_REQUIRED',
    'VERIFIED_BY_EXTERNAL_PARTY',
    'DESCRIPTION',
    'HOURS_FREETEXT'
]

def load_valid_csv_rows(csv_file, is_preprocessed = False):
    valid_test_centers = []

    with open(csv_file) as test_centers_file:
        test_center_reader = csv.reader(test_centers_file)

        header = next(test_center_reader)
        valid_test_centers = []

        if is_preprocessed:
            check_if_valid_header_row(header, TARGET_PREPROCESSED_CSV_HEADER)
            valid_test_centers = extract_valid_rows(test_center_reader, extract_preprocessed_test_center_row) 
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

# For inbound data that is heavily formatted, we use a 15-column format.
# If utilizing this input format, we aim for completeness. But missing fields are OK. 
def extract_preprocessed_test_center_row(csv_row):
    if(len(csv_row) != 15):
        return None
    
    csv_row = [field.replace('"', '') for field in csv_row]
    
    # Normalize data
    app_req_flag = yes_no_to_bool(csv_row[8])
    doc_screen_flag = yes_no_to_bool(csv_row[9])
    drive_thru_flag = yes_no_to_bool(csv_row[10])
    phys_ref_flag = yes_no_to_bool(csv_row[11])
    verif_phone_ext_flag = yes_no_to_bool(csv_row[12])

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
        'hours_of_operation': csv_row[14]
    }

    return test_center

