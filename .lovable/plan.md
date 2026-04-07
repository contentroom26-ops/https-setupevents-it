

## Diagnosi completa del sito — Problemi trovati

### Problema CRITICO: Le sezioni intermedie non sono visibili

Il problema principale è che il componente `StackSection` usa `sticky top-0` ma il div contenitore esterno non ha altezza aggiuntiva. Per l'effetto "card stack" (dove le sezioni si sovrappongono scorrendo), il contenitore esterno deve essere **più alto del viewport** (es. `200vh`) per creare spazio di scroll. Senza questo, il contenuto sticky non ha spazio per "scorrere via" e tutte le sezioni collassano una sopra l'altra.

**Risultato attuale**: il sito salta direttamente dall'Hero al Footer — le sezioni Story, Marquee, Services, Portfolio e Contact sono invisibili o compresse.

### Cosa funziona correttamente
- Navbar visibile con logo, language switcher e hamburger menu
- Menu mobile si apre/chiude correttamente con tutti i link
- Footer con "Work with us", servizi, link, contatti e social
- Pagine secondarie (Corporate Events, Privacy Policy, etc.) funzionano
- WhatsApp button presente
- Link nel footer navigano correttamente alle pagine dedicate

### Piano di correzione

#### 1. Fix `StackSection.tsx` — Aggiungere altezza di scroll
Il div esterno `ref={ref}` deve avere un'altezza minima che permetta allo sticky di funzionare:

```text
Attuale:  <div ref={ref} style={{ zIndex }}>
Corretto: <div ref={ref} style={{ zIndex, minHeight: "200vh" }}>
```

Ogni sezione avrà `min-height: 200vh` così il contenuto sticky (che occupa `100vh`) resta pinnato mentre l'utente scorre la restante altezza, creando l'effetto di profondità desiderato.

#### 2. Fix altezza contenuto interno delle sezioni
Le sezioni figlio (StorySection, ServicesSection, etc.) devono avere `min-h-screen` per occupare tutto il viewport quando sono pinnate:
- `StorySection`: aggiungere `min-h-screen` alla section
- `Marquee`: verificare che abbia altezza viewport
- `ServicesSection`: aggiungere `min-h-screen`
- `PortfolioSection`: aggiungere `min-h-screen`
- `ContactSection`: aggiungere `min-h-screen`

#### 3. Fix warning React (non critico ma da risolvere)
Ci sono warning "Function components cannot be given refs" per:
- `ServiceRow` in ServicesSection — va wrappato con `forwardRef`
- `ContactSection` — stesso problema
- `StageInput` — stesso problema

### File da modificare
- `src/components/StackSection.tsx` — aggiungere `min-height: 200vh` al wrapper
- `src/components/StorySection.tsx` — aggiungere `min-h-screen`
- `src/components/Marquee.tsx` — verificare altezza
- `src/components/ServicesSection.tsx` — `min-h-screen` + `forwardRef` su ServiceRow
- `src/components/PortfolioSection.tsx` — `min-h-screen`
- `src/components/ContactSection.tsx` — `min-h-screen` + `forwardRef`

### Risultato atteso
Scorrendo il sito, ogni sezione resta pinnata in cima allo schermo. Quando la sezione successiva arriva, quella corrente si riduce leggermente (scala 0.95) e sfuma (opacità 0.4), creando un effetto di profondità "a pila di carte". L'effetto funziona sia scorrendo in basso che in alto.

