import { motion } from "framer-motion";

/**
 * Persistent floating decorative elements for visual interest.
 * Place inside sections with `position: relative` and `overflow: hidden`.
 */
const FloatingElements = ({
  variant = "dots",
  count = 5,
}: {
  variant?: "dots" | "lines" | "circles";
  count?: number;
}) => {
  if (variant === "lines") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{
              top: `${15 + i * (70 / count)}%`,
              left: "-10%",
              width: `${30 + Math.random() * 40}%`,
            }}
            animate={{
              x: ["0%", "120%", "0%"],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "circles") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/10"
            style={{
              width: 60 + i * 40,
              height: 60 + i * 40,
              top: `${20 + Math.sin(i) * 30}%`,
              right: `${-5 + i * 8}%`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 180, 360],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 12 + i * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  }

  // dots variant
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            top: `${10 + i * (80 / count)}%`,
            left: `${5 + (i * 37) % 90}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
