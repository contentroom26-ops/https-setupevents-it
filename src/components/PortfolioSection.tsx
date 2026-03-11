import { motion } from "framer-motion";
import FloatingElements from "./FloatingElements";
import { useState, useRef, useEffect } from "react";

import dieselCard from "@/assets/diesel-card.jpg";
import diesel1 from "@/assets/diesel-1.jpg";
import diesel2 from "@/assets/diesel-2.jpg";
import diesel3 from "@/assets/diesel-3.jpg";
import diesel4 from "@/assets/diesel-4.jpg";
import diesel9 from "@/assets/diesel-9.jpg";
import dieselEvent1 from "@/assets/diesel-event-1.jpg";
import dieselEvent2 from "@/assets/diesel-event-2.jpg";
import dieselEvent3 from "@/assets/diesel-event-3.jpg";
import dieselEvent4 from "@/assets/diesel-event-4.jpg";
import dieselEvent5 from "@/assets/diesel-event-5.jpg";
import dieselEvent6 from "@/assets/diesel-event-6.jpg";
import dieselEvent7 from "@/assets/diesel-event-7.jpg";
import dieselEvent8 from "@/assets/diesel-event-8.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const caseStudies = [
  {
    image: dieselCard,
    title: "Diesel",
    subtitle: "Fashion Night Event",
    year: "2025",
    category: "Brand Activation",
    description:
      "Evento esclusivo organizzato per Diesel presso lo store di Firenze. L'evento è stato pensato per coinvolgere un pubblico in linea con il posizionamento del brand e valorizzarne l'identità. Ci siamo occupati del servizio di pubbliche relazioni, curando la selezione e la gestione degli ospiti. Abbiamo fornito hostess professionali, selezionate in coerenza con l'immagine e lo stile richiesti. Inoltre, abbiamo coordinato il service audio-video, assicurando un supporto tecnico puntuale e un'esecuzione fluida dell'intera serata.",
  },
  {
    image: diesel1,
    title: "Mediolanum",
    subtitle: "Corporate Convention",
    year: "2024",
    category: "Corporate Event",
    description:
      "Convention aziendale per Banca Mediolanum con oltre 500 partecipanti. Gestione completa dell'evento: scouting della location, allestimento scenografico, coordinamento dei relatori, servizio hostess e steward, produzione audio-video e live streaming. Un evento che ha rafforzato l'identità del brand e creato connessioni significative.",
  },
];

const galleryImages = [
  dieselEvent1, dieselEvent2, dieselEvent3, dieselEvent4,
  dieselEvent5, dieselEvent6, dieselEvent7, dieselEvent8,
  diesel1, diesel2, diesel3, diesel4, diesel9,
];

/* ── Flip Card Component ─────────────────────────────── */
const FlipCard = ({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full cursor-pointer"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full aspect-[4/5] md:aspect-[3/4]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-5 left-6">
            <span className="text-xs font-mono text-white/40">
              [{String(index + 1).padStart(2, "0")}]
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] block mb-2">
              {study.category}
            </span>
            <h3 className="text-2xl md:text-4xl font-display font-extrabold text-white tracking-tight">
              {study.title}
            </h3>
            <span className="text-xs text-white/40 font-mono mt-1 block">
              {study.year}
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-secondary/90 border border-border/30 backdrop-blur-sm flex flex-col justify-center p-8 md:p-12"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] block mb-3">
            {study.category} — {study.year}
          </span>
          <h3 className="text-2xl md:text-4xl font-display font-extrabold text-foreground tracking-tight mb-2">
            {study.title}
          </h3>
          <p className="text-sm text-muted-foreground/60 font-medium mb-6">
            {study.subtitle}
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {study.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Infinite Marquee Gallery ────────────────────────── */
const InfiniteGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let position = 0;
    const speed = 1.2; // px per frame

    const animate = () => {
      position += speed;
      // Reset when first set is fully scrolled past
      const halfWidth = el.scrollWidth / 2;
      if (position >= halfWidth) {
        position = 0;
      }
      el.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate images for seamless loop
  const doubledImages = [...galleryImages, ...galleryImages];

  return (
    <div className="overflow-hidden">
      <div ref={scrollRef} className="flex gap-3 md:gap-5 will-change-transform">
        {doubledImages.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[55vw] md:w-[260px] lg:w-[300px] aspect-[3/4] rounded-lg overflow-hidden"
          >
            <img
              src={img}
              alt={`Event photo ${(i % galleryImages.length) + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main Section ────────────────────────────────────── */
const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-dark py-20 md:py-40 relative grain overflow-hidden">
      <FloatingElements variant="dots" count={8} />
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="text-xs font-mono text-muted-foreground">[03]</span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
              Projects
            </span>
          </motion.div>
        </div>

        <motion.h2
          className="text-3xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-tighter leading-[0.9] text-foreground mb-12 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Case studies
        </motion.h2>

        {/* Two flip cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {caseStudies.map((study, i) => (
            <FlipCard key={study.title} study={study} index={i} />
          ))}
        </div>
      </div>

      {/* Auto-scrolling gallery */}
      <motion.div
        className="mt-16 md:mt-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="container-custom mb-6 md:mb-10">
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground tracking-tight">
            Gallery
          </h3>
        </div>
        <InfiniteGallery />
      </motion.div>
    </section>
  );
};

export default PortfolioSection;
