import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Pause, Play, ArrowDown } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import logoIcon from "@/assets/logo-icon.png";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  { label: "Corporate\nEvents", num: "01", accent: "Strategy & Production" },
  { label: "Brand\nActivation", num: "02", accent: "Experience Design" },
  { label: "Hostess\n& Staff", num: "03", accent: "Premium Talent" },
  { label: "Public\nRelations", num: "04", accent: "Media & Influence" },
];

const HeroSection = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const p = video.play();
      if (p) p.catch(() => { video.muted = true; video.play().catch(() => {}); });
    }
  }, []);

  useEffect(() => {
    if (isHovering) return;
    const t = setInterval(() => setActive((p) => (p + 1) % services.length), 4000);
    return () => clearInterval(t);
  }, [isHovering]);

  const toggleVideo = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [0.08, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover scale-105">
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
        <motion.button
          onClick={toggleVideo}
          className="absolute top-20 right-4 md:top-24 md:right-12 z-20 w-10 h-10 rounded-full border border-white/15 bg-black/20 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </motion.button>
      </div>

      {/* Central S logo watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none"
        style={{ scale: logoScale, opacity: logoOpacity }}
      >
        <motion.img
          src={logoIcon} alt=""
          className="w-[35vw] md:w-[24vw] lg:w-[18vw] max-w-[320px] h-auto select-none"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 2, delay: 0.3, ease }}
          style={{ filter: "brightness(1.5) contrast(0.85)" }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div className="relative z-10 flex-1 flex flex-col" style={{ opacity, scale }}>
        {/* Top bar */}
        <div className="container-custom pt-28 md:pt-36">
          <div className="flex items-center justify-between">
            <span className="text-[10px] md:text-xs text-white/25 font-medium tracking-[0.3em] uppercase">Events Agency — Firenze</span>
            <span className="text-[10px] md:text-xs text-white/25 font-mono">© Setup Events</span>
          </div>
        </div>

        {/* Center — full-width immersive layout */}
        <div className="flex-1 flex items-center">
          <div className="container-custom w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 items-center">
              
              {/* Left: giant title */}
              <div className="md:col-span-9 relative">
                {/* Oversized number */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`num-${active}`}
                    className="absolute -left-2 md:-left-6 -top-8 md:-top-16"
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <span className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-display font-black text-white/[0.04] leading-none select-none">
                      {services[active].num}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Title with staggered word reveal */}
                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      className="relative"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {services[active].label.split("\n").map((line, lineIdx) => (
                        <div key={lineIdx} className="overflow-hidden">
                          <motion.h1
                            className="font-display font-black text-white text-[clamp(3rem,10vw,8rem)] md:text-[clamp(4rem,8vw,7rem)] leading-[0.85] tracking-[-0.05em]"
                            variants={{
                              hidden: { y: "110%", skewY: 3 },
                              visible: { y: 0, skewY: 0, transition: { duration: 0.8, delay: lineIdx * 0.1, ease } },
                              exit: { y: "-110%", skewY: -2, transition: { duration: 0.4, delay: lineIdx * 0.05, ease } },
                            }}
                          >
                            {line}
                          </motion.h1>
                        </div>
                      ))}

                      {/* Accent line */}
                      <motion.div
                        className="mt-4 md:mt-6 flex items-center gap-4"
                        variants={{
                          hidden: { opacity: 0, x: -30 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3, ease } },
                          exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
                        }}
                      >
                        <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-primary to-transparent" />
                        <span className="text-xs md:text-sm text-primary/80 font-medium tracking-[0.15em] uppercase">
                          {services[active].accent}
                        </span>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right: vertical service selector */}
              <div
                className="md:col-span-3 flex md:flex-col gap-3 md:gap-0 md:items-end"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {services.map((s, i) => (
                  <button
                    key={s.num}
                    onClick={() => setActive(i)}
                    className="group relative flex items-center md:flex-row-reverse gap-3 md:gap-4 md:py-4 md:border-r-2 md:pr-5 transition-all duration-500"
                    style={{
                      borderColor: active === i ? "hsl(var(--primary))" : "rgba(255,255,255,0.08)",
                    }}
                  >
                    <span className={`text-[10px] md:text-xs font-mono transition-all duration-500 ${
                      active === i ? "text-primary" : "text-white/20 group-hover:text-white/40"
                    }`}>
                      {s.num}
                    </span>
                    <span className={`hidden md:block text-xs font-medium tracking-wide transition-all duration-500 text-right ${
                      active === i ? "text-white/80 translate-x-0" : "text-white/15 translate-x-2 group-hover:text-white/30 group-hover:translate-x-0"
                    }`}>
                      {s.label.replace("\n", " ")}
                    </span>
                    
                    {/* Active indicator dot (mobile) */}
                    {active === i && (
                      <motion.div
                        className="md:hidden absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                        layoutId="activeDot"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <motion.div className="container-custom pb-10 md:pb-16" style={{ y }}>
          <div className="flex items-end justify-between">
            <motion.p
              className="text-white/20 text-xs md:text-sm max-w-xs leading-relaxed tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1, ease }}
            >
              Dalla strategia all'esecuzione,<br />curiamo ogni dettaglio.
            </motion.p>

            {/* Scroll CTA */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span className="text-white/20 text-[9px] uppercase tracking-[0.4em] font-medium">Scopri</span>
              <motion.div
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={12} className="text-white/30" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/3 right-8 md:right-20 w-2.5 h-2.5 rounded-full bg-primary/30 hero-dot-1 z-[2]" />
      <div className="absolute bottom-1/3 left-8 md:left-16 w-1.5 h-1.5 rounded-full bg-white/15 hero-dot-2 z-[2]" />
      <div className="absolute top-1/2 right-1/4 w-px h-24 bg-gradient-to-b from-primary/20 to-transparent z-[2]" />
    </section>
  );
};

export default HeroSection;