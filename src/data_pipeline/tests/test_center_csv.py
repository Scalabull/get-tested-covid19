import unittest
import os
from helpers import test_center_csv
THIS_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(THIS_DIR, os.pardir, 'data')

class TestCSVMethods(unittest.TestCase):

    def test_csv_row_extraction_insufficient_cols(self):
        self.assertEqual(test_center_csv.extract_test_center_from_csv(['one', 'two', 'three', 'four']), None)
    
    def test_csv_row_extraction_empty_fields(self):
        self.assertEqual(test_center_csv.extract_test_center_from_csv(['', 'two', 'three', 'four', 'five']), None)
        self.assertEqual(test_center_csv.extract_test_center_from_csv(['one', '', 'three', 'four', 'five']), None)
        self.assertEqual(test_center_csv.extract_test_center_from_csv(['one', 'two', '', 'four', 'five']), None)

    def test_csv_row_extraction_basic_case(self):
        target_extract = {
            'name': 'one',
            'full_address': 'two',
            'phone': 'three',
            'url': 'four',
            'description': 'five'
        }
        self.assertEqual(test_center_csv.extract_test_center_from_csv(['one', 'two', 'three', 'four', 'five']), target_extract)

    def test_csv_load_no_header(self):
        with self.assertRaises(Exception):
            test_center_csv.load_valid_csv_rows(os.path.join(DATA_PATH, 'csv_no_header.csv'))
    
    def test_csv_load_ok(self):
        rows = test_center_csv.load_valid_csv_rows(os.path.join(DATA_PATH, 'basic_csv_sample.csv'))
        self.assertEqual(len(rows), 2)

if __name__ == '__main__':
    unittest.main()