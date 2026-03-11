import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingElements from "./FloatingElements";
import { useIsMobile } from "@/hooks/use-mobile";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    number: "01",
    title: "Corporate\nEvents",
    description:
      "Organizzazione di meeting, convention, cene aziendali e team building per rafforzare il brand e creare connessioni significative.",
    categories: ["Convention", "Team Building", "Cene Aziendali", "Meeting"],
    link: "/corporate-events",
  },
  {
    number: "02",
    title: "Brand\nActivations",
    description:
      "Lanci prodotto ed esperienze immersive studiate per massimizzare visibilità, engagement e impatto sul mercato.",
    categories: ["Lancio Prodotto", "Pop-up Events", "Experiential Marketing"],
    link: "/brand-activation",
  },
  {
    number: "03",
    title: "Hostess\n& Staff",
    description:
      "Personale selezionato e formato per accoglienza, promozione e immagine durante gli eventi.",
    categories: ["Hostess", "Steward", "Promoter", "Staff Tecnico"],
    link: "/hostess-staff",
  },
  {
    number: "04",
    title: "Public\nRelations",
    description:
      "Gestione dei contatti e degli ospiti accuratamente selezionata. Selezione del target e cura delle relazioni.",
    categories: ["Guest Management", "VIP Relations", "Networking"],
    link: "/public-relations",
  },
  {
    number: "05",
    title: "Location\n& Set-up",
    description:
      "Scouting delle migliori location e allestimenti scenografici su misura. Dal concept alla realizzazione.",
    categories: ["Scouting", "Set Design", "Allestimenti", "Scenografia"],
    link: "/event-productions",
  },
  {
    number: "06",
    title: "A/V\nProduction",
    description:
      "Servizi audio-video professionali con tecnologie all'avanguardia per produzioni impeccabili.",
    categories: ["Audio", "Video", "Lighting", "Live Streaming"],
    link: "/event-productions",
  },
];

/* ── Full-screen slide ─────────────── */
const ServiceSlide = ({
  service,
  index,
  isActive,
  progress,
}: {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  progress: number; // 0-1 within this slide
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.92,
      }}
      transition={{ duration: 0.6, ease }}
      style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
      {/* Giant background number */}
      <motion.span
        className="absolute font-display font-extrabold text-foreground/[0.03] select-none pointer-events-none leading-none"
        style={{
          fontSize: "clamp(12rem, 30vw, 28rem)",
          right: isEven ? "5%" : "auto",
          left: isEven ? "auto" : "5%",
        }}
        initial={false}
        animate={{
          y: isActive ? 0 : 60,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease }}
      >
        {service.number}
      </motion.span>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div
          className={`flex flex-col ${
            isEven ? "items-start text-left" : "items-end text-right"
          }`}
        >
          {/* Number pill */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : isEven ? -30 : 30,
            }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <span className="text-xs font-mono text-primary">{service.number}</span>
            <span className="w-12 h-px bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
              Service
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="font-display font-extrabold tracking-tighter text-foreground leading-[0.9] mb-8 whitespace-pre-line"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 40,
            }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            {service.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-sm md:text-base leading-relaxed text-muted-foreground mb-8 max-w-md"
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 25,
            }}
            transition={{ duration: 0.5, delay: 0.25, ease }}
          >
            {service.description}
          </motion.p>

          {/* Categories */}
          <motion.div
            className={`flex flex-wrap gap-2 mb-10 ${isEven ? "" : "justify-end"}`}
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
          >
            {service.categories.map((cat, ci) => (
              <motion.span
                key={cat}
                className="text-[10px] md:text-xs px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-border/40 text-muted-foreground/70 font-medium"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.8,
                }}
                transition={{ delay: 0.3 + ci * 0.05, duration: 0.35, ease }}
              >
                {cat}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 15,
            }}
            transition={{ duration: 0.4, delay: 0.35, ease }}
          >
            <Link
              to={service.link}
              className="inline-flex items-center gap-3 text-sm font-bold text-foreground hover:text-primary transition-colors duration-300 group"
            >
              <span className="relative">
                Scopri di più
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Side progress line */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 flex flex-col gap-3 ${
          isEven ? "right-6 lg:right-10" : "left-6 lg:left-10"
        }`}
      >
        {services.map((_, i) => (
          <motion.div
            key={i}
            className="w-[2px] rounded-full bg-border/30 overflow-hidden"
            style={{ height: 28 }}
          >
            <motion.div
              className="w-full bg-primary rounded-full"
              initial={false}
              animate={{
                height: i === index ? "100%" : i < index ? "100%" : "0%",
                opacity: i === index ? 1 : i < index ? 0.3 : 0,
              }}
              transition={{ duration: 0.4, ease }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ── Desktop: scroll-driven fullscreen ── */
const DesktopServices = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const total = services.length;
    const idx = Math.max(0, Math.min(Math.floor(v * total), total - 1));
    setActiveIndex(idx);
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-dark relative grain"
      style={{ height: `${services.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen" style={{ overflow: "clip" }}>
        <FloatingElements variant="lines" count={3} />

        {/* Section label — top left */}
        <div className="absolute top-8 left-6 lg:left-10 z-20 flex items-center gap-4">
          <span className="text-xs font-mono text-muted-foreground">[02]</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Servizi
          </span>
        </div>

        {/* Counter — top right */}
        <div className="absolute top-8 right-6 lg:right-10 z-20 flex items-baseline gap-1 font-mono">
          <span className="text-2xl font-bold text-foreground">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground/50">
            / {String(services.length).padStart(2, "0")}
          </span>
        </div>

        {/* Slides */}
        {services.map((service, i) => (
          <ServiceSlide
            key={service.number}
            service={service}
            index={i}
            isActive={activeIndex === i}
            progress={0}
          />
        ))}
      </div>
    </section>
  );
};

/* ── Mobile: stacked cards ─────────── */
const MobileServices = () => (
  <section id="services" className="section-dark py-16 relative grain overflow-hidden">
    <FloatingElements variant="lines" count={3} />
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-muted-foreground">[02]</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Servizi
          </span>
        </div>
        <h2 className="text-3xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground">
          Services
        </h2>
      </motion.div>

      <div className="space-y-6">
        {services.map((service, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease }}
              className="relative rounded-2xl border border-border/20 bg-secondary/20 backdrop-blur-sm p-6 overflow-hidden"
            >
              <span className="absolute top-2 right-4 text-[4rem] font-display font-extrabold leading-none select-none pointer-events-none text-foreground/[0.03]">
                {service.number}
              </span>
              <div className="relative z-10">
                <span className="text-[10px] font-mono text-primary mb-2 block">{service.number}</span>
                <h3 className="text-xl font-display font-extrabold tracking-tight text-foreground mb-3">
                  {service.title.replace("\n", " ")}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] px-3 py-1 rounded-full border border-border/40 text-muted-foreground/70 font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <span className="relative">
                    Scopri di più
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ── Main export ────────────────────── */
const ServicesSection = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileServices /> : <DesktopServices />;
};

export default ServicesSection;
