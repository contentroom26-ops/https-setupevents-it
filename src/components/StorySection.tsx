import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const ease = [0.22, 1, 0.36, 1] as const;

/** Animated geometric grid background */
const GeometricBackground = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.03, 0.08, 0.08, 0.03]);
  const lineOffset = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const accentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Rotating grid */}
      <motion.div
        className="absolute inset-[-50%] will-change-transform"
        style={{ rotate, opacity: gridOpacity }}
      >
        {/* Vertical lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-white/[0.07]"
            style={{ left: `${(i + 1) * 8}%`, y: lineOffset }}
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-white/[0.05]"
            style={{ top: `${(i + 1) * 8}%` }}
          />
        ))}
      </motion.div>

      {/* Accent shapes */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-40 h-40 md:w-64 md:h-64 border border-primary/10 rounded-full will-change-transform"
        style={{ scale: accentScale }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[8%] w-24 h-24 md:w-40 md:h-40 border border-white/[0.04] rotate-45 will-change-transform"
        style={{ scale: accentScale, rotate: useTransform(scrollYProgress, [0, 1], [45, 90]) }}
      />

      {/* Corner crosshairs */}
      {[
        "top-8 left-8",
        "top-8 right-8",
        "bottom-8 right-8",
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} opacity-[0.12]`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.15 }}
        >
          <div className="w-5 h-px bg-primary" />
          <div className="w-px h-5 bg-primary -mt-[12px] ml-[9px]" />
        </motion.div>
      ))}

      {/* Floating dots */}
      <motion.div
        className="absolute top-[30%] left-[25%] w-1.5 h-1.5 rounded-full bg-primary/20"
        animate={{ y: [0, -10, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[55%] right-[30%] w-1 h-1 rounded-full bg-white/10"
        animate={{ y: [0, 8, 0], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute bottom-[35%] left-[55%] w-1 h-1 rounded-full bg-primary/15"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 60%)",
        }}
      />

      {/* Top/bottom fade */}
      <div className="absolute inset-x-0 top-0 h-32 md:h-48 bg-gradient-to-b from-background to-transparent z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-background to-transparent z-[1]" />

      {/* Grain */}
      <div className="absolute inset-0 grain pointer-events-none z-[2]" />
    </div>
  );
};

const StorySection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section ref={sectionRef} id="storia" className="relative min-h-screen py-24 md:py-52 overflow-hidden bg-background">
      <GeometricBackground scrollYProgress={scrollYProgress} />

      <motion.div className="container-custom relative z-[4]" style={{ y: textY }}>
        <motion.div
          className="flex items-center gap-3 mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-[10px] md:text-xs font-mono text-white/40">[01]</span>
          <div className="h-px w-8 bg-primary/40" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40 font-medium">{t("story.label")}</span>
        </motion.div>

        <motion.div
          className="max-w-4xl glass-card rounded-3xl px-8 md:px-16 py-12 md:py-20"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease }}
        >
          <motion.h2
            className="text-2xl md:text-3xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[1.1] text-white mb-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {t("story.heading")}{" "}
            <span className="text-white/40">{t("story.headingSub")}</span>
          </motion.h2>

          <motion.p
            className="text-white/50 text-base md:text-lg leading-[1.8] mb-10"
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
              <p className="text-white/30 text-xs uppercase tracking-[0.2em]">{t("story.founderRole")}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StorySection;
