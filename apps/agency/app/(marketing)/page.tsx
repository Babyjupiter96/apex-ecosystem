import type { Metadata } from 'next'
import { HeroSection } from '@/components/agency/HeroSection'
import { LogoMarquee } from '@/components/agency/LogoMarquee'
import { FeaturedWork } from '@/components/agency/FeaturedWork'
import { ServicesGrid } from '@/components/agency/ServicesGrid'
import { ResultsStats } from '@/components/agency/ResultsStats'
import { TestimonialsSection } from '@/components/agency/TestimonialsSection'
import { DiscoveryCTA } from '@/components/agency/DiscoveryCTA'

export const metadata: Metadata = {
  title: 'Studio Apex — Creative Agency',
  description:
    'Brand, web, SEO, and marketing automation for premium businesses. Senior strategists obsessed with your growth.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <FeaturedWork />
      <ServicesGrid />
      <ResultsStats />
      <TestimonialsSection />
      <DiscoveryCTA />
    </>
  )
}
