import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroStoryTransition = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Curtain wipe
  const leftX = useTransform(scrollYProgress, [0.05, 0.45], ["0%", "-100%"]);
  const rightX = useTransform(scrollYProgress, [0.05, 0.45], ["0%", "100%"]);
  const curtainOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);

  // Center line
  const lineScaleY = useTransform(scrollYProgress, [0.0, 0.25, 0.5], [0, 1, 0]);
  const lineOpacity = useTransform(scrollYProgress, [0.0, 0.15, 0.45, 0.55], [0, 0.6, 0.6, 0]);

  // Text reveal
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.85], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.3, 0.5, 0.7, 0.85], [60, 0, 0, -50]);

  // Glow
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.3, 0]);

  // Red cross accent
  const crossScale = useTransform(scrollYProgress, [0.35, 0.55, 0.75], [0, 1, 0]);
  const crossOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.75], [0, 1, 0]);

  return (
    <div ref={ref} className="relative h-[80vh] md:h-[130vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-background">

        {/* Curtain left */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 bg-background z-10"
          style={{ x: leftX, opacity: curtainOpacity }}
        />

        {/* Curtain right */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 bg-background z-10"
          style={{ x: rightX, opacity: curtainOpacity }}
        />

        {/* Center vertical line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent z-20"
          style={{
            height: "60vh",
            scaleY: lineScaleY,
            opacity: lineOpacity,
            transformOrigin: "center",
          }}
        />

        {/* Red cross accent */}
        <motion.div
          className="absolute z-20 flex items-center justify-center"
          style={{ scale: crossScale, opacity: crossOpacity }}
        >
          <div className="relative w-5 h-5">
            <div className="absolute top-1/2 left-0 w-full h-px bg-primary -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-primary -translate-x-1/2" />
          </div>
        </motion.div>

        {/* Glow */}
        <motion.div
          className="absolute w-[40vw] h-[40vw] rounded-full blur-[100px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 70%)",
            opacity: glowOpacity,
          }}
        />

        {/* Text */}
        <motion.div
          className="relative z-30 text-center px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/25 font-medium mb-4">
            [01] Chi siamo
          </p>
          <p className="text-xl md:text-3xl lg:text-5xl font-display font-bold tracking-tight text-white/90 max-w-3xl leading-[1.1]">
            Dove ogni dettaglio
            <span className="text-white/40"> diventa esperienza</span>
          </p>
        </motion.div>

        {/* Grain */}
        <div className="absolute inset-0 grain pointer-events-none opacity-40 z-40" />

        {/* Fades */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent z-40" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-40" />
      </div>
    </div>
  );
};

export default HeroStoryTransition;
