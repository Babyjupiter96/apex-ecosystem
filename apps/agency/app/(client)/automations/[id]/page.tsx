import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Pause, Play, RefreshCw, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { getAutomationById, AUTOMATION_TYPES, statusColor } from '@/lib/data/automations'

type Params = { params: { id: string } }

const LOG_ICON = {
  info: Info,
  success: CheckCircle2,
  error: AlertCircle,
}

const LOG_COLOR = {
  info: 'text-brand-muted',
  success: 'text-green-400',
  error: 'text-red-400',
}

function formatTs(ts: string) {
  return new Date(ts).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function AutomationDetailPage({ params }: Params) {
  const auto = getAutomationById(params.id)
  if (!auto) notFound()

  const typeInfo = AUTOMATION_TYPES[auto.type]
  const isActive = auto.status === 'ACTIVE'

  return (
    <div className="p-8 max-w-5xl">
      {/* Back */}
      <Link
        href="/client/automations"
        className="inline-flex items-center gap-2 text-xs text-brand-muted hover:text-brand-gold transition-colors uppercase tracking-widest mb-8"
      >
        <ArrowLeft className="w-3 h-3" /> All Automations
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-brand-graphite border border-brand-border flex items-center justify-center text-3xl">
            {typeInfo.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-semibold text-brand-offwhite">{auto.name}</h1>
              <span className={`text-xs uppercase tracking-wide font-semibold px-2.5 py-1 rounded-full ${statusColor(auto.status)}`}>
                {auto.status}
              </span>
            </div>
            <p className={`text-xs uppercase tracking-widest font-semibold ${typeInfo.color}`}>
              {typeInfo.label}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {auto.downloadUrl && (
            <a
              href={auto.downloadUrl}
              className="inline-flex items-center gap-2 border border-brand-gold text-brand-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-brand-black transition-all rounded-sm"
            >
              <Download className="w-3.5 h-3.5" /> Download Results
            </a>
          )}
          {isActive && (
            <button className="inline-flex items-center gap-2 border border-brand-border text-brand-muted px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:border-brand-offwhite hover:text-brand-offwhite transition-all rounded-sm">
              <Pause className="w-3.5 h-3.5" /> Pause
            </button>
          )}
          {auto.status === 'PAUSED' && (
            <button className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-4 py-2 text-xs font-semibold uppercase tracking-wide hover:bg-brand-gold-light transition-all rounded-sm">
              <Play className="w-3.5 h-3.5" /> Resume
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: metrics + config */}
        <div className="lg:col-span-1 space-y-6">
          {/* Metrics */}
          <div className="bg-brand-graphite border border-brand-border rounded-lg p-5">
            <h2 className="text-xs text-brand-gold uppercase tracking-widest font-semibold mb-4">Performance</h2>
            <div className="space-y-4">
              {auto.metrics.map(m => (
                <div key={m.label} className="flex items-center justify-between">
                  <span className="text-xs text-brand-muted">{m.label}</span>
                  <span className={`text-sm font-semibold ${typeInfo.color}`}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Config */}
          <div className="bg-brand-graphite border border-brand-border rounded-lg p-5">
            <h2 className="text-xs text-brand-gold uppercase tracking-widest font-semibold mb-4">Configuration</h2>
            <div className="space-y-3">
              {Object.entries(auto.config).map(([key, val]) => (
                <div key={key}>
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest mb-0.5">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-xs text-brand-offwhite">
                    {Array.isArray(val) ? val.join(', ') : String(val)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-brand-graphite border border-brand-border rounded-lg p-5">
            <h2 className="text-xs text-brand-gold uppercase tracking-widest font-semibold mb-4">Timeline</h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-brand-muted">Created</span>
                <span className="text-brand-offwhite">{auto.createdAt}</span>
              </div>
              {auto.deliveredAt && (
                <div className="flex justify-between">
                  <span className="text-brand-muted">Delivered</span>
                  <span className="text-green-400">{auto.deliveredAt}</span>
                </div>
              )}
              {auto.nextRunAt && (
                <div className="flex justify-between">
                  <span className="text-brand-muted">Next Run</span>
                  <span className="text-brand-offwhite">
                    {auto.nextRunAt.includes('T') ? formatTs(auto.nextRunAt) : auto.nextRunAt}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: logs */}
        <div className="lg:col-span-2">
          <div className="bg-brand-graphite border border-brand-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs text-brand-gold uppercase tracking-widest font-semibold">Activity Log</h2>
              <button className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-offwhite transition-colors">
                <RefreshCw className="w-3 h-3" /> Refresh
              </button>
            </div>
            <div className="space-y-0">
              {auto.logs.map((log, i) => {
                const Icon = LOG_ICON[log.level]
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-3.5 border-t border-brand-border first:border-t-0"
                  >
                    <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${LOG_COLOR[log.level]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-brand-offwhite leading-relaxed">{log.message}</p>
                      <p className="text-[11px] text-brand-muted mt-1">{formatTs(log.timestamp)}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Load more placeholder */}
            <button className="w-full mt-4 py-2.5 text-xs text-brand-muted border border-brand-border rounded hover:border-brand-gold/30 hover:text-brand-offwhite transition-colors">
              Load older activity
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
