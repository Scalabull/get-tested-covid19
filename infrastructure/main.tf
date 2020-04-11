data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

locals {
  name = "${var.environment}-${var.name}"
  env_dns_prefix = var.environment != "master" ? "${var.environment}." : ""
  image_tag = var.environment == "master" ? "latest" : "staging"
  common_tags = {
    Name                                  = local.name
    Purpose                               = "gettestedcovid19 infra"
    environment                           = var.environment
  }
}

module "saas_vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = local.name
  cidr = var.vpc_cidr

  azs             = ["${data.aws_availability_zones.available.names[0]}", "${data.aws_availability_zones.available.names[1]}", "${data.aws_availability_zones.available.names[2]}"]
  private_subnets = [cidrsubnet(var.vpc_cidr, 3, 0), cidrsubnet(var.vpc_cidr, 3, 1), cidrsubnet(var.vpc_cidr, 3, 2)]
  public_subnets  = [cidrsubnet(var.vpc_cidr, 3, 3), cidrsubnet(var.vpc_cidr, 3, 4), cidrsubnet(var.vpc_cidr, 3, 5)]

  enable_dns_hostnames = true
  enable_nat_gateway   = true
  single_nat_gateway   = true

  tags = local.common_tags
}

module "fargate" {
  source  = "strvcom/fargate/aws"
  version = "0.17.0"
  name = "${var.environment}"

  vpc_create = false
  vpc_external_id = module.saas_vpc.vpc_id

  vpc_external_public_subnets_ids = module.saas_vpc.public_subnets
  vpc_external_private_subnets_ids = module.saas_vpc.private_subnets

  services = {
    webserver = {
      task_definition = "service-templates/webserver-${local.image_tag}.json"
      container_port  = 3000
      cpu             = "256"
      memory          = "512"
      replicas        = 1
      registry_retention_count = 15
      logs_retention_days      = 14
      health_check_interval = 30
      health_check_path     = "/"
      acm_certificate_arn = "arn:aws:acm:us-east-1:${data.aws_caller_identity.current.account_id}:certificate/fc031590-82a6-4f62-b0e5-c30b5d2e6996"
      auto_scaling_max_replicas = 5
      auto_scaling_max_cpu_util = 60
    }
  }
}

resource "aws_route53_record" "www" {
  zone_id = "Z0805372RGZMLZDPFNEH"
  name    = "${local.env_dns_prefix}get-tested-covid19.org"
  type    = "A"

  alias {
    name                   = module.fargate.application_load_balancers_dns_names[0]
    zone_id                = module.fargate.application_load_balancers_zone_ids[0]
    evaluate_target_health = true
  }
}
