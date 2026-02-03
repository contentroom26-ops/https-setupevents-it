import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Corporate Events",
    description: "Meeting, convention, cene aziendali e team building progettati per rafforzare il tuo brand.",
  },
  {
    number: "02",
    title: "Brand Activations",
    description: "Esperienze immersive che trasformano i consumatori in ambasciatori del brand.",
  },
  {
    number: "03",
    title: "Event Production",
    description: "Produzione completa con tecnologie all'avanguardia, regia professionale e storytelling.",
  },
  {
    number: "04",
    title: "Location & Allestimenti",
    description: "Scouting delle migliori location italiane con allestimenti scenografici su misura.",
  },
  {
    number: "05",
    title: "Staff & Regia",
    description: "Team di professionisti esperti per garantire un'esecuzione impeccabile.",
  },
  {
    number: "06",
    title: "Hostess & Immagine",
    description: "Personale selezionato per eventi e promozioni. Professionalità e stile impeccabile.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
      delay: i * 0.1,
    },
  }),
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div>
            <motion.span 
              className="text-sm text-muted-foreground uppercase tracking-widest block mb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Servizi
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Cosa<br />
              <span className="italic font-normal">facciamo</span>
            </motion.h2>
          </div>
          <motion.p 
            className="text-muted-foreground max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Ogni servizio è progettato per creare eventi che lasciano il segno. 
            Dalla strategia all'esecuzione.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-background p-8 group hover:bg-foreground hover:text-background transition-colors duration-300 cursor-pointer relative overflow-hidden"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Animated background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <motion.span 
                    className="text-sm text-muted-foreground group-hover:text-background/60 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    [{service.number}]
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ rotate: 45 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground group-hover:text-background/70 transition-colors">
                  {service.description}
                </p>
              </div>
              
              {/* Bottom line animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-foreground group-hover:bg-background"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
