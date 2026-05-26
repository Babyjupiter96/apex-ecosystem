'use client'
import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const SERVICES = [
  'Brand Identity',
  'Web Design & Development',
  'SEO',
  'Sales Funnels',
  'Marketing Automation',
  'Lead Generation',
  'Not sure yet',
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setError('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({}))
        throw new Error(msg || 'Something went wrong')
      }

      setState('success')
    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle2 className="w-12 h-12 text-brand-gold mb-6" />
        <h3 className="text-2xl font-display font-light text-brand-offwhite mb-3">
          Message received
        </h3>
        <p className="text-brand-muted">
          We'll be in touch within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-display font-light text-brand-offwhite mb-6">Send us a message</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-brand-muted uppercase tracking-widest mb-2" htmlFor="firstName">
            First Name *
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="w-full h-11 px-4 bg-brand-black border border-brand-border text-brand-offwhite placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-gold rounded-sm text-sm transition-colors"
            placeholder="Alex"
          />
        </div>
        <div>
          <label className="block text-xs text-brand-muted uppercase tracking-widest mb-2" htmlFor="lastName">
            Last Name *
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="w-full h-11 px-4 bg-brand-black border border-brand-border text-brand-offwhite placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-gold rounded-sm text-sm transition-colors"
            placeholder="Johnson"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-brand-muted uppercase tracking-widest mb-2" htmlFor="email">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full h-11 px-4 bg-brand-black border border-brand-border text-brand-offwhite placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-gold rounded-sm text-sm transition-colors"
          placeholder="alex@company.com"
        />
      </div>

      <div>
        <label className="block text-xs text-brand-muted uppercase tracking-widest mb-2" htmlFor="company">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="w-full h-11 px-4 bg-brand-black border border-brand-border text-brand-offwhite placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-gold rounded-sm text-sm transition-colors"
          placeholder="Acme Inc."
        />
      </div>

      <div>
        <label className="block text-xs text-brand-muted uppercase tracking-widest mb-2" htmlFor="service">
          Interested In
        </label>
        <select
          id="service"
          name="service"
          className="w-full h-11 px-4 bg-brand-black border border-brand-border text-brand-offwhite focus:outline-none focus:border-brand-gold rounded-sm text-sm transition-colors appearance-none"
        >
          <option value="">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs text-brand-muted uppercase tracking-widest mb-2" htmlFor="message">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 bg-brand-black border border-brand-border text-brand-offwhite placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-gold rounded-sm text-sm transition-colors resize-none"
          placeholder="Tell us about your business and what you're hoping to achieve…"
        />
      </div>

      {state === 'error' && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="group w-full inline-flex items-center justify-center gap-3 bg-brand-gold text-brand-black py-4 text-sm font-semibold tracking-wide uppercase hover:bg-brand-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'submitting' ? 'Sending…' : 'Send Message'}
        {state !== 'submitting' && (
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        )}
      </button>

      <p className="text-xs text-brand-muted text-center">
        We respond within 1 business day. No spam, ever.
      </p>
    </form>
  )
}
