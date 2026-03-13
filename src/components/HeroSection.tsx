import { motion, useScroll, useTransform } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const HeroSection = ({ ready = true }: { ready?: boolean }) => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Attempt to play video with Safari-compatible fallbacks
  const tryPlayVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = true;
    // Safari requires muted + playsInline + user gesture or autoplay policy
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    const p = video.play();
    if (p) {
      p.then(() => setIsPlaying(true)).catch(() => {
        // Retry once after a brief delay (Safari sometimes needs this)
        setTimeout(() => {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        }, 300);
      });
    } else {
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    tryPlayVideo();
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, [ready, tryPlayVideo]);

  // Mark video as loaded when it has enough data
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onCanPlay = () => setVideoLoaded(true);
    if (video.readyState >= 3) {
      setVideoLoaded(true);
    } else {
      video.addEventListener("canplay", onCanPlay, { once: true });
      return () => video.removeEventListener("canplay", onCanPlay);
    }
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
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Fallback poster image — visible until video loads */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url(${heroBg})`,
          opacity: videoLoaded ? 0 : 1,
        }}
      />

      {/* Video background */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: videoScale, willChange: "transform" }}
      >
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          // @ts-ignore — webkit attribute for Safari
          webkit-playsinline=""
          preload="metadata"
          poster={heroBg}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ minWidth: "100%", minHeight: "100%", opacity: videoLoaded ? 1 : 0, transition: "opacity 0.7s ease" }}
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

      {/* Top-right controls */}
      <motion.div
        className="relative z-10 flex justify-end container-custom pt-20 md:pt-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[8px] md:text-[10px] text-white/30 font-mono tracking-wider hidden sm:inline">
            EVENTS AGENCY — FIRENZE
          </span>
          <motion.button
            onClick={toggleVideo}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/15 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause size={10} /> : <Play size={10} />}
          </motion.button>
        </div>
      </motion.div>

      <div className="flex-1" />

      {/* Main hero content — bottom-left aligned */}
      <motion.div
        className="relative z-10 container-custom pb-10 md:pb-16"
        style={{ y: contentY }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 ml-6 md:ml-14 lg:ml-16">
          <motion.div
            className="flex items-center gap-3 cursor-pointer group sm:mr-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 1 }}
            onClick={() =>
              document.getElementById("storia")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <div className="w-px h-6 bg-white/20 group-hover:bg-white/40 transition-colors" />
            <span className="text-white/25 text-[9px] uppercase tracking-[0.3em] font-medium group-hover:text-white/50 transition-colors">
              Scroll
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Right-side dots */}
      <motion.div
        className="absolute right-5 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-3 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
