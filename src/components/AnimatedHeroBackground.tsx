import { motion } from "framer-motion";

const AnimatedHeroBackground = () => {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated geometric shapes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        {/* Large rotating square */}
        <motion.rect
          x="800"
          y="300"
          width="400"
          height="400"
          fill="none"
          stroke="white"
          strokeWidth="1"
          initial={{ rotate: 0, opacity: 0.3 }}
          animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "1000px 500px" }}
        />

        {/* Smaller counter-rotating square */}
        <motion.rect
          x="850"
          y="350"
          width="300"
          height="300"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          initial={{ rotate: 45, opacity: 0.2 }}
          animate={{ rotate: -315, opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "1000px 500px" }}
        />

        {/* Pulsing circle */}
        <motion.circle
          cx="1000"
          cy="500"
          r="150"
          fill="none"
          stroke="white"
          strokeWidth="1"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Expanding circles */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx="1000"
            cy="500"
            r="100"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 3], opacity: [0.5, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Horizontal moving lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.line
            key={`h-${i}`}
            x1="-100"
            y1={200 + i * 180}
            x2="300"
            y2={200 + i * 180}
            stroke="white"
            strokeWidth="0.5"
            initial={{ x: -400 }}
            animate={{ x: 2200 }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
          />
        ))}

        {/* Vertical moving lines */}
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={`v-${i}`}
            x1={300 + i * 450}
            y1="-100"
            x2={300 + i * 450}
            y2="200"
            stroke="white"
            strokeWidth="0.5"
            initial={{ y: -300 }}
            animate={{ y: 1200 }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          />
        ))}

        {/* Diagonal lines */}
        <motion.line
          x1="0"
          y1="0"
          x2="600"
          y2="600"
          stroke="white"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.line
          x1="1920"
          y1="0"
          x2="1320"
          y2="600"
          stroke="white"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4, ease: "easeInOut" }}
        />

        {/* Floating triangles */}
        <motion.polygon
          points="150,100 250,250 50,250"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          initial={{ y: 0, rotate: 0, opacity: 0.3 }}
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.polygon
          points="1700,800 1800,950 1600,950"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          initial={{ y: 0, rotate: 0, opacity: 0.3 }}
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Abstract architectural shapes */}
        <motion.path
          d="M 100 600 L 100 400 L 250 400 L 250 500 L 200 500 L 200 600 Z"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 1650 200 L 1650 400 L 1800 400 L 1800 300 L 1750 300 L 1750 200 Z"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, delay: 3, ease: "easeInOut" }}
        />

        {/* Floating dots */}
        {[...Array(20)].map((_, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={100 + (i % 5) * 450}
            cy={150 + Math.floor(i / 5) * 250}
            r="2"
            fill="white"
            initial={{ opacity: 0.2, scale: 1 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2], 
              scale: [1, 1.5, 1],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Central cross */}
        <motion.g
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1="950" y1="500" x2="1050" y2="500" stroke="white" strokeWidth="1" />
          <line x1="1000" y1="450" x2="1000" y2="550" stroke="white" strokeWidth="1" />
        </motion.g>

        {/* Corner accents */}
        <motion.path
          d="M 0 100 L 0 0 L 100 0"
          fill="none"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 1820 0 L 1920 0 L 1920 100"
          fill="none"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 980 L 0 1080 L 100 1080"
          fill="none"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4, ease: "easeInOut" }}
        />
        <motion.path
          d="M 1920 980 L 1920 1080 L 1820 1080"
          fill="none"
          stroke="white"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 6, ease: "easeInOut" }}
        />
      </svg>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
};

export default AnimatedHeroBackground;
