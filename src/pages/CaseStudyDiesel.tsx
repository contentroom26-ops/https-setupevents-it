import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const ease = [0.22, 1, 0.36, 1] as const;

const coverImage = new URL("@/assets/diesel-card.jpg", import.meta.url).href;
const gallery = [
  new URL("@/assets/diesel-9.jpg", import.meta.url).href,
  new URL("@/assets/diesel-1.jpg", import.meta.url).href,
  new URL("@/assets/diesel-event-13.jpg", import.meta.url).href,
  new URL("@/assets/diesel-event-9.jpg", import.meta.url).href,
];

const tags = ["Brand Event", "PR Strategiche", "Hostess & Steward", "Audio-Video"];

const stats = [
  { label: "Anno", value: "2024" },
  { label: "Location", value: "Store Diesel, Firenze" },
  { label: "Formato", value: "Serata esclusiva" },
  { label: "Servizi", value: "PR · Hostess · AV" },
];

const CaseStudyDiesel = () => {
  useEffect(() => {
    document.title = "Case Study Diesel Firenze 2024 | SetupEvents";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Evento esclusivo nello store Diesel di Firenze: PR strategiche, selezione ospiti, hostess professionali e service audio-video completo. Case study SetupEvents 2024.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero cover */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <motion.img
          src={coverImage}
          alt="Diesel Brand Event Firenze 2024"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Back link */}
        <motion.div
          className="absolute top-32 left-0 right-0 container-custom"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-sm uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Portfolio
          </Link>
        </motion.div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-3 block">
              Case Study · 2024
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter text-white leading-[1] mb-4">
              Diesel
            </h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/15 text-white/60 bg-white/[0.04]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">{s.label}</p>
                <p className="text-sm font-semibold text-white/90">{s.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-custom py-16 md:py-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
            Un'esperienza di brand dal forte impatto
          </h2>
          <p className="text-base md:text-lg text-white/75 leading-[1.8]">
            Diesel ci ha affidato la gestione completa di una serata esclusiva all'interno del proprio store fiorentino.
            L'obiettivo era chiaro: creare un momento di connessione autentica tra il brand e un pubblico selezionato,
            in un'atmosfera che rispecchiasse l'identità bold e anticonformista di Diesel.
          </p>
          <p className="text-base md:text-lg text-white/75 leading-[1.8]">
            Il nostro team ha curato le <strong className="text-white/95">PR strategiche</strong> e la selezione degli
            ospiti, garantendo una guest list in linea con il posizionamento del brand. Le hostess professionali hanno
            accolto e accompagnato ogni invitato, mentre il <strong className="text-white/95">service audio-video
            completo</strong> ha esaltato l'atmosfera dello spazio, trasformando lo store in un palcoscenico.
          </p>
          <p className="text-base md:text-lg text-white/75 leading-[1.8]">
            Il risultato: una serata memorabile che ha rafforzato la brand perception di Diesel a Firenze,
            generando contenuti organici e conversazioni che hanno continuato a circolare nei giorni successivi all'evento.
          </p>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="container-custom pb-16 md:pb-24">
        <motion.h3
          className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          Galleria
        </motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              className="aspect-[3/4] rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <img
                src={src}
                alt={`Diesel event Firenze 2024 — foto ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next case study */}
      <section className="border-t border-white/[0.06]">
        <div className="container-custom py-12">
          <Link
            to="/case-study/mediolanum"
            className="group flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Prossimo case study</p>
              <p className="text-2xl md:text-3xl font-display font-extrabold text-white group-hover:text-primary transition-colors tracking-tight">
                Mediolanum
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-white/30 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
          </Link>
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
