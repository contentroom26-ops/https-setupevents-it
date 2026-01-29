import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  "DIESEL",
  "MEDIOLANUM",
  "PRADA",
  "ARMANI",
  "BULGARI",
  "FERRAGAMO",
];

interface ClientLogoProps {
  client: string;
  index: number;
  isInView: boolean;
}

const ClientLogo = ({ client, index, isInView }: ClientLogoProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const scale = useSpring(1, springConfig);
  const z = useSpring(0, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
    scale.set(1.15);
    z.set(50);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
    z.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      style={{ perspective: 600 }}
      initial={{ opacity: 0, y: 40, rotateX: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative px-6 py-4"
        style={{
          rotateX,
          rotateY,
          scale,
          z,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background glow on hover */}
        <motion.div
          className="absolute inset-0 bg-foreground/5 rounded-sm opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Client name with 3D depth */}
        <motion.span 
          className="relative text-xl md:text-2xl lg:text-3xl font-display font-bold text-foreground/30 hover:text-foreground transition-colors duration-300 tracking-tight block"
          style={{ transform: "translateZ(20px)" }}
        >
          {client}
        </motion.span>
        
        {/* Underline animation */}
        <motion.div
          className="absolute bottom-2 left-6 right-6 h-px bg-foreground origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-transparent" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number-label text-foreground/60">[02] — Clienti</span>
          <motion.span 
            className="text-foreground/50 text-sm uppercase tracking-widest"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            20+ eventi realizzati
          </motion.span>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-14">
          {clients.map((client, index) => (
            <ClientLogo
              key={client}
              client={client}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
        
        {/* Decorative line */}
        <motion.div
          className="mt-16 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        />
      </div>
    </section>
  );
};

export default ClientsSection;