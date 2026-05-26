'use client'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { DailyPoint } from '@/lib/analytics'

interface TrafficAreaChartProps {
  data: DailyPoint[]
  metric?: 'visitors' | 'leads' | 'both'
}

const TICK_STYLE = { fill: '#555', fontSize: 11 }

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 shadow-xl">
      <p className="text-[#888] text-xs mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          <span className="text-[#888] capitalize">{p.name}:</span>
          <span className="text-[#F5F0E8] font-semibold tabular-nums">
            {p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

export function TrafficAreaChart({ data, metric = 'both' }: TrafficAreaChartProps) {
  const showVisitors = metric === 'visitors' || metric === 'both'
  const showLeads = metric === 'leads' || metric === 'both'
  const thinned = data.length > 30 ? data.filter((_, i) => i % 3 === 0) : data

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={thinned} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
        <defs>
          <linearGradient id="gVisitors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E1E1E" vertical={false} />
        <XAxis
          dataKey="date"
          tick={TICK_STYLE}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={TICK_STYLE}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 11, color: '#888' }}
          iconType="circle"
          iconSize={8}
        />
        {showVisitors && (
          <Area
            type="monotone"
            dataKey="visitors"
            name="Visitors"
            stroke="#C9A84C"
            strokeWidth={2}
            fill="url(#gVisitors)"
            dot={false}
            activeDot={{ r: 4, fill: '#C9A84C' }}
          />
        )}
        {showLeads && (
          <Area
            type="monotone"
            dataKey="leads"
            name="Leads"
            stroke="#22D3EE"
            strokeWidth={2}
            fill="url(#gLeads)"
            dot={false}
            activeDot={{ r: 4, fill: '#22D3EE' }}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  )
}
