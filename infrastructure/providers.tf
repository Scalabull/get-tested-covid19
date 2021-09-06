terraform {
  required_version = "0.14.11"

  required_providers {
    aws        = "~> 3.0"
    template   = "~> 2.1"
  }

  backend "s3" {}
}

provider "aws" {
  region = var.aws_region
}
