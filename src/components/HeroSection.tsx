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
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative h-screen flex items-end overflow-hidden pb-24 md:pb-32">
      <AnimatedBackground />

      <motion.div className="relative z-10 container-custom w-full" style={{ opacity, y }}>
        {/* Overline */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-xs uppercase tracking-[0.35em] text-white/40 font-medium">
            Event Agency — Firenze, Italia
          </span>
        </motion.div>

        {/* Main headline - large, editorial */}
        <motion.h1
          className="font-display font-extrabold text-white leading-[0.9] tracking-[-0.04em] mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-[clamp(2.5rem,8vw,7rem)]">
            Creiamo
          </span>
          <span className="block text-[clamp(2.5rem,8vw,7rem)] text-primary">
            esperienze
          </span>
          <span className="block text-[clamp(2rem,5vw,4rem)] font-normal italic text-white/30 mt-2">
            che restano nella memoria
          </span>
        </motion.h1>

        {/* Bottom row: description + CTA */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <p className="text-white/35 text-sm md:text-base max-w-md leading-relaxed">
            Corporate events, brand activations e produzioni spettacolari.
            <br className="hidden md:block" />
            Dalla visione all'applauso finale.
          </p>

          <motion.button
            onClick={scrollToContact}
            className="bg-primary text-accent px-8 py-4 font-bold text-sm rounded-full flex items-center gap-3 group self-start md:self-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Parliamone
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll line - left side */}
      <motion.div
        className="absolute bottom-10 left-8 md:left-12 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-px h-12 bg-white/15 origin-top"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-medium rotate-0">
          Scroll
        </span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
