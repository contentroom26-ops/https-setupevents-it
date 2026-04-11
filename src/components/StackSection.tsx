import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StackSectionProps {
  children: ReactNode;
  zIndex: number;
  className?: string;
}

/**
 * Parallax overlay: the current section stays pinned and gently fades/scales
 * while the next section scrolls up OVER it — clean "reveal" effect.
 */
const StackSection = ({ children, zIndex, className = "" }: StackSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle scale-down as it recedes (1 → 0.92)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  // Fade out gently
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0.15]);
  // Slight upward parallax drift (pinned section moves slower)
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ zIndex, minHeight: "200vh" }}>
      <motion.div
        className="sticky top-0 min-h-screen will-change-transform overflow-hidden"
        style={{
          scale,
          opacity,
          y,
          transformOrigin: "center center",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StackSection;
