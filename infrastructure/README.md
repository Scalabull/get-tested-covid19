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

In the apply phase terraform makes the changes specified in the plan stage.

### Destroy

> terraform destroy

### Access Bastion and connect to Postgres DB.

Copy SSH key from secret store.

> aws s3 cp s3://gettestedcovid19-datastore/bastion.pem ./

Setup Terraform environment you are looking to access.

> ENVIRONMENT=envname make terraform-init

> make terraform-get-connection

> cat connection.txt

```
Environment: envname
Bastion:
  Username: ec2-user
  Public IP: 123.123.123.123

RDS:
  Cluster Endpoint: ####################.cluster-##########.us-east-1.rds.amazonaws.com
  ClUSTER Instance Endpoints: ####################.##########.us-east-1.rds.amazonaws.com
  Cluster Reader Endpoint: ####################.cluster-ro-##########.us-east-1.rds.amazonaws.com
  Cluster Master Username: ####
  Cluster Password: ########
```

> ssh ec2-user@bastion_public_ip

> sudo yum install postgresql

> psql -U #### -h ####################.##########.us-east-1.rds.amazonaws.com postgres

### Taint and rebuild Bastion

> ENVIRONMENT=envname make terraform-init

> terraform taint module.bastion.aws_instance.instance[0]

> make terraform-plan

> make terraform-apply
