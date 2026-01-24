import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Lightbulb, Wrench, PartyPopper } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Brief",
    description: "Ascoltiamo le tue esigenze, obiettivi e visione. Analizziamo ogni dettaglio per comprendere a fondo il tuo brand.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Concept",
    description: "Sviluppiamo idee creative e concept unici, presentandoti proposte visive e strategiche su misura.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Produzione",
    description: "Gestiamo ogni aspetto operativo: location, fornitori, staff, tecnologie. Nulla viene lasciato al caso.",
  },
  {
    number: "04",
    icon: PartyPopper,
    title: "Evento",
    description: "Il grande giorno. Coordiniamo ogni elemento in tempo reale per un'esecuzione impeccabile.",
  },
];

const MethodSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-charcoal text-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
            Il nostro metodo
          </span>
          <h2 className="heading-section mb-6">
            Come trasformiamo le <span className="italic text-gradient-gold">idee in realtà</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Un processo collaudato che garantisce risultati eccellenti, 
            dalla prima idea all'ultimo applauso.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-white/20 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative text-center lg:text-left"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Step Number Circle */}
                <motion.div 
                  className="w-16 h-16 rounded-full bg-charcoal border-2 border-primary flex items-center justify-center mx-auto lg:mx-0 mb-6 relative z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
                >
                  <step.icon className="w-7 h-7 text-primary" />
                </motion.div>
                
                <span className="text-primary font-medium text-sm tracking-widest">
                  {step.number}
                </span>
                <h3 className="text-2xl font-serif font-medium mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
