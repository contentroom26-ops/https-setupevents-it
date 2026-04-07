import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
   Conversion CTA Block (end of section)
   ═══════════════════════════════════════════ */
const ConversionBlock = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!, { y: 40, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ref.current!, start: "top 80%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="py-20 px-5 lg:px-0" style={{ visibility: "hidden" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl lg:text-4xl font-display font-extrabold tracking-tight text-white mb-4 leading-tight">
          {t("services.endHeading")}
        </h3>
        <p className="text-base lg:text-lg text-white/45 mb-8 max-w-xl mx-auto">
          {t("services.endSubtext")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 transition-all duration-300 group"
          >
            {t("services.endCta")}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
        <p className="text-[13px] text-white/25 mt-6 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {t("services.socialProof")}
        </p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   Desktop — GSAP ScrollTrigger driven
   ═══════════════════════════════════════════ */
const DesktopServices = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const layersRef = useRef<(HTMLElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const setLayerRef = useCallback((el: HTMLElement | null, i: number) => {
    layersRef.current[i] = el;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stickyWrap = section.querySelector(".svc-sticky-wrap") as HTMLElement;
    if (!stickyWrap) return;

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
          gsap.set(imgEl, { scale: 1.05, autoAlpha: 0 });
          gsap.set(numEl, { y: 15, autoAlpha: 0 });
        }
      });

      const UNIT = 1;
      const tl = gsap.timeline();

      for (let i = 0; i < TOTAL; i++) {
        const current = layers[i];
        const next = layers[i + 1];
        const baseTime = i * UNIT;
        tl.addLabel(`svc${i}`, baseTime);

        if (next) {
          const exitStart = baseTime + UNIT * 0.65;
          const exitDur = UNIT * 0.15;

          tl.to(current.querySelector(".svc-text")!, { y: -25, autoAlpha: 0, duration: exitDur, ease: "power2.in" }, exitStart);
          tl.to(current.querySelector(".svc-img")!, { scale: 0.97, autoAlpha: 0, duration: exitDur, ease: "power2.in" }, exitStart);
          tl.to(current.querySelector(".svc-num")!, { y: -10, autoAlpha: 0, duration: exitDur, ease: "power2.in" }, exitStart);
          tl.to(current, { autoAlpha: 0, duration: exitDur * 0.6, ease: "none" }, exitStart + exitDur * 0.4);

          const enterStart = exitStart + exitDur;
          const enterDur = UNIT * 0.2;

          tl.set(next, { autoAlpha: 1 }, enterStart);
          tl.fromTo(next.querySelector(".svc-num")!, { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: enterDur * 0.7, ease: "power2.out" }, enterStart);
          tl.fromTo(next.querySelector(".svc-text")!, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: enterDur, ease: "power2.out" }, enterStart + enterDur * 0.1);
          tl.fromTo(next.querySelector(".svc-img")!, { scale: 1.05, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: enterDur, ease: "power2.out" }, enterStart + enterDur * 0.05);
        }
      }

      tl.addLabel("end", TOTAL * UNIT);

      ScrollTrigger.create({
        trigger: stickyWrap,
        start: "top top",
        end: `+=${TOTAL * 55}%`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        animation: tl,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * TOTAL), TOTAL - 1);
          setActiveIndex(idx);
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });

      // Subtle parallax
      layers.forEach((layer) => {
        const inner = layer?.querySelector(".svc-img-inner");
        if (!inner) return;
        gsap.to(inner, {
          yPercent: 6, ease: "none",
          scrollTrigger: { trigger: stickyWrap, start: "top top", end: `+=${TOTAL * 55}%`, scrub: true },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" aria-label={t("services.seoHeading")} style={{ background: "#0A0A0A" }}>
      {/* Hidden SEO heading */}
      <h2 className="sr-only">{t("services.seoHeading")}</h2>

      {/* Sticky scroll area */}
      <div className="svc-sticky-wrap h-screen" style={{ overflow: "clip" }}>
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-30 bg-white/5">
          <div ref={progressRef} className="h-full bg-primary origin-left" style={{ transform: "scaleX(0)", willChange: "transform" }} />
        </div>

        {/* Section label */}
        <div className="absolute top-7 left-16 xl:left-24 z-20 flex items-center gap-3">
          <span className="text-[10px] font-mono text-white/25">[02]</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-medium">{t("services.label")}</span>
        </div>

        {/* Counter */}
        <div className="absolute top-7 right-10 z-20 flex items-center gap-2">
          <div className="h-7 overflow-hidden relative w-7">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div key={i} className="absolute inset-0 flex items-center justify-center text-xl font-display font-extrabold text-primary tabular-nums"
                style={{ transform: `translateY(${(i - activeIndex) * 100}%)`, transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            ))}
          </div>
          <span className="text-white/15 text-sm font-mono">/</span>
          <span className="text-white/15 text-sm font-mono">{String(TOTAL).padStart(2, "0")}</span>
        </div>

        {/* Progress dots */}
        <nav className="absolute left-7 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center" aria-label="Service navigation">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="rounded-full transition-all duration-400"
                style={{
                  width: activeIndex === i ? 10 : 5, height: activeIndex === i ? 10 : 5,
                  backgroundColor: activeIndex === i ? "hsl(0 85% 55%)" : "transparent",
                  border: `1px solid ${activeIndex === i ? "hsl(0 85% 55%)" : "hsl(0 0% 25%)"}`,
                  boxShadow: activeIndex === i ? "0 0 10px hsl(0 85% 55% / 0.4)" : "none",
                }}
              />
              {i < TOTAL - 1 && (
                <div className="w-px h-7 bg-white/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full bg-primary transition-all duration-400" style={{ height: i < activeIndex ? "100%" : "0%" }} />
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Service layers */}
        {Array.from({ length: TOTAL }).map((_, i) => {
          const title = t(`services.items.${i}.title`);
          const seoTitle = t(`services.items.${i}.seoTitle`);
          const desc = t(`services.items.${i}.description`);
          const seoCopy = t(`services.items.${i}.seoCopy`);
          const imageAlt = t(`services.items.${i}.imageAlt`);
          const cats: string[] = t(`services.items.${i}.categories`, { returnObjects: true }) as string[];
          const num = String(i + 1).padStart(2, "0");

          return (
            <article key={i} ref={(el) => setLayerRef(el, i)} className="absolute inset-0 flex" style={{ visibility: "hidden" }}>
              {/* LEFT — Text */}
              <div className="w-[42%] flex flex-col justify-center pl-16 xl:pl-24 pr-8 relative z-10">
                <span className="svc-num text-[7rem] xl:text-[9rem] font-display font-black leading-none text-white/[0.025] absolute -top-2 -left-2 select-none pointer-events-none" aria-hidden="true">
                  {num}
                </span>
                <div className="svc-text">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-primary font-mono text-sm font-bold">{num}</span>
                    <div className="w-10 h-px bg-primary/40" />
                  </div>
                  <h3 className="text-3xl xl:text-[2.8rem] font-display font-extrabold tracking-tight text-white mb-2 leading-[1.08]">
                    {title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-primary/60 font-medium mb-5">{seoTitle}</p>
                  <p className="text-[15px] xl:text-base text-white/50 leading-relaxed mb-4 max-w-sm">
                    {desc}
                  </p>
                  <p className="text-[12px] text-white/25 italic mb-6">{seoCopy}</p>
                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {cats.map((cat) => (
                      <span key={cat} className="text-[11px] px-3.5 py-1 rounded-full border border-white/[0.08] text-white/35 font-medium">{cat}</span>
                    ))}
                  </div>
                  {/* Trust microcopy */}
                  <p className="text-[11px] text-white/20 mb-5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-primary/40" />
                    {t("services.trustLine")}
                  </p>
                  {/* CTAs */}
                  <div className="flex items-center gap-4">
                    <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:brightness-110 transition-all duration-300 group">
                      {t("services.ctaQuote")}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <Link to={SERVICE_LINKS[i]} className="inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors duration-300 group">
                      <span className="relative">
                        {t("services.learnMore")}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT — Image */}
              <div className="w-[58%] flex items-center justify-center p-5 xl:p-8">
                <figure className="svc-img relative w-full h-[72vh] max-h-[680px] rounded-2xl overflow-hidden">
                  <div className="svc-img-inner w-full h-full">
                    <img
                      src={SERVICE_IMAGES[i]}
                      alt={imageAlt}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover rounded-2xl"
                      width={1280}
                      height={960}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent pointer-events-none rounded-b-2xl" />
                  {/* Location label */}
                  <figcaption className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] text-white/30 bg-black/30 px-3 py-1 rounded-full font-medium">
                    {i % 2 === 0 ? "Florence Event" : "Italy Corporate Event"}
                  </figcaption>
                </figure>
              </div>
            </article>
          );
        })}

        {/* Scroll hint */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 transition-opacity duration-300"
          style={{ opacity: activeIndex < TOTAL - 1 ? 0.5 : 0.1 }}>
          <div className="w-4 h-7 rounded-full border border-white/15 flex items-start justify-center p-0.5">
            <div className="w-1 h-1.5 rounded-full bg-white/50 animate-float" />
          </div>
          <span className="text-[8px] uppercase tracking-[0.25em] text-white/20 font-medium">{t("services.scroll")}</span>
        </div>

        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none z-[5] opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* Conversion block after scroll */}
      <ConversionBlock />
    </section>
  );
};

/* ═══════════════════════════════════════════
   Mobile — SEO-optimized cards
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
        gsap.fromTo(card, { y: 30, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" aria-label={t("services.seoHeading")} className="relative py-14 overflow-hidden" style={{ background: "#0A0A0A" }}>
      <h2 className="sr-only">{t("services.seoHeading")}</h2>
      <div className="px-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono text-white/25">[02]</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-medium">{t("services.label")}</span>
        </div>
        <h3 className="text-3xl font-display font-extrabold tracking-tighter text-white mb-2">{t("services.heading")}</h3>
        <p className="text-[13px] text-white/30 mb-8 flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-primary/40" />
          {t("services.socialProof")}
        </p>

        <div className="space-y-6">
          {Array.from({ length: TOTAL }).map((_, i) => {
            const title = t(`services.items.${i}.title`);
            const seoTitle = t(`services.items.${i}.seoTitle`);
            const desc = t(`services.items.${i}.description`);
            const imageAlt = t(`services.items.${i}.imageAlt`);
            const num = String(i + 1).padStart(2, "0");

            return (
              <article key={i} ref={(el) => setCardRef(el, i)} style={{ visibility: "hidden" }}>
                <Link to={SERVICE_LINKS[i]} className="block group active:scale-[0.98] transition-transform duration-200">
                  <figure className="relative rounded-2xl overflow-hidden mb-3 aspect-[16/10]">
                    <img src={SERVICE_IMAGES[i]} alt={imageAlt} loading={i < 2 ? "eager" : "lazy"} decoding="async"
                      className="w-full h-full object-cover" width={1280} height={960} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-mono text-white/40">{num}</span>
                  </figure>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-display font-bold text-white tracking-tight mb-0.5">{title}</h4>
                      <p className="text-[11px] text-primary/50 uppercase tracking-wider mb-1">{seoTitle}</p>
                      <p className="text-[13px] text-white/35 leading-relaxed line-clamp-2">{desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/15 flex-shrink-0 mt-1" />
                  </div>
                </Link>
                {/* Mobile CTA per service */}
                {(i === 1 || i === 3 || i === 5) && (
                  <a href="#contact" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {t("services.ctaQuote")}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </article>
            );
          })}
        </div>

        {/* Mobile conversion block */}
        <div className="mt-12 pt-10 border-t border-white/[0.06] text-center">
          <h3 className="text-xl font-display font-extrabold text-white mb-3">{t("services.endHeading")}</h3>
          <p className="text-sm text-white/35 mb-6">{t("services.endSubtext")}</p>
          <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm">
            {t("services.endCta")}
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[11px] text-white/20 mt-4">{t("services.socialProof")}</p>
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
