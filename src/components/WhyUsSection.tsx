import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { number: 100, suffix: "%", label: "Clienti soddisfatti" },
  { number: 20, suffix: "+", label: "Eventi realizzati" },
  { number: 24, suffix: "h", label: "Tempo di risposta" },
];

const features = [
  {
    title: "Regia completa",
    description: "Gestiamo ogni aspetto del tuo evento per un risultato senza compromessi.",
  },
  {
    title: "Estetica e precisione",
    description: "Ogni dettaglio è curato con ossessione. Impeccabile in ogni elemento.",
  },
  {
    title: "Timing perfetto",
    description: "Gestione impeccabile del tempo e degli imprevisti.",
  },
];

interface StatProps {
  stat: typeof stats[0];
  index: number;
  isInView: boolean;
}

const Stat = ({ stat, index, isInView }: StatProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, stat.number, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, stat.number]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <span className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
        <motion.span>{rounded}</motion.span>
        {stat.suffix}
      </span>
      <p className="text-muted-foreground mt-2 text-sm uppercase tracking-widest">
        {stat.label}
      </p>
    </motion.div>
  );
};

const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm text-muted-foreground uppercase tracking-widest block mb-4">
            Risultati
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Perché<br />
            <span className="italic font-normal">sceglierci</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-20">
          {stats.map((stat, index) => (
            <Stat key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>

        <div className="pt-16 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
