# Apex Ecosystem

A multi-brand, multi-tenant web platform in a single pnpm/Turborepo monorepo: three Next.js applications for two brands, sharing one design system, one database layer, one auth and permissions model, and one CI/CD and infrastructure setup.

> **Status: in progress.** The foundation (monorepo, shared packages, data model, auth, CI/CD, infrastructure definitions) is in place and the agency site and admin dashboard are substantially built. The Apex Performance site is early, and much of the data model is ahead of the app code. See [Status](#status) for an honest breakdown.

## Architecture

```
 apps/agency ──┐   Studio Apex marketing site, blog, services, pricing,
               │   discovery funnel, client automations area
 apps/pt ──────┼──▶  shared packages  ──▶  PostgreSQL (Prisma)
               │   Apex Performance site + assessment funnel
 apps/admin ───┘   internal dashboard: leads, automations, analytics

 packages/
   ui          shared React components and design system
   db          Prisma client and schema (multi-tenant)
   auth        Clerk integration, role-based permissions, rate limiting
   analytics   PostHog client and server helpers
   email       Resend client and React Email templates
   types       shared TypeScript types
   config      shared ESLint, TypeScript, and Tailwind configs

 infrastructure/
   docker      Dockerfiles for each app + local compose stack
   terraform   AWS modules: VPC, RDS, CloudFront (prod environment)
```

| App | Brand / domain | Local port |
|---|---|---|
| `apps/agency` | Studio Apex | 3000 |
| `apps/pt` | Apex Performance | 3001 |
| `apps/admin` | Internal admin | 3002 |

## Key design decisions

- **One monorepo, shared packages.** The two brands and the admin app import the same UI, database, auth, analytics, and email packages, so a fix or a new component lands everywhere at once instead of being copied between repos.
- **Multi-tenant from the schema up.** Data is modeled around a `Tenant`; each app resolves its tenant (from `NEXT_PUBLIC_TENANT_ID`, with a localhost-port mapping for local development) so the same codebase can serve different brands.
- **Permissions are data, not scattered `if`s.** `packages/auth` defines five roles (`SUPER_ADMIN`, `TENANT_ADMIN`, `STAFF`, `CLIENT`, `GUEST`) and an explicit permission matrix (`leads:read`, `billing:write`, `tenants:manage`, and so on) checked through `hasPermission()`.
- **Public endpoints are rate limited.** Lead capture routes call a shared rate limiter from `@apex/auth`.
- **Integrations degrade gracefully.** For example, the AI chat endpoint and lead notification emails fall back cleanly when their API keys aren't configured, so the app runs locally without every third-party account.
- **CI/CD is change-aware.** GitHub Actions detect which apps or packages a change touches, run lint, type-check, and build checks accordingly, and deploy each app independently. Deploys to AWS (ECR → ECS) authenticate through OIDC, so there are no long-lived AWS keys in the repo or its secrets.
- **Infrastructure is code.** The VPC, RDS database, and CloudFront distribution are defined as Terraform modules.

## Status

| Area | State |
|---|---|
| Monorepo, shared packages, configs | Built |
| Data model (about 38 Prisma models: tenants, users, contacts, leads, pipelines, appointments, billing, funnels, blog, automations, audit log, and more) | Defined |
| Auth (Clerk) and role-based permissions | Built |
| `apps/agency`: marketing pages, blog, services, pricing, contact and discovery funnel, AI chat endpoint, lead API, client automations UI | Substantially built |
| `apps/admin`: dashboard, leads, automations, analytics pages | Built (early) |
| `apps/pt`: landing page, assessment funnel, lead API | Early |
| Email templates (lead notification, discovery confirmation) | Built |
| CI/CD workflows and Terraform modules | Written |
| Billing, invoices, CMS studio, microsites, feature flags, `packages/ai` | Planned; schema exists for some, code does not |

## Getting started

Requires Node 20+, pnpm 9+, and Docker. Full setup notes are in [`DEVELOPMENT.md`](DEVELOPMENT.md).

```bash
pnpm install
cp .env.example .env.local     # add Clerk keys, etc.
docker compose up -d           # local Postgres, Redis, Meilisearch
pnpm db:migrate:dev
pnpm db:seed
pnpm dev                       # or: pnpm dev:agency / dev:pt / dev:admin
```

Third-party accounts (Clerk, PostHog, Resend, OpenAI) are needed for the features that use them; the app degrades gracefully without the optional ones.

## Known limitations

- **No automated tests.** The CI workflow has a quality stage, but the repo has no unit, integration, or end-to-end tests yet. This is the biggest gap.
- **The schema is far ahead of the application.** About 38 models are defined, while the code currently exercises a small subset (users, leads, appointments, automations). Billing, funnels, microsites, and feature flags are modeled but not built.
- **Infrastructure is defined, not proven here.** The Terraform and deploy workflows are written, but treat them as unreviewed until they've been applied to a real environment.
- **`apps/pt` and the admin app are early**, and `packages/ai` is not started.
- Several features depend on third-party services (Clerk in particular), which makes a fully local setup harder.

## Tech

TypeScript · Next.js · React · Prisma · PostgreSQL · Clerk · Tailwind CSS · Framer Motion · Turborepo · pnpm workspaces · Docker · Terraform · GitHub Actions · AWS (ECS, ECR, RDS, CloudFront) · PostHog · Resend / React Email · Sanity
