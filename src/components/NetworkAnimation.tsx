import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface NetworkAnimationProps {
  particleCount?: number;
  connectionDistance?: number;
  particleColor?: string;
  lineColor?: string;
  mouseRadius?: number;
}

const NetworkAnimation = ({
  particleCount = 60,
  connectionDistance = 150,
  particleColor = "rgba(255, 255, 255, 0.6)",
  lineColor = "rgba(255, 255, 255, 0.15)",
  mouseRadius = 200,
}: NetworkAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }
    return particles;
  }, [particleCount]);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Update and draw particles
    particles.forEach((p, i) => {
      // Mouse interaction - attract particles
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < mouseRadius) {
        const force = (mouseRadius - dist) / mouseRadius;
        p.vx += (dx / dist) * force * 0.02;
        p.vy += (dy / dist) * force * 0.02;
      }

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Apply friction
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Bounce off edges
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Keep in bounds
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor.replace("0.15", (0.15 * opacity).toFixed(2));
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (dist < connectionDistance * 1.5) {
        const opacity = 1 - dist / (connectionDistance * 1.5);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw mouse glow
    if (mouse.x > 0 && mouse.y > 0) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }, [connectionDistance, lineColor, mouseRadius, particleColor]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    draw(ctx, canvas.width, canvas.height);
    animationRef.current = requestAnimationFrame(animate);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.8 }}
    />
  );
};

export default NetworkAnimation;
