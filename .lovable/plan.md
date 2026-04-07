

## Plan: Fix Navbar visibility, remove name fields from contact form, verify email sending

### Problem Analysis

1. **Navbar invisible**: The Navbar has CSS `z-50` (z-index 50), but the Hero `StackSection` wraps content with `zIndex: 60` and uses `sticky top-0`. This means the Hero section sits on top of the Navbar, hiding it completely.

2. **Contact form**: Still has `nome` (first name) and `cognome` (last name) fields that need to be removed.

3. **Email sending**: The form calls `supabase.functions.invoke("send-contact-email")` which sends to `info@setupevents.it` via Resend — this is already correctly configured in the edge function.

### Changes

#### 1. Fix Navbar z-index (`src/components/Navbar.tsx`)
- Change `z-50` to `z-[100]` on the `<motion.nav>` element so it always stays above all `StackSection` layers (max z-index is 60 for Hero).
- Also update the mobile menu overlay from `z-40` to `z-[90]` so it sits just below the navbar but above sections.

#### 2. Remove name fields from contact form (`src/components/ContactSection.tsx`)
- Remove `nome` and `cognome` from the form state.
- Remove the grid row with the two `StageInput` components for nome/cognome.
- Update `handleSubmit` to send empty strings for `nome`/`cognome` (the edge function expects them but they can be empty) or send a placeholder like "N/A".
- Also remove the `StageInput` component definition since it's only used for those fields — actually, it's still used for email, so keep it but just remove the name inputs.

#### 3. Verify email flow
- The edge function at `supabase/functions/send-contact-email/index.ts` already sends to `info@setupevents.it` via Resend. The `RESEND_API_KEY` secret is configured. No changes needed here — just confirm it works after the form changes.

### Technical Details

- Navbar z-index fix: `z-50` → `z-[100]`, mobile menu `z-40` → `z-[90]`
- Form state simplified: remove `nome`, `cognome` keys
- Submit body: pass `nome: "N/A"`, `cognome: "N/A"` since the edge function validates these as required fields — alternatively update the edge function to make them optional
- Better approach: update the edge function to not require nome/cognome, making them optional

### Files to modify
- `src/components/Navbar.tsx` — z-index fix
- `src/components/ContactSection.tsx` — remove name fields
- `supabase/functions/send-contact-email/index.ts` — make nome/cognome optional

