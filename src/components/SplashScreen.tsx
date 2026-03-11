import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoIcon from "@/assets/logo-icon.png";

const ease = [0.22, 1, 0.36, 1] as const;

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    // Show logo for a beat, then start reveal
    const t1 = setTimeout(() => setPhase("reveal"), 1800);
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {/* Logo icon */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              phase === "logo"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.6, y: -60 }
            }
            transition={{ duration: phase === "logo" ? 0.8 : 0.6, ease }}
          >
            <motion.img
              src={logoIcon}
              alt="Setup Events"
              className="w-20 h-20 md:w-28 md:h-28"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease }}
            />
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tighter text-foreground">
                SETUP<span className="text-primary">EVENTS</span>
              </h1>
              <motion.p
                className="text-muted-foreground text-xs md:text-sm uppercase tracking-[0.4em] mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                We Set the Moment
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Animated line under logo */}
          <motion.div
            className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-16 h-px bg-primary"
            initial={{ width: 0 }}
            animate={phase === "logo" ? { width: "120px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: phase === "logo" ? 0.7 : 0, ease }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
