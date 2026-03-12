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
import dieselEvent9 from "@/assets/diesel-event-9.jpg";
import dieselEvent10 from "@/assets/diesel-event-10.jpg";
import dieselEvent11 from "@/assets/diesel-event-11.jpg";
import dieselEvent12 from "@/assets/diesel-event-12.jpg";
import dieselEvent13 from "@/assets/diesel-event-13.jpg";
import dieselEvent14 from "@/assets/diesel-event-14.jpg";
import dieselEvent15 from "@/assets/diesel-event-15.jpg";

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
  dieselEvent7, dieselEvent8, diesel9, dieselEvent9,
  dieselEvent10, dieselEvent11, dieselEvent12, dieselEvent13,
  dieselEvent14, dieselEvent15,
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

/* ── Auto-scroll Gallery with mouse-speed boost ──────── */
const ScrollGallery = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const speedRef = useRef(1);
  const animRef = useRef<number>(0);

  const doubledImages = [...galleryImages, ...galleryImages];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const baseSpeed = 0.8;

    const animate = () => {
      positionRef.current += baseSpeed * speedRef.current;
      const halfWidth = el.scrollWidth / 2;
      if (positionRef.current >= halfWidth) positionRef.current = 0;
      if (positionRef.current < 0) positionRef.current = halfWidth;
      el.style.transform = `translateX(-${positionRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    // Left side = slow/reverse, right side = fast forward
    if (x < 0.3) {
      speedRef.current = -0.5 + x * 2; // -0.5 to 0.1
    } else if (x > 0.7) {
      speedRef.current = 1 + (x - 0.7) * 10; // 1 to 4
    } else {
      speedRef.current = 1;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    speedRef.current = 1;
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/60 to-transparent z-[1] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/60 to-transparent z-[1] pointer-events-none" />

      <div
        ref={trackRef}
        className="flex gap-4 md:gap-5 will-change-transform"
      >
        {doubledImages.map((img, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-[60vw] md:w-[280px] lg:w-[320px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer relative group/card"
            whileHover={{ scale: 1.06, zIndex: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={img}
              alt={`Diesel event photo ${(i % galleryImages.length) + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              loading="lazy"
            />
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
          decoding="async"
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
