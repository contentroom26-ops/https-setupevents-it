import { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SplashScreen from "@/components/SplashScreen";
import SideAccent from "@/components/SideAccent";
import Marquee from "@/components/Marquee";
import ScrollDissolve from "@/components/ScrollDissolve";

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
        <ScrollDissolve />
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
