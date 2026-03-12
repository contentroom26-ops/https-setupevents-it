import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoSplash from "@/assets/logo-splash.png";

const ease = [0.22, 1, 0.36, 1] as const;
const easeOut = [0.16, 1, 0.3, 1] as const;

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"enter" | "hold" | "vortex">("enter");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 700);
    const t2 = setTimeout(() => setPhase("vortex"), 1800);
    const t3 = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const isVortex = phase === "vortex";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {/* Vortex rings — concentric circles that spin inward on exit */}
          {[0.9, 0.7, 0.5, 0.35].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border pointer-events-none"
              style={{
                width: `${size * 100}vw`,
                height: `${size * 100}vw`,
                maxWidth: `${size * 100}vh`,
                maxHeight: `${size * 100}vh`,
                borderColor: `hsl(0 85% 55% / ${0.06 + i * 0.03})`,
              }}
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={
                isVortex
                  ? { opacity: 0, scale: 0, rotate: 180 + i * 90 }
                  : { opacity: 1, scale: 1, rotate: 0 }
              }
              transition={{
                duration: isVortex ? 0.9 : 0.8,
                delay: isVortex ? i * 0.06 : 0.3 + i * 0.1,
                ease: easeOut,
              }}
            />
          ))}

          {/* Radial glow — pulses then implodes */}
          <motion.div
            className="absolute rounded-full pointer-events-none will-change-transform"
            style={{
              width: "70vw",
              height: "70vw",
              maxWidth: "70vh",
              maxHeight: "70vh",
              background: "radial-gradient(circle, hsl(0 72% 51% / 0.2) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={
              isVortex
                ? { opacity: 0, scale: 0 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: isVortex ? 0.7 : 0.9, ease: easeOut }}
          />

          {/* Logo — scales up then gets sucked into vortex */}
          <motion.img
            src={logoSplash}
            alt="SetupEvents"
            className="relative z-10 w-[75vw] max-w-[600px] md:w-[45vw] md:max-w-[700px] will-change-transform"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={
              isVortex
                ? { opacity: 0, scale: 12, rotate: 8, filter: "blur(20px)" }
                : phase === "hold"
                ? { opacity: 1, scale: 1, y: 0, rotate: 0, filter: "blur(0px)" }
                : { opacity: 1, scale: 1, y: 0, rotate: 0, filter: "blur(0px)" }
            }
            transition={
              isVortex
                ? { duration: 1, ease: easeOut }
                : { duration: 0.7, ease }
            }
          />

          {/* Horizontal accent line */}
          <motion.div
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-primary/40 z-20 origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              isVortex
                ? { scaleX: 0, opacity: 0 }
                : { scaleX: 1, opacity: 1 }
            }
            transition={{ duration: 0.5, delay: isVortex ? 0 : 0.4, ease }}
            style={{ maxWidth: "45vw", margin: "0 auto" }}
          />

          {/* Corner accents */}
          {[
            "top-6 left-6",
            "top-6 right-6",
            "bottom-6 left-6",
            "bottom-6 right-6",
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} z-20`}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isVortex
                  ? { opacity: 0, scale: 0, rotate: 90 }
                  : { opacity: 0.25, scale: 1, rotate: 0 }
              }
              transition={{
                duration: 0.3,
                delay: isVortex ? 0 : 0.5 + i * 0.06,
                ease,
              }}
            >
              <div className="w-5 h-px bg-primary" />
              <div className="w-px h-5 bg-primary" />
            </motion.div>
          ))}

          {/* Fullscreen dissolve overlay — fades in during vortex for smooth transition */}
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{ background: "hsl(40 8% 8%)" }}
            initial={{ opacity: 0 }}
            animate={isVortex ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: isVortex ? 0.3 : 0, ease: easeOut }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
