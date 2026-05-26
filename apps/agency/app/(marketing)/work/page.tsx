import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/data/case-studies'

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Case studies from Studio Apex — real results for real businesses across brand identity, web design, SEO, and growth marketing.',
}

const ALL_SERVICES = ['All', 'Brand Identity', 'Web Design', 'SEO', 'Sales Funnels', 'Marketing Automation', 'Lead Generation']

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-brand-black relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-gold/4 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-8">
            Case Studies
          </p>
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-display font-light leading-[0.92] text-brand-offwhite max-w-4xl mb-8">
            Results, not
            <br />
            <em className="text-brand-gold not-italic">promises</em>
          </h1>
          <p className="text-brand-muted text-xl max-w-xl leading-relaxed">
            Every number you see below is real. We believe in radical transparency
            about what we've achieved for clients — and what it cost them to get there.
          </p>
        </div>
      </section>

      {/* Featured case studies */}
      <section className="py-4 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-4">
          {CASE_STUDIES.filter(cs => cs.featured).map((cs, i) => (
            <Link
              key={cs._id}
              href={`/work/${cs.slug}`}
              className="group block border border-brand-border hover:border-brand-gold/30 transition-all duration-300 rounded-lg overflow-hidden"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`aspect-[4/3] lg:aspect-auto overflow-hidden bg-brand-graphite ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <img
                    src={cs.coverImageUrl}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className={`p-10 lg:p-16 flex flex-col justify-center ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs text-brand-gold uppercase tracking-widest font-semibold">
                      {cs.client}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-brand-border" />
                    <span className="text-xs text-brand-muted uppercase tracking-widest">
                      {cs.industry}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-brand-border" />
                    <span className="text-xs text-brand-muted">{cs.year}</span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-display font-light text-brand-offwhite group-hover:text-brand-gold transition-colors mb-4">
                    {cs.title}
                  </h2>
                  <p className="text-brand-muted leading-relaxed mb-8">{cs.tagline}</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {cs.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="border border-brand-border rounded-lg p-4">
                        <p className="text-2xl font-display font-light text-brand-gold mb-1">{m.value}</p>
                        <p className="text-[11px] text-brand-muted uppercase tracking-wide">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {cs.services.map((s) => (
                      <span key={s} className="text-[11px] text-brand-muted border border-brand-border rounded-full px-3 py-1 uppercase tracking-wide">
                        {s.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm text-brand-gold uppercase tracking-widest font-semibold">
                    Read Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All case studies grid */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-display font-light text-brand-offwhite mb-12">More Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.filter(cs => !cs.featured).map((cs) => (
              <Link
                key={cs._id}
                href={`/work/${cs.slug}`}
                className="group border border-brand-border hover:border-brand-gold/30 transition-all rounded-lg overflow-hidden"
              >
                <div className="aspect-video overflow-hidden bg-brand-graphite">
                  <img
                    src={cs.coverImageUrl}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold mb-1">{cs.client}</p>
                  <h3 className="text-lg font-semibold text-brand-offwhite group-hover:text-brand-gold transition-colors mb-3">
                    {cs.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-4">{cs.tagline}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {cs.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="bg-brand-graphite rounded p-3">
                        <p className="text-lg font-display font-light text-brand-gold">{m.value}</p>
                        <p className="text-[10px] text-brand-muted uppercase tracking-wide">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-brand-graphite border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl font-display font-light text-brand-offwhite mb-6">
            Want results like these?
          </h2>
          <p className="text-brand-muted text-lg mb-12 leading-relaxed">
            Let's talk about what's possible for your business. Book a free discovery call.
          </p>
          <Link
            href="/funnels/discovery"
            className="inline-flex items-center gap-3 bg-brand-gold text-brand-black px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-colors"
          >
            Book Discovery Call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
