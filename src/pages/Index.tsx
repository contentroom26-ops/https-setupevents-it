import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientsSection from "@/components/ClientsSection";
import ServicesSection from "@/components/ServicesSection";
import MethodSection from "@/components/MethodSection";
import PortfolioSection from "@/components/PortfolioSection";
import WhyUsSection from "@/components/WhyUsSection";
import FinalCTASection from "@/components/FinalCTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      <MethodSection />
      <PortfolioSection />
      <WhyUsSection />
      <FinalCTASection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
