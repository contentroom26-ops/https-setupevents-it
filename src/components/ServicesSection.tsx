import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingElements from "./FloatingElements";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    number: "01",
    title: "Corporate Events",
    description: "Organizzazione di meeting, convention, cene aziendali e team building per rafforzare il brand.",
    categories: ["Convention", "Team Building", "Cene Aziendali"],
    link: "/corporate-events",
  },
  {
    number: "02",
    title: "Brand Activations",
    description: "Lanci prodotto ed esperienze immersive per massimizzare visibilità e impatto sul mercato.",
    categories: ["Lancio Prodotto", "Pop-up Events", "Experiential"],
    link: "/brand-activation",
  },
  {
    number: "03",
    title: "Hostess & Staff",
    description: "Personale selezionato e formato per accoglienza, promozione e immagine durante gli eventi.",
    categories: ["Hostess", "Steward", "Promoter"],
    link: "/hostess-staff",
  },
  {
    number: "04",
    title: "Public Relations",
    description: "Gestione dei contatti e degli ospiti. Selezione del target e cura delle relazioni.",
    categories: ["Guest Management", "VIP Relations", "Networking"],
    link: "/public-relations",
  },
  {
    number: "05",
    title: "Location & Set-up",
    description: "Scouting delle migliori location e allestimenti scenografici su misura.",
    categories: ["Scouting", "Set Design", "Allestimenti"],
    link: "/event-productions",
  },
  {
    number: "06",
    title: "A/V Production",
    description: "Servizi audio-video professionali con tecnologie all'avanguardia.",
    categories: ["Audio", "Video", "Lighting"],
    link: "/event-productions",
  },
];

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-dark py-20 md:py-32 relative grain overflow-hidden"
    >
      <FloatingElements variant="lines" count={3} />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-6"
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
          className="text-2xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground mb-10 md:mb-14"
          style={{ opacity: headingOpacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          Services
        </motion.h2>

        {/* Horizontal scrollable service pills */}
        <motion.div
          className="flex gap-2.5 md:gap-3 overflow-x-auto pb-4 mb-10 md:mb-12 scrollbar-hide -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          {services.map((service, i) => (
            <motion.button
              key={service.number}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-400 border whitespace-nowrap ${
                activeIndex === i
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              layout
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-[10px] font-mono opacity-50">{service.number}</span>
                {service.title}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content area — horizontal layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="border-t border-border/60 pt-8 md:pt-10"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12 lg:gap-20">
              {/* Description */}
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed md:max-w-sm lg:max-w-md flex-shrink-0">
                {services[activeIndex].description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 flex-shrink-0">
                {services[activeIndex].categories.map((cat, i) => (
                  <motion.span
                    key={cat}
                    className="text-[11px] px-3.5 py-1.5 rounded-full border border-border/60 text-muted-foreground/70 font-medium"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease }}
                  >
                    {cat}
                  </motion.span>
                ))}
              </div>

              {/* CTA */}
              <div className="md:ml-auto flex-shrink-0">
                <Link
                  to={services[activeIndex].link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors duration-300 group"
                >
                  Scopri di più
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
