import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoS from "@/assets/logo-s.png";

const ease = [0.22, 1, 0.36, 1] as const;

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "pulse" | "explode">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("pulse"), 1200);
    const t2 = setTimeout(() => setPhase("explode"), 2400);
    const t3 = setTimeout(() => onComplete(), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "explode" ? (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Radial glow behind the S */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "pulse" ? 1 : 0 }}
            exit={{ opacity: 0, scale: 3 }}
            transition={{ duration: 0.8, ease }}
          >
            <div
              className="w-[120vw] h-[120vw] rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(0 72% 51% / 0.15) 0%, transparent 60%)",
              }}
            />
          </motion.div>

          {/* Particle rings that expand on exit */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={
                phase === "pulse"
                  ? {
                      width: ring * 120,
                      height: ring * 120,
                      opacity: 0.3 / ring,
                    }
                  : { width: 0, height: 0, opacity: 0 }
              }
              exit={{
                width: ring * 800,
                height: ring * 800,
                opacity: 0,
              }}
              transition={{
                duration: phase === "pulse" ? 1.2 : 0.8,
                delay: ring * 0.1,
                ease,
              }}
            />
          ))}

          {/* The S — massive */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.img
              src={logoS}
              alt=""
              initial={{ opacity: 0, scale: 0.2, rotate: -180 }}
              animate={
                phase === "enter"
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 1, scale: 1.05, rotate: 0 }
              }
              exit={{ opacity: 0, scale: 8, rotate: 30 }}
              transition={{
                duration: phase === "enter" ? 1.2 : 0.6,
                ease: phase === "enter" ? ease : [0.16, 1, 0.3, 1],
              }}
              style={{
                width: "clamp(400px, 80vw, 900px)",
                filter: phase === "pulse" ? "drop-shadow(0 0 80px hsl(0 72% 51% / 0.4))" : "none",
                transition: "filter 0.8s ease",
              }}
            />
          </div>

          {/* Horizontal slash line */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary z-10"
            initial={{ width: 0, left: "50%" }}
            animate={
              phase === "pulse"
                ? { width: "40vw", left: "30%" }
                : { width: 0, left: "50%" }
            }
            exit={{ width: "120vw", left: "-10%", opacity: 0 }}
            transition={{ duration: 0.7, ease }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
