import type { Metadata } from 'next'
import { auth } from '@clerk/nextjs/server'
import { db } from '@apex/db'
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard' }

export const dynamic = 'force-dynamic'

async function getDashboardStats(tenantId: string) {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [totalLeads, newLeads, appointments, closedValue] = await Promise.all([
    db.lead.count({ where: { tenantId } }),
    db.lead.count({ where: { tenantId, createdAt: { gte: thirtyDaysAgo } } }),
    db.appointment.count({ where: { tenantId, startAt: { gte: new Date() } } }),
    db.lead.aggregate({
      where: { tenantId, status: 'CLOSED_WON' },
      _sum: { value: true },
    }),
  ])

  return { totalLeads, newLeads, appointments, closedValue: closedValue._sum.value ?? 0 }
}

async function getRecentLeads(tenantId: string) {
  return db.lead.findMany({
    where: { tenantId },
    include: { contact: true, assignedTo: true },
    orderBy: { createdAt: 'desc' },
    take: 8,
  })
}

const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  CONTACTED: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  QUALIFIED: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  PROPOSAL_SENT: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  CLOSED_WON: 'bg-green-500/10 text-green-400 border border-green-500/20',
  CLOSED_LOST: 'bg-red-500/10 text-red-400 border border-red-500/20',
  NURTURE: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
  NEGOTIATING: 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20',
}

export default async function DashboardPage() {
  const { userId } = await auth()
  const tenantId = 'tenant_agency_001' // In prod, from tenant switcher state / cookie

  const [stats, recentLeads] = await Promise.all([
    getDashboardStats(tenantId),
    getRecentLeads(tenantId),
  ])

  const statCards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, delta: `+${stats.newLeads} this month` },
    { label: 'New (30d)', value: stats.newLeads, icon: TrendingUp, delta: 'vs. last month' },
    { label: 'Upcoming Calls', value: stats.appointments, icon: Calendar, delta: 'scheduled' },
    { label: 'Closed Revenue', value: `$${stats.closedValue.toLocaleString()}`, icon: DollarSign, delta: 'all time' },
  ]

  return (
    <div>
      <div className="mb-8">
        <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-semibold mb-2">Studio Apex</p>
        <h1 className="text-3xl font-light text-[#F5F0E8]">Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map(({ label, value, icon: Icon, delta }) => (
          <div key={label} className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <p className="text-xs text-[#888] uppercase tracking-widest">{label}</p>
              <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#C9A84C]" />
              </div>
            </div>
            <p className="text-3xl font-light text-[#F5F0E8] mb-1 tabular-nums">{value}</p>
            <p className="text-xs text-[#888]">{delta}</p>
          </div>
        ))}
      </div>

      {/* Recent leads table */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A]">
          <h2 className="text-sm font-semibold text-[#F5F0E8]">Recent Leads</h2>
          <a href="/leads" className="text-xs text-[#C9A84C] hover:text-[#E8D078] transition-colors uppercase tracking-widest">
            View All →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                {['Lead', 'Status', 'Source', 'Value', 'Created'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-[#888] uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#888]">
                    No leads yet. They&apos;ll appear here as they come in.
                  </td>
                </tr>
              ) : recentLeads.map(lead => (
                <tr key={lead.id} className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-[#F5F0E8] font-medium">{lead.title}</p>
                      {lead.contact?.email && (
                        <p className="text-xs text-[#888] mt-0.5">{lead.contact.email}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[lead.status] ?? 'bg-gray-500/10 text-gray-400'}`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#888]">
                    {lead.source.replace('_', ' ').toLowerCase()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#F5F0E8] font-mono">
                    {lead.value ? `$${lead.value.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-6 py-4 text-xs text-[#888]">
                    {lead.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
