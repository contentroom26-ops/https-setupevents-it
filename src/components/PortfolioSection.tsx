import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

import diesel1 from "@/assets/diesel-1.jpg";
import diesel2 from "@/assets/diesel-2.jpg";
import diesel3 from "@/assets/diesel-3.jpg";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";

const projects = [
  { image: diesel1, title: "Diesel Event", category: "Brand Activation" },
  { image: event1, title: "Fashion Night", category: "Luxury Event" },
  { image: diesel2, title: "VIP Experience", category: "Fashion Event" },
  { image: event2, title: "Art Exhibition", category: "Cultural Event" },
  { image: diesel3, title: "Store Opening", category: "Brand Activation" },
  { image: event3, title: "VIP Gala", category: "Corporate Event" },
];

const imageVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 60,
      damping: 15,
      delay: i * 0.12,
    },
  }),
};

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background" ref={ref}>
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
              Portfolio
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I nostri<br />
              <span className="italic font-normal">eventi</span>
            </motion.h2>
          </div>
          <motion.p 
            className="text-muted-foreground max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Una selezione dei nostri progetti più recenti. 
            Ogni evento racconta una storia unica.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group cursor-pointer"
              custom={index}
              variants={imageVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div 
                className="relative overflow-hidden aspect-[4/5] mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                <motion.div 
                  className="absolute inset-0 bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 0.3 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Reveal overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="text-white text-sm uppercase tracking-widest font-medium px-6 py-3 border border-white"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: hoveredIndex === index ? 0 : 20, 
                      opacity: hoveredIndex === index ? 1 : 0 
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    Vedi progetto
                  </motion.span>
                </motion.div>
              </motion.div>
              
              <motion.span 
                className="text-sm text-muted-foreground uppercase tracking-wider block"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {project.category}
              </motion.span>
              <motion.h3 
                className="text-xl font-bold mt-1"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.55 + index * 0.1 }}
              >
                {project.title}
              </motion.h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
