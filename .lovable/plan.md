

## Piano: Favicon con sfondo nero e logo S più grande

### Problema
Il favicon attuale non mostra lo sfondo nero con il logo S sufficientemente grande. Bisogna rigenerare i file `public/favicon.png` e `public/apple-touch-icon.png`.

### Soluzione
1. **Aggiungere un favicon `.ico` dedicato** — Creare anche un `favicon.ico` classico (più compatibile con tutti i browser) oltre al PNG.
2. **Rigenerare `public/favicon.png`** — Prendere il logo originale (`LOGO_texture-2.png` caricato dall'utente), posizionarlo centrato su sfondo nero `#0a0a0a`, occupando circa l'80% del frame, mantenendo le linee di griglia.
3. **Rigenerare `public/apple-touch-icon.png`** — Stessa operazione per iOS.
4. **Aggiornare `index.html`** — Aggiungere anche un riferimento a `favicon.ico` per massima compatibilità:
   ```html
   <link rel="icon" type="image/x-icon" href="/favicon.ico" />
   <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
   ```

### Note
- Il logo originale caricato dall'utente (`LOGO_texture-2.png`) verrà usato come base, ridimensionato per occupare più spazio nel frame.
- Lo sfondo sarà nero solido (`#0a0a0a`) per coerenza con il tema del sito.

