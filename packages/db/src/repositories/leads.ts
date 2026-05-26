import { db } from '../client'
import type { LeadStatus, LeadSource } from '@apex/types'

export type CreateLeadInput = {
  tenantId: string
  title: string
  status?: LeadStatus
  source?: LeadSource
  notes?: string
  value?: number
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  landingPage?: string
  createdById: string
  contact?: {
    email: string
    firstName?: string
    lastName?: string
    company?: string
    phone?: string
  }
}

export async function createLead(input: CreateLeadInput) {
  const { contact, ...leadData } = input

  return db.lead.create({
    data: {
      ...leadData,
      contact: contact
        ? {
            connectOrCreate: {
              where: { tenantId_email: { tenantId: input.tenantId, email: contact.email } },
              create: { ...contact, tenantId: input.tenantId },
            },
          }
        : undefined,
    },
    include: { contact: true, assignedTo: true },
  })
}

export async function getLeadsByTenant(
  tenantId: string,
  options?: {
    status?: LeadStatus
    assignedToId?: string
    page?: number
    perPage?: number
  },
) {
  const { status, assignedToId, page = 1, perPage = 25 } = options ?? {}

  const [leads, total] = await Promise.all([
    db.lead.findMany({
      where: {
        tenantId,
        ...(status && { status }),
        ...(assignedToId && { assignedToId }),
      },
      include: { contact: true, assignedTo: true, stage: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    db.lead.count({
      where: {
        tenantId,
        ...(status && { status }),
        ...(assignedToId && { assignedToId }),
      },
    }),
  ])

  return { leads, total, page, perPage, hasMore: total > page * perPage }
}

export async function updateLeadStatus(
  leadId: string,
  tenantId: string,
  status: LeadStatus,
  userId: string,
) {
  const lead = await db.lead.update({
    where: { id: leadId, tenantId },
    data: {
      status,
      ...(status === 'CLOSED_WON' || status === 'CLOSED_LOST'
        ? { closedAt: new Date() }
        : {}),
    },
  })

  await db.leadActivity.create({
    data: {
      leadId,
      type: 'status_changed',
      summary: `Status changed to ${status}`,
      metadata: { userId, previousStatus: lead.status, newStatus: status },
    },
  })

  return lead
}
