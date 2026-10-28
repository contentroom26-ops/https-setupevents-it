import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section ref={sectionRef} id="storia" className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
      <motion.div className="container-custom relative z-[4]" style={{ y: textY }}>
        <motion.div
          className="flex items-center gap-3 mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-mono text-white/55">[01]</span>
          <div className="h-px w-8 bg-primary/40" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/60 font-medium">{t("story.label")}</span>
        </motion.div>

        <motion.div
          className="max-w-4xl glass-card rounded-2xl md:rounded-3xl px-5 sm:px-6 md:px-12 py-7 md:py-12"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[1.1] text-white mb-6 md:mb-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {t("story.heading")}{" "}
            <span className="text-primary">{t("story.headingSub")}</span>
          </motion.h2>

          <motion.p
            className="text-white/90 text-sm sm:text-base md:text-lg leading-[1.7] md:leading-[1.8] mb-7 md:mb-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
          >
            {t("story.description")}
          </motion.p>

          <motion.div
            className="flex items-center gap-5 pt-6 border-t border-white/[0.06]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-display font-bold text-sm">GL</span>
            </div>
            <div>
              <p className="font-display font-bold text-white text-base md:text-lg tracking-tight">Gabriel Lleshi</p>
              <p className="text-white/55 text-xs uppercase tracking-[0.2em]">{t("story.founderRole")}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StorySection;
