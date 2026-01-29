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
    <section className="py-16 md:py-20 bg-black/10 border-y border-white/5" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number-label text-white/60">[02] — Clienti</span>
          <span className="text-white/50 text-sm">20+ eventi realizzati</span>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-20">
          {clients.map((client, index) => (
            <motion.span
              key={client}
              className="text-xl md:text-2xl font-display font-bold text-white/40 hover:text-white transition-colors duration-300 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              {client}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
