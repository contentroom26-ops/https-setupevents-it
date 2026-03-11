import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight, Plus, X } from "lucide-react";
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
    categories: ["Scouting", "Set Design", "Allestimenti", "Scenografia"],
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

const getAccentStyle = (idx: number) => {
  const variant = idx % 3;
  if (variant === 0) return {
    accent: "bg-primary",
    expandedBg: "bg-secondary/40",
    expandedBorder: "border-primary/20",
    tag: "border-primary/30 text-primary/80",
    link: "text-primary hover:text-primary/80",
    iconBg: "bg-primary/10 text-primary",
    numberColor: "text-primary/20",
  };
  if (variant === 1) return {
    accent: "bg-white",
    expandedBg: "bg-white/[0.06]",
    expandedBorder: "border-white/10",
    tag: "border-white/20 text-white/60",
    link: "text-white hover:text-white/70",
    iconBg: "bg-white/10 text-white",
    numberColor: "text-white/10",
  };
  return {
    accent: "bg-primary",
    expandedBg: "bg-primary/[0.06]",
    expandedBorder: "border-primary/15",
    tag: "border-primary/25 text-primary/70",
    link: "text-primary hover:text-primary/80",
    iconBg: "bg-primary/10 text-primary",
    numberColor: "text-primary/15",
  };
};

/* ── Expandable Service Row ─────────── */
const ServiceRow = ({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: (typeof services)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const s = getAccentStyle(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
      className="relative"
    >
      {/* Collapsed row */}
      <button
        onClick={onToggle}
        className="w-full text-left group"
      >
        <div
          className={`relative flex items-center gap-4 md:gap-6 py-5 md:py-7 border-b transition-colors duration-400 ${
            isOpen ? "border-transparent" : "border-border/30 hover:border-border/60"
          }`}
        >
          {/* Left accent bar */}
          <motion.div
            className={`absolute left-0 top-0 bottom-0 w-[2px] ${s.accent}`}
            initial={false}
            animate={{
              scaleY: isOpen ? 1 : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease }}
            style={{ originY: 0 }}
          />

          {/* Number */}
          <span
            className={`text-xs font-mono transition-colors duration-300 ml-3 md:ml-4 min-w-[24px] ${
              isOpen ? "text-primary" : "text-muted-foreground/40"
            }`}
          >
            {service.number}
          </span>

          {/* Title */}
          <motion.h3
            className={`text-lg md:text-2xl lg:text-3xl font-display font-extrabold tracking-tight transition-colors duration-300 flex-1 ${
              isOpen ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"
            }`}
            animate={{ x: isOpen ? 8 : 0 }}
            transition={{ duration: 0.3, ease }}
          >
            {service.title}
          </motion.h3>

          {/* Toggle icon */}
          <motion.div
            className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors duration-300 mr-2 ${
              isOpen ? s.iconBg : "bg-secondary/30 text-muted-foreground/50 group-hover:text-foreground/70"
            }`}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.35, ease }}
          >
            {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </motion.div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <motion.div
              className={`relative rounded-2xl border mx-1 mb-4 overflow-hidden ${s.expandedBg} ${s.expandedBorder}`}
              initial={{ y: -10, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -10, scale: 0.98 }}
              transition={{ duration: 0.4, delay: 0.05, ease }}
            >
              {/* Background number */}
              <span
                className={`absolute top-4 right-6 text-[7rem] md:text-[9rem] font-display font-extrabold leading-none select-none pointer-events-none ${s.numberColor}`}
              >
                {service.number}
              </span>

              <div className="relative z-10 p-6 md:p-8 lg:p-10">
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-6 max-w-lg">
                  {service.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.categories.map((cat, ci) => (
                    <motion.span
                      key={cat}
                      className={`text-[10px] md:text-xs px-3 md:px-4 py-1 md:py-1.5 rounded-full border font-medium ${s.tag}`}
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: ci * 0.06, duration: 0.35, ease }}
                    >
                      {cat}
                    </motion.span>
                  ))}
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4, ease }}
                >
                  <Link
                    to={service.link}
                    className={`inline-flex items-center gap-2.5 text-sm font-bold transition-all duration-300 group/link ${s.link}`}
                  >
                    <span className="relative">
                      Scopri di più
                      <span
                        className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover/link:w-full ${s.accent}`}
                      />
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Main Section ────────────────────── */
const ServicesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-dark relative grain py-20 lg:py-32 overflow-hidden"
    >
      <FloatingElements variant="lines" count={3} />
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 lg:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono text-muted-foreground">[02]</span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
              Servizi
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground">
            Services
          </h2>
        </motion.div>

        {/* Accordion rows */}
        <div className="max-w-4xl">
          {services.map((service, i) => (
            <ServiceRow
              key={service.number}
              service={service}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
