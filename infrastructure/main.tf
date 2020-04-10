data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

locals {
  name = "${var.environment}-${var.name}"
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

module "ecs-fargate" {
    source              = "cn-terraform/ecs-fargate/aws"
    version             = "2.0.9"
    name_preffix        = local.name
    profile             = "gettested"
    region              = "us-east-1"
    vpc_id              = module.saas_vpc.vpc_id
    availability_zones  = module.saas_vpc.azs
    public_subnets_ids  = module.saas_vpc.public_subnets
    private_subnets_ids = module.saas_vpc.private_subnets
    container_name               = "webserver"
    container_image              = "gettestedcovid19/webserver:latest"
    container_cpu                = 512
    container_memory             = 2048
    container_memory_reservation = 1024
    essential                    = true
    container_port               = 3000
}