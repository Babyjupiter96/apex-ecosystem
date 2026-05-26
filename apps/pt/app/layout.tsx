import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://apexperformance.io'),
  title: { default: 'Apex Performance — Elite Personal Training', template: '%s | Apex Performance' },
  description:
    'Division I athlete-designed training programs. Science-backed results for high-performers who demand more.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apexperformance.io',
    siteName: 'Apex Performance',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', creator: '@apexperformance' },
}

export const viewport: Viewport = { themeColor: '#111827' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable} suppressHydrationWarning>
        <body>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-cyan focus:text-brand-black focus:rounded-md">
            Skip to main content
          </a>
          <main id="main-content">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
