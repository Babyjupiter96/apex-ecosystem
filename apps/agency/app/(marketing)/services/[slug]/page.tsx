import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle2, Clock, DollarSign, ChevronDown } from 'lucide-react'
import { SERVICES_DATA, getServiceBySlug } from '@/lib/data/services-data'
import { CASE_STUDIES } from '@/lib/data/case-studies'
import { ServiceFaqAccordion } from '@/components/agency/ServiceFaqAccordion'

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.tagline,
    openGraph: { title: `${service.title} | Studio Apex`, description: service.tagline },
  }
}

export default function ServiceDetailPage({ params }: Params) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const relatedWork = CASE_STUDIES.filter((cs) =>
    cs.services.includes(service.slug),
  ).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[600px] h-[400px] rounded-full bg-brand-gold/4 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs text-brand-muted uppercase tracking-widest hover:text-brand-gold transition-colors mb-10"
          >
            <ArrowLeft className="w-3 h-3" /> All Services
          </Link>
          <p className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-6">
            Service
          </p>
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-display font-light leading-[0.92] text-brand-offwhite max-w-4xl mb-8">
            {service.title}
          </h1>
          <p className="text-xl text-brand-muted max-w-xl leading-relaxed mb-12">
            {service.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-8 mb-12">
            {service.startingPrice && (
              <div className="flex items-center gap-2 text-brand-offwhite">
                <DollarSign className="w-4 h-4 text-brand-gold" />
                <span className="text-sm">Starting at <strong>{service.startingPrice}</strong></span>
              </div>
            )}
            {service.timeline && (
              <div className="flex items-center gap-2 text-brand-offwhite">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span className="text-sm">Timeline: <strong>{service.timeline}</strong></span>
              </div>
            )}
          </div>
          <Link
            href="/funnels/discovery"
            className="group inline-flex items-center gap-3 bg-brand-gold text-brand-black px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-colors"
          >
            Start This Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Description + Features */}
      <section className="py-24 bg-brand-graphite border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-6">Overview</p>
              <h2 className="text-4xl font-display font-light text-brand-offwhite mb-6">What's included</h2>
              <p className="text-brand-muted leading-relaxed text-lg">{service.description}</p>
            </div>
            <div>
              <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-6">Features</p>
              <ul className="space-y-4">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold mt-0.5 shrink-0" />
                    <span className="text-brand-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-4">
            Our Process
          </p>
          <h2 className="text-5xl font-display font-light text-brand-offwhite mb-20">
            How it works
          </h2>
          <div className="space-y-0">
            {service.process.map((step, i) => (
              <div
                key={step.step}
                className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-8 py-10 border-t border-brand-border group"
              >
                <span className="text-4xl font-display font-light text-brand-gold/30 group-hover:text-brand-gold/60 transition-colors leading-none">
                  {String(step.step).padStart(2, '0')}
                </span>
                <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-16 items-start">
                  <h3 className="text-xl font-semibold text-brand-offwhite mb-3 lg:mb-0">{step.title}</h3>
                  <p className="text-brand-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-brand-border" />
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 bg-brand-graphite border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-4">Deliverables</p>
              <h2 className="text-4xl font-display font-light text-brand-offwhite mb-6">
                What you walk away with
              </h2>
              <p className="text-brand-muted leading-relaxed">
                Every engagement ends with a clear handoff. Here's exactly what's in the package.
              </p>
            </div>
            <ul className="space-y-4">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-4 p-5 border border-brand-border bg-brand-black rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-brand-gold mt-2 shrink-0" />
                  <span className="text-brand-offwhite text-sm leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related work */}
      {relatedWork.length > 0 && (
        <section className="py-32 bg-brand-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-4">Case Studies</p>
                <h2 className="text-5xl font-display font-light text-brand-offwhite">Real results</h2>
              </div>
              <Link
                href="/work"
                className="text-sm text-brand-muted hover:text-brand-gold transition-colors uppercase tracking-widest inline-flex items-center gap-2"
              >
                All Work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedWork.map((cs) => (
                <Link
                  key={cs._id}
                  href={`/work/${cs.slug}`}
                  className="group block border border-brand-border hover:border-brand-gold/30 transition-colors rounded-lg overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden bg-brand-graphite">
                    <img
                      src={cs.coverImageUrl}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold mb-2">
                      {cs.client}
                    </p>
                    <h3 className="text-lg font-semibold text-brand-offwhite mb-3 group-hover:text-brand-gold transition-colors">
                      {cs.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {cs.metrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="bg-brand-graphite rounded-md p-3">
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
      )}

      {/* FAQ */}
      <section className="py-24 bg-brand-graphite border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-4">FAQ</p>
          <h2 className="text-4xl font-display font-light text-brand-offwhite mb-12">
            Common questions
          </h2>
          <ServiceFaqAccordion faqs={service.faqs} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 bg-brand-black border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl font-display font-light text-brand-offwhite mb-6">
            Ready to get started?
          </h2>
          <p className="text-brand-muted text-lg mb-10 leading-relaxed">
            Book a free discovery call. No pitch, no fluff — just a straight conversation
            about your goals and whether we're the right fit.
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
