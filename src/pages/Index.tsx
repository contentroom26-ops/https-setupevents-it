import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SideAccent from "@/components/SideAccent";
import StackSection from "@/components/StackSection";


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
    <div className="min-h-screen" style={{ background: introDone ? "hsl(var(--background))" : "#000" }}>
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

      {/* Hero — highest z, slides away first */}
      <StackSection zIndex={60}>
        <HeroSection onIntroComplete={handleIntroComplete} />
      </StackSection>

      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: "opacity 0.5s ease",
          visibility: introDone ? "visible" : "hidden",
        }}
      >
        

        <Suspense fallback={null}>
          <StackSection zIndex={50}>
            <StorySection />
          </StackSection>

          <Marquee />

          <StackSection zIndex={30}>
            <ServicesSection />
          </StackSection>

          <StackSection zIndex={20}>
            <PortfolioSection />
          </StackSection>

          <StackSection zIndex={10}>
            <ContactSection />
          </StackSection>

          <Footer />
          <WhatsAppButton />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
