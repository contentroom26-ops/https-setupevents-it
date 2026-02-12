import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  "Hostess e steward per eventi corporate",
  "Personale per fiere e congressi",
  "Staff per brand activation e sampling",
  "Receptionist e accoglienza VIP",
  "Promoter multilingue",
  "Formazione e briefing personalizzati",
];

const HostessStaff = () => (
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
            Hostess <span className="text-muted-foreground">e Staff</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl">
            Il volto del tuo evento. Selezioniamo, formiamo e coordiniamo personale qualificato che rappresenta il tuo brand con professionalità, eleganza e competenza.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {features.map((f, i) => (
              <motion.div key={f} className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08, ease }}>
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground/80">{f}</span>
              </motion.div>
            ))}
          </div>

          <Link to="/#contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
            Richiedi un preventivo
          </Link>
        </motion.div>
      </div>
    </section>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default HostessStaff;
