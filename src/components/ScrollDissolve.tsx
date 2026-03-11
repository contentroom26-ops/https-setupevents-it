import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ScrollDissolve = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Fade from solid background to transparent
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 0.3, 0]);
  // Soft glow pulse
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 0.15, 0]);
  // Subtle line reveal
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.5, 0.85], [0, 1, 0]);
  const lineOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.85], [0, 0.4, 0.4, 0]);

  return (
    <div ref={ref} className="relative h-[60vh] md:h-[80vh] -mt-1">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Background dissolve overlay */}
        <motion.div
          className="absolute inset-0 bg-background z-10"
          style={{ opacity: overlayOpacity }}
        />

        {/* Subtle center glow */}
        <motion.div
          className="absolute w-[50vw] h-[30vh] rounded-full blur-[120px] z-[5]"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)",
            opacity: glowOpacity,
          }}
        />

        {/* Horizontal line reveal */}
        <motion.div
          className="absolute w-[30vw] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
          style={{
            scaleX: lineScaleX,
            opacity: lineOpacity,
          }}
        />

        {/* Grain texture */}
        <div className="absolute inset-0 grain pointer-events-none opacity-30 z-30" />
      </div>
    </div>
  );
};

export default ScrollDissolve;
