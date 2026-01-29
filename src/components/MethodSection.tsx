import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Brief",
    description: "Ascoltiamo le tue esigenze e obiettivi. Analizziamo ogni dettaglio.",
  },
  {
    number: "02",
    title: "Concept",
    description: "Sviluppiamo idee creative e proposte visive su misura.",
  },
  {
    number: "03",
    title: "Produzione",
    description: "Gestiamo ogni aspetto: location, fornitori, staff, tecnologie.",
  },
  {
    number: "04",
    title: "Evento",
    description: "Coordiniamo ogni elemento per un'esecuzione perfetta.",
  },
];

const MethodSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-foreground text-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number-label block mb-4 text-background/50">[04] — Metodo</span>
          <h2 className="heading-section">
            IL NOSTRO<br />
            <span className="italic font-normal">PROCESSO</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-6xl md:text-7xl font-display font-bold text-background/10">
                  {step.number}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-background/60 leading-relaxed">
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
