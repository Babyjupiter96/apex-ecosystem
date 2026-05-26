'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const springY = useSpring(y, { stiffness: 80, damping: 20 })

  // GSAP SplitText headline animation — dynamically imported to avoid SSR issues
  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    async function animateHeadline() {
      if (!headlineRef.current) return

      const { gsap } = await import('gsap')
      const { SplitText } = await import('gsap/SplitText')
      gsap.registerPlugin(SplitText)

      const split = new SplitText(headlineRef.current, { type: 'words,chars' })
      ctx = gsap.context(() => {
        gsap.from(split.chars, {
          opacity: 0,
          y: 50,
          rotateX: -45,
          stagger: 0.018,
          duration: 0.75,
          ease: 'power3.out',
          delay: 0.4,
          transformOrigin: '0% 50% -50',
        })
      })
    }

    animateHeadline()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-black"
      aria-label="Hero"
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-gold/3 blur-[80px]" />
      </div>

      {/* Noise grain overlay */}
      <div className="absolute inset-0 opacity-[0.025] bg-noise pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24"
        style={{ y: springY, opacity }}
      >
        <motion.p
          className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Premium Creative Agency
        </motion.p>

        <h1
          ref={headlineRef}
          className="text-[clamp(3.5rem,9vw,8rem)] font-display font-light leading-[0.92] tracking-tight text-brand-offwhite mb-10 max-w-5xl"
          style={{ perspective: '1000px' }}
        >
          We build brands
          <br />
          <em className="text-brand-gold not-italic">worth remembering</em>
        </h1>

        <motion.p
          className="text-lg text-brand-muted max-w-lg mb-14 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          Design, strategy, and technology fused into a single studio
          obsessed with your growth.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <Link
            href="/funnels/discovery"
            className="group inline-flex items-center gap-3 bg-brand-gold text-brand-black px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-colors duration-200"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-3 border border-white/20 text-brand-offwhite px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:border-white/50 hover:bg-white/5 transition-all duration-200"
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-16 left-6 lg:left-12 hidden lg:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          aria-hidden="true"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-brand-gold/50" />
          <span className="text-[10px] text-brand-muted uppercase tracking-[0.4em] [writing-mode:vertical-rl] rotate-180">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
