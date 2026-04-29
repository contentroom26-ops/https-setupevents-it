import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageContent from "@/components/ContactPageContent";

const Contatti = () => {
  useEffect(() => {
    document.title = "Contatti — SetupEvents | Ottieni un preventivo";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Parliamo del tuo progetto. Scrivici, chiamaci o prenota una call: ti rispondiamo entro 24 ore.");
  }, []);

  return (
    <div className="min-h-screen relative bg-background overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-60"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.18) 0%, transparent 55%)",
          }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[60vh] opacity-40"
          style={{
            background: "conic-gradient(from 180deg at 50% 0%, transparent 0deg, hsl(var(--primary) / 0.08) 60deg, transparent 120deg, hsl(var(--primary) / 0.06) 240deg, transparent 360deg)",
            filter: "blur(60px)",
          }} />
        <div className="absolute inset-0 grain opacity-25" aria-hidden />
      </div>

      <Navbar />
      <main className="relative">
        <ContactPageContent />
      </main>
      <Footer />
    </div>
  );
};

export default Contatti;
