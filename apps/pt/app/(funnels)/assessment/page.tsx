'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Button } from '@apex/ui'
import { funnelStep } from '@apex/ui/animations'
import { trackEvent } from '@apex/analytics/client'

const STEPS = [
  {
    id: 'goal',
    question: "What's your primary fitness goal?",
    options: [
      { value: 'fat-loss', label: 'Lose body fat & get lean', emoji: '🔥' },
      { value: 'muscle', label: 'Build muscle & strength', emoji: '💪' },
      { value: 'athletic', label: 'Improve athletic performance', emoji: '⚡' },
      { value: 'overall', label: 'Overall health & body recomposition', emoji: '🏆' },
    ],
  },
  {
    id: 'experience',
    question: "What's your training experience?",
    options: [
      { value: 'beginner', label: 'Beginner (0–1 years)', emoji: '🌱' },
      { value: 'intermediate', label: 'Intermediate (1–3 years)', emoji: '📈' },
      { value: 'advanced', label: 'Advanced (3+ years)', emoji: '🎯' },
      { value: 'athlete', label: 'Competitive athlete', emoji: '🏅' },
    ],
  },
  {
    id: 'schedule',
    question: "How many days per week can you train?",
    options: [
      { value: '3', label: '3 days/week', emoji: '📅' },
      { value: '4', label: '4 days/week', emoji: '🗓️' },
      { value: '5', label: '5 days/week', emoji: '💯' },
      { value: '6+', label: '6+ days/week', emoji: '🔥' },
    ],
  },
  {
    id: 'contact',
    question: 'Get your personalized assessment results',
    options: [],
  },
]

type Answers = Record<string, string>

export default function AssessmentFunnelPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [isComplete, setIsComplete] = useState(false)

  const currentStep = STEPS[step]
  if (!currentStep) return null

  const progress = (step / STEPS.length) * 100

  function handleChoice(value: string) {
    const newAnswers = { ...answers, [currentStep.id]: value }
    setAnswers(newAnswers)
    trackEvent('funnel_step_completed', { step: currentStep.id, value, funnel: 'assessment' })
    if (step < STEPS.length - 1) setStep(s => s + 1)
  }

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Answers

    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        message: `Goal: ${answers.goal} | Experience: ${answers.experience} | Schedule: ${answers.schedule} days/week`,
        tenantSlug: 'apex-pt',
        formId: 'assessment-funnel',
      }),
    }).catch(() => {})

    trackEvent('funnel_completed', { funnel: 'assessment', tenantSlug: 'apex-pt' })
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
        <motion.div className="text-center max-w-md" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-16 h-16 rounded-full bg-brand-cyan/10 border border-brand-cyan flex items-center justify-center mx-auto mb-8">
            <Check className="w-8 h-8 text-brand-cyan" />
          </div>
          <h2 className="text-3xl font-display font-bold text-brand-white uppercase mb-4">Assessment Received!</h2>
          <p className="text-brand-muted mb-8">
            We&apos;ll review your assessment and reach out within 24 hours with your custom training roadmap.
          </p>
          <a href={process.env.NEXT_PUBLIC_CALENDLY_PT_URL ?? '#'} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-cyan text-brand-black px-8 py-4 text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan-dark transition-colors">
            Book Intake Call <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-brand-steel z-50" aria-hidden="true">
        <motion.div className="h-full bg-brand-cyan" animate={{ width: `${progress}%` }} />
      </div>

      <div className="flex items-center justify-between px-6 py-6">
        <Link href="/" className="text-brand-cyan font-display font-bold tracking-widest text-sm uppercase">
          ApexPerformance
        </Link>
        <span className="text-brand-muted text-xs font-mono">{step + 1}/{STEPS.length}</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div key={step} variants={funnelStep} initial="enter" animate="center" exit="exit">
              <p className="text-brand-cyan text-xs uppercase tracking-widest font-bold mb-4">Step {step + 1} of {STEPS.length}</p>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-brand-white uppercase mb-8">{currentStep.question}</h1>

              {currentStep.id !== 'contact' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentStep.options.map(opt => (
                    <button key={opt.value} onClick={() => handleChoice(opt.value)}
                      className="flex items-center gap-4 p-5 rounded-xl border border-brand-border bg-brand-steel text-left hover:border-brand-cyan/50 hover:bg-brand-steel/70 transition-all group">
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="text-sm font-medium text-brand-white group-hover:text-brand-cyan transition-colors">{opt.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input name="firstName" required placeholder="First Name" className="h-11 px-4 bg-brand-steel border border-brand-border rounded-md text-brand-white placeholder:text-brand-muted focus:outline-none focus:border-brand-cyan text-sm" />
                    <input name="lastName" required placeholder="Last Name" className="h-11 px-4 bg-brand-steel border border-brand-border rounded-md text-brand-white placeholder:text-brand-muted focus:outline-none focus:border-brand-cyan text-sm" />
                  </div>
                  <input name="email" type="email" required placeholder="Email Address" className="w-full h-11 px-4 bg-brand-steel border border-brand-border rounded-md text-brand-white placeholder:text-brand-muted focus:outline-none focus:border-brand-cyan text-sm" />
                  <Button type="submit" size="lg" variant="cyan" className="w-full font-bold uppercase">
                    Get My Assessment Results
                  </Button>
                  <p className="text-xs text-brand-muted text-center">No spam. Unsubscribe anytime.</p>
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="mt-6 flex items-center gap-2 text-sm text-brand-muted hover:text-brand-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
