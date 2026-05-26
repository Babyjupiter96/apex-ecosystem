'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@apex/ui'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile nav on route change
  useEffect(() => { setIsMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-brand-black/90 backdrop-blur-md border-b border-brand-border'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between h-20" aria-label="Main navigation">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="Studio Apex home">
              <span className="text-brand-gold font-display text-xl tracking-widest uppercase">
                Studio<span className="text-brand-offwhite">Apex</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'text-sm font-medium tracking-wide transition-colors duration-150',
                      pathname === href || pathname.startsWith(href + '/')
                        ? 'text-brand-gold'
                        : 'text-brand-muted hover:text-brand-offwhite',
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/funnels/discovery"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-5 py-2.5 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-colors duration-150 rounded-sm"
              >
                Start a Project
              </Link>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden p-2 text-brand-offwhite"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-brand-black md:hidden"
          >
            <div className="flex flex-col h-full px-6 pt-24 pb-8">
              <ul className="flex-1 space-y-6">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-3xl font-display font-light text-brand-offwhite hover:text-brand-gold transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/funnels/discovery"
                className="block w-full text-center bg-brand-gold text-brand-black py-4 text-sm font-semibold tracking-wide uppercase"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
