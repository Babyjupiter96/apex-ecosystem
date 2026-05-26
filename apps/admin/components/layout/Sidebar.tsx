'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { cn } from '@apex/ui'
import {
  LayoutDashboard, Users, BarChart3, Zap, Settings,
  Building2, ChevronDown,
} from 'lucide-react'
import { useState } from 'react'

const NAV = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/leads', icon: Users, label: 'Leads' },
  { href: '/crm/contacts', icon: Building2, label: 'CRM' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/automations', icon: Zap, label: 'Automations' },
  { href: '/settings', icon: Settings, label: 'Settings' },
]

const TENANTS = [
  { id: 'tenant_agency_001', label: 'Studio Apex', color: '#C9A84C' },
  { id: 'tenant_pt_002', label: 'Apex Performance', color: '#22D3EE' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [activeTenant, setActiveTenant] = useState(TENANTS[0])
  const [tenantOpen, setTenantOpen] = useState(false)

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#111111] border-r border-[#2A2A2A] flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#2A2A2A]">
        <span className="text-[#C9A84C] font-mono text-sm font-semibold tracking-widest uppercase">
          Apex Admin
        </span>
      </div>

      {/* Tenant switcher */}
      <div className="px-4 py-4 border-b border-[#2A2A2A]">
        <button
          onClick={() => setTenantOpen(!tenantOpen)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTenant.color }} />
            <span className="text-sm text-[#F5F0E8] font-medium">{activeTenant.label}</span>
          </div>
          <ChevronDown className={cn('w-4 h-4 text-[#888] transition-transform', tenantOpen && 'rotate-180')} />
        </button>

        {tenantOpen && (
          <div className="mt-1 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] overflow-hidden">
            {TENANTS.map(t => (
              <button
                key={t.id}
                onClick={() => { setActiveTenant(t); setTenantOpen(false) }}
                className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-[#2A2A2A] transition-colors text-left"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                <span className="text-sm text-[#F5F0E8]">{t.label}</span>
                {t.id === activeTenant.id && (
                  <span className="ml-auto text-[#C9A84C] text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1" aria-label="Admin navigation">
        {NAV.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20'
                  : 'text-[#888] hover:text-[#F5F0E8] hover:bg-[#1A1A1A]',
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-[#2A2A2A] flex items-center gap-3">
        <UserButton afterSignOutUrl="/sign-in" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#F5F0E8] truncate">Admin</p>
          <p className="text-xs text-[#888] truncate">Super Admin</p>
        </div>
      </div>
    </aside>
  )
}
