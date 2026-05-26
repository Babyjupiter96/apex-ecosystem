import { ArrowLeft, Save, Play, Pause, Send, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

// In production this would fetch from the DB via automationId
export default function AdminAutomationDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8 max-w-5xl">
      <Link
        href="/automations"
        className="inline-flex items-center gap-2 text-xs text-[#888] hover:text-[#C9A84C] transition-colors uppercase tracking-widest mb-8"
      >
        <ArrowLeft className="w-3 h-3" /> All Automations
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs text-[#C9A84C] uppercase tracking-widest font-semibold mb-1">Request #{params.id}</p>
          <h1 className="text-2xl font-semibold text-[#F5F0E8]">Automation Management</h1>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 border border-[#2A2A2A] text-[#888] px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:border-[#3A3A3A] hover:text-[#F5F0E8] transition-all rounded-sm">
            <Pause className="w-3.5 h-3.5" /> Pause
          </button>
          <button className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A0A0A] px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:bg-[#E8D078] transition-all rounded-sm">
            <CheckCircle2 className="w-3.5 h-3.5" /> Mark Delivered
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-6">
            <h2 className="text-sm font-semibold text-[#F5F0E8] mb-5">Configuration</h2>
            <div className="space-y-4">
              {[
                { label: 'Automation Name', value: 'Instagram Growth Bot', type: 'text' },
                { label: 'Platform', value: 'Instagram', type: 'text' },
                { label: 'Post Frequency', value: '2/day', type: 'text' },
                { label: 'DM Template', value: 'Welcome sequence (3 messages)', type: 'text' },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-[10px] text-[#888] uppercase tracking-widest mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    defaultValue={field.value}
                    className="w-full h-10 px-3 bg-[#0A0A0A] border border-[#2A2A2A] text-[#F5F0E8] text-sm focus:outline-none focus:border-[#C9A84C] rounded-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block text-[10px] text-[#888] uppercase tracking-widest mb-1.5">
                  Internal Notes
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] text-[#F5F0E8] text-sm focus:outline-none focus:border-[#C9A84C] rounded-sm resize-none"
                  placeholder="Notes visible to staff only…"
                />
              </div>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 bg-[#C9A84C] text-[#0A0A0A] px-5 py-2 text-xs font-semibold uppercase tracking-wide hover:bg-[#E8D078] transition-colors rounded-sm">
              <Save className="w-3.5 h-3.5" /> Save Configuration
            </button>
          </div>

          {/* Client message */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-6">
            <h2 className="text-sm font-semibold text-[#F5F0E8] mb-4">Send Update to Client</h2>
            <textarea
              rows={4}
              className="w-full px-3 py-2 bg-[#0A0A0A] border border-[#2A2A2A] text-[#F5F0E8] text-sm focus:outline-none focus:border-[#C9A84C] rounded-sm resize-none mb-3"
              placeholder="e.g. 'Your automation is live! Posting 2x/day starting tomorrow at 9am EST…'"
            />
            <button className="inline-flex items-center gap-2 border border-[#C9A84C] text-[#C9A84C] px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all rounded-sm">
              <Send className="w-3.5 h-3.5" /> Send to Client
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status panel */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-5">
            <h3 className="text-xs text-[#888] uppercase tracking-widest font-semibold mb-4">Status</h3>
            <select className="w-full h-10 px-3 bg-[#0A0A0A] border border-[#2A2A2A] text-[#F5F0E8] text-sm focus:outline-none focus:border-[#C9A84C] rounded-sm mb-3 appearance-none">
              <option>CONFIGURING</option>
              <option>ACTIVE</option>
              <option>PAUSED</option>
              <option>DELIVERED</option>
            </select>
            <button className="w-full py-2 bg-[#1A1A1A] border border-[#2A2A2A] text-[#888] text-xs uppercase tracking-wide hover:border-[#3A3A3A] hover:text-[#F5F0E8] transition-colors rounded-sm">
              Update Status
            </button>
          </div>

          {/* Client info */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-5">
            <h3 className="text-xs text-[#888] uppercase tracking-widest font-semibold mb-4">Client</h3>
            <div className="space-y-2 text-sm">
              <p className="text-[#F5F0E8] font-medium">TechCorp Inc.</p>
              <p className="text-[#888]">contact@techcorp.com</p>
              <p className="text-[10px] text-[#C9A84C] uppercase tracking-widest">Studio Apex · Enterprise</p>
            </div>
          </div>

          {/* Delivery */}
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-5">
            <h3 className="text-xs text-[#888] uppercase tracking-widest font-semibold mb-4">Delivery</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-[#888] uppercase tracking-widest mb-1">
                  Download URL (for file delivery)
                </label>
                <input
                  type="text"
                  className="w-full h-9 px-3 bg-[#0A0A0A] border border-[#2A2A2A] text-[#F5F0E8] text-xs focus:outline-none focus:border-[#C9A84C] rounded-sm"
                  placeholder="https://…"
                />
              </div>
              <button className="w-full py-2 bg-[#C9A84C] text-[#0A0A0A] text-xs font-semibold uppercase tracking-wide hover:bg-[#E8D078] transition-colors rounded-sm flex items-center justify-center gap-2">
                <Send className="w-3 h-3" /> Deliver to Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
