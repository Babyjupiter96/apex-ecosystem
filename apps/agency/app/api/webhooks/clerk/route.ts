import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { db } from '@apex/db'

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  // Verify Svix signature
  const svixId = req.headers.get('svix-id')
  const svixTimestamp = req.headers.get('svix-timestamp')
  const svixSignature = req.headers.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing Svix headers' }, { status: 400 })
  }

  const body = await req.text()
  const wh = new Webhook(webhookSecret)

  let evt: { type: string; data: Record<string, unknown> }
  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as typeof evt
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const { type, data } = evt

  switch (type) {
    case 'user.created': {
      const { id, email_addresses, first_name, last_name, image_url } = data as {
        id: string
        email_addresses: { email_address: string }[]
        first_name: string
        last_name: string
        image_url: string
      }

      const primaryEmail = email_addresses[0]?.email_address
      if (!primaryEmail) break

      await db.user.upsert({
        where: { clerkId: id },
        update: { firstName: first_name, lastName: last_name, avatarUrl: image_url },
        create: {
          clerkId: id,
          email: primaryEmail,
          firstName: first_name,
          lastName: last_name,
          avatarUrl: image_url,
        },
      })
      break
    }

    case 'user.updated': {
      const { id, email_addresses, first_name, last_name, image_url } = data as {
        id: string
        email_addresses: { email_address: string }[]
        first_name: string
        last_name: string
        image_url: string
      }

      await db.user.updateMany({
        where: { clerkId: id },
        data: { firstName: first_name, lastName: last_name, avatarUrl: image_url },
      })
      break
    }

    case 'user.deleted': {
      const { id } = data as { id: string }
      await db.user.deleteMany({ where: { clerkId: id } })
      break
    }
  }

  return NextResponse.json({ received: true })
}
