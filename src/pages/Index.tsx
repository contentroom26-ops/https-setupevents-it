import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientsSection from "@/components/ClientsSection";
import ServicesSection from "@/components/ServicesSection";
import MethodSection from "@/components/MethodSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ImmersiveRoom from "@/components/ImmersiveRoom";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* 3D Immersive Background with interactive gallery */}
      <ImmersiveRoom />
      
      {/* Content overlay - reduced sections since gallery is now in 3D */}
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar />
        </div>
        <HeroSection />
        <div className="pointer-events-auto">
          <ClientsSection />
          <ServicesSection />
        </div>
        
        {/* Spacer for gallery viewing area */}
        <div className="h-[200vh]" />
        
        <div className="pointer-events-auto">
          <MethodSection />
          <WhyUsSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
      
      <WhatsAppButton />
    </div>
  );
};

export default Index;
