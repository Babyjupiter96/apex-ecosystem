'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 127, suffix: '+', label: 'Brands Transformed', decimals: 0 },
  { value: 4.2, suffix: 'M', label: 'Revenue Generated', prefix: '$', decimals: 1 },
  { value: 340, suffix: '%', label: 'Avg. Traffic Increase', decimals: 0 },
  { value: 98, suffix: '%', label: 'Client Retention Rate', decimals: 0 },
]

function CountUp({ target, decimals, duration = 2000 }: { target: number; decimals: number; duration?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef(false)
  const inView = useInView(useRef(null), { once: true })

  useEffect(() => {
    if (!inView || ref.current) return
    ref.current = true

    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setValue(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, decimals, duration])

  return <span>{value.toFixed(decimals)}</span>
}

export function ResultsStats() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-32 bg-brand-graphite border-y border-brand-border" aria-label="Results">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.p
          className="text-center text-brand-gold uppercase tracking-widest text-xs font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Track Record
        </motion.p>
        <motion.h2
          className="text-center text-5xl lg:text-6xl font-display font-light text-brand-offwhite mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          The numbers speak
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {STATS.map(({ value, suffix, prefix, label, decimals }, i) => (
            <motion.div
              key={label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.6 }}
            >
              <div className="text-5xl lg:text-6xl font-display font-light text-brand-gold mb-3 tabular-nums">
                {prefix}
                <CountUp target={value} decimals={decimals} />
                {suffix}
              </div>
              <p className="text-sm text-brand-muted uppercase tracking-widest">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
