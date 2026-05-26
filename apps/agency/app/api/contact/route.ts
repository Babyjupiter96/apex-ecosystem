import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  service: z.string().max(100).optional(),
  message: z.string().min(10).max(5000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    // Send notification email (non-blocking)
    void sendContactNotification(data).catch(console.error)

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Please check your form fields.' },
        { status: 400 },
      )
    }
    console.error('[contact] error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

async function sendContactNotification(data: z.infer<typeof contactSchema>) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Studio Apex <notifications@studioapex.com>',
      to: ['hello@studioapex.com'],
      subject: `New Contact: ${data.firstName} ${data.lastName} — ${data.service || 'General'}`,
      text: [
        `Name: ${data.firstName} ${data.lastName}`,
        `Email: ${data.email}`,
        `Company: ${data.company || 'N/A'}`,
        `Service: ${data.service || 'N/A'}`,
        '',
        data.message,
      ].join('\n'),
    }),
  })
}
