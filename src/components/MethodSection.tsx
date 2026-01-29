import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Brief",
    description: "Ascoltiamo le tue esigenze e obiettivi. Analizziamo ogni dettaglio.",
    icon: "●",
  },
  {
    number: "02",
    title: "Concept",
    description: "Sviluppiamo idee creative e proposte visive su misura.",
    icon: "◐",
  },
  {
    number: "03",
    title: "Produzione",
    description: "Gestiamo ogni aspetto: location, fornitori, staff, tecnologie.",
    icon: "◑",
  },
  {
    number: "04",
    title: "Evento",
    description: "Coordiniamo ogni elemento per un'esecuzione perfetta.",
    icon: "○",
  },
];

interface StepCardProps {
  step: typeof steps[0];
  index: number;
  isInView: boolean;
}

const StepCard = ({ step, index, isInView }: StepCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const z = useSpring(0, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const normalizedY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
    z.set(30);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    z.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 100, rotateX: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ 
        duration: 1, 
        delay: index * 0.2,
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
          z,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Connection line */}
        {index < steps.length - 1 && (
          <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-foreground/20" />
        )}
        
        {/* Card */}
        <div className="relative bg-background border-2 border-foreground/30 p-8 overflow-hidden group">
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.03) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, transparent 70%)",
            }}
          />
          
          <div style={{ transform: "translateZ(40px)" }}>
            {/* Large number background */}
            <motion.span 
              className="absolute -top-4 -right-2 text-[120px] font-display font-bold text-foreground/[0.03] leading-none select-none"
              style={{ transform: "translateZ(-20px)" }}
            >
              {step.number}
            </motion.span>
            
            {/* Icon and number */}
            <div className="flex items-center gap-4 mb-6">
              <motion.span 
                className="text-4xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {step.icon}
              </motion.span>
              <span className="text-sm font-mono text-foreground/40">STEP {step.number}</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight text-foreground">
              {step.title}
            </h3>
            
            <p className="text-foreground/60 leading-relaxed text-lg">
              {step.description}
            </p>
          </div>
          
          {/* Bottom progress indicator */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-foreground"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-foreground" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-foreground" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-foreground" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-foreground" />
        </div>
        
        {/* Shadow */}
        <div 
          className="absolute inset-0 bg-foreground/15 -z-10 blur-3xl"
          style={{ transform: "translateZ(-80px) translateY(30px) scale(0.85)" }}
        />
      </motion.div>
    </motion.div>
  );
};

const MethodSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-transparent text-foreground" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number-label block mb-4 text-foreground/50">[05] — Metodo</span>
          <h2 className="heading-section">
            IL NOSTRO<br />
            <span className="italic font-normal">PROCESSO</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;