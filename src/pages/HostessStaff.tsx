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
  "Hostess e steward per eventi corporate a Firenze",
  "Personale per fiere, congressi e convention in Toscana",
  "Staff per brand activation, sampling e lancio prodotti",
  "Receptionist e accoglienza VIP per eventi esclusivi",
  "Promoter multilingue per eventi internazionali",
  "Formazione e briefing personalizzati per ogni evento",
];

const HostessStaff = () => {
  useEffect(() => {
    document.title = "Servizio Hostess e Steward Firenze | Promoter per Eventi e VIP | SetupEvents";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Servizio hostess e steward a Firenze per eventi aziendali, fiere e feste private. Promoter professionisti per eventi VIP e brand activation. Staff selezionato e formato da SetupEvents.");
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 relative grain">
        <div className="container-custom">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="max-w-4xl">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4 block">Servizio</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter leading-[1.05] mb-8">
              Servizio Hostess, <span className="text-muted-foreground">Steward e Promoter</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground/90 mb-6">
              Personale qualificato per eventi aziendali, fiere e feste private a Firenze
            </h2>
            <p className="text-lg md:text-xl text-foreground/85 leading-[1.75] mb-6 max-w-2xl">
              Il volto del tuo evento. Selezioniamo, formiamo e coordiniamo hostess, steward e promoter che rappresentano il tuo brand con professionalità, eleganza e competenza in ogni occasione a Firenze.
            </p>
            <p className="text-base md:text-[17px] text-foreground/75 leading-[1.75] mb-12 max-w-2xl">
              Il nostro <strong className="text-foreground/95">servizio hostess e steward a Firenze</strong> è pensato per chi cerca personale altamente qualificato per eventi aziendali, feste private, fiere e brand activation. Ogni membro dello staff è selezionato con cura e formato per garantire un'accoglienza impeccabile. Offriamo anche un <strong className="text-foreground/95">servizio promoter per eventi e VIP</strong> dedicato, con professionisti multilingue pronti a valorizzare il tuo marchio.
            </p>

            <h3 className="text-lg font-display font-bold text-foreground/85 mb-6 uppercase tracking-wider">Il nostro servizio di staffing per eventi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
              {features.map((f, i) => (
                <motion.div key={f} className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08, ease }}>
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/95 leading-relaxed">{f}</span>
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

export default HostessStaff;
