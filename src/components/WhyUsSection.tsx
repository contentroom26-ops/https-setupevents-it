import { motion, useMotionValue, useTransform, animate, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  {
    number: 100,
    suffix: "%",
    label: "Clienti soddisfatti",
    icon: "★",
  },
  {
    number: 20,
    suffix: "+",
    label: "Eventi realizzati",
    icon: "◆",
  },
  {
    number: 24,
    suffix: "h",
    label: "Tempo di risposta",
    icon: "⚡",
  },
];

const features = [
  {
    title: "Regia completa",
    description: "Gestiamo ogni aspetto del tuo evento per un risultato senza compromessi.",
    icon: "▣",
  },
  {
    title: "Estetica e precisione",
    description: "Ogni dettaglio è curato con ossessione. Impeccabile in ogni elemento.",
    icon: "◈",
  },
  {
    title: "Timing perfetto",
    description: "Gestione impeccabile del tempo e degli imprevisti.",
    icon: "◎",
  },
];

interface StatCardProps {
  stat: typeof stats[0];
  index: number;
  isInView: boolean;
}

const StatCard = ({ stat, index, isInView }: StatCardProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    if (isInView) {
      animate(count, stat.number, { duration: 2.5, ease: "easeOut" });
    }
  }, [isInView, count, stat.number]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const normalizedY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 80, rotateX: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative bg-background border-2 border-foreground p-8 md:p-10 text-center group overflow-hidden">
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "conic-gradient(from 0deg at 50% 50%, transparent, rgba(0,0,0,0.05), transparent)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          <div style={{ transform: "translateZ(30px)" }}>
            <motion.span 
              className="text-4xl mb-4 block"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {stat.icon}
            </motion.span>
            
            <span className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-foreground block">
              <motion.span>{rounded}</motion.span>
              {stat.suffix}
            </span>
            
            <p className="text-foreground/50 mt-4 text-lg uppercase tracking-widest">{stat.label}</p>
          </div>
          
          {/* Corner frames */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-foreground" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-foreground" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-foreground" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-foreground" />
        </div>
        
        {/* Shadow */}
        <div 
          className="absolute inset-0 bg-foreground/10 -z-10 blur-2xl"
          style={{ transform: "translateZ(-50px) translateY(20px) scale(0.9)" }}
        />
      </motion.div>
    </motion.div>
  );
};

interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
  isInView: boolean;
}

const FeatureCard = ({ feature, index, isInView }: FeatureCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="relative bg-background/80 border border-foreground/20 p-6 group overflow-hidden">
          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.06))",
            }}
          />
          
          <div style={{ transform: "translateZ(20px)" }} className="flex items-start gap-4">
            <span className="text-2xl opacity-40">{feature.icon}</span>
            <div>
              <h3 className="font-display font-bold text-xl mb-2 text-foreground">{feature.title}</h3>
              <p className="text-foreground/60">{feature.description}</p>
            </div>
          </div>
          
          {/* Bottom line animation */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-foreground"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-transparent" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number-label text-foreground/60 block mb-4">[07] — Risultati</span>
          <h2 className="heading-section text-foreground">
            PERCHÉ<br />
            <span className="italic font-normal">SCEGLIERCI</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <div className="mt-20 pt-16 border-t border-foreground/20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;