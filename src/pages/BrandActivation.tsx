import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect } from "react";
import serviceImage from "@/assets/service-brand.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  "Lancio prodotti e brand experience a Firenze",
  "Pop-up store e temporary space con allestimenti su misura",
  "Sampling e guerrilla marketing con promoter professionisti",
  "Attivazioni in-store e out-of-store",
  "Experiential marketing con hostess e steward dedicati",
  "Campagne di engagement per eventi VIP",
];

const BrandActivation = () => {
  useEffect(() => {
    document.title = "Brand Activation Firenze | Lancio Prodotti e Promoter Eventi | SetupEvents";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Brand activation e lancio prodotti a Firenze. Servizio promoter per eventi e VIP, hostess professionali, allestimenti creativi e campagne di engagement. SetupEvents, la tua agenzia eventi in Toscana.");
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
              Brand Activation <span className="text-muted-foreground">a Firenze</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground/90 mb-6">
              Lancio prodotti, promoter e esperienze immersive per il tuo brand
            </h2>
            <p className="text-lg md:text-xl text-foreground/85 leading-[1.75] mb-6 max-w-2xl">
              Creiamo esperienze immersive che connettono il tuo brand al pubblico. Dall'ideazione alla realizzazione, ogni attivazione è progettata per generare impatto, engagement e ricordi indimenticabili a Firenze e in tutta la Toscana.
            </p>
            <p className="text-base md:text-[17px] text-foreground/75 leading-[1.75] mb-12 max-w-2xl">
              Il nostro <strong className="text-foreground/95">servizio promoter per eventi e VIP</strong> garantisce personale selezionato e formato per rappresentare al meglio il tuo marchio. Dalle feste private ai lanci prodotto, dagli allestimenti creativi alle campagne street marketing, SetupEvents trasforma ogni brand activation in un successo misurabile.
            </p>

            <h3 className="text-lg font-display font-bold text-foreground/85 mb-6 uppercase tracking-wider">Cosa include il nostro servizio</h3>
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

export default BrandActivation;
