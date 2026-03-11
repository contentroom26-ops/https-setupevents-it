import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.05, 0.3], [80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="storia"
      className="py-28 md:py-44 relative overflow-hidden"
      style={{ backgroundColor: "hsl(40, 15%, 94%)" }}
    >
      {/* Decorative parallax shapes */}
      <motion.div
        className="absolute top-20 -right-20 w-72 h-72 rounded-full opacity-[0.04]"
        style={{
          y: bgY,
          backgroundColor: "hsl(0, 72%, 51%)",
        }}
      />
      <motion.div
        className="absolute -bottom-10 -left-16 w-48 h-48 rounded-full opacity-[0.03]"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 40]),
          backgroundColor: "hsl(0, 0%, 20%)",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section label with line reveal */}
        <motion.div
          className="flex items-center gap-4 mb-16 md:mb-20"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <motion.div
            className="h-px origin-left"
            style={{
              scaleX: lineScaleX,
              width: 40,
              backgroundColor: "hsl(0, 72%, 51%)",
            }}
          />
          <span
            className="text-xs font-mono"
            style={{ color: "hsl(0, 0%, 50%)" }}
          >
            [01]
          </span>
          <span
            className="text-xs uppercase tracking-[0.3em] font-medium"
            style={{ color: "hsl(0, 0%, 50%)" }}
          >
            Chi siamo
          </span>
        </motion.div>

        {/* Big editorial statement — word-by-word stagger */}
        <motion.h2
          className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tighter leading-[1.05] mb-16 md:mb-20 max-w-5xl"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          {["Non", "organizziamo", "semplici", "eventi."].map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              style={{ color: "hsl(0, 0%, 12%)" }}
              initial={{ opacity: 0, y: 40, rotateX: -40 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
            >
              {word}
            </motion.span>
          ))}{" "}
          <br className="hidden md:block" />
          {[
            "Creiamo",
            "esperienze",
            "strategiche",
            "che",
            "trasformano",
            "brand,",
            "connettono",
            "persone",
            "e",
            "generano",
            "risultati",
            "concreti.",
          ].map((word, i) => (
            <motion.span
              key={`b-${i}`}
              className="inline-block mr-[0.3em]"
              style={{ color: "hsl(0, 0%, 55%)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Animated divider */}
        <motion.div
          className="h-px mb-16 md:mb-20 origin-left"
          style={{ backgroundColor: "hsl(0, 0%, 80%)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        />

        {/* Founder section — paragraphs slide in from different sides */}
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 max-w-5xl">
          {/* Left: Founder info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className="w-12 h-px"
                style={{ backgroundColor: "hsl(0, 72%, 51%)" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
              />
              <div>
                <p
                  className="font-display font-bold text-sm tracking-tight"
                  style={{ color: "hsl(0, 0%, 12%)" }}
                >
                  Gabriel Lleshi
                </p>
                <p
                  className="text-[11px] uppercase tracking-[0.2em]"
                  style={{ color: "hsl(0, 0%, 55%)" }}
                >
                  Founder & Creative Director
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "hsl(0, 0%, 45%)" }}
            >
              Siamo un'agenzia di organizzazione eventi con una profonda
              conoscenza del territorio fiorentino. Relazioni consolidate e una
              rete selezionata di contatti qualificati rendono il nostro
              approccio distintivo e affidabile.
            </p>
          </motion.div>

          {/* Right: Detail paragraphs with staggered reveal */}
          <div className="space-y-6">
            <motion.p
              className="leading-relaxed"
              style={{ color: "hsl(0, 0%, 40%)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              Con oltre dieci anni di esperienza nel settore
              dell'intrattenimento e delle pubbliche relazioni, progettiamo e
              realizziamo eventi con metodo, discrezione e precisione.
              Affianchiamo aziende e privati offrendo un servizio PR strategico
              e uno staff di hostess e steward altamente selezionati,
              professionali e perfettamente in linea con l'immagine del cliente.
            </motion.p>
            <motion.p
              className="leading-relaxed"
              style={{ color: "hsl(0, 0%, 40%)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
            >
              Grazie a una struttura flessibile e a partner di comprovata
              qualità, siamo in grado di gestire richieste specifiche e fornire
              servizi personalizzati, costruiti su misura per ogni progetto.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
