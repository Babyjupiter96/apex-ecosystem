'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

const SERVICES = [
  {
    number: '01',
    title: 'Brand Identity',
    slug: 'brand-identity',
    description: 'Logos, visual systems, and brand guidelines that command premium positioning and outlast trends.',
  },
  {
    number: '02',
    title: 'Web Design',
    slug: 'web-design',
    description: 'High-conversion websites built for performance, beauty, and search — not just award shows.',
  },
  {
    number: '03',
    title: 'SEO',
    slug: 'seo',
    description: 'Technical and content SEO that compounds over time, reducing dependence on paid acquisition.',
  },
  {
    number: '04',
    title: 'Sales Funnels',
    slug: 'sales-funnels',
    description: 'End-to-end conversion systems that turn qualified traffic into high-ticket, closed revenue.',
  },
  {
    number: '05',
    title: 'Marketing Automation',
    slug: 'marketing-automation',
    description: 'AI-driven email sequences and nurture flows that convert leads while you sleep.',
  },
  {
    number: '06',
    title: 'Lead Generation',
    slug: 'lead-generation',
    description: 'Systematic strategies that fill your pipeline with the right clients, not just any clients.',
  },
]

export function ServicesGrid() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 bg-brand-graphite" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <motion.p
              className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              What We Do
            </motion.p>
            <motion.h2
              id="services-heading"
              className="text-5xl lg:text-6xl font-display font-light text-brand-offwhite leading-[1.05]"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Every lever
              <br />
              that drives growth
            </motion.h2>
          </div>
          <motion.div
            className="lg:pt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <p className="text-brand-muted text-lg leading-relaxed">
              We don&apos;t hand you off to junior staff or outsource offshore. Every engagement is run by senior strategists who care about outcomes, not deliverables.
            </p>
            <Link
              href="/services"
              className="group mt-8 inline-flex items-center gap-2 text-brand-offwhite text-sm font-semibold uppercase tracking-widest border-b border-brand-border hover:border-brand-gold transition-colors pb-1"
            >
              Explore all services
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Service list */}
        <div className="border-t border-brand-border">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group flex items-start gap-8 py-8 border-b border-brand-border hover:pl-2 transition-all duration-300"
              >
                <span className="text-xs text-brand-muted font-mono pt-1.5 shrink-0 w-8">
                  {service.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl lg:text-3xl font-display font-light text-brand-offwhite group-hover:text-brand-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-brand-muted group-hover:text-brand-gold transition-colors shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                  </div>
                  <p className="text-brand-muted text-sm leading-relaxed mt-2 max-w-2xl">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
