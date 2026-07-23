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
const nextCoverImage = new URL("@/assets/mediolanum-card.jpg", import.meta.url).href;
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

      {/* Hero + Stats insieme in 100svh */}
      <div className="h-[100svh] flex flex-col">

        {/* Hero */}
        <section className="relative flex-1 overflow-hidden">
          <motion.img
            src={coverImage}
            alt="Diesel Brand Event Firenze 2024"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-black/40" />

          <div className="relative z-10 h-full flex flex-col">
            <motion.div
              className="container-custom pt-28 md:pt-32"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <Link
                to="/#portfolio"
                className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors text-sm uppercase tracking-widest"
              >
                <ArrowLeft className="w-4 h-4" /> Portfolio
              </Link>
            </motion.div>

            <div className="flex-1 container-custom grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-6 md:py-8 items-center">
              {/* Colonna sinistra */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease }}
                className="flex flex-col justify-center"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium mb-4 block">
                  Case Study · 2024
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-display font-extrabold tracking-tighter text-white leading-[1] mb-6">
                  Diesel
                </h1>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/20 text-white/70 bg-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Colonna destra */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease }}
              >
                <div
                  className="rounded-2xl p-5 md:p-7 space-y-3"
                  style={{
                    background: "rgba(10, 10, 10, 0.72)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <h2 className="text-lg md:text-xl font-display font-bold text-white tracking-tight">
                    Un'esperienza di brand dal forte impatto
                  </h2>
                  <p className="text-sm md:text-base text-white/75 leading-[1.8]">
                    Diesel ci ha affidato la gestione completa di una serata esclusiva nel proprio store
                    fiorentino. L'obiettivo era chiaro: creare un momento di connessione autentica tra il brand e un
                    pubblico selezionato, in un'atmosfera che rispecchiasse l'identità anticonformista di Diesel.
                  </p>
                  <p className="text-sm md:text-base text-white/75 leading-[1.8]">
                    Il nostro team ha curato le <strong className="text-white/95">PR strategiche</strong> e la selezione
                    degli ospiti, garantendo una guest list in linea con il posizionamento del brand. Il{" "}
                    <strong className="text-white/95">service audio-video completo</strong> ha esaltato l'atmosfera
                    dello spazio, trasformando lo store in un palcoscenico.
                  </p>
                  <p className="text-sm md:text-base text-white/75 leading-[1.8]">
                    Il risultato: una serata memorabile che ha rafforzato la brand perception di Diesel a Firenze,
                    generando contenuti organici e conversazioni che hanno continuato a circolare nei giorni successivi.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats bar — visibile nella prima viewport */}
        <section className="border-y border-white/[0.06] bg-white/[0.02] shrink-0">
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

      </div>

      {/* Gallery */}
      <section className="container-custom py-16 md:py-24">
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

      {/* Next case study — banner con immagine copertina */}
      <Link to="/case-study/mediolanum" className="block group">
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={nextCoverImage}
            alt="Mediolanum — prossimo case study"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-3">Prossimo case study</p>
            <p className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tighter group-hover:text-primary transition-colors duration-300">
              Mediolanum
            </p>
            <div className="mt-5 flex items-center gap-2 text-white/50 group-hover:text-primary transition-colors duration-300">
              <span className="text-xs uppercase tracking-[0.3em]">Scopri</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.div>
        </section>
      </Link>

      <div id="contact-form">
        <ContactSection />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CaseStudyDiesel;
