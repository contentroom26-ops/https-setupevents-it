import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import TextReveal from "./TextReveal";

const HeroSection = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }
  }, []);

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
    <section ref={ref} className="relative h-[100svh] flex flex-col justify-between overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
        <motion.button
          onClick={toggleVideo}
          className="absolute top-20 right-4 md:top-24 md:right-12 z-20 w-10 h-10 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </motion.button>
      </div>

      {/* Top info bar */}
      <motion.div 
        className="relative z-10 container-custom pt-28 md:pt-32"
        style={{ opacity }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] md:text-xs text-white/30 font-medium tracking-[0.3em] uppercase">
            Firenze (ITA)
          </span>
          <span className="text-[10px] md:text-xs text-white/30 font-mono">
            © — Play it Bold
          </span>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div className="relative z-10 container-custom pb-12 md:pb-20" style={{ opacity, y }}>
        <motion.h1
          className="font-display font-bold text-white leading-[0.85] tracking-[-0.05em] mb-6 md:mb-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-[clamp(2.5rem,10vw,8rem)]">We set the <TextReveal><span className="italic font-normal text-primary">Moments</span></TextReveal></span>
        </motion.h1>

        {/* Permanent floating accent */}
        <motion.div
          className="absolute top-1/4 right-8 md:right-20 w-3 h-3 rounded-full bg-primary/40"
          animate={{ y: [0, -15, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-16 md:right-32 w-1.5 h-1.5 rounded-full bg-white/20"
          animate={{ y: [0, -10, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <p className="text-white/30 text-sm max-w-sm leading-relaxed">
            Corporate events, brand activations e produzioni spettacolari.
            Dalla visione all'applauso finale.
          </p>

          <motion.button
            onClick={scrollToContact}
            className="bg-primary text-primary-foreground px-7 md:px-10 py-3.5 md:py-4 font-bold text-sm rounded-full flex items-center gap-3 group self-start"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Parliamone
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex items-center gap-3 mt-10 md:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-px h-10 bg-white/15 origin-top"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-medium">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
