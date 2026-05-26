import { Navbar } from '@/components/agency/Navbar'
import { Footer } from '@/components/agency/Footer'
import { AiChatWidget } from '@/components/agency/AiChatWidget'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <AiChatWidget />
    </>
  )
}
