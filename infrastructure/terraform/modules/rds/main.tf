variable "env"                {}
variable "instance_class"     {}
variable "multi_az"           { default = true }
variable "deletion_protection" { default = true }
variable "db_name"            {}
variable "db_username"        {}
variable "db_password"        { sensitive = true }
variable "vpc_id"             {}
variable "subnet_ids"         { type = list(string) }
variable "allowed_sg_ids"     { type = list(string) }
variable "read_replica_count" { default = 1 }
variable "read_replica_class" { default = "db.r6g.large" }

resource "aws_db_subnet_group" "main" {
  name       = "apex-${var.env}-db-subnet"
  subnet_ids = var.subnet_ids
}

resource "aws_security_group" "rds" {
  name   = "apex-${var.env}-rds-sg"
  vpc_id = var.vpc_id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = var.allowed_sg_ids
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "primary" {
  identifier              = "apex-${var.env}"
  engine                  = "postgres"
  engine_version          = "16.3"
  instance_class          = var.instance_class
  allocated_storage       = 100
  max_allocated_storage   = 1000
  storage_type            = "gp3"
  storage_encrypted       = true
  db_name                 = var.db_name
  username                = var.db_username
  password                = var.db_password
  db_subnet_group_name    = aws_db_subnet_group.main.name
  vpc_security_group_ids  = [aws_security_group.rds.id]
  multi_az                = var.multi_az
  deletion_protection     = var.deletion_protection
  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "Mon:04:00-Mon:05:00"
  skip_final_snapshot     = false
  final_snapshot_identifier = "apex-${var.env}-final-snapshot"

  performance_insights_enabled = true
  monitoring_interval          = 60

  parameter_group_name = aws_db_parameter_group.main.name

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_db_parameter_group" "main" {
  name   = "apex-${var.env}-pg16"
  family = "postgres16"

  parameter {
    name  = "shared_preload_libraries"
    value = "pg_stat_statements"
  }
  parameter {
    name  = "log_min_duration_statement"
    value = "1000"
  }
  parameter {
    name  = "max_connections"
    value = "200"
  }
}

resource "aws_db_instance" "read_replica" {
  count                  = var.read_replica_count
  identifier             = "apex-${var.env}-replica-${count.index}"
  replicate_source_db    = aws_db_instance.primary.identifier
  instance_class         = var.read_replica_class
  storage_encrypted      = true
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.rds.id]

  performance_insights_enabled = true
}

output "endpoint"         { value = aws_db_instance.primary.endpoint }
output "read_endpoint"    { value = try(aws_db_instance.read_replica[0].endpoint, "") }
output "security_group_id" { value = aws_security_group.rds.id }
