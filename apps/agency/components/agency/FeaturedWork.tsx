'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/data/case-studies'

export function FeaturedWork() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [primary, ...rest] = CASE_STUDIES.slice(0, 3)

  return (
    <section ref={ref} className="py-32 bg-brand-black" aria-labelledby="work-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <motion.p
              className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Selected Work
            </motion.p>
            <motion.h2
              id="work-heading"
              className="text-5xl lg:text-6xl font-display font-light text-brand-offwhite"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Work that moves
              <br />
              <em className="text-brand-gold not-italic">the needle</em>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="hidden md:block"
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-offwhite transition-colors uppercase tracking-widest"
            >
              All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Primary — large */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/work/${primary.slug}`} className="group block relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px]">
              <img
                src={primary.coverImageUrl ?? ''}
                alt={primary.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block text-[10px] text-brand-gold uppercase tracking-[0.35em] font-semibold mb-3">
                  {primary.industry}
                </span>
                <h3 className="text-2xl lg:text-3xl font-display font-light text-white mb-2 group-hover:text-brand-gold transition-colors duration-300">
                  {primary.title}
                </h3>
                <p className="text-white/60 text-sm">{primary.tagline}</p>
                <div className="mt-4 flex items-center gap-2 text-brand-gold text-xs uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Case Study <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Secondary — stacked */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((cs, i) => (
              <motion.div
                key={cs._id}
                className="flex-1"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/work/${cs.slug}`} className="group block relative overflow-hidden min-h-[200px] h-full">
                  <img
                    src={cs.coverImageUrl ?? ''}
                    alt={cs.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block text-[10px] text-brand-gold uppercase tracking-[0.35em] font-semibold mb-2">
                      {cs.industry}
                    </span>
                    <h3 className="text-lg font-display font-light text-white group-hover:text-brand-gold transition-colors duration-300">
                      {cs.title}
                    </h3>
                    <div className="mt-2 flex gap-3">
                      {cs.metrics.slice(0, 1).map(m => (
                        <span key={m.label} className="text-xs text-white/50">
                          <span className="text-brand-gold font-semibold">{m.value}</span> {m.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <motion.div
          className="md:hidden mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-gold transition-colors uppercase tracking-widest"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
