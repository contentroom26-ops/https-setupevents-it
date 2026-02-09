import { motion } from "framer-motion";
import { useState } from "react";

import diesel1 from "@/assets/diesel-1.jpg";
import diesel2 from "@/assets/diesel-2.jpg";
import dieselEvent1 from "@/assets/diesel-event-1.jpg";
import dieselEvent2 from "@/assets/diesel-event-2.jpg";
import dieselEvent4 from "@/assets/diesel-event-4.jpg";
import dieselEvent5 from "@/assets/diesel-event-5.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  { image: dieselEvent1, title: "Diesel Store Opening", category: "Brand Activation" },
  { image: diesel1, title: "Diesel Fashion Night", category: "Fashion Event" },
  { image: dieselEvent2, title: "Diesel Collection", category: "Product Launch" },
  { image: dieselEvent4, title: "Fashion Showcase", category: "Fashion Event" },
  { image: diesel2, title: "VIP Experience", category: "Exclusive Event" },
  { image: dieselEvent5, title: "Shopping Experience", category: "Brand Activation" },
];

const PortfolioSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" className="section-dark py-28 md:py-40 relative grain overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] block mb-6">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter leading-[0.95] text-accent-foreground">
              I nostri
              <br />
              <span className="italic font-normal text-accent-foreground/50">eventi</span>
            </h2>
          </motion.div>
          <motion.p
            className="text-accent-foreground/50 max-w-md text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            Una selezione dei nostri progetti più recenti.
            Ogni evento racconta una storia unica.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className={`group cursor-pointer relative overflow-hidden rounded-2xl ${
                i === 0 || i === 3 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
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
                  animate={{ scale: hoveredIndex === i ? 1.08 : 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  loading="lazy"
                />
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  animate={{ opacity: hoveredIndex === i ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.span
                    className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2"
                    animate={{ y: hoveredIndex === i ? 0 : 10, opacity: hoveredIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.category}
                  </motion.span>
                  <motion.h3
                    className="text-xl font-display font-bold text-white tracking-tight"
                    animate={{ y: hoveredIndex === i ? 0 : 10 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {project.title}
                  </motion.h3>
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
