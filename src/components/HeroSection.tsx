import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const HeroSection = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showContent, setShowContent] = useState(false);

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
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const brandOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Video background */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
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
        {/* Subtle bottom gradient for text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--background) / 0.15) 0%, transparent 30%, transparent 50%, hsl(var(--background) / 0.85) 100%)",
          }}
        />
      </motion.div>

      {/* Giant brand name — hostviaggi style */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-start pointer-events-none"
            style={{ y: contentY, opacity: brandOpacity }}
          >
            <div className="container-custom w-full">
              <motion.h1
                className="font-display font-extrabold text-white leading-[0.85] tracking-tighter select-none"
                style={{ fontSize: "clamp(4rem, 15vw, 14rem)" }}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease }}
              >
                setup
                <span className="text-primary">.</span>
              </motion.h1>

              <motion.p
                className="text-white/60 text-sm md:text-lg font-light mt-4 md:mt-6 max-w-md tracking-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease }}
              >
                We set the moments.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom info bar — minimal, no glass, clean */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 mt-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            style={{ y: contentY }}
          >
            <div className="container-custom pb-8 md:pb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              {/* Left — subtitle + services */}
              <div>
                <p className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium mb-3">
                  Events Agency — Firenze
                </p>
                <p className="text-white/50 text-xs md:text-sm tracking-wider">
                  Corporate Events · Brand Activation · Hostess & Staff · PR
                </p>
              </div>

              {/* Right — controls */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() =>
                    document.getElementById("storia")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium hover:text-white/60 transition-colors cursor-pointer"
                >
                  Scopri ↓
                </motion.button>
                <motion.button
                  onClick={toggleVideo}
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? <Pause size={11} /> : <Play size={11} />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
