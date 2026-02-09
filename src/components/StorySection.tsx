import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const StorySection = () => {
  return (
    <section id="storia" className="section-light py-28 md:py-40 relative grain">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] block mb-6">
              Chi siamo
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter leading-[0.95] mb-8 text-foreground">
              Dall'intrattenimento
              <br />
              <span className="italic font-normal text-muted-foreground">all'eccellenza</span>
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                Setup Events è una realtà specializzata nella progettazione e
                organizzazione di eventi su misura a Firenze. Grazie a una solida
                esperienza nel mondo dell'intrattenimento e a una profonda conoscenza
                del territorio, creiamo esperienze pensate per valorizzare brand,
                location e pubblico di riferimento.
              </p>
              <p>
                Operiamo nel settore corporate, nei lanci prodotto e negli eventi
                esclusivi, curando ogni dettaglio con un approccio strategico,
                creativo e professionale. Non realizziamo semplici eventi, ma
                esperienze che lasciano il segno.
              </p>
            </div>

            <motion.div
              className="mt-10 flex items-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
            >
              <div className="w-12 h-[2px] bg-primary" />
              <div>
                <p className="font-display font-bold text-foreground text-sm">Gabriel Lleshi</p>
                <p className="text-muted-foreground text-xs">Founder & Creative Director</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Visual Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            {[
              { value: "100%", label: "Clienti soddisfatti", accent: true },
              { value: "20+", label: "Eventi realizzati", accent: false },
              { value: "24h", label: "Tempo di risposta", accent: false },
              { value: "∞", label: "Cura dei dettagli", accent: true },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`p-8 rounded-2xl border ${
                  stat.accent
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary border-border"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
              >
                <span className={`text-4xl md:text-5xl font-display font-extrabold block mb-2 ${
                  stat.accent ? "" : "text-foreground"
                }`}>
                  {stat.value}
                </span>
                <span className={`text-sm ${
                  stat.accent ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
