import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  "DIESEL",
  "MEDIOLANUM",
  "PRADA",
  "ARMANI",
  "BULGARI",
  "FERRAGAMO",
];

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.span 
            className="text-sm text-muted-foreground uppercase tracking-widest"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Brand
          </motion.span>
          <motion.span 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            20+ eventi realizzati
          </motion.span>
        </motion.div>

        <motion.div 
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {clients.map((client) => (
            <motion.span
              key={client}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground/20 hover:text-foreground transition-all duration-300 tracking-tight cursor-default hover:scale-110"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.1, 
                color: "hsl(var(--foreground))",
                transition: { duration: 0.2 }
              }}
            >
              {client}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div
          className="mt-16 h-px bg-border"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};

export default ClientsSection;
