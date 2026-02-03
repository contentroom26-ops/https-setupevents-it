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

const statVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
      delay: i * 0.15,
    },
  }),
};

const featureVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.5 + i * 0.1,
    },
  }),
};

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
      className="text-center group"
      custom={index}
      variants={statVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span 
        className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter block"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        <motion.span>{rounded}</motion.span>
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5 + index * 0.15 }}
        >
          {stat.suffix}
        </motion.span>
      </motion.span>
      <motion.p 
        className="text-muted-foreground mt-2 text-sm uppercase tracking-widest"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 + index * 0.15 }}
      >
        {stat.label}
      </motion.p>
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
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span 
            className="text-sm text-muted-foreground uppercase tracking-widest block mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Risultati
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Perché<br />
            <span className="italic font-normal">sceglierci</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-20">
          {stats.map((stat, index) => (
            <Stat key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>

        <motion.div 
          className="pt-16 border-t border-border"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group cursor-default"
                custom={index}
                variants={featureVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="h-1 w-12 bg-foreground mb-6"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 48 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                />
                <h3 className="text-xl font-bold mb-3 group-hover:text-foreground/80 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
