const CLIENT_LOGOS = [
  'Crestline Capital',
  'Meridian Health',
  'Atlas Ventures',
  'Pinnacle Group',
  'Solaris Studio',
  'NovaBridge',
  'Luminary Labs',
  'Stratos Media',
  'Verdant Co.',
  'Ironclad Legal',
  'Apex Athletics',
  'TechCorp',
]

function LogoItem({ name }: { name: string }) {
  return (
    <div className="flex items-center shrink-0">
      <span className="text-brand-offwhite/25 text-xs font-semibold tracking-[0.25em] uppercase whitespace-nowrap px-8">
        {name}
      </span>
      <span className="text-brand-border text-xs" aria-hidden="true">·</span>
    </div>
  )
}

export function LogoMarquee() {
  const duplicated = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section className="py-12 border-y border-brand-border bg-brand-black overflow-hidden" aria-label="Client logos">
      <p className="text-center text-[10px] text-brand-muted/50 uppercase tracking-[0.4em] mb-8">
        Trusted by
      </p>
      <div className="relative flex">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee" aria-hidden="true">
          {duplicated.map((name, i) => (
            <LogoItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  )
}
