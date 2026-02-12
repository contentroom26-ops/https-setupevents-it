/**
 * Text with a permanent shimmer/highlight effect using pure CSS animation.
 */
const TextReveal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none shimmer-effect"
      />
    </span>
  );
};

export default TextReveal;
