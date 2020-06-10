import csv

def load_valid_csv_rows(csv_file):
    valid_test_centers = []

    with open(csv_file) as test_centers_file:
        # Confirm columns are correct, header present
        test_center_reader = csv.reader(test_centers_file)

        header = next(test_center_reader)
        check_if_valid_header_row(header)

        for test_center in test_center_reader:
            valid_test_center = extract_test_center_from_csv(test_center)
            if(valid_test_center != None):
                valid_test_centers.append(valid_test_center)
            
        return valid_test_centers

def check_if_valid_header_row(header):
    if(header[0] != 'NAME' or header[1] != 'FULL_ADDRESS' or header[2] != 'PHONE' or header[3] != 'URL' or header[4] != 'DESCRIPTION'):
        raise Exception('CSV_HEADER_FORMAT_INVALID', 'Proper CSV header (and format): NAME,FULL_ADDRESS,PHONE,URL,DESCRIPTION')

# Expects a list of strings: name, full address, phone, URL, description
def extract_test_center_from_csv(csv_row):
    if(len(csv_row) != 5):
        return None

    if(csv_row[0] == '' or csv_row[1] == '' or csv_row[2] == ''):
        return None
        
    test_center = {
        'name': csv_row[0],
        'full_address': csv_row[1],
        'phone': csv_row[2],
        'url': csv_row[3],
        'description': csv_row[4]
    }

    return test_center
