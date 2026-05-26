import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/client/', '/api/', '/sign-in', '/sign-up'],
      },
    ],
    sitemap: 'https://studioapex.com/sitemap.xml',
  }
}
