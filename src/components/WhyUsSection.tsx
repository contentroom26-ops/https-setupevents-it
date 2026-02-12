import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { number: 100, suffix: "%", label: "Clienti soddisfatti" },
  { number: 20, suffix: "+", label: "Eventi realizzati" },
  { number: 24, suffix: "h", label: "Tempo di risposta" },
];

const AnimatedStat = ({
  stat,
  index,
  isInView,
}: {
  stat: (typeof stats)[0];
  index: number;
  isInView: boolean;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, stat.number, { duration: 2.5, ease: "easeOut" });
    }
  }, [isInView, count, stat.number]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease }}
    >
      <div className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-foreground tracking-tighter">
        <motion.span>{rounded}</motion.span>
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <p className="text-muted-foreground text-xs uppercase tracking-[0.25em] mt-3 font-medium">
        {stat.label}
      </p>
    </motion.div>
  );
};

const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-light py-28 md:py-40 relative grain" ref={ref}>
      <div className="container-custom">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-mono text-muted-foreground/50">[05]</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Perché sceglierci
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tighter leading-[1.05] text-foreground mb-20 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Non ci limitiamo a organizzare eventi.{" "}
          <span className="text-muted-foreground/40">
            Avviciniamo il tuo pubblico, creiamo connessioni autentiche e vantaggi competitivi che si accumulano nel tempo.
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-20">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center pt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
        >
          <motion.button
            onClick={scrollToContact}
            className="bg-primary text-primary-foreground px-10 py-4 font-bold text-sm rounded-full flex items-center gap-3 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Inizia il tuo progetto
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
