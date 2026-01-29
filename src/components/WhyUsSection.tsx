import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  {
    number: 100,
    suffix: "%",
    label: "Clienti soddisfatti",
  },
  {
    number: 20,
    suffix: "+",
    label: "Eventi realizzati",
  },
  {
    number: 24,
    suffix: "h",
    label: "Tempo di risposta",
  },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref} className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-white">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-black/5 border-t border-white/5" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number-label text-white/60 block mb-4">[07] — Risultati</span>
          <h2 className="heading-section text-white">
            PERCHÉ<br />
            <span className="italic font-normal">SCEGLIERCI</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Counter value={stat.number} suffix={stat.suffix} />
              <p className="text-white/50 mt-4 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 pt-20 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div>
            <h3 className="font-display font-bold text-xl mb-3 text-white">Regia completa</h3>
            <p className="text-white/60">Gestiamo ogni aspetto del tuo evento per un risultato senza compromessi.</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-xl mb-3 text-white">Estetica e precisione</h3>
            <p className="text-white/60">Ogni dettaglio è curato con ossessione. Impeccabile in ogni elemento.</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-xl mb-3 text-white">Timing perfetto</h3>
            <p className="text-white/60">Gestione impeccabile del tempo e degli imprevisti.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
