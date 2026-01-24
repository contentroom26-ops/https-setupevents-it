import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import AnimatedHeroBackground from "./AnimatedHeroBackground";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/393XXXXXXXXX?text=Ciao! Vorrei informazioni sui vostri servizi", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Vector Background */}
      <AnimatedHeroBackground />

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <motion.span
          className="number-label block mb-8 text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          [01] — Event Agency
        </motion.span>

        <motion.h1
          className="heading-display text-white mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          EVENTI SU
          <br />
          <span className="italic font-normal">MISURA</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/70 mb-12 max-w-xl mx-auto font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Corporate events, brand activations, produzioni spettacolari. 
          Dalla visione all'applauso finale.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={scrollToContact}
            className="bg-white text-foreground px-8 py-4 font-semibold tracking-tight transition-all duration-200 uppercase text-sm hover:bg-white/90 flex items-center gap-2 group"
          >
            Richiedi preventivo
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={openWhatsApp}
            className="btn-outline-hero flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Parla con noi
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-px h-12 bg-white/30"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
