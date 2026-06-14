import { motion } from "framer-motion";
import FloatingElements from "./FloatingElements";
import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

// Use string paths for lazy loading — images load on scroll, not on page load

const dieselCard = new URL("@/assets/diesel-card.jpg", import.meta.url).href;
const diesel1 = new URL("@/assets/diesel-1.jpg", import.meta.url).href;
const distretto12Card = new URL("@/assets/distretto12-card.jpg", import.meta.url).href;
const diesel9 = new URL("@/assets/diesel-9.jpg", import.meta.url).href;
const dieselEvent1 = new URL("@/assets/diesel-event-1.jpg", import.meta.url).href;
const dieselEvent4 = new URL("@/assets/diesel-event-4.jpg", import.meta.url).href;
const dieselEvent5 = new URL("@/assets/diesel-event-5.jpg", import.meta.url).href;
const dieselEvent6 = new URL("@/assets/diesel-event-6.jpg", import.meta.url).href;
const dieselEvent7 = new URL("@/assets/diesel-event-7.jpg", import.meta.url).href;
const dieselEvent8 = new URL("@/assets/diesel-event-8.jpg", import.meta.url).href;
const dieselEvent9 = new URL("@/assets/diesel-event-9.jpg", import.meta.url).href;
const dieselEvent10 = new URL("@/assets/diesel-event-10.jpg", import.meta.url).href;
const dieselEvent11 = new URL("@/assets/diesel-event-11.jpg", import.meta.url).href;
const dieselEvent12 = new URL("@/assets/diesel-event-12.jpg", import.meta.url).href;
const dieselEvent13 = new URL("@/assets/diesel-event-13.jpg", import.meta.url).href;
const dieselEvent14 = new URL("@/assets/diesel-event-14.jpg", import.meta.url).href;
const dieselEvent15 = new URL("@/assets/diesel-event-15.jpg", import.meta.url).href;

const ease = [0.22, 1, 0.36, 1] as const;

const caseStudiesData = [
  { image: dieselCard, title: "Diesel", year: "2024" },
  { image: diesel1, title: "Mediolanum", year: "2025" },
];

const galleryImages = [
  dieselEvent1, dieselEvent4, dieselEvent5, dieselEvent6,
  dieselEvent7, dieselEvent8, diesel9, dieselEvent9,
  dieselEvent10, dieselEvent11, dieselEvent12, dieselEvent13,
  dieselEvent14, dieselEvent15,
];

const FlipCard = ({ index }: { index: number }) => {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);
  const study = caseStudiesData[index];
  const subtitle = t(`portfolio.cases.${index}.subtitle`);
  const category = t(`portfolio.cases.${index}.category`);
  const description = t(`portfolio.cases.${index}.description`);

  return (
    <motion.div className="relative w-full cursor-pointer" style={{ perspective: 1200 }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15, ease }} onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <motion.div className="relative w-full aspect-[4/5] md:aspect-[3/4]" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }} style={{ transformStyle: "preserve-3d" }}>
        <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
          <img src={study.image} alt={`${study.title} - ${category}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-5 left-6"><span className="text-xs font-mono text-white/60">[{String(index + 1).padStart(2, "0")}]</span></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] block mb-2">{category}</span>
            <h3 className="text-2xl md:text-4xl font-display font-extrabold text-white tracking-tight">{study.title}</h3>
            <span className="text-xs text-white/60 font-mono mt-1 block">{study.year}</span>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl overflow-hidden bg-black/30 backdrop-blur-md border border-white/[0.06] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)] flex flex-col justify-center p-8 md:p-12" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <span className="text-xs font-medium text-primary uppercase tracking-[0.2em] block mb-3">{category} — {study.year}</span>
          <h3 className="text-2xl md:text-4xl font-display font-extrabold text-white tracking-tight mb-2">{study.title}</h3>
          <p className="text-sm text-primary font-medium mb-6">{subtitle}</p>
          <p className="text-[13px] md:text-base text-white/85 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
    const x = (e.clientX - rect.left) / rect.width;
    if (x < 0.3) speedRef.current = -0.5 + x * 2;
    else if (x > 0.7) speedRef.current = 1 + (x - 0.7) * 10;
    else speedRef.current = 1;
  }, []);

  const handleMouseLeave = useCallback(() => { speedRef.current = 1; }, []);

  return (
    <div className="relative overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/60 to-transparent z-[1] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/60 to-transparent z-[1] pointer-events-none" />
      <div ref={trackRef} className="flex gap-4 md:gap-5 will-change-transform">
        {doubledImages.map((img, i) => (
          <motion.div key={i} className="flex-shrink-0 w-[60vw] md:w-[280px] lg:w-[320px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer relative group/card" whileHover={{ scale: 1.06, zIndex: 10 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <img src={img} alt={`Event photo ${(i % galleryImages.length) + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border-2 border-white/0 group-hover/card:border-white/20 rounded-xl transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PortfolioSection = () => {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="relative overflow-hidden">
      <div className="relative z-10 py-12 sm:py-14 md:py-24">
        <FloatingElements variant="dots" count={8} />
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <motion.div className="flex items-center gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease }}>
              <span className="text-xs font-mono text-foreground/60">[03]</span>
              <span className="text-xs uppercase tracking-[0.3em] text-foreground/70 font-medium">{t("portfolio.label")}</span>
            </motion.div>
          </div>

          <motion.h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-tighter leading-[0.9] text-foreground mb-8 sm:mb-12 md:mb-20" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            {t("portfolio.heading")}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8" style={{ perspective: '800px' }}>
            {caseStudiesData.map((_, i) => (
              <div key={i} className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" style={{ transform: 'rotateX(2deg)' }}>
                <FlipCard index={i} />
              </div>
            ))}
          </div>
        </div>

        <motion.div className="mt-12 sm:mt-16 md:mt-28" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
          <div className="container-custom mb-6 md:mb-10">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground tracking-tight">{t("portfolio.gallery")}</h3>
          </div>
          <ScrollGallery />
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
