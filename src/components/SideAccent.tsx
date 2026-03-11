import { motion } from "framer-motion";

/**
 * Persistent left-side accent element from the creative concept:
 * vertical line + red cross (+) icon
 */
const SideAccent = () => {
  return (
    <div className="fixed left-5 sm:left-8 lg:left-12 top-0 bottom-0 z-30 pointer-events-none hidden md:flex flex-col items-center">
      {/* Vertical line */}
      <motion.div
        className="w-px bg-white/10 flex-1 origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Red cross accent */}
      <motion.div
        className="my-6 relative w-4 h-4 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute w-4 h-px bg-primary" />
        <div className="absolute w-px h-4 bg-primary" />
      </motion.div>

      {/* Bottom line */}
      <motion.div
        className="w-px bg-white/10 flex-1 origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

export default SideAccent;
