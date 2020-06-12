terraform {
  required_version = "= 0.12.26"

  required_providers {
    aws        = "~> 2.21"
    template   = "~> 2.1"
  }

  backend "s3" {}
}

provider "aws" {
  region = var.aws_region
}