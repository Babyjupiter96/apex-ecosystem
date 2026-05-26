import type { Metadata } from 'next'
import { db } from '@apex/db'
import { LeadsTable } from '@/components/leads/LeadsTable'

export const metadata: Metadata = { title: 'Leads' }
export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const tenantId = 'tenant_agency_001'

  const leads = await db.lead.findMany({
    where: { tenantId },
    include: { contact: true, assignedTo: true, stage: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-semibold mb-2">CRM</p>
          <h1 className="text-3xl font-light text-[#F5F0E8]">Leads</h1>
        </div>
        <div className="flex items-center gap-3">
          <select className="h-9 px-3 text-sm bg-[#1A1A1A] border border-[#2A2A2A] text-[#888] rounded-lg focus:outline-none focus:border-[#C9A84C]">
            <option>All Statuses</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Proposal Sent</option>
            <option>Closed Won</option>
          </select>
        </div>
      </div>
      <LeadsTable leads={leads} />
    </div>
  )
}
