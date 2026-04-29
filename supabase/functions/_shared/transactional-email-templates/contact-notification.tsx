import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Setup Events'

interface ContactNotificationProps {
  email?: string
  message?: string
}

const ContactNotificationEmail = ({ email, message }: ContactNotificationProps) => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Nuovo messaggio dal sito {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nuova richiesta di contatto</Heading>
        <Text style={text}>
          Hai ricevuto un nuovo messaggio dal modulo di contatto del sito {SITE_NAME}.
        </Text>
        <Hr style={hr} />
        <Section style={section}>
          <Text style={label}>Email mittente</Text>
          <Text style={value}>{email || '—'}</Text>
        </Section>
        <Section style={section}>
          <Text style={label}>Messaggio</Text>
          <Text style={messageStyle}>{message || '—'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          Email automatica — sito {SITE_NAME}
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotificationEmail,
  subject: 'Nuova richiesta di contatto — Setup Events',
  to: 'info@setupevents.it',
  displayName: 'Notifica contatto (interna)',
  previewData: {
    email: 'cliente@esempio.it',
    message: 'Buongiorno, vorrei informazioni per un evento aziendale a Firenze.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0A0A0A', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.6', margin: '0 0 16px' }
const section = { margin: '16px 0' }
const label = { fontSize: '12px', color: '#999', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 4px', fontWeight: 'bold' as const }
const value = { fontSize: '15px', color: '#0A0A0A', margin: '0' }
const messageStyle = { fontSize: '14px', color: '#0A0A0A', lineHeight: '1.6', margin: '0', whiteSpace: 'pre-wrap' as const, padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }
const hr = { borderColor: '#e6e6e6', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#999', margin: '20px 0 0' }
