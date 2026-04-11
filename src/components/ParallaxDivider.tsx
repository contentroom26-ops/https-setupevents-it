import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Layers move at different speeds for parallax depth
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);

  return (
    <div
      ref={ref}
      className="relative h-[60vh] md:h-[80vh] overflow-hidden"
      style={{ zIndex: 55 }}
    >
      {/* Background gradient layer — slowest */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: y2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </motion.div>

      {/* Floating accent dots — medium speed */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: y1, opacity }}
      >
        <div className="absolute top-1/4 left-[15%] w-1 h-1 rounded-full bg-primary/30" />
        <div className="absolute top-1/3 right-[20%] w-1.5 h-1.5 rounded-full bg-primary/20" />
        <div className="absolute top-[60%] left-[40%] w-1 h-1 rounded-full bg-primary/25" />
        <div className="absolute top-[45%] right-[35%] w-0.5 h-0.5 rounded-full bg-white/15" />
        <div className="absolute top-[70%] left-[25%] w-0.5 h-0.5 rounded-full bg-white/10" />
      </motion.div>

      {/* Center line — fastest parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{ y: y3, opacity }}
      >
        <motion.div
          className="w-px h-24 md:h-32 bg-gradient-to-b from-transparent via-primary/40 to-transparent"
          style={{ scaleY: lineScale }}
        />
      </motion.div>

      {/* Radial glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity }}
      >
        <div
          className="w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Top & bottom fade into background */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Grain */}
      <div className="absolute inset-0 grain pointer-events-none z-20" />
    </div>
  );
};

export default ParallaxDivider;
