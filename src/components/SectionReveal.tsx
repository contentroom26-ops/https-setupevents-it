import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down";
  className?: string;
}

/**
 * Wraps a section and applies a cinematic curtain-wipe reveal on scroll.
 * - A colored overlay slides away as the section enters the viewport.
 * - Content fades/slides in with a slight parallax.
 */
const SectionReveal = ({ children, direction = "up", className = "" }: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Curtain wipe: overlay shrinks from 100% to 0% as section scrolls in
  const clipPath = useTransform(scrollYProgress, [0, 0.25, 0.4], [
    direction === "up"
      ? "inset(0% 0% 0% 0%)"   // fully covered
      : "inset(0% 0% 0% 0%)",
    direction === "up"
      ? "inset(0% 0% 80% 0%)"  // partially revealed
      : "inset(80% 0% 0% 0%)",
    "inset(0% 0% 100% 0%)",     // fully gone
  ]);

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.35], [0.7, 0]);

  // Content parallax
  const contentY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [0, 0.3, 1]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Content with parallax */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }}>
        {children}
      </motion.div>

      {/* Curtain overlay */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none bg-background"
        style={{ clipPath, opacity: overlayOpacity }}
      />

      {/* Accent line that sweeps across */}
      <motion.div
        className="absolute inset-x-0 z-30 pointer-events-none h-px"
        style={{
          top: direction === "up" ? "0%" : undefined,
          bottom: direction === "down" ? "0%" : undefined,
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.4) 30%, hsl(var(--primary) / 0.6) 50%, hsl(var(--primary) / 0.4) 70%, transparent 100%)",
          opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.45], [0, 1, 0]),
          scaleX: useTransform(scrollYProgress, [0.1, 0.35], [0, 1]),
        }}
      />
    </div>
  );
};

export default SectionReveal;
