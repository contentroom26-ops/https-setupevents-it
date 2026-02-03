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

  return (
    <section className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm text-muted-foreground uppercase tracking-widest">
            I nostri clienti
          </span>
          <span className="text-sm text-muted-foreground">
            20+ eventi realizzati
          </span>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {clients.map((client, index) => (
            <motion.span
              key={client}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground/20 hover:text-foreground transition-colors duration-300 tracking-tight cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {client}
            </motion.span>
          ))}
        </div>
        
        <motion.div
          className="mt-16 h-px bg-border"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        />
      </div>
    </section>
  );
};

export default ClientsSection;
