import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StackSectionProps {
  children: ReactNode;
  zIndex: number;
  className?: string;
}

/**
 * Card-stack reveal with 3D perspective.
 * As the user scrolls past, the section tilts back in 3D space,
 * scales down, and fades — like flipping a card away.
 */
const StackSection = ({ children, zIndex, className = "" }: StackSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scale down as section exits (1 → 0.88)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  // Dim as it exits
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.6, 0]);
  // Tilt backward in 3D (0 → 8deg)
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 8]);
  // Push back in Z space
  const translateZ = useTransform(scrollYProgress, [0, 1], [0, -120]);
  // Slide up slightly
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  // Border radius reveals card edges
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 24]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ zIndex, minHeight: "200vh", perspective: "1200px" }}
    >
      <motion.div
        className="sticky top-0 min-h-screen will-change-transform overflow-hidden"
        style={{
          scale,
          opacity,
          rotateX,
          translateZ,
          y: translateY,
          borderRadius,
          transformOrigin: "center top",
          transformStyle: "preserve-3d",
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StackSection;
