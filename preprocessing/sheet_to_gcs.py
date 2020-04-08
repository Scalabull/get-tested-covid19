import pandas as pd
import numpy as np
import gspread
import json
import logging
from oauth2client.service_account import ServiceAccountCredentials
from google.cloud import storage

SPEADSHEET_NAME = 'Updated Corona Virus Testing Site Form (Responses)'
WORKSHEET_NAME = 'Form Responses 1'
BUCKET_NAME = 'gtest-abs'
CREDENTIALS_FILEPATH = 'GSheetsToGCS-credentials.json'
RECORDS_FILENAME = 'all_sheet_records.json'
accepted_columns_names = ['name','address','city','state', 'zip', 'lat','lng','phone','hours','days','opPeriod','link','appReq','docScreen','driveThru','walkUp','description','estCap','comments']

def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # bucket_name = "your-bucket-name"
    # source_file_name = "local/path/to/file"
    # destination_blob_name = "storage-object-name"

    storage_client = storage_client = storage.Client.from_service_account_json(CREDENTIALS_FILEPATH)
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(
        "File {} uploaded to {}.".format(
            source_file_name, destination_blob_name
        )
    )

if __name__ == '__main__':

    # create logger 
    logger = logging.getLogger('main')
    logger.setLevel(logging.DEBUG)
    ch = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    ch.setFormatter(formatter)
    logger.addHandler(ch)

    # authorize a client for connection to gsheet
    scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_FILEPATH, scope)
    client = gspread.authorize(creds)

    # connect to gsheet and pull all values of first sheet
    sheet = client.open(SPEADSHEET_NAME).sheet1
    all_entries = sheet.get_all_records()
    all_entries_df = pd.DataFrame(all_entries)
    logger.info('records retrieved from gsheet')

    # filter out rows that were not accepted
    new_accepted_entries_df = new_entries_df[new_entries_df['Accepted'] == 1]

    # drop unneeded columns and rename the rest
    new_accepted_entries_df.drop(['Timestamp', 'Accepted'], axis=1, inplace=True)
    new_accepted_entries_df.columns = accepted_columns_names

    # set the right column types
    new_accepted_entries_df = new_accepted_entries_df.astype(str)
    new_accepted_entries_df[['lat','lng']] = new_accepted_entries_df[['lat','lng']].astype(float)

    # format as json and add main key
    entries_json_string = new_accepted_entries_df.to_json(orient='records', force_ascii=False)
    entries_json = json.loads(entries_json_string)
    entries_json = {'testSites':entries_json}
    logger.info('records JSON object created')

    # write json object to file
    with open(RECORDS_FILENAME, 'w') as f:
        json.dump(entries_json, f, ensure_ascii=False)
    logger.info('records JSON object written to file')

    # upload json file to gcs bucket
    upload_blob(bucket_name=BUCKET_NAME, source_file_name=RECORDS_FILENAME, destination_blob_name=RECORDS_FILENAME)
    logger.info('records JSON object uploaded to bucket')

