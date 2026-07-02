import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect } from "react";
import cover from "@/assets/distretto12-card.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const highlights = [
  "Direzione artistica del format",
  "PR strategiche e comunicazione",
  "Selezione ospiti VIP e guest management",
  "Hostess dedicate all'accoglienza",
  "Regia luci e audio professionale",
  "Identità visiva coordinata",
];

const CaseStudyDistretto12 = () => {
  useEffect(() => {
    document.title = "Case Study Distretto 12 — Private Club Firenze | SetupEvents";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Format esclusivo Distretto 12 a Firenze: direzione artistica, PR, guest management VIP, hostess e regia luci-audio per serate ad alta identità.");
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 relative grain">
        <div className="container-custom">
          <Link to="/#portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Case Studies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4 block">Case Study — 2025</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter leading-[1.05] mb-6">
                Distretto 12 <span className="text-muted-foreground">Private Club</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/85 leading-[1.75] mb-6">
                Format esclusivo a Firenze: direzione artistica, PR strategiche, selezione ospiti VIP e regia tecnica per serate con un'identità riconoscibile e un'atmosfera unica.
              </p>
              <p className="text-base text-foreground/75 leading-[1.75] mb-8">
                Un progetto continuativo di nightlife & hospitality dove ogni serata è concepita come un'esperienza immersiva, curata dal concept alla produzione on-site.
              </p>

              <h3 className="text-lg font-display font-bold text-foreground/85 mb-6 uppercase tracking-wider">Cosa abbiamo fatto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {highlights.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/95 leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>

              <a href="#contact-form" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
                Crea il tuo format esclusivo
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease }} className="lg:sticky lg:top-32">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-white/[0.06]">
                <img src={cover} alt="Distretto 12 Firenze" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <div id="contact-form">
        <ContactSection />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CaseStudyDistretto12;
