import {
  Body, Button, Container, Head, Heading, Hr, Html,
  Preview, Section, Text,
} from '@react-email/components'
import * as React from 'react'

type LeadNotificationProps = {
  leadName: string
  leadEmail: string
  leadCompany?: string
  source: string
  formData?: Record<string, unknown>
  adminUrl: string
  tenantName: string
}

export function LeadNotificationEmail({
  leadName,
  leadEmail,
  leadCompany,
  source,
  formData,
  adminUrl,
  tenantName,
}: LeadNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New lead: {leadName} from {source}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{tenantName}</Heading>
          <Heading style={h2}>New Lead Captured</Heading>

          <Section style={infoBox}>
            <Text style={label}>Name</Text>
            <Text style={value}>{leadName}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{leadEmail}</Text>

            {leadCompany && (
              <>
                <Text style={label}>Company</Text>
                <Text style={value}>{leadCompany}</Text>
              </>
            )}

            <Text style={label}>Source</Text>
            <Text style={value}>{source}</Text>

            {formData && Object.keys(formData).length > 0 && (
              <>
                <Hr style={hr} />
                <Text style={label}>Form Responses</Text>
                {Object.entries(formData).map(([key, val]) => (
                  <Text key={key} style={value}>
                    <strong>{key}:</strong> {String(val)}
                  </Text>
                ))}
              </>
            )}
          </Section>

          <Button href={adminUrl} style={button}>
            View in CRM
          </Button>

          <Hr style={hr} />
          <Text style={footer}>
            This notification was sent by the {tenantName} platform.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#0A0A0A', fontFamily: 'Inter, sans-serif' }
const container = { margin: '0 auto', padding: '40px 20px', maxWidth: '560px' }
const h1 = { color: '#C9A84C', fontSize: '14px', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase' as const, margin: '0 0 24px' }
const h2 = { color: '#F5F0E8', fontSize: '24px', fontWeight: '400', margin: '0 0 24px' }
const infoBox = { backgroundColor: '#1A1A1A', borderRadius: '8px', padding: '24px', marginBottom: '24px' }
const label = { color: '#888888', fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.1em', margin: '0 0 4px' }
const value = { color: '#F5F0E8', fontSize: '16px', margin: '0 0 16px' }
const hr = { borderColor: '#2A2A2A', margin: '16px 0' }
const button = { backgroundColor: '#C9A84C', color: '#0A0A0A', fontSize: '14px', fontWeight: '600', padding: '12px 24px', borderRadius: '6px', textDecoration: 'none' }
const footer = { color: '#888888', fontSize: '12px', marginTop: '24px' }
