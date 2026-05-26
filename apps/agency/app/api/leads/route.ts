import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db, createLead } from '@apex/db'
import { checkRateLimit } from '@apex/auth/rate-limit'
import { sendEmail } from '@apex/email'
import { LeadNotificationEmail } from '@apex/email'
import { trackServerEvent } from '@apex/analytics/server'

const LeadSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  phone: z.string().max(50).optional(),
  message: z.string().min(1).max(2000),
  tenantSlug: z.string(),
  formId: z.string().default('general-lead'),
})

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit by IP
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    const { success } = await checkRateLimit('formSubmit', ip)
    if (!success) {
      return NextResponse.json({ message: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    // 2. Validate
    const body = await req.json()
    const parsed = LeadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid form data', errors: parsed.error.flatten() }, { status: 400 })
    }

    const { firstName, lastName, email, company, phone, message, formId } = parsed.data

    // 3. Get tenant from header (set by middleware)
    const tenantId = req.headers.get('x-tenant-id') ?? 'tenant_agency_001'

    // 4. Get or create system user for lead attribution
    const systemUser = await db.user.findFirst({ where: { email: 'admin@studioapex.com' } })
    if (!systemUser) {
      return NextResponse.json({ message: 'Configuration error' }, { status: 500 })
    }

    // 5. Create lead in CRM
    const lead = await createLead({
      tenantId,
      title: `${firstName} ${lastName} — ${formId}`,
      source: 'ORGANIC_SEARCH',
      notes: message,
      createdById: systemUser.id,
      contact: { email, firstName, lastName, company, phone },
      utmSource: req.headers.get('referer') ?? undefined,
      landingPage: req.headers.get('referer') ?? undefined,
    })

    // 6. Send notification email (non-blocking)
    sendEmail({
      to: 'hello@studioapex.com',
      subject: `New Lead: ${firstName} ${lastName}`,
      react: LeadNotificationEmail({
        leadName: `${firstName} ${lastName}`,
        leadEmail: email,
        leadCompany: company,
        source: formId,
        formData: { message },
        adminUrl: `${process.env.NEXT_PUBLIC_ADMIN_URL}/leads/${lead.id}`,
        tenantName: 'Studio Apex',
      }),
      tenantSlug: 'apex-agency',
    }).catch(console.error)

    // 7. Track analytics
    trackServerEvent(email, 'form_submitted', { formId, tenantId, leadId: lead.id })

    return NextResponse.json({ success: true, leadId: lead.id, email })
  } catch (err) {
    console.error('[leads/route] Error:', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
