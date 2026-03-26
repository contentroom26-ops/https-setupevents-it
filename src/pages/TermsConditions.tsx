import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const TermsConditions = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container-custom py-20 md:py-32">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Torna alla home
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tighter mb-8">Termini e Condizioni</h1>
        <div className="prose prose-invert max-w-3xl space-y-6 text-muted-foreground leading-relaxed">

          <p className="text-foreground font-medium">Condizioni generali di utilizzo del sito web setupevents.it</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">1. Identificazione del Titolare</h2>
          <p><strong className="text-foreground">SetupEvents di Gabriel Lleshi</strong><br />
          Sede: Firenze, Italia<br />
          P.IVA: 07386270487<br />
          Email: <a href="mailto:info@setupevents.it" className="text-primary hover:underline">info@setupevents.it</a><br />
          Telefono: <a href="tel:+393284163053" className="text-primary hover:underline">+39 328 416 3053</a></p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">2. Oggetto</h2>
          <p>I presenti Termini e Condizioni disciplinano l'utilizzo del sito web <strong className="text-foreground">setupevents.it</strong> e la fruizione dei contenuti e servizi in esso presenti, incluso l'invio di richieste tramite il modulo di contatto.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">3. Accettazione dei Termini</h2>
          <p>L'accesso e la navigazione del sito comportano l'accettazione implicita dei presenti Termini e Condizioni. L'utente che non intenda accettarli è invitato a non utilizzare il sito.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">4. Servizi Offerti</h2>
          <p>SetupEvents offre servizi professionali di organizzazione e produzione di eventi, tra cui:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Organizzazione di eventi aziendali e corporate</li>
            <li>Brand activation e lancio prodotti</li>
            <li>Produzione eventi e allestimenti</li>
            <li>Servizio hostess e personale qualificato</li>
            <li>Pubbliche relazioni e media relations</li>
          </ul>
          <p>Il sito ha finalità informativa e promozionale. L'invio di una richiesta tramite il modulo di contatto non costituisce un contratto vincolante, ma una richiesta di informazioni o preventivo.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">5. Modulo di Contatto</h2>
          <p>I dati inseriti nel modulo di contatto (nome, cognome, azienda, email, telefono, tipologia evento, data evento e messaggio) sono trattati in conformità alla <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> del sito. L'utente garantisce la veridicità e correttezza dei dati forniti.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">6. Proprietà Intellettuale</h2>
          <p>Tutti i contenuti presenti sul sito — inclusi testi, immagini, loghi, grafiche, video, layout e codice sorgente — sono di proprietà esclusiva di SetupEvents o dei rispettivi titolari dei diritti. È vietata qualsiasi forma di riproduzione, distribuzione, modifica o utilizzo non autorizzato, anche parziale, senza il previo consenso scritto del Titolare.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">7. Limitazione di Responsabilità</h2>
          <p>SetupEvents si impegna a mantenere il sito aggiornato e funzionante, ma non garantisce:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>La continuità e l'accessibilità ininterrotta del sito</li>
            <li>L'assenza di errori, imprecisioni o omissioni nei contenuti</li>
            <li>L'idoneità del sito per finalità specifiche dell'utente</li>
          </ul>
          <p>Il Titolare non è responsabile per danni diretti o indiretti derivanti dall'utilizzo o dall'impossibilità di utilizzo del sito, inclusi danni da virus o attacchi informatici.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">8. Link a Siti Esterni</h2>
          <p>Il sito può contenere link a siti web di terze parti (es. social media, fornitori). SetupEvents non è responsabile dei contenuti, delle politiche sulla privacy o delle pratiche di tali siti. L'utente accede a siti esterni a proprio rischio.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">9. Cookie e Tracciamento</h2>
          <p>Il sito utilizza cookie tecnici, analitici (Google Analytics) e di profilazione (Meta Pixel). Per tutti i dettagli, si prega di consultare la <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">10. Legge Applicabile e Foro Competente</h2>
          <p>I presenti Termini e Condizioni sono regolati dalla legge italiana. Per qualsiasi controversia derivante dall'utilizzo del sito è competente in via esclusiva il <strong className="text-foreground">Foro di Firenze</strong>, salvo il foro inderogabile del consumatore ai sensi dell'art. 66-bis del Codice del Consumo (D.Lgs. 206/2005).</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">11. Modifiche ai Termini</h2>
          <p>Il Titolare si riserva il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento. Le modifiche saranno efficaci dal momento della loro pubblicazione su questa pagina. L'utente è invitato a consultare periodicamente questa sezione.</p>

          <p className="text-sm text-muted-foreground/60 mt-12 border-t border-border pt-6">Ultimo aggiornamento: Marzo 2026</p>
        </div>
      </motion.div>
    </div>
    <Footer />
  </div>
);

export default TermsConditions;
