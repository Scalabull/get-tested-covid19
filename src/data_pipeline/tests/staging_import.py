import unittest
import os
from helpers import gtc_api_helpers
THIS_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(THIS_DIR, os.pardir, "data")

class TestStagingImportMethods(unittest.TestCase):

    def test_staging_table_format_valid(self):

        stubbed_formatted_address_obj = {
            "formatted_address": "addr-1",
            "lat_lng": {
                "lat": "addr-2",
                "lng": "addr-3"
            },
            "google_place_id": "addr-4"
        }

        expected_staging_obj_format = {
            "inbounds_id": "9",
            "public": False,
            "name": "1",
            "address": "addr-1",
            "latitude": "addr-2",
            "longitude": "addr-3",
            "phone_number": "2",
            "website": "3",
            "appointment_required": "6",
            "drive_thru_site": "7",
            "doctor_screen_required_beforehand": "8",
            "description": "4",
            "address_freetext_blob": "11",
            "external_id": "10",
            "google_place_id": "addr-4"
        }

        staging_obj = gtc_api_helpers.generate_staging_test_center_object(name="1", phone="2", website="3", description="4", formatted_address_obj=stubbed_formatted_address_obj, app_req_flag="6", drive_thru_flag="7", doc_screen_flag="8", inbound_row_id="9", external_id="10", address_freetext="11")
        self.assertEqual(expected_staging_obj_format, staging_obj)
    
    # This test is more akin to an integration test - verifies the inbound to staging conversion process is working properly
    def test_inbound_to_staging_row_conversion_valid(self):

        def stubbed_preprocessor(*ignore, app_cache=None):
            return {
                "address_components": {
                    "formatted_address": "addr-1",
                    "lat_lng": {
                        "lat": "addr-2",
                        "lng": "addr-3"
                    },
                    "google_place_id": "addr-4"
                },
                "app_required": "pp-2",
                "drive_thru": "pp-3",
                "screen_required": "pp-4",
                "lat_lng": "pp-5",
                "formatted_phone": "pp-6"
            }

        inbound_row = {
            "id": "1",
            "name": "2",
            "full_address": "3",
            "phone": "4",
            "url": "5",
            "description": "6"
        }

        expected_staging_obj_format = {
            "inbounds_id": "1",
            "public": False,
            "name": "2",
            "address": "addr-1",
            "latitude": "addr-2",
            "longitude": "addr-3",
            "phone_number": "pp-6",
            "website": "5",
            "appointment_required": "pp-2",
            "drive_thru_site": "pp-3",
            "doctor_screen_required_beforehand": "pp-4",
            "description": "6",
            "address_freetext_blob": "3",
            "external_id": None,
            "google_place_id": "addr-4"
        }

        staging_obj = gtc_api_helpers.convert_inbound_row_to_staging_row(inbound_row, stubbed_preprocessor)
        self.assertEqual(expected_staging_obj_format, staging_obj)
    
    # This test is more akin to an integration test - verifies the preprocessed to staging conversion process is working properly
    def test_preprocessed_to_staging_row_conversion_valid(self):

        def stubbed_formatted_address_preprocessor(*ignore, app_cache=None):
            return {
                "formatted_address": "addr-1",
                "lat_lng": {
                    "lat": "addr-2",
                    "lng": "addr-3"
                },
                "google_place_id": "addr-4"
            }

        preprocessed_row = {
            "external_id": "1",
            "name": "2",
            "street_address": "3",
            "city": "4",
            "state": "5",
            "zip_code": "6",
            "phone": "7",
            "website": "8",
            "app_req_flag": "9",
            "doc_screen_flag": "10",
            "drive_thru_flag": "11",
            "description": "12"
        }

        expected_staging_obj_format = {
            "inbounds_id": None,
            "public": False,
            "name": "2",
            "address": "addr-1",
            "latitude": "addr-2",
            "longitude": "addr-3",
            "phone_number": "7",
            "website": "8",
            "appointment_required": "9",
            "drive_thru_site": "11",
            "doctor_screen_required_beforehand": "10",
            "description": "12",
            "address_freetext_blob": "3 4, 5 6",
            "external_id": "1",
            "google_place_id": "addr-4"
        }

        staging_obj = gtc_api_helpers.convert_preprocessed_row_to_staging_row(preprocessed_row, stubbed_formatted_address_preprocessor)
        self.assertEqual(expected_staging_obj_format, staging_obj)
    
if __name__ == "__main__":
    unittest.main()