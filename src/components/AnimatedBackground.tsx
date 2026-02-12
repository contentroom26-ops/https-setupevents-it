import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-accent" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(38 70% 55% / 0.5), transparent 70%)" }}
        animate={{
          x: ["-10%", "30%", "10%", "-10%"],
          y: ["-20%", "10%", "40%", "-20%"],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, hsl(280 80% 60% / 0.5), transparent 70%)" }}
        animate={{
          x: ["10%", "-20%", "5%", "10%"],
          y: ["10%", "-30%", "20%", "10%"],
          scale: [1.1, 0.8, 1.2, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
        style={{ background: "radial-gradient(circle, hsl(200 90% 50% / 0.4), transparent 70%)" }}
        animate={{
          x: ["-50%", "-30%", "-60%", "-50%"],
          y: ["-50%", "-30%", "-60%", "-50%"],
          scale: [0.9, 1.4, 1, 0.9],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise grain overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />
    </div>
  );
};

export default AnimatedBackground;
