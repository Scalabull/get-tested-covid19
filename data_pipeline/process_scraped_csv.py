import csv

# Command line interface
# Get all recent staged test center rows that aren't already in our verified or unverified datasets
@click.command()
@click.option('--csv_file', default=None, help='CSV file containing scraped test center rows.')
@click.option('--is_preprocessed', default=False, help='Set to True if providing a spreadsheet with preprocessed details like is_drivethru, appointment_required, ... In practice, this should almost always be False.'
def exec_tool(csv_file, is_preprocessed):
    print('A Get Tested COVID19 AWS account is required to us this utility.')

    aws_ident = boto3.client('sts').get_caller_identity().get('Account')
    print('Using AWS Identity: ', aws_ident)

    process_csv(csv_file)

def process_csv(csv_file):
    with open(csv_file) as test_centers_file:
        test_center_reader = csv.reader(test_centers_file)
        for test_center in test_center_reader:
            
            # check if valid row

        # provide a brief report of rows. Interactive - user chooses whether to proceed with Inbounds insertion

        # Insert all rows to Inbounds, store IDs in in-memory list. Drop failures. Track stats.

        # Preprocess all Inbounds rows and insert into Staging table. Drop failures / incomplete data. Track stats.

        # Pass IDs to staging-unverified process, create dump obj in S3. 
        
        # Print S3 URL along with brief stats about the whole process.
            

