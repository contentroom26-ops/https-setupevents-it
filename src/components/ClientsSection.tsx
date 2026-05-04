import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const clients = ["DIESEL", "MEDIOLANUM", "PRADA", "ARMANI", "BULGARI", "FERRAGAMO"];

const ClientsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
  };

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-background relative" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex items-center justify-between mb-8 sm:mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-primary/30" />
            <span className="text-sm text-muted-foreground uppercase tracking-[0.2em] font-medium">{t("clients.label")}</span>
          </div>
          <span className="text-sm text-muted-foreground/60">{t("clients.eventsCount")}</span>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-16 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {clients.map((client) => (
            <motion.span
              key={client}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground/15 tracking-tight cursor-default transition-all duration-500 hover:text-foreground hover:scale-110 hover:text-gradient-primary"
              variants={itemVariants}
            >
              {client}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 section-divider"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};

export default ClientsSection;
