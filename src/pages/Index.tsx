import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientsSection from "@/components/ClientsSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import MethodSection from "@/components/MethodSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      <PortfolioSection />
      <MethodSection />
      <WhyUsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
