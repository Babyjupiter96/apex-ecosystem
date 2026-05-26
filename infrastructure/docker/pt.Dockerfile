# Mirrors agency.Dockerfile — PT brand
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV PNPM_HOME="/pnpm" PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/types/package.json ./packages/types/
COPY packages/config/package.json ./packages/config/
COPY packages/auth/package.json ./packages/auth/
COPY packages/analytics/package.json ./packages/analytics/
COPY packages/email/package.json ./packages/email/
COPY packages/db/package.json ./packages/db/
COPY packages/ui/package.json ./packages/ui/
COPY apps/pt/package.json ./apps/pt/
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
ENV PNPM_HOME="/pnpm" PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_POSTHOG_KEY
ARG NEXT_PUBLIC_SITE_URL=https://apexperformance.io
ARG NEXT_PUBLIC_TENANT_ID=tenant_pt_002
ARG NEXT_PUBLIC_TENANT_SLUG=apex-pt
ARG NEXT_PUBLIC_CALENDLY_PT_URL

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_POSTHOG_KEY=$NEXT_PUBLIC_POSTHOG_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_TENANT_ID=$NEXT_PUBLIC_TENANT_ID
ENV NEXT_PUBLIC_TENANT_SLUG=$NEXT_PUBLIC_TENANT_SLUG
ENV NEXT_PUBLIC_CALENDLY_PT_URL=$NEXT_PUBLIC_CALENDLY_PT_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm --filter=@apex/db db:generate
RUN pnpm turbo build --filter=pt

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3001 HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/pt/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/pt/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/pt/.next/static ./.next/static

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/health || exit 1

USER nextjs
EXPOSE 3001
CMD ["node", "server.js"]
