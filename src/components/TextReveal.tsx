import { motion } from "framer-motion";

/**
 * A text component with a permanent shimmer/highlight effect that loops.
 */
const TextReveal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
    >
      {children}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 3,
        }}
      />
    </motion.span>
  );
};

export default TextReveal;
