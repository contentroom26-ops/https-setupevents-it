import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingElements from "./FloatingElements";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    number: "01",
    title: "Corporate Events",
    description:
      "Organizzazione di meeting, convention, cene aziendali e team building per rafforzare il brand e creare connessioni significative.",
    categories: ["Convention", "Team Building", "Cene Aziendali", "Meeting"],
    link: "/corporate-events",
  },
  {
    number: "02",
    title: "Brand Activations",
    description:
      "Lanci prodotto ed esperienze immersive studiate per massimizzare visibilità, engagement e impatto sul mercato.",
    categories: ["Lancio Prodotto", "Pop-up Events", "Experiential Marketing"],
    link: "/brand-activation",
  },
  {
    number: "03",
    title: "Hostess & Staff",
    description:
      "Personale selezionato e formato per accoglienza, promozione e immagine durante gli eventi. Professionalità garantita.",
    categories: ["Hostess", "Steward", "Promoter", "Staff Tecnico"],
    link: "/hostess-staff",
  },
  {
    number: "04",
    title: "Public Relations",
    description:
      "Gestione dei contatti e degli ospiti accuratamente selezionata. Selezione del target e cura delle relazioni per ogni evento.",
    categories: ["Guest Management", "VIP Relations", "Networking"],
    link: "/public-relations",
  },
  {
    number: "05",
    title: "Location & Set-up",
    description:
      "Scouting delle migliori location e allestimenti scenografici su misura. Dal concept alla realizzazione.",
    categories: ["Scouting", "Set Design", "Allestimenti", "Scenografia"],
    link: "/event-productions",
  },
  {
    number: "06",
    title: "A/V Production",
    description:
      "Servizi audio-video professionali con tecnologie all'avanguardia per produzioni impeccabili e d'impatto.",
    categories: ["Audio", "Video", "Lighting", "Live Streaming"],
    link: "/event-productions",
  },
];

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Evenly distribute services across scroll progress
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const total = services.length;
    // Clamp so last service shows fully before section ends
    const idx = Math.min(Math.floor(v * total), total - 1);
    if (idx >= 0 && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-dark relative grain overflow-hidden"
      style={{ height: `${services.length * 60 + 40}vh` }}
    >
      <FloatingElements variant="lines" count={3} />

      <div className="container-custom sticky top-0 py-24 md:py-40 min-h-screen flex flex-col justify-center">
        {/* Section label */}
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

        {/* Heading */}
        <motion.h2
          className="text-2xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          Services
        </motion.h2>

        <div className="mb-12 md:mb-16" />

        {/* Two-column layout: nav left, detail right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6">
          {/* Left — Service navigation list */}
          <motion.div
            className="lg:col-span-5 xl:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <div className="space-y-0">
              {services.map((service, i) => (
                <motion.div
                  key={service.number}
                  className={`w-full text-left px-4 py-4 md:py-5 border-b border-border/40 flex items-center gap-4 transition-all duration-400 group relative cursor-default ${
                    activeIndex === i
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.25, ease }}
                >
                  {/* Active indicator */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"
                    initial={false}
                    animate={{ opacity: activeIndex === i ? 1 : 0, scaleY: activeIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.35, ease }}
                  />

                  <span
                    className={`text-[10px] font-mono transition-colors duration-300 ${
                      activeIndex === i ? "text-primary" : "text-muted-foreground/40"
                    }`}
                  >
                    {service.number}
                  </span>

                  <span className="text-sm md:text-base font-semibold tracking-tight font-display">
                    {service.title}
                  </span>

                  <ArrowRight
                    className={`w-3.5 h-3.5 ml-auto transition-all duration-300 ${
                      activeIndex === i
                        ? "opacity-100 translate-x-0 text-primary"
                        : "opacity-0 -translate-x-2"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Active service detail */}
          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.45, ease }}
                className="relative bg-secondary/30 border border-border/30 rounded-2xl p-8 md:p-10 lg:p-12 backdrop-blur-sm"
              >
                {/* Big background number */}
                <motion.span
                  className="absolute top-4 right-6 md:top-6 md:right-10 text-[7rem] md:text-[9rem] font-display font-extrabold text-foreground/[0.03] leading-none select-none pointer-events-none"
                  style={{ y: parallaxY }}
                >
                  {services[activeIndex].number}
                </motion.span>

                <div className="relative z-10">
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-display font-extrabold tracking-tight text-foreground mb-4 md:mb-6">
                    {services[activeIndex].title}
                  </h3>

                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                    {services[activeIndex].description}
                  </p>

                  {/* Categories label */}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium block mb-3">
                    Categories
                  </span>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {services[activeIndex].categories.map((cat, i) => (
                      <motion.span
                        key={cat}
                        className="text-xs px-4 py-1.5 rounded-full border border-border/50 text-muted-foreground/70 font-medium"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.35, ease }}
                      >
                        {cat}
                      </motion.span>
                    ))}
                  </div>

                  <Link
                    to={services[activeIndex].link}
                    className="inline-flex items-center gap-2.5 text-sm font-bold text-foreground hover:text-primary transition-colors duration-300 group"
                  >
                    <span className="relative">
                      Scopri di più
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
