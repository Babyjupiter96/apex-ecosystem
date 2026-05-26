import { Suspense } from 'react'
import { getAnalyticsSnapshot, RANGE_LABELS } from '@/lib/analytics'
import type { TimeRange } from '@/lib/analytics'
import { MetricCard } from '@/components/analytics/MetricCard'
import { TimeRangePicker } from '@/components/analytics/TimeRangePicker'
import { TrafficAreaChart } from '@/components/analytics/TrafficAreaChart'
import { LeadSourceDonut } from '@/components/analytics/LeadSourceDonut'
import { RevenueBarChart } from '@/components/analytics/RevenueBarChart'
import {
  Users,
  UserCheck,
  Target,
  TrendingUp,
  DollarSign,
  Clock,
  ArrowUpRight,
  Activity,
} from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const EVENT_LABELS: Record<string, string> = {
  form_submitted: 'Form Submitted',
  cta_clicked: 'CTA Clicked',
  page_view: 'Page View',
  chat_started: 'Chat Started',
}

const EVENT_COLORS: Record<string, string> = {
  form_submitted: 'text-emerald-400',
  cta_clicked: 'text-[#C9A84C]',
  page_view: 'text-[#888]',
  chat_started: 'text-[#22D3EE]',
}

interface PageProps {
  searchParams: { range?: string; tenant?: string }
}

export default async function AnalyticsPage({ searchParams }: PageProps) {
  const range = (searchParams.range ?? '30d') as TimeRange
  const tenantId = searchParams.tenant ?? 'default'
  const snap = await getAnalyticsSnapshot(tenantId, range)

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F5F0E8]">Analytics</h1>
          <p className="text-[#888] text-sm mt-0.5">{RANGE_LABELS[range]}</p>
        </div>
        <Suspense>
          <TimeRangePicker value={range} />
        </Suspense>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard label="Visitors" metric={snap.kpis.visitors} icon={<Users className="w-4 h-4" />} />
        <MetricCard label="Unique Visitors" metric={snap.kpis.uniqueVisitors} icon={<UserCheck className="w-4 h-4" />} />
        <MetricCard label="Leads" metric={snap.kpis.leads} icon={<Target className="w-4 h-4" />} />
        <MetricCard label="Conversion Rate" metric={snap.kpis.conversionRate} icon={<TrendingUp className="w-4 h-4" />} />
        <MetricCard label="Revenue" metric={snap.kpis.revenue} icon={<DollarSign className="w-4 h-4" />} />
        <MetricCard label="Avg Session" metric={snap.kpis.avgSessionDuration} icon={<Clock className="w-4 h-4" />} />
      </div>

      {/* Traffic + Lead Source row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic area chart */}
        <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider">
              Traffic & Leads
            </h2>
            <Link
              href={`/analytics/funnels?range=${range}`}
              className="flex items-center gap-1 text-xs text-[#C9A84C] hover:text-[#D4AF5A] transition-colors"
            >
              View Funnel <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="h-64">
            <TrafficAreaChart data={snap.trafficByDay} />
          </div>
        </div>

        {/* Lead source donut */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider">
              Lead Sources
            </h2>
          </div>
          <div className="h-64">
            <LeadSourceDonut data={snap.leadsBySource} />
          </div>
        </div>
      </div>

      {/* Revenue + Top Pages + Events row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue bar chart */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider">
              Revenue by Month
            </h2>
            <Link
              href={`/analytics/revenue?range=${range}`}
              className="flex items-center gap-1 text-xs text-[#C9A84C] hover:text-[#D4AF5A] transition-colors"
            >
              Details <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="h-52">
            <RevenueBarChart data={snap.revenueByMonth} />
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
          <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider mb-4">
            Top Pages
          </h2>
          <div className="space-y-3">
            {snap.topPages.slice(0, 6).map((page, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[#555] text-xs w-4 tabular-nums">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F0E8] text-xs font-medium truncate">{page.label}</p>
                  <p className="text-[#555] text-[10px] truncate">{page.path}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[#F5F0E8] text-xs tabular-nums">
                    {page.views.toLocaleString()}
                  </p>
                  <p className="text-[#555] text-[10px]">{page.bounceRate}% bounce</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Events */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider">
              Live Events
            </h2>
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="space-y-3">
            {snap.recentEvents.map(evt => (
              <div key={evt.id} className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A] mt-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-xs font-semibold ${EVENT_COLORS[evt.event] ?? 'text-[#888]'}`}
                    >
                      {EVENT_LABELS[evt.event] ?? evt.event}
                    </span>
                    {evt.value && (
                      <span className="text-[10px] text-[#C9A84C] font-semibold">
                        ${evt.value.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-[#555] text-[10px] truncate">{evt.page}</p>
                  <p className="text-[#444] text-[10px]">{evt.source} · {evt.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Breakdown */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
        <h2 className="text-sm font-semibold text-[#F5F0E8] uppercase tracking-wider mb-4">
          Device Breakdown
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {snap.deviceBreakdown.map(d => (
            <div key={d.device} className="flex-1">
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span className="text-[#888]">{d.device}</span>
                <span className="text-[#F5F0E8] font-semibold tabular-nums">{d.percentage}%</span>
              </div>
              <div className="h-2 bg-[#111] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${d.percentage}%`, background: d.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
