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

const getCardStyle = (idx: number) => {
  const variant = idx % 3;
  if (variant === 0) return {
    card: "bg-secondary/30 border border-border/30",
    number: "text-foreground/[0.03]",
    title: "text-foreground",
    desc: "text-muted-foreground",
    label: "text-muted-foreground/50",
    tag: "border-border/50 text-muted-foreground/70",
    link: "text-foreground hover:text-primary",
    underline: "bg-primary",
  };
  if (variant === 1) return {
    card: "bg-white text-background border border-white/20",
    number: "text-background/[0.06]",
    title: "text-background",
    desc: "text-background/70",
    label: "text-background/40",
    tag: "border-background/20 text-background/60",
    link: "text-background hover:text-background/70",
    underline: "bg-background",
  };
  return {
    card: "bg-primary border border-primary/30",
    number: "text-white/10",
    title: "text-white",
    desc: "text-white/80",
    label: "text-white/50",
    tag: "border-white/30 text-white/70",
    link: "text-white hover:text-white/80",
    underline: "bg-white",
  };
};

/* ── Service Card (used on mobile) ──────────────────── */
const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const s = getCardStyle(index);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease }}
      className={`relative rounded-2xl p-5 backdrop-blur-sm ${s.card}`}
    >
      <span className={`absolute top-2 right-4 text-[3.5rem] font-display font-extrabold leading-none select-none pointer-events-none ${s.number}`}>
        {service.number}
      </span>
      <div className="relative z-10">
        <h3 className={`text-lg font-display font-extrabold tracking-tight mb-3 ${s.title}`}>
          {service.title}
        </h3>
        <p className={`text-xs leading-relaxed mb-4 ${s.desc}`}>
          {service.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.categories.map((cat) => (
            <span key={cat} className={`text-[10px] px-3 py-1 rounded-full border font-medium ${s.tag}`}>
              {cat}
            </span>
          ))}
        </div>
        <Link
          to={service.link}
          className={`inline-flex items-center gap-2 text-sm font-bold transition-colors duration-300 group ${s.link}`}
        >
          <span className="relative">
            Scopri di più
            <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${s.underline}`} />
          </span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
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

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const total = services.length;
    const idx = Math.min(Math.floor(v * total), total - 1);
    if (idx >= 0) setActiveIndex(idx);
  });

  const s = getCardStyle(activeIndex);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-dark relative grain"
      style={{ height: `${services.length * 50}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <FloatingElements variant="lines" count={3} />
        <div className="container-custom w-full">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="text-xs font-mono text-muted-foreground">[03]</span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">Servizi</span>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            Services
          </motion.h2>

          <div className="grid grid-cols-12 gap-6">
            {/* Left nav */}
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
            </div>

            {/* Right detail */}
            <div className="col-span-7 xl:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.45, ease }}
                  className={`relative rounded-2xl p-10 lg:p-12 backdrop-blur-sm ${s.card}`}
                >
                  <motion.span
                    className={`absolute top-6 right-10 text-[9rem] font-display font-extrabold leading-none select-none pointer-events-none ${s.number}`}
                    style={{ y: parallaxY }}
                  >
                    {services[activeIndex].number}
                  </motion.span>

                  <div className="relative z-10">
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
                          transition={{ delay: ci * 0.05, duration: 0.35, ease }}
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
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Mobile static section ──────────────────────────── */
const MobileServices = () => (
  <section id="services" className="section-dark py-16 relative grain overflow-hidden">
    <FloatingElements variant="lines" count={3} />
    <div className="container-custom">
      <motion.h2
        className="text-2xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        Services
      </motion.h2>
      <div className="space-y-4">
        {services.map((service, i) => (
          <ServiceCard key={service.number} service={service} index={i} />
        ))}
      </div>
    </div>
  </section>
);

/* ── Main export ────────────────────────────────────── */
const ServicesSection = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileServices /> : <DesktopServices />;
};

export default ServicesSection;
