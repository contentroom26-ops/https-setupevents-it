import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark */}
      <div className="absolute inset-0 bg-black" />

      {/* Magenta/Purple orb - top left */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vh] rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(290 90% 45% / 0.8), hsl(320 80% 50% / 0.4), transparent 70%)" }}
        animate={{
          x: ["-5%", "5%", "-5%"],
          y: ["-5%", "5%", "-5%"],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Lighter purple/pink orb - top center */}
      <motion.div
        className="absolute -top-[10%] left-[30%] w-[50vw] h-[50vh] rounded-full opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(circle, hsl(280 70% 55% / 0.6), hsl(310 60% 45% / 0.3), transparent 70%)" }}
        animate={{
          x: ["0%", "10%", "0%"],
          y: ["0%", "8%", "0%"],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Deep violet glow - bottom right */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vh] rounded-full opacity-35 blur-[130px]"
        style={{ background: "radial-gradient(circle, hsl(270 60% 40% / 0.5), hsl(300 50% 35% / 0.3), transparent 70%)" }}
        animate={{
          x: ["5%", "-5%", "5%"],
          y: ["5%", "-5%", "5%"],
          scale: [1.05, 0.95, 1.05],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise grain overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
};

export default AnimatedBackground;
