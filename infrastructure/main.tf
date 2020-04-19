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
  source  = "git@github.com:patrickpierson/terraform-aws-fargate.git"
  name = "gtcv"
  environment = "${var.environment}"
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

resource "aws_db_parameter_group" "aurora_db_postgres11_parameter_group" {
  name        = "${var.environment}-gettestedcovid19"
  family      = "aurora-postgresql11"
  description = "${var.environment}-aurora-db-postgres11-parameter-group"
}

resource "aws_rds_cluster_parameter_group" "aurora_cluster_postgres11_parameter_group" {
  name        = "${var.environment}-gettestedcovid19"
  family      = "aurora-postgresql11"
  description = "${var.environment}-aurora-postgres11-cluster-pg"
}

module "db" {
  source  = "terraform-aws-modules/rds-aurora/aws"
  version = "~> 2.0"

  name                            = local.name

  engine                          = "aurora-postgresql"
  engine_version                  = "11.6"

  vpc_id                          = module.saas_vpc.vpc_id
  subnets                         = module.saas_vpc.private_subnets

  replica_count                   = 1
  #allowed_security_groups         = []
  allowed_cidr_blocks             = ["10.200.0.0/21"]
  instance_type                   = "db.t3.medium"
  storage_encrypted               = true
  apply_immediately               = true
  monitoring_interval             = 10

  db_parameter_group_name         = local.name
  db_cluster_parameter_group_name = local.name

  enabled_cloudwatch_logs_exports = ["postgresql"]

  tags                            = local.common_tags
}

module "bastion" {
  source  = "philips-software/bastion/aws"
  version = "2.0.0"
  enable_bastion = true

  environment = var.environment
  project     = local.name

  aws_region = var.aws_region
  key_name   = "bastion"
  subnet_id  = element(module.saas_vpc.public_subnets, 0)
  vpc_id     = module.saas_vpc.vpc_id
  tags = local.common_tags
}

data "template_file" "connection_txt" {
  template = file("${path.module}/templates/connection.txt.tpl")

  vars = {
    environment                     = var.environment
    rds_cluster_endpoint            = module.db.this_rds_cluster_endpoint
    rds_cluster_instance_endpoints  = module.db.this_rds_cluster_instance_endpoints[0]
    rds_cluster_reader_endpoint     = module.db.this_rds_cluster_reader_endpoint
    rds_cluster_master_username     = module.db.this_rds_cluster_master_username
    rds_cluster_master_password     = module.db.this_rds_cluster_master_password
    bastion_public_ip               = module.bastion.public_ip
  }
}

resource "local_file" "connection_txt" {
  sensitive_content = data.template_file.connection_txt.rendered
  filename = "./connection.txt"
}

output "rds_cluster_endpoint" {
  value = module.db.this_rds_cluster_endpoint
  sensitive   = true  
}

output "rds_cluster_instance_endpoints" {
  value = module.db.this_rds_cluster_instance_endpoints
  sensitive   = true
}

output "rds_cluster_reader_endpoint" {
  value = module.db.this_rds_cluster_reader_endpoint
  sensitive   = true
}

output "rds_cluster_master_username" {
  value = module.db.this_rds_cluster_master_username
  sensitive   = true
}

output "rds_cluster_master_password" {
  value = module.db.this_rds_cluster_master_password
  sensitive   = true
}

output "bastion_public_ip" {
  value = module.bastion.public_ip
  sensitive   = true
}
