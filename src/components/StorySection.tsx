import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["inset(8% 4% 8% 4% round 2rem)", "inset(0% 0% 0% 0% round 0rem)"]
  );
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);
  const counterY = useTransform(scrollYProgress, [0.2, 0.8], [0, -100]);

  return (
    <section ref={sectionRef} id="storia" className="relative">
      <motion.div
        className="py-28 md:py-44 relative overflow-hidden"
        style={{
          backgroundColor: "hsl(40, 12%, 93%)",
          clipPath,
          scale,
        }}
      >
        {/* Large decorative number */}
        <motion.span
          className="absolute right-6 md:right-16 top-12 font-display font-black select-none pointer-events-none leading-none"
          style={{
            y: counterY,
            fontSize: "clamp(8rem, 25vw, 20rem)",
            color: "hsl(0, 0%, 0%)",
            opacity: 0.03,
          }}
        >
          01
        </motion.span>

        <div className="container-custom relative z-10">
          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-20 md:mb-28"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.div
              className="w-8 h-px"
              style={{ backgroundColor: "hsl(0, 72%, 51%)" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            />
            <span className="text-[11px] uppercase tracking-[0.35em] font-medium" style={{ color: "hsl(0, 0%, 50%)" }}>
              Chi siamo
            </span>
          </motion.div>

          {/* Headline with clip reveal */}
          <div className="mb-20 md:mb-28 max-w-5xl overflow-hidden">
            <motion.h2
              className="text-[clamp(1.6rem,5vw,3.8rem)] font-display font-black tracking-[-0.04em] leading-[1.08]"
              style={{ color: "hsl(0, 0%, 10%)" }}
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              Non organizziamo semplici eventi.
            </motion.h2>
            <div className="overflow-hidden mt-2">
              <motion.h2
                className="text-[clamp(1.6rem,5vw,3.8rem)] font-display font-black tracking-[-0.04em] leading-[1.08]"
                style={{ color: "hsl(0, 0%, 65%)" }}
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.12, ease }}
              >
                Creiamo esperienze che lasciano il segno.
              </motion.h2>
            </div>
          </div>

          {/* Body text — single flowing block */}
          <motion.div
            className="max-w-3xl space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-[13px] md:text-[15px] leading-[1.9]" style={{ color: "hsl(0, 0%, 45%)" }}>
              Siamo un'agenzia di organizzazione eventi con una profonda conoscenza del territorio fiorentino. Relazioni consolidate e una rete selezionata di contatti qualificati rendono il nostro approccio distintivo e affidabile.
            </p>
            <p className="text-[13px] md:text-[15px] leading-[1.9]" style={{ color: "hsl(0, 0%, 45%)" }}>
              Con oltre dieci anni di esperienza nel settore dell'intrattenimento e delle pubbliche relazioni, progettiamo e realizziamo eventi con metodo, discrezione e precisione. Affianchiamo aziende e privati offrendo un servizio PR strategico e uno staff di hostess e steward altamente selezionati, professionali e perfettamente in linea con l'immagine del cliente.
            </p>
            <p className="text-[13px] md:text-[15px] leading-[1.9]" style={{ color: "hsl(0, 0%, 45%)" }}>
              Grazie a una struttura flessibile e a partner di comprovata qualità, siamo in grado di gestire richieste specifiche e fornire servizi personalizzati, costruiti su misura per ogni progetto.
            </p>

            {/* Founder signature at the bottom */}
            <motion.div
              className="flex items-center gap-4 pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
            >
              <div className="w-10 h-px" style={{ backgroundColor: "hsl(0, 72%, 51%)" }} />
              <div>
                <p className="font-display font-bold text-sm tracking-tight" style={{ color: "hsl(0, 0%, 12%)" }}>
                  Gabriel Lleshi
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "hsl(0, 0%, 55%)" }}>
                  Founder & Creative Director
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default StorySection;
