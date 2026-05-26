import { Resend } from 'resend'
import type { TenantSlug } from '@apex/types'

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

const FROM_MAP: Record<TenantSlug, string> = {
  'apex-agency': process.env.EMAIL_FROM_AGENCY ?? 'hello@studioapex.com',
  'apex-pt': process.env.EMAIL_FROM_PT ?? 'hello@apexperformance.io',
}

export type SendEmailOptions = {
  to: string | string[]
  subject: string
  react: React.ReactElement
  tenantSlug: TenantSlug
  replyTo?: string
  tags?: { name: string; value: string }[]
}

export async function sendEmail(options: SendEmailOptions) {
  const resend = getResend()

  const { data, error } = await resend.emails.send({
    from: FROM_MAP[options.tenantSlug],
    to: options.to,
    subject: options.subject,
    react: options.react,
    reply_to: options.replyTo,
    tags: options.tags,
  })

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`)
  }

  return data
}
