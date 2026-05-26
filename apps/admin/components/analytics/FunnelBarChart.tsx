'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { FunnelStep } from '@/lib/analytics'

interface FunnelBarChartProps {
  data: FunnelStep[]
}

const TICK_STYLE = { fill: '#555', fontSize: 11 }

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const step: FunnelStep = payload[0].payload
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 shadow-xl min-w-[180px]">
      <p className="text-[#F5F0E8] text-xs font-semibold mb-1.5">{step.name}</p>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between gap-6">
          <span className="text-[#888]">Visitors</span>
          <span className="text-[#F5F0E8] tabular-nums">{step.visitors.toLocaleString()}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-[#888]">Completions</span>
          <span className="text-[#F5F0E8] tabular-nums">{step.completions.toLocaleString()}</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-[#888]">Conversion</span>
          <span className="text-emerald-400 tabular-nums">{step.rate.toFixed(1)}%</span>
        </div>
        {step.dropOff > 0 && (
          <div className="flex justify-between gap-6">
            <span className="text-[#888]">Drop-off</span>
            <span className="text-red-400 tabular-nums">-{step.dropOff.toFixed(1)}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

export function FunnelBarChart({ data }: FunnelBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" horizontal={false} />
        <XAxis
          type="number"
          tick={TICK_STYLE}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={TICK_STYLE}
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="visitors" radius={[0, 4, 4, 0]}>
          {data.map((step, i) => {
            const ratio = step.visitors / data[0].visitors
            const r = Math.round(ratio * 155 + 100)
            const g = Math.round(ratio * 40 + 128)
            const b = Math.round(44 + (1 - ratio) * 60)
            return <Cell key={i} fill={`rgba(${r},${g},${b},0.85)`} />
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
