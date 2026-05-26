import type { CaseStudy } from '../types'

export const CASE_STUDIES: CaseStudy[] = [
  {
    _id: 'cs-001',
    title: 'Rebranding a $40M Capital Firm',
    slug: 'crestline-capital-rebrand',
    client: 'Crestline Capital',
    industry: 'Private Equity',
    services: ['brand-identity', 'web-design'],
    year: 2024,
    coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85',
    tagline: 'A rebrand that helped close their largest fund round to date.',
    challenge:
      'Crestline had grown from a regional family office to a multi-strategy firm managing $40M in AUM — but their brand still looked like a mid-2000s law firm website. Partners felt it was costing them deals with institutional LPs who were "looking for a certain level of polish."',
    approach:
      'We began with stakeholder interviews across the partnership team and a competitive audit of 40+ PE firms. The insight: most firms look identical — dark navy, serif font, stock photo handshakes. We positioned Crestline around their genuine differentiator: a founder-operator network built over 20 years that gave them deal flow unavailable to institutional capital. The visual identity built on restraint and precision — dark slate, warm gold accents, and editorial typography that communicates depth rather than flash.',
    results:
      'The rebrand launched in January 2024. Within 6 months, Crestline closed their largest-ever fund round at $18M (vs. $11M target), and three of the LPs cited the brand as a credibility signal during due diligence. The new website generates 3x the demo request rate of the previous site.',
    metrics: [
      { value: '64%', label: 'Increase in LP inquiry rate' },
      { value: '$18M', label: 'Fund round closed (vs. $11M target)' },
      { value: '3x', label: 'Website demo request rate' },
      { value: '4 weeks', label: 'Delivery timeline' },
    ],
    testimonial: {
      quote: 'Studio Apex didn't just design a logo — they helped us articulate who we actually are. Three LPs mentioned the brand in their due diligence notes. That's when I knew we'd made the right call.',
      author: 'Marcus Reid',
      role: 'Managing Partner, Crestline Capital',
    },
    featured: true,
  },
  {
    _id: 'cs-002',
    title: 'From 0 to 800 Organic Leads in 90 Days',
    slug: 'meridian-health-seo',
    client: 'Meridian Health Partners',
    industry: 'Healthcare',
    services: ['seo', 'web-design'],
    year: 2024,
    coverImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    tagline: 'A content and technical SEO engine that made paid ads optional.',
    challenge:
      'Meridian was spending $28k/month on Google Ads to generate 200 patient inquiry leads. Their organic search presence was almost non-existent despite a decade in business. The SEO agency they'd used previously had built 600 low-quality backlinks that were now a liability.',
    approach:
      'We started with a full technical audit — the site had 847 crawl errors, 12 redirect chains, and zero structured data. After technical remediation, we designed a topical authority strategy around their five core service areas, producing 3 in-depth clinical content pieces per month. We also built dedicated landing pages for every service × location combination, each with local schema markup.',
    results:
      'Within 90 days, organic traffic increased 340%. The site now ranks on page one for 47 high-intent keywords. Monthly organic leads grew from 0 to 800+, reducing paid ad spend by 70% while increasing total lead volume.',
    metrics: [
      { value: '340%', label: 'Organic traffic increase' },
      { value: '800+', label: 'Monthly organic leads' },
      { value: '70%', label: 'Reduction in paid ad spend' },
      { value: '47', label: 'Page-one keyword rankings' },
    ],
    testimonial: {
      quote: 'We were throwing money at Google every month. Studio Apex built us an organic machine. We've cut our ad budget by 70% and our leads are actually better quality.',
      author: 'Dr. Sarah Chen',
      role: 'CEO, Meridian Health Partners',
    },
    featured: true,
  },
  {
    _id: 'cs-003',
    title: '280% Revenue Increase via Funnel Rebuild',
    slug: 'atlas-ventures-funnel',
    client: 'Atlas Ventures Consulting',
    industry: 'Business Consulting',
    services: ['sales-funnels', 'marketing-automation'],
    year: 2023,
    coverImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    tagline: 'A dead-simple funnel redesign that tripled their revenue in 6 months.',
    challenge:
      'Atlas had a complicated 9-step funnel with a 1.2% opt-in conversion rate and a 0.3% close rate. They had strong demand (running profitable ads) but were leaking money at every stage. Average client value was $15k but CAC was nearly $8k.',
    approach:
      'We stripped everything back to first principles. Customer research interviews revealed the primary objection was trust (they'd been burned by consultants before). We rebuilt the funnel around social proof: a 12-minute VSL with three detailed client transformation stories, followed by a simple opt-in and a 5-email nurture sequence heavy on case studies and specific results.',
    results:
      'The new funnel launched in Q3 2023. Opt-in rate went from 1.2% to 6.8%. Close rate improved from 0.3% to 1.4%. Revenue grew 280% in 6 months, CAC dropped to $2,100, and ROAS on paid traffic went from 1.9x to 7.1x.',
    metrics: [
      { value: '280%', label: 'Revenue growth in 6 months' },
      { value: '7.1x', label: 'Return on ad spend' },
      { value: '6.8%', label: 'Opt-in conversion rate (from 1.2%)' },
      { value: '$2,100', label: 'Customer acquisition cost (from $8k)' },
    ],
    testimonial: {
      quote: 'I was skeptical — we'd tried agencies before. But the process was completely different. They started by talking to our customers, not asking for our brand guidelines. The results speak for themselves.',
      author: 'James Okonkwo',
      role: 'Founder, Atlas Ventures Consulting',
    },
    featured: true,
  },
  {
    _id: 'cs-004',
    title: 'Building a D2C Brand from Scratch',
    slug: 'solaris-studio-brand',
    client: 'Solaris Studio',
    industry: 'Interior Design',
    services: ['brand-identity', 'web-design', 'seo'],
    year: 2024,
    coverImageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
    tagline: 'Zero to 50k Instagram followers and $1.2M in project inquiries in 12 months.',
    challenge:
      'Two talented interior designers leaving a prestigious firm to start their own studio. No brand, no website, no social presence — just extraordinary work and a dream of building something of their own.',
    approach:
      'We developed a brand identity around the concept of "considered luxury" — spaces designed for how people actually live, not how they look in magazines. The visual system used a warm neutral palette with architectural photography that felt editorial. The website was built to showcase portfolio work at maximum impact while generating project inquiry leads.',
    results:
      'Launched February 2024. The Instagram account grew to 50k followers in 10 months purely through organic content. The website generated 140 project inquiry leads in the first year, totaling $1.2M in potential project value. They closed their first $380k residential project within 3 months of launch.',
    metrics: [
      { value: '50k', label: 'Instagram followers (10 months)' },
      { value: '$1.2M', label: 'Project inquiries in year one' },
      { value: '140', label: 'Qualified project leads' },
      { value: '$380k', label: 'First project closed' },
    ],
    testimonial: {
      quote: 'We had the talent. Studio Apex gave us the platform to show the world. The brand they built for us is something we're incredibly proud of — it attracts exactly the kind of clients we want to work with.',
      author: 'Isabelle Fontaine',
      role: 'Co-Founder, Solaris Studio',
    },
    featured: false,
  },
  {
    _id: 'cs-005',
    title: 'Automating a $2M Coaching Business',
    slug: 'luminary-labs-automation',
    client: 'Luminary Labs',
    industry: 'Online Education',
    services: ['marketing-automation', 'sales-funnels'],
    year: 2023,
    coverImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    tagline: 'From founder-led everything to a system that runs while she sleeps.',
    challenge:
      'Priya had built a $2M coaching business entirely on personal bandwidth. Every lead was manually nurtured. Every webinar was manually promoted. She was working 70-hour weeks and couldn't scale without burning out.',
    approach:
      'We audited her existing tools (a mess of Kajabi, Mailchimp, and manual Calendly management) and designed a unified automation architecture on ActiveCampaign + HubSpot. Lead scoring based on email engagement, webinar attendance, and content consumption. Behavioral triggers for every stage of the buyer journey. AI-personalized subject lines and send-time optimization.',
    results:
      'The automation system handles 95% of lead nurturing without human intervention. Priya now works 35-hour weeks. Revenue grew 40% in the first year post-automation — despite her working less — because the system catches leads she would have missed. Email open rates improved from 22% to 41%.',
    metrics: [
      { value: '40%', label: 'Revenue growth post-automation' },
      { value: '95%', label: 'Leads nurtured without human input' },
      { value: '41%', label: 'Email open rate (from 22%)' },
      { value: '35hrs', label: 'Weekly hours (down from 70)' },
    ],
    testimonial: {
      quote: 'I was drowning. Now I have a business that grows while I take vacations. The ROI on automation is unlike anything else I've invested in.',
      author: 'Priya Sharma',
      role: 'Founder, Luminary Labs',
    },
    featured: false,
  },
  {
    _id: 'cs-006',
    title: 'Enterprise Lead Gen for a Legal Tech SaaS',
    slug: 'ironclad-legal-leadgen',
    client: 'Ironclad Legal',
    industry: 'Legal Technology',
    services: ['lead-generation', 'seo'],
    year: 2024,
    coverImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    tagline: 'Filling an enterprise sales pipeline in a notoriously slow-moving industry.',
    challenge:
      'Ironclad had built excellent software for mid-market law firms but their outbound motion was ineffective — generic cold emails to a notoriously guarded audience. Sales cycles were 6+ months and pipeline coverage was thin.',
    approach:
      'We rebuilt their ICP definition with granularity: 50–200 attorney firms with specific practice areas (M&A, real estate, IP) struggling with specific pain points around document review bottlenecks. LinkedIn outreach sequences using insights from legal industry publications, personalized to each firm\'s visible practice area. Cold email from domain-specific sending infrastructure.',
    results:
      'Qualified pipeline grew from $800k to $3.1M in 6 months. 23 enterprise demo meetings booked per month (from 4). First $140k ARR deal closed within the first quarter of the engagement.',
    metrics: [
      { value: '3.1M', label: 'Pipeline value (from $800k)' },
      { value: '23', label: 'Enterprise demos/month (from 4)' },
      { value: '$140k', label: 'ARR deal closed in Q1' },
      { value: '6 mo', label: 'To 4x pipeline coverage' },
    ],
    testimonial: {
      quote: 'Enterprise legal sales is notoriously hard to crack. Studio Apex understood the nuance — the messaging, the targeting, the patience required. Our pipeline has never looked healthier.',
      author: 'Chris Thornton',
      role: 'Head of Sales, Ironclad Legal',
    },
    featured: false,
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(cs => cs.slug === slug)
}

export const FEATURED_CASE_STUDIES = CASE_STUDIES.filter(cs => cs.featured)
