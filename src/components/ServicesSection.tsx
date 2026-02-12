import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    number: "01",
    title: "Corporate Events",
    description: "Organizzazione di meeting, convention, cene aziendali e team building per rafforzare il brand e creare connessioni significative.",
    categories: ["Convention", "Team Building", "Cene Aziendali", "Meeting"],
  },
  {
    number: "02",
    title: "Brand Activations",
    description: "Lanci prodotto ed esperienze immersive studiate per massimizzare visibilità, engagement e impatto sul mercato.",
    categories: ["Lancio Prodotto", "Pop-up Events", "Experiential Marketing"],
  },
  {
    number: "03",
    title: "Hostess & Staff",
    description: "Personale selezionato e formato per accoglienza, promozione e immagine durante gli eventi. Professionalità garantita.",
    categories: ["Hostess", "Steward", "Promoter", "Staff Tecnico"],
  },
  {
    number: "04",
    title: "Public Relations",
    description: "Gestione dei contatti e degli ospiti accuratamente selezionata. Selezione del target e cura delle relazioni per ogni evento.",
    categories: ["Guest Management", "VIP Relations", "Networking"],
  },
  {
    number: "05",
    title: "Location & Set-up",
    description: "Scouting delle migliori location e allestimenti scenografici su misura. Dal concept alla realizzazione.",
    categories: ["Scouting", "Set Design", "Allestimenti", "Scenografia"],
  },
  {
    number: "06",
    title: "A/V Production",
    description: "Servizi audio-video professionali con tecnologie all'avanguardia per produzioni impeccabili e d'impatto.",
    categories: ["Audio", "Video", "Lighting", "Live Streaming"],
  },
];

const ServicesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="section-dark py-24 md:py-40 relative grain">
      <div className="container-custom">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-mono text-muted-foreground">[03]</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Servizi
          </span>
        </motion.div>

        <motion.h2
          className="text-2xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          Services
        </motion.h2>

        <motion.p
          className="text-muted-foreground max-w-2xl text-base md:text-lg mb-12 md:mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          Capacità a tutto campo sotto lo stesso tetto. Nessun outsourcing, nessuna scusa.
        </motion.p>

        <div className="border-t border-border">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="border-b border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 md:py-8 group text-left"
              >
                <div className="flex items-center gap-4 md:gap-10">
                  <span className="text-xs font-mono text-muted-foreground w-8">
                    [{service.number}]
                  </span>
                  <span className={`text-lg md:text-2xl lg:text-3xl font-display font-bold tracking-tight transition-colors duration-300 ${
                    openIndex === i ? "text-primary" : "text-foreground group-hover:text-primary"
                  }`}>
                    {service.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted-foreground"
                >
                  {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 md:pb-8 pl-12 md:pl-[4.5rem] max-w-2xl">
                      <p className="text-muted-foreground leading-relaxed mb-5">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.categories.map((cat) => (
                          <span
                            key={cat}
                            className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground font-medium"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
