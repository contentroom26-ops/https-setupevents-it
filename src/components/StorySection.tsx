import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "10+", label: "Anni di esperienza" },
  { number: "100+", label: "Eventi realizzati" },
  { number: "50K+", label: "Persone coinvolte" },
  { number: "98%", label: "Tasso di riempimento" },
];

const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section id="storia" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              className="text-sm text-muted-foreground uppercase tracking-widest block mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              La nostra storia
            </motion.span>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Dall'intrattenimento<br />
              <span className="italic font-normal">all'eccellenza</span>
            </motion.h2>

            <motion.div
              className="space-y-6 text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-lg">
                Setup Events è una realtà specializzata nella progettazione e organizzazione di eventi su misura a Firenze. Grazie a una solida esperienza nel mondo dell'intrattenimento e a una profonda conoscenza del territorio, creiamo esperienze pensate per valorizzare brand, location e pubblico di riferimento. Operiamo nel settore corporate, nei lanci prodotto e negli eventi esclusivi, curando ogni dettaglio con un approccio strategico, creativo e professionale. Non realizziamo semplici eventi, ma esperienze che lasciano il segno.
              </p>
            </motion.div>

            <motion.div
              className="mt-10 flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-16 h-px bg-foreground" />
              <span className="text-sm uppercase tracking-widest text-muted-foreground">
                Gabriel Lleshi, Founder
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            className="grid grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative p-8 border border-border bg-card group"
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  backgroundColor: "hsl(var(--secondary))",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.span
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground block leading-none"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    type: "spring" as const, 
                    stiffness: 100, 
                    delay: 0.4 + index * 0.1 
                  }}
                >
                  {stat.number}
                </motion.span>
                <span className="text-sm text-muted-foreground uppercase tracking-widest mt-4 block">
                  {stat.label}
                </span>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-foreground/20 group-hover:border-foreground/40 transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
