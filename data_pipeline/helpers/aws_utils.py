import boto3

def get_loaded_aws_account_info():
    aws_ident = boto3.client('sts').get_caller_identity().get('Account')
    return aws_ident