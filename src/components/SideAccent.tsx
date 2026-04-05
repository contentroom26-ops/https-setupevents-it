/**
 * Persistent left-side accent — pure CSS, no Framer Motion overhead.
 */
const SideAccent = () => {
  return (
    <div className="fixed left-5 sm:left-8 lg:left-12 top-0 bottom-0 z-30 pointer-events-none hidden md:flex flex-col items-center">
      <div className="w-px bg-foreground/10 flex-1 origin-top" style={{ transform: "scaleY(1)" }} />
      <div className="my-6 relative w-4 h-4 flex items-center justify-center">
        <div className="absolute w-4 h-px bg-primary" />
        <div className="absolute w-px h-4 bg-primary" />
      </div>
      <div className="w-px bg-foreground/10 flex-1 origin-bottom" />
    </div>
  );
};

export default SideAccent;
