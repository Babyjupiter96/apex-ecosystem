'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { cn } from '@apex/ui'
import { LayoutDashboard, Zap, FileText, Calendar, Settings, ArrowLeft } from 'lucide-react'

const NAV = [
  { href: '/client/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/client/automations', icon: Zap, label: 'Automations' },
  { href: '/client/invoices', icon: FileText, label: 'Invoices' },
  { href: '/client/appointments', icon: Calendar, label: 'Appointments' },
  { href: '/client/settings', icon: Settings, label: 'Settings' },
]

export function ClientNav() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-brand-graphite border-r border-brand-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-brand-border">
        <Link href="/" className="flex items-center gap-2 text-brand-gold text-sm font-display tracking-widest uppercase">
          Studio<span className="text-brand-offwhite">Apex</span>
        </Link>
        <p className="text-[10px] text-brand-muted uppercase tracking-widest mt-1">Client Portal</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {NAV.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
                  : 'text-brand-muted hover:text-brand-offwhite hover:bg-brand-black',
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {label === 'Automations' && (
                <span className="ml-auto text-[10px] bg-brand-gold text-brand-black rounded-full px-1.5 py-0.5 font-semibold">4</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Back to site */}
      <div className="px-4 pb-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-brand-muted hover:text-brand-offwhite transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Studio Apex
        </Link>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-t border-brand-border flex items-center gap-3">
        <UserButton afterSignOutUrl="/sign-in" />
        <div>
          <p className="text-sm text-brand-offwhite">My Account</p>
          <p className="text-xs text-brand-muted">Client</p>
        </div>
      </div>
    </aside>
  )
}
