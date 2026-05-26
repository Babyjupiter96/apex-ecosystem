import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db, createLead } from '@apex/db'
import { checkRateLimit } from '@apex/auth/rate-limit'
import { trackServerEvent } from '@apex/analytics/server'

const LeadSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
  tenantSlug: z.string(),
  formId: z.string().default('assessment-funnel'),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { success } = await checkRateLimit('formSubmit', ip)
  if (!success) return NextResponse.json({ message: 'Too many requests' }, { status: 429 })

  const body = await req.json()
  const parsed = LeadSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ message: 'Invalid data' }, { status: 400 })

  const { firstName, lastName, email, message, formId } = parsed.data
  const tenantId = req.headers.get('x-tenant-id') ?? 'tenant_pt_002'

  const systemUser = await db.user.findFirst({ where: { email: 'admin@studioapex.com' } })
  if (!systemUser) return NextResponse.json({ message: 'Configuration error' }, { status: 500 })

  const lead = await createLead({
    tenantId,
    title: `${firstName} ${lastName} — ${formId}`,
    source: 'ORGANIC_SEARCH',
    notes: message,
    createdById: systemUser.id,
    contact: { email, firstName, lastName },
  })

  trackServerEvent(email, 'form_submitted', { formId, tenantId })

  return NextResponse.json({ success: true, leadId: lead.id, email })
}
