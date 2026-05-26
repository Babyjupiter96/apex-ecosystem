'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Calendar } from 'lucide-react'

export function DiscoveryCTA() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-40 bg-brand-black relative overflow-hidden" aria-label="Call to action">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-brand-gold/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.p
          className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Ready to elevate?
        </motion.p>

        <motion.h2
          className="text-5xl lg:text-7xl font-display font-light text-brand-offwhite mb-8 text-balance leading-[0.95]"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Your brand deserves
          <br />
          <span className="text-gradient-gold">to be exceptional</span>
        </motion.h2>

        <motion.p
          className="text-brand-muted text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          Book a no-pressure discovery call. We&apos;ll listen to your goals, audit
          your current position, and outline exactly how we&apos;d approach your growth.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/funnels/discovery"
            className="group inline-flex items-center gap-3 bg-brand-gold text-brand-black px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-colors duration-200"
          >
            <Calendar className="w-4 h-4" />
            Book Discovery Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-3 border border-white/20 text-brand-offwhite px-10 py-5 text-sm font-semibold tracking-wide uppercase hover:border-white/50 hover:bg-white/5 transition-all duration-200"
          >
            See Our Work
          </Link>
        </motion.div>

        <motion.p
          className="text-xs text-brand-muted mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          No commitment required. 30-minute call. 100% free.
        </motion.p>
      </div>
    </section>
  )
}
