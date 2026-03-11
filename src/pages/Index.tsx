import { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import StorySection from "@/components/StorySection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  // Lock scroll during splash
  useEffect(() => {
    if (!splashDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Force scroll to top when splash completes
      window.scrollTo(0, 0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [splashDone]);

  return (
    <div className="min-h-screen bg-background">
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <div style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <Navbar />
        <HeroSection ready={splashDone} />
        <StorySection />
        <Marquee text="SERVICES — EVENTS — PRODUCTION — HOSTESS — PR — AV" />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default Index;
