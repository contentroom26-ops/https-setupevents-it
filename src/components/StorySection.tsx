import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import storyBg from "@/assets/story-bg-2.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.15, 1.25]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 0.6, 0.6, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      id="storia"
      className="relative py-20 md:py-48 overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 -top-[15%] -bottom-[15%] z-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src={storyBg}
          alt=""
          className="w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[1] bg-background"
        style={{ opacity: bgOpacity }}
      />

      <div className="absolute inset-x-0 top-0 h-20 md:h-32 z-[2] bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 md:h-32 z-[2] bg-gradient-to-t from-background to-transparent" />

      <div className="absolute inset-0 z-[3] grain pointer-events-none" />

      <motion.div
        className="container-custom relative z-[4]"
        style={{ y: textY }}
      >
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-[10px] md:text-xs font-mono text-white/50">[01]</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 font-medium">
            Chi siamo
          </span>
        </motion.div>

        {/* Compact glass card */}
        <motion.div
          className="max-w-2xl rounded-2xl bg-black/30 backdrop-blur-md border border-white/[0.06] px-6 md:px-10 py-8 md:py-12 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
        >
          <motion.h2
            className="text-lg md:text-2xl lg:text-3xl font-display font-extrabold tracking-tight leading-[1.15] text-white mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Non organizziamo eventi.{" "}
            <span className="text-white/50">Creiamo esperienze che lasciano il segno.</span>
          </motion.h2>

          <motion.p
            className="text-white/55 text-[13px] md:text-sm leading-relaxed mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
          >
            Agenzia fiorentina con oltre dieci anni nel settore, specializzata in eventi corporate, brand activation e PR strategiche. Mettiamo a disposizione hostess e steward altamente selezionati, professionali e in linea con l'immagine del cliente. Conoscenza del territorio, relazioni consolidate e un approccio su misura — preciso, discreto, efficace.
          </motion.p>

          <motion.div
            className="flex items-center gap-3 pt-2 border-t border-white/[0.06]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            <div className="w-px h-7 bg-white/15" />
            <div>
              <p className="font-display font-bold text-white text-sm tracking-tight">Gabriel Lleshi</p>
              <p className="text-white/35 text-[10px] uppercase tracking-[0.15em]">Founder & Creative Director</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StorySection;
