import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest block mb-4">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              I nostri<br />
              <span className="italic font-normal">eventi</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Una selezione dei nostri progetti più recenti. 
            Ogni evento racconta una storia unica.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-xl font-bold mt-1">{project.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
