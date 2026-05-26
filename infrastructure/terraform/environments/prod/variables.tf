variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "db_password" {
  description = "RDS master password"
  type        = string
  sensitive   = true
}

variable "cloudfront_origin_secret" {
  description = "Shared secret between CloudFront and ALB (prevents direct ALB access)"
  type        = string
  sensitive   = true
}
