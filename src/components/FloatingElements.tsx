/**
 * Persistent floating decorative elements using pure CSS animations.
 * No Framer Motion JS overhead — fully GPU-accelerated.
 */
const FloatingElements = ({
  variant = "dots",
  count = 5,
}: {
  variant?: "dots" | "lines" | "circles";
  count?: number;
}) => {
  if (variant === "lines") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent floating-line"
            style={{
              top: `${15 + i * (70 / count)}%`,
              left: "-10%",
              width: `${30 + ((i * 17) % 40)}%`,
              ["--duration" as string]: `${8 + i * 2}s`,
              ["--delay" as string]: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "circles") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/10 floating-circle"
            style={{
              width: 60 + i * 40,
              height: 60 + i * 40,
              top: `${20 + Math.sin(i) * 30}%`,
              right: `${-5 + i * 8}%`,
              ["--duration" as string]: `${12 + i * 4}s`,
            }}
          />
        ))}
      </div>
    );
  }

  // dots variant
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30 floating-dot"
          style={{
            top: `${10 + i * (80 / count)}%`,
            left: `${5 + (i * 37) % 90}%`,
            ["--duration" as string]: `${3 + i * 0.8}s`,
            ["--delay" as string]: `${i * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
