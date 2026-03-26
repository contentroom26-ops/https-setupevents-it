import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight, Calendar, Megaphone, Users, Handshake, MapPin, Tv } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FloatingElements from "./FloatingElements";
import { useIsMobile } from "@/hooks/use-mobile";

const ease = [0.22, 1, 0.36, 1] as const;

const serviceLinks = [
  "/corporate-events",
  "/brand-activation",
  "/hostess-staff",
  "/public-relations",
  "/event-productions",
  "/event-productions",
];

const serviceNumbers = ["01", "02", "03", "04", "05", "06"];

const serviceIcons = [Calendar, Megaphone, Users, Handshake, MapPin, Tv];

const getCardStyle = (_idx: number) => ({
  card: "bg-black/30 backdrop-blur-md border border-white/[0.06] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)]",
  number: "text-white/[0.04]",
  title: "text-white",
  desc: "text-white/55",
  label: "text-white/30",
  tag: "border-white/[0.1] text-white/50",
  link: "text-white/70 hover:text-white",
  underline: "bg-white",
});

const MobileServices = () => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="services" className="section-dark py-14 relative grain overflow-hidden">
      <FloatingElements variant="lines" count={2} />
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono text-muted-foreground">[02]</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">{t("services.label")}</span>
        </div>
        <motion.h2
          className="text-2xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground mb-6"
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          {t("services.heading")}
        </motion.h2>

        {/* Grid 2×3 — all services visible immediately */}
        <div className="grid grid-cols-2 gap-3">
          {serviceNumbers.map((num, i) => {
            const Icon = serviceIcons[i];
            const isExpanded = expandedIndex === i;
            const title = t(`services.items.${i}.title`);
            const description = t(`services.items.${i}.description`);

            return (
              <motion.div
                key={i}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? "col-span-2" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
                layout
              >
                <button
                  onClick={() => toggleExpand(i)}
                  className={`w-full text-left rounded-xl border transition-all duration-300 ${
                    isExpanded
                      ? "bg-primary/10 border-primary/30 p-5"
                      : "bg-black/30 backdrop-blur-sm border-white/[0.06] p-4 active:scale-[0.97]"
                  }`}
                >
                  {/* Compact view — always visible */}
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isExpanded ? "bg-primary/20" : "bg-white/[0.05]"
                    }`}>
                      <Icon className={`w-4 h-4 transition-colors duration-300 ${
                        isExpanded ? "text-primary" : "text-white/40"
                      }`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-mono text-primary/60 block mb-0.5">{num}</span>
                      <h3 className="text-[13px] font-display font-bold text-white leading-tight tracking-tight">{title}</h3>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-white/[0.08]">
                          <p className="text-[12px] leading-relaxed text-white/55 mb-3">{description}</p>
                          <Link
                            to={serviceLinks[i]}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group"
                          >
                            {t("services.learnMore")}
                            <ArrowRight className="w-3 h-3 transition-transform group-active:translate-x-1" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA bottom */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]">
            {t("services.tapHint", "Tap per scoprire di più")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const DesktopServices = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const total = serviceNumbers.length;
    const idx = Math.max(0, Math.min(Math.floor(v * total), total - 1));
    setActiveIndex(idx);
  });

  const s = getCardStyle(activeIndex);
  const title = t(`services.items.${activeIndex}.title`);
  const description = t(`services.items.${activeIndex}.description`);
  const categories: string[] = t(`services.items.${activeIndex}.categories`, { returnObjects: true }) as string[];

  return (
    <section ref={sectionRef} id="services" className="section-dark relative grain" style={{ height: `${serviceNumbers.length * 60}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col" style={{ overflow: 'clip' }}>
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-border/20">
          <motion.div className="h-full bg-primary origin-left" style={{ width: progressWidth }} />
        </div>
        <FloatingElements variant="lines" count={3} />
        <div className="flex-1 flex items-center">
          <div className="container-custom w-full py-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono text-muted-foreground">[02]</span>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">{t("services.label")}</span>
            </div>
            <div className="flex items-end justify-between mb-12 lg:mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground">{t("services.heading")}</h2>
              <motion.div className="flex items-center gap-3" key={activeIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <span className="text-3xl font-display font-extrabold text-primary tabular-nums">{String(activeIndex + 1).padStart(2, "0")}</span>
                <span className="text-muted-foreground/40 text-sm font-mono">/</span>
                <span className="text-muted-foreground/40 text-sm font-mono">{String(serviceNumbers.length).padStart(2, "0")}</span>
              </motion.div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-5 xl:col-span-4">
                <div className="space-y-0">
                  {serviceNumbers.map((num, i) => (
                    <div key={num} className={`w-full text-left px-4 py-5 border-b border-border/40 flex items-center gap-4 transition-all duration-400 relative cursor-default ${activeIndex === i ? "text-foreground" : "text-muted-foreground"}`}>
                      <motion.div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary" initial={false} animate={{ opacity: activeIndex === i ? 1 : 0, scaleY: activeIndex === i ? 1 : 0 }} transition={{ duration: 0.35, ease }} />
                      <span className={`text-[10px] font-mono transition-colors duration-300 ${activeIndex === i ? "text-primary" : "text-muted-foreground/40"}`}>{num}</span>
                      <span className="text-base font-semibold tracking-tight font-display">{t(`services.items.${i}.title`)}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ml-auto transition-all duration-300 ${activeIndex === i ? "opacity-100 translate-x-0 text-primary" : "opacity-0 -translate-x-2"}`} />
                    </div>
                  ))}
                </div>
                <motion.div 
                  className="mt-6 flex items-center gap-2" 
                  animate={{ opacity: activeIndex < serviceNumbers.length - 1 ? 1 : 0.3 }}
                >
                  <motion.div className="w-5 h-8 rounded-full border border-primary/40 flex items-start justify-center p-1">
                    <motion.div className="w-1.5 h-2 rounded-full bg-primary" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
                  </motion.div>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground/60">{t("services.scroll")}</span>
                  <span className="text-[10px] text-primary font-mono ml-1">{String(activeIndex + 1).padStart(2, "0")}/{String(serviceNumbers.length).padStart(2, "0")}</span>
                </motion.div>
              </div>
              <div className="col-span-7 xl:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div key={activeIndex} className={`relative rounded-2xl p-10 lg:p-12 overflow-hidden ${s.card}`}>
                    <motion.div className="absolute inset-0 bg-[hsl(var(--background))] z-20 origin-left" initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }} style={{ transformOrigin: "right" }} />
                    <motion.span className={`absolute top-6 right-10 text-[9rem] font-display font-extrabold leading-none select-none pointer-events-none ${s.number}`} style={{ y: parallaxY }}>{serviceNumbers[activeIndex]}</motion.span>
                    <motion.div className="relative z-10" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                      <h3 className={`text-3xl lg:text-4xl font-display font-extrabold tracking-tight mb-6 ${s.title}`}>{title}</h3>
                      <p className={`text-base leading-relaxed mb-8 max-w-lg ${s.desc}`}>{description}</p>
                      <span className={`text-[10px] uppercase tracking-[0.2em] font-medium block mb-3 ${s.label}`}>{t("services.categories")}</span>
                      <div className="flex flex-wrap gap-2 mb-10">
                        {categories.map((cat: string, ci: number) => (
                          <motion.span key={cat} className={`text-xs px-4 py-1.5 rounded-full border font-medium ${s.tag}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + ci * 0.05, duration: 0.35, ease }}>
                            {cat}
                          </motion.span>
                        ))}
                      </div>
                      <Link to={serviceLinks[activeIndex]} className={`inline-flex items-center gap-2.5 text-sm font-bold transition-colors duration-300 group ${s.link}`}>
                        <span className="relative">
                          {t("services.learnMore")}
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

const ServicesSection = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileServices /> : <DesktopServices />;
};

export default ServicesSection;
