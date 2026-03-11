import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import storyBg from "@/assets/story-bg.png";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 0.7, 0.7, 0.85]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.4], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="storia"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imgY, scale: imgScale }}
      >
        <img
          src={storyBg}
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay that shifts with scroll */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          opacity: overlayOpacity,
          background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(0 0% 5% / 0.6) 40%, hsl(0 0% 0%) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="container-custom relative z-10 py-28 md:py-44"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.div
            className="w-8 h-px bg-primary"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          />
          <span className="text-[11px] uppercase tracking-[0.35em] font-medium text-white/50">
            Chi siamo
          </span>
        </motion.div>

        {/* Headline with clip reveal */}
        <div className="mb-16 md:mb-24 max-w-5xl">
          <div className="overflow-hidden">
            <motion.h2
              className="text-[clamp(1.6rem,5vw,3.8rem)] font-display font-black tracking-[-0.04em] leading-[1.08] text-white"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              Non organizziamo semplici eventi.
            </motion.h2>
          </div>
          <div className="overflow-hidden mt-2">
            <motion.h2
              className="text-[clamp(1.6rem,5vw,3.8rem)] font-display font-black tracking-[-0.04em] leading-[1.08] text-white/50"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.12, ease }}
            >
              Creiamo esperienze che lasciano il segno.
            </motion.h2>
          </div>
        </div>

        {/* Body text */}
        <motion.div
          className="max-w-2xl space-y-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <p className="text-[13px] md:text-[15px] leading-[1.9] text-white/60">
            Siamo un'agenzia di organizzazione eventi con una profonda conoscenza del territorio fiorentino. Relazioni consolidate e una rete selezionata di contatti qualificati rendono il nostro approccio distintivo e affidabile.
          </p>
          <p className="text-[13px] md:text-[15px] leading-[1.9] text-white/60">
            Con oltre dieci anni di esperienza nel settore dell'intrattenimento e delle pubbliche relazioni, progettiamo e realizziamo eventi con metodo, discrezione e precisione. Affianchiamo aziende e privati offrendo un servizio PR strategico e uno staff di hostess e steward altamente selezionati, professionali e perfettamente in linea con l'immagine del cliente.
          </p>
          <p className="text-[13px] md:text-[15px] leading-[1.9] text-white/60">
            Grazie a una struttura flessibile e a partner di comprovata qualità, siamo in grado di gestire richieste specifiche e fornire servizi personalizzati, costruiti su misura per ogni progetto.
          </p>

          {/* Founder */}
          <motion.div
            className="flex items-center gap-4 pt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
          >
            <div className="w-10 h-px bg-primary" />
            <div>
              <p className="font-display font-bold text-sm tracking-tight text-white">
                Gabriel Lleshi
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                Founder & Creative Director
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StorySection;
