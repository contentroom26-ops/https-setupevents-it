import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const labelY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="storia"
      className="relative py-28 md:py-44 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-border/30" />

      <div className="container-custom">
        {/* Section number — big, faded, editorial */}
        <motion.div
          className="mb-16 md:mb-24"
          style={{ y: labelY, opacity: labelOpacity }}
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-muted-foreground/50">(01)</span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/50 font-medium">
              Chi siamo
            </span>
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — big statement */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
          >
            <h2
              className="font-display font-extrabold tracking-tighter leading-[0.95] text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}
            >
              Non organizziamo
              <br />
              semplici eventi.
            </h2>
            <p
              className="text-muted-foreground/60 font-display font-extrabold tracking-tighter leading-[0.95] mt-2"
              style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}
            >
              Creiamo esperienze che trasformano brand e connettono persone.
            </p>
          </motion.div>

          {/* Right — body text + founder */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-end"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <div className="space-y-5 text-muted-foreground text-sm leading-[1.8]">
              <p>
                Siamo un'agenzia di organizzazione eventi con una profonda conoscenza del territorio fiorentino. Relazioni consolidate e una rete selezionata di contatti qualificati rendono il nostro approccio distintivo e affidabile.
              </p>
              <p>
                Con oltre dieci anni di esperienza nel settore dell'intrattenimento e delle pubbliche relazioni, progettiamo e realizziamo eventi con metodo, discrezione e precisione.
              </p>
              <p>
                Affianchiamo aziende e privati offrendo un servizio PR strategico e uno staff di hostess e steward altamente selezionati, professionali e perfettamente in linea con l'immagine del cliente.
              </p>
            </div>

            {/* Founder signature */}
            <motion.div
              className="mt-10 pt-8 border-t border-border/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              <p className="font-display font-bold text-foreground text-sm tracking-tight">
                Gabriel Lleshi
              </p>
              <p className="text-muted-foreground/50 text-[10px] uppercase tracking-[0.2em] mt-1">
                Founder & Creative Director
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
