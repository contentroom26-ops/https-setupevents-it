import { motion, useScroll, useTransform } from "framer-motion";
import { Pause, Play, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import logoTexture from "@/assets/logo-texture.png";

const ease = [0.22, 1, 0.36, 1] as const;

const HeroSection = ({ ready = true }: { ready?: boolean }) => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  // Smooth RAF loop for buttery animation
  useEffect(() => {
    const current = { x: 0, y: 0 };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      current.x = lerp(current.x, targetRef.current.x, 0.08);
      current.y = lerp(current.y, targetRef.current.y, 0.08);
      setMouse({ x: current.x, y: current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

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

      {/* Interactive logo with multi-layer parallax */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
          transition={{ duration: 1.4, ease }}
        >
          {/* Outer ring - moves opposite */}
          <div
            className="absolute -inset-16 md:-inset-24 rounded-full opacity-[0.06] border border-white/20"
            style={{
              transform: `translate3d(${mouse.x * -25}px, ${mouse.y * -20}px, 0)`,
              willChange: "transform",
            }}
          />

          {/* Secondary glow - delayed movement */}
          <div
            className="absolute -inset-8 md:-inset-12 blur-[80px] opacity-30"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, transparent 70%)",
              transform: `translate3d(${mouse.x * -15}px, ${mouse.y * -12}px, 0)`,
              willChange: "transform",
            }}
          />

          {/* Inner glow - follows closely */}
          <div
            className="absolute -inset-4 blur-2xl opacity-15"
            style={{
              background: "radial-gradient(circle, white 0%, transparent 60%)",
              transform: `translate3d(${mouse.x * 10}px, ${mouse.y * 8}px, 0)`,
              willChange: "transform",
            }}
          />

          {/* Main logo with 3D tilt */}
          <div
            style={{
              transform: `translate3d(${mouse.x * 22}px, ${mouse.y * 18}px, 0) rotateY(${mouse.x * 8}deg) rotateX(${-mouse.y * 8}deg) scale(${1 + Math.abs(mouse.x * mouse.y) * 0.04})`,
              willChange: "transform",
              perspective: "800px",
            }}
          >
            <img
              src={logoTexture}
              alt=""
              className="relative w-[clamp(180px,40vw,450px)] opacity-75 select-none"
              draggable={false}
              style={{
                filter: `drop-shadow(0 0 40px hsl(var(--primary) / 0.3)) drop-shadow(${mouse.x * 10}px ${mouse.y * 10}px 30px rgba(0,0,0,0.5))`,
              }}
            />
          </div>

          {/* Floating particles around logo */}
          {[...Array(4)].map((_, i) => {
            const angle = (i / 4) * Math.PI * 2;
            const radius = 120 + i * 20;
            return (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/20"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate3d(${
                    Math.cos(angle) * radius + mouse.x * (15 + i * 8)
                  }px, ${
                    Math.sin(angle) * radius + mouse.y * (12 + i * 6)
                  }px, 0)`,
                  willChange: "transform",
                }}
              />
            );
          })}
        </motion.div>
      </div>

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
