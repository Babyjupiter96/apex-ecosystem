'use client'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { formatKpi } from '@/lib/analytics'
import type { KpiMetric } from '@/lib/analytics'
import { cn } from '@apex/ui'

interface MetricCardProps {
  label: string
  metric: KpiMetric
  icon?: React.ReactNode
  className?: string
}

export function MetricCard({ label, metric, icon, className }: MetricCardProps) {
  const isPositive = metric.change > 0
  const isNeutral = metric.change === 0

  return (
    <div className={cn('bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5', className)}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-[#888] text-xs font-semibold uppercase tracking-widest">{label}</p>
        {icon && <span className="text-[#888]">{icon}</span>}
      </div>
      <p className="text-3xl font-bold text-[#F5F0E8] mb-2 font-mono tabular-nums">
        {formatKpi(metric)}
      </p>
      <div className="flex items-center gap-1.5">
        {isNeutral ? (
          <Minus className="w-3.5 h-3.5 text-[#888]" />
        ) : isPositive ? (
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <TrendingDown className="w-3.5 h-3.5 text-red-400" />
        )}
        <span
          className={cn(
            'text-xs font-semibold',
            isNeutral ? 'text-[#888]' : isPositive ? 'text-emerald-400' : 'text-red-400',
          )}
        >
          {isPositive ? '+' : ''}{metric.change.toFixed(1)}%
        </span>
        <span className="text-[#555] text-xs">vs prior period</span>
      </div>
    </div>
  )
}
