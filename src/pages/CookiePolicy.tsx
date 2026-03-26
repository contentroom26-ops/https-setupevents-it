import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const CookiePolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container-custom py-20 md:py-32">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Torna alla home
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tighter mb-8">Cookie Policy</h1>
        <div className="prose prose-invert max-w-3xl space-y-6 text-muted-foreground leading-relaxed">

          <p className="text-foreground font-medium">Informativa estesa sull'utilizzo dei cookie ai sensi dell'art. 122 del D.Lgs. 196/2003 e del Regolamento (UE) 2016/679 ("GDPR"), in conformità alle Linee Guida del Garante Privacy del 10 giugno 2021.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">1. Cosa sono i Cookie</h2>
          <p>I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al suo terminale (computer, tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti in occasione di visite successive. I cookie permettono al sito di funzionare correttamente e di raccogliere informazioni sulle preferenze dell'utente.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">2. Tipologie di Cookie Utilizzati</h2>

          <h3 className="text-lg font-display font-semibold text-foreground mt-6">a) Cookie Tecnici (necessari)</h3>
          <p>Indispensabili per il corretto funzionamento del sito. Non richiedono il consenso dell'utente.</p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-foreground">Cookie</th>
                <th className="text-left py-2 pr-4 text-foreground">Finalità</th>
                <th className="text-left py-2 text-foreground">Durata</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">i18nextLng</td>
                <td className="py-2 pr-4">Memorizza la preferenza lingua dell'utente</td>
                <td className="py-2">Persistente</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">cookie_consent</td>
                <td className="py-2 pr-4">Registra le preferenze cookie dell'utente</td>
                <td className="py-2">12 mesi</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-lg font-display font-semibold text-foreground mt-6">b) Cookie Analitici (Google Analytics)</h3>
          <p>Utilizzati per raccogliere informazioni sull'utilizzo del sito in forma aggregata e anonima. Richiedono il consenso dell'utente.</p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-foreground">Cookie</th>
                <th className="text-left py-2 pr-4 text-foreground">Fornitore</th>
                <th className="text-left py-2 pr-4 text-foreground">Finalità</th>
                <th className="text-left py-2 text-foreground">Durata</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">_ga</td>
                <td className="py-2 pr-4">Google LLC</td>
                <td className="py-2 pr-4">Distinguere gli utenti</td>
                <td className="py-2">24 mesi</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">_ga_*</td>
                <td className="py-2 pr-4">Google LLC</td>
                <td className="py-2 pr-4">Mantenere lo stato della sessione</td>
                <td className="py-2">24 mesi</td>
              </tr>
            </tbody>
          </table>
          <p>Privacy Policy Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">policies.google.com/privacy</a></p>

          <h3 className="text-lg font-display font-semibold text-foreground mt-6">c) Cookie di Profilazione / Marketing (Meta Pixel)</h3>
          <p>Utilizzati per tracciare le attività dell'utente e mostrare annunci personalizzati su Facebook e Instagram. Richiedono il consenso esplicito dell'utente.</p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 text-foreground">Cookie</th>
                <th className="text-left py-2 pr-4 text-foreground">Fornitore</th>
                <th className="text-left py-2 pr-4 text-foreground">Finalità</th>
                <th className="text-left py-2 text-foreground">Durata</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">_fbp</td>
                <td className="py-2 pr-4">Meta Platforms Inc.</td>
                <td className="py-2 pr-4">Pubblicità e retargeting</td>
                <td className="py-2">3 mesi</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">_fbc</td>
                <td className="py-2 pr-4">Meta Platforms Inc.</td>
                <td className="py-2 pr-4">Tracciamento click da annunci</td>
                <td className="py-2">3 mesi</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4">fr</td>
                <td className="py-2 pr-4">Meta Platforms Inc.</td>
                <td className="py-2 pr-4">Pubblicità mirata</td>
                <td className="py-2">3 mesi</td>
              </tr>
            </tbody>
          </table>
          <p>Privacy Policy Meta: <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">facebook.com/privacy/policy</a></p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">3. Base Giuridica</h2>
          <p>I cookie tecnici sono installati sulla base del <strong className="text-foreground">legittimo interesse</strong> del Titolare (art. 6(1)(f) GDPR). I cookie analitici e di profilazione sono installati solo previo <strong className="text-foreground">consenso esplicito</strong> dell'utente (art. 6(1)(a) GDPR), espresso tramite il banner cookie al primo accesso.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">4. Trasferimento Dati Extra-UE</h2>
          <p>Google LLC e Meta Platforms Inc. possono trasferire i dati raccolti verso server ubicati negli Stati Uniti. Tali trasferimenti avvengono sulla base della decisione di adeguatezza della Commissione Europea relativa al Data Privacy Framework (DPF) UE-USA, o di clausole contrattuali standard approvate dalla Commissione.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">5. Gestione delle Preferenze Cookie</h2>
          <p>L'utente può gestire le proprie preferenze sui cookie nei seguenti modi:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Banner cookie</strong> — al primo accesso al sito, l'utente può accettare o rifiutare le singole categorie di cookie</li>
            <li><strong className="text-foreground">Impostazioni del browser</strong> — ogni browser permette di bloccare o eliminare i cookie:
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
              </ul>
            </li>
            <li><strong className="text-foreground">Opt-out Google Analytics</strong>: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">tools.google.com/dlpage/gaoptout</a></li>
            <li><strong className="text-foreground">Opt-out Meta</strong>: <a href="https://www.facebook.com/adpreferences/ad_settings" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">facebook.com/adpreferences</a></li>
          </ul>
          <p>La disabilitazione di cookie tecnici potrebbe compromettere alcune funzionalità del sito.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">6. Titolare del Trattamento</h2>
          <p><strong className="text-foreground">SetupEvents di Gabriel Lleshi</strong> — P.IVA 07386270487 — Firenze, Italia<br />
          Email: <a href="mailto:info@setupevents.it" className="text-primary hover:underline">info@setupevents.it</a></p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">7. Aggiornamenti</h2>
          <p>La presente Cookie Policy può essere aggiornata periodicamente. L'utente è invitato a consultare questa pagina regolarmente per prendere visione di eventuali modifiche.</p>

          <p className="text-sm text-muted-foreground/60 mt-12 border-t border-border pt-6">Ultimo aggiornamento: Marzo 2026</p>
        </div>
      </motion.div>
    </div>
    <Footer />
  </div>
);

export default CookiePolicy;
