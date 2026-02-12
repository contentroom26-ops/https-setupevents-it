import { motion } from "framer-motion";
import FloatingElements from "./FloatingElements";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  return (
    <section id="storia" className="section-dark py-24 md:py-40 relative grain">
      <FloatingElements variant="dots" count={6} />
      <div className="container-custom">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-mono text-muted-foreground">[01]</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Chi siamo
          </span>
        </motion.div>

        {/* Big editorial statement */}
        <motion.h2
          className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tighter leading-[1.05] text-foreground mb-16 md:mb-20 max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
        >
          Non organizziamo semplici eventi.{" "}
          <span className="text-muted-foreground">
            Creiamo esperienze strategiche che trasformano brand, connettono persone e generano risultati concreti.
          </span>
        </motion.h2>

        {/* Founder section */}
        <motion.div
          className="space-y-6 text-muted-foreground leading-relaxed mt-16 md:mt-24 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <p>
            Siamo un'agenzia di organizzazione eventi con una profonda conoscenza del territorio fiorentino. Relazioni consolidate e una rete selezionata di contatti qualificati rendono il nostro approccio distintivo e affidabile.
          </p>

          <div className="flex items-center gap-3 py-2">
            <div className="w-px h-8 bg-border" />
            <div>
              <p className="font-display font-bold text-foreground text-sm tracking-tight">Gabriel Lleshi</p>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.15em]">Founder & Creative Director</p>
            </div>
          </div>

          <p>
            Con oltre dieci anni di esperienza nel settore dell'intrattenimento e delle pubbliche relazioni, progettiamo e realizziamo eventi con metodo, discrezione e precisione. Affianchiamo aziende e privati offrendo un servizio PR strategico e uno staff di hostess e steward altamente selezionati, professionali e perfettamente in linea con l'immagine del cliente.
          </p>
          <p>
            Grazie a una struttura flessibile e a partner di comprovata qualità, siamo in grado di gestire richieste specifiche e fornire servizi personalizzati, costruiti su misura per ogni progetto.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;
