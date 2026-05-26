export type TimeRange = '7d' | '30d' | '90d' | '12mo'

export interface KpiMetric {
  value: number
  change: number // percentage change vs prior period, can be negative
  format: 'number' | 'currency' | 'percent' | 'duration'
}

export interface DailyPoint {
  date: string
  visitors: number
  uniqueVisitors: number
  leads: number
  conversions: number
}

export interface LeadSource {
  source: string
  count: number
  conversionRate: number
  revenue: number
  color: string
}

export interface FunnelStep {
  name: string
  path: string
  visitors: number
  completions: number
  rate: number
  dropOff: number
}

export interface TopPage {
  path: string
  label: string
  views: number
  uniqueViews: number
  avgTime: string
  bounceRate: number
}

export interface RecentEvent {
  id: string
  event: string
  page: string
  source: string
  timestamp: string
  value?: number
}

export interface MonthlyRevenue {
  month: string
  revenue: number
  leads: number
  deals: number
}

export interface DeviceBreakdown {
  device: string
  percentage: number
  color: string
}

export interface AnalyticsSnapshot {
  range: TimeRange
  tenantId: string
  kpis: {
    visitors: KpiMetric
    uniqueVisitors: KpiMetric
    leads: KpiMetric
    conversionRate: KpiMetric
    revenue: KpiMetric
    avgSessionDuration: KpiMetric
  }
  trafficByDay: DailyPoint[]
  leadsBySource: LeadSource[]
  funnelSteps: FunnelStep[]
  topPages: TopPage[]
  recentEvents: RecentEvent[]
  deviceBreakdown: DeviceBreakdown[]
  revenueByMonth: MonthlyRevenue[]
  pipelineByStage: { stage: string; count: number; value: number }[]
}

// ─── Mock data generator ───────────────────────────────────────────────────────

function generateDailyPoints(days: number): DailyPoint[] {
  const points: DailyPoint[] = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)

    // Simulate realistic traffic with weekend dips and growth trend
    const dayOfWeek = d.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const base = 320 + (days - i) * 2.5 // slight upward trend
    const weekend = isWeekend ? 0.65 : 1
    const noise = 0.8 + Math.random() * 0.4

    const visitors = Math.round(base * weekend * noise)
    const uniqueVisitors = Math.round(visitors * (0.7 + Math.random() * 0.1))
    const leads = Math.round(visitors * (0.028 + Math.random() * 0.014))
    const conversions = Math.round(leads * (0.18 + Math.random() * 0.12))

    points.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      visitors,
      uniqueVisitors,
      leads,
      conversions,
    })
  }

  return points
}

function mockSnapshot(range: TimeRange, tenantId: string): AnalyticsSnapshot {
  const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365
  const trafficByDay = generateDailyPoints(days)

  return {
    range,
    tenantId,
    kpis: {
      visitors: { value: 14_820, change: 18.4, format: 'number' },
      uniqueVisitors: { value: 9_340, change: 12.1, format: 'number' },
      leads: { value: 312, change: 34.2, format: 'number' },
      conversionRate: { value: 2.11, change: 0.42, format: 'percent' },
      revenue: { value: 186_500, change: 22.8, format: 'currency' },
      avgSessionDuration: { value: 214, change: 8.3, format: 'duration' },
    },
    trafficByDay,
    leadsBySource: [
      { source: 'Organic Search', count: 118, conversionRate: 3.8, revenue: 72_000, color: '#C9A84C' },
      { source: 'Direct', count: 67, conversionRate: 4.2, revenue: 43_500, color: '#22D3EE' },
      { source: 'Social Organic', count: 48, conversionRate: 1.9, revenue: 28_000, color: '#A78BFA' },
      { source: 'Referral', count: 41, conversionRate: 5.1, revenue: 31_000, color: '#34D399' },
      { source: 'Cold Outreach', count: 22, conversionRate: 6.8, revenue: 8_500, color: '#F87171' },
      { source: 'AI Chatbot', count: 16, conversionRate: 7.4, revenue: 3_500, color: '#FB923C' },
    ],
    funnelSteps: [
      { name: 'Landing Page', path: '/', visitors: 14_820, completions: 3_706, rate: 100, dropOff: 0 },
      { name: 'CTA Clicked', path: '/funnels/discovery', visitors: 3_706, completions: 2_244, rate: 25.0, dropOff: 75.0 },
      { name: 'Step 1: Challenge', path: 'step-1', visitors: 2_244, completions: 1_897, rate: 60.5, dropOff: 14.9 },
      { name: 'Step 2: Budget', path: 'step-2', visitors: 1_897, completions: 1_482, rate: 51.1, dropOff: 21.9 },
      { name: 'Step 3: Timeline', path: 'step-3', visitors: 1_482, completions: 1_231, rate: 39.9, dropOff: 16.9 },
      { name: 'Step 4: Contact', path: 'step-4', visitors: 1_231, completions: 934, rate: 33.2, dropOff: 24.2 },
      { name: 'Form Submitted', path: 'submit', visitors: 934, completions: 748, rate: 25.2, dropOff: 19.9 },
      { name: 'Calendly Booked', path: 'calendly', visitors: 748, completions: 312, rate: 20.2, dropOff: 58.3 },
    ],
    topPages: [
      { path: '/', label: 'Home', views: 14_820, uniqueViews: 9_340, avgTime: '3:22', bounceRate: 32.1 },
      { path: '/services', label: 'Services', views: 4_210, uniqueViews: 3_180, avgTime: '2:47', bounceRate: 28.4 },
      { path: '/work', label: 'Work / Portfolio', views: 3_640, uniqueViews: 2_870, avgTime: '4:11', bounceRate: 18.7 },
      { path: '/services/web-design', label: 'Web Design', views: 2_910, uniqueViews: 2_240, avgTime: '3:55', bounceRate: 24.3 },
      { path: '/blog', label: 'Blog', views: 2_670, uniqueViews: 2_090, avgTime: '1:58', bounceRate: 44.2 },
      { path: '/funnels/discovery', label: 'Discovery Funnel', views: 2_244, uniqueViews: 1_980, avgTime: '5:33', bounceRate: 8.1 },
      { path: '/services/seo', label: 'SEO Service', views: 1_840, uniqueViews: 1_520, avgTime: '3:14', bounceRate: 26.9 },
      { path: '/pricing', label: 'Pricing', views: 1_760, uniqueViews: 1_410, avgTime: '2:31', bounceRate: 35.7 },
    ],
    recentEvents: [
      { id: 'e1', event: 'form_submitted', page: '/funnels/discovery', source: 'Organic Search', timestamp: '2 min ago', value: 15000 },
      { id: 'e2', event: 'cta_clicked', page: '/', source: 'Direct', timestamp: '4 min ago' },
      { id: 'e3', event: 'page_view', page: '/services/brand-identity', source: 'Social Organic', timestamp: '6 min ago' },
      { id: 'e4', event: 'form_submitted', page: '/contact', source: 'Referral', timestamp: '11 min ago' },
      { id: 'e5', event: 'cta_clicked', page: '/work/crestline-capital-rebrand', source: 'Organic Search', timestamp: '14 min ago' },
      { id: 'e6', event: 'chat_started', page: '/', source: 'Direct', timestamp: '18 min ago' },
      { id: 'e7', event: 'page_view', page: '/blog/brand-not-converting', source: 'Social Organic', timestamp: '22 min ago' },
      { id: 'e8', event: 'form_submitted', page: '/funnels/discovery', source: 'Cold Outreach', timestamp: '29 min ago', value: 8500 },
    ],
    deviceBreakdown: [
      { device: 'Desktop', percentage: 58.4, color: '#C9A84C' },
      { device: 'Mobile', percentage: 34.2, color: '#22D3EE' },
      { device: 'Tablet', percentage: 7.4, color: '#A78BFA' },
    ],
    revenueByMonth: [
      { month: 'Dec', revenue: 92_000, leads: 201, deals: 8 },
      { month: 'Jan', revenue: 108_500, leads: 224, deals: 10 },
      { month: 'Feb', revenue: 124_000, leads: 248, deals: 11 },
      { month: 'Mar', revenue: 141_500, leads: 271, deals: 13 },
      { month: 'Apr', revenue: 159_000, leads: 290, deals: 14 },
      { month: 'May', revenue: 186_500, leads: 312, deals: 16 },
    ],
    pipelineByStage: [
      { stage: 'New', count: 84, value: 1_260_000 },
      { stage: 'Contacted', count: 52, value: 780_000 },
      { stage: 'Qualified', count: 38, value: 570_000 },
      { stage: 'Proposal Sent', count: 24, value: 360_000 },
      { stage: 'Negotiating', count: 14, value: 210_000 },
      { stage: 'Closed Won', count: 16, value: 186_500 },
    ],
  }
}

// ─── PostHog Query API ─────────────────────────────────────────────────────────

async function queryPostHog<T>(query: string): Promise<T | null> {
  const key = process.env.POSTHOG_PERSONAL_API_KEY
  const projectId = process.env.POSTHOG_PROJECT_ID
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com'

  if (!key || !projectId) return null

  try {
    const res = await fetch(`${host}/api/projects/${projectId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }),
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAnalyticsSnapshot(
  tenantId: string,
  range: TimeRange,
): Promise<AnalyticsSnapshot> {
  // Try PostHog first; fall back to mock for full functionality when not configured
  const posthogData = await queryPostHog<{ results: unknown[] }>(
    `SELECT count() as visitors FROM events WHERE timestamp >= now() - INTERVAL 30 DAY LIMIT 1`,
  )

  // When PostHog returns data, we would merge it here.
  // For now return rich mock data in either case.
  void posthogData

  return mockSnapshot(range, tenantId)
}

export function formatKpi(metric: KpiMetric): string {
  switch (metric.format) {
    case 'currency':
      return `$${(metric.value / 1000).toFixed(0)}k`
    case 'percent':
      return `${metric.value.toFixed(2)}%`
    case 'duration': {
      const m = Math.floor(metric.value / 60)
      const s = metric.value % 60
      return `${m}:${String(s).padStart(2, '0')}`
    }
    default:
      return metric.value >= 1000
        ? `${(metric.value / 1000).toFixed(1)}k`
        : String(metric.value)
  }
}

export const RANGE_LABELS: Record<TimeRange, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  '12mo': 'Last 12 months',
}
