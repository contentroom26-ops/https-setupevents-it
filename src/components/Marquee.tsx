const words = [
  "CORPORATE EVENTS",
  "BRAND ACTIVATION",
  "LAUNCH PRODUCT",
  "HOSTESS & STEWARD",
  "PUBLIC RELATIONS",
  "LOCATION & SET-UP",
  "A/V SERVICES",
  "FIRENZE",
];

const Marquee = () => {
  const content = words.join(" • ") + " • ";

  return (
    <div className="section-dark py-5 overflow-hidden border-y border-accent-foreground/10">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-sm font-display font-bold tracking-[0.3em] text-accent-foreground/40 uppercase">
          {content}
        </span>
        <span className="text-sm font-display font-bold tracking-[0.3em] text-accent-foreground/40 uppercase">
          {content}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
