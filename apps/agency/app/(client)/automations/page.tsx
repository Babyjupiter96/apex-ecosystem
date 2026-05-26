import Link from 'next/link'
import { Plus, Zap, ArrowRight, Activity } from 'lucide-react'
import { MOCK_AUTOMATIONS, AUTOMATION_TYPES, statusColor } from '@/lib/data/automations'

export default function AutomationsPage() {
  const active = MOCK_AUTOMATIONS.filter(a => a.status === 'ACTIVE').length
  const delivered = MOCK_AUTOMATIONS.filter(a => a.status === 'DELIVERED').length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-light text-brand-offwhite">Automations</h1>
          <p className="text-brand-muted text-sm mt-1">
            {active} active · {delivered} delivered
          </p>
        </div>
        <Link
          href="/client/automations/new"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-5 py-2.5 text-sm font-semibold uppercase tracking-wide hover:bg-brand-gold-light transition-colors rounded-sm"
        >
          <Plus className="w-4 h-4" /> Request Automation
        </Link>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active bots / workflows', value: active, color: 'text-green-400' },
          { label: 'Delivered this month', value: delivered, color: 'text-brand-gold' },
          { label: 'Total automations', value: MOCK_AUTOMATIONS.length, color: 'text-brand-offwhite' },
          { label: 'Actions completed', value: '847', color: 'text-purple-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-brand-graphite border border-brand-border rounded-lg p-5">
            <p className={`text-2xl font-display font-light mb-1 ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-brand-muted uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Automation list */}
      <div className="space-y-3">
        {MOCK_AUTOMATIONS.map((auto) => {
          const typeInfo = AUTOMATION_TYPES[auto.type]
          return (
            <Link
              key={auto.id}
              href={`/client/automations/${auto.id}`}
              className="group flex items-center gap-5 bg-brand-graphite border border-brand-border rounded-lg p-5 hover:border-brand-gold/30 transition-all"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-brand-black border border-brand-border flex items-center justify-center text-xl shrink-0">
                {typeInfo.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-medium text-brand-offwhite text-sm group-hover:text-brand-gold transition-colors">
                    {auto.name}
                  </p>
                  <span className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full ${statusColor(auto.status)}`}>
                    {auto.status}
                  </span>
                </div>
                <p className="text-xs text-brand-muted truncate">{auto.description}</p>
              </div>

              {/* Key metric */}
              {auto.metrics[0] && (
                <div className="hidden lg:block text-right shrink-0">
                  <p className={`text-lg font-display font-light ${typeInfo.color}`}>
                    {auto.metrics[0].value}
                  </p>
                  <p className="text-[10px] text-brand-muted uppercase tracking-wide">
                    {auto.metrics[0].label}
                  </p>
                </div>
              )}

              {/* Activity indicator */}
              {auto.status === 'ACTIVE' && (
                <Activity className="w-4 h-4 text-green-400 animate-pulse shrink-0" />
              )}

              <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-gold group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          )
        })}
      </div>

      {/* Available services upsell */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-brand-offwhite mb-4">Available Automation Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(AUTOMATION_TYPES)
            .filter(([type]) => !MOCK_AUTOMATIONS.some(a => a.type === type && a.status === 'ACTIVE'))
            .slice(0, 3)
            .map(([type, info]) => (
              <Link
                key={type}
                href={`/client/automations/new?type=${type}`}
                className="group flex items-start gap-4 bg-brand-black border border-brand-border rounded-lg p-5 hover:border-brand-gold/30 transition-all"
              >
                <span className="text-2xl">{info.icon}</span>
                <div className="flex-1">
                  <p className={`font-semibold text-sm mb-1 ${info.color}`}>{info.label}</p>
                  <p className="text-xs text-brand-muted leading-relaxed mb-2">{info.description}</p>
                  <p className="text-xs text-brand-gold">From {info.startingPrice}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
