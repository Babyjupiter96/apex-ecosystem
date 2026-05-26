'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export function DiscoveryCTA() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-40 bg-brand-graphite border-t border-brand-border relative overflow-hidden" aria-label="Call to action">
      {/* Subtle gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-brand-gold/[0.04] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* Left */}
          <div>
            <motion.p
              className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-8 pl-5 border-l border-brand-gold"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
            >
              Ready to grow?
            </motion.p>
            <motion.h2
              className="text-5xl lg:text-6xl xl:text-7xl font-display font-light text-brand-offwhite leading-[0.95]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Your brand
              <br />
              deserves to be
              <br />
              <em className="text-gradient-gold not-italic">exceptional.</em>
            </motion.h2>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <p className="text-brand-muted text-lg leading-relaxed mb-10 max-w-sm">
              Book a no-pressure discovery call. We&apos;ll audit your position and outline exactly how we&apos;d approach your growth — free, in 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/funnels/discovery"
                className="group inline-flex items-center gap-3 bg-brand-gold text-brand-black px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-colors duration-200"
              >
                Book Discovery Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-sm font-medium text-brand-muted hover:text-brand-offwhite transition-colors uppercase tracking-widest py-4"
              >
                See our work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <p className="text-xs text-brand-muted/60 mt-6">
              No commitment. 30 minutes. 100% free.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
