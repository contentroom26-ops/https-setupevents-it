import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import FloatingElements from "./FloatingElements";

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
      <div className="text-5xl md:text-6xl lg:text-8xl font-display font-extrabold text-accent-foreground tracking-tighter">
        <motion.span>{rounded}</motion.span>
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <p className="text-accent-foreground/40 text-[10px] md:text-xs uppercase tracking-[0.25em] mt-3 font-medium">
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
    <section className="section-light py-24 md:py-40 relative grain" ref={ref}>
      <FloatingElements variant="circles" count={3} />
      <div className="container-custom">
        <motion.div
          className="flex items-center gap-4 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-mono text-accent-foreground/30">[05]</span>
          <span className="text-xs uppercase tracking-[0.3em] text-accent-foreground/50 font-medium">
            Perché sceglierci
          </span>
        </motion.div>

        <motion.h2
          className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tighter leading-[1.05] text-accent-foreground mb-16 md:mb-20 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Non ci limitiamo a fornire un evento.{" "}
          <span className="text-accent-foreground/30">
            Avviciniamo il tuo pubblico.
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 mb-16 md:mb-20">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          className="flex justify-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
        >
          <motion.button
            onClick={scrollToContact}
            className="bg-accent-foreground text-accent px-8 md:px-10 py-3.5 md:py-4 font-bold text-sm rounded-full flex items-center gap-3 group"
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
