'use client'
import type { Lead, Contact, User, PipelineStage } from '@prisma/client'

type LeadWithRelations = Lead & {
  contact: Contact | null
  assignedTo: User | null
  stage: PipelineStage | null
}

const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  CONTACTED: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  QUALIFIED: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  PROPOSAL_SENT: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  NEGOTIATING: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  CLOSED_WON: 'bg-green-500/10 text-green-400 border border-green-500/20',
  CLOSED_LOST: 'bg-red-500/10 text-red-400 border border-red-500/20',
  NURTURE: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
}

export function LeadsTable({ leads }: { leads: LeadWithRelations[] }) {
  return (
    <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2A2A]">
              {['Lead / Contact', 'Status', 'Stage', 'Source', 'Value', 'AI Score', 'Created'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-[#888] uppercase tracking-widest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center text-sm text-[#888]">
                  No leads yet.
                </td>
              </tr>
            ) : leads.map(lead => (
              <tr key={lead.id} className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/40 transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <p className="text-sm text-[#F5F0E8] font-medium">{lead.title}</p>
                  {lead.contact && (
                    <p className="text-xs text-[#888] mt-0.5">
                      {[lead.contact.firstName, lead.contact.lastName].filter(Boolean).join(' ')}
                      {lead.contact.company && ` · ${lead.contact.company}`}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[lead.status] ?? ''}`}>
                    {lead.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#888]">
                  {lead.stage?.name ?? '—'}
                </td>
                <td className="px-6 py-4 text-xs text-[#888] capitalize">
                  {lead.source.toLowerCase().replace('_', ' ')}
                </td>
                <td className="px-6 py-4 text-sm text-[#F5F0E8] font-mono">
                  {lead.value ? `$${lead.value.toLocaleString()}` : '—'}
                </td>
                <td className="px-6 py-4">
                  {lead.aiScore != null ? (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-[#2A2A2A] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${lead.aiScore}%`,
                            backgroundColor: lead.aiScore > 70 ? '#10B981' : lead.aiScore > 40 ? '#F59E0B' : '#EF4444',
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#888] font-mono">{Math.round(lead.aiScore)}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#888]">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-xs text-[#888] whitespace-nowrap">
                  {lead.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
