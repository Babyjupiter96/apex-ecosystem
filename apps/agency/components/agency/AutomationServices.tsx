import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AUTOMATION_TYPES } from '@/lib/data/automations'

export function AutomationServices() {
  return (
    <section className="py-24 bg-brand-black border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-3">Automation Catalogue</p>
            <h2 className="text-4xl font-display font-light text-brand-offwhite">
              Pick your automation
            </h2>
          </div>
          <Link
            href="/client/automations/new"
            className="hidden lg:inline-flex items-center gap-2 border border-brand-gold text-brand-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-brand-black transition-all rounded-sm"
          >
            Request Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(AUTOMATION_TYPES).map(([type, info]) => (
            <Link
              key={type}
              href={`/client/automations/new?type=${type}`}
              className="group flex flex-col gap-4 bg-brand-graphite border border-brand-border rounded-lg p-6 hover:border-brand-gold/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{info.icon}</span>
                <span className={`text-xs font-semibold uppercase tracking-wide ${info.color}`}>
                  {info.startingPrice}
                </span>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 group-hover:text-brand-gold transition-colors ${info.color}`}>
                  {info.label}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">{info.description}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-brand-border">
                <span className="text-xs text-brand-muted">{info.deliveryTime}</span>
                <span className="text-xs text-brand-gold font-semibold uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Request <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-brand-muted text-sm mt-8">
          Need something custom?{' '}
          <Link href="/contact" className="text-brand-gold hover:text-brand-gold-light transition-colors">
            Tell us about it →
          </Link>
        </p>
      </div>
    </section>
  )
}
