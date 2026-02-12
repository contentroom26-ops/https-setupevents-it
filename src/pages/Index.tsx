import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import StorySection from "@/components/StorySection";
import MethodSection from "@/components/MethodSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";

import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Marquee text="CORPORATE EVENTS — BRAND ACTIVATION — HOSTESS STEWARD & PUBLIC RELATIONS FOR EVENTS" />
      <StorySection />
      <MethodSection />
      <Marquee text="SERVICES — EVENTS — PRODUCTION — HOSTESS — PR — AV" />
      <ServicesSection />
      <PortfolioSection />
      
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
