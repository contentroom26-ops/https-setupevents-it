import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import diesel1 from "@/assets/diesel-1.jpg";
import diesel2 from "@/assets/diesel-2.jpg";
import dieselEvent1 from "@/assets/diesel-event-1.jpg";
import dieselEvent2 from "@/assets/diesel-event-2.jpg";
import dieselEvent4 from "@/assets/diesel-event-4.jpg";
import dieselEvent5 from "@/assets/diesel-event-5.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  { image: dieselEvent1, title: "Diesel Store Opening", category: "Brand Activation", year: "2025" },
  { image: diesel1, title: "Diesel Fashion Night", category: "Fashion Event", year: "2025" },
  { image: dieselEvent2, title: "Diesel Collection", category: "Product Launch", year: "2024" },
  { image: dieselEvent4, title: "Fashion Showcase", category: "Fashion Event", year: "2024" },
  { image: diesel2, title: "VIP Experience", category: "Exclusive Event", year: "2024" },
  { image: dieselEvent5, title: "Shopping Experience", category: "Brand Activation", year: "2023" },
];

const PortfolioSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" className="section-dark py-28 md:py-40 relative grain overflow-hidden">
      <div className="container-custom">
        {/* Section label */}
        <div className="flex items-center justify-between mb-20">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="text-xs font-mono text-accent-foreground/30">[04]</span>
            <span className="text-xs uppercase tracking-[0.3em] text-accent-foreground/50 font-medium">
              Projects
            </span>
          </motion.div>

          <motion.span
            className="text-xs font-mono text-accent-foreground/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            [{projects.length}]
          </motion.span>
        </div>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-tighter leading-[0.9] text-accent-foreground mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Case studies
        </motion.h2>

        {/* Project grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group cursor-pointer relative overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  animate={{ scale: hoveredIndex === i ? 1.06 : 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  loading="lazy"
                />
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  animate={{ opacity: hoveredIndex === i ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Number */}
                <div className="absolute top-5 left-6">
                  <span className="text-xs font-mono text-white/40">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                </div>

                {/* Arrow */}
                <motion.div
                  className="absolute top-5 right-6"
                  animate={{
                    opacity: hoveredIndex === i ? 1 : 0,
                    y: hoveredIndex === i ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </motion.div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.span
                    className="text-xs font-medium text-primary uppercase tracking-[0.2em] block mb-2"
                    animate={{
                      y: hoveredIndex === i ? 0 : 8,
                      opacity: hoveredIndex === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.category}
                  </motion.span>
                  <div className="flex items-end justify-between">
                    <motion.h3
                      className="text-xl md:text-2xl font-display font-bold text-white tracking-tight"
                      animate={{ y: hoveredIndex === i ? 0 : 8 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                    >
                      {project.title}
                    </motion.h3>
                    <span className="text-xs text-white/40 font-mono">{project.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
