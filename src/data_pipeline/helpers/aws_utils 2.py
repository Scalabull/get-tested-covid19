import boto3
import json
S3_STAGING_BUCKET = 'staging-gtc-data-batches'
S3_MASTER_BUCKET = 'master-gtc-data-batches'

def get_loaded_aws_account_info():
    aws_ident = boto3.client('sts').get_caller_identity().get('Account')
    return aws_ident

def put_obj_to_s3(s3_client, bucket, key, body_obj):
    s3_client.put_object(Bucket=bucket, 
                Body=(bytes(json.dumps(body_obj, indent=4).encode('UTF-8'))),
                Key= key,
                ContentType='application/json')
    S3_OBJECT_URI = 'https://' + bucket + '.s3.amazonaws.com/' + key
    return S3_OBJECT_URI

def put_diff_dump_to_s3(job_handle, obj):
    s3 = boto3.client('s3')
    S3_OBJECT_KEY = 'unver-staged-jobs/' + job_handle

    STAGING_S3_OBJ_URI = put_obj_to_s3(s3, S3_STAGING_BUCKET, S3_OBJECT_KEY, obj)
    MASTER_S3_OBJ_URI = put_obj_to_s3(s3, S3_MASTER_BUCKET, S3_OBJECT_KEY, obj)

    return STAGING_S3_OBJ_URI, MASTER_S3_OBJ_URI
