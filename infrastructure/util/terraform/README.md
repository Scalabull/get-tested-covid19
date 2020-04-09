# Terraform Init

## Concept

To use the S3/DynamoDB backend with Terraform requires configuration prior to any normal
variable evaluation. This shell script performs that configuration during
`terraform init` and also creates an `environment.auto.tfvars` file that sets the desired
environment so that it does not need to be specified in any follow-on terraform commands.

## Usage

Inside a terraform template

    terraform {
      required_version = ">= 0.12.0"
      backend "s3" {}
    }

From a directory containing Terraform templates

    ENVIRONMENT=dev ../util/terraform/terraform_init.sh

Terraform will then be initialized for S3 backend with a bucket named "tfstate-AWSACCOUNTID"

## Notes

See [terraform-state-s3](module/state-s3) for details on how state resources are provisioned.

OBJECT_KEY can be set `OBJECT_KEY=foo ENVIRONMENT=dev` to explicitly set an S3 object key to use for
state storage
