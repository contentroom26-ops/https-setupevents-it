import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type RevealVariant = "fade-up" | "clip-up" | "zoom" | "slide-left" | "blur";

interface SectionRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Extra delay in seconds */
  delay?: number;
  className?: string;
}

const variants: Record<RevealVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
  },
  "clip-up": {
    hidden: { opacity: 0, y: 60, clipPath: "inset(20% 0% 0% 0%)" },
    visible: { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 120 },
    visible: { opacity: 1, x: 0 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(16px)", y: 40 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

/**
 * Lightweight viewport-triggered reveal.
 * Uses only transform + opacity + filter → GPU-composited, 60 fps.
 */
const SectionReveal = ({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
}: SectionRevealProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    variants={variants[variant]}
    transition={{
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {children}
  </motion.div>
);

export default SectionReveal;
