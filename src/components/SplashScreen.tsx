import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoS from "@/assets/logo-s.png";
import logoFull from "@/assets/logo-full.png";

const ease = [0.22, 1, 0.36, 1] as const;

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"s" | "expand" | "split">("s");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("expand"), 1600);
    const t2 = setTimeout(() => setPhase("split"), 2800);
    const t3 = setTimeout(() => onComplete(), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "split" ? (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          {/* Curtain top */}
          <motion.div
            className="absolute inset-x-0 top-0 bg-background z-[2]"
            initial={{ height: "50%" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.8, ease }}
          />
          {/* Curtain bottom */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-background z-[2]"
            initial={{ height: "50%" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.8, ease }}
          />

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center z-[3]">
            {/* Big S logo */}
            <motion.img
              src={logoS}
              alt=""
              initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
              animate={
                phase === "s"
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 0, scale: 2.5, rotate: 10 }
              }
              transition={{
                duration: phase === "s" ? 1.2 : 0.7,
                ease,
              }}
              className="absolute"
              style={{ width: "clamp(200px, 40vw, 450px)" }}
            />

            {/* Full logo appears after S expands */}
            <motion.img
              src={logoFull}
              alt="Setup Events"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                phase === "expand"
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.6 }
              }
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease }}
              className="absolute"
              style={{ width: "clamp(300px, 50vw, 650px)" }}
            />
          </div>

          {/* Horizontal line that expands */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-primary z-[4]"
            initial={{ width: 0 }}
            animate={
              phase === "s"
                ? { width: 0 }
                : phase === "expand"
                ? { width: "30vw" }
                : { width: "100vw" }
            }
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
