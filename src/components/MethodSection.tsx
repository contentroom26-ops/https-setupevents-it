import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: "01",
    title: "Brief",
    description: "Ascoltiamo le tue esigenze e obiettivi. Analizziamo ogni dettaglio per capire la tua visione.",
  },
  {
    number: "02",
    title: "Concept",
    description: "Sviluppiamo idee creative e proposte visive su misura per il tuo brand.",
  },
  {
    number: "03",
    title: "Produzione",
    description: "Gestiamo ogni aspetto: location, fornitori, staff, tecnologie e logistica.",
  },
  {
    number: "04",
    title: "Evento",
    description: "Coordiniamo ogni elemento per un'esecuzione perfetta e senza compromessi.",
  },
];

const MethodSection = () => {
  return (
    <section className="section-dark py-28 md:py-40 relative grain overflow-hidden">
      <div className="container-custom">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] block mb-6">
            Metodo
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter leading-[0.95] text-accent-foreground">
            Il nostro
            <br />
            <span className="italic font-normal text-accent-foreground/50">processo</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <div className="p-8 rounded-2xl border border-accent-foreground/10 bg-accent-foreground/5 hover:border-primary/50 hover:bg-accent-foreground/10 transition-all duration-500 h-full">
                <span className="text-6xl font-display font-extrabold text-primary/20 group-hover:text-primary/40 transition-colors duration-500 block leading-none mb-6">
                  {step.number}
                </span>
                <h3 className="text-2xl font-display font-bold text-accent-foreground mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-accent-foreground/50 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
