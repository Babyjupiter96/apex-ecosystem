'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@apex/ui'
import type { ServiceFaq } from '@/lib/types'

export function ServiceFaqAccordion({ faqs }: { faqs: ServiceFaq[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-0">
      {faqs.map((faq, i) => (
        <div key={i} className="border-t border-brand-border">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-6 text-left group"
            aria-expanded={open === i}
          >
            <span className={cn(
              'font-medium transition-colors',
              open === i ? 'text-brand-gold' : 'text-brand-offwhite group-hover:text-brand-gold',
            )}>
              {faq.question}
            </span>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-brand-muted shrink-0 ml-4 transition-transform duration-200',
                open === i && 'rotate-180',
              )}
            />
          </button>
          {open === i && (
            <p className="pb-6 text-brand-muted leading-relaxed text-sm">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
      <div className="border-t border-brand-border" />
    </div>
  )
}
