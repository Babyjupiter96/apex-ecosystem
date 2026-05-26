// ─── Tenant ────────────────────────────────────────────────────────────────

export type TenantSlug = 'apex-agency' | 'apex-pt'

export type TenantPlan = 'STARTER' | 'PRO' | 'ENTERPRISE'

export type TenantContext = {
  tenantId: string
  tenantSlug: TenantSlug
  domain: string
  plan: TenantPlan
}

// ─── RBAC ──────────────────────────────────────────────────────────────────

export type UserRole = 'SUPER_ADMIN' | 'TENANT_ADMIN' | 'STAFF' | 'CLIENT' | 'GUEST'

export type Permission =
  | 'leads:read'
  | 'leads:write'
  | 'leads:delete'
  | 'leads:export'
  | 'crm:read'
  | 'crm:write'
  | 'billing:read'
  | 'billing:write'
  | 'analytics:read'
  | 'analytics:export'
  | 'automations:manage'
  | 'content:read'
  | 'content:write'
  | 'tenants:manage'
  | 'tenants:billing'
  | 'users:manage'
  | 'settings:manage'

// ─── CRM ───────────────────────────────────────────────────────────────────

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'PROPOSAL_SENT'
  | 'NEGOTIATING'
  | 'CLOSED_WON'
  | 'CLOSED_LOST'
  | 'NURTURE'

export type LeadSource =
  | 'ORGANIC_SEARCH'
  | 'PAID_SEARCH'
  | 'SOCIAL_ORGANIC'
  | 'SOCIAL_PAID'
  | 'REFERRAL'
  | 'DIRECT'
  | 'EMAIL'
  | 'PODCAST'
  | 'EVENT'
  | 'COLD_OUTREACH'
  | 'AI_CHATBOT'

export type AppointmentStatus =
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'NO_SHOW'
  | 'CANCELLED'
  | 'RESCHEDULED'

export type SubscriptionStatus =
  | 'ACTIVE'
  | 'TRIALING'
  | 'PAST_DUE'
  | 'CANCELLED'
  | 'PAUSED'

// ─── SEO ───────────────────────────────────────────────────────────────────

export type SeoMetadata = {
  title: string
  description: string
  canonical?: string
  og: {
    title: string
    description: string
    image: string
    type: 'website' | 'article'
    siteName: string
  }
  twitter: {
    card: 'summary_large_image'
    title: string
    description: string
    image: string
    creator?: string
  }
  schema?: Record<string, unknown>[]
  noIndex?: boolean
  noFollow?: boolean
}

// ─── Analytics ─────────────────────────────────────────────────────────────

export type AnalyticsEventName =
  | 'page_view'
  | 'cta_clicked'
  | 'form_started'
  | 'form_submitted'
  | 'funnel_step_completed'
  | 'funnel_completed'
  | 'lead_created'
  | 'appointment_booked'
  | 'chat_started'
  | 'chat_lead_captured'
  | 'pricing_viewed'
  | 'case_study_viewed'

export type AnalyticsEvent = {
  name: AnalyticsEventName
  properties?: Record<string, unknown>
  tenantId?: string
}

// ─── API ───────────────────────────────────────────────────────────────────

export type ApiResponse<T> = {
  data: T
  meta?: {
    total?: number
    page?: number
    perPage?: number
    hasMore?: boolean
  }
}

export type ApiError = {
  code: string
  message: string
  details?: Record<string, unknown>
}

export type PaginationParams = {
  page?: number
  perPage?: number
  cursor?: string
}
