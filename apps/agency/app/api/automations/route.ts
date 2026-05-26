import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { db } from '@apex/db'

const createSchema = z.object({
  type: z.enum(['social-bot', 'web-scraper', 'lead-list', 'email-sequence', 'workflow']),
  config: z.record(z.string()),
  name: z.string().max(200).optional(),
})

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const tenantId = req.headers.get('x-tenant-id')
  if (!tenantId) return NextResponse.json({ error: 'No tenant' }, { status: 400 })

  const automations = await db.automation.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return NextResponse.json({ automations })
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const tenantId = req.headers.get('x-tenant-id')
  if (!tenantId) return NextResponse.json({ error: 'No tenant' }, { status: 400 })

  try {
    const body = await req.json()
    const data = createSchema.parse(body)

    const typeLabels: Record<string, string> = {
      'social-bot': 'Social Media Bot',
      'web-scraper': 'Web Scraper',
      'lead-list': 'Lead List',
      'email-sequence': 'Email Sequence',
      'workflow': 'Workflow Automation',
    }

    const automation = await db.automation.create({
      data: {
        tenantId,
        name: data.name ?? typeLabels[data.type] ?? data.type,
        trigger: 'LEAD_CREATED', // placeholder trigger — real value in actions JSON
        actions: [{ type: data.type, config: data.config }],
        conditions: [],
        isActive: false, // starts inactive until configured by staff
        description: `Client request: ${data.type}`,
      },
    })

    return NextResponse.json({ success: true, automationId: automation.id }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    console.error('[automations] POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
