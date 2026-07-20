import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const logoSplash = "/images/logo-splash.png";

// Immagine hero in public/ per abilitare il preload in index.html
const heroBg = "/images/hero-bg.jpg";


const ease = [0.22, 1, 0.36, 1] as const;

const HeroSection = ({ onIntroComplete }: { onIntroComplete?: () => void }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [showContent, setShowContent] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [introPhase, setIntroPhase] = useState<"logo" | "transition" | "done">("logo");
  

  

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
    } else {
      
    }
  }, []);

  // Logo intro → 2.5s → start video → show text
  useEffect(() => {
    const t1 = setTimeout(() => {
      setIntroPhase("transition");
      tryPlayVideo();
    }, 2500);

    const t2 = setTimeout(() => {
      setIntroPhase("done");
      onIntroComplete?.();
    }, 3000);

    const t3 = setTimeout(() => {
      setShowContent(true);
    }, 3200);

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
      {/* Logo Intro Overlay */}
      <AnimatePresence>
        {introPhase !== "done" && (
          <motion.div
            className="absolute inset-0 z-50 bg-black flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Radial glow */}
            <motion.div
              className="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, hsl(0 72% 51% / 0.25) 0%, transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 1, ease }}
            />

            {/* Logo */}
            <motion.img
              src={logoSplash}
              alt="SetupEvents"
              className="relative z-10 w-[75vw] max-w-[600px] md:w-[45vw] md:max-w-[700px]"
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={
                introPhase === "transition"
                  ? { opacity: 0, scale: 1.4, y: -20, filter: "blur(8px)" }
                  : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
              }
              transition={
                introPhase === "transition"
                  ? { duration: 0.6, ease }
                  : { duration: 0.8, ease }
              }
            />

            {/* Corner accents */}
            {[
              "top-6 left-6 origin-top-left",
              "top-6 right-6 origin-top-right",
              "bottom-6 left-6 origin-bottom-left",
              "bottom-6 right-6 origin-bottom-right",
            ].map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} z-20`}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  introPhase === "transition"
                    ? { opacity: 0, scale: 0 }
                    : { opacity: 0.3, scale: 1 }
                }
                transition={{ duration: 0.4, delay: introPhase === "transition" ? 0 : 0.6 + i * 0.08, ease }}
              >
                <div className="w-6 h-px bg-primary" />
                <div className="w-px h-6 bg-primary" />
              </motion.div>
            ))}
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
          {/* Senza codec hint: più compatibile con Safari */}
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
        <motion.h1
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 md:mb-6 max-w-4xl whitespace-pre-line"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
        >
          {t("hero.headlinePre")}{" "}
          <span className="text-primary">{t("hero.headlineServices.0")}</span>
        </motion.h1>

        <motion.p
          className="text-sm md:text-base text-white/60 font-medium tracking-wide mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
        >
          {t("hero.subheadline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        >
          <Link
            to="/contatti"
            className="inline-flex items-center gap-2 bg-primary/90 hover:bg-primary text-primary-foreground px-7 py-3.5 md:px-9 md:py-4 rounded-full font-bold text-sm md:text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.35)]"
          >
            {t("hero.cta")}
          </Link>
        </motion.div>
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
