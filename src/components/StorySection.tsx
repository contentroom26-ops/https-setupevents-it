import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  return (
    <section id="storia" className="section-light py-28 md:py-40 relative grain">
      <div className="container-custom">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-mono text-muted-foreground/50">[01]</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Chi siamo
          </span>
        </motion.div>

        {/* Big editorial statement */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tighter leading-[1.05] text-foreground mb-16 max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
        >
          Non organizziamo semplici eventi.{" "}
          <span className="text-muted-foreground/40">
            Creiamo esperienze strategiche che trasformano brand, connettono persone e generano risultati concreti.
          </span>
        </motion.h2>

        {/* Founder section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-lg">GL</span>
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-sm">Gabriel Lleshi</p>
                <p className="text-muted-foreground text-xs">Founder & Creative Director</p>
              </div>
            </div>

            <blockquote className="text-lg md:text-xl text-foreground/80 leading-relaxed italic border-l-2 border-primary pl-6">
              "Dopo anni nel mondo dell'intrattenimento, ho capito che gli eventi migliori nascono 
              dall'ossessione per i dettagli. Ogni luce, ogni suono, ogni momento deve essere 
              pensato per creare qualcosa di indimenticabile."
            </blockquote>
          </motion.div>

          <motion.div
            className="space-y-6 text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <p>
              Così è nata Setup Events. Niente approcci standardizzati, 
              niente promesse vuote. Solo un team che vive e respira eventi, con una 
              conoscenza profonda del territorio fiorentino e delle dinamiche che 
              rendono un evento davvero memorabile.
            </p>
            <p>
              Operiamo nel settore corporate, nei lanci prodotto e negli eventi esclusivi, 
              curando ogni dettaglio con un approccio strategico, creativo e professionale.
            </p>
            <p className="text-foreground font-medium">
              Questo è lo stile Setup Events. Semplice, ma non facile.
            </p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
        >
          {[
            { value: "100%", label: "Clienti soddisfatti" },
            { value: "20+", label: "Eventi realizzati" },
            { value: "24h", label: "Tempo di risposta" },
            { value: "∞", label: "Cura dei dettagli" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease }}
            >
              <span className="text-3xl md:text-4xl font-display font-extrabold text-foreground tracking-tighter block mb-1">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-[0.15em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;
