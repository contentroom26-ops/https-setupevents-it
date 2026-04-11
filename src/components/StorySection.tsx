import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const gridRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const gridScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 1.15]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  return (
    <section ref={sectionRef} id="storia" className="relative min-h-screen py-24 md:py-52 overflow-hidden bg-background">
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{ rotate: gridRotate, scale: gridScale }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.4) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Floating orb */}
      <motion.div
        className="absolute z-[1] rounded-full blur-[100px]"
        style={{
          width: "500px",
          height: "500px",
          right: "-10%",
          top: "20%",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)",
          y: orbY,
          scale: orbScale,
        }}
      />

      {/* Secondary orb */}
      <motion.div
        className="absolute z-[1] rounded-full blur-[120px]"
        style={{
          width: "400px",
          height: "400px",
          left: "-5%",
          bottom: "10%",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.08), transparent 70%)",
          y: useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]),
        }}
      />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div
          className="absolute w-px h-[200%] bg-gradient-to-b from-transparent via-primary/10 to-transparent"
          style={{ left: "25%", top: "-50%", transform: "rotate(15deg)" }}
        />
        <div
          className="absolute w-px h-[200%] bg-gradient-to-b from-transparent via-primary/5 to-transparent"
          style={{ left: "75%", top: "-50%", transform: "rotate(-10deg)" }}
        />
      </div>

      {/* Top/bottom fades */}
      <div className="absolute inset-x-0 top-0 h-24 md:h-40 z-[2] bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 md:h-40 z-[2] bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-0 z-[3] grain pointer-events-none" />

      {/* Content */}
      <motion.div className="container-custom relative z-[4]" style={{ y: textY }}>
        <motion.div
          className="flex items-center gap-3 mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-[10px] md:text-xs font-mono text-foreground/30">[01]</span>
          <div className="h-px w-8 bg-primary/40" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/30 font-medium">{t("story.label")}</span>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-start max-w-6xl">
          {/* Main card */}
          <motion.div
            className="glass-card rounded-3xl px-8 md:px-16 py-12 md:py-20"
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
          >
            <motion.h2
              className="text-2xl md:text-3xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[1.1] text-foreground mb-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              {t("story.heading")}{" "}
              <span className="text-foreground/40">{t("story.headingSub")}</span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-base md:text-lg leading-[1.8] mb-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
            >
              {t("story.description")}
            </motion.p>

            <motion.div
              className="flex items-center gap-5 pt-6 border-t border-border/30"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-sm">GL</span>
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-base md:text-lg tracking-tight">Gabriel Lleshi</p>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">{t("story.founderRole")}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Side stats */}
          <motion.div
            className="flex md:flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            {[
              { value: "10+", label: t("story.label") === "La nostra storia" ? "Anni" : "Years" },
              { value: "500+", label: "Eventi" },
              { value: "50+", label: "Clienti" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-card rounded-2xl px-6 py-5 text-center min-w-[100px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease }}
              >
                <p className="text-2xl md:text-3xl font-display font-extrabold text-primary tracking-tight">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default StorySection;
