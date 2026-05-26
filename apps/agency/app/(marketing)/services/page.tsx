import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Palette, Globe, Search, TrendingUp, Zap, Users, CheckCircle2 } from 'lucide-react'
import { SERVICES_DATA } from '@/lib/data/services-data'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Brand identity, web design, SEO, sales funnels, marketing automation, and lead generation for premium businesses.',
}

const ICON_MAP: Record<string, React.ElementType> = {
  Palette, Globe, Search, TrendingUp, Zap, Users,
}

const PROCESS_STEPS = [
  { n: '01', title: 'Discovery Call', body: 'We learn your goals, audit your current position, and map exactly where the opportunity is.' },
  { n: '02', title: 'Strategy & Scope', body: 'A tailored proposal with a clear scope, timeline, and success metrics. No mystery pricing.' },
  { n: '03', title: 'Execution', body: 'Our team works in transparent sprints with weekly updates and Loom walkthroughs.' },
  { n: '04', title: 'Launch & Grow', body: 'We ship, measure, and optimize. Most clients stay on retainer because results compound.' },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-gold/4 blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-8">
            What We Do
          </p>
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-display font-light leading-[0.92] text-brand-offwhite max-w-4xl mb-8">
            Every service is a
            <br />
            <em className="text-brand-gold not-italic">growth lever</em>
          </h1>
          <p className="text-brand-muted text-xl max-w-xl leading-relaxed mb-12">
            We don't offer services — we deliver outcomes. Every engagement is scoped around
            a measurable result, not billable hours.
          </p>
          <Link
            href="/funnels/discovery"
            className="group inline-flex items-center gap-3 bg-brand-gold text-brand-black px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-colors"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 bg-brand-graphite border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border">
            {SERVICES_DATA.map((service) => {
              const Icon = ICON_MAP[service.icon]
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-brand-graphite p-10 hover:bg-brand-black transition-colors duration-300"
                >
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 border border-brand-border group-hover:border-brand-gold/40 transition-colors rounded-lg">
                    {Icon && <Icon className="w-5 h-5 text-brand-gold" />}
                  </div>
                  <h2 className="text-xl font-semibold text-brand-offwhite mb-3 group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-brand-muted text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  {service.startingPrice && (
                    <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold mb-4">
                      From {service.startingPrice}
                    </p>
                  )}
                  <div className="space-y-2">
                    {service.features.slice(0, 3).map((f) => (
                      <div key={f} className="flex items-start gap-2 text-xs text-brand-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold mt-0.5 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs text-brand-gold uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-32 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-4">How We Work</p>
          <h2 className="text-5xl lg:text-6xl font-display font-light text-brand-offwhite mb-20">
            Simple. Transparent. Fast.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {PROCESS_STEPS.map((step) => (
              <div key={step.n}>
                <span className="text-6xl font-display font-light text-brand-gold/20 leading-none block mb-6">
                  {step.n}
                </span>
                <h3 className="text-lg font-semibold text-brand-offwhite mb-3">{step.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-brand-graphite border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl lg:text-6xl font-display font-light text-brand-offwhite mb-6">
            Not sure where to start?
          </h2>
          <p className="text-brand-muted text-lg mb-12 leading-relaxed">
            Book a free 30-minute strategy call. We'll audit your current marketing, identify
            the biggest lever for growth, and tell you exactly what we'd do first.
          </p>
          <Link
            href="/funnels/discovery"
            className="inline-flex items-center gap-3 bg-brand-gold text-brand-black px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-colors"
          >
            Book a Free Strategy Call
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-brand-muted mt-6">No commitment. No pitch deck. Just honest advice.</p>
        </div>
      </section>
    </>
  )
}
