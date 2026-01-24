import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const AnimatedHeroBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Different parallax layers
  const layer1X = useTransform(smoothX, [0, 1], [-30, 30]);
  const layer1Y = useTransform(smoothY, [0, 1], [-30, 30]);
  const layer2X = useTransform(smoothX, [0, 1], [-60, 60]);
  const layer2Y = useTransform(smoothY, [0, 1], [-60, 60]);
  const layer3X = useTransform(smoothX, [0, 1], [-15, 15]);
  const layer3Y = useTransform(smoothY, [0, 1], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Grid pattern - Layer 3 (subtle parallax) */}
      <motion.div style={{ x: layer3X, y: layer3Y }} className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-15">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Layer 1 - Main geometric shapes */}
      <motion.svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
        style={{ x: layer1X, y: layer1Y }}
      >
        {/* Large rotating squares - faster */}
        <motion.rect
          x="750"
          y="250"
          width="450"
          height="450"
          fill="none"
          stroke="white"
          strokeWidth="1"
          initial={{ rotate: 0, opacity: 0.4 }}
          animate={{ rotate: 360, opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "975px 475px" }}
        />
        <motion.rect
          x="800"
          y="300"
          width="350"
          height="350"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          initial={{ rotate: 45, opacity: 0.3 }}
          animate={{ rotate: -315, opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "975px 475px" }}
        />
        <motion.rect
          x="875"
          y="375"
          width="200"
          height="200"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          initial={{ rotate: 0, opacity: 0.5 }}
          animate={{ rotate: -360, opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "975px 475px" }}
        />

        {/* Pulsing circles - faster */}
        <motion.circle
          cx="975"
          cy="475"
          r="180"
          fill="none"
          stroke="white"
          strokeWidth="1"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Expanding circles - more of them, faster */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={i}
            cx="975"
            cy="475"
            r="80"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 4], opacity: [0.6, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Central hexagon */}
        <motion.polygon
          points="975,380 1050,427 1050,522 975,570 900,522 900,427"
          fill="none"
          stroke="white"
          strokeWidth="1"
          initial={{ rotate: 0, opacity: 0.4 }}
          animate={{ rotate: 360, opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "975px 475px" }}
        />
      </motion.svg>

      {/* Layer 2 - Fast moving elements */}
      <motion.svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
        style={{ x: layer2X, y: layer2Y }}
      >
        {/* Fast horizontal lines */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.line
            key={`h-${i}`}
            x1="-200"
            y1={100 + i * 130}
            x2="0"
            y2={100 + i * 130}
            stroke="white"
            strokeWidth={i % 2 === 0 ? "1" : "0.5"}
            initial={{ x: -200 }}
            animate={{ x: 2200 }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear"
            }}
          />
        ))}

        {/* Fast vertical lines */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.line
            key={`v-${i}`}
            x1={200 + i * 320}
            y1="-100"
            x2={200 + i * 320}
            y2="100"
            stroke="white"
            strokeWidth="0.5"
            initial={{ y: -200 }}
            animate={{ y: 1300 }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
          />
        ))}

        {/* Diagonal streaks */}
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={`d-${i}`}
            x1={-100 + i * 600}
            y1="-100"
            x2={100 + i * 600}
            y2="100"
            stroke="white"
            strokeWidth="0.3"
            initial={{ x: -300, y: -300 }}
            animate={{ x: 2200, y: 1400 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
          />
        ))}

        {/* Floating triangles - more dynamic */}
        <motion.polygon
          points="120,80 220,230 20,230"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          initial={{ y: 0, rotate: 0, opacity: 0.4 }}
          animate={{ y: [0, -50, 0], rotate: [0, 20, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.polygon
          points="1750,750 1850,900 1650,900"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          initial={{ y: 0, rotate: 0, opacity: 0.4 }}
          animate={{ y: [0, 40, 0], rotate: [0, -25, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.polygon
          points="200,700 300,850 100,850"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          initial={{ y: 0, rotate: 0, opacity: 0.3 }}
          animate={{ y: [0, -30, 0], rotate: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.polygon
          points="1650,150 1750,300 1550,300"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          initial={{ y: 0, rotate: 0, opacity: 0.3 }}
          animate={{ y: [0, 25, 0], rotate: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Abstract architectural shapes */}
        <motion.path
          d="M 80 550 L 80 350 L 230 350 L 230 450 L 180 450 L 180 550 Z"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3], pathLength: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 1680 180 L 1680 380 L 1830 380 L 1830 280 L 1780 280 L 1780 180 Z"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3], pathLength: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
        />

        {/* Plus signs */}
        {[
          { x: 400, y: 200 },
          { x: 1500, y: 300 },
          { x: 300, y: 800 },
          { x: 1600, y: 700 },
          { x: 500, y: 500 },
          { x: 1400, y: 600 },
        ].map((pos, i) => (
          <motion.g
            key={`plus-${i}`}
            initial={{ opacity: 0.2, scale: 1 }}
            animate={{ 
              opacity: [0.2, 0.6, 0.2], 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ 
              duration: 3 + i * 0.5, 
              repeat: Infinity, 
              delay: i * 0.4,
              ease: "easeInOut" 
            }}
            style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
          >
            <line x1={pos.x - 15} y1={pos.y} x2={pos.x + 15} y2={pos.y} stroke="white" strokeWidth="1" />
            <line x1={pos.x} y1={pos.y - 15} x2={pos.x} y2={pos.y + 15} stroke="white" strokeWidth="1" />
          </motion.g>
        ))}
      </motion.svg>

      {/* Layer 3 - Dots and particles */}
      <motion.svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
        style={{ x: layer3X, y: layer3Y }}
      >
        {/* Floating dots grid */}
        {[...Array(40)].map((_, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={80 + (i % 8) * 240}
            cy={100 + Math.floor(i / 8) * 200}
            r={i % 3 === 0 ? 3 : 2}
            fill="white"
            initial={{ opacity: 0.2, scale: 1 }}
            animate={{ 
              opacity: [0.2, 0.9, 0.2], 
              scale: [1, 1.8, 1],
              y: [0, -15, 0]
            }}
            transition={{
              duration: 2 + (i % 4) * 0.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Corner brackets */}
        <motion.path
          d="M 0 120 L 0 0 L 120 0"
          fill="none"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 1800 0 L 1920 0 L 1920 120"
          fill="none"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 960 L 0 1080 L 120 1080"
          fill="none"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M 1920 960 L 1920 1080 L 1800 1080"
          fill="none"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 3, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </div>
  );
};

export default AnimatedHeroBackground;
