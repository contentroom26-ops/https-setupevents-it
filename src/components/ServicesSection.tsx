import { useRef, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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

/* ─── Service Card ─── */
const ServiceCard = ({
  index, image, title, seoTitle, description, imageAlt, link, ctaLabel, learnMore,
}: {
  index: number; image: string; title: string; seoTitle: string;
  description: string; imageAlt: string; link: string; ctaLabel: string; learnMore: string;
}) => {
  const num = String(index + 1).padStart(2, "0");
  const isLarge = index === 0 || index === 3;

  return (
    <article
      className={`svc-card group relative overflow-hidden rounded-2xl cursor-pointer ${
        isLarge ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
      }`}
      style={{ visibility: "hidden" }}
    >
      <Link to={link} className="block relative w-full h-full min-h-[280px] md:min-h-[340px]">
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            width={1280}
            height={960}
          />
          {/* Default overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-500 group-hover:opacity-0" />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Number — top left */}
        <span className="absolute top-5 left-5 text-[11px] font-mono text-white/30 z-10 transition-colors duration-300 group-hover:text-primary">
          {num}
        </span>

        {/* Default state — bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0">
          <h3 className="text-lg md:text-xl font-display font-extrabold text-white tracking-tight leading-tight mb-1">
            {title}
          </h3>
          <p className="text-[11px] uppercase tracking-[0.15em] text-primary/60 font-medium">
            {seoTitle}
          </p>
        </div>

        {/* Hover state — centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary/70 font-semibold mb-3">{seoTitle}</span>
          <h3 className="text-xl md:text-2xl font-display font-extrabold text-white tracking-tight text-center mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-[13px] md:text-sm text-white/50 text-center leading-relaxed max-w-sm mb-5">
            {description}
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold hover:bg-white/15 transition-all"
              style={{ WebkitBackdropFilter: "blur(8px)" }}>
              {ctaLabel}
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Corner accent on hover */}
        <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <ArrowRight className="w-4 h-4 text-white/40 -rotate-45" />
        </div>
      </Link>
    </article>
  );
};

/* ─── Main Section ─── */
const ServicesSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(headingRef.current, { y: 40, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });
      }

      // Staggered card entrance
      const cards = section.querySelectorAll(".svc-card");
      cards.forEach((card, i) => {
        gsap.fromTo(card, { y: 50, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.7, ease: "power2.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      // CTA block
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { y: 40, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label={t("services.seoHeading")}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Hidden SEO heading */}
      <h2 className="sr-only">{t("services.seoHeading")}</h2>

      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      <div className="container-custom px-5 md:px-10 relative z-10">
        {/* Section header */}
        <div ref={headingRef} className="mb-14 md:mb-20" style={{ visibility: "hidden" }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono text-white/25">[02]</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-medium">{t("services.label")}</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter text-white leading-[1.05] mb-4 max-w-3xl">
            {t("services.heading")}
          </h3>
          <p className="text-sm md:text-base text-white/35 max-w-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary/40 flex-shrink-0" />
            {t("services.socialProof")}
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[280px] md:auto-rows-[260px]"
        >
          {Array.from({ length: TOTAL }).map((_, i) => (
            <ServiceCard
              key={i}
              index={i}
              image={SERVICE_IMAGES[i]}
              title={t(`services.items.${i}.title`)}
              seoTitle={t(`services.items.${i}.seoTitle`)}
              description={t(`services.items.${i}.description`)}
              imageAlt={t(`services.items.${i}.imageAlt`)}
              link={SERVICE_LINKS[i]}
              ctaLabel={t("services.learnMore")}
              learnMore={t("services.learnMore")}
            />
          ))}
        </div>

        {/* Conversion CTA */}
        <div ref={ctaRef} className="mt-20 md:mt-28 text-center" style={{ visibility: "hidden" }}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight text-white mb-4 leading-tight">
              {t("services.endHeading")}
            </h3>
            <p className="text-sm md:text-base text-white/40 mb-8 max-w-lg mx-auto">
              {t("services.endSubtext")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-sm hover:bg-white/15 hover:border-white/30 transition-all duration-400 group"
                style={{ WebkitBackdropFilter: "blur(12px)" }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("services.endCta")}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
            </div>
            <p className="text-[12px] text-white/20 mt-6 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t("services.trustLine")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
