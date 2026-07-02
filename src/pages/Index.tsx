import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SectionReveal from "@/components/SectionReveal";


const StorySection = lazy(() => import("@/components/StorySection"));
const Marquee = lazy(() => import("@/components/Marquee"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));

const Index = () => {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroDone(true), []);
  const location = useLocation();
  const scrollTarget = (location.state as { scrollTo?: string } | null)?.scrollTo;

  // Se arriviamo dalla navbar di un'altra pagina, salta l'intro per scrollare subito.
  useEffect(() => {
    if (scrollTarget) setIntroDone(true);
  }, [scrollTarget]);

  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (!scrollTarget) window.scrollTo(0, 0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [introDone, scrollTarget]);

  // Dopo il mount delle sezioni, scrolla alla sezione richiesta (con retry per il lazy-load).
  useEffect(() => {
    if (!introDone || !scrollTarget) return;
    let attempts = 0;
    const tryScroll = () => {
      const el = scrollTarget === "#"
        ? document.body
        : (document.querySelector(scrollTarget) as HTMLElement | null);
      if (el && scrollTarget !== "#") {
        const navEl = document.querySelector("nav") as HTMLElement | null;
        const navH = navEl?.getBoundingClientRect().height ?? (window.innerWidth >= 768 ? 112 : 96);
        const top = el.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        window.history.replaceState({}, "");
      } else if (scrollTarget === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState({}, "");
      } else if (attempts++ < 30) {
        setTimeout(tryScroll, 100);
      }
    };
    // Piccolo delay per permettere il render iniziale del Suspense.
    const id = setTimeout(tryScroll, 80);
    return () => clearTimeout(id);
  }, [introDone, scrollTarget]);

  return (
    <div className="min-h-screen" style={{ background: introDone ? "transparent" : "#000" }}>
      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: introDone ? "auto" : "none",
        }}
      >
        <Navbar />
        <SideAccent />
      </div>

      <HeroSection onIntroComplete={handleIntroComplete} />

      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: "opacity 0.5s ease",
          visibility: introDone ? "visible" : "hidden",
        }}
      >
        <Suspense fallback={null}>
          {/* Story — clip reveal */}
          <SectionReveal variant="clip-up">
            <StorySection />
          </SectionReveal>

          <Marquee />

          {/* Services — zoom in */}
          <SectionReveal variant="zoom">
            <ServicesSection />
          </SectionReveal>

          {/* Portfolio — blur reveal */}
          <SectionReveal variant="blur">
            <PortfolioSection />
          </SectionReveal>

          {/* Contact — slide from right */}
          <SectionReveal variant="slide-left">
            <ContactSection />
          </SectionReveal>

          <Footer />
          <WhatsAppButton />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
