import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

const HeroSection = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
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
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
        {/* Pause/Play button */}
        <motion.button
          onClick={toggleVideo}
          className="absolute top-24 right-6 md:right-12 z-20 w-10 h-10 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </motion.button>
      </div>

      <motion.div className="relative z-10 container-custom w-full" style={{ opacity, y }}>
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

        <motion.h1
          className="font-display font-extrabold text-white leading-[0.9] tracking-[-0.04em] mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-[clamp(2.5rem,8vw,7rem)]">Creiamo</span>
          <span className="block text-[clamp(2.5rem,8vw,7rem)] text-primary">esperienze</span>
          <span className="block text-[clamp(2rem,5vw,4rem)] font-normal italic text-white/30 mt-2">
            che restano nella memoria
          </span>
        </motion.h1>

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

      {/* Scroll line */}
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
        <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-medium">
          Scroll
        </span>
      </motion.div>
    </section>
  );
};

export default HeroSection;
