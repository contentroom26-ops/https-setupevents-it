import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
  isInView?: boolean;
}

const Card3D = ({ 
  children, 
  className = "", 
  glowColor = "rgba(0,0,0,0.1)",
  delay = 0,
  isInView = true
}: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  // Lighting effect
  const lightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const lightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalized position (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;
    
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
      className={`relative ${className}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card content */}
        <div 
          className="relative bg-background/90 backdrop-blur-sm border border-foreground/10 overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Dynamic lighting overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform(
                [lightX, lightY],
                ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${glowColor} 0%, transparent 60%)`
              ),
            }}
          />
          
          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: useTransform(
                [lightX, lightY],
                ([x, y]) => `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1) ${Number(x) * 0.5 + 45}%, transparent 60%)`
              ),
            }}
          />
          
          {/* Content with 3D depth */}
          <div style={{ transform: "translateZ(20px)" }}>
            {children}
          </div>
        </div>
        
        {/* Shadow layer */}
        <motion.div
          className="absolute inset-0 -z-10 bg-foreground/5 blur-xl"
          style={{
            transform: "translateZ(-40px) scale(0.95)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Card3D;