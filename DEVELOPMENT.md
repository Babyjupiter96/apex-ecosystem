# Development Setup

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker + Docker Compose
- AWS CLI (for infra work)
- Terraform 1.9+ (for infra work)

## Quick Start

```bash
# 1. Clone and install dependencies
git clone <repo>
cd apex-ecosystem
pnpm install

# 2. Copy env file and fill in values
cp .env.example .env.local
# Fill in CLERK keys, DATABASE_URL, etc.

# 3. Start local services (Postgres, Redis, Meilisearch)
docker compose up -d

# 4. Run database migrations + seed
pnpm db:migrate:dev
pnpm db:seed

# 5. Start all apps
pnpm dev

# Or start individual apps:
pnpm dev:agency   # http://localhost:3000
pnpm dev:pt       # http://localhost:3001
pnpm dev:admin    # http://localhost:3002
```

## Environment Variables

Copy `.env.example` to `.env.local`. Required for local dev:

| Variable | Where to Get |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | [clerk.com](https://clerk.com) dashboard |
| `CLERK_SECRET_KEY` | Clerk dashboard |
| `CLERK_WEBHOOK_SECRET` | Clerk > Webhooks |
| `DATABASE_URL` | Pre-filled for local Docker |
| `NEXT_PUBLIC_POSTHOG_KEY` | [posthog.com](https://posthog.com) |
| `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com) |
| `RESEND_API_KEY` | [resend.com](https://resend.com) |
| `STRIPE_SECRET_KEY` | [stripe.com](https://stripe.com) |

## Database

```bash
pnpm db:migrate:dev   # Run pending migrations
pnpm db:studio        # Open Prisma Studio (http://localhost:5555)
pnpm db:seed          # Seed tenants, pipelines, sample data
```

## Architecture

```
apps/
  agency/   → studioapex.com          (port 3000)
  pt/       → apexperformance.io      (port 3001)
  admin/    → admin.studioapex.com    (port 3002)

packages/
  ui/       → Shared React components + design system
  db/       → Prisma client + repositories
  auth/     → Clerk + RBAC + rate limiting
  analytics/→ PostHog client + server
  email/    → Resend + React Email templates
  types/    → Shared TypeScript types
  config/   → ESLint, TypeScript, Tailwind configs
```

## Tenant Resolution (Local)

Each app resolves its tenant via the `NEXT_PUBLIC_TENANT_ID` env var in `.env.local`.
The middleware also maps localhost ports:
- `localhost:3000` → `apex-agency` (Studio Apex)
- `localhost:3001` → `apex-pt` (Apex Performance)
- `localhost:3002` → `apex-agency` (Admin)

## CI/CD

- PRs → Run CI (lint, typecheck, build check)
- Merge to `main` → Auto-deploy via GitHub Actions
- Infra changes → Terraform plan on PR, apply on merge

## Infra (Terraform)

```bash
cd infrastructure/terraform/environments/prod
terraform init
terraform plan -var-file="terraform.tfvars.json"
terraform apply
```
