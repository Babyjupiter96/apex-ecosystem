'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const springY = useSpring(y, { stiffness: 80, damping: 20 })

  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    async function animateHeadline() {
      if (!headlineRef.current) return
      const { gsap } = await import('gsap')
      const { SplitText } = await import('gsap/SplitText')
      gsap.registerPlugin(SplitText)
      const split = new SplitText(headlineRef.current, { type: 'lines,words' })
      ctx = gsap.context(() => {
        gsap.from(split.words, {
          opacity: 0,
          y: 40,
          stagger: 0.04,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.3,
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
      {/* Subtle ambient glow — restrained */}
      <div className="absolute top-1/3 right-1/3 w-[700px] h-[500px] rounded-full bg-brand-gold/[0.04] blur-[140px] pointer-events-none" />

      {/* Noise grain */}
      <div className="absolute inset-0 opacity-[0.02] bg-noise pointer-events-none" />

      {/* Thin vertical rule — editorial detail */}
      <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-border to-transparent pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-24"
        style={{ y: springY, opacity }}
      >
        {/* Overline */}
        <motion.p
          className="text-brand-muted uppercase tracking-[0.4em] text-[11px] font-medium mb-12 pl-5 border-l border-brand-gold"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Studio Apex — Creative Agency
        </motion.p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-[clamp(3.5rem,8.5vw,7.5rem)] font-display font-light leading-[0.93] tracking-tight text-brand-offwhite max-w-5xl mb-10"
        >
          Marketing that moves
          <br />
          <em className="text-brand-gold not-italic">the needle.</em>
          <br />
          Not just metrics.
        </h1>

        {/* Sub */}
        <motion.p
          className="text-xl text-brand-muted max-w-md mb-14 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          Brand, web, SEO, and automation — built by senior strategists obsessed with your growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
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
            className="group inline-flex items-center gap-2 text-sm font-medium text-brand-muted hover:text-brand-offwhite transition-colors uppercase tracking-widest"
          >
            See our work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

        {/* Bottom scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-6 lg:left-12 hidden lg:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          aria-hidden="true"
        >
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-brand-gold/40" />
          <span className="text-[9px] text-brand-muted/60 uppercase tracking-[0.4em] [writing-mode:vertical-rl] rotate-180">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
