import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SideAccent from "@/components/SideAccent";
import SectionReveal from "@/components/SectionReveal";
import SectionDivider from "@/components/SectionDivider";

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

  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [introDone]);

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

          <SectionDivider style="line" />

          <Marquee />

          <SectionDivider style="dot" />

          {/* Services — zoom in */}
          <SectionReveal variant="zoom">
            <ServicesSection />
          </SectionReveal>

          <SectionDivider style="glow" />

          {/* Portfolio — blur reveal */}
          <SectionReveal variant="blur">
            <PortfolioSection />
          </SectionReveal>

          <SectionDivider style="line" />

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
