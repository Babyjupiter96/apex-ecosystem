import { Suspense } from 'react'
import { getAnalyticsSnapshot, RANGE_LABELS } from '@/lib/analytics'
import type { TimeRange } from '@/lib/analytics'
import { TimeRangePicker } from '@/components/analytics/TimeRangePicker'
import { RevenueBarChart } from '@/components/analytics/RevenueBarChart'
import { LeadSourceDonut } from '@/components/analytics/LeadSourceDonut'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: { range?: string; tenant?: string }
}

export default async function RevenuePage({ searchParams }: PageProps) {
  const range = (searchParams.range ?? '30d') as TimeRange
  const tenantId = searchParams.tenant ?? 'default'
  const snap = await getAnalyticsSnapshot(tenantId, range)

  const totalRevenue = snap.revenueByMonth.reduce((s, m) => s + m.revenue, 0)
  const totalDeals = snap.revenueByMonth.reduce((s, m) => s + m.deals, 0)
  const avgDealSize = totalDeals > 0 ? totalRevenue / totalDeals : 0
  const pipelineTotal = snap.pipelineByStage.reduce((s, p) => s + p.value, 0)

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
            <h1 className="text-2xl font-bold text-[#F5F0E8]">Revenue Attribution</h1>
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
          <p className="text-[#888] text-xs uppercase tracking-widest mb-2">Total Revenue</p>
          <p className="text-2xl font-bold text-[#C9A84C] tabular-nums">
            ${(totalRevenue / 1000).toFixed(0)}k
          </p>
          <p className="text-[#555] text-xs mt-1">Across {snap.revenueByMonth.length} months</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <p className="text-[#888] text-xs uppercase tracking-widest mb-2">Deals Closed</p>
          <p className="text-2xl font-bold text-[#F5F0E8] tabular-nums">{totalDeals}</p>
          <p className="text-[#555] text-xs mt-1">Paid clients</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <p className="text-[#888] text-xs uppercase tracking-widest mb-2">Avg Deal Size</p>
          <p className="text-2xl font-bold text-[#F5F0E8] tabular-nums">
            ${(avgDealSize / 1000).toFixed(1)}k
          </p>
          <p className="text-[#555] text-xs mt-1">Per closed deal</p>
        </div>
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <p className="text-[#888] text-xs uppercase tracking-widest mb-2">Pipeline Value</p>
          <p className="text-2xl font-bold text-emerald-400 tabular-nums">
            ${(pipelineTotal / 1_000_000).toFixed(2)}M
          </p>
          <p className="text-[#555] text-xs mt-1">Across all stages</p>
        </div>
      </div>

      {/* Revenue chart + Lead value by source */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider mb-5">
            Monthly Revenue
          </h2>
          <div className="h-64">
            <RevenueBarChart data={snap.revenueByMonth} />
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider mb-4">
            Leads by Source
          </h2>
          <div className="h-64">
            <LeadSourceDonut data={snap.leadsBySource} />
          </div>
        </div>
      </div>

      {/* Revenue by source table */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2A2A2A]">
          <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider">
            Lead Source Revenue Attribution
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#1E1E1E]">
                {['Source', 'Leads', 'Conversion Rate', 'Revenue', '% of Total'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[#555] font-semibold uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1E1E]">
              {snap.leadsBySource
                .sort((a, b) => b.revenue - a.revenue)
                .map((src, i) => {
                  const totalSrcRevenue = snap.leadsBySource.reduce(
                    (s, l) => s + l.revenue,
                    0,
                  )
                  const pct = ((src.revenue / totalSrcRevenue) * 100).toFixed(1)
                  return (
                    <tr key={i} className="hover:bg-[#111] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ background: src.color }}
                          />
                          <span className="text-[#F5F0E8] font-medium">{src.source}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[#F5F0E8] tabular-nums">{src.count}</td>
                      <td className="px-5 py-3.5 text-emerald-400 tabular-nums font-semibold">
                        {src.conversionRate}%
                      </td>
                      <td className="px-5 py-3.5 text-[#C9A84C] tabular-nums font-semibold">
                        ${(src.revenue / 1000).toFixed(0)}k
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-[#111] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${pct}%`, background: src.color }}
                            />
                          </div>
                          <span className="text-[#888] tabular-nums">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pipeline by Stage */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2A2A2A]">
          <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider">
            Pipeline by Stage
          </h2>
        </div>
        <div className="p-5 space-y-4">
          {snap.pipelineByStage.map((stage, i) => {
            const pct = (stage.value / pipelineTotal) * 100
            const isWon = stage.stage === 'Closed Won'
            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <span className={isWon ? 'text-emerald-400 font-semibold' : 'text-[#888]'}>
                    {stage.stage}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-[#555] tabular-nums">{stage.count} deals</span>
                    <span className={`${isWon ? 'text-emerald-400' : 'text-[#F5F0E8]'} font-semibold tabular-nums`}>
                      ${(stage.value / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-[#111] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isWon ? 'bg-emerald-500' : 'bg-[#C9A84C]'}`}
                    style={{ width: `${pct}%`, opacity: isWon ? 1 : 0.6 + (pct / 100) * 0.4 }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
