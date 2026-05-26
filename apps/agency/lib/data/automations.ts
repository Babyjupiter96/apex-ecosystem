export type AutomationType =
  | 'social-bot'
  | 'web-scraper'
  | 'lead-list'
  | 'email-sequence'
  | 'workflow'

export type AutomationStatus =
  | 'PENDING'
  | 'CONFIGURING'
  | 'ACTIVE'
  | 'PAUSED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'FAILED'

export interface AutomationService {
  id: string
  type: AutomationType
  name: string
  status: AutomationStatus
  description: string
  config: Record<string, unknown>
  metrics: { label: string; value: string | number }[]
  createdAt: string
  deliveredAt?: string
  nextRunAt?: string
  downloadUrl?: string
  logs: { timestamp: string; message: string; level: 'info' | 'success' | 'error' }[]
}

// Mock data for client portal (replaced by DB queries in production)
export const MOCK_AUTOMATIONS: AutomationService[] = [
  {
    id: 'auto-001',
    type: 'social-bot',
    name: 'Instagram Growth Bot',
    status: 'ACTIVE',
    description: 'Daily post scheduling + new-follower DM welcome sequence with personalization.',
    config: {
      platform: 'Instagram',
      postFrequency: '2/day',
      dmTemplate: 'Welcome sequence (3 messages)',
      targetHashtags: ['#entrepreneur', '#businessowner', '#digitalmarketing'],
    },
    metrics: [
      { label: 'Posts scheduled', value: 47 },
      { label: 'DMs sent', value: 312 },
      { label: 'Follower growth', value: '+18%' },
      { label: 'Engagement rate', value: '4.2%' },
    ],
    createdAt: '2024-04-01',
    nextRunAt: '2024-05-27T09:00:00Z',
    logs: [
      { timestamp: '2024-05-26T09:02:11Z', message: 'Posted "5 brand mistakes costing you clients" — 847 impressions', level: 'success' },
      { timestamp: '2024-05-26T09:00:00Z', message: 'Scheduled post execution started', level: 'info' },
      { timestamp: '2024-05-25T17:45:22Z', message: 'Sent 14 DMs to new followers', level: 'success' },
      { timestamp: '2024-05-25T09:01:55Z', message: 'Posted "How we 3x\'d a client\'s revenue in 6 months"', level: 'success' },
    ],
  },
  {
    id: 'auto-002',
    type: 'lead-list',
    name: 'SaaS CFO Lead List — Q2 2024',
    status: 'DELIVERED',
    description: 'Targeted B2B list: CFOs and VPs Finance at US-based SaaS companies, 50–500 employees, $5M–$50M ARR.',
    config: {
      targetRole: 'CFO, VP Finance, Head of Finance',
      industry: 'SaaS / B2B Software',
      companySize: '50–500 employees',
      geography: 'United States',
      estimatedARR: '$5M–$50M',
    },
    metrics: [
      { label: 'Contacts delivered', value: 847 },
      { label: 'Email verified', value: '94%' },
      { label: 'LinkedIn profiles', value: 823 },
      { label: 'Enrichment score', value: '91/100' },
    ],
    createdAt: '2024-05-10',
    deliveredAt: '2024-05-14',
    downloadUrl: '/api/automations/auto-002/download',
    logs: [
      { timestamp: '2024-05-14T14:30:00Z', message: 'Lead list delivered — 847 contacts, 94% email verified', level: 'success' },
      { timestamp: '2024-05-13T11:00:00Z', message: 'Email verification pass 2 complete (6 additional bounces removed)', level: 'info' },
      { timestamp: '2024-05-12T09:00:00Z', message: 'Enrichment complete: LinkedIn URLs, company data, technographics added', level: 'success' },
      { timestamp: '2024-05-10T15:00:00Z', message: 'Scraping job started — targeting LinkedIn Sales Navigator + Apollo', level: 'info' },
    ],
  },
  {
    id: 'auto-003',
    type: 'web-scraper',
    name: 'Competitor Pricing Monitor',
    status: 'ACTIVE',
    description: 'Daily scrape of 8 competitor pricing pages — tracks plan changes, new tiers, and promotional offers.',
    config: {
      targets: ['competitor-a.com/pricing', 'competitor-b.com/pricing', '+ 6 more'],
      frequency: 'Daily at 6am EST',
      alertOn: 'Price change, new plan, or feature update',
      outputFormat: 'Google Sheet + email digest',
    },
    metrics: [
      { label: 'Sites monitored', value: 8 },
      { label: 'Changes detected', value: 14 },
      { label: 'Alerts sent', value: 14 },
      { label: 'Uptime', value: '99.8%' },
    ],
    createdAt: '2024-03-15',
    nextRunAt: '2024-05-27T06:00:00Z',
    logs: [
      { timestamp: '2024-05-26T06:01:22Z', message: 'Scrape complete — no pricing changes detected', level: 'info' },
      { timestamp: '2024-05-21T06:01:07Z', message: 'ALERT: competitor-c.com added Enterprise tier at $499/mo', level: 'success' },
      { timestamp: '2024-05-14T06:00:55Z', message: 'ALERT: competitor-a.com reduced Starter price from $79 to $59', level: 'success' },
    ],
  },
  {
    id: 'auto-004',
    type: 'email-sequence',
    name: 'Post-Discovery No-Show Re-Engagement',
    status: 'ACTIVE',
    description: '5-email sequence triggered when a discovery call is not attended. Re-engages with social proof and a softer CTA.',
    config: {
      trigger: 'Calendly no-show event',
      sequenceLength: '5 emails over 14 days',
      delay: 'Email 1: 2hrs, Email 2: Day 3, Email 3: Day 7, Email 4: Day 11, Email 5: Day 14',
      espIntegration: 'ActiveCampaign',
    },
    metrics: [
      { label: 'Triggered', value: 34 },
      { label: 'Avg open rate', value: '52%' },
      { label: 'Re-booked calls', value: 9 },
      { label: 'Recovery rate', value: '26%' },
    ],
    createdAt: '2024-02-01',
    nextRunAt: 'Triggered on demand',
    logs: [
      { timestamp: '2024-05-25T14:22:00Z', message: 'Sequence triggered for james@techcorp.com — no-show on 2:00pm call', level: 'info' },
      { timestamp: '2024-05-24T10:15:00Z', message: 'Re-book confirmed: priya@luminary.com booked for June 3', level: 'success' },
      { timestamp: '2024-05-23T09:00:00Z', message: '14 emails sent across 7 active sequences — 48% open rate', level: 'info' },
    ],
  },
]

export const AUTOMATION_TYPES: Record<AutomationType, {
  label: string
  icon: string
  color: string
  description: string
  configFields: { key: string; label: string; type: 'text' | 'select' | 'textarea' | 'number'; options?: string[] }[]
  startingPrice: string
  deliveryTime: string
}> = {
  'social-bot': {
    label: 'Social Media Bot',
    icon: '🤖',
    color: 'text-purple-400',
    description: 'Automated posting, scheduling, DM campaigns, and engagement on Instagram, LinkedIn, or X.',
    startingPrice: '$450/mo',
    deliveryTime: '3–5 days setup',
    configFields: [
      { key: 'platform', label: 'Platform', type: 'select', options: ['Instagram', 'LinkedIn', 'X (Twitter)', 'Facebook'] },
      { key: 'postFrequency', label: 'Post Frequency', type: 'select', options: ['1/day', '2/day', '3/day', '5/week', '3/week'] },
      { key: 'dmEnabled', label: 'Enable DM Automation', type: 'select', options: ['Yes — welcome new followers', 'Yes — keyword trigger DMs', 'No'] },
      { key: 'targetAudience', label: 'Target Audience / Hashtags', type: 'textarea' },
    ],
  },
  'web-scraper': {
    label: 'Web Scraper',
    icon: '🔍',
    color: 'text-yellow-400',
    description: 'Extract products, leads, prices, job listings, or any structured data from any website at scale.',
    startingPrice: '$650 one-time',
    deliveryTime: '2–4 days',
    configFields: [
      { key: 'targetUrl', label: 'Target Website(s)', type: 'textarea' },
      { key: 'dataPoints', label: 'Data Points to Extract', type: 'textarea' },
      { key: 'frequency', label: 'Run Frequency', type: 'select', options: ['One-time', 'Daily', 'Weekly', 'Monthly'] },
      { key: 'outputFormat', label: 'Output Format', type: 'select', options: ['CSV', 'Google Sheet', 'JSON via API', 'Airtable'] },
    ],
  },
  'lead-list': {
    label: 'Lead List Building',
    icon: '📋',
    color: 'text-green-400',
    description: 'High-quality, verified B2B lead lists built to your exact ICP — roles, industry, company size, geography.',
    startingPrice: '$350 / 500 contacts',
    deliveryTime: '3–7 days',
    configFields: [
      { key: 'targetRole', label: 'Target Job Titles / Roles', type: 'text' },
      { key: 'industry', label: 'Industry / Vertical', type: 'text' },
      { key: 'companySize', label: 'Company Size', type: 'select', options: ['1–10', '10–50', '50–200', '200–1000', '1000+', 'Any'] },
      { key: 'geography', label: 'Geography', type: 'text' },
      { key: 'quantity', label: 'Number of Contacts Needed', type: 'number' },
    ],
  },
  'email-sequence': {
    label: 'Email Sequence',
    icon: '✉️',
    color: 'text-cyan-400',
    description: 'Trigger-based email sequences for nurture, onboarding, re-engagement, and sales. Loaded into your ESP.',
    startingPrice: '$1,200 one-time',
    deliveryTime: '5–10 days',
    configFields: [
      { key: 'trigger', label: 'Trigger Event', type: 'select', options: ['New lead opt-in', 'Calendly no-show', 'Trial signup', 'Purchase', 'Inactivity', 'Custom'] },
      { key: 'sequenceLength', label: 'Number of Emails', type: 'select', options: ['3 emails', '5 emails', '7 emails', '10 emails', 'Custom'] },
      { key: 'esp', label: 'Email Platform (ESP)', type: 'select', options: ['ActiveCampaign', 'Klaviyo', 'HubSpot', 'ConvertKit', 'Mailchimp', 'Other'] },
      { key: 'goal', label: 'Sequence Goal', type: 'textarea' },
    ],
  },
  'workflow': {
    label: 'Workflow Automation',
    icon: '⚡',
    color: 'text-orange-400',
    description: 'Connect your tools and automate multi-step processes — CRM updates, Slack alerts, Google Sheets sync, and more.',
    startingPrice: '$750 one-time',
    deliveryTime: '3–7 days',
    configFields: [
      { key: 'trigger', label: 'What triggers this workflow?', type: 'textarea' },
      { key: 'steps', label: 'What should happen? (step by step)', type: 'textarea' },
      { key: 'tools', label: 'Tools / Apps Involved', type: 'textarea' },
      { key: 'platform', label: 'Build On', type: 'select', options: ['Make (Integromat)', 'Zapier', 'n8n (self-hosted)', 'Custom code'] },
    ],
  },
}

export function getAutomationById(id: string): AutomationService | undefined {
  return MOCK_AUTOMATIONS.find(a => a.id === id)
}

export function statusColor(status: AutomationStatus): string {
  return {
    PENDING: 'text-yellow-400 bg-yellow-400/10',
    CONFIGURING: 'text-blue-400 bg-blue-400/10',
    ACTIVE: 'text-green-400 bg-green-400/10',
    PAUSED: 'text-orange-400 bg-orange-400/10',
    DELIVERED: 'text-brand-gold bg-brand-gold/10',
    COMPLETED: 'text-brand-gold bg-brand-gold/10',
    FAILED: 'text-red-400 bg-red-400/10',
  }[status] ?? 'text-brand-muted bg-brand-border'
}
