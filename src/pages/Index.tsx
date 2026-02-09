import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Corridor3D from "@/components/Corridor3D";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Full-screen 3D corridor with all content inside */}
      <Corridor3D />

      {/* Scroll spacer - creates page height for camera movement */}
      <div className="h-[700vh] pointer-events-none" />

      {/* Fixed overlays */}
      <Navbar />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
