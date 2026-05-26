import { cn } from '../../lib/utils'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-brand-border bg-brand-graphite p-6',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn('mb-4 space-y-1', className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-semibold leading-none tracking-tight text-brand-offwhite', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-brand-muted', className)} {...props} />
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn('', className)} {...props} />
}

export function CardFooter({ className, ...props }: CardProps) {
  return <div className={cn('flex items-center pt-4 mt-4 border-t border-brand-border', className)} {...props} />
}
