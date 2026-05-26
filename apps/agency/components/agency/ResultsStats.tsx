'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 127, suffix: '+', label: 'Brands transformed', decimals: 0 },
  { value: 4.2, suffix: 'M', label: 'Revenue generated for clients', prefix: '$', decimals: 1 },
  { value: 340, suffix: '%', label: 'Average traffic increase', decimals: 0 },
  { value: 98, suffix: '%', label: 'Client retention rate', decimals: 0 },
]

function CountUp({ target, decimals, duration = 1800 }: { target: number; decimals: number; duration?: number }) {
  const [value, setValue] = useState(0)
  const started = useRef(false)
  const elemRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(elemRef, { once: true })

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, decimals, duration])

  return <span ref={elemRef}>{value.toFixed(decimals)}</span>
}

export function ResultsStats() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-28 bg-brand-black border-t border-brand-border" aria-label="Results">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: label + headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-6">
              Track Record
            </p>
            <h2 className="text-5xl lg:text-6xl font-display font-light text-brand-offwhite leading-[1.05]">
              The numbers
              <br />
              don&apos;t lie
            </h2>
            <p className="text-brand-muted mt-6 leading-relaxed max-w-sm">
              Every engagement is measured against real business outcomes — not vanity metrics or impressions.
            </p>
          </motion.div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-px bg-brand-border">
            {STATS.map(({ value, suffix, prefix, label, decimals }, i) => (
              <motion.div
                key={label}
                className="bg-brand-black p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              >
                <div className="text-4xl lg:text-5xl font-display font-light text-brand-gold mb-2 tabular-nums">
                  {prefix}
                  <CountUp target={value} decimals={decimals} />
                  {suffix}
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
