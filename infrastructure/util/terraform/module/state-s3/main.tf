data "aws_caller_identity" "current" {}

terraform {
  required_version = ">= 0.12.0"

  required_providers {
    aws = ">= 2.10.0"
  }
}

provider "aws" {
  region = var.region
}

locals {
  bucket_name     = "${var.name}-${data.aws_caller_identity.current.account_id}"
  lock_table_name = "${var.name}-${data.aws_caller_identity.current.account_id}"

  tags = {
    Name = var.name

    "environment"  = var.environment
    "purpose"      = "terraform s3 backend"
  }
}

resource "aws_dynamodb_table" "state" {
  name         = local.lock_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = local.tags
}

resource "aws_s3_bucket" "state" {
  bucket = local.bucket_name

  tags = local.tags

  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket_public_access_block" "state" {
  bucket = aws_s3_bucket.state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_iam_group" "state" {
  name = var.name
}

data "aws_iam_policy_document" "state_s3" {
  statement {
    actions = [
      "s3:ListBucket"
    ]

    resources = [
      "arn:aws:s3:::${aws_s3_bucket.state.bucket}"
    ]
  }

  statement {
    actions = [
      "s3:GetObject",
      "s3:PutObject"
    ]

    resources = [
      "arn:aws:s3:::${aws_s3_bucket.state.bucket}/*"
    ]
  }
}

resource "aws_iam_group_policy" "state_s3" {
  name   = "${var.name}-s3"
  group  = aws_iam_group.state.id
  policy = data.aws_iam_policy_document.state_s3.json
}

data "aws_iam_policy_document" "state_lock" {
  statement {
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:DeleteItem"
    ]

    resources = [
      "arn:aws:dynamodb:*:*:table/${aws_dynamodb_table.state.name}"
    ]
  }
}

resource "aws_iam_group_policy" "state_lock" {
  name   = "${var.name}-lock"
  group  = aws_iam_group.state.id
  policy = data.aws_iam_policy_document.state_lock.json
}

output "state_region" {
  value = var.region
}

output "state_s3_bucket" {
  value = aws_s3_bucket.state.bucket
}

output "state_lock_table" {
  value = aws_dynamodb_table.state.name
}
