import { useTranslation } from "react-i18next";

const Marquee = ({ text }: { text?: string }) => {
  const { t } = useTranslation();
  const content = text || t("marquee");

  return (
    <div className="py-6 md:py-8 overflow-hidden border-y border-border/30 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse-glow pointer-events-none" />
      <div className="flex whitespace-nowrap animate-marquee">
        {Array(3).fill(null).map((_, i) => (
          <span key={i} className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-bold tracking-tighter text-foreground/8 uppercase mx-4">
            {content}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
