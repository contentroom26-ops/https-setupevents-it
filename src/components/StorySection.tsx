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
          className="flex items-center gap-3 mb-10 md:mb-20"
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

        {/* Big editorial statement */}
        <motion.h2
          className="text-xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tighter leading-[1.1] md:leading-[1.05] text-white mb-10 md:mb-20 max-w-5xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease }}
        >
          Non organizziamo semplici eventi.{" "}
          <span className="text-white/60">
            Creiamo esperienze strategiche che trasformano brand, connettono persone e generano risultati concreti.
          </span>
        </motion.h2>

        {/* Body text */}
        <motion.div
          className="space-y-5 text-white/70 text-sm md:text-base leading-relaxed mt-10 md:mt-24 max-w-3xl drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <p>
            Siamo un'agenzia di organizzazione eventi con una profonda conoscenza del territorio fiorentino. Relazioni consolidate e una rete selezionata di contatti qualificati rendono il nostro approccio distintivo e affidabile.
          </p>

          <div className="flex items-center gap-3 py-2">
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="font-display font-bold text-white text-sm tracking-tight">Gabriel Lleshi</p>
              <p className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.15em]">Founder & Creative Director</p>
            </div>
          </div>

          <p>
            Con oltre dieci anni di esperienza nel settore dell'intrattenimento e delle pubbliche relazioni, progettiamo e realizziamo eventi con metodo, discrezione e precisione. Affianchiamo aziende e privati offrendo un servizio PR strategico e uno staff di hostess e steward altamente selezionati, professionali e perfettamente in linea con l'immagine del cliente.
          </p>
          <p>
            Grazie a una struttura flessibile e a partner di comprovata qualità, siamo in grado di gestire richieste specifiche e fornire servizi personalizzati, costruiti su misura per ogni progetto.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StorySection;
