import { useRef, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Lazy URL references — non finiscono nel bundle JS critico
const serviceCorporate = new URL("@/assets/service-corporate.webp", import.meta.url).href;
const serviceBrand = new URL("@/assets/service-brand.webp", import.meta.url).href;
const serviceHostess = new URL("@/assets/service-hostess.webp", import.meta.url).href;
const servicePR = new URL("@/assets/service-pr.webp", import.meta.url).href;
const serviceProduction = new URL("@/assets/service-production.webp", import.meta.url).href;
const serviceAV = new URL("@/assets/service-av.webp", import.meta.url).href;

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
        className="group relative block border-b border-white/[0.06] py-6 sm:py-8 md:py-10 transition-colors duration-500 hover:bg-white/[0.02]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="container-custom flex items-center gap-4 sm:gap-6 md:gap-10">
          <span className="text-[11px] font-mono text-white/45 transition-colors duration-300 group-hover:text-primary w-6 flex-shrink-0">
            {num}
          </span>

          <div className="flex-1 min-w-0">
            <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter text-white leading-[1.05] transition-colors duration-300 group-hover:text-white [text-rendering:optimizeLegibility] [-webkit-font-smoothing:antialiased] [transform:translateZ(0)]">
              {title}
            </h3>
            <p className="text-xs md:text-sm text-white/80 mt-2 max-w-md md:max-h-0 md:opacity-0 md:group-hover:max-h-20 md:group-hover:opacity-100 transition-all duration-500 overflow-hidden leading-relaxed">
              {description}
            </p>
          </div>

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

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current, { y: prefersReduced ? 0 : 16, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", force3D: true,
          scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
        });
      }

      const rows = section.querySelectorAll(".svc-row");
      rows.forEach((row, i) => {
        gsap.fromTo(row, { y: prefersReduced ? 0 : 18, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", force3D: true,
          delay: Math.min(i, 4) * 0.04,
          scrollTrigger: { trigger: row, start: "top 92%" },
        });
      });

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { y: prefersReduced ? 0 : 16, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", force3D: true,
          scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
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
      className="relative py-12 sm:py-14 md:py-20 overflow-hidden"
    >
      <h2 className="sr-only">{t("services.seoHeading")}</h2>

      <div ref={headingRef} className="container-custom mb-8 sm:mb-10 md:mb-16" style={{ visibility: "hidden" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono text-white/45">[02]</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">{t("services.label")}</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>
        <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter text-white leading-[1.05] max-w-3xl">
          {t("services.heading")}
        </h3>
      </div>

      <div className="border-t border-white/[0.06]">
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

      <div ref={ctaRef} className="container-custom mt-14 sm:mt-20 md:mt-28 text-center" style={{ visibility: "hidden" }}>
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight text-white mb-4 leading-tight">
            {t("services.endHeading")}
          </h3>
          <p className="text-sm md:text-base text-white/85 mb-8 max-w-lg mx-auto">
            {t("services.endSubtext")}
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-sm hover:bg-white/15 hover:border-white/30 transition-all duration-400 group"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("services.endCta")}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
          <p className="text-[12px] text-white/45 mt-6 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t("services.trustLine")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
