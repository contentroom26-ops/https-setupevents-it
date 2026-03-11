import { motion, useScroll, useTransform } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const words = ["Corporate Events", "Brand Activation", "Hostess & Staff", "Public Relations"];

const HeroSection = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeWord, setActiveWord] = useState(0);

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
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative h-[100svh] flex flex-col overflow-hidden">
      {/* Video background — full screen, no heavy overlay */}
      <div className="absolute inset-0">
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
        {/* Very subtle vignette only — no dark overlay covering video text */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 35%, transparent 55%, transparent 100%)"
        }} />
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
        {/* Play/Pause button */}
        <motion.button
          onClick={toggleVideo}
          className="absolute top-20 right-4 md:top-24 md:right-12 z-20 w-10 h-10 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </motion.button>
      </div>

      {/* Spacer — pushes content to bottom */}
      <div className="flex-1" />

      {/* Bottom content strip — sits over the gradient fade */}
      <motion.div
        className="relative z-10 container-custom pb-8 md:pb-14"
        style={{ opacity, y }}
      >
        {/* Agency identifier */}
        <motion.div
          className="flex items-center justify-between mb-6 md:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          <span className="text-[10px] md:text-xs text-white/40 font-medium tracking-[0.3em] uppercase">
            Events Agency — Firenze
          </span>
          <span className="text-[10px] md:text-xs text-white/30 font-mono">
            © Setup Events
          </span>
        </motion.div>

        {/* Rotating service word */}
        <div className="mb-5 md:mb-6 overflow-hidden">
          <motion.div
            className="flex items-baseline gap-3 md:gap-5"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <span className="text-[10px] md:text-xs text-primary font-mono tracking-wider">
              [{String(activeWord + 1).padStart(2, "0")}]
            </span>
            <div className="relative h-[clamp(2.2rem,7vw,5.5rem)]">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  className="absolute left-0 top-0 font-display font-extrabold text-white text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-[-0.04em] whitespace-nowrap"
                  initial={false}
                  animate={{
                    y: activeWord === i ? 0 : activeWord > i ? -80 : 80,
                    opacity: activeWord === i ? 1 : 0,
                    filter: activeWord === i ? "blur(0px)" : "blur(8px)",
                  }}
                  transition={{ duration: 0.7, ease }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Service tags */}
        <motion.div
          className="flex flex-wrap items-center gap-2 md:gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
        >
          {words.map((word, i) => (
            <button
              key={word}
              onClick={() => setActiveWord(i)}
              className={`text-[10px] md:text-xs px-3 md:px-4 py-1.5 rounded-full border font-medium uppercase tracking-wider transition-all duration-500 ${
                activeWord === i
                  ? "border-primary/60 text-white bg-primary/10"
                  : "border-white/10 text-white/25 hover:text-white/50 hover:border-white/20"
              }`}
            >
              {word}
            </button>
          ))}
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="w-16 md:w-24 h-px bg-gradient-to-r from-primary to-transparent mb-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease }}
          style={{ transformOrigin: "left" }}
        />

        {/* Subtitle + scroll indicator row */}
        <div className="flex items-end justify-between">
          <motion.p
            className="text-white/30 text-xs md:text-sm max-w-sm leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
          >
            Organizziamo eventi esclusivi a Firenze. Dalla strategia all'esecuzione, curiamo ogni dettaglio.
          </motion.p>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-medium hidden md:block">
              Scroll
            </span>
            <div className="w-px h-10 bg-white/15 origin-top scroll-indicator" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
