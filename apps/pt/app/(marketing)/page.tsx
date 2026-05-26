import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Apex Performance — Elite Personal Training',
  description: 'Division I athlete-designed training programs. Science-backed results for high-performers who demand more.',
}

const PROGRAMS = [
  { title: '1:1 Elite Coaching', description: 'Fully customized programming and weekly check-ins.', badge: 'Most Popular', href: '/programs/elite-coaching' },
  { title: 'Transformation 12-Week', description: '12-week intensive for maximum body recomposition.', badge: null, href: '/programs/transformation' },
  { title: 'Remote Athlete', description: 'Elite programming for athletes training on their own.', badge: null, href: '/programs/remote' },
]

const CREDENTIALS = [
  { icon: Shield, label: 'Division I Athlete', sub: 'D1 Football — Scholarship' },
  { icon: Target, label: 'NSCA-CSCS Certified', sub: 'Strength & Conditioning Specialist' },
  { icon: Zap, label: '200+ Clients', sub: 'Average 28 lbs lost, 18 lbs muscle gained' },
]

export default function PtHomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen bg-brand-black flex items-center px-6 lg:px-12 pt-20" aria-label="Hero">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            <p className="text-brand-cyan uppercase tracking-[0.35em] text-xs font-bold mb-8">
              Elite Personal Training
            </p>
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-display font-bold leading-[0.9] text-brand-white mb-8 uppercase tracking-tight">
              Train Like<br />
              <span className="text-gradient-cyan">An Athlete.</span><br />
              Look Like One.
            </h1>
            <p className="text-brand-muted text-lg max-w-lg mb-12 leading-relaxed">
              Built by a former Division I scholarship athlete. Every program is precision-engineered
              for your body, your goals, and your schedule.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/funnels/assessment" className="group inline-flex items-center gap-3 bg-brand-cyan text-brand-black px-8 py-4 text-sm font-bold tracking-wide uppercase hover:bg-brand-cyan-dark transition-colors">
                Free Assessment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/results" className="inline-flex items-center gap-3 border border-brand-border text-brand-white px-8 py-4 text-sm font-bold tracking-wide uppercase hover:border-brand-cyan/40 hover:bg-white/5 transition-all">
                See Results
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials bar */}
      <section className="py-16 bg-brand-steel border-y border-brand-border" aria-label="Credentials">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CREDENTIALS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg border border-brand-border flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-cyan" />
                </div>
                <div>
                  <p className="text-brand-white font-bold text-sm">{label}</p>
                  <p className="text-brand-muted text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-32 bg-brand-black px-6 lg:px-12" aria-labelledby="programs-heading">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-cyan uppercase tracking-widest text-xs font-bold mb-4">Programs</p>
          <h2 id="programs-heading" className="text-5xl font-display font-bold text-brand-white mb-16 uppercase">
            Choose Your Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROGRAMS.map(({ title, description, badge, href }) => (
              <Link key={title} href={href} className="group block bg-brand-steel border border-brand-border rounded-xl p-8 hover:border-brand-cyan/40 transition-all hover:bg-brand-steel/70">
                {badge && (
                  <span className="inline-block bg-brand-cyan/10 text-brand-cyan text-xs font-bold px-3 py-1 rounded-full border border-brand-cyan/20 mb-4">
                    {badge}
                  </span>
                )}
                <h3 className="text-xl font-display font-bold text-brand-white mb-3 uppercase group-hover:text-brand-cyan transition-colors">
                  {title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-6">{description}</p>
                <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="py-32 bg-brand-steel border-t border-brand-border px-6 lg:px-12" aria-label="Assessment CTA">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-cyan uppercase tracking-widest text-xs font-bold mb-6">Limited Spots</p>
          <h2 className="text-5xl font-display font-bold text-brand-white mb-6 uppercase">
            Ready to Transform?
          </h2>
          <p className="text-brand-muted text-lg mb-10">
            Start with a free fitness assessment. We&apos;ll analyze your goals, training history,
            and build a custom roadmap — no commitment required.
          </p>
          <Link href="/funnels/assessment" className="inline-flex items-center gap-3 bg-brand-cyan text-brand-black px-10 py-5 text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan-dark transition-colors">
            Get My Free Assessment <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-brand-muted mt-6">Only 5 new client spots open per month.</p>
        </div>
      </section>
    </>
  )
}
