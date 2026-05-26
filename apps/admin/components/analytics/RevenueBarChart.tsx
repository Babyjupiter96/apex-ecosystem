'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import type { MonthlyRevenue } from '@/lib/analytics'

interface RevenueBarChartProps {
  data: MonthlyRevenue[]
}

const TICK_STYLE = { fill: '#555', fontSize: 11 }

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const d: MonthlyRevenue = payload[0].payload
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 shadow-xl">
      <p className="text-[#888] text-xs mb-1.5">{label}</p>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between gap-6">
          <span className="text-[#888]">Revenue</span>
          <span className="text-[#C9A84C] font-semibold tabular-nums">
            ${(d.revenue / 1000).toFixed(0)}k
          </span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-[#888]">Leads</span>
          <span className="text-[#F5F0E8] tabular-nums">{d.leads}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-[#888]">Deals Closed</span>
          <span className="text-emerald-400 tabular-nums">{d.deals}</span>
        </div>
      </div>
    </div>
  )
}

export function RevenueBarChart({ data }: RevenueBarChartProps) {
  const avg = data.reduce((s, d) => s + d.revenue, 0) / data.length

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
        <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} />
        <YAxis
          tick={TICK_STYLE}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <ReferenceLine
          y={avg}
          stroke="#444"
          strokeDasharray="4 4"
          label={{ value: 'avg', fill: '#555', fontSize: 10, position: 'insideTopRight' }}
        />
        <Bar dataKey="revenue" fill="#C9A84C" radius={[4, 4, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  )
}
