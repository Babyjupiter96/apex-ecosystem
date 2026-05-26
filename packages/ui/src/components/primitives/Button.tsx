'use client'
import { forwardRef } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-40 whitespace-nowrap',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-gold text-brand-black hover:bg-brand-gold-light focus-visible:ring-brand-gold shadow-gold',
        ghost:
          'border border-white/20 text-white hover:bg-white/5 hover:border-white/40 focus-visible:ring-white/40',
        outline:
          'border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black focus-visible:ring-brand-gold',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        link: 'text-brand-gold underline-offset-4 hover:underline p-0 h-auto',
        cyan:
          'bg-brand-cyan text-brand-black hover:bg-brand-cyan-dark focus-visible:ring-brand-cyan shadow-cyan',
      },
      size: {
        sm: 'h-9 px-4 text-xs rounded-md',
        md: 'h-11 px-6 text-sm rounded-md',
        lg: 'h-14 px-8 text-sm rounded-lg',
        xl: 'h-16 px-10 text-base rounded-xl',
        icon: 'h-10 w-10 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'ref'> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, isLoading, disabled, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      disabled={disabled ?? isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  ),
)

Button.displayName = 'Button'
