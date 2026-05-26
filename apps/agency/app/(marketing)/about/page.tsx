import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Studio Apex is a luxury creative agency built on a simple belief: most businesses are invisible to the people who need them most. We fix that.',
}

const TEAM = [
  {
    name: 'Alexandra Voss',
    role: 'Co-Founder & Strategy Director',
    bio: '12 years building premium brands across private equity, professional services, and consumer markets. Previously brand director at a global consultancy.',
    initials: 'AV',
  },
  {
    name: 'Jamie Osei',
    role: 'Co-Founder & Technical Director',
    bio: 'Architect of high-performance web applications. Previously led engineering at two venture-backed SaaS companies. Obsessed with Core Web Vitals and conversion.',
    initials: 'JO',
  },
  {
    name: 'Marcus Webb',
    role: 'SEO & Growth Director',
    bio: 'Grew organic traffic from zero to 2M monthly visitors for clients across healthcare, legal, and SaaS. Former in-house SEO lead at a public company.',
    initials: 'MW',
  },
  {
    name: 'Rina Tanaka',
    role: 'Creative Director',
    bio: 'Award-winning designer with a background in editorial and luxury brand design. Her work has been featured in Brand New, Wallpaper*, and Fast Company.',
    initials: 'RT',
  },
]

const VALUES = [
  {
    title: 'Radical transparency',
    body: "We show you exactly what we're doing and why. No mystery metrics. No inflated vanity numbers. Real results, honestly presented.",
  },
  {
    title: 'Strategy first',
    body: "We don't start designing until we understand your market, your buyer, and your competitive position. Tactics without strategy is noise.",
  },
  {
    title: 'Long-term thinking',
    body: "We'd rather turn down a project than set unrealistic expectations. Our reputation is built on clients who grow with us for years, not one-time engagements.",
  },
  {
    title: 'Craft at every layer',
    body: "From the typography on a landing page to the sequence logic in an automation workflow — details matter. We obsess over them so you don't have to.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-32 bg-brand-black relative overflow-hidden">
        <div className="absolute top-1/2 right-1/3 w-[700px] h-[500px] rounded-full bg-brand-gold/4 blur-[150px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-8">About Us</p>
          <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-display font-light leading-[0.9] text-brand-offwhite max-w-5xl mb-10">
            Most businesses are
            <br />
            <em className="text-brand-gold not-italic">invisible</em>
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl leading-relaxed">
            Invisible to the people who need them most. Not because the product is bad —
            but because the brand doesn't communicate value, the website doesn't convert,
            and the marketing doesn't reach the right people.
          </p>
          <p className="text-xl text-brand-muted max-w-2xl leading-relaxed mt-6">
            Studio Apex exists to fix that.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-32 bg-brand-graphite border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-6">Our Story</p>
              <h2 className="text-5xl font-display font-light text-brand-offwhite mb-8 leading-tight">
                Built by people who were frustrated with agencies
              </h2>
            </div>
            <div className="space-y-6 text-brand-muted leading-relaxed text-lg">
              <p>
                Alexandra and Jamie founded Studio Apex in 2019 after years of watching clients get burned
                by agencies that were long on pitch decks and short on accountability. The pattern was the same:
                beautiful work, unclear ROI, and a revolving door of account managers who didn't understand
                the business.
              </p>
              <p>
                We started with one belief: every dollar a client spends with us should generate more
                than a dollar back. That means measuring everything, owning the results, and being honest
                when something isn't working.
              </p>
              <p>
                Today we're a team of 12 across strategy, design, development, and growth — with a
                client roster spanning private equity, healthcare, B2B SaaS, and premium consumer brands.
                We've helped clients generate over $4.2M in attributable revenue and we're just getting started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-4">Our Values</p>
          <h2 className="text-5xl font-display font-light text-brand-offwhite mb-20">
            How we operate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-brand-black p-10">
                <h3 className="text-xl font-semibold text-brand-gold mb-4">{v.title}</h3>
                <p className="text-brand-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 bg-brand-graphite border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-4">The Team</p>
          <h2 className="text-5xl font-display font-light text-brand-offwhite mb-20">
            The people behind the work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-square bg-brand-black border border-brand-border rounded-lg mb-6 flex items-center justify-center group-hover:border-brand-gold/30 transition-colors">
                  <span className="text-4xl font-display font-light text-brand-gold/40">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-brand-offwhite mb-1">{member.name}</h3>
                <p className="text-xs text-brand-gold uppercase tracking-widest font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-brand-muted text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { value: '2019', label: 'Founded' },
              { value: '127+', label: 'Clients served' },
              { value: '$4.2M', label: 'Revenue generated' },
              { value: '12', label: 'Team members' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl font-display font-light text-brand-gold mb-3">{stat.value}</p>
                <p className="text-xs text-brand-muted uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-brand-graphite border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-5xl font-display font-light text-brand-offwhite mb-6">
            Let's build something together
          </h2>
          <p className="text-brand-muted text-lg mb-12 leading-relaxed">
            We take on a limited number of new clients each quarter to ensure every
            engagement gets our full attention. If you're ready to grow, let's talk.
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
