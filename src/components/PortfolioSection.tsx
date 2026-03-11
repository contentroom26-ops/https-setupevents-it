import { motion } from "framer-motion";
import FloatingElements from "./FloatingElements";
import { useState, useRef, useEffect, useCallback } from "react";

import dieselMarbleBg from "@/assets/diesel-marble-bg.jpg";
import dieselCard from "@/assets/diesel-card.jpg";
import diesel1 from "@/assets/diesel-1.jpg";
import diesel9 from "@/assets/diesel-9.jpg";
import dieselEvent1 from "@/assets/diesel-event-1.jpg";
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
    year: "2024",
    category: "Brand Activation",
    description:
      "Evento esclusivo nello store Diesel di Firenze: PR strategiche, selezione ospiti, hostess professionali e service audio-video completo per una serata dal forte impatto sul brand.",
  },
  {
    image: diesel1,
    title: "Mediolanum",
    subtitle: "Corporate Convention",
    year: "2025",
    category: "Corporate Event",
    description:
      "Convention aziendale per Banca Mediolanum con 120 invitati. Gestione completa: scouting location, allestimento scenografico, coordinamento relatori, hostess e steward, produzione audio-video e live streaming.",
  },
];

const galleryImages = [
  dieselEvent1, dieselEvent4, dieselEvent5, dieselEvent6,
  dieselEvent7, dieselEvent8, diesel9,
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
            alt={`${study.title} - ${study.category}`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
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
          className="absolute inset-0 rounded-2xl overflow-hidden bg-black/30 backdrop-blur-md border border-white/[0.06] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)] flex flex-col justify-center p-8 md:p-12"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] block mb-3">
            {study.category} — {study.year}
          </span>
          <h3 className="text-2xl md:text-4xl font-display font-extrabold text-white tracking-tight mb-2">
            {study.title}
          </h3>
          <p className="text-sm text-white/50 font-medium mb-6">
            {study.subtitle}
          </p>
          <p className="text-[13px] md:text-base text-white/75 leading-relaxed">
            {study.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Scrollable Gallery with Arrows ───────────────────── */
const ScrollGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 320;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group/gallery">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all duration-300 opacity-0 group-hover/gallery:opacity-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/60 to-transparent z-[1] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/60 to-transparent z-[1] pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide px-4 md:px-8 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-[60vw] md:w-[280px] lg:w-[320px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer relative group/card"
            whileHover={{ scale: 1.06, zIndex: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={img}
              alt={`Diesel event photo ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              loading="lazy"
            />
            {/* Hover overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border-2 border-white/0 group-hover/card:border-white/20 rounded-xl transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ── Main Section ────────────────────────────────────── */
const PortfolioSection = () => {
  return (
    <section id="portfolio" className="relative overflow-hidden">
      {/* Marble background */}
      <div className="absolute inset-0">
        <img
          src={dieselMarbleBg}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 py-20 md:py-40">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" style={{ perspective: '800px' }}>
          {caseStudies.map((study, i) => (
            <div key={study.title} className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" style={{ transform: 'rotateX(2deg)' }}>
              <FlipCard study={study} index={i} />
            </div>
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
        <ScrollGallery />
      </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
