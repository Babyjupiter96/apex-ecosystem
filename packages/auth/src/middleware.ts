import { type NextRequest, NextResponse } from 'next/server'
import type { TenantContext, TenantSlug } from '@apex/types'

// Domain → tenant mapping (also maintained in DB for dynamic tenants)
const DOMAIN_MAP: Record<string, TenantContext> = {
  'studioapex.com': {
    tenantId: 'tenant_agency_001',
    tenantSlug: 'apex-agency' as TenantSlug,
    domain: 'studioapex.com',
    plan: 'ENTERPRISE',
  },
  'www.studioapex.com': {
    tenantId: 'tenant_agency_001',
    tenantSlug: 'apex-agency' as TenantSlug,
    domain: 'studioapex.com',
    plan: 'ENTERPRISE',
  },
  'apexperformance.io': {
    tenantId: 'tenant_pt_002',
    tenantSlug: 'apex-pt' as TenantSlug,
    domain: 'apexperformance.io',
    plan: 'ENTERPRISE',
  },
  'www.apexperformance.io': {
    tenantId: 'tenant_pt_002',
    tenantSlug: 'apex-pt' as TenantSlug,
    domain: 'apexperformance.io',
    plan: 'ENTERPRISE',
  },
  // Local development
  'localhost:3000': {
    tenantId: 'tenant_agency_001',
    tenantSlug: 'apex-agency' as TenantSlug,
    domain: 'localhost',
    plan: 'ENTERPRISE',
  },
  'localhost:3001': {
    tenantId: 'tenant_pt_002',
    tenantSlug: 'apex-pt' as TenantSlug,
    domain: 'localhost',
    plan: 'ENTERPRISE',
  },
  'localhost:3002': {
    tenantId: 'tenant_agency_001',
    tenantSlug: 'apex-agency' as TenantSlug,
    domain: 'localhost',
    plan: 'ENTERPRISE',
  },
}

export function resolveTenant(req: NextRequest): TenantContext | null {
  const host = req.headers.get('host') ?? ''

  // Client microsites: {slug}.apexmicro.io
  if (host.endsWith('.apexmicro.io')) {
    const slug = host.replace('.apexmicro.io', '')
    return {
      tenantId: `microsite_${slug}`,
      tenantSlug: 'apex-agency',
      domain: host,
      plan: 'STARTER',
    }
  }

  // Check env override (useful for local dev on each app)
  const envTenantId = process.env.NEXT_PUBLIC_TENANT_ID
  const envTenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG as TenantSlug | undefined
  if (envTenantId && envTenantSlug) {
    return {
      tenantId: envTenantId,
      tenantSlug: envTenantSlug,
      domain: host,
      plan: 'ENTERPRISE',
    }
  }

  return DOMAIN_MAP[host] ?? null
}

export function injectTenantHeaders(
  req: NextRequest,
  tenant: TenantContext,
): NextResponse {
  const res = NextResponse.next()
  res.headers.set('x-tenant-id', tenant.tenantId)
  res.headers.set('x-tenant-slug', tenant.tenantSlug)
  res.headers.set('x-tenant-plan', tenant.plan)
  return res
}
