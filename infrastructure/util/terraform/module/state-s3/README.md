# Terraform State

Sets up a Terraform state backend in AWS S3.

## Requirements

* terraform 0.12.0+
* `~/.aws/credentials` or `AWS_ACCESS_*` env vars with an account that has privileges to manage the following resources:
  * DynamoDB
  * IAM
  * S3

## Installation

To create a default configured AWS S3 backend:

```bash
terraform init
terraform apply
```

You can supply terraform variable values through the standard approaches of env variables (`TF_VAR_<name>`) or command-line params (`-var='<name>=<value>'`):

```bash
terraform apply -var='region=us-east-2'
```

## Notes

An S3 bucket and DynamoDB table will be created named whatever is put into the `name` input variable, suffixed with a dash and
the target AWS account number (to ensure global uniqueness). Make sure that `name` is a valid DNS hostname.
