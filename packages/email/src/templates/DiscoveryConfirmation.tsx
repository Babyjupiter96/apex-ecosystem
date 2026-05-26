import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Preview, Section, Text,
} from '@react-email/components'
import * as React from 'react'

type DiscoveryConfirmationProps = {
  firstName: string
  calendlyUrl: string
  tenantName: string
  tenantTagline: string
}

export function DiscoveryConfirmationEmail({
  firstName,
  calendlyUrl,
  tenantName,
  tenantTagline,
}: DiscoveryConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your discovery call is confirmed — {tenantName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={eyebrow}>{tenantName}</Heading>

          <Heading style={h1}>
            {firstName ? `Hey ${firstName}, ` : ''}we received your request.
          </Heading>

          <Text style={body}>
            Thank you for reaching out. We review every inquiry personally and
            will be in touch within 24 hours to confirm your discovery call.
          </Text>

          <Text style={body}>
            In the meantime, you can book a time directly on our calendar:
          </Text>

          <Section style={ctaSection}>
            <Button href={calendlyUrl} style={button}>
              Book Your Discovery Call
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={tagline}>{tenantTagline}</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#0A0A0A', fontFamily: 'Inter, sans-serif' }
const container = { margin: '0 auto', padding: '48px 24px', maxWidth: '520px' }
const eyebrow = { color: '#C9A84C', fontSize: '12px', fontWeight: '600', letterSpacing: '0.3em', textTransform: 'uppercase' as const, margin: '0 0 32px' }
const h1 = { color: '#F5F0E8', fontSize: '28px', fontWeight: '300', lineHeight: '1.3', margin: '0 0 24px' }
const body = { color: '#888888', fontSize: '16px', lineHeight: '1.7', margin: '0 0 16px' }
const ctaSection = { margin: '32px 0' }
const button = { backgroundColor: '#C9A84C', color: '#0A0A0A', fontSize: '14px', fontWeight: '600', padding: '14px 28px', borderRadius: '6px', textDecoration: 'none' }
const hr = { borderColor: '#2A2A2A', margin: '32px 0' }
const tagline = { color: '#444', fontSize: '12px', textAlign: 'center' as const }
