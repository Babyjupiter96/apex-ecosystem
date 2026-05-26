import { Zap, Clock, CheckCircle2, AlertCircle, Play } from 'lucide-react'

type AutomationStatus = 'PENDING' | 'CONFIGURING' | 'ACTIVE' | 'DELIVERED' | 'PAUSED' | 'FAILED'

const STATUS_STYLE: Record<AutomationStatus, string> = {
  PENDING: 'text-yellow-400 bg-yellow-400/10',
  CONFIGURING: 'text-blue-400 bg-blue-400/10',
  ACTIVE: 'text-green-400 bg-green-400/10',
  DELIVERED: 'text-[#C9A84C] bg-[#C9A84C]/10',
  PAUSED: 'text-orange-400 bg-orange-400/10',
  FAILED: 'text-red-400 bg-red-400/10',
}

const QUEUE = [
  {
    id: 'req-001', client: 'TechCorp Inc.', type: 'Lead List', status: 'PENDING' as AutomationStatus,
    description: 'B2B CFOs — SaaS, 50–500 employees, US', requestedAt: '2024-05-25', priority: 'High',
  },
  {
    id: 'req-002', client: 'Atlas Ventures', type: 'Social Bot', status: 'CONFIGURING' as AutomationStatus,
    description: 'Instagram + LinkedIn — 2 posts/day + DM sequence', requestedAt: '2024-05-24', priority: 'Normal',
  },
  {
    id: 'req-003', client: 'Solaris Studio', type: 'Web Scraper', status: 'ACTIVE' as AutomationStatus,
    description: 'Competitor pricing monitor — 8 sites daily', requestedAt: '2024-05-20', priority: 'Normal',
  },
  {
    id: 'req-004', client: 'Meridian Health', type: 'Email Sequence', status: 'ACTIVE' as AutomationStatus,
    description: 'Post-discovery no-show re-engagement (5 emails)', requestedAt: '2024-05-18', priority: 'Normal',
  },
  {
    id: 'req-005', client: 'Ironclad Legal', type: 'Lead List', status: 'DELIVERED' as AutomationStatus,
    description: 'Enterprise law firm partners — M&A/real estate focus, 847 contacts', requestedAt: '2024-05-10', priority: 'Normal',
  },
  {
    id: 'req-006', client: 'Luminary Labs', type: 'Workflow', status: 'DELIVERED' as AutomationStatus,
    description: 'Kajabi → ActiveCampaign sync + Slack alerts on high-value signups', requestedAt: '2024-05-08', priority: 'Normal',
  },
]

const STATS = [
  { label: 'Pending requests', value: QUEUE.filter(q => q.status === 'PENDING').length, icon: Clock, color: 'text-yellow-400' },
  { label: 'In configuration', value: QUEUE.filter(q => q.status === 'CONFIGURING').length, icon: Zap, color: 'text-blue-400' },
  { label: 'Active automations', value: QUEUE.filter(q => q.status === 'ACTIVE').length, icon: Play, color: 'text-green-400' },
  { label: 'Delivered this month', value: QUEUE.filter(q => q.status === 'DELIVERED').length, icon: CheckCircle2, color: 'text-[#C9A84C]' },
]

export default function AdminAutomationsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#F5F0E8]">Automations</h1>
          <p className="text-[#888] text-sm mt-1">Client automation requests and active workflows</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A0A0A] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide hover:bg-[#E8D078] transition-colors rounded-sm">
          <Zap className="w-4 h-4" /> New Automation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className={`text-3xl font-light mb-1 ${color}`}>{value}</p>
            <p className="text-xs text-[#888] uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      {/* Queue */}
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2A2A2A] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#F5F0E8]">All Requests</h2>
          <div className="flex gap-2">
            {(['All', 'Pending', 'Active', 'Delivered'] as const).map(f => (
              <button key={f} className={`text-xs px-3 py-1.5 rounded-full transition-colors ${f === 'All' ? 'bg-[#C9A84C] text-[#0A0A0A]' : 'text-[#888] hover:text-[#F5F0E8]'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2A2A]">
              {['Client', 'Type', 'Description', 'Priority', 'Requested', 'Status', ''].map(h => (
                <th key={h} className="px-5 py-3 text-left text-[10px] text-[#888] uppercase tracking-widest font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {QUEUE.map((row) => (
              <tr key={row.id} className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors group">
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-[#F5F0E8]">{row.client}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-1 rounded font-medium">
                    {row.type}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm text-[#888] max-w-xs truncate">{row.description}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium ${row.priority === 'High' ? 'text-red-400' : 'text-[#888]'}`}>
                    {row.priority}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="text-xs text-[#888]">{row.requestedAt}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${STATUS_STYLE[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <a
                    href={`/automations/${row.id}`}
                    className="text-xs text-[#888] hover:text-[#C9A84C] transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Manage →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
