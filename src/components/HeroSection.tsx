import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import logoIcon from "@/assets/logo-icon.png";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  { label: "Corporate Events", num: "01" },
  { label: "Brand Activation", num: "02" },
  { label: "Hostess & Staff", num: "03" },
  { label: "Public Relations", num: "04" },
];

const HeroSection = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const p = video.play();
      if (p) p.catch(() => { video.muted = true; video.play().catch(() => {}); });
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % services.length), 3500);
    return () => clearInterval(t);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [0.12, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />
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

      {/* Central S logo watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none"
        style={{ scale: logoScale, opacity: logoOpacity }}
      >
        <motion.img
          src={logoIcon} alt=""
          className="w-[40vw] md:w-[28vw] lg:w-[22vw] max-w-[380px] h-auto select-none"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease }}
          style={{ filter: "brightness(1.4) contrast(0.9)" }}
        />
      </motion.div>

      {/* Top bar */}
      <motion.div className="relative z-10 container-custom pt-28 md:pt-36" style={{ opacity }}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] md:text-xs text-white/30 font-medium tracking-[0.3em] uppercase">Events Agency — Firenze</span>
          <span className="text-[10px] md:text-xs text-white/30 font-mono">© Setup Events</span>
        </div>
      </motion.div>

      {/* Center — giant rotating text */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="container-custom w-full">
          {/* Giant number background */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`num-${active}`}
              className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-display font-extrabold text-white/[0.03] leading-none select-none pointer-events-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease }}
            >
              {services[active].num}
            </motion.span>
          </AnimatePresence>

          <div className="relative">
            {/* Small label */}
            <motion.div
              className="flex items-center gap-3 mb-4 md:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="w-8 h-px bg-primary" />
              <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.25em] font-medium">
                I nostri servizi
              </span>
            </motion.div>

            {/* Main rotating word — split letter animation */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={active}
                  className="font-display font-extrabold text-white text-[clamp(2.2rem,8vw,6rem)] md:text-[clamp(3rem,6.5vw,5.5rem)] leading-[0.9] tracking-[-0.04em]"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.025, delayChildren: 0.05 } },
                    exit: { transition: { staggerChildren: 0.015, staggerDirection: -1 } },
                  }}
                >
                  {services[active].label.split("").map((char, i) => (
                    <motion.span
                      key={`${active}-${i}`}
                      className="inline-block"
                      style={{ whiteSpace: char === " " ? "pre" : undefined }}
                      variants={{
                        hidden: { y: 120, opacity: 0, rotateX: -40 },
                        visible: { y: 0, opacity: 1, rotateX: 0, transition: { duration: 0.6, ease } },
                        exit: { y: -80, opacity: 0, rotateX: 20, transition: { duration: 0.35, ease } },
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="mt-6 md:mt-8 flex items-center gap-3">
              {services.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => setActive(i)}
                  className="group relative flex items-center gap-2"
                >
                  <div className="relative w-12 md:w-16 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    {active === i && (
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-primary rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "linear" }}
                        key={`bar-${active}-${i}`}
                      />
                    )}
                  </div>
                  <span className={`text-[9px] font-mono transition-colors duration-300 ${
                    active === i ? "text-primary" : "text-white/15 group-hover:text-white/30"
                  }`}>
                    {s.num}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <motion.div className="relative z-10 container-custom pb-10 md:pb-16" style={{ opacity, y }}>
        <div className="flex items-end justify-between">
          <motion.p
            className="text-white/20 text-xs md:text-sm max-w-xs leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
          >
            Dalla strategia all'esecuzione,<br />curiamo ogni dettaglio.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-medium">
              Scroll
            </span>
            <div className="w-px h-10 bg-white/15 origin-top scroll-indicator" />
          </motion.div>
        </div>

        {/* Floating accents */}
        <div className="absolute top-1/4 right-8 md:right-20 w-3 h-3 rounded-full bg-primary/40 hero-dot-1" />
        <div className="absolute top-1/3 right-16 md:right-32 w-1.5 h-1.5 rounded-full bg-white/20 hero-dot-2" />
      </motion.div>
    </section>
  );
};

export default HeroSection;