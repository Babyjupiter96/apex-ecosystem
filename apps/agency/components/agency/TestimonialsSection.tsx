'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/data/testimonials'
import { staggerContainer, fadeUp } from '@apex/ui/animations'

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-32 bg-brand-black relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-brand-gold/3 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <motion.p
          className="text-center text-brand-gold uppercase tracking-widest text-xs font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Client Love
        </motion.p>
        <motion.h2
          id="testimonials-heading"
          className="text-center text-5xl lg:text-6xl font-display font-light text-brand-offwhite mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Don't take our word for it
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.author}
              variants={fadeUp}
              className="bg-brand-graphite border border-brand-border rounded-lg p-8 flex flex-col hover:border-brand-gold/20 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>

              <Quote className="w-6 h-6 text-brand-gold/30 mb-4" />

              <blockquote className="text-brand-offwhite leading-relaxed text-sm flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="border-t border-brand-border pt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-brand-offwhite">{t.author}</p>
                  <p className="text-xs text-brand-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
                <span className="text-[10px] text-brand-gold border border-brand-gold/20 rounded-full px-2.5 py-1 uppercase tracking-wide">
                  {t.service}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
