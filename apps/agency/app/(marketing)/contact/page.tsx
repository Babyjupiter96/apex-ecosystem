import type { Metadata } from 'next'
import { Mail, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/agency/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Studio Apex. Book a discovery call or send us a message — we respond within one business day.',
}

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-32 bg-brand-black relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-gold/4 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left */}
            <div>
              <p className="text-brand-gold uppercase tracking-[0.35em] text-xs font-semibold mb-8">Get in Touch</p>
              <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-display font-light leading-[0.92] text-brand-offwhite mb-8">
                Let's talk about
                <br />
                <em className="text-brand-gold not-italic">your growth</em>
              </h1>
              <p className="text-brand-muted text-lg leading-relaxed mb-12 max-w-md">
                We respond within one business day. If you'd rather skip the form,
                book a discovery call directly — no pitch, just a conversation.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:hello@studioapex.com" className="text-brand-offwhite hover:text-brand-gold transition-colors">
                      hello@studioapex.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted uppercase tracking-widest mb-1">Response Time</p>
                    <p className="text-brand-offwhite">Within 1 business day</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg border border-brand-border flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted uppercase tracking-widest mb-1">Location</p>
                    <p className="text-brand-offwhite">Remote-first. Available globally.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-brand-graphite border border-brand-border rounded-lg p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
