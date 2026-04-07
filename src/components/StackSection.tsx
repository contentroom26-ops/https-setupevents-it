import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StackSectionProps {
  children: ReactNode;
  zIndex: number;
  className?: string;
}

/**
 * Card-stack reveal: each section sticks at top.
 * As the user scrolls past, the section slightly scales down
 * and dims, giving a sense of depth / receding into background.
 */
const StackSection = ({ children, zIndex, className = "" }: StackSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scale down slightly as section scrolls away (1 → 0.95)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  // Dim as it exits (1 → 0.4)
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  // Drop shadow intensifies as next section overlaps
  const shadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "0 0 0px rgba(0,0,0,0)",
      "0 -10px 40px rgba(0,0,0,0.4)",
      "0 -5px 20px rgba(0,0,0,0.2)",
    ]
  );

  return (
    <div ref={ref} className={`relative ${className}`} style={{ zIndex }}>
      <motion.div
        className="sticky top-0 origin-center will-change-transform"
        style={{ scale, opacity }}
      >
        {children}
      </motion.div>
      {/* Shadow overlay cast by the section above */}
      <motion.div
        className="sticky top-0 inset-x-0 h-0 pointer-events-none"
        style={{ zIndex: zIndex + 1, boxShadow: shadow }}
      />
    </div>
  );
};

export default StackSection;
