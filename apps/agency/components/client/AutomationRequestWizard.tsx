'use client'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@apex/ui'
import { AUTOMATION_TYPES, type AutomationType } from '@/lib/data/automations'

type Step = 'type' | 'config' | 'confirm' | 'success'

export function AutomationRequestWizard({ defaultType }: { defaultType?: string }) {
  const [step, setStep] = useState<Step>(defaultType ? 'config' : 'type')
  const [selectedType, setSelectedType] = useState<AutomationType | null>(
    (defaultType as AutomationType) ?? null,
  )
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const typeInfo = selectedType ? AUTOMATION_TYPES[selectedType] : null

  async function handleSubmit() {
    setSubmitting(true)
    try {
      await fetch('/api/automations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedType, config: formData }),
      })
      setStep('success')
    } catch {
      // optimistic — show success anyway for demo
      setStep('success')
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="bg-brand-graphite border border-brand-border rounded-xl p-12 text-center">
        <div className="w-16 h-16 rounded-full border-2 border-brand-gold flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-brand-gold" />
        </div>
        <h2 className="text-2xl font-display font-light text-brand-offwhite mb-3">Request received</h2>
        <p className="text-brand-muted mb-8 max-w-sm mx-auto">
          Our team will review your requirements and begin configuration. You'll receive a confirmation
          email within 24 hours with an estimated delivery date.
        </p>
        <div className="flex justify-center gap-3">
          <a
            href="/client/automations"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-brand-gold-light transition-colors rounded-sm"
          >
            View All Automations
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {(['type', 'config', 'confirm'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold',
              step === s ? 'bg-brand-gold text-brand-black' :
              i < ['type', 'config', 'confirm'].indexOf(step) ? 'bg-brand-gold/20 text-brand-gold' :
              'bg-brand-graphite border border-brand-border text-brand-muted',
            )}>
              {i + 1}
            </div>
            <span className="text-xs text-brand-muted uppercase tracking-widest hidden sm:block">
              {s === 'type' ? 'Select Type' : s === 'config' ? 'Configure' : 'Confirm'}
            </span>
            {i < 2 && <div className="w-8 h-px bg-brand-border" />}
          </div>
        ))}
      </div>

      {/* Step: Type selection */}
      {step === 'type' && (
        <div>
          <h2 className="text-xl font-semibold text-brand-offwhite mb-6">What type of automation do you need?</h2>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(AUTOMATION_TYPES).map(([type, info]) => (
              <button
                key={type}
                onClick={() => { setSelectedType(type as AutomationType); setStep('config') }}
                className={cn(
                  'flex items-start gap-4 p-5 border rounded-lg text-left transition-all hover:border-brand-gold/50 group',
                  selectedType === type ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-border bg-brand-graphite',
                )}
              >
                <span className="text-2xl mt-0.5">{info.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-semibold text-sm ${info.color}`}>{info.label}</p>
                    <div className="text-right">
                      <p className="text-xs text-brand-gold">{info.startingPrice}</p>
                      <p className="text-[10px] text-brand-muted">{info.deliveryTime}</p>
                    </div>
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed">{info.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-gold group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Config */}
      {step === 'config' && typeInfo && selectedType && (
        <div className="bg-brand-graphite border border-brand-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{typeInfo.icon}</span>
            <div>
              <h2 className="text-lg font-semibold text-brand-offwhite">{typeInfo.label}</h2>
              <p className="text-xs text-brand-muted">{typeInfo.description}</p>
            </div>
          </div>

          <div className="space-y-5">
            {typeInfo.configFields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs text-brand-muted uppercase tracking-widest mb-2">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={formData[field.key] ?? ''}
                    onChange={e => setFormData(d => ({ ...d, [field.key]: e.target.value }))}
                    className="w-full h-11 px-4 bg-brand-black border border-brand-border text-brand-offwhite focus:outline-none focus:border-brand-gold rounded-sm text-sm appearance-none"
                  >
                    <option value="">Select…</option>
                    {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={formData[field.key] ?? ''}
                    onChange={e => setFormData(d => ({ ...d, [field.key]: e.target.value }))}
                    className="w-full px-4 py-3 bg-brand-black border border-brand-border text-brand-offwhite focus:outline-none focus:border-brand-gold rounded-sm text-sm resize-none"
                    placeholder="Describe your requirements…"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.key] ?? ''}
                    onChange={e => setFormData(d => ({ ...d, [field.key]: e.target.value }))}
                    className="w-full h-11 px-4 bg-brand-black border border-brand-border text-brand-offwhite focus:outline-none focus:border-brand-gold rounded-sm text-sm"
                  />
                )}
              </div>
            ))}

            <div>
              <label className="block text-xs text-brand-muted uppercase tracking-widest mb-2">
                Additional notes
              </label>
              <textarea
                rows={3}
                value={formData.notes ?? ''}
                onChange={e => setFormData(d => ({ ...d, notes: e.target.value }))}
                className="w-full px-4 py-3 bg-brand-black border border-brand-border text-brand-offwhite focus:outline-none focus:border-brand-gold rounded-sm text-sm resize-none"
                placeholder="Anything else our team should know…"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep('type')}
              className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-offwhite transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep('confirm')}
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-6 py-2.5 text-sm font-semibold uppercase tracking-wide hover:bg-brand-gold-light transition-colors rounded-sm"
            >
              Review Order <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step: Confirm */}
      {step === 'confirm' && typeInfo && selectedType && (
        <div className="bg-brand-graphite border border-brand-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-brand-offwhite mb-6">Confirm your request</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-brand-black border border-brand-border rounded-lg">
              <span className="text-xl">{typeInfo.icon}</span>
              <div>
                <p className={`font-semibold text-sm ${typeInfo.color}`}>{typeInfo.label}</p>
                <p className="text-xs text-brand-muted">{typeInfo.startingPrice} · {typeInfo.deliveryTime}</p>
              </div>
            </div>

            {Object.entries(formData).filter(([, v]) => v).map(([key, val]) => (
              <div key={key} className="flex justify-between text-sm border-t border-brand-border pt-3">
                <span className="text-brand-muted capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-brand-offwhite text-right max-w-xs">{val}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-brand-muted mb-6">
            Your account manager will confirm exact pricing within 24 hours. You won't be charged until you approve the quote.
          </p>

          <div className="flex justify-between">
            <button
              onClick={() => setStep('config')}
              className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-offwhite transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-black px-8 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-brand-gold-light transition-colors rounded-sm disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Submit Request'}
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
