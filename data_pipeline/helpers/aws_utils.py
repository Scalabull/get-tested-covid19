import boto3
import json
S3_BUCKET = 'staging-gtc-data-batches'

def get_loaded_aws_account_info():
    aws_ident = boto3.client('sts').get_caller_identity().get('Account')
    return aws_ident

def put_diff_dump_to_s3(job_handle, obj):
    s3 = boto3.client('s3')
    S3_OBJECT_KEY = 'unver-staged-jobs/' + job_handle
    s3.put_object(Bucket=S3_BUCKET, 
                Body=(bytes(json.dumps(obj, indent=4).encode('UTF-8'))),
                Key= S3_OBJECT_KEY,
                ContentType='application/json')
    S3_OBJECT_URL = 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + S3_OBJECT_KEY
    return S3_OBJECT_URL