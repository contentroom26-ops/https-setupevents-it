import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Target, Gem, Clock } from "lucide-react";

const reasons = [
  {
    icon: Target,
    number: 100,
    suffix: "%",
    title: "Regia completa",
    description: "Gestiamo ogni aspetto del tuo evento, dalla strategia all'esecuzione, per un risultato senza compromessi.",
  },
  {
    icon: Gem,
    number: 20,
    suffix: "+",
    title: "Estetica e precisione",
    description: "Ogni dettaglio è curato con ossessione. Il tuo evento sarà impeccabile in ogni suo elemento.",
  },
  {
    icon: Clock,
    number: 24,
    suffix: "h",
    title: "Timing perfetto",
    description: "Gestione impeccabile del tempo e degli imprevisti. Il tuo evento scorre fluido, senza intoppi.",
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
    <span ref={ref} className="text-5xl md:text-6xl font-serif font-medium text-gradient-gold">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
            Perché scegliere noi
          </span>
          <h2 className="heading-section mb-6">
            Cosa ci rende <span className="italic">diversi</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="text-center p-8"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <reason.icon className="w-8 h-8 text-primary" />
              </div>
              <Counter value={reason.number} suffix={reason.suffix} />
              <h3 className="text-xl font-serif font-medium mt-4 mb-3 text-foreground">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
