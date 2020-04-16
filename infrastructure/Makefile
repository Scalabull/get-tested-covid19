SERVICE_NAME := "gettested"
AUTO_APPROVE=$(shell [ "x${BUILD_PLACEHOLDER}" = "x" ] && echo "" || echo "-auto-approve")

.PHONY: terraform-apply-prep terraform-output
terraform-init:
	OBJECT_KEY=$(SERVICE_NAME) ./util/terraform/terraform_init.sh

terraform-plan:
	terraform plan

terraform-apply:
	terraform apply $(AUTO_APPROVE)

terraform-get-connection:
	terraform apply -target local_file.connection_txt -auto-approve
