import { Navbar } from '@/components/pt/Navbar'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <footer className="bg-brand-steel border-t border-brand-border py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-brand-cyan font-display font-bold tracking-widest text-sm uppercase">
            Apex<span className="text-brand-white font-light">Performance</span>
          </span>
          <p className="text-xs text-brand-muted">
            © {new Date().getFullYear()} Apex Performance. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
