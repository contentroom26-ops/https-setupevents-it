import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import storyBg from "@/assets/story-bg-2.jpg";
import Tilt3DCard from "./Tilt3DCard";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1.06]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.45, 0.45, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-52 overflow-hidden">
      <motion.div className="absolute inset-0 -top-[5%] -bottom-[5%] z-0 will-change-transform" style={{ y: bgY, scale: bgScale }}>
        <img src={storyBg} alt="" className="w-full h-full object-cover object-center" loading="lazy" decoding="async" />
      </motion.div>
      <motion.div className="absolute inset-0 z-[1] bg-background" style={{ opacity: bgOpacity }} />
      <div className="absolute inset-x-0 top-0 h-24 md:h-40 z-[2] bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 md:h-40 z-[2] bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-0 z-[3] grain pointer-events-none" />

      <motion.div className="container-custom relative z-[4]" style={{ y: textY }}>
        <motion.div
          className="flex items-center gap-3 mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-[10px] md:text-xs font-mono text-muted-foreground/60">[01]</span>
          <div className="h-px w-8 bg-primary/40" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground/60 font-medium">{t("story.label")}</span>
        </motion.div>

        <Tilt3DCard className="max-w-4xl glass-card rounded-3xl" intensity={6} scale={1.01}>
        <motion.div
          className="px-8 md:px-16 py-12 md:py-20"
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
            <span className="text-muted-foreground/50">{t("story.headingSub")}</span>
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
        </Tilt3DCard>
      </motion.div>
    </section>
  );
};

export default StorySection;
