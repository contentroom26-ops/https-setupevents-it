import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import MethodSection from "@/components/MethodSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Corridor3D from "@/components/Corridor3D";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Fixed 3D corridor background */}
      <Corridor3D />
      
      {/* Scrollable content on top */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <StorySection />
        <MethodSection />
        <ServicesSection />
        <PortfolioSection />
        <WhyUsSection />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default Index;
