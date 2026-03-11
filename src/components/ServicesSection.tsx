import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
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
    span: "col-span-2 row-span-2", // large
  },
  {
    number: "02",
    title: "Brand Activations",
    description:
      "Lanci prodotto ed esperienze immersive studiate per massimizzare visibilità, engagement e impatto sul mercato.",
    categories: ["Lancio Prodotto", "Pop-up Events", "Experiential Marketing"],
    link: "/brand-activation",
    span: "col-span-1 row-span-1", // small
  },
  {
    number: "03",
    title: "Hostess & Staff",
    description:
      "Personale selezionato e formato per accoglienza, promozione e immagine durante gli eventi.",
    categories: ["Hostess", "Steward", "Promoter", "Staff Tecnico"],
    link: "/hostess-staff",
    span: "col-span-1 row-span-1", // small
  },
  {
    number: "04",
    title: "Public Relations",
    description:
      "Gestione dei contatti e degli ospiti accuratamente selezionata. Selezione del target e cura delle relazioni.",
    categories: ["Guest Management", "VIP Relations", "Networking"],
    link: "/public-relations",
    span: "col-span-1 row-span-2", // tall
  },
  {
    number: "05",
    title: "Location & Set-up",
    description:
      "Scouting delle migliori location e allestimenti scenografici su misura. Dal concept alla realizzazione.",
    categories: ["Scouting", "Set Design", "Allestimenti"],
    link: "/event-productions",
    span: "col-span-1 row-span-1", // small
  },
  {
    number: "06",
    title: "A/V Production",
    description:
      "Servizi audio-video professionali con tecnologie all'avanguardia per produzioni impeccabili.",
    categories: ["Audio", "Video", "Lighting", "Live Streaming"],
    link: "/event-productions",
    span: "col-span-1 row-span-1", // small
  },
];

const getCardStyle = (idx: number) => {
  const variant = idx % 3;
  if (variant === 0)
    return {
      card: "bg-secondary/30 border-border/30",
      number: "text-foreground/[0.04]",
      title: "text-foreground",
      desc: "text-muted-foreground",
      tag: "border-border/50 text-muted-foreground/70",
      link: "text-foreground hover:text-primary",
      underline: "bg-primary",
      glow: "group-hover:shadow-[0_0_60px_-12px_hsl(var(--primary)/0.3)]",
    };
  if (variant === 1)
    return {
      card: "bg-white text-background border-white/20",
      number: "text-background/[0.06]",
      title: "text-background",
      desc: "text-background/70",
      tag: "border-background/20 text-background/60",
      link: "text-background hover:text-background/70",
      underline: "bg-background",
      glow: "group-hover:shadow-[0_0_60px_-12px_hsl(0_0%_100%/0.2)]",
    };
  return {
    card: "bg-primary border-primary/30",
    number: "text-white/10",
    title: "text-white",
    desc: "text-white/80",
    tag: "border-white/30 text-white/70",
    link: "text-white hover:text-white/80",
    underline: "bg-white",
    glow: "group-hover:shadow-[0_0_60px_-12px_hsl(var(--primary)/0.4)]",
  };
};

/* ── Bento Card ────────────────────── */
const BentoCard = ({
  service,
  index,
  isMobile,
}: {
  service: (typeof services)[0];
  index: number;
  isMobile: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const s = getCardStyle(index);
  const isLarge = service.span.includes("col-span-2") || service.span.includes("row-span-2");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      className={`${isMobile ? "" : service.span} group relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className={`relative h-full rounded-2xl border backdrop-blur-sm overflow-hidden transition-shadow duration-500 ${s.card} ${s.glow}`}
        animate={{
          rotateX: isHovered && !isMobile ? -2 : 0,
          rotateY: isHovered && !isMobile ? 3 : 0,
          z: isHovered && !isMobile ? 20 : 0,
        }}
        transition={{ duration: 0.4, ease }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary) / 0.15), transparent 40%, transparent 60%, hsl(var(--primary) / 0.1))",
          }}
        />

        {/* Big background number */}
        <motion.span
          className={`absolute font-display font-extrabold leading-none select-none pointer-events-none ${s.number} ${
            isLarge ? "text-[10rem] top-4 right-6" : "text-[5rem] top-2 right-4"
          }`}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? -3 : 0,
          }}
          transition={{ duration: 0.5, ease }}
        >
          {service.number}
        </motion.span>

        <div
          className={`relative z-10 flex flex-col justify-between h-full ${
            isLarge && !isMobile ? "p-8 lg:p-10" : "p-5 lg:p-6"
          }`}
        >
          <div>
            <motion.span
              className={`text-[10px] font-mono tracking-wider block mb-2 ${s.desc}`}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3, ease }}
            >
              {service.number}
            </motion.span>
            <h3
              className={`font-display font-extrabold tracking-tight mb-3 ${s.title} ${
                isLarge && !isMobile ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"
              }`}
            >
              {service.title}
            </h3>
            <p
              className={`leading-relaxed mb-4 ${s.desc} ${
                isLarge && !isMobile ? "text-sm max-w-md" : "text-xs"
              }`}
            >
              {service.description}
            </p>
          </div>

          <div>
            {/* Categories with staggered reveal */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {service.categories.map((cat, ci) => (
                <motion.span
                  key={cat}
                  className={`text-[10px] px-3 py-1 rounded-full border font-medium ${s.tag}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 + ci * 0.05, duration: 0.35, ease }}
                >
                  {cat}
                </motion.span>
              ))}
            </div>

            <Link
              to={service.link}
              className={`inline-flex items-center gap-2 text-sm font-bold transition-colors duration-300 group/link ${s.link}`}
            >
              <span className="relative">
                Scopri di più
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover/link:w-full ${s.underline}`}
                />
              </span>
              <motion.span
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3, ease }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Main Section ────────────────────── */
const ServicesSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-dark relative grain py-20 lg:py-32 overflow-hidden"
    >
      <FloatingElements variant="lines" count={3} />
      <div className="container-custom">
        {/* Header */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-12 lg:mb-20">
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

        {/* Bento Grid */}
        <div
          className={
            isMobile
              ? "grid grid-cols-1 gap-4"
              : "grid grid-cols-3 auto-rows-[minmax(220px,auto)] gap-4 lg:gap-5"
          }
        >
          {services.map((service, i) => (
            <BentoCard key={service.number} service={service} index={i} isMobile={!!isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
