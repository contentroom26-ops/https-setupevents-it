import { motion } from "framer-motion";
import FloatingElements from "./FloatingElements";

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
    <section className="section-light py-24 md:py-40 relative grain overflow-hidden">
      <FloatingElements variant="circles" count={4} />
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
          className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tighter leading-[1.05] text-accent-foreground mb-16 md:mb-24 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Un processo collaudato che garantisce risultati,{" "}
          <span className="text-accent-foreground/30">senza sorprese.</span>
        </motion.h2>

        {/* Steps — editorial vertical timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-accent-foreground/10 hidden md:block" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-16 border-b border-accent-foreground/8 group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex md:col-span-1 items-start justify-center pt-2">
                  <div className="w-3 h-3 rounded-full bg-primary relative z-10 ring-4 ring-accent" />
                </div>

                {/* Number */}
                <div className="md:col-span-2">
                  <span className="text-5xl md:text-7xl font-display font-extrabold text-accent-foreground/[0.06] leading-none">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-3 flex items-start">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-accent-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-6 flex items-start">
                  <p className="text-accent-foreground/50 leading-relaxed text-sm md:text-base max-w-md">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
