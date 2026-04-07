import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type TransitionVariant = "curtain" | "dissolve" | "wipe" | "glow";

interface SectionTransitionProps {
  variant?: TransitionVariant;
  height?: string;
  label?: string;
}

/* ─── Curtain: two panels slide apart ─── */
const CurtainTransition = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const leftX = useTransform(scrollYProgress, [0.05, 0.5], ["0%", "-100%"]);
  const rightX = useTransform(scrollYProgress, [0.05, 0.5], ["0%", "100%"]);
  const curtainOpacity = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);
  const lineScaleY = useTransform(scrollYProgress, [0.0, 0.25, 0.5], [0, 1, 0]);
  const lineOpacity = useTransform(scrollYProgress, [0.0, 0.15, 0.45, 0.55], [0, 0.5, 0.5, 0]);
  const crossScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const crossOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

  return (
    <>
      <motion.div className="absolute inset-y-0 left-0 w-1/2 bg-background z-10" style={{ x: leftX, opacity: curtainOpacity }} />
      <motion.div className="absolute inset-y-0 right-0 w-1/2 bg-background z-10" style={{ x: rightX, opacity: curtainOpacity }} />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent z-20"
        style={{ height: "50vh", scaleY: lineScaleY, opacity: lineOpacity, transformOrigin: "center" }}
      />
      <motion.div className="absolute z-20 flex items-center justify-center" style={{ scale: crossScale, opacity: crossOpacity }}>
        <div className="relative w-4 h-4">
          <div className="absolute top-1/2 left-0 w-full h-px bg-primary -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-primary -translate-x-1/2" />
        </div>
      </motion.div>
    </>
  );
};

/* ─── Dissolve: gradient fade with glow ─── */
const DissolveTransition = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 0.3, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 0.2, 0]);
  const lineScaleX = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 1, 0]);
  const lineOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 0.35, 0.35, 0]);

  return (
    <>
      <motion.div className="absolute inset-0 bg-background z-10" style={{ opacity: overlayOpacity }} />
      <motion.div
        className="absolute w-[40vw] h-[25vh] rounded-full blur-[100px] z-[5]"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)", opacity: glowOpacity }}
      />
      <motion.div
        className="absolute w-[25vw] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20"
        style={{ scaleX: lineScaleX, opacity: lineOpacity }}
      />
    </>
  );
};

/* ─── Wipe: horizontal gradient sweep ─── */
const WipeTransition = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const wipeX = useTransform(scrollYProgress, [0, 0.6], ["-100%", "100%"]);
  const wipeOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.7], [0, 0.8, 0.8, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 0.4, 0.2, 0]);

  return (
    <>
      <motion.div className="absolute inset-0 bg-background z-[5]" style={{ opacity: bgOpacity }} />
      <motion.div
        className="absolute inset-y-0 w-[60%] z-10"
        style={{
          x: wipeX,
          opacity: wipeOpacity,
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.08) 40%, hsl(var(--primary) / 0.15) 50%, hsl(var(--primary) / 0.08) 60%, transparent 100%)",
        }}
      />
    </>
  );
};

/* ─── Glow: radial pulse ─── */
const GlowTransition = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const bgOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.9, 0.4, 0.15, 0]);
  const glowScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.3, 1.2, 0.3]);
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.45, 0.9], [0, 0.35, 0]);
  const dotOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.65], [0, 1, 0]);

  return (
    <>
      <motion.div className="absolute inset-0 bg-background z-[5]" style={{ opacity: bgOpacity }} />
      <motion.div
        className="absolute w-[50vw] h-[50vw] rounded-full blur-[120px] z-10"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 60%)",
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-primary z-20"
        style={{ opacity: dotOpacity, boxShadow: "0 0 20px hsl(var(--primary) / 0.5)" }}
      />
    </>
  );
};

const VARIANTS = { curtain: CurtainTransition, dissolve: DissolveTransition, wipe: WipeTransition, glow: GlowTransition };

const SectionTransition = ({ variant = "dissolve", height = "h-[50vh] md:h-[70vh]", label }: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const Variant = VARIANTS[variant];

  // Label animation
  const labelOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.65, 0.8], [0, 1, 1, 0]);
  const labelY = useTransform(scrollYProgress, [0.25, 0.45, 0.65, 0.8], [30, 0, 0, -30]);

  return (
    <div ref={ref} className={`relative ${height} -mt-px`}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pointer-events-none">
        <Variant scrollYProgress={scrollYProgress} />

        {/* Optional label */}
        {label && (
          <motion.p
            className="relative z-30 text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/20 font-medium"
            style={{ opacity: labelOpacity, y: labelY }}
          >
            {label}
          </motion.p>
        )}

        {/* Edge fades */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent z-40" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent z-40" />

        {/* Grain */}
        <div className="absolute inset-0 grain pointer-events-none opacity-30 z-50" />
      </div>
    </div>
  );
};

export default SectionTransition;
