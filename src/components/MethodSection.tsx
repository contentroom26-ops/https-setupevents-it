import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import NetworkAnimation from "./NetworkAnimation";

const steps = [
  {
    number: "01",
    title: "Brief",
    description: "Ascoltiamo le tue esigenze e obiettivi. Analizziamo ogni dettaglio per comprendere la tua visione.",
    details: ["Analisi del target", "Definizione obiettivi", "Budget planning"],
  },
  {
    number: "02",
    title: "Concept",
    description: "Sviluppiamo idee creative e proposte visive su misura per il tuo brand.",
    details: ["Moodboard creativo", "Proposta visiva", "Timeline dettagliata"],
  },
  {
    number: "03",
    title: "Produzione",
    description: "Gestiamo ogni aspetto: location, fornitori, staff, tecnologie.",
    details: ["Selezione venue", "Coordinamento fornitori", "Setup tecnologico"],
  },
  {
    number: "04",
    title: "Evento",
    description: "Coordiniamo ogni elemento per un'esecuzione impeccabile.",
    details: ["Direzione artistica", "Live management", "Guest experience"],
  },
];

interface TimelineItemProps {
  step: typeof steps[0];
  index: number;
  isLast: boolean;
}

const TimelineItem = ({ step, index, isLast }: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Timeline connector line */}
      {!isLast && (
        <motion.div
          className="absolute left-1/2 top-[80px] w-px h-[calc(100%-40px)] -translate-x-1/2 origin-top hidden md:block"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.05))" }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      )}

      <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? "" : "md:flex-row-reverse"}`}>
        {/* Content Card */}
        <motion.div
          className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={`relative group ${isEven ? "md:ml-auto" : "md:mr-auto"} max-w-md`}>
            {/* Card */}
            <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
              {/* Glow effect */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative">
                <span className="text-sm text-background/40 uppercase tracking-widest mb-2 block">
                  Step {step.number}
                </span>
                <h3 className="text-3xl font-display font-bold mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-background/60 leading-relaxed mb-6">
                  {step.description}
                </p>
                
                {/* Details list */}
                <ul className={`space-y-2 ${isEven ? "md:text-right" : "md:text-left"}`}>
                  {step.details.map((detail, i) => (
                    <motion.li
                      key={detail}
                      className="text-sm text-background/40 flex items-center gap-2"
                      style={{ justifyContent: isEven ? "flex-end" : "flex-start" }}
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    >
                      {isEven && <span className="w-1.5 h-1.5 rounded-full bg-background/30" />}
                      {detail}
                      {!isEven && <span className="w-1.5 h-1.5 rounded-full bg-background/30" />}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center Node */}
        <motion.div
          className="relative z-10 flex-shrink-0"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            {/* Outer ring */}
            <motion.div
              className="absolute -inset-4 rounded-full border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            
            {/* Pulsing glow */}
            <motion.div
              className="absolute -inset-2 rounded-full bg-white/10 blur-md"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Main node */}
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center relative">
              <span className="text-foreground font-display font-bold text-lg">
                {step.number}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Empty space for alternating layout */}
        <div className="flex-1 hidden md:block" />
      </div>
    </div>
  );
};

const MethodSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-32 bg-foreground text-background relative overflow-hidden" ref={containerRef}>
      {/* Network Animation Background */}
      <div className="absolute inset-0 opacity-50">
        <NetworkAnimation 
          particleCount={50}
          connectionDistance={100}
          particleColor="rgba(255, 255, 255, 0.3)"
          lineColor="rgba(255, 255, 255, 0.08)"
          mouseRadius={150}
        />
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-transparent to-foreground pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number-label block mb-4 text-background/50">[06] — Metodo</span>
          <h2 className="heading-section mb-6">
            IL NOSTRO<br />
            <span className="italic font-normal">PROCESSO</span>
          </h2>
          <p className="text-background/50 max-w-xl mx-auto text-lg">
            Un approccio strutturato per trasformare la tua visione in un evento memorabile.
          </p>
        </motion.div>

        {/* Main Timeline Line (scroll-animated) */}
        <div className="absolute left-1/2 top-[300px] bottom-[200px] w-px -translate-x-1/2 hidden md:block">
          <div className="absolute inset-0 bg-white/5" />
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-white/40 via-white/20 to-transparent"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Timeline Items */}
        <div className="space-y-24 md:space-y-32">
          {steps.map((step, index) => (
            <TimelineItem
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* End marker */}
        <motion.div
          className="flex justify-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-background/40 uppercase tracking-widest text-sm">Ready to start</span>
            <div className="w-12 h-px bg-white/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodSection;
