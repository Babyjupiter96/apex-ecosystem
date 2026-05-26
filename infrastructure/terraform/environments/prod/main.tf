terraform {
  required_version = ">= 1.9.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.60"
    }
  }
  backend "s3" {
    # Configure via -backend-config in CI
    key     = "apex-ecosystem/prod/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project     = "apex-ecosystem"
      Environment = "production"
      ManagedBy   = "terraform"
    }
  }
}

# ── Data sources ──────────────────────────────────────────────────────────────

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

# ── Networking ────────────────────────────────────────────────────────────────

module "vpc" {
  source = "../../modules/vpc"

  env             = "prod"
  vpc_cidr        = "10.0.0.0/16"
  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  private_subnets = ["10.0.10.0/24", "10.0.11.0/24", "10.0.12.0/24"]
  data_subnets    = ["10.0.20.0/24", "10.0.21.0/24", "10.0.22.0/24"]
}

# ── ACM certificates ──────────────────────────────────────────────────────────

module "acm_agency" {
  source      = "../../modules/acm"
  domain_name = "studioapex.com"
  san         = ["www.studioapex.com", "*.studioapex.com"]
}

module "acm_pt" {
  source      = "../../modules/acm"
  domain_name = "apexperformance.io"
  san         = ["www.apexperformance.io", "*.apexperformance.io", "*.apexmicro.io"]
}

# ── Database ──────────────────────────────────────────────────────────────────

module "rds" {
  source = "../../modules/rds"

  env              = "prod"
  instance_class   = "db.r6g.xlarge"
  multi_az         = true
  deletion_protection = true
  db_name          = "apex_prod"
  db_username      = "apex"
  db_password      = var.db_password
  vpc_id           = module.vpc.vpc_id
  subnet_ids       = module.vpc.data_subnet_ids
  allowed_sg_ids   = [module.ecs.service_sg_id]

  # Read replica in same region
  read_replica_count = 1
  read_replica_class = "db.r6g.large"
}

# ── Redis ─────────────────────────────────────────────────────────────────────

module "elasticache" {
  source = "../../modules/elasticache"

  env            = "prod"
  node_type      = "cache.r6g.large"
  num_shards     = 2
  replicas_per_shard = 1
  vpc_id         = module.vpc.vpc_id
  subnet_ids     = module.vpc.data_subnet_ids
  allowed_sg_ids = [module.ecs.service_sg_id]
}

# ── S3 Buckets ────────────────────────────────────────────────────────────────

module "s3" {
  source = "../../modules/s3"

  buckets = {
    media    = "apex-media-prod"
    assets   = "apex-static-assets-prod"
    backups  = "apex-backups-prod"
    logs     = "apex-access-logs-prod"
  }
}

# ── ALB ───────────────────────────────────────────────────────────────────────

module "alb" {
  source = "../../modules/alb"

  env            = "prod"
  vpc_id         = module.vpc.vpc_id
  subnet_ids     = module.vpc.public_subnet_ids
  certificate_arns = [module.acm_agency.certificate_arn, module.acm_pt.certificate_arn]
  s3_logs_bucket = module.s3.bucket_ids["logs"]
}

# ── WAF ───────────────────────────────────────────────────────────────────────

module "waf" {
  source = "../../modules/waf"
  scope  = "CLOUDFRONT"
}

# ── ECS Cluster ───────────────────────────────────────────────────────────────

module "ecs" {
  source = "../../modules/ecs"

  env        = "prod"
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnet_ids
  alb_arn    = module.alb.arn
  alb_sg_id  = module.alb.security_group_id

  services = {
    "agency-web" = {
      image          = "${data.aws_caller_identity.current.account_id}.dkr.ecr.us-east-1.amazonaws.com/apex-agency:latest"
      cpu            = 512
      memory         = 1024
      desired_count  = 2
      max_count      = 10
      port           = 3000
      health_path    = "/api/health"
      host_header    = "studioapex.com"
    }
    "pt-web" = {
      image          = "${data.aws_caller_identity.current.account_id}.dkr.ecr.us-east-1.amazonaws.com/apex-pt:latest"
      cpu            = 512
      memory         = 1024
      desired_count  = 2
      max_count      = 10
      port           = 3001
      health_path    = "/api/health"
      host_header    = "apexperformance.io"
    }
    "admin-web" = {
      image          = "${data.aws_caller_identity.current.account_id}.dkr.ecr.us-east-1.amazonaws.com/apex-admin:latest"
      cpu            = 256
      memory         = 512
      desired_count  = 1
      max_count      = 3
      port           = 3002
      health_path    = "/api/health"
      host_header    = "admin.studioapex.com"
    }
  }

  environment_variables = {
    DATABASE_URL        = "postgresql://apex:${var.db_password}@${module.rds.endpoint}/apex_prod"
    DATABASE_DIRECT_URL = "postgresql://apex:${var.db_password}@${module.rds.endpoint}/apex_prod"
    REDIS_URL           = "redis://${module.elasticache.endpoint}:6379"
    NODE_ENV            = "production"
  }

  secrets_arns = {
    CLERK_SECRET_KEY    = aws_secretsmanager_secret.clerk_secret.arn
    OPENAI_API_KEY      = aws_secretsmanager_secret.openai_key.arn
    RESEND_API_KEY      = aws_secretsmanager_secret.resend_key.arn
    STRIPE_SECRET_KEY   = aws_secretsmanager_secret.stripe_key.arn
  }
}

# ── CloudFront Distributions ──────────────────────────────────────────────────

module "cloudfront_agency" {
  source = "../../modules/cloudfront"

  domain_name      = "studioapex.com"
  aliases          = ["studioapex.com", "www.studioapex.com"]
  origin_domain    = module.alb.dns_name
  s3_origin_id     = module.s3.bucket_ids["assets"]
  certificate_arn  = module.acm_agency.certificate_arn
  waf_arn          = module.waf.arn
  origin_secret    = var.cloudfront_origin_secret
}

module "cloudfront_pt" {
  source = "../../modules/cloudfront"

  domain_name      = "apexperformance.io"
  aliases          = ["apexperformance.io", "www.apexperformance.io"]
  origin_domain    = module.alb.dns_name
  s3_origin_id     = module.s3.bucket_ids["assets"]
  certificate_arn  = module.acm_pt.certificate_arn
  waf_arn          = module.waf.arn
  origin_secret    = var.cloudfront_origin_secret
}

# ── Secrets Manager ───────────────────────────────────────────────────────────

resource "aws_secretsmanager_secret" "clerk_secret" {
  name                    = "apex/prod/clerk-secret-key"
  recovery_window_in_days = 7
}

resource "aws_secretsmanager_secret" "openai_key" {
  name                    = "apex/prod/openai-api-key"
  recovery_window_in_days = 7
}

resource "aws_secretsmanager_secret" "resend_key" {
  name                    = "apex/prod/resend-api-key"
  recovery_window_in_days = 7
}

resource "aws_secretsmanager_secret" "stripe_key" {
  name                    = "apex/prod/stripe-secret-key"
  recovery_window_in_days = 7
}
