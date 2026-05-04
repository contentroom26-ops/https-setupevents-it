import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ease = [0.22, 1, 0.36, 1] as const;

const FinalCTASection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden" ref={ref}>
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease }}
        >
          <motion.span
            className="text-xs font-mono text-muted-foreground block mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("finalCta.label")}
          </motion.span>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter leading-[0.9] text-foreground mb-8">
            {t("finalCta.heading")}<br />
            <span className="text-gradient-primary">{t("finalCta.headingSub")}</span>
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl mb-14 max-w-xl mx-auto leading-relaxed">
            {t("finalCta.description")}
          </p>

          <motion.button
            onClick={scrollToContact}
            className="bg-foreground text-background px-12 py-5 font-bold tracking-tight uppercase text-sm inline-flex items-center gap-3 group rounded-full shadow-[0_10px_40px_-10px_hsl(var(--foreground)/0.3)] transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--foreground)/0.4)]"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("finalCta.cta")}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
