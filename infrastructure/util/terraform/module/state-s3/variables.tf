variable "environment" {
  type        = string
  description = "Whether this is a `dev` or `prod` environment, for example. This value is passed on to the `environment` tag in AWS. Defaults to `prod`."
  default     = "prod"
}

variable "name" {
  type = string
  description = "Name of the state backend."
  default = "tfstate"
}

variable "region" {
  type        = string
  description = "AWS Region in which to create the state resources that are regional, such as the DynamoDB lock table."
  default     = "us-east-1"
}
