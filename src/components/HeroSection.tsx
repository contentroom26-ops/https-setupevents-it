import { motion, useScroll, useTransform } from "framer-motion";
import { Pause, Play } from "lucide-react";
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

  return (
    <section ref={ref} className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Video background */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
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
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
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

      {/* Minimal scroll indicator */}
      <motion.div
        className="relative z-10 flex justify-center pb-8 md:pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() =>
            document.getElementById("storia")?.scrollIntoView({ behavior: "smooth" })
          }
          whileHover={{ y: 4 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white/20 text-[8px] uppercase tracking-[0.3em] font-medium group-hover:text-white/40 transition-colors">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5 group-hover:border-white/30 transition-colors">
            <motion.div
              className="w-0.5 h-1.5 rounded-full bg-white/40"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
