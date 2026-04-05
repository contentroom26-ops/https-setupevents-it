import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  noPadding?: boolean;
}

/**
 * Wraps content in a floating card-like container with rounded corners,
 * soft shadows, glassmorphism border, and depth effect.
 */
const FloatingSection = ({ children, className = "", id, noPadding = false }: FloatingSectionProps) => {
  return (
    <motion.div
      id={id}
      className={`relative mx-4 sm:mx-6 lg:mx-10 rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/[0.06] shadow-[0_8px_60px_-12px_rgba(0,0,0,0.5),0_2px_20px_-4px_rgba(0,0,0,0.3)] ${!noPadding ? "" : ""} ${className}`}
      style={{
        background: "linear-gradient(180deg, hsl(40 6% 11% / 0.95) 0%, hsl(40 6% 9% / 0.98) 100%)",
        backdropFilter: "blur(20px)",
      }}
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle inner glow at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default FloatingSection;
