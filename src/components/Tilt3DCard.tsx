import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // max tilt degrees, default 8
  glare?: boolean;
  scale?: number; // hover scale, default 1.02
  perspective?: number; // default 800
}

const Tilt3DCard = ({
  children,
  className = "",
  intensity = 8,
  glare = true,
  scale = 1.02,
  perspective = 800,
}: Tilt3DCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * -intensity * 2;
      const tiltY = (x - 0.5) * intensity * 2;
      setTilt({ x: tiltX, y: tiltY });
      setGlarePos({ x: x * 100, y: y * 100 });
    },
    [intensity]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 50 });
  }, []);

  return (
    <div style={{ perspective }} className="w-full">
      <motion.div
        ref={ref}
        className={`relative overflow-hidden ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? scale : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
        {/* Glare overlay */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[inherit]"
            style={{
              opacity: isHovered ? 0.12 : 0,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Tilt3DCard;
