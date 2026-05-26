'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Button } from '@apex/ui'
import { funnelStep } from '@apex/ui/animations'
import { trackEvent } from '@apex/analytics/client'

// ─── Step definitions ────────────────────────────────────────────────────────

type StepOption = { value: string; label: string; emoji: string }

const STEPS = [
  {
    id: 'challenge',
    question: "What's your biggest challenge right now?",
    type: 'multi' as const,
    options: [
      { value: 'brand', label: 'My brand feels outdated or inconsistent', emoji: '🎨' },
      { value: 'website', label: 'My website isn\'t converting visitors', emoji: '🌐' },
      { value: 'leads', label: 'I\'m not generating enough qualified leads', emoji: '📈' },
      { value: 'visibility', label: 'Nobody can find me online (SEO)', emoji: '🔍' },
    ] as StepOption[],
  },
  {
    id: 'budget',
    question: 'What\'s your investment range for this project?',
    type: 'single' as const,
    options: [
      { value: '5k-15k', label: '$5,000 – $15,000', emoji: '💼' },
      { value: '15k-30k', label: '$15,000 – $30,000', emoji: '🏆' },
      { value: '30k-75k', label: '$30,000 – $75,000', emoji: '🚀' },
      { value: '75k+', label: '$75,000+', emoji: '🌟' },
    ] as StepOption[],
  },
  {
    id: 'timeline',
    question: 'When are you looking to get started?',
    type: 'single' as const,
    options: [
      { value: 'asap', label: 'As soon as possible', emoji: '⚡' },
      { value: '1-2mo', label: 'Within 1–2 months', emoji: '📅' },
      { value: '3-6mo', label: '3–6 months from now', emoji: '🗓️' },
      { value: 'exploring', label: 'Just exploring options', emoji: '👀' },
    ] as StepOption[],
  },
  {
    id: 'contact',
    question: 'Where should we send your discovery call details?',
    type: 'form' as const,
    options: [],
  },
]

// ─── Components ──────────────────────────────────────────────────────────────

type AnswersState = Record<string, string | string[]>

function ChoiceStep({
  step,
  multi,
  onNext,
}: {
  step: (typeof STEPS)[number]
  multi: boolean
  onNext: (value: string | string[]) => void
}) {
  const [selected, setSelected] = useState<string[]>([])

  function toggle(value: string) {
    if (multi) {
      setSelected(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value])
    } else {
      setSelected([value])
      setTimeout(() => onNext(value), 300)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {step.options.map(opt => (
          <button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            className={`group flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-200 ${
              selected.includes(opt.value)
                ? 'border-brand-gold bg-brand-gold/5 text-brand-offwhite'
                : 'border-brand-border bg-brand-graphite text-brand-muted hover:border-brand-gold/40 hover:text-brand-offwhite'
            }`}
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className="text-sm font-medium leading-tight">{opt.label}</span>
            {selected.includes(opt.value) && (
              <Check className="ml-auto w-4 h-4 text-brand-gold shrink-0" />
            )}
          </button>
        ))}
      </div>

      {multi && selected.length > 0 && (
        <Button onClick={() => onNext(selected)} size="lg" className="w-full">
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}

function ContactStep({ onSubmit }: { onSubmit: (data: AnswersState) => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const data = Object.fromEntries(new FormData(e.currentTarget))
    await new Promise(r => setTimeout(r, 800)) // simulate network
    setLoading(false)
    onSubmit(data as AnswersState)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-brand-muted">First Name *</label>
          <input name="firstName" required placeholder="Jane" className="h-11 px-4 bg-brand-graphite border border-brand-border rounded-md text-brand-offwhite placeholder:text-brand-muted focus:outline-none focus:border-brand-gold text-sm" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-brand-muted">Last Name *</label>
          <input name="lastName" required placeholder="Smith" className="h-11 px-4 bg-brand-graphite border border-brand-border rounded-md text-brand-offwhite placeholder:text-brand-muted focus:outline-none focus:border-brand-gold text-sm" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-brand-muted">Work Email *</label>
        <input name="email" type="email" required placeholder="jane@company.com" className="h-11 px-4 bg-brand-graphite border border-brand-border rounded-md text-brand-offwhite placeholder:text-brand-muted focus:outline-none focus:border-brand-gold text-sm" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-brand-muted">Company</label>
        <input name="company" placeholder="Acme Inc." className="h-11 px-4 bg-brand-graphite border border-brand-border rounded-md text-brand-offwhite placeholder:text-brand-muted focus:outline-none focus:border-brand-gold text-sm" />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" size="lg" isLoading={loading} className="w-full mt-2">
        Book My Discovery Call
      </Button>
      <p className="text-xs text-brand-muted text-center">
        No spam ever. Unsubscribe anytime.
      </p>
    </form>
  )
}

// ─── Main funnel page ────────────────────────────────────────────────────────

export default function DiscoveryFunnelPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<AnswersState>({})
  const [isComplete, setIsComplete] = useState(false)

  const currentStep = STEPS[step]
  if (!currentStep) return null

  const progress = ((step) / STEPS.length) * 100

  function handleStepAnswer(value: string | string[] | AnswersState) {
    const newAnswers = { ...answers, [currentStep.id]: value as string | string[] }
    setAnswers(newAnswers)

    trackEvent('funnel_step_completed', { step: currentStep.id, stepIndex: step })

    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      // Final — submit to API and show Calendly
      submitFunnel({ ...newAnswers, ...(value as AnswersState) })
    }
  }

  async function submitFunnel(data: AnswersState) {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          company: data.company,
          message: `Challenge: ${answers.challenge} | Budget: ${answers.budget} | Timeline: ${answers.timeline}`,
          tenantSlug: 'apex-agency',
          formId: 'discovery-funnel',
        }),
      })
      trackEvent('funnel_completed', { tenantSlug: 'apex-agency' })
    } catch {
      // Don't block the UX on API failure
    }
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold flex items-center justify-center mx-auto mb-8">
            <Check className="w-8 h-8 text-brand-gold" />
          </div>
          <h2 className="text-3xl font-display font-light text-brand-offwhite mb-4">
            We&apos;ll be in touch shortly
          </h2>
          <p className="text-brand-muted mb-8">
            Expect an email from us within 24 hours to confirm your discovery call.
            In the meantime, here&apos;s our calendar if you want to lock in a time now:
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_AGENCY_URL ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-8 py-4 text-sm font-semibold uppercase tracking-wide hover:bg-brand-gold-light transition-colors"
          >
            Book on Calendly <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-brand-graphite z-50" aria-hidden="true">
        <motion.div
          className="h-full bg-brand-gold"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6">
        <Link href="/" className="text-brand-gold font-display tracking-widest text-sm uppercase">
          StudioApex
        </Link>
        <span className="text-brand-muted text-xs">
          {step + 1} / {STEPS.length}
        </span>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={funnelStep}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <p className="text-brand-gold text-xs uppercase tracking-widest mb-4">
                Step {step + 1} of {STEPS.length}
              </p>
              <h1 className="text-2xl lg:text-3xl font-display font-light text-brand-offwhite mb-8">
                {currentStep.question}
              </h1>

              {currentStep.type !== 'form' ? (
                <ChoiceStep
                  step={currentStep}
                  multi={currentStep.type === 'multi'}
                  onNext={handleStepAnswer}
                />
              ) : (
                <ContactStep onSubmit={handleStepAnswer} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Back button */}
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="mt-6 flex items-center gap-2 text-sm text-brand-muted hover:text-brand-offwhite transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
