import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logoTexture from "@/assets/logo-texture.png";

const HeroStoryTransition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Logo zooms in and fades out as a "fly-through" bridge
  const logoScale = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.6, 2.5, 6]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0.5, 0.25, 0]);

  // Horizontal lines sweep across
  const line1X = useTransform(scrollYProgress, [0.1, 0.6], ["-100%", "100%"]);
  const line2X = useTransform(scrollYProgress, [0.15, 0.65], ["100%", "-100%"]);

  // Ambient glow follows scroll
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 0.3]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 0.4, 0.2, 0]);

  // Vignette intensifies mid-scroll
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0.7, 0.7, 0]);

  // Text reveal
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.65, 0.85], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.25, 0.45, 0.65, 0.85], [40, 0, 0, -40]);
  const textScale = useTransform(scrollYProgress, [0.25, 0.45, 0.65, 0.85], [0.9, 1, 1, 1.05]);

  return (
    <div ref={ref} className="relative h-[120vh] md:h-[150vh] overflow-hidden">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Primary glow */}
        <motion.div
          className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)",
            scale: glowScale,
            opacity: glowOpacity,
          }}
        />

        {/* Zooming logo */}
        <motion.img
          src={logoTexture}
          alt=""
          className="absolute w-[clamp(200px,45vw,500px)] select-none pointer-events-none"
          style={{
            scale: logoScale,
            opacity: logoOpacity,
            willChange: "transform, opacity",
          }}
          draggable={false}
        />

        {/* Sweeping lines */}
        <motion.div
          className="absolute top-[40%] w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ x: line1X }}
        />
        <motion.div
          className="absolute top-[60%] w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          style={{ x: line2X }}
        />

        {/* Radial vignette */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: vignetteOpacity,
            background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 100%)",
          }}
        />

        {/* Teaser text */}
        <motion.div
          className="absolute z-10 text-center px-6"
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/30 font-medium mb-3">
            [01] Chi siamo
          </p>
          <p className="text-lg md:text-3xl lg:text-4xl font-display font-bold tracking-tight text-white/80 max-w-2xl leading-tight">
            Dove ogni dettaglio
            <span className="text-white/40"> diventa esperienza</span>
          </p>
        </motion.div>

        {/* Grain overlay */}
        <div className="absolute inset-0 grain pointer-events-none opacity-50" />

        {/* Top & bottom fades */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent z-20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
      </div>
    </div>
  );
};

export default HeroStoryTransition;
