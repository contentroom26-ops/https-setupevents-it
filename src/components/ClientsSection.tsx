import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  { name: "Diesel", logo: "DIESEL" },
  { name: "Mediolanum", logo: "MEDIOLANUM" },
  { name: "Prada", logo: "PRADA" },
  { name: "Armani", logo: "ARMANI" },
  { name: "Bulgari", logo: "BULGARI" },
  { name: "Ferragamo", logo: "FERRAGAMO" },
];

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-20 bg-secondary/50" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground font-medium tracking-wide uppercase text-sm">
            20+ eventi di successo realizzati
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              className="text-2xl md:text-3xl font-serif font-medium text-muted-foreground/60 hover:text-primary transition-colors duration-300 tracking-widest"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {client.logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
