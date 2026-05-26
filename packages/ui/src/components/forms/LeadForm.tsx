'use client'
import { useState } from 'react'
import { Button } from '../primitives/Button'
import { Input } from '../primitives/Input'
import { cn } from '../../lib/utils'

type LeadFormProps = {
  tenantSlug: string
  formId?: string
  headline?: string
  subheadline?: string
  ctaLabel?: string
  showCompany?: boolean
  showPhone?: boolean
  onSuccess?: (data: { email: string }) => void
  className?: string
}

export function LeadForm({
  tenantSlug,
  formId = 'general-lead',
  headline = 'Ready to transform your brand?',
  subheadline = "Tell us about your project and we'll be in touch within 24 hours.",
  ctaLabel = 'Get Started',
  showCompany = false,
  showPhone = false,
  onSuccess,
  className,
}: LeadFormProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setState('loading')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, tenantSlug, formId }),
      })

      if (!res.ok) {
        const json = await res.json() as { message?: string }
        throw new Error(json.message ?? 'Something went wrong')
      }

      const json = await res.json() as { email: string }
      setState('success')
      onSuccess?.(json)
    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (state === 'success') {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className="text-brand-gold text-4xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-brand-offwhite mb-2">We got your message!</h3>
        <p className="text-brand-muted">Expect to hear from us within 24 hours.</p>
      </div>
    )
  }

  return (
    <div className={cn('', className)}>
      {headline && (
        <h2 className="text-2xl font-display font-light text-brand-offwhite mb-2">{headline}</h2>
      )}
      {subheadline && (
        <p className="text-brand-muted mb-6">{subheadline}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input name="firstName" label="First Name" placeholder="Jane" required />
          <Input name="lastName" label="Last Name" placeholder="Smith" required />
        </div>
        <Input name="email" label="Email" type="email" placeholder="jane@company.com" required />
        {showPhone && (
          <Input name="phone" label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
        )}
        {showCompany && (
          <Input name="company" label="Company" placeholder="Acme Inc." />
        )}
        <Input
          name="message"
          label="What are you looking for?"
          placeholder="Tell us about your project..."
          required
        />

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-2">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" isLoading={state === 'loading'} className="w-full">
          {ctaLabel}
        </Button>
      </form>
    </div>
  )
}
