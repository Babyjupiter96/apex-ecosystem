'use client'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-brand-offwhite">
            {label}
            {props.required && <span className="text-brand-gold ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'flex h-11 w-full rounded-md border bg-transparent px-4 py-2 text-sm',
            'border-brand-border text-brand-offwhite placeholder:text-brand-muted',
            'focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-150',
            error && 'border-red-500 focus:ring-red-500',
            className,
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-brand-muted">{hint}</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
