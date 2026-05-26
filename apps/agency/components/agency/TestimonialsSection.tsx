'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/data/testimonials'
import Link from 'next/link'

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [featured, ...rest] = TESTIMONIALS

  return (
    <section
      ref={ref}
      className="py-24 bg-brand-black relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <motion.p
          className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Client Results
        </motion.p>

        {/* Featured quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote
              id="testimonials-heading"
              className="text-3xl lg:text-4xl xl:text-5xl font-display font-light text-brand-offwhite leading-[1.15] text-balance"
            >
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <div className="w-10 h-px bg-brand-gold" />
              <div>
                <p className="text-sm font-semibold text-brand-offwhite">{featured.author}</p>
                <p className="text-xs text-brand-muted">{featured.role}, {featured.company}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-4 flex flex-col justify-end gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="border border-brand-border p-6">
              <div className="text-4xl font-display font-light text-brand-gold mb-1">98%</div>
              <p className="text-xs text-brand-muted uppercase tracking-widest">Client retention rate</p>
            </div>
            <div className="border border-brand-border p-6">
              <div className="text-4xl font-display font-light text-brand-gold mb-1">127+</div>
              <p className="text-xs text-brand-muted uppercase tracking-widest">Brands transformed</p>
            </div>
          </motion.div>
        </div>

        {/* Secondary testimonials */}
        <div className="border-t border-brand-border pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border">
          {rest.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.author}
              className="bg-brand-black p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            >
              <blockquote className="text-brand-muted text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-brand-offwhite">{t.author}</p>
                  <p className="text-xs text-brand-muted/70">{t.role}</p>
                </div>
                <span className="text-[10px] text-brand-gold/60 uppercase tracking-widest">{t.service}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link to work */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-offwhite transition-colors uppercase tracking-widest"
          >
            Read case studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
