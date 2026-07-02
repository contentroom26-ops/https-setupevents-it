import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect } from "react";
import cover from "@/assets/diesel-card.jpg";
import shot1 from "@/assets/diesel-event-1.jpg";
import shot2 from "@/assets/diesel-event-4.jpg";
import shot3 from "@/assets/diesel-event-7.jpg";
import shot4 from "@/assets/diesel-event-11.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const highlights = [
  "Direzione artistica e concept della serata",
  "PR strategiche e selezione ospiti VIP",
  "Hostess e steward professionali multilingue",
  "Service audio-video completo",
  "Coordinamento fornitori e regia on-site",
  "Reportage fotografico e video",
];

const CaseStudyDiesel = () => {
  useEffect(() => {
    document.title = "Case Study Diesel — Fashion Night Firenze | SetupEvents";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Fashion Night Diesel a Firenze: PR, hostess, allestimenti e produzione audio-video per un evento di brand activation ad alto impatto.");
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 relative grain">
        <div className="container-custom">
          <Link to="/#portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Case Studies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start mb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4 block">Case Study — 2024</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter leading-[1.05] mb-6">
                Diesel <span className="text-muted-foreground">Fashion Night</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/85 leading-[1.75] mb-6">
                Evento esclusivo nello store Diesel di Firenze: una serata di brand activation curata in ogni dettaglio, con selezione ospiti, hostess professionali e service audio-video dedicato.
              </p>
              <p className="text-base text-foreground/75 leading-[1.75] mb-8">
                Ci siamo occupati dell'intera regia dell'evento — dalla comunicazione con la stampa alla gestione degli invitati — trasformando lo store in un palcoscenico immersivo per il brand.
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
                Realizza un evento come questo
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease }} className="lg:sticky lg:top-32">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-white/[0.06]">
                <img src={cover} alt="Diesel Fashion Night Firenze" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[shot1, shot2, shot3, shot4].map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease }} className="aspect-square rounded-xl overflow-hidden">
                <img src={src} alt={`Diesel event photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
              </motion.div>
            ))}
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

export default CaseStudyDiesel;
