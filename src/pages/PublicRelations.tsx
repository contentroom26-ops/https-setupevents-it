import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect } from "react";
import serviceImage from "@/assets/service-pr.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  "Media relations e ufficio stampa per eventi a Firenze",
  "Gestione contatti e networking strategico",
  "Relazioni istituzionali e guest management VIP",
  "Target mirato e stakeholder engagement",
  "Comunicazione strategica per eventi aziendali e feste private",
  "Coordinamento con influencer e KOL per brand activation",
];

const PublicRelations = () => {
  useEffect(() => {
    document.title = "Public Relations per Eventi Firenze | Guest Management VIP | SetupEvents";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Servizio di Public Relations per eventi a Firenze. Guest management VIP, networking strategico, media relations e comunicazione per eventi aziendali e feste private. Agenzia SetupEvents.");
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 relative grain">
        <div className="container-custom">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="max-w-4xl">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4 block">Servizio</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tighter leading-[1.05] mb-8">
              Public Relations <span className="text-muted-foreground">per Eventi</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground/90 mb-6">
              Networking, guest management VIP e comunicazione strategica a Firenze
            </h2>
            <p className="text-lg md:text-xl text-foreground/85 leading-[1.75] mb-6 max-w-2xl">
              Costruiamo relazioni che contano. Dalla gestione dei contatti stampa al networking strategico, posizioniamo il tuo brand davanti alle persone giuste, al momento giusto, nei migliori eventi a Firenze.
            </p>
            <p className="text-base md:text-[17px] text-foreground/75 leading-[1.75] mb-12 max-w-2xl">
              Le nostre <strong className="text-foreground/95">PR per eventi a Firenze</strong> coprono ogni aspetto della comunicazione: dall'organizzazione di eventi aziendali con guest list selezionate, alla gestione delle relazioni con media e influencer per brand activation e feste private esclusive. Il nostro team garantisce un servizio di hospitality VIP con hostess e steward professionali.
            </p>

            <h3 className="text-lg font-display font-bold text-foreground/85 mb-6 uppercase tracking-wider">I nostri servizi di PR per eventi</h3>
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
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease }} className="lg:sticky lg:top-32">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-white/[0.06]">
                <img src={serviceImage} alt="Public relations per eventi a Firenze" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
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

export default PublicRelations;
