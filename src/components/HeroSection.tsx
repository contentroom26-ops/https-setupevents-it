import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Pause, Play, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import logoIcon from "@/assets/logo-icon.png";

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
    const timer = setTimeout(() => setShowContent(true), 800);
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
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Video background — NO dark overlay, video text fully visible */}
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
        {/* Very subtle vignette only at edges — doesn't cover center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.7) 100%)",
          }}
        />
        {/* Bottom gradient for scroll hint readability */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: overlayOpacity, background: "hsl(var(--background))" }}
        />
      </motion.div>

      {/* Minimal top bar — small, transparent, doesn't cover video */}
      <motion.div
        className="relative z-10 container-custom pt-24 md:pt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] md:text-[10px] text-white/40 font-medium tracking-[0.35em] uppercase drop-shadow-lg">
            Events Agency — Firenze
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[9px] md:text-[10px] text-white/40 font-mono drop-shadow-lg">
              © Setup Events
            </span>
            <motion.button
              onClick={toggleVideo}
              className="w-8 h-8 rounded-full border border-white/15 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Spacer — let the video breathe */}
      <div className="flex-1" />

      {/* Bottom content strip — glass morphism bar */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 w-full"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease }}
            style={{ y: contentY }}
          >
            {/* Glass bar */}
            <div className="mx-4 md:mx-8 lg:mx-12 mb-6 md:mb-10 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
              <div className="px-6 md:px-10 py-5 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left: services only */}
                <div>
                  <motion.p
                    className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    Corporate Events · Brand Activation · Hostess & Staff · PR
                  </motion.p>
                </div>

                {/* Right: scroll CTA */}
                <motion.div
                  className="flex items-center gap-2 cursor-pointer group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  onClick={() =>
                    document.getElementById("storia")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium group-hover:text-white/60 transition-colors">
                    Scopri
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-white/30 transition-colors">
                    <ChevronDown size={14} className="text-white/40 group-hover:text-white/70 transition-colors scroll-indicator" />
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
