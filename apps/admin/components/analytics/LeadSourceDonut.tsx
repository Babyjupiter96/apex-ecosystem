'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { LeadSource } from '@/lib/analytics'

interface LeadSourceDonutProps {
  data: LeadSource[]
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const src: LeadSource = payload[0].payload
  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2.5 shadow-xl min-w-[160px]">
      <p className="text-[#F5F0E8] text-xs font-semibold mb-1.5">{src.source}</p>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between gap-4">
          <span className="text-[#888]">Leads</span>
          <span className="text-[#F5F0E8] tabular-nums">{src.count}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#888]">CVR</span>
          <span className="text-emerald-400 tabular-nums">{src.conversionRate}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#888]">Revenue</span>
          <span className="text-[#C9A84C] tabular-nums">${(src.revenue / 1000).toFixed(0)}k</span>
        </div>
      </div>
    </div>
  )
}

function CustomLegend({ payload }: any) {
  return (
    <ul className="flex flex-col gap-1.5 mt-2">
      {payload?.map((entry: any) => (
        <li key={entry.value} className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: entry.color }}
            />
            <span className="text-[#888]">{entry.value}</span>
          </div>
          <span className="text-[#F5F0E8] tabular-nums font-semibold">
            {entry.payload.count}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function LeadSourceDonut({ data }: LeadSourceDonutProps) {
  const total = data.reduce((s, d) => s + d.count, 0)

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="source"
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xl font-bold text-[#F5F0E8] tabular-nums">{total}</p>
          <p className="text-[10px] text-[#888] uppercase tracking-widest">Total Leads</p>
        </div>
      </div>
    </div>
  )
}
