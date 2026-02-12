import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingElements from "./FloatingElements";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    number: "01",
    title: "Corporate Events",
    description: "Organizzazione di meeting, convention, cene aziendali e team building per rafforzare il brand e creare connessioni significative.",
    categories: ["Convention", "Team Building", "Cene Aziendali", "Meeting"],
    link: "/corporate-events",
  },
  {
    number: "02",
    title: "Brand Activations",
    description: "Lanci prodotto ed esperienze immersive studiate per massimizzare visibilità, engagement e impatto sul mercato.",
    categories: ["Lancio Prodotto", "Pop-up Events", "Experiential Marketing"],
    link: "/brand-activation",
  },
  {
    number: "03",
    title: "Hostess & Staff",
    description: "Personale selezionato e formato per accoglienza, promozione e immagine durante gli eventi. Professionalità garantita.",
    categories: ["Hostess", "Steward", "Promoter", "Staff Tecnico"],
    link: "/hostess-staff",
  },
  {
    number: "04",
    title: "Public Relations",
    description: "Gestione dei contatti e degli ospiti accuratamente selezionata. Selezione del target e cura delle relazioni per ogni evento.",
    categories: ["Guest Management", "VIP Relations", "Networking"],
    link: "/public-relations",
  },
  {
    number: "05",
    title: "Location & Set-up",
    description: "Scouting delle migliori location e allestimenti scenografici su misura. Dal concept alla realizzazione.",
    categories: ["Scouting", "Set Design", "Allestimenti", "Scenografia"],
    link: "/event-productions",
  },
  {
    number: "06",
    title: "A/V Production",
    description: "Servizi audio-video professionali con tecnologie all'avanguardia per produzioni impeccabili e d'impatto.",
    categories: ["Audio", "Video", "Lighting", "Live Streaming"],
    link: "/event-productions",
  },
];

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="section-dark py-24 md:py-40 relative grain">
      <FloatingElements variant="lines" count={4} />
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
          className="text-2xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          Services
        </motion.h2>

        {/* Service tabs - horizontal navigation */}
        <motion.div
          className="flex flex-wrap gap-3 md:gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          {services.map((service, i) => (
            <motion.button
              key={service.number}
              onClick={() => setActiveIndex(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeIndex === i
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {service.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Active service detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
            className="border-t border-border pt-10 md:pt-14"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              {/* Left: number + title */}
              <div className="lg:col-span-4">
                <span className="text-[8rem] md:text-[10rem] font-display font-extrabold text-foreground/[0.04] leading-none block -mb-8 md:-mb-12">
                  {services[activeIndex].number}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-extrabold tracking-tight text-foreground">
                  {services[activeIndex].title}
                </h3>
              </div>

              {/* Right: description + categories */}
              <div className="lg:col-span-8">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                  {services[activeIndex].description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {services[activeIndex].categories.map((cat, i) => (
                    <motion.span
                      key={cat}
                      className="text-xs px-4 py-2 rounded-full border border-border text-muted-foreground font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, ease }}
                    >
                      {cat}
                    </motion.span>
                  ))}
                </div>

                <Link
                  to={services[activeIndex].link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors group"
                >
                  Scopri di più
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;
