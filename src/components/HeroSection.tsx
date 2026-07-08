import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import heroOpening from "@/assets/hero-opening.mp4.asset.json";
import heroOpeningPoster from "@/assets/hero-opening-poster.jpg.asset.json";

// Immagine hero in public/ per abilitare il preload in index.html
const heroBg = "/images/hero-bg.jpg";


const ease = [0.22, 1, 0.36, 1] as const;

// Durata del video di apertura (in ms) — 5s + piccolo buffer
const INTRO_DURATION = 5000;
const INTRO_TRANSITION = 500;

const HeroSection = ({ onIntroComplete }: { onIntroComplete?: () => void }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const [showContent, setShowContent] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [introPhase, setIntroPhase] = useState<"intro" | "transition" | "done">("intro");


  const tryPlayVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    const p = video.play();
    if (p) {
      p.catch(() => {
        setTimeout(() => {
          video.play().catch(() => {});
        }, 300);
      });
    }
  }, []);

  // Avvia subito il video intro
  useEffect(() => {
    const v = introVideoRef.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.play().catch(() => {
      setTimeout(() => v.play().catch(() => {}), 300);
    });
  }, []);

  // Intro video → transizione → hero
  useEffect(() => {
    const t1 = setTimeout(() => {
      setIntroPhase("transition");
      tryPlayVideo();
    }, INTRO_DURATION);

    const t2 = setTimeout(() => {
      setIntroPhase("done");
      onIntroComplete?.();
    }, INTRO_DURATION + INTRO_TRANSITION);

    const t3 = setTimeout(() => {
      setShowContent(true);
    }, INTRO_DURATION + INTRO_TRANSITION + 200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [tryPlayVideo, onIntroComplete]);


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


  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Intro Video Overlay — precede l'apertura della Hero */}
      <AnimatePresence>
        {introPhase !== "done" && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: INTRO_TRANSITION / 1000, ease }}
          >
            <motion.video
              ref={introVideoRef}
              autoPlay
              muted
              playsInline
              // @ts-ignore
              webkit-playsinline=""
              preload="auto"
              poster={heroOpeningPoster.url}
              className="w-full h-full object-cover object-center"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={
                introPhase === "transition"
                  ? { opacity: 0, scale: 1.15, filter: "blur(6px)" }
                  : { opacity: 1, scale: 1, filter: "blur(0px)" }
              }
              transition={{ duration: introPhase === "transition" ? 0.5 : 0.8, ease }}
            >
              <source src={heroOpening.url} type="video/mp4" />
            </motion.video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immagine di sfondo — sempre visibile come base, il video si sovrappone */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Video background */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale, willChange: "transform" }}>
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          // @ts-ignore
          webkit-playsinline=""
          preload="metadata"
          poster={heroBg}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            minWidth: "100%",
            minHeight: "100%",
            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background) / 0.8) 100%)" }}
        />
        <div className="absolute inset-0 pointer-events-none bg-black/45" />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: overlayOpacity, background: "hsl(var(--background))" }}
        />
      </motion.div>

      {/* Top bar */}
      <motion.div
        className="relative z-10 flex justify-between items-center container-custom pt-20 md:pt-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <span className="text-[8px] md:text-[10px] text-white/25 font-mono tracking-wider hidden sm:inline">
          {t("hero.agency")}
        </span>
      </motion.div>

      {/* Content — centered */}
      <div className="flex-1" />
      <motion.div
        className="relative z-10 container-custom px-6 pb-20 md:pb-24 flex flex-col items-center text-center"
        style={{ y: contentY }}
      >
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div className="relative z-10 container-custom pb-10 md:pb-16" style={{ y: contentY }}>
        <div className="flex justify-center">
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
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
