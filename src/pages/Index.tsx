import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientsSection from "@/components/ClientsSection";
import ServicesSection from "@/components/ServicesSection";
import HostessSlideshow from "@/components/HostessSlideshow";
import MethodSection from "@/components/MethodSection";
import PortfolioSection from "@/components/PortfolioSection";
import WhyUsSection from "@/components/WhyUsSection";
import FinalCTASection from "@/components/FinalCTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ImmersiveRoom from "@/components/ImmersiveRoom";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* 3D Immersive Background */}
      <ImmersiveRoom />
      
      {/* Content overlay */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ClientsSection />
        <ServicesSection />
        <HostessSlideshow />
        <MethodSection />
        <PortfolioSection />
        <WhyUsSection />
        <FinalCTASection />
        <ContactSection />
        <Footer />
      </div>
      
      <WhatsAppButton />
    </div>
  );
};

export default Index;
