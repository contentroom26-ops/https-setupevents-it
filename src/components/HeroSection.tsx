import { motion, useScroll, useTransform } from "framer-motion";
import { Pause, Play, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = ({ ready = true }: { ready?: boolean }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const tryPlayVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    const p = video.play();
    if (p) {
      p.then(() => setIsPlaying(true)).catch(() => {
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

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative h-[100svh] flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${heroBg})`, opacity: videoLoaded ? 0 : 1 }}
      />
      <motion.div className="absolute inset-0" style={{ scale: videoScale, willChange: "transform" }}>
        <video
          ref={videoRef} loop muted playsInline
          // @ts-ignore
          webkit-playsinline="" preload="metadata" poster={heroBg}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ minWidth: "100%", minHeight: "100%", opacity: videoLoaded ? 1 : 0, transition: "opacity 0.7s ease" }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background) / 0.8) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none bg-black/45" />
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: overlayOpacity, background: "hsl(var(--background))" }} />
      </motion.div>

      {/* Top bar */}
      <motion.div
        className="relative z-10 flex justify-between items-center container-custom pt-20 md:pt-28"
        initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <span className="text-[8px] md:text-[10px] text-white/25 font-mono tracking-wider hidden sm:inline">
          {t("hero.agency")}
        </span>
        <motion.button
          onClick={toggleVideo}
          className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all duration-300"
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <Pause size={11} /> : <Play size={11} />}
        </motion.button>
      </motion.div>

      {/* Center content */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div className="relative z-10 container-custom text-center px-6" style={{ y: contentY }}>
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white tracking-tighter leading-[1.05]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 40 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("hero.headline")}
          </motion.h1>

          <motion.p
            className="mt-5 md:mt-8 text-sm sm:text-base md:text-lg text-white/50 font-medium tracking-wide max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {t("hero.subheadline")}
          </motion.p>

          <motion.div
            className="mt-10 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              onClick={() => document.getElementById("contatti")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm md:text-base tracking-wide shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)] transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.6)]"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("hero.cta")}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div className="relative z-10 container-custom pb-10 md:pb-16" style={{ y: contentY }}>
        <div className="flex justify-center">
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: 1.6 }}
            onClick={() => document.getElementById("storia")?.scrollIntoView({ behavior: "smooth" })}
          >
            <div className="w-px h-7 bg-white/15 group-hover:bg-white/30 transition-colors duration-300" />
            <span className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-medium group-hover:text-white/40 transition-colors duration-300">
              {t("hero.scroll")}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Side dots */}
      <motion.div
        className="absolute right-6 md:right-10 lg:right-14 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-3.5 hidden md:flex"
        initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 1.3 }}
      >
        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.4)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
