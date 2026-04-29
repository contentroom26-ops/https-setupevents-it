import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Setup Events'

const ContactConfirmationEmail = () => (
  <Html lang="it" dir="ltr">
    <Head />
    <Preview>Grazie per averci contattato — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Grazie per averci contattato!</Heading>
        <Text style={text}>
          Abbiamo ricevuto correttamente il tuo messaggio. Il team di {SITE_NAME}
          ti risponderà al più presto.
        </Text>
        <Text style={text}>
          A presto,<br />
          Il team di {SITE_NAME}
        </Text>
        <Text style={footer}>
          Setup Events — Firenze, Italia<br />
          info@setupevents.it
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'Abbiamo ricevuto il tuo messaggio — Setup Events',
  displayName: 'Conferma contatto (cliente)',
  previewData: {},
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold', color: '#0A0A0A', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#55575d', lineHeight: '1.6', margin: '0 0 20px' }
const footer = { fontSize: '12px', color: '#999', margin: '32px 0 0', borderTop: '1px solid #e6e6e6', paddingTop: '16px' }
