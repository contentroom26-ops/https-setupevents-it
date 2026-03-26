import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  "Convention e meeting aziendali a Firenze",
  "Cene di gala e celebrazioni corporate",
  "Team building esperienziali in Toscana",
  "Conferenze e summit con allestimenti professionali",
  "Anniversary e milestone aziendali",
  "Incentive e reward events con servizio hostess e steward",
];

const CorporateEvents = () => {
  useEffect(() => {
    document.title = "Eventi Aziendali Firenze | Convention, Meeting e Team Building | SetupEvents";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Organizziamo eventi aziendali a Firenze: convention, meeting, cene di gala, team building e conferenze. Servizio hostess e steward professionale. Allestimenti su misura per la tua azienda.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 relative grain">
        <div className="container-custom">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="max-w-4xl">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4 block">Servizio</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter leading-[1.05] mb-8">
              Eventi Aziendali <span className="text-muted-foreground">a Firenze</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground/70 mb-6">
              Convention, meeting e team building con allestimenti professionali
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              Trasformiamo ogni appuntamento aziendale in un'esperienza che rafforza il brand, motiva il team e lascia un'impressione duratura. Dalla convention per 500 persone alla cena esclusiva per il board, ogni evento aziendale a Firenze è curato nei minimi dettagli.
            </p>
            <p className="text-base text-muted-foreground/80 leading-relaxed mb-12 max-w-2xl">
              Il nostro servizio di <strong>organizzazione eventi aziendali a Firenze</strong> include la gestione completa: scouting location, allestimenti eventi personalizzati, servizio hostess e steward professionali, catering e produzione audio-video. Che si tratti di feste private aziendali o grandi convention, garantiamo un risultato impeccabile.
            </p>

            <h3 className="text-lg font-display font-bold text-foreground/60 mb-6 uppercase tracking-wider">I nostri servizi per eventi corporate</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
              {features.map((f, i) => (
                <motion.div key={f} className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08, ease }}>
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80">{f}</span>
                </motion.div>
              ))}
            </div>

            <a href="#contact-form" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
              Richiedi un preventivo gratuito
            </a>
          </motion.div>
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

export default CorporateEvents;
