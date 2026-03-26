import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SplashScreen from "@/components/SplashScreen";
import SideAccent from "@/components/SideAccent";

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
    <div className="min-h-screen bg-background">
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <div style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.4s ease" }}>
        <Navbar />
        <SideAccent />
        <HeroSection ready={splashDone} />
        <Suspense fallback={null}>
          <StorySection />
          <Marquee />
          <ServicesSection />
          <PortfolioSection />
          <ContactSection />
          <Footer />
          <WhatsAppButton />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
