import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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

const ServiceRow = ({
  service,
  index,
  isExpanded,
  onToggle,
}: {
  service: (typeof services)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  return (
    <motion.div
      ref={rowRef}
      style={{ opacity }}
      className="group"
    >
      <motion.div
        onClick={onToggle}
        className="cursor-pointer relative py-8 md:py-10 border-b border-border/50 transition-colors duration-500 hover:border-primary/30"
      >
        {/* Background glow on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-primary/[0.06] to-transparent rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <div className="container-custom relative z-10">
          <div className="flex items-center justify-between gap-6">
            {/* Left: number + title */}
            <div className="flex items-center gap-6 md:gap-10 flex-1 min-w-0">
              <motion.span
                style={{ x }}
                className="text-xs md:text-sm font-mono text-primary/60 w-8 flex-shrink-0"
              >
                {service.number}
              </motion.span>

              <motion.h3
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter text-foreground/80 group-hover:text-foreground transition-colors duration-500 truncate"
                layout
              >
                {service.title}
              </motion.h3>
            </div>

            {/* Right: arrow icon */}
            <motion.div
              className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full border border-border/50 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500"
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </motion.div>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease }}
                className="overflow-hidden"
              >
                <div className="pt-8 md:pt-10 pl-14 md:pl-[5.5rem]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    <motion.p
                      className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.5, ease }}
                    >
                      {service.description}
                    </motion.p>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.categories.map((cat, i) => (
                          <motion.span
                            key={cat}
                            className="text-[11px] md:text-xs px-4 py-1.5 rounded-full border border-border/60 text-muted-foreground/80 font-medium backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                              delay: 0.2 + i * 0.06,
                              duration: 0.4,
                              ease,
                            }}
                          >
                            {cat}
                          </motion.span>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35, duration: 0.5, ease }}
                      >
                        <Link
                          to={service.link}
                          className="inline-flex items-center gap-3 text-sm font-bold text-foreground hover:text-primary transition-colors duration-300 group/link"
                        >
                          <span className="relative">
                            Scopri di più
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover/link:w-full" />
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const headingX = useTransform(scrollYProgress, [0, 0.3], [-100, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-dark relative grain overflow-hidden"
    >
      <FloatingElements variant="dots" count={6} />

      {/* Decorative large background text */}
      <motion.div
        className="absolute top-20 -right-20 text-[20vw] font-display font-extrabold text-foreground/[0.015] leading-none pointer-events-none select-none"
        style={{ y: bgY }}
      >
        SVC
      </motion.div>

      <div className="py-24 md:py-40">
        {/* Header */}
        <div className="container-custom mb-16 md:mb-20">
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
            className="text-3xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-tighter leading-[0.9] text-foreground"
            style={{ x: headingX, opacity: headingOpacity }}
          >
            What we
            <br />
            <span className="text-primary">do best</span>
            <span className="text-muted-foreground/30">.</span>
          </motion.h2>
        </div>

        {/* Service rows */}
        <div className="border-t border-border/50">
          {services.map((service, i) => (
            <ServiceRow
              key={service.number}
              service={service}
              index={i}
              isExpanded={expandedIndex === i}
              onToggle={() =>
                setExpandedIndex(expandedIndex === i ? null : i)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
