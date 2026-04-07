import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type TransitionVariant = "curtain" | "dissolve" | "wipe" | "glow";

interface SectionTransitionProps {
  variant?: TransitionVariant;
  height?: string;
  label?: string;
}

/* ─────────────────────────────────────────────
   Ogni variante è un semplice divider animato
   che NON usa sticky/fixed positioning.
   Solo transform + opacity per 60 fps.
───────────────────────────────────────────── */

const CurtainTransition = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const leftX = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "-105%"]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.6], ["0%", "105%"]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.7], [1, 0]);
  const lineScale = useTransform(scrollYProgress, [0.05, 0.3, 0.6], [0, 1, 0]);
  const lineOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.5, 0.65], [0, 0.4, 0.4, 0]);

  return (
    <>
      {/* Due pannelli che si aprono */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-background z-10"
        style={{ x: leftX, opacity }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-background z-10"
        style={{ x: rightX, opacity }}
      />
      {/* Linea centrale verticale */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[40%] bg-gradient-to-b from-transparent via-primary/20 to-transparent z-20"
        style={{ scaleY: lineScale, opacity: lineOpacity }}
      />
    </>
  );
};

const DissolveTransition = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.8, 0.2, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 0.15, 0]);
  const lineScaleX = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <>
      <motion.div className="absolute inset-0 bg-background z-10" style={{ opacity: overlayOpacity }} />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[20vh] rounded-full blur-[80px] z-[5]"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
          opacity: glowOpacity,
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20"
        style={{ scaleX: lineScaleX }}
      />
    </>
  );
};

const WipeTransition = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const wipeX = useTransform(scrollYProgress, [0.05, 0.65], ["-100%", "100%"]);
  const wipeOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.5, 0.65], [0, 0.6, 0.6, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 0.3, 0.1, 0]);

  return (
    <>
      <motion.div className="absolute inset-0 bg-background z-[5]" style={{ opacity: bgOpacity }} />
      <motion.div
        className="absolute inset-y-0 w-[50%] z-10"
        style={{
          x: wipeX,
          opacity: wipeOpacity,
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.06) 40%, hsl(var(--primary) / 0.12) 50%, hsl(var(--primary) / 0.06) 60%, transparent 100%)",
        }}
      />
    </>
  );
};

const GlowTransition = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const bgOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.7, 0.3, 0.1, 0]);
  const glowScale = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.4, 1, 0.4]);
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 0.25, 0]);
  const dotOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

  return (
    <>
      <motion.div className="absolute inset-0 bg-background z-[5]" style={{ opacity: bgOpacity }} />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[300px] max-h-[300px] rounded-full blur-[100px] z-10"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 60%)",
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary z-20"
        style={{ opacity: dotOpacity, boxShadow: "0 0 15px hsl(var(--primary) / 0.4)" }}
      />
    </>
  );
};

const VARIANTS = {
  curtain: CurtainTransition,
  dissolve: DissolveTransition,
  wipe: WipeTransition,
  glow: GlowTransition,
};

const SectionTransition = ({
  variant = "dissolve",
  height = "h-[20vh] md:h-[30vh]",
  label,
}: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const Variant = VARIANTS[variant];

  /* Label animation */
  const labelOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [0, 1, 1, 0]);
  const labelY = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [20, 0, 0, -20]);

  return (
    <div
      ref={ref}
      className={`relative ${height} overflow-hidden`}
      aria-hidden="true"
    >
      {/* Gradient edges per fusione morbida con le sezioni adiacenti */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background to-transparent z-30 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none" />

      {/* Contenitore centrato per effetti */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Variant scrollYProgress={scrollYProgress} />

        {/* Label opzionale */}
        {label && (
          <motion.p
            className="relative z-30 text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/20 font-medium select-none"
            style={{ opacity: labelOpacity, y: labelY }}
          >
            {label}
          </motion.p>
        )}
      </div>

      {/* Grain texture */}
      <div className="absolute inset-0 grain pointer-events-none opacity-20 z-40" />
    </div>
  );
};

export default SectionTransition;
