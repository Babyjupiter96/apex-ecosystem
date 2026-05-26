'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { RANGE_LABELS } from '@/lib/analytics'
import type { TimeRange } from '@/lib/analytics'
import { cn } from '@apex/ui'

interface TimeRangePickerProps {
  value: TimeRange
}

const RANGES: TimeRange[] = ['7d', '30d', '90d', '12mo']

export function TimeRangePicker({ value }: TimeRangePickerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  function select(range: TimeRange) {
    const next = new URLSearchParams(params.toString())
    next.set('range', range)
    router.push(`${pathname}?${next.toString()}`)
  }

  return (
    <div className="flex items-center gap-1 bg-[#111] border border-[#2A2A2A] rounded-lg p-1">
      {RANGES.map(r => (
        <button
          key={r}
          onClick={() => select(r)}
          className={cn(
            'px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all',
            value === r
              ? 'bg-[#C9A84C] text-[#0A0A0A]'
              : 'text-[#888] hover:text-[#F5F0E8] hover:bg-[#1A1A1A]',
          )}
        >
          {r}
        </button>
      ))}
    </div>
  )
}
