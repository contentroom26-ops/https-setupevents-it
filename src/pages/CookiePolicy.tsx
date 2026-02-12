import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CookiePolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="container-custom py-20 md:py-32">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Torna alla home
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tighter mb-8">Cookie Policy</h1>
        <div className="prose prose-invert max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Titolare:</strong> SetupEvents di Gabriel Lleshi — P.IVA 07386270487</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">1. Cosa sono i Cookie</h2>
          <p>I cookie sono piccoli file di testo che i siti web salvano sul dispositivo dell'utente per migliorare l'esperienza di navigazione e raccogliere informazioni sull'utilizzo del sito.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">2. Cookie Tecnici</h2>
          <p>Utilizziamo cookie tecnici necessari al funzionamento del sito. Questi cookie non richiedono consenso e non possono essere disabilitati.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">3. Cookie Analitici</h2>
          <p>Potremmo utilizzare cookie analitici per comprendere come i visitatori interagiscono con il sito. I dati sono raccolti in forma anonima e aggregata.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">4. Cookie di Terze Parti</h2>
          <p>Il sito può includere contenuti di terze parti (es. Google Fonts) che potrebbero impostare i propri cookie. Non abbiamo controllo su questi cookie.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">5. Gestione dei Cookie</h2>
          <p>L'utente può gestire le preferenze sui cookie attraverso le impostazioni del proprio browser. La disabilitazione di alcuni cookie potrebbe influire sulla funzionalità del sito.</p>

          <h2 className="text-xl font-display font-bold text-foreground mt-10">6. Aggiornamenti</h2>
          <p>Questa policy può essere aggiornata periodicamente. Invitiamo a consultare questa pagina regolarmente.</p>

          <p className="text-sm text-muted-foreground/60 mt-12">Ultimo aggiornamento: Febbraio 2026</p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default CookiePolicy;
