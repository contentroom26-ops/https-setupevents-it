import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import serviceCorporate from "@/assets/service-corporate.jpg";
import serviceBrand from "@/assets/service-brand.jpg";
import serviceHostess from "@/assets/service-hostess.jpg";
import servicePR from "@/assets/service-pr.jpg";
import serviceProduction from "@/assets/service-production.jpg";
import serviceAV from "@/assets/service-av.jpg";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_IMAGES = [serviceCorporate, serviceBrand, serviceHostess, servicePR, serviceProduction, serviceAV];
const SERVICE_LINKS = ["/corporate-events", "/brand-activation", "/hostess-staff", "/public-relations", "/event-productions", "/event-productions"];
const TOTAL = 6;

/* ═══════════════════════════════════════════
   Desktop — GSAP ScrollTrigger driven
   ═══════════════════════════════════════════ */
const DesktopServices = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const setLayerRef = useCallback((el: HTMLDivElement | null, i: number) => {
    layersRef.current[i] = el;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const layers = layersRef.current.filter(Boolean) as HTMLDivElement[];
      if (layers.length < TOTAL) return;

      // Initial states
      layers.forEach((layer, i) => {
        const textEl = layer.querySelector(".svc-text");
        const imgEl = layer.querySelector(".svc-img");
        const numEl = layer.querySelector(".svc-num");
        if (i === 0) {
          gsap.set(layer, { autoAlpha: 1 });
          gsap.set(textEl, { y: 0, autoAlpha: 1 });
          gsap.set(imgEl, { scale: 1, autoAlpha: 1 });
          gsap.set(numEl, { y: 0, autoAlpha: 1 });
        } else {
          gsap.set(layer, { autoAlpha: 0 });
          gsap.set(textEl, { y: 40, autoAlpha: 0 });
          gsap.set(imgEl, { scale: 1.08, autoAlpha: 0 });
          gsap.set(numEl, { y: 20, autoAlpha: 0 });
        }
      });

      // Build ONE master timeline. Each service gets 1 "unit" of time.
      // Each service: HOLD for 0.6 units, EXIT 0.15 units, ENTER next 0.25 units (sequential, no overlap)
      const UNIT = 1;
      const tl = gsap.timeline();

      for (let i = 0; i < TOTAL; i++) {
        const current = layers[i];
        const next = layers[i + 1];
        const baseTime = i * UNIT;

        tl.addLabel(`svc${i}`, baseTime);

        if (next) {
          // EXIT current — fast, complete before next enters
          const exitStart = baseTime + UNIT * 0.65;
          const exitDur = UNIT * 0.15;

          tl.to(current.querySelector(".svc-text")!, {
            y: -25, autoAlpha: 0, duration: exitDur, ease: "power2.in",
          }, exitStart);
          tl.to(current.querySelector(".svc-img")!, {
            scale: 0.97, autoAlpha: 0, duration: exitDur, ease: "power2.in",
          }, exitStart);
          tl.to(current.querySelector(".svc-num")!, {
            y: -10, autoAlpha: 0, duration: exitDur, ease: "power2.in",
          }, exitStart);
          tl.to(current, {
            autoAlpha: 0, duration: exitDur * 0.6, ease: "none",
          }, exitStart + exitDur * 0.4);

          // ENTER next — starts after exit completes
          const enterStart = exitStart + exitDur;
          const enterDur = UNIT * 0.2;

          tl.set(next, { autoAlpha: 1 }, enterStart);
          tl.fromTo(next.querySelector(".svc-num")!,
            { y: 15, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: enterDur * 0.7, ease: "power2.out" },
            enterStart
          );
          tl.fromTo(next.querySelector(".svc-text")!,
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: enterDur, ease: "power2.out" },
            enterStart + enterDur * 0.1
          );
          tl.fromTo(next.querySelector(".svc-img")!,
            { scale: 1.05, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: enterDur, ease: "power2.out" },
            enterStart + enterDur * 0.05
          );
        }
      }

      // Add final hold
      tl.addLabel("end", TOTAL * UNIT);

      // Attach timeline to scroll
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        animation: tl,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * TOTAL), TOTAL - 1);
          setActiveIndex(idx);
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });

      // Subtle parallax on all images
      layers.forEach((layer) => {
        const inner = layer?.querySelector(".svc-img-inner");
        if (!inner) return;
        gsap.to(inner, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative"
      style={{ height: `${TOTAL * 55}vh`, background: "#0A0A0A" }}
    >
      <div className="sticky top-0 h-screen" style={{ overflow: "clip" }}>
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-30 bg-white/5">
          <div
            ref={progressRef}
            className="h-full bg-primary origin-left"
            style={{ transform: "scaleX(0)", willChange: "transform" }}
          />
        </div>

        {/* Section label */}
        <div className="absolute top-7 left-16 xl:left-24 z-20 flex items-center gap-3">
          <span className="text-[10px] font-mono text-white/25">[02]</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-medium">
            {t("services.label")}
          </span>
        </div>

        {/* Counter */}
        <div className="absolute top-7 right-10 z-20 flex items-center gap-2">
          <div className="h-7 overflow-hidden relative w-7">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center text-xl font-display font-extrabold text-primary tabular-nums"
                style={{
                  transform: `translateY(${(i - activeIndex) * 100}%)`,
                  transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            ))}
          </div>
          <span className="text-white/15 text-sm font-mono">/</span>
          <span className="text-white/15 text-sm font-mono">{String(TOTAL).padStart(2, "0")}</span>
        </div>

        {/* Progress dots */}
        <div className="absolute left-7 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-0">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="rounded-full transition-all duration-400"
                style={{
                  width: activeIndex === i ? 10 : 5,
                  height: activeIndex === i ? 10 : 5,
                  backgroundColor: activeIndex === i ? "hsl(0 85% 55%)" : "transparent",
                  border: `1px solid ${activeIndex === i ? "hsl(0 85% 55%)" : "hsl(0 0% 25%)"}`,
                  boxShadow: activeIndex === i ? "0 0 10px hsl(0 85% 55% / 0.4)" : "none",
                }}
              />
              {i < TOTAL - 1 && (
                <div className="w-px h-7 bg-white/10 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-full bg-primary transition-all duration-400"
                    style={{ height: i < activeIndex ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Service layers */}
        {Array.from({ length: TOTAL }).map((_, i) => {
          const title = t(`services.items.${i}.title`);
          const desc = t(`services.items.${i}.description`);
          const cats: string[] = t(`services.items.${i}.categories`, { returnObjects: true }) as string[];
          const num = String(i + 1).padStart(2, "0");

          return (
            <div
              key={i}
              ref={(el) => setLayerRef(el, i)}
              className="absolute inset-0 flex"
              style={{ visibility: "hidden" }}
            >
              {/* LEFT */}
              <div className="w-[42%] flex flex-col justify-center pl-16 xl:pl-24 pr-8 relative z-10">
                <span className="svc-num text-[7rem] xl:text-[9rem] font-display font-black leading-none text-white/[0.025] absolute -top-2 -left-2 select-none pointer-events-none">
                  {num}
                </span>
                <div className="svc-text">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-primary font-mono text-sm font-bold">{num}</span>
                    <div className="w-10 h-px bg-primary/40" />
                  </div>
                  <h3 className="text-3xl xl:text-[2.8rem] font-display font-extrabold tracking-tight text-white mb-5 leading-[1.08]">
                    {title}
                  </h3>
                  <p className="text-[15px] xl:text-base text-white/45 leading-relaxed mb-7 max-w-sm">
                    {desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-9">
                    {cats.map((cat) => (
                      <span key={cat} className="text-[11px] px-3.5 py-1 rounded-full border border-white/[0.08] text-white/35 font-medium">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={SERVICE_LINKS[i]}
                    className="inline-flex items-center gap-2.5 text-sm font-bold text-white/60 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="relative">
                      {t("services.learnMore")}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* RIGHT */}
              <div className="w-[58%] flex items-center justify-center p-5 xl:p-8">
                <div className="svc-img relative w-full h-[72vh] max-h-[680px] rounded-2xl overflow-hidden">
                  <div className="svc-img-inner w-full h-full">
                    <img
                      src={SERVICE_IMAGES[i]}
                      alt={title}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover rounded-2xl"
                      width={1280}
                      height={960}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent pointer-events-none rounded-b-2xl" />
                </div>
              </div>
            </div>
          );
        })}

        {/* Scroll hint */}
        <div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 transition-opacity duration-300"
          style={{ opacity: activeIndex < TOTAL - 1 ? 0.5 : 0.1 }}
        >
          <div className="w-4 h-7 rounded-full border border-white/15 flex items-start justify-center p-0.5">
            <div className="w-1 h-1.5 rounded-full bg-white/50 animate-float" />
          </div>
          <span className="text-[8px] uppercase tracking-[0.25em] text-white/20 font-medium">
            {t("services.scroll")}
          </span>
        </div>

        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none z-[5] opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════
   Mobile — Lightweight fade transitions
   ═══════════════════════════════════════════ */
const MobileServices = () => {
  const { t } = useTranslation();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardsRef.current[i] = el;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 30, autoAlpha: 0 },
          {
            y: 0, autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="relative py-14 overflow-hidden" style={{ background: "#0A0A0A" }}>
      <div className="px-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono text-white/25">[02]</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-medium">{t("services.label")}</span>
        </div>
        <h2 className="text-3xl font-display font-extrabold tracking-tighter text-white mb-8">
          {t("services.heading")}
        </h2>
        <div className="space-y-5">
          {Array.from({ length: TOTAL }).map((_, i) => {
            const title = t(`services.items.${i}.title`);
            const desc = t(`services.items.${i}.description`);
            const num = String(i + 1).padStart(2, "0");
            return (
              <div key={i} ref={(el) => setCardRef(el, i)} style={{ visibility: "hidden" }}>
                <Link to={SERVICE_LINKS[i]} className="block group active:scale-[0.98] transition-transform duration-200">
                  <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[16/10]">
                    <img src={SERVICE_IMAGES[i]} alt={title} loading={i < 2 ? "eager" : "lazy"} decoding="async" className="w-full h-full object-cover" width={1280} height={960} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-mono text-white/40">{num}</span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-display font-bold text-white tracking-tight mb-0.5">{title}</h3>
                      <p className="text-[13px] text-white/35 leading-relaxed line-clamp-2">{desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/15 flex-shrink-0 mt-1" />
                  </div>
                </Link>
              </div>
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
