import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container-custom py-20 md:py-32">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Torna alla home
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tighter mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-3xl space-y-6 text-muted-foreground leading-relaxed">

          <p className="text-foreground font-medium">Informativa sul trattamento dei dati personali ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 ("GDPR")</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">1. Titolare del Trattamento</h2>
          <p>Il Titolare del trattamento dei dati personali è:<br />
          <strong className="text-foreground">SetupEvents di Gabriel Lleshi</strong><br />
          Sede: Firenze, Italia<br />
          P.IVA: 07386270487<br />
          Email: <a href="mailto:info@setupevents.it" className="text-primary hover:underline">info@setupevents.it</a><br />
          Telefono: <a href="tel:+393284163053" className="text-primary hover:underline">+39 328 416 3053</a></p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">2. Dati Raccolti</h2>
          <p>Il sito raccoglie le seguenti categorie di dati personali:</p>
          <p><strong className="text-foreground">a) Dati forniti volontariamente dall'utente</strong><br />
          Tramite il modulo di contatto: nome, cognome, denominazione azienda, indirizzo email, numero di telefono, tipologia evento, data evento e messaggio libero.</p>
          <p><strong className="text-foreground">b) Dati di navigazione</strong><br />
          Indirizzo IP, tipo di browser, sistema operativo, pagine visitate, durata della visita, sorgente di traffico e altri dati tecnici raccolti automaticamente tramite cookie e strumenti di analisi.</p>
          <p><strong className="text-foreground">c) Dati raccolti tramite strumenti di terze parti</strong><br />
          Google Analytics, Meta Pixel (Facebook/Instagram) — descritti nella sezione dedicata ai cookie e nella <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">3. Finalità e Base Giuridica del Trattamento</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-foreground">Finalità</th>
                <th className="text-left py-2 text-foreground">Base giuridica (GDPR)</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Riscontro a richieste di contatto e preventivi</td>
                <td className="py-2">Art. 6(1)(b) — Esecuzione di misure precontrattuali</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Analisi statistica del traffico web (Google Analytics)</td>
                <td className="py-2">Art. 6(1)(a) — Consenso dell'interessato</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Remarketing e pubblicità mirata (Meta Pixel)</td>
                <td className="py-2">Art. 6(1)(a) — Consenso dell'interessato</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">Adempimento di obblighi di legge</td>
                <td className="py-2">Art. 6(1)(c) — Obbligo legale</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">4. Modalità di Trattamento</h2>
          <p>I dati personali sono trattati con strumenti elettronici e cartacei, con logiche strettamente connesse alle finalità indicate. Il Titolare adotta misure di sicurezza tecniche e organizzative adeguate a prevenire la perdita, l'uso illecito o non corretto e l'accesso non autorizzato ai dati.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">5. Conservazione dei Dati</h2>
          <p>I dati personali raccolti tramite il modulo di contatto sono conservati per un periodo massimo di <strong className="text-foreground">24 mesi</strong> dall'ultimo contatto. I dati raccolti per finalità di analisi e marketing vengono conservati secondo le policy dei rispettivi fornitori terzi (Google, Meta) e comunque non oltre <strong className="text-foreground">26 mesi</strong>.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">6. Comunicazione e Trasferimento dei Dati</h2>
          <p>I dati personali possono essere comunicati a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Resend</strong> — servizio di invio email transazionali (server UE/USA)</li>
            <li><strong className="text-foreground">Google LLC</strong> — Google Analytics (server UE/USA, in regime di adeguatezza o clausole contrattuali standard)</li>
            <li><strong className="text-foreground">Meta Platforms Inc.</strong> — Meta Pixel per Facebook e Instagram (server UE/USA, con garanzie adeguate ai sensi dell'art. 46 GDPR)</li>
            <li><strong className="text-foreground">Lovable Cloud</strong> — hosting e infrastruttura backend</li>
          </ul>
          <p>I dati non vengono ceduti a terzi per finalità di marketing diretto senza il consenso esplicito dell'utente.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">7. Diritti dell'Interessato</h2>
          <p>Ai sensi degli artt. 15-22 del GDPR, l'utente ha diritto di:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Accedere ai propri dati personali</li>
            <li>Ottenerne la rettifica o la cancellazione</li>
            <li>Limitare il trattamento</li>
            <li>Opporsi al trattamento</li>
            <li>Richiedere la portabilità dei dati</li>
            <li>Revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basato sul consenso prestato prima della revoca</li>
          </ul>
          <p>Per esercitare i propri diritti, l'utente può scrivere a: <a href="mailto:info@setupevents.it" className="text-primary hover:underline">info@setupevents.it</a></p>
          <p>L'utente ha inoltre il diritto di presentare reclamo all'<strong className="text-foreground">Autorità Garante per la protezione dei dati personali</strong> (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.garanteprivacy.it</a>).</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">8. Cookie</h2>
          <p>Per informazioni dettagliate sui cookie utilizzati dal sito, si prega di consultare la <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">9. Modifiche alla Privacy Policy</h2>
          <p>Il Titolare si riserva il diritto di modificare la presente informativa in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.</p>

          <p className="text-sm text-muted-foreground/60 mt-12 border-t border-border pt-6">Ultimo aggiornamento: Marzo 2026</p>
        </div>
      </motion.div>
    </div>
    <Footer />
  </div>
);

export default PrivacyPolicy;
