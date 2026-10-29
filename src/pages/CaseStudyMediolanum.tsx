import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const ease = [0.22, 1, 0.36, 1] as const;

const coverImage = new URL("@/assets/mediolanum-card.webp", import.meta.url).href;
const nextCoverImage = new URL("@/assets/distretto12-card.webp", import.meta.url).href;
const gallery = [
  new URL("@/assets/mediolanum-1.webp", import.meta.url).href,
  new URL("@/assets/mediolanum-2.webp", import.meta.url).href,
  new URL("@/assets/mediolanum-3.webp", import.meta.url).href,
  new URL("@/assets/mediolanum-4.webp", import.meta.url).href,
];

const tags = ["Convention Aziendale", "Allestimento Scenografico", "Audio-Video & Streaming", "Hostess & Steward"];

const stats = [
  { label: "Anno", value: "2025" },
  { label: "Invitati", value: "120" },
  { label: "Formato", value: "Convention aziendale" },
  { label: "Servizi", value: "Location · AV · Hostess" },
];

const CaseStudyMediolanum = () => {
  useEffect(() => {
    document.title = "Case Study Banca Mediolanum 2025 | SetupEvents";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Convention aziendale per Banca Mediolanum con 120 invitati: scouting location, allestimento scenografico, coordinamento relatori, hostess e steward, produzione audio-video e live streaming. SetupEvents 2025.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero + Stats insieme in 100svh */}
      <div className="min-h-[100svh] flex flex-col">

        {/* Hero */}
        <section className="relative flex-1 overflow-hidden">
          <motion.img
            src={coverImage}
            alt="Convention Banca Mediolanum Firenze 2025"
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
                  Case Study · 2025
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-display font-extrabold tracking-tighter text-white leading-[1] mb-6">
                  Mediolanum
                </h1>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/20 text-white/70 bg-white/[0.06]"
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
                    Una convention aziendale da 120 invitati, gestita in ogni dettaglio
                  </h2>
                  <p className="text-sm md:text-base text-white/75 leading-[1.8]">
                    Banca Mediolanum ci ha scelti per organizzare una convention aziendale di alto profilo destinata a
                    120 invitati tra consulenti finanziari, partner e ospiti istituzionali.
                  </p>
                  <p className="text-sm md:text-base text-white/75 leading-[1.8]">
                    Abbiamo gestito l'intero processo: dallo <strong className="text-white/95">scouting della location</strong> alla
                    definizione del layout scenografico, dal <strong className="text-white/95">coordinamento dei relatori</strong> alla
                    gestione dell'accoglienza con hostess e steward professionali. La produzione
                    <strong className="text-white/95"> audio-video completa</strong> ha permesso di
                    amplificare la portata dell'evento.
                  </p>
                  <p className="text-sm md:text-base text-white/75 leading-[1.8]">
                    Il risultato è stato un evento fluido, professionale e memorabile — all'altezza del posizionamento
                    premium di Banca Mediolanum e delle aspettative di un pubblico esigente.
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
                  <p className="text-xs uppercase tracking-[0.3em] text-white/55 mb-1">{s.label}</p>
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
          className="text-xs uppercase tracking-[0.3em] text-white/55 mb-8"
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
                alt={`Convention Mediolanum Firenze 2025 — foto ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next case study — banner con immagine copertina */}
      <Link to="/case-study/distretto-12" className="block group">
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={nextCoverImage}
            alt="Distretto 12 — prossimo case study"
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
            <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-3">Prossimo case study</p>
            <p className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tighter group-hover:text-primary transition-colors duration-300">
              Distretto 12
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

export default CaseStudyMediolanum;
