import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FloatingElements from "./FloatingElements";

const ease = [0.22, 1, 0.36, 1] as const;
const stepNumbers = ["01", "02", "03", "04"];

const MethodSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-light py-12 sm:py-16 md:py-24 relative grain overflow-hidden">
      <FloatingElements variant="circles" count={4} />
      <div className="container-custom">
        <motion.div
          className="flex items-center gap-4 mb-10 sm:mb-14 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-mono text-accent-foreground/25">[02]</span>
          <div className="h-px w-8 bg-primary/30" />
          <span className="text-xs uppercase tracking-[0.3em] text-accent-foreground/40 font-medium">{t("method.label")}</span>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tighter leading-[1.05] text-accent-foreground mb-12 sm:mb-16 md:mb-28 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          {t("method.heading")}{" "}
          <span className="text-primary">{t("method.headingSub")}</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-2 md:gap-0">
          {stepNumbers.map((num, i) => (
            <motion.div
              key={num}
              className="relative border-t border-accent-foreground/8 pt-7 sm:pt-8 md:pt-10 pb-7 sm:pb-8 md:pb-10 pr-0 md:pr-8 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
            >
              {/* Animated dot */}
              <div className="absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full bg-primary transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.5)]" />
              
              <span className="text-5xl md:text-6xl font-display font-extrabold text-accent-foreground/[0.06] block mb-5 transition-colors duration-500 group-hover:text-accent-foreground/[0.12]">
                {num}
              </span>
              <h3 className="text-lg md:text-xl font-display font-bold text-accent-foreground mb-3 tracking-tight transition-colors duration-300 group-hover:text-primary">
                {t(`method.steps.${i}.title`)}
              </h3>
              <p className="text-accent-foreground/70 leading-relaxed text-sm transition-colors duration-300 group-hover:text-accent-foreground/90">
                {t(`method.steps.${i}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
