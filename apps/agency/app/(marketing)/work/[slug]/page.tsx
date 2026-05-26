import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { CASE_STUDIES, getCaseStudyBySlug } from '@/lib/data/case-studies'

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const cs = getCaseStudyBySlug(params.slug)
  if (!cs) return {}
  return {
    title: `${cs.client} — ${cs.title}`,
    description: cs.tagline,
    openGraph: {
      title: `${cs.title} | Studio Apex`,
      description: cs.tagline,
      images: [{ url: cs.coverImageUrl, width: 1200, height: 630 }],
    },
  }
}

export default function CaseStudyPage({ params }: Params) {
  const cs = getCaseStudyBySlug(params.slug)
  if (!cs) notFound()

  const others = CASE_STUDIES.filter(c => c.slug !== cs.slug).slice(0, 2)

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-0 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs text-brand-muted uppercase tracking-widest hover:text-brand-gold transition-colors mb-10"
          >
            <ArrowLeft className="w-3 h-3" /> All Work
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-xs text-brand-muted uppercase tracking-widest">
            <span className="text-brand-gold font-semibold">{cs.client}</span>
            <span>·</span>
            <span>{cs.industry}</span>
            <span>·</span>
            <span>{cs.year}</span>
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-light leading-[0.92] text-brand-offwhite max-w-4xl mb-6">
            {cs.title}
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl leading-relaxed">{cs.tagline}</p>
        </div>

        {/* Hero image */}
        <div className="aspect-[21/9] w-full overflow-hidden bg-brand-graphite">
          <img
            src={cs.heroImageUrl ?? cs.coverImageUrl}
            alt={cs.title}
            className="w-full h-full object-cover"
            priority={true as unknown as undefined}
          />
        </div>
      </section>

      {/* Metrics bar */}
      <section className="bg-brand-graphite border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-brand-border">
            {cs.metrics.map((m) => (
              <div key={m.label} className="py-10 px-8 first:pl-0">
                <p className="text-4xl lg:text-5xl font-display font-light text-brand-gold mb-2">
                  {m.value}
                </p>
                <p className="text-xs text-brand-muted uppercase tracking-widest">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="py-32 bg-brand-black">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Services */}
          <div className="flex flex-wrap gap-2 mb-16">
            {cs.services.map((s) => (
              <Link
                key={s}
                href={`/services/${s}`}
                className="text-xs border border-brand-border rounded-full px-4 py-1.5 text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-colors uppercase tracking-wide"
              >
                {s.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>

          <div className="space-y-16">
            <div>
              <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-6">The Challenge</p>
              <p className="text-lg text-brand-muted leading-relaxed">{cs.challenge}</p>
            </div>
            <div className="h-px bg-brand-border" />
            <div>
              <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-6">Our Approach</p>
              <p className="text-lg text-brand-muted leading-relaxed">{cs.approach}</p>
            </div>
            <div className="h-px bg-brand-border" />
            <div>
              <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-6">The Results</p>
              <p className="text-lg text-brand-muted leading-relaxed">{cs.results}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {cs.testimonial && (
        <section className="py-24 bg-brand-graphite border-y border-brand-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <Quote className="w-10 h-10 text-brand-gold/30 mb-8" />
            <blockquote className="text-2xl lg:text-3xl font-display font-light text-brand-offwhite leading-snug mb-8">
              &ldquo;{cs.testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-border flex items-center justify-center text-brand-gold font-semibold text-sm">
                {cs.testimonial.author[0]}
              </div>
              <div>
                <p className="text-brand-offwhite font-medium text-sm">{cs.testimonial.author}</p>
                <p className="text-brand-muted text-xs">{cs.testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* More work */}
      {others.length > 0 && (
        <section className="py-32 bg-brand-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-4xl font-display font-light text-brand-offwhite">More Work</h2>
              <Link
                href="/work"
                className="text-sm text-brand-muted hover:text-brand-gold transition-colors uppercase tracking-widest inline-flex items-center gap-2"
              >
                All Work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((c) => (
                <Link
                  key={c._id}
                  href={`/work/${c.slug}`}
                  className="group border border-brand-border hover:border-brand-gold/30 rounded-lg overflow-hidden transition-all"
                >
                  <div className="aspect-video overflow-hidden bg-brand-graphite">
                    <img
                      src={c.coverImageUrl}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold mb-2">{c.client}</p>
                    <h3 className="text-lg font-semibold text-brand-offwhite group-hover:text-brand-gold transition-colors">
                      {c.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-32 bg-brand-graphite border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl font-display font-light text-brand-offwhite mb-6">
            Ready for your own case study?
          </h2>
          <p className="text-brand-muted text-lg mb-12">
            Let's figure out your biggest growth lever and build a plan around it.
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
