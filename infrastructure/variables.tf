variable "name" {
  type        = string
  description = "Name of deployment"
  default     = "gettestedcovid19"
}

variable "environment" {
  type        = string
  description = "Name of environment to deploy"
  default     = "dev"
}

variable "aws_region" {
  type        = string
  description = "AWS Region to deploy to"
  default     = "us-east-1"
}

variable "vpc_cidr" {
  type        = string
  description = "CIDR to use for VPC"
  default     = "10.200.0.0/21"
}

variable "google_geocoding_key" {
  type        = string
  description = "Geocoding key for Google"
  default     = "REPLACE_ME"
}