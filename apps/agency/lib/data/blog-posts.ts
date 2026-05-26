import type { BlogPost } from '../types'

export const BLOG_POSTS: BlogPost[] = [
  {
    _id: 'bp-001',
    title: 'Why Your Brand Isn't Converting (And It's Not Your Ads)',
    slug: 'brand-not-converting',
    excerpt:
      'Most businesses blame their paid ads for poor conversion rates. The real culprit is almost always the brand. Here's how to diagnose and fix the problem.',
    coverImageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80',
    publishedAt: '2024-05-15',
    author: {
      name: 'Alexandra Voss',
      bio: 'Brand strategist and co-founder of Studio Apex. 12 years building premium brands across PE, consulting, and consumer markets.',
    },
    categories: ['Brand Strategy', 'Conversion'],
    readingTime: 8,
    body: null,
    featured: true,
    seo: {
      title: 'Why Your Brand Isn't Converting — Studio Apex',
      description: 'Most businesses blame their paid ads for poor conversion rates. The real culprit is almost always the brand.',
    },
  },
  {
    _id: 'bp-002',
    title: 'The 2024 SEO Playbook for Professional Services',
    slug: 'seo-playbook-professional-services-2024',
    excerpt:
      'Law firms, consultancies, and agencies have unique SEO challenges. Here's the framework we use to dominate organic search in trust-dependent industries.',
    coverImageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80',
    publishedAt: '2024-04-28',
    author: {
      name: 'Marcus Webb',
      bio: 'SEO director at Studio Apex. Previously led organic growth at two SaaS companies from 0 to Series B.',
    },
    categories: ['SEO', 'Professional Services'],
    readingTime: 12,
    body: null,
    featured: false,
  },
  {
    _id: 'bp-003',
    title: 'How We Build Sales Funnels That Convert at 3x Industry Average',
    slug: 'sales-funnels-3x-conversion',
    excerpt:
      'Our funnel methodology focuses on one thing most agencies ignore: the buyer's emotional journey. Here's the full framework with examples.',
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    publishedAt: '2024-04-10',
    author: {
      name: 'Alexandra Voss',
      bio: 'Brand strategist and co-founder of Studio Apex. 12 years building premium brands across PE, consulting, and consumer markets.',
    },
    categories: ['Sales Funnels', 'CRO'],
    readingTime: 10,
    body: null,
    featured: false,
  },
  {
    _id: 'bp-004',
    title: 'The Website Metrics That Actually Matter (And The Ones That Don't)',
    slug: 'website-metrics-that-matter',
    excerpt:
      'Page views and bounce rate tell you almost nothing useful. Here are the five metrics we obsess over for every client website — and how to track them.',
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    publishedAt: '2024-03-22',
    author: {
      name: 'Jamie Osei',
      bio: 'Lead developer and analytics engineer at Studio Apex. Specializes in performance measurement and conversion infrastructure.',
    },
    categories: ['Analytics', 'Web Design'],
    readingTime: 7,
    body: null,
    featured: false,
  },
  {
    _id: 'bp-005',
    title: 'Marketing Automation in 2024: What Actually Works',
    slug: 'marketing-automation-2024',
    excerpt:
      'AI tools have made it easier to automate — and easier to automate badly. Here's what separates automation that drives revenue from automation that just adds noise.',
    coverImageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    publishedAt: '2024-03-05',
    author: {
      name: 'Marcus Webb',
      bio: 'SEO director at Studio Apex. Previously led organic growth at two SaaS companies from 0 to Series B.',
    },
    categories: ['Marketing Automation', 'AI'],
    readingTime: 9,
    body: null,
    featured: false,
  },
  {
    _id: 'bp-006',
    title: 'Cold Email Is Dead. Long Live Cold Email.',
    slug: 'cold-email-not-dead',
    excerpt:
      'Everyone says cold email is dead. Our clients generated 3,200 qualified meetings from cold email last year. Here's what we're doing differently.',
    coverImageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=80',
    publishedAt: '2024-02-14',
    author: {
      name: 'Alexandra Voss',
      bio: 'Brand strategist and co-founder of Studio Apex. 12 years building premium brands across PE, consulting, and consumer markets.',
    },
    categories: ['Lead Generation', 'Outbound'],
    readingTime: 11,
    body: null,
    featured: false,
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}

export const FEATURED_POST = BLOG_POSTS.find(p => p.featured) ?? BLOG_POSTS[0]
