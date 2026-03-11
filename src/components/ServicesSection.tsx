import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingElements from "./FloatingElements";
import { useIsMobile } from "@/hooks/use-mobile";

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
      "Personale selezionato e formato per accoglienza, promozione e immagine durante gli eventi.",
    categories: ["Hostess", "Steward", "Promoter", "Staff Tecnico"],
    link: "/hostess-staff",
  },
  {
    number: "04",
    title: "Public Relations",
    description:
      "Gestione dei contatti e degli ospiti accuratamente selezionata. Selezione del target e cura delle relazioni.",
    categories: ["Guest Management", "VIP Relations", "Networking"],
    link: "/public-relations",
  },
  {
    number: "05",
    title: "Location & Set-up",
    description:
      "Scouting delle migliori location e allestimenti scenografici su misura. Dal concept alla realizzazione.",
    categories: ["Scouting", "Set Design", "Allestimenti"],
    link: "/event-productions",
  },
  {
    number: "06",
    title: "A/V Production",
    description:
      "Servizi audio-video professionali con tecnologie all'avanguardia per produzioni impeccabili.",
    categories: ["Audio", "Video", "Lighting", "Live Streaming"],
    link: "/event-productions",
  },
];

const ServiceCard = ({
  service,
  index,
  expandedIndex,
  onToggle,
}: {
  service: (typeof services)[0];
  index: number;
  expandedIndex: number | null;
  onToggle: (i: number) => void;
}) => {
  const isExpanded = expandedIndex === index;
  const isOtherExpanded = expandedIndex !== null && !isExpanded;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      layout
      className="w-full cursor-pointer"
      onClick={() => onToggle(index)}
    >
      <motion.div
        layout
        className={`relative rounded-2xl border overflow-hidden transition-colors duration-500 ${
          isExpanded
            ? "bg-primary border-primary/50"
            : "bg-secondary/30 border-border/30 hover:border-border/60"
        }`}
        animate={{
          opacity: isOtherExpanded ? 0.4 : 1,
          scale: isOtherExpanded ? 0.98 : 1,
        }}
        transition={{ duration: 0.4, ease }}
      >
        {/* Collapsed: compact row */}
        <motion.div
          layout="position"
          className="relative z-10 flex items-center justify-between px-5 md:px-8 py-5 md:py-6"
        >
          <div className="flex items-center gap-4 md:gap-8">
            <span
              className={`text-xs font-mono tracking-wider transition-colors duration-300 ${
                isExpanded ? "text-white/60" : "text-muted-foreground"
              }`}
            >
              {service.number}
            </span>
            <h3
              className={`font-display font-extrabold tracking-tight text-lg md:text-2xl transition-colors duration-300 ${
                isExpanded ? "text-white" : "text-foreground"
              }`}
            >
              {service.title}
            </h3>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease }}
            className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
              isExpanded
                ? "border-white/30 text-white"
                : "border-border/50 text-muted-foreground"
            }`}
          >
            <span className="text-lg leading-none">+</span>
          </motion.div>
        </motion.div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-8 pb-6 md:pb-8">
                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, ease }}
                  className="h-px bg-white/20 mb-6 origin-left"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15, ease }}
                    className="text-white/80 text-sm md:text-base leading-relaxed"
                  >
                    {service.description}
                  </motion.p>

                  {/* Categories + CTA */}
                  <div className="flex flex-col gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2, ease }}
                      className="flex flex-wrap gap-2"
                    >
                      {service.categories.map((cat, ci) => (
                        <motion.span
                          key={cat}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.25 + ci * 0.05,
                            duration: 0.3,
                            ease,
                          }}
                          className="text-[10px] md:text-xs px-3 py-1.5 rounded-full border border-white/25 text-white/70 font-medium"
                        >
                          {cat}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3, ease }}
                    >
                      <Link
                        to={service.link}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-white/80 transition-colors duration-300 group/link"
                      >
                        <span className="relative">
                          Scopri di più
                          <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover/link:w-full" />
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const isMobile = useIsMobile();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="services"
      className="section-dark relative grain py-20 lg:py-32 overflow-hidden"
    >
      <FloatingElements variant="lines" count={3} />
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 lg:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono text-muted-foreground">
              [02]
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
              Servizi
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground">
            Services
          </h2>
        </motion.div>

        {/* Expandable Cards */}
        <div className="flex flex-col gap-3">
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={i}
              expandedIndex={expandedIndex}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
