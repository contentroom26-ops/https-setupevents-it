import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoS from "@/assets/logo-s.png";

const ease = [0.22, 1, 0.36, 1] as const;

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400);
    }, 1400);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <div
            className="absolute w-[60vw] h-[60vw] rounded-full opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(0 72% 51% / 0.3) 0%, transparent 70%)",
            }}
          />

          <motion.img
            src={logoS}
            alt=""
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.6, ease }}
            style={{ width: "clamp(250px, 55vw, 500px)" }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-primary/40 z-20"
            initial={{ width: 0 }}
            animate={{ width: "25vw" }}
            exit={{ width: "100vw", opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
