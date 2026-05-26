variable "domain_name"     {}
variable "aliases"         { type = list(string) }
variable "origin_domain"   {}
variable "s3_origin_id"    {}
variable "certificate_arn" {}
variable "waf_arn"         {}
variable "origin_secret"   { sensitive = true }

resource "aws_cloudfront_origin_access_control" "s3" {
  name                              = "${var.domain_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_cache_policy" "immutable_static" {
  name        = "${replace(var.domain_name, ".", "-")}-immutable-static"
  min_ttl     = 31536000
  default_ttl = 31536000
  max_ttl     = 31536000

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config { cookie_behavior = "none" }
    headers_config { header_behavior = "none" }
    query_strings_config { query_string_behavior = "none" }
    enable_accept_encoding_gzip   = true
    enable_accept_encoding_brotli = true
  }
}

resource "aws_cloudfront_cache_policy" "dynamic" {
  name        = "${replace(var.domain_name, ".", "-")}-dynamic"
  min_ttl     = 0
  default_ttl = 0
  max_ttl     = 86400

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config { cookie_behavior = "none" }
    headers_config {
      header_behavior = "whitelist"
      headers { items = ["Host", "X-Forwarded-For"] }
    }
    query_strings_config { query_string_behavior = "all" }
    enable_accept_encoding_gzip   = true
    enable_accept_encoding_brotli = true
  }
}

resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  is_ipv6_enabled     = true
  http_version        = "http2and3"
  price_class         = "PriceClass_All"
  aliases             = var.aliases
  comment             = var.domain_name
  web_acl_id          = var.waf_arn

  # ALB origin (Next.js SSR)
  origin {
    domain_name = var.origin_domain
    origin_id   = "alb-origin"
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
    custom_header {
      name  = "X-Origin-Secret"
      value = var.origin_secret
    }
  }

  # S3 origin (static assets)
  origin {
    domain_name              = var.s3_origin_id
    origin_id                = "s3-assets"
    origin_access_control_id = aws_cloudfront_origin_access_control.s3.id
  }

  # /_next/static/* → S3, immutable cache
  ordered_cache_behavior {
    path_pattern           = "/_next/static/*"
    target_origin_id       = "s3-assets"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = aws_cloudfront_cache_policy.immutable_static.id
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  # /images/* → S3, long TTL
  ordered_cache_behavior {
    path_pattern           = "/images/*"
    target_origin_id       = "s3-assets"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = aws_cloudfront_cache_policy.immutable_static.id
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  # Default → ALB (SSR)
  default_cache_behavior {
    target_origin_id       = "alb-origin"
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = aws_cloudfront_cache_policy.dynamic.id
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
  }

  viewer_certificate {
    acm_certificate_arn      = var.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }

  logging_config {
    bucket          = "apex-access-logs-prod.s3.amazonaws.com"
    prefix          = "${var.domain_name}/"
    include_cookies = false
  }
}

output "distribution_id"     { value = aws_cloudfront_distribution.main.id }
output "distribution_domain" { value = aws_cloudfront_distribution.main.domain_name }
