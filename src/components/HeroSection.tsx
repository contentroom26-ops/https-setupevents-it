import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Pause, Play, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const HeroSection = ({ ready = true }: { ready?: boolean }) => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
      setIsPlaying(true);
    }
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, [ready]);

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
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Video background */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.7) 100%)",
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: overlayOpacity, background: "hsl(var(--background))" }}
        />
      </motion.div>

      {/* Top bar */}
      <motion.div
        className="relative z-10 container-custom pt-20 md:pt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[8px] md:text-[10px] text-white/40 font-medium tracking-[0.3em] uppercase drop-shadow-lg">
            Events Agency — Firenze
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[8px] md:text-[10px] text-white/40 font-mono drop-shadow-lg hidden sm:inline">
              © Setup Events
            </span>
            <motion.button
              onClick={toggleVideo}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/15 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? <Pause size={10} /> : <Play size={10} />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="flex-1" />

      {/* Bottom glass bar */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 w-full"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease }}
            style={{ y: contentY }}
          >
            <div className="mx-3 md:mx-8 lg:mx-12 mb-4 md:mb-10 rounded-xl md:rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
              <div className="px-4 md:px-10 py-4 md:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <motion.p
                  className="text-white/40 text-[9px] md:text-xs tracking-widest uppercase leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Corporate Events · Brand Activation · Hostess & Staff · PR
                </motion.p>

                <motion.div
                  className="flex items-center gap-2 cursor-pointer group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={() =>
                    document.getElementById("storia")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="text-white/30 text-[9px] md:text-xs uppercase tracking-[0.2em] font-medium group-hover:text-white/60 transition-colors">
                    Scopri
                  </span>
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-white/30 transition-colors">
                    <ChevronDown size={12} className="text-white/40 group-hover:text-white/70 transition-colors scroll-indicator" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
