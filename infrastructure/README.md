# Get Tested COVID 19 Infrastructure

## Install Terraform

https://learn.hashicorp.com/terraform/getting-started/install.html


## Terraform Steps

### Account setup (done once)

> cd util/terraform/module/state-s3/
> terraform init
> terraform apply

### Init

> ENVIRONMENT=envname make terraform-init

In the init phase the S3 and Dynamo DB state store are setup for the specified $ENVIRONMENT. Modules are installed from the providers specified. This will create a environment.auto.tfvars that allows you to no longer need to specify ENVIRONMENT.

### Plan

> make terraform-plan

In the plan phase terraform takes a look at what is already deployed and lets you know what changes, gets added, gets deleted, etc.

### Apply

> make terraform-apply

In tthe apply phase terraform makes the changes specified in the plan stage.

### Destroy

> terraform destroy