import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'
import { db } from '@apex/db'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const automation = await db.automation.findUnique({
    where: { id: params.id },
    include: { runs: { orderBy: { startedAt: 'desc' }, take: 20 } },
  })

  if (!automation) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ automation })
}

const patchSchema = z.object({
  isActive: z.boolean().optional(),
  name: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  actions: z.array(z.record(z.unknown())).optional(),
})

export async function PATCH(req: NextRequest, { params }: Params) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const data = patchSchema.parse(body)

    const automation = await db.automation.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json({ automation })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
