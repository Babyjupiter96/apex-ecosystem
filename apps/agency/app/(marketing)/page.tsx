import type { Metadata } from 'next'
import { HeroSection } from '@/components/agency/HeroSection'
import { LogoMarquee } from '@/components/agency/LogoMarquee'
import { ServicesGrid } from '@/components/agency/ServicesGrid'
import { ResultsStats } from '@/components/agency/ResultsStats'
import { TestimonialsSection } from '@/components/agency/TestimonialsSection'
import { DiscoveryCTA } from '@/components/agency/DiscoveryCTA'

export const metadata: Metadata = {
  title: 'Studio Apex — Luxury Creative Agency',
  description:
    'We build brands worth remembering. Brand identity, web design, SEO, and marketing automation for premium businesses.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <ServicesGrid />
      <ResultsStats />
      <TestimonialsSection />
      <DiscoveryCTA />
    </>
  )
}
