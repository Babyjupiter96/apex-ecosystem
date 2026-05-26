import Link from 'next/link'
import { Mail, Linkedin, Instagram, Twitter } from 'lucide-react'

const SERVICES = [
  { href: '/services/brand-identity', label: 'Brand Identity' },
  { href: '/services/web-design', label: 'Web Design' },
  { href: '/services/seo', label: 'SEO' },
  { href: '/services/sales-funnels', label: 'Sales Funnels' },
  { href: '/services/marketing-automation', label: 'Marketing Automation' },
  { href: '/services/ui-ux-design', label: 'UI/UX Design' },
]

const COMPANY = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-brand-graphite border-t border-brand-border" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-brand-gold font-display text-xl tracking-widest uppercase">
                Studio<span className="text-brand-offwhite">Apex</span>
              </span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed mb-6 max-w-xs">
              Design, strategy, and technology fused into a single studio obsessed with your growth.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/studioapex" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-brand-muted hover:text-brand-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/studioapex" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-brand-muted hover:text-brand-gold transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/studioapex" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-brand-muted hover:text-brand-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:hello@studioapex.com" aria-label="Email" className="text-brand-muted hover:text-brand-gold transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-6">Services</h3>
            <ul className="space-y-3">
              {SERVICES.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-brand-muted hover:text-brand-offwhite transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-3">
              {COMPANY.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-brand-muted hover:text-brand-offwhite transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-6">Stay Sharp</h3>
            <p className="text-sm text-brand-muted mb-4">
              Brand strategy, design insights, and growth tactics — delivered monthly.
            </p>
            <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 h-10 px-3 text-sm bg-brand-black border border-brand-border text-brand-offwhite placeholder:text-brand-muted focus:outline-none focus:border-brand-gold rounded-sm"
              />
              <button
                type="submit"
                className="px-4 h-10 bg-brand-gold text-brand-black text-xs font-semibold uppercase tracking-wide hover:bg-brand-gold-light transition-colors rounded-sm"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-brand-border">
          <p className="text-xs text-brand-muted">
            © {new Date().getFullYear()} Studio Apex. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-brand-muted hover:text-brand-offwhite transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-brand-muted hover:text-brand-offwhite transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
