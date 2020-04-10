#!/bin/sh

AWS_ACCOUNT_ID=$(aws sts get-caller-identity --output text | awk '{print $1}')

ENVIRONMENT_="${ENVIRONMENT:-dev}"

OBJECT_KEY_DEFAULT=$(basename $(cd ../;pwd))

# Services have directory SERVICENAME/deployment/tf/ so if ../
# is "deployment", go higher
if [ "x$OBJECT_KEY_DEFAULT" = "xdeployment" ]; then
  echo "Detected in deployment directory, trying again for OBJECT_KEY"
  OBJECT_KEY_DEFAULT=$(basename $(cd ../../;pwd))
fi

OBJECT_KEY=${OBJECT_KEY:-$OBJECT_KEY_DEFAULT}

# Prevent unexpected behavior when init is rerun in the same repo
if [ -f ./.terraform/terraform.tfstate ]; then
  echo "./.terraform/terraform.tfstate exists, init has probably already run"
  echo "moving to ./.terraform/terraform.tfstate.backup"
  mv ./.terraform/terraform.tfstate ./.terraform/terraform.tfstate.backup
fi

# Set environment in a tfvars so that it's not needed on CLI (and conforms to
# init ENVIRONMENT)
if [ -f ./environment.auto.tfvars ]; then
  echo "./environment.auto.tfvars exist, init has probably already run"
  echo "moving to ./environment.auto.tfvars.backup"
  mv ./environment.auto.tfvars ./environment.auto.tfvars.backup
fi
echo "environment = \"$ENVIRONMENT_\"" > ./environment.auto.tfvars

# Keeping account id from posting in CircleCI
#echo "AWS account id AWS_ACCOUNT_ID=$AWS_ACCOUNT_ID"
echo "ENVIRONMENT=$ENVIRONMENT_"
echo "S3 object prefix (should be the name of the subproject) OBJECT_KEY=$OBJECT_KEY"
terraform init \
    -backend-config="bucket=tfstate-$AWS_ACCOUNT_ID" \
    -backend-config="key=${ENVIRONMENT_}-$OBJECT_KEY" \
    -backend-config="dynamodb_table=tfstate-$AWS_ACCOUNT_ID" \
    -backend-config="region=us-east-1" "$@"
