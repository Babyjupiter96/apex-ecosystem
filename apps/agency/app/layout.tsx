import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { PostHogProvider } from '@/components/shared/PostHogProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://studioapex.com'),
  title: {
    default: 'Studio Apex — Luxury Creative Agency',
    template: '%s | Studio Apex',
  },
  description:
    'Studio Apex is a luxury creative agency specializing in brand identity, web design, SEO, and marketing automation for premium businesses.',
  keywords: [
    'creative agency', 'brand identity', 'web design', 'SEO', 'marketing automation',
    'luxury branding', 'sales funnels', 'lead generation',
  ],
  authors: [{ name: 'Studio Apex', url: 'https://studioapex.com' }],
  creator: 'Studio Apex',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://studioapex.com',
    siteName: 'Studio Apex',
    title: 'Studio Apex — Luxury Creative Agency',
    description:
      'Design, strategy, and technology fused into a single studio obsessed with your growth.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio Apex — Luxury Creative Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Apex — Luxury Creative Agency',
    description: 'Design, strategy, and technology fused into a single studio obsessed with your growth.',
    images: ['/og-image.jpg'],
    creator: '@studioapex',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable} suppressHydrationWarning>
        <head>
          {/* Preconnect to critical third parties */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://cdn.sanity.io" />

          {/* JSON-LD: Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                name: 'Studio Apex',
                url: 'https://studioapex.com',
                logo: 'https://studioapex.com/logo.png',
                description: 'Luxury creative agency specializing in brand identity, web design, and marketing automation.',
                sameAs: [
                  'https://www.instagram.com/studioapex',
                  'https://www.linkedin.com/company/studioapex',
                  'https://twitter.com/studioapex',
                ],
              }),
            }}
          />
        </head>
        <body>
          {/* Accessibility: skip to main content */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-gold focus:text-brand-black focus:rounded-md focus:font-semibold"
          >
            Skip to main content
          </a>

          <PostHogProvider>
            <main id="main-content">{children}</main>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
