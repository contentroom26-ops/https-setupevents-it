import { ReactNode } from "react";

interface StackSectionProps {
  children: ReactNode;
  zIndex: number;
  className?: string;
}

/**
 * Wraps a section so it sticks at top while scrolling.
 * Sections with lower zIndex appear "behind" higher ones,
 * creating a card-stack reveal effect in both scroll directions.
 * Only transform & opacity are animated → 60 fps.
 */
const StackSection = ({ children, zIndex, className = "" }: StackSectionProps) => (
  <div className={`relative ${className}`} style={{ zIndex }}>
    <div className="sticky top-0">
      {/* Subtle top shadow for depth when revealed from behind */}
      <div
        className="absolute inset-x-0 top-0 h-20 pointer-events-none z-[1]"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)",
        }}
      />
      {children}
    </div>
  </div>
);

export default StackSection;
