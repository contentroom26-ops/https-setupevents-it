import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SplashScreen from "@/components/SplashScreen";
import SideAccent from "@/components/SideAccent";
import FloatingSection from "@/components/FloatingSection";

// Lazy load below-the-fold sections
const StorySection = lazy(() => import("@/components/StorySection"));
const Marquee = lazy(() => import("@/components/Marquee"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  useEffect(() => {
    if (!splashDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [splashDone]);

  return (
    <div className="min-h-screen" style={{ background: splashDone ? "hsl(var(--background))" : "#fff" }}>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <div className="min-h-screen">
        <div
          style={{
            opacity: splashDone ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: splashDone ? "auto" : "none",
          }}
        >
          <Navbar />
          <SideAccent />
        </div>
        <HeroSection ready />
        <div
          style={{
            opacity: splashDone ? 1 : 0,
            transition: "opacity 0.5s ease",
            visibility: splashDone ? "visible" : "hidden",
          }}
        >
          <Suspense fallback={null}>
            {/* Spacer after hero */}
            <div className="h-16 md:h-24" />

            <FloatingSection id="storia">
              <StorySection />
            </FloatingSection>

            <div className="h-10 md:h-16" />

            <FloatingSection className="!bg-transparent !border-0 !shadow-none !backdrop-blur-0" noPadding>
              <Marquee />
            </FloatingSection>

            <div className="h-10 md:h-16" />

            <div id="services" className="mx-4 sm:mx-6 lg:mx-10">
              <ServicesSection />
            </div>

            <div className="h-10 md:h-16" />

            <FloatingSection id="portfolio">
              <PortfolioSection />
            </FloatingSection>

            <div className="h-10 md:h-16" />

            <FloatingSection id="contact">
              <ContactSection />
            </FloatingSection>

            <div className="h-10 md:h-16" />

            <Footer />
            <WhatsAppButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Index;
