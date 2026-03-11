
# Modifiche richieste al sito Setup Events

## 1. Sezione "Dall'intrattenimento all'eccellenza" (StorySection.tsx)

Sostituire l'intero body testuale (le tre paragrafi attuali, righe 75-96) con il nuovo testo fornito:

> "Setup Events e una realta specializzata nella progettazione e organizzazione di eventi su misura a Firenze. Grazie a una solida esperienza nel mondo dell'intrattenimento e a una profonda conoscenza del territorio, creiamo esperienze pensate per valorizzare brand, location e pubblico di riferimento. Operiamo nel settore corporate, nei lanci prodotto e negli eventi esclusivi, curando ogni dettaglio con un approccio strategico, creativo e professionale. Non realizziamo semplici eventi, ma esperienze che lasciano il segno."

La firma sotto rimane "Gabriel Lleshi, Founder" (gia presente, si corregge solo il cognome da "Leshi" a "Lleshi").

## 2. Sezione Servizi (ServicesSection.tsx)

Sostituire le 6 card attuali con i nuovi servizi, ognuno con un **effetto flip 3D CSS** al passaggio del mouse:

| # | Titolo | Descrizione sul retro |
|---|--------|----------------------|
| 01 | Corporate Events | Organizzazione di meeting, convention, cene aziendali e team building per rafforzare il brand. |
| 02 | Launch Product | Lanci prodotto studiati per massimizzare visibilita e impatto sul mercato. |
| 03 | Hostess e Stuart | Personale selezionato e formato per accoglienza, promozione e immagine durante gli eventi. |
| 04 | Public Relations | Gestione delle relazioni pubbliche per amplificare la comunicazione e la reputazione del brand. |
| 05 | Location e Set-up | Scouting delle migliori location e allestimenti scenografici su misura per ogni evento. |
| 06 | AV Services | Servizi audio-video professionali con tecnologie all'avanguardia per produzioni impeccabili. |

**Effetto flip**: ogni card avra un fronte (numero + titolo) e un retro (descrizione). Al passaggio del mouse la card ruota di 180 gradi sull'asse Y mostrando il retro. Implementato con CSS `perspective`, `rotateY` e `backface-visibility: hidden`, integrato con Framer Motion per coerenza con il resto del sito.

## 3. Rimozione "I nostri clienti" (ClientsSection.tsx)

Rimuovere il testo "I nostri clienti" dalla riga 58 della sezione ClientsSection. L'etichetta verra sostituita con qualcosa di neutro come "Brand" oppure rimossa del tutto.

---

## Dettagli tecnici

**File da modificare:**

1. **`src/components/StorySection.tsx`**
   - Righe 75-96: sostituire i tre paragrafi con un unico blocco di testo
   - Riga 107: correggere "Leshi" in "Lleshi"

2. **`src/components/ServicesSection.tsx`**
   - Righe 6-37: aggiornare array `services` con i 6 nuovi servizi e relative descrizioni per il retro
   - Righe 98-153: riscrivere la card con struttura flip (contenitore con `perspective`, due facce `front`/`back` con `backface-visibility: hidden`, rotazione `rotateY(180deg)` al hover)
   - Mantenere le animazioni di ingresso staggered esistenti

3. **`src/components/ClientsSection.tsx`**
   - Riga 58: rimuovere o sostituire "I nostri clienti"
