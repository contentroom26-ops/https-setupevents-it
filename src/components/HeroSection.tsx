import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import AnimatedBackground from "./AnimatedBackground";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <motion.div className="relative z-10 container-custom w-full" style={{ opacity, scale }}>
        {/* Two-column layout like TBF */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8">
          {/* Left block */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tighter leading-none">
                SETUP
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                  EVENTS
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white/60 tracking-tight">
                  & PRODUCTION
                </span>
              </div>
            </div>
            <motion.button
              onClick={scrollToContact}
              className="flex items-center gap-3 mt-6 group cursor-pointer"
              whileHover={{ x: 5 }}
            >
              <span className="w-8 h-px bg-primary" />
              <span className="text-sm font-medium text-white/70 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                Scopri di più
              </span>
            </motion.button>
          </motion.div>

          {/* Right block */}
          <motion.div
            className="flex flex-col items-start md:items-end text-left md:text-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-base md:text-lg text-white/40 max-w-sm leading-relaxed mb-6">
              Corporate events, brand activations, produzioni spettacolari.
              Dalla visione all'applauso finale.
            </p>
            <motion.button
              onClick={() =>
                window.open(
                  `https://wa.me/393284163053?text=${encodeURIComponent("Salve, vorrei organizzare un evento, vorrei avere più informazioni.")}`,
                  "_blank"
                )
              }
              className="bg-primary text-accent px-7 py-3.5 font-bold text-sm rounded-full flex items-center gap-3 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Richiedi preventivo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white/30 text-xs uppercase tracking-[0.3em] font-medium">Scorri</span>
        <motion.div
          className="w-px h-10 bg-white/20 origin-top"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
