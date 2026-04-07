import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";

import serviceCorporate from "@/assets/service-corporate.jpg";
import serviceBrand from "@/assets/service-brand.jpg";
import serviceHostess from "@/assets/service-hostess.jpg";
import servicePR from "@/assets/service-pr.jpg";
import serviceProduction from "@/assets/service-production.jpg";
import serviceAV from "@/assets/service-av.jpg";

const serviceImages = [serviceCorporate, serviceBrand, serviceHostess, servicePR, serviceProduction, serviceAV];
const serviceLinks = ["/corporate-events", "/brand-activation", "/hostess-staff", "/public-relations", "/event-productions", "/event-productions"];
const serviceGradients = [
  "radial-gradient(ellipse at 30% 50%, hsl(0 60% 15% / 0.4), transparent 70%)",
  "radial-gradient(ellipse at 30% 50%, hsl(220 60% 15% / 0.4), transparent 70%)",
  "radial-gradient(ellipse at 30% 50%, hsl(40 60% 15% / 0.4), transparent 70%)",
  "radial-gradient(ellipse at 30% 50%, hsl(280 40% 15% / 0.4), transparent 70%)",
  "radial-gradient(ellipse at 30% 50%, hsl(200 50% 15% / 0.4), transparent 70%)",
  "radial-gradient(ellipse at 30% 50%, hsl(160 40% 15% / 0.4), transparent 70%)",
];

const TOTAL_SERVICES = 6;

/* ── Progress Indicator ── */
const ProgressIndicator = ({ activeIndex, total }: { activeIndex: number; total: number }) => (
  <div className="absolute left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-0">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className="flex flex-col items-center">
        <motion.div
          className="rounded-full border transition-all duration-500"
          animate={{
            width: activeIndex === i ? 12 : 6,
            height: activeIndex === i ? 12 : 6,
            borderColor: activeIndex === i ? "hsl(0 85% 55%)" : "hsl(0 0% 30%)",
            backgroundColor: activeIndex === i ? "hsl(0 85% 55%)" : "transparent",
            boxShadow: activeIndex === i ? "0 0 12px hsl(0 85% 55% / 0.5)" : "none",
          }}
        />
        {i < total - 1 && (
          <div className="w-px h-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary"
              animate={{ height: i < activeIndex ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        )}
      </div>
    ))}
  </div>
);

/* ── Service Scene (Desktop) ── */
const ServiceScene = ({
  index, progress, title, description, categories, image, link, isActive,
}: {
  index: number; progress: number; title: string; description: string;
  categories: string[]; image: string; link: string; isActive: boolean;
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  // Compute phase-based animations
  const enterPhase = Math.min(progress / 0.2, 1); // 0→1 during 0-20%
  const focusPhase = progress >= 0.2 && progress <= 0.7 ? 1 : 0;
  const exitPhase = progress > 0.7 ? Math.min((progress - 0.7) / 0.3, 1) : 0;

  const imageScale = 1.2 - 0.2 * enterPhase;
  const imageBlur = 10 * (1 - enterPhase);
  const contentOpacity = enterPhase * (1 - exitPhase);
  const contentY = 40 * (1 - enterPhase) + -30 * exitPhase;
  const numberOpacity = Math.min(enterPhase * 2, 1) * (1 - exitPhase);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="absolute inset-0 flex"
      style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
    >
      {/* LEFT — Text */}
      <div className="w-[42%] flex flex-col justify-center pl-20 xl:pl-28 pr-8 relative z-10">
        <motion.span
          className="text-[8rem] xl:text-[10rem] font-display font-black leading-none text-white/[0.03] absolute -top-4 -left-4 select-none"
          style={{ opacity: numberOpacity }}
        >
          {num}
        </motion.span>

        <div style={{ opacity: contentOpacity, transform: `translateY(${contentY}px)`, transition: "transform 0.1s linear" }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm font-bold">{num}</span>
            <div className="w-12 h-px bg-primary/50" />
          </div>

          <h3 className="text-4xl xl:text-5xl font-display font-extrabold tracking-tight text-foreground mb-5 leading-[1.05]">
            {title}
          </h3>

          <p className="text-base xl:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat, ci) => (
              <span
                key={cat}
                className="text-xs px-4 py-1.5 rounded-full border border-border/30 text-muted-foreground/70 font-medium"
                style={{
                  opacity: contentOpacity,
                  transform: `translateY(${8 * (1 - enterPhase) + ci * 2}px)`,
                  transitionDelay: `${ci * 50}ms`,
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          <Link
            to={link}
            className="inline-flex items-center gap-3 text-sm font-bold text-foreground/80 hover:text-foreground transition-colors group"
          >
            <span className="relative">
              Scopri di più
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>

      {/* RIGHT — Image */}
      <div className="w-[58%] relative flex items-center justify-center p-6 xl:p-10">
        <div
          ref={imgRef}
          className="relative w-full h-[75vh] max-h-[700px] rounded-2xl overflow-hidden cursor-none group"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: "1200px",
          }}
        >
          {/* Glow behind image */}
          <div
            className="absolute -inset-20 rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{
              background: serviceGradients[index],
              opacity: focusPhase * 0.4,
            }}
          />

          <motion.div
            className="w-full h-full rounded-2xl overflow-hidden"
            style={{
              transform: `scale(${imageScale}) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              filter: `blur(${imageBlur}px)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover"
              width={1280}
              height={960}
            />
            {/* Overlay dim on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </motion.div>

          {/* Custom cursor indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-20 h-20 rounded-full border-2 border-white/60 flex items-center justify-center backdrop-blur-sm bg-white/5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white font-bold">View</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Desktop Services ── */
const DesktopServices = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [serviceProgress, setServiceProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const perService = 1 / TOTAL_SERVICES;
    const idx = Math.min(Math.floor(v / perService), TOTAL_SERVICES - 1);
    const localProgress = (v - idx * perService) / perService;
    setActiveIndex(idx);
    setServiceProgress(localProgress);
  });

  const overallProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative"
      style={{ height: `${TOTAL_SERVICES * 100}vh`, background: "#0A0A0A" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Animated gradient background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: serviceGradients[activeIndex] }}
          />
        </AnimatePresence>

        {/* Grain overlay */}
        <div className="absolute inset-0 grain pointer-events-none z-10" />

        {/* Top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-30 bg-white/5">
          <motion.div className="h-full bg-primary origin-left" style={{ width: overallProgress }} />
        </div>

        {/* Section label */}
        <div className="absolute top-8 left-20 xl:left-28 z-20 flex items-center gap-3">
          <span className="text-[10px] font-mono text-white/30">[02]</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">
            {t("services.label")}
          </span>
        </div>

        {/* Counter */}
        <div className="absolute top-8 right-10 z-20 flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              className="text-2xl font-display font-extrabold text-primary tabular-nums"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span className="text-white/20 text-sm font-mono">/</span>
          <span className="text-white/20 text-sm font-mono">{String(TOTAL_SERVICES).padStart(2, "0")}</span>
        </div>

        {/* Progress indicator */}
        <ProgressIndicator activeIndex={activeIndex} total={TOTAL_SERVICES} />

        {/* Service scenes */}
        {Array.from({ length: TOTAL_SERVICES }).map((_, i) => {
          const categories: string[] = t(`services.items.${i}.categories`, { returnObjects: true }) as string[];
          return (
            <ServiceScene
              key={i}
              index={i}
              progress={activeIndex === i ? serviceProgress : activeIndex > i ? 1 : 0}
              title={t(`services.items.${i}.title`)}
              description={t(`services.items.${i}.description`)}
              categories={categories}
              image={serviceImages[i]}
              link={serviceLinks[i]}
              isActive={activeIndex === i}
            />
          );
        })}

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          animate={{ opacity: activeIndex < TOTAL_SERVICES - 1 ? 0.6 : 0.15 }}
        >
          <motion.div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 rounded-full bg-white/60"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/30 font-medium">
            {t("services.scroll")}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Mobile Services ── */
const MobileServices = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="relative py-16 overflow-hidden" style={{ background: "#0A0A0A" }}>
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="px-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono text-white/30">[02]</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">{t("services.label")}</span>
        </div>
        <h2 className="text-3xl font-display font-extrabold tracking-tighter text-white mb-10">
          {t("services.heading")}
        </h2>

        <div className="space-y-6">
          {Array.from({ length: TOTAL_SERVICES }).map((_, i) => {
            const title = t(`services.items.${i}.title`);
            const description = t(`services.items.${i}.description`);
            const num = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={serviceLinks[i]} className="block group">
                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[16/10]">
                    <img
                      src={serviceImages[i]}
                      alt={title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-active:scale-105"
                      width={1280}
                      height={960}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[10px] font-mono text-white/50">{num}</span>
                  </div>

                  {/* Text */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-display font-bold text-white tracking-tight mb-1">{title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/20 flex-shrink-0 mt-1 group-active:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileServices /> : <DesktopServices />;
};

export default ServicesSection;
