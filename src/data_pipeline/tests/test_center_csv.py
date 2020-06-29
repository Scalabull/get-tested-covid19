import unittest
import os
from helpers import test_center_csv
THIS_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(THIS_DIR, os.pardir, 'data')

class TestCSVMethods(unittest.TestCase):

    def test_csv_row_extraction_insufficient_cols(self):
        self.assertEqual(test_center_csv.extract_test_center_row(['one', 'two', 'three', 'four']), None)
    
    def test_csv_row_extraction_empty_fields(self):
        self.assertEqual(test_center_csv.extract_test_center_row(['', 'two', 'three', 'four', 'five']), None)
        self.assertEqual(test_center_csv.extract_test_center_row(['one', '', 'three', 'four', 'five']), None)
        self.assertEqual(test_center_csv.extract_test_center_row(['one', 'two', '', 'four', 'five']), None)

    def test_csv_row_extraction_basic_case(self):
        target_extract = {
            'name': 'one',
            'full_address': 'two',
            'phone': 'three',
            'url': 'four',
            'description': 'five'
        }
        self.assertEqual(test_center_csv.extract_test_center_row(['one', 'two', 'three', 'four', 'five']), target_extract)

    def test_preprocessed_csv_row_extraction_basic_case(self):
        target_extract = {
            'external_id': 'one',
            'name': 'two',
            'street_address': 'three',
            'city': 'four',
            'state': 'five',
            'zip_code': 'six',
            'phone': 'seven',
            'website': 'eight',
            'app_req_flag': True,
            'doc_screen_flag': False,
            'drive_thru_flag': True,
            'description': 'twelve'
        }
        self.assertEqual(test_center_csv.extract_preprocessed_test_center_row(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'yes', 'no', 'yes', 'twelve']), target_extract)

    def test_csv_load_no_header(self):
        with self.assertRaises(Exception):
            test_center_csv.load_valid_csv_rows(os.path.join(DATA_PATH, 'csv_no_header.csv'))
    
    def test_csv_load_ok(self):
        rows = test_center_csv.load_valid_csv_rows(os.path.join(DATA_PATH, 'basic_csv_sample.csv'))
        self.assertEqual(len(rows), 2)

    def test_preprocessed_csv_header_accept(self):
        accepted_header = [
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
            'DESCRIPTION'
        ]

        self.assertEqual(test_center_csv.check_if_valid_header_row(accepted_header, test_center_csv.TARGET_PREPROCESSED_CSV_HEADER), True)
    
    def test_preprocessed_csv_header_reject(self):
        # This header is missing the first column
        rejected_header = [
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
            'DESCRIPTION'
        ]
        with self.assertRaises(Exception):
            test_center_csv.check_if_valid_header_row(rejected_header, test_center_csv.TARGET_PREPROCESSED_CSV_HEADER)

if __name__ == '__main__':
    unittest.main()