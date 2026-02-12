import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: "01",
    title: "Ascolta e impara",
    description: "Ogni collaborazione inizia con la comprensione. Analizziamo a fondo la tua attività, le sfide e gli obiettivi che vuoi raggiungere.",
  },
  {
    number: "02",
    title: "Prima la strategia",
    description: "Prima di qualsiasi azione, ci allineiamo sulla direzione. Che sia un evento corporate o un lancio prodotto.",
  },
  {
    number: "03",
    title: "Produzione in sprint",
    description: "Lavoriamo in cicli mirati con check regolari. Vedrai i progressi settimanalmente, non mensilmente.",
  },
  {
    number: "04",
    title: "Evento",
    description: "Coordiniamo ogni elemento per un'esecuzione perfetta. Dal primo ospite all'ultimo applauso.",
  },
  {
    number: "05",
    title: "Lancia e impara",
    description: "Restiamo sul posto per l'implementazione e misuriamo ciò che conta. Ogni progetto ci insegna qualcosa.",
  },
];

const MethodSection = () => {
  return (
    <section className="section-light py-24 md:py-40 relative grain overflow-hidden">
      <div className="container-custom">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-mono text-accent-foreground/30">[02]</span>
          <span className="text-xs uppercase tracking-[0.3em] text-accent-foreground/50 font-medium">
            Il nostro processo
          </span>
        </motion.div>

        <motion.h2
          className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tighter leading-[1.05] text-accent-foreground mb-8 md:mb-12 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Un processo collaudato che garantisce risultati,{" "}
          <span className="text-accent-foreground/30">senza sorprese.</span>
        </motion.h2>

        <motion.p
          className="text-accent-foreground/50 max-w-2xl mb-16 md:mb-20 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          Ogni fase è studiata per ridurre al minimo gli attriti e massimizzare l'impatto. Dalla prima chiamata alla consegna finale, saprete esattamente dove stiamo andando.
        </motion.p>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative border-t border-accent-foreground/10 pt-8 pb-8 pr-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <div className="absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full bg-primary" />

              <span className="text-4xl md:text-5xl font-display font-extrabold text-accent-foreground/8 block mb-4">
                {step.number}
              </span>
              <h3 className="text-lg md:text-xl font-display font-bold text-accent-foreground mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-accent-foreground/40 leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
