import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
const ease = [0.22, 1, 0.36, 1] as const;
const stats = [{
  number: 100,
  suffix: "%",
  label: "Clienti soddisfatti"
}, {
  number: 20,
  suffix: "+",
  label: "Eventi realizzati"
}, {
  number: 24,
  suffix: "h",
  label: "Tempo di risposta"
}];
const AnimatedStat = ({
  stat,
  index,
  isInView
}: {
  stat: typeof stats[0];
  index: number;
  isInView: boolean;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));
  useEffect(() => {
    if (isInView) {
      animate(count, stat.number, {
        duration: 2.5,
        ease: "easeOut"
      });
    }
  }, [isInView, count, stat.number]);
  return <motion.div className="text-center" initial={{
    opacity: 0,
    y: 40
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.6,
    delay: index * 0.15,
    ease
  }}>
      <div className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-foreground tracking-tighter">
        <motion.span>{rounded}</motion.span>
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mt-3 font-medium">
        {stat.label}
      </p>
    </motion.div>;
};
const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="section-light py-28 md:py-40 relative grain" ref={ref}>
      <div className="container-custom">
        <motion.div className="text-center mb-20" initial={{
        opacity: 0,
        y: 40
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.7,
        ease
      }}>
          <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] block mb-6">
            Risultati
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground">
            Perché{" "}
            <span className="italic font-normal text-muted-foreground">sceglierci</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-20">
          {stats.map((stat, i) => <AnimatedStat key={stat.label} stat={stat} index={i} isInView={isInView} />)}
        </div>

        {/* CTA Banner */}
        
      </div>
    </section>;
};
export default WhyUsSection;