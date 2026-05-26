'use client'

interface Props {
  compact?: boolean
}

export function NewsletterForm({ compact }: Props) {
  return (
    <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        required
        className={`flex-1 px-3 text-sm bg-brand-black border border-brand-border text-brand-offwhite placeholder:text-brand-muted focus:outline-none focus:border-brand-gold rounded-sm ${compact ? 'h-10' : 'h-12'}`}
      />
      <button
        type="submit"
        className={`px-4 bg-brand-gold text-brand-black font-semibold uppercase tracking-wide hover:bg-brand-gold-light transition-colors rounded-sm whitespace-nowrap ${compact ? 'h-10 text-xs' : 'h-12 text-sm'}`}
      >
        {compact ? 'Join' : 'Subscribe'}
      </button>
    </form>
  )
}
