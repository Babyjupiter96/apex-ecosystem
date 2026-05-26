import { Suspense } from 'react'
import { getAnalyticsSnapshot, RANGE_LABELS } from '@/lib/analytics'
import type { TimeRange } from '@/lib/analytics'
import { TimeRangePicker } from '@/components/analytics/TimeRangePicker'
import { FunnelBarChart } from '@/components/analytics/FunnelBarChart'
import { TrafficAreaChart } from '@/components/analytics/TrafficAreaChart'
import { ArrowLeft, TrendingDown, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@apex/ui'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: { range?: string; tenant?: string }
}

export default async function FunnelsPage({ searchParams }: PageProps) {
  const range = (searchParams.range ?? '30d') as TimeRange
  const tenantId = searchParams.tenant ?? 'default'
  const snap = await getAnalyticsSnapshot(tenantId, range)
  const { funnelSteps } = snap

  const topDrop = [...funnelSteps].sort((a, b) => b.dropOff - a.dropOff)[0]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={`/analytics?range=${range}`}
            className="text-[#555] hover:text-[#F5F0E8] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#F5F0E8]">Funnel Analysis</h1>
            <p className="text-[#888] text-sm mt-0.5">{RANGE_LABELS[range]}</p>
          </div>
        </div>
        <Suspense>
          <TimeRangePicker value={range} />
        </Suspense>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <p className="text-[#888] text-xs uppercase tracking-widest mb-2">Top of Funnel</p>
          <p className="text-2xl font-bold text-[#F5F0E8] tabular-nums">
            {funnelSteps[0].visitors.toLocaleString()}
          </p>
          <p className="text-[#555] text-xs mt-1">Total Visitors</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <p className="text-[#888] text-xs uppercase tracking-widest mb-2">Bottom of Funnel</p>
          <p className="text-2xl font-bold text-emerald-400 tabular-nums">
            {funnelSteps[funnelSteps.length - 1].completions.toLocaleString()}
          </p>
          <p className="text-[#555] text-xs mt-1">Calendly Bookings</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <p className="text-[#888] text-xs uppercase tracking-widest mb-2">Overall CVR</p>
          <p className="text-2xl font-bold text-[#C9A84C] tabular-nums">
            {(
              (funnelSteps[funnelSteps.length - 1].completions / funnelSteps[0].visitors) *
              100
            ).toFixed(2)}%
          </p>
          <p className="text-[#555] text-xs mt-1">Visit → Booking</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <p className="text-[#888] text-xs uppercase tracking-widest mb-2">Biggest Drop</p>
          <p className="text-2xl font-bold text-red-400 tabular-nums">-{topDrop.dropOff}%</p>
          <p className="text-[#555] text-xs mt-1 truncate">{topDrop.name}</p>
        </div>
      </div>

      {/* Funnel visualization */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
        <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider mb-5">
          Step-by-Step Conversion
        </h2>
        <div className="h-72">
          <FunnelBarChart data={funnelSteps} />
        </div>
      </div>

      {/* Step table */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2A2A2A]">
          <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider">
            Step Breakdown
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1E1E1E]">
                {['Step', 'Path', 'Visitors', 'Completions', 'Step CVR', 'Drop-off'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[#555] font-semibold uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E1E]">
              {funnelSteps.map((step, i) => {
                const stepCvr = i === 0
                  ? 100
                  : (step.visitors / funnelSteps[i - 1].visitors) * 100

                return (
                  <tr key={i} className="hover:bg-[#111] transition-colors">
                    <td className="px-5 py-3.5 text-[#F5F0E8] font-medium">{step.name}</td>
                    <td className="px-5 py-3.5 text-[#555] font-mono">{step.path}</td>
                    <td className="px-5 py-3.5 text-[#F5F0E8] tabular-nums">
                      {step.visitors.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-[#F5F0E8] tabular-nums">
                      {step.completions.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {stepCvr >= 70 ? (
                          <TrendingUp className="w-3 h-3 text-emerald-400" />
                        ) : stepCvr < 40 ? (
                          <TrendingDown className="w-3 h-3 text-red-400" />
                        ) : null}
                        <span
                          className={cn(
                            'tabular-nums font-semibold',
                            stepCvr >= 70
                              ? 'text-emerald-400'
                              : stepCvr < 40
                              ? 'text-red-400'
                              : 'text-[#C9A84C]',
                          )}
                        >
                          {i === 0 ? '—' : `${stepCvr.toFixed(1)}%`}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      {step.dropOff > 0 ? (
                        <span className="text-red-400 tabular-nums font-semibold">
                          -{step.dropOff}%
                        </span>
                      ) : (
                        <span className="text-[#555]">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Traffic chart below */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
        <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider mb-5">
          Conversion Trend
        </h2>
        <div className="h-56">
          <TrafficAreaChart data={snap.trafficByDay} metric="both" />
        </div>
      </div>
    </div>
  )
}
