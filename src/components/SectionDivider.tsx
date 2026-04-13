import { motion } from "framer-motion";

type DividerStyle = "line" | "dot" | "glow";

interface SectionDividerProps {
  style?: DividerStyle;
}

const ease = [0.22, 1, 0.36, 1] as const;

const LineDivider = () => (
  <motion.div
    className="flex items-center justify-center gap-4 py-16 md:py-24"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.8, ease }}
  >
    <motion.div
      className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      initial={{ width: 0 }}
      whileInView={{ width: "min(60vw, 400px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.2, ease }}
    />
  </motion.div>
);

const DotDivider = () => (
  <motion.div
    className="flex items-center justify-center gap-3 py-14 md:py-20"
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.7, ease }}
  >
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-1 h-1 rounded-full bg-primary/40"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 * i, ease }}
      />
    ))}
  </motion.div>
);

const GlowDivider = () => (
  <motion.div
    className="flex items-center justify-center py-16 md:py-24"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 1, ease }}
  >
    <motion.div
      className="relative w-24 h-24"
      initial={{ scale: 0.3, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.2, ease }}
    >
      <div
        className="absolute inset-0 rounded-full blur-[40px]"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)" }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/50" />
    </motion.div>
  </motion.div>
);

const DIVIDERS = { line: LineDivider, dot: DotDivider, glow: GlowDivider };

const SectionDivider = ({ style = "line" }: SectionDividerProps) => {
  const Comp = DIVIDERS[style];
  return <Comp />;
};

export default SectionDivider;
