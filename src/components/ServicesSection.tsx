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

/* ─── Service Row ─── */
const ServiceRow = ({
  index, image, title, seoTitle, description, link,
}: {
  index: number; image: string; title: string; seoTitle: string;
  description: string; link: string;
}) => {
  const num = String(index + 1).padStart(2, "0");
  const [hovered, setHovered] = useState(false);

  return (
    <article className="svc-row" style={{ visibility: "hidden" }}>
      <Link
        to={link}
        className="group relative block border-b border-white/[0.06] py-8 md:py-10 transition-colors duration-500 hover:bg-white/[0.02]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="container-custom px-5 md:px-10 flex items-center gap-6 md:gap-10">
          {/* Number */}
          <span className="text-[11px] font-mono text-primary/70 transition-colors duration-300 group-hover:text-primary w-6 flex-shrink-0">
            {num}
          </span>

          {/* Title — big & bold */}
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter text-white leading-[1.05] transition-colors duration-300 group-hover:text-primary">
              {title}
            </h3>
            {/* Description — appears on hover (desktop) / always visible (mobile) */}
            <p className="text-xs md:text-sm text-white/70 mt-2 max-w-md md:max-h-0 md:opacity-0 md:group-hover:max-h-20 md:group-hover:opacity-100 transition-all duration-500 overflow-hidden leading-relaxed">
              {description}
            </p>
          </div>

          {/* Image peek on hover — desktop only */}
          <div className="hidden md:block relative w-32 lg:w-44 h-20 lg:h-28 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={image}
              alt={seoTitle}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100"
              width={400}
              height={250}
            />
            <div className="absolute inset-0 bg-white/[0.03] border border-white/[0.06] rounded-lg group-hover:opacity-0 transition-opacity duration-500" />
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0">
            <ArrowRight className="w-5 h-5 text-white/15 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" />
          </div>
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
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current, { y: 30, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        });
      }

      const rows = section.querySelectorAll(".svc-row");
      rows.forEach((row, i) => {
        gsap.fromTo(row, { y: 30, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out",
          delay: i * 0.06,
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { y: 30, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.7, ease: "power2.out",
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
      className="relative py-14 md:py-20 overflow-hidden"
    >
      {/* Stronger overlay for legibility (matches Case Studies cards) */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm pointer-events-none" />

      <div className="relative z-[2]">
        <h2 className="sr-only">{t("services.seoHeading")}</h2>

        {/* Section header */}
        <div ref={headingRef} className="container-custom px-5 md:px-10 mb-10 md:mb-16" style={{ visibility: "hidden" }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono text-primary/80">[02]</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-semibold">{t("services.label")}</span>
            <div className="flex-1 h-px bg-primary/20" />
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter text-white leading-[1.05] max-w-3xl">
            {(() => {
              const words = t("services.heading").split(" ");
              const last = words.pop();
              return (
                <>
                  {words.join(" ")}{words.length ? " " : ""}
                  <span className="text-primary">{last}</span>
                </>
              );
            })()}
          </h3>
        </div>

        {/* Service list */}
        <div className="border-t border-white/[0.1]">
          {Array.from({ length: 6 }).map((_, i) => (
            <ServiceRow
              key={i}
              index={i}
              image={SERVICE_IMAGES[i]}
              title={t(`services.items.${i}.title`)}
              seoTitle={t(`services.items.${i}.seoTitle`)}
              description={t(`services.items.${i}.description`)}
              link={SERVICE_LINKS[i]}
            />
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="container-custom px-5 md:px-10 mt-20 md:mt-28 text-center" style={{ visibility: "hidden" }}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight text-white mb-4 leading-tight">
              {t("services.endHeading")}
            </h3>
            <p className="text-sm md:text-base text-white/75 mb-8 max-w-lg mx-auto">
              {t("services.endSubtext")}
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-primary/40 bg-primary/15 backdrop-blur-md text-white font-bold text-sm hover:bg-primary/25 hover:border-primary/60 transition-all duration-400 group"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("services.endCta")}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <p className="text-[12px] text-white/60 mt-6 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              {t("services.trustLine")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
