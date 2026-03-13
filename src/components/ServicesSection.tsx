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

/* ── Desktop scroll-driven section ──────────────────── */
const DesktopServices = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const total = services.length;
    const raw = v * total;
    const idx = Math.max(0, Math.min(Math.floor(raw), total - 1));
    setActiveIndex(idx);
  });

  const s = getCardStyle(activeIndex);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-dark relative grain"
      style={{ height: `${services.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col" style={{ overflow: 'clip' }}>
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-border/20">
          <motion.div className="h-full bg-primary origin-left" style={{ width: progressWidth }} />
        </div>

        <FloatingElements variant="lines" count={3} />

        <div className="flex-1 flex items-center">
          <div className="container-custom w-full py-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono text-muted-foreground">[02]</span>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">Servizi</span>
            </div>

            <div className="flex items-end justify-between mb-12 lg:mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground">
                Services
              </h2>
              <motion.div
                className="flex items-center gap-3"
                key={activeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-3xl font-display font-extrabold text-primary tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-muted-foreground/40 text-sm font-mono">/</span>
                <span className="text-muted-foreground/40 text-sm font-mono">
                  {String(services.length).padStart(2, "0")}
                </span>
              </motion.div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-5 xl:col-span-4">
                <div className="space-y-0">
                  {services.map((service, i) => (
                    <div
                      key={service.number}
                      className={`w-full text-left px-4 py-5 border-b border-border/40 flex items-center gap-4 transition-all duration-400 relative cursor-default ${
                        activeIndex === i ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"
                        initial={false}
                        animate={{ opacity: activeIndex === i ? 1 : 0, scaleY: activeIndex === i ? 1 : 0 }}
                        transition={{ duration: 0.35, ease }}
                      />
                      <span className={`text-[10px] font-mono transition-colors duration-300 ${activeIndex === i ? "text-primary" : "text-muted-foreground/40"}`}>
                        {service.number}
                      </span>
                      <span className="text-base font-semibold tracking-tight font-display">{service.title}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ml-auto transition-all duration-300 ${activeIndex === i ? "opacity-100 translate-x-0 text-primary" : "opacity-0 -translate-x-2"}`} />
                    </div>
                  ))}
                </div>

                <motion.div
                  className="mt-6 flex items-center gap-2 text-muted-foreground/30"
                  animate={{ opacity: activeIndex < services.length - 1 ? 1 : 0 }}
                >
                  <motion.div className="w-4 h-7 rounded-full border border-muted-foreground/20 flex items-start justify-center p-1">
                    <motion.div
                      className="w-1 h-1.5 rounded-full bg-primary"
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scorri</span>
                </motion.div>
              </div>

              <div className="col-span-7 xl:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    className={`relative rounded-2xl p-10 lg:p-12 overflow-hidden ${s.card}`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-[hsl(var(--background))] z-20 origin-left"
                      initial={{ scaleX: 1 }}
                      animate={{ scaleX: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                      style={{ transformOrigin: "right" }}
                    />
                    <motion.span
                      className={`absolute top-6 right-10 text-[9rem] font-display font-extrabold leading-none select-none pointer-events-none ${s.number}`}
                      style={{ y: parallaxY }}
                    >
                      {services[activeIndex].number}
                    </motion.span>
                    <motion.div
                      className="relative z-10"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className={`text-3xl lg:text-4xl font-display font-extrabold tracking-tight mb-6 ${s.title}`}>
                        {services[activeIndex].title}
                      </h3>
                      <p className={`text-base leading-relaxed mb-8 max-w-lg ${s.desc}`}>
                        {services[activeIndex].description}
                      </p>
                      <span className={`text-[10px] uppercase tracking-[0.2em] font-medium block mb-3 ${s.label}`}>Categories</span>
                      <div className="flex flex-wrap gap-2 mb-10">
                        {services[activeIndex].categories.map((cat, ci) => (
                          <motion.span
                            key={cat}
                            className={`text-xs px-4 py-1.5 rounded-full border font-medium ${s.tag}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 + ci * 0.05, duration: 0.35, ease }}
                          >
                            {cat}
                          </motion.span>
                        ))}
                      </div>
                      <Link
                        to={services[activeIndex].link}
                        className={`inline-flex items-center gap-2.5 text-sm font-bold transition-colors duration-300 group ${s.link}`}
                      >
                        <span className="relative">
                          Scopri di più
                          <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${s.underline}`} />
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
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
