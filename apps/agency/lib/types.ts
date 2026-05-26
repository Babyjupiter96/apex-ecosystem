export interface SanityImage {
  asset: { _ref: string }
  alt?: string
}

export interface Author {
  name: string
  bio: string
  image?: SanityImage
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: SanityImage
  coverImageUrl?: string
  publishedAt: string
  author: Author
  categories: string[]
  readingTime: number
  body: unknown // PortableText blocks
  featured?: boolean
  seo?: { title?: string; description?: string }
}

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudy {
  _id: string
  title: string
  slug: string
  client: string
  industry: string
  services: string[]
  year: number
  coverImageUrl: string
  heroImageUrl?: string
  tagline: string
  challenge: string
  approach: string
  results: string
  metrics: CaseStudyMetric[]
  images?: string[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  featured?: boolean
}

export interface ServiceProcess {
  step: number
  title: string
  description: string
}

export interface ServiceFaq {
  question: string
  answer: string
}

export interface ServiceData {
  slug: string
  title: string
  tagline: string
  description: string
  icon: string
  features: string[]
  deliverables: string[]
  process: ServiceProcess[]
  faqs: ServiceFaq[]
  startingPrice?: string
  timeline?: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  avatarUrl?: string
  rating: number
  service: string
}
