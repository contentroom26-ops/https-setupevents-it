import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container-custom py-20 md:py-32">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Torna alla home
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tighter mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Titolare del Trattamento:</strong> SetupEvents di Gabriel Lleshi — P.IVA 07386270487 — Firenze, Italia</p>
          <p>Email: <a href="mailto:info@setupevents.it" className="text-primary hover:underline">info@setupevents.it</a></p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">1. Dati Raccolti</h2>
          <p>Raccogliamo i dati personali forniti volontariamente tramite il modulo di contatto: nome, cognome, azienda, email, telefono, tipo evento, data evento e messaggio.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">2. Finalità del Trattamento</h2>
          <p>I dati vengono trattati per rispondere alle richieste di contatto e per fornire preventivi e consulenze relative ai nostri servizi di organizzazione eventi.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">3. Base Giuridica</h2>
          <p>Il trattamento si basa sul consenso esplicito dell'utente (art. 6 comma 1 lett. a GDPR) e sull'esecuzione di misure precontrattuali (art. 6 comma 1 lett. b GDPR).</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">4. Conservazione dei Dati</h2>
          <p>I dati personali vengono conservati per il tempo strettamente necessario a soddisfare le finalità per cui sono stati raccolti, e comunque non oltre 24 mesi dall'ultimo contatto.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">5. Diritti dell'Interessato</h2>
          <p>L'utente può esercitare i diritti previsti dagli artt. 15-22 del GDPR (accesso, rettifica, cancellazione, portabilità, opposizione) scrivendo a info@setupevents.it.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">6. Condivisione dei Dati</h2>
          <p>I dati non vengono ceduti a terzi, salvo obblighi di legge. Utilizziamo servizi di terze parti per l'invio di email (Resend) e hosting (Lovable Cloud), i cui server possono essere ubicati nell'UE o negli USA con garanzie adeguate.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">7. Sicurezza</h2>
          <p>Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati, perdita o distruzione.</p>

          <p className="text-sm text-muted-foreground/60 mt-12">Ultimo aggiornamento: Febbraio 2026</p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default PrivacyPolicy;
