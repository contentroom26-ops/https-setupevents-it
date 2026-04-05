import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoSplash from "@/assets/logo-splash.png";

const ease = [0.22, 1, 0.36, 1] as const;

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => requestAnimationFrame(() => setPhase("hold")), 600);
    const t2 = setTimeout(() => requestAnimationFrame(() => setPhase("exit")), 1600);
    const t3 = setTimeout(() => {
      setVisible(false);
      requestAnimationFrame(() => onComplete());
    }, 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          style={{ willChange: "opacity" }}
        >
          {/* Radial glow */}
          <motion.div
            className="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(0 72% 51% / 0.12) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1, ease }}
          />

          {/* Logo */}
          <motion.img
            src={logoSplash}
            alt="SetupEvents"
            className="relative z-10 w-[75vw] max-w-[600px] md:w-[45vw] md:max-w-[700px]"
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={
              phase === "exit"
                ? { opacity: 0, scale: 1.4, y: -20, filter: "blur(8px)" }
                : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
            }
            transition={
              phase === "exit"
                ? { duration: 0.6, ease }
                : { duration: 0.8, ease }
            }
          />

          {/* Horizontal line sweep */}
          <motion.div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-primary/40 z-20 origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              phase === "exit"
                ? { scaleX: 1.5, opacity: 0 }
                : { scaleX: 1, opacity: 1 }
            }
            transition={{ duration: 0.6, delay: phase === "exit" ? 0 : 0.5, ease }}
            style={{ maxWidth: "50vw", margin: "0 auto" }}
          />

          {/* Corner accents */}
          {[
            "top-6 left-6 origin-top-left",
            "top-6 right-6 origin-top-right",
            "bottom-6 left-6 origin-bottom-left",
            "bottom-6 right-6 origin-bottom-right",
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} z-20`}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                phase === "exit"
                  ? { opacity: 0, scale: 0 }
                  : { opacity: 0.3, scale: 1 }
              }
              transition={{ duration: 0.4, delay: phase === "exit" ? 0 : 0.6 + i * 0.08, ease }}
            >
              <div className="w-6 h-px bg-primary" />
              <div className="w-px h-6 bg-primary" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
