import type { PortableTextComponents } from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-brand-muted leading-relaxed mb-6 text-lg">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-display font-light text-brand-offwhite mt-14 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-display font-light text-brand-offwhite mt-10 mb-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-brand-offwhite mt-8 mb-3">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-brand-gold pl-6 my-8 text-xl text-brand-offwhite font-light italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-brand-offwhite">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-brand-gold">{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-sm bg-brand-graphite text-brand-gold px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-brand-gold underline underline-offset-4 hover:text-brand-gold-light transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 mb-6 ml-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 mb-6 ml-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-brand-muted leading-relaxed flex gap-3">
        <span className="mt-2 w-1 h-1 rounded-full bg-brand-gold shrink-0" />
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-brand-muted leading-relaxed pl-1">{children}</li>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value?.asset?.url ?? ''}
          alt={value?.alt ?? ''}
          className="w-full rounded-lg"
          loading="lazy"
        />
        {value?.caption && (
          <figcaption className="text-center text-sm text-brand-muted mt-3">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}
