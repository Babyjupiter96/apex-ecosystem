const CLIENT_LOGOS = [
  'TechCorp', 'Pinnacle Group', 'Meridian Health', 'Atlas Ventures',
  'Crestline Capital', 'Solaris Studio', 'NovaBridge', 'Apex Athletics',
  'Luminary Labs', 'Stratos Media', 'Verdant Co.', 'Ironclad Legal',
]

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-10 py-4 shrink-0">
      <span className="text-brand-muted/50 text-sm font-semibold tracking-widest uppercase whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function LogoMarquee() {
  const duplicated = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section className="py-16 border-y border-brand-border bg-brand-graphite overflow-hidden" aria-label="Client logos">
      <p className="text-center text-xs text-brand-muted uppercase tracking-widest mb-10">
        Trusted by forward-thinking brands
      </p>
      <div className="relative flex">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-graphite to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-graphite to-transparent z-10 pointer-events-none" />

        <div
          className="flex animate-marquee"
          aria-hidden="true"
        >
          {duplicated.map((name, i) => (
            <LogoItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  )
}
