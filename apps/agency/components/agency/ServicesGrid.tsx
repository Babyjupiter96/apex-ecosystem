'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Palette, Globe, Search, TrendingUp, Zap, Users, ArrowRight } from 'lucide-react'
import { staggerContainer, fadeUp } from '@apex/ui/animations'

const SERVICES = [
  {
    icon: Palette,
    title: 'Brand Identity',
    slug: 'brand-identity',
    description: 'Logos, visual systems, and brand guidelines that command premium positioning.',
  },
  {
    icon: Globe,
    title: 'Web Design',
    slug: 'web-design',
    description: 'High-conversion websites built for performance, SEO, and customer delight.',
  },
  {
    icon: Search,
    title: 'SEO',
    slug: 'seo',
    description: 'Technical and content SEO that drives qualified organic traffic at scale.',
  },
  {
    icon: TrendingUp,
    title: 'Sales Funnels',
    slug: 'sales-funnels',
    description: 'Conversion-optimized funnels that turn visitors into high-ticket clients.',
  },
  {
    icon: Zap,
    title: 'Marketing Automation',
    slug: 'marketing-automation',
    description: 'AI-powered email sequences and workflows that nurture leads on autopilot.',
  },
  {
    icon: Users,
    title: 'Lead Generation',
    slug: 'lead-generation',
    description: 'Systematic lead gen strategies that fill your pipeline with qualified prospects.',
  },
]

export function ServicesGrid() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 bg-brand-black" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <motion.p
              className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              What We Do
            </motion.p>
            <motion.h2
              id="services-heading"
              className="text-5xl lg:text-6xl font-display font-light text-brand-offwhite"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Full-stack growth
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/services"
              className="text-sm text-brand-muted hover:text-brand-gold transition-colors uppercase tracking-widest inline-flex items-center gap-2"
            >
              All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {SERVICES.map(({ icon: Icon, title, slug, description }) => (
            <motion.div key={slug} variants={fadeUp}>
              <Link
                href={`/services/${slug}`}
                className="group block bg-brand-black p-8 hover:bg-brand-graphite transition-colors duration-300 h-full"
              >
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg border border-brand-border group-hover:border-brand-gold/30 transition-colors">
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="text-xl font-semibold text-brand-offwhite mb-3 group-hover:text-brand-gold transition-colors">
                  {title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-6">{description}</p>
                <span className="text-xs text-brand-gold uppercase tracking-widest font-semibold inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
