import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import logoS from "@/assets/logo-s.png";
import logoFull from "@/assets/logo-full.png";

const ease = [0.22, 1, 0.36, 1] as const;

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"s" | "expand" | "hold" | "exit">("s");

  useEffect(() => {
    // Phase 1: Show "S" icon (1.2s)
    const t1 = setTimeout(() => setPhase("expand"), 1200);
    // Phase 2: Expand to full logo (after expand anim completes ~0.8s)
    const t2 = setTimeout(() => setPhase("hold"), 2200);
    // Phase 3: Hold full logo briefly, then exit
    const t3 = setTimeout(() => setPhase("exit"), 3200);
    const t4 = setTimeout(() => onComplete(), 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {/* "S" logo — starts centered, scales down and fades as full logo appears */}
          <motion.img
            src={logoS}
            alt=""
            className="absolute"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              phase === "s"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.4 }
            }
            transition={{ duration: 0.8, ease }}
            style={{ width: "clamp(100px, 18vw, 200px)" }}
          />

          {/* Full logo — fades in and scales up from where S was */}
          <motion.img
            src={logoFull}
            alt="Setup Events"
            className="absolute"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={
              phase === "s"
                ? { opacity: 0, scale: 0.7 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.9, ease }}
            style={{ width: "clamp(280px, 45vw, 600px)" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
