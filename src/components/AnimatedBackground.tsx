import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep noir base */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Warm burgundy/wine wash - upper left */}
      <motion.div
        className="absolute -top-[25%] -left-[15%] w-[80vw] h-[80vh] rounded-full opacity-40 blur-[150px]"
        style={{ background: "radial-gradient(circle, hsl(340 50% 30% / 0.6), hsl(355 40% 20% / 0.3), transparent 70%)" }}
        animate={{
          x: ["-3%", "6%", "-3%"],
          y: ["-3%", "4%", "-3%"],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft rose/copper glow - center right */}
      <motion.div
        className="absolute top-[10%] right-[-5%] w-[55vw] h-[55vh] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, hsl(15 55% 50% / 0.5), hsl(350 30% 35% / 0.2), transparent 70%)" }}
        animate={{
          x: ["0%", "-8%", "0%"],
          y: ["0%", "6%", "0%"],
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Deep subtle accent - bottom */}
      <motion.div
        className="absolute bottom-[-15%] left-[20%] w-[50vw] h-[50vh] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, hsl(20 45% 40% / 0.4), transparent 70%)" }}
        animate={{
          x: ["0%", "5%", "0%"],
          y: ["0%", "-4%", "0%"],
          scale: [1.02, 0.95, 1.02],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise grain */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Subtle horizontal line accent */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
};

export default AnimatedBackground;
