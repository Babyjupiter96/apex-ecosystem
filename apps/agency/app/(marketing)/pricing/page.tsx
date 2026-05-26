import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, X } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent pricing for brand identity, web design, SEO, and growth marketing. No mystery fees — just clear scope and real results.',
}

const TIERS = [
  {
    name: 'Growth',
    price: '$4,500',
    period: '/month',
    description: 'For established businesses ready to build a predictable marketing engine.',
    cta: 'Start with Growth',
    highlighted: false,
    features: [
      { label: 'Brand strategy session', included: true },
      { label: 'SEO — up to 4 content pieces/mo', included: true },
      { label: 'Lead generation (one channel)', included: true },
      { label: 'Monthly analytics report', included: true },
      { label: 'Email nurture sequences', included: true },
      { label: 'Web design / development', included: false },
      { label: 'Full automation build', included: false },
      { label: 'Dedicated account director', included: false },
    ],
  },
  {
    name: 'Scale',
    price: '$9,500',
    period: '/month',
    description: 'For growing companies that need a full marketing team without the overhead.',
    cta: 'Start with Scale',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      { label: 'Brand strategy + identity refresh', included: true },
      { label: 'SEO — up to 8 content pieces/mo', included: true },
      { label: 'Lead generation (multi-channel)', included: true },
      { label: 'Weekly analytics + conversion reports', included: true },
      { label: 'Full email + automation stack', included: true },
      { label: 'Web design / development (1 project/qtr)', included: true },
      { label: 'Full automation build', included: true },
      { label: 'Dedicated account director', included: false },
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations that need a true strategic partner embedded in their growth.',
    cta: 'Book a Call',
    highlighted: false,
    features: [
      { label: 'Full brand identity system', included: true },
      { label: 'SEO — unlimited content production', included: true },
      { label: 'Lead generation (all channels)', included: true },
      { label: 'Real-time analytics dashboard', included: true },
      { label: 'Complete automation architecture', included: true },
      { label: 'Web design / development (ongoing)', included: true },
      { label: 'Full automation build', included: true },
      { label: 'Dedicated account director', included: true },
    ],
  },
]

const ONE_TIME = [
  { name: 'Brand Identity', price: 'From $8,500', timeline: '4–6 weeks' },
  { name: 'Web Design & Development', price: 'From $14,000', timeline: '6–10 weeks' },
  { name: 'Sales Funnel Build', price: 'From $12,000', timeline: '4–8 weeks' },
  { name: 'Marketing Automation Setup', price: 'From $7,500', timeline: '3–6 weeks' },
]

const FAQS = [
  {
    q: 'Are there setup fees?',
    a: 'No. The monthly rate is the full rate. We absorb onboarding costs because we expect long-term relationships.',
  },
  {
    q: 'What's the minimum commitment?',
    a: 'We ask for a 3-month initial commitment so we have time to build, test, and optimize. After that, month-to-month.',
  },
  {
    q: 'Can I combine retainer and project work?',
    a: 'Yes. Many clients start with a one-time project (brand identity or website) and then move to a retainer. We apply a 10% discount to project work for active retainer clients.',
  },
  {
    q: 'Do you work with startups?',
    a: 'We work with startups that have product-market fit and are ready to invest in growth. Pre-revenue companies are a poor fit for retainer work — we'd be burning your runway without enough signal to optimize against.',
  },
]

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-brand-black relative overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] rounded-full bg-brand-gold/4 blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-8">Pricing</p>
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-display font-light leading-[0.92] text-brand-offwhite mb-8">
            Transparent pricing.
            <br />
            <em className="text-brand-gold not-italic">No surprises.</em>
          </h1>
          <p className="text-brand-muted text-xl max-w-xl mx-auto leading-relaxed">
            Clear scope, defined deliverables, and ROI-tied success metrics on every engagement.
          </p>
        </div>
      </section>

      {/* Retainer tiers */}
      <section className="py-16 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-display font-light text-brand-offwhite mb-4">Monthly Retainers</h2>
          <p className="text-brand-muted mb-12">Ongoing growth partnerships. Cancel anytime after the initial 3-month commitment.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-lg border p-8 flex flex-col ${
                  tier.highlighted
                    ? 'border-brand-gold bg-brand-graphite'
                    : 'border-brand-border bg-brand-graphite'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-8">
                    <span className="bg-brand-gold text-brand-black text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                      {tier.badge}
                    </span>
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-brand-offwhite mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className={`text-4xl font-display font-light ${tier.highlighted ? 'text-brand-gold' : 'text-brand-offwhite'}`}>
                      {tier.price}
                    </span>
                    {tier.period && <span className="text-brand-muted text-sm">{tier.period}</span>}
                  </div>
                  <p className="text-brand-muted text-sm leading-relaxed">{tier.description}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-3">
                      {f.included
                        ? <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                        : <X className="w-4 h-4 text-brand-border shrink-0" />}
                      <span className={`text-sm ${f.included ? 'text-brand-offwhite' : 'text-brand-muted/50'}`}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/funnels/discovery"
                  className={`block text-center py-3.5 text-sm font-semibold tracking-wide uppercase transition-colors rounded-sm ${
                    tier.highlighted
                      ? 'bg-brand-gold text-brand-black hover:bg-brand-gold-light'
                      : 'border border-brand-border text-brand-offwhite hover:border-brand-gold hover:text-brand-gold'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-time projects */}
      <section className="py-24 bg-brand-graphite border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-display font-light text-brand-offwhite mb-4">One-Time Projects</h2>
          <p className="text-brand-muted mb-12">Fixed-scope, fixed-price engagements with clear deliverables.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ONE_TIME.map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between p-6 border border-brand-border bg-brand-black rounded-lg hover:border-brand-gold/30 transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-brand-offwhite mb-1">{p.name}</h3>
                  <p className="text-xs text-brand-muted uppercase tracking-widest">{p.timeline}</p>
                </div>
                <div className="text-right">
                  <p className="text-brand-gold font-semibold">{p.price}</p>
                  <Link
                    href="/funnels/discovery"
                    className="text-xs text-brand-muted hover:text-brand-gold transition-colors uppercase tracking-widest"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div className="w-16 h-16 rounded-full border-2 border-brand-gold flex items-center justify-center mx-auto mb-8">
            <span className="text-brand-gold text-xl font-display">✓</span>
          </div>
          <h2 className="text-4xl font-display font-light text-brand-offwhite mb-6">
            Our guarantee
          </h2>
          <p className="text-brand-muted text-lg leading-relaxed">
            If we don't hit the success metrics we agreed on in month 3, you don't pay for month 4 until we do.
            We put skin in the game because we believe in what we build.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-brand-graphite border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-display font-light text-brand-offwhite mb-12">Common questions</h2>
          <div className="space-y-8">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-t border-brand-border pt-8">
                <h3 className="text-lg font-semibold text-brand-offwhite mb-3">{faq.q}</h3>
                <p className="text-brand-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-brand-black border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl font-display font-light text-brand-offwhite mb-6">
            Not sure which plan fits?
          </h2>
          <p className="text-brand-muted text-lg mb-12">
            Book a free discovery call. We'll audit your current situation and recommend
            the right engagement — even if that's not us.
          </p>
          <Link
            href="/funnels/discovery"
            className="inline-flex items-center gap-3 bg-brand-gold text-brand-black px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-colors"
          >
            Book a Free Strategy Call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
