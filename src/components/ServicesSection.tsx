import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
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

const getCardStyle = (_idx: number) => {
  return {
    card: "bg-black/30 backdrop-blur-md border border-white/[0.06] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)]",
    number: "text-white/[0.04]",
    title: "text-white",
    desc: "text-white/55",
    label: "text-white/30",
    tag: "border-white/[0.1] text-white/50",
    link: "text-white/70 hover:text-white",
    underline: "bg-white",
  };
};

/* ── Service Card (used on mobile) — with scroll-driven reveal ── */
const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const s = getCardStyle(index);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 95%", "start 60%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -20 : 20, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y, scale, x }}
      className={`relative rounded-xl p-5 ${s.card} will-change-transform`}
    >
      {/* Wipe accent line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-primary origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <span className={`absolute top-1 right-3 text-[2.5rem] font-display font-extrabold leading-none select-none pointer-events-none ${s.number}`}>
        {service.number}
      </span>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono text-primary">{service.number}</span>
          <h3 className={`text-base font-display font-extrabold tracking-tight ${s.title}`}>
            {service.title}
          </h3>
        </div>
        <p className={`text-[11px] leading-relaxed mb-3 ${s.desc}`}>
          {service.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {service.categories.map((cat) => (
            <span key={cat} className={`text-[9px] px-2 py-0.5 rounded-full border font-medium ${s.tag}`}>
              {cat}
            </span>
          ))}
        </div>
        <Link
          to={service.link}
          className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors duration-300 group ${s.link}`}
        >
          <span className="relative">
            Scopri di più
            <span className={`absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${s.underline}`} />
          </span>
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

/* ── Mobile scroll-animated section ─────────────────── */
const MobileServices = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="services" className="section-dark py-14 relative grain overflow-hidden">
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-border/20">
        <motion.div className="h-full bg-primary origin-left" style={{ width: progressWidth }} />
      </div>

      <FloatingElements variant="lines" count={2} />
      <div className="container-custom">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono text-muted-foreground">[02]</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">Servizi</span>
        </div>

        <motion.h2
          className="text-2xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground mb-2"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          Services
        </motion.h2>

        {/* Counter */}
        <motion.p
          className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40 font-mono mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {String(services.length).padStart(2, "0")} servizi — scorri per scoprire
        </motion.p>

        <div className="space-y-4">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Main export ────────────────────────────────────── */
const ServicesSection = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileServices /> : <DesktopServices />;
};

export default ServicesSection;
