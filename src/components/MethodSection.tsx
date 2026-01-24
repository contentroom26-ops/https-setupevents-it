import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import NetworkAnimation from "./NetworkAnimation";

const steps = [
  {
    number: "01",
    title: "Brief",
    description: "Ascoltiamo le tue esigenze e obiettivi. Analizziamo ogni dettaglio.",
  },
  {
    number: "02",
    title: "Concept",
    description: "Sviluppiamo idee creative e proposte visive su misura.",
  },
  {
    number: "03",
    title: "Produzione",
    description: "Gestiamo ogni aspetto: location, fornitori, staff, tecnologie.",
  },
  {
    number: "04",
    title: "Evento",
    description: "Coordiniamo ogni elemento per un'esecuzione perfetta.",
  },
];

const MethodSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-foreground text-background relative overflow-hidden" ref={ref}>
      {/* Network Animation Background */}
      <div className="absolute inset-0">
        <NetworkAnimation 
          particleCount={80}
          connectionDistance={120}
          particleColor="rgba(255, 255, 255, 0.5)"
          lineColor="rgba(255, 255, 255, 0.1)"
          mouseRadius={180}
        />
      </div>
      
      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-transparent to-foreground pointer-events-none" />
      <div className="absolute inset-0 bg-foreground/30 pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number-label block mb-4 text-background/50">[06] — Metodo</span>
          <h2 className="heading-section">
            IL NOSTRO<br />
            <span className="italic font-normal">PROCESSO</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Card background with glassmorphism */}
              <div className="absolute inset-0 -m-4 rounded-2xl bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-4 -m-4">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-6xl md:text-7xl font-display font-bold text-background/10 group-hover:text-background/20 transition-colors duration-300">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-background/60 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connection line to next step */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-8 -right-4 w-8 h-px bg-background/20"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Process flow indicator */}
        <motion.div 
          className="mt-16 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {steps.map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <motion.div 
                className="w-3 h-3 rounded-full bg-background/40"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              />
              {index < steps.length - 1 && (
                <motion.div 
                  className="w-12 h-px bg-background/20"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MethodSection;
