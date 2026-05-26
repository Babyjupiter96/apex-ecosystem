import type { MetadataRoute } from 'next'
import { SERVICES_DATA } from '@/lib/data/services-data'
import { CASE_STUDIES } from '@/lib/data/case-studies'
import { BLOG_POSTS } from '@/lib/data/blog-posts'

const BASE = 'https://studioapex.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/funnels/discovery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICES_DATA.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const workPages: MetadataRoute.Sitemap = CASE_STUDIES.map((cs) => ({
    url: `${BASE}/work/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...workPages, ...blogPages]
}
