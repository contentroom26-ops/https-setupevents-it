import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 1.2]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.12, 0.12, 0]);

  return (
    <section ref={sectionRef} id="storia" className="relative min-h-screen py-28 md:py-56 overflow-hidden bg-background">

      {/* Concentric rings — architectural feel */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/[0.06] pointer-events-none"
          style={{
            width: `${200 + i * 180}px`,
            height: `${200 + i * 180}px`,
            top: "50%",
            right: "-5%",
            x: "20%",
            y: "-50%",
            rotate: ringRotate,
            scale: ringScale,
            opacity: ringOpacity,
          }}
        />
      ))}

      {/* Large glow — warm cinematic */}
      <motion.div
        className="absolute z-0 pointer-events-none"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: "900px",
          maxHeight: "900px",
          right: "-15%",
          top: "15%",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 65%)",
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]),
        }}
      />

      {/* Subtle horizontal rule accent */}
      <motion.div
        className="absolute left-0 right-0 z-[1] pointer-events-none"
        style={{
          top: "50%",
          height: "1px",
          background: "linear-gradient(90deg, transparent 5%, hsl(var(--primary) / 0.08) 30%, hsl(var(--primary) / 0.15) 50%, hsl(var(--primary) / 0.08) 70%, transparent 95%)",
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
        }}
      />

      {/* Edge fades */}
      <div className="absolute inset-x-0 top-0 h-32 md:h-48 z-[2] bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 z-[2] bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-0 z-[3] grain pointer-events-none" />

      {/* Content */}
      <motion.div className="container-custom relative z-[4]" style={{ y: textY }}>
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-[10px] md:text-xs font-mono text-foreground/25">[01]</span>
          <div className="h-px w-10 bg-primary/30" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/25 font-medium">{t("story.label")}</span>
        </motion.div>

        {/* Two-column editorial layout */}
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-start max-w-6xl">

          {/* Left — Big statement */}
          <div>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-[3.5rem] font-display font-extrabold tracking-tighter leading-[1.05] text-foreground mb-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              {t("story.heading")}
            </motion.h2>

            <motion.p
              className="text-foreground/30 text-3xl md:text-4xl lg:text-[2.8rem] font-display font-extrabold tracking-tighter leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
            >
              {t("story.headingSub")}
            </motion.p>

            {/* Inline stats row */}
            <motion.div
              className="flex gap-8 md:gap-12 mt-14 md:mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              {[
                { value: "10+", label: "Anni" },
                { value: "500+", label: "Eventi" },
                { value: "50+", label: "Clienti" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-display font-extrabold text-primary tracking-tight leading-none">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Description + founder */}
          <motion.div
            className="lg:pt-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
          >
            <div className="w-12 h-px bg-primary/40 mb-8" />

            <p className="text-muted-foreground text-base md:text-lg leading-[1.9] mb-12">
              {t("story.description")}
            </p>

            <div className="flex items-center gap-4 pt-8 border-t border-border/20">
              <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center ring-1 ring-primary/10">
                <span className="text-primary font-display font-bold text-sm">GL</span>
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-base tracking-tight">Gabriel Lleshi</p>
                <p className="text-muted-foreground text-[11px] uppercase tracking-[0.2em]">{t("story.founderRole")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default StorySection;
