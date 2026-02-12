import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: "01",
    title: "Brief",
    description: "Ascoltiamo le tue esigenze e obiettivi. Analizziamo ogni dettaglio per capire la tua visione e definire la strategia.",
  },
  {
    number: "02",
    title: "Concept",
    description: "Sviluppiamo idee creative e proposte visive su misura per il tuo brand. Ogni dettaglio viene pensato per massimizzare l'impatto.",
  },
  {
    number: "03",
    title: "Produzione",
    description: "Gestiamo ogni aspetto operativo: location, fornitori, staff, tecnologie e logistica. Zero sorprese.",
  },
  {
    number: "04",
    title: "Evento",
    description: "Coordiniamo ogni elemento per un'esecuzione perfetta. Dal primo ospite all'ultimo applauso.",
  },
];

const MethodSection = () => {
  return (
    <section className="section-dark py-28 md:py-40 relative grain overflow-hidden">
      <div className="container-custom">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-20"
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
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tighter leading-[1.05] text-accent-foreground mb-20 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Velocità senza sacrifici.{" "}
          <span className="text-accent-foreground/30">
            Il nostro processo semplificato è progettato per trasformare la tua visione in realtà, 
            mantenendo ogni dettaglio che il tuo brand merita.
          </span>
        </motion.h2>

        {/* Steps - horizontal timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative border-t border-accent-foreground/10 pt-8 pb-8 pr-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              {/* Active dot on timeline */}
              <div className="absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full bg-primary" />

              <span className="text-xs font-mono text-accent-foreground/25 block mb-4">
                {step.number}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-accent-foreground mb-3 tracking-tight">
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
