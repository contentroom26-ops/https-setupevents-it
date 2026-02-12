import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import diesel1 from "@/assets/diesel-1.jpg";
import diesel2 from "@/assets/diesel-2.jpg";
import diesel3 from "@/assets/diesel-3.jpg";
import diesel4 from "@/assets/diesel-4.jpg";
import dieselEvent1 from "@/assets/diesel-event-1.jpg";
import dieselEvent2 from "@/assets/diesel-event-2.jpg";
import dieselEvent3 from "@/assets/diesel-event-3.jpg";
import dieselEvent4 from "@/assets/diesel-event-4.jpg";
import dieselEvent5 from "@/assets/diesel-event-5.jpg";
import dieselEvent6 from "@/assets/diesel-event-6.jpg";
import dieselEvent7 from "@/assets/diesel-event-7.jpg";
import dieselEvent8 from "@/assets/diesel-event-8.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  { image: dieselEvent3, title: "Diesel Collection", category: "Product Launch", year: "2025" },
  { image: diesel1, title: "Diesel Fashion Night", category: "Fashion Event", year: "2025" },
  { image: dieselEvent5, title: "Diesel Shopping", category: "Brand Activation", year: "2025" },
  { image: dieselEvent4, title: "Fashion Showcase", category: "Fashion Event", year: "2024" },
  { image: diesel2, title: "VIP Experience", category: "Exclusive Event", year: "2024" },
  { image: dieselEvent1, title: "Store Opening", category: "Brand Activation", year: "2024" },
];

const galleryImages = [
  dieselEvent1, dieselEvent2, dieselEvent3, dieselEvent4,
  dieselEvent5, dieselEvent6, dieselEvent7, dieselEvent8,
  diesel1, diesel2, diesel3, diesel4,
];

const PortfolioSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((p) => (p + 1) % galleryImages.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((p) => (p - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 3500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="portfolio" className="section-dark py-20 md:py-40 relative grain overflow-hidden">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="text-xs font-mono text-muted-foreground">[04]</span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
              Projects
            </span>
          </motion.div>

          <motion.span
            className="text-xs font-mono text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            [{projects.length}]
          </motion.span>
        </div>

        <motion.h2
          className="text-3xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-tighter leading-[0.9] text-foreground mb-12 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Case studies
        </motion.h2>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group cursor-pointer relative overflow-hidden rounded-xl"
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
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  animate={{ opacity: hoveredIndex === i ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="absolute top-4 left-4 md:top-5 md:left-6">
                  <span className="text-xs font-mono text-white/40">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                </div>

                <motion.div
                  className="absolute top-4 right-4 md:top-5 md:right-6"
                  animate={{
                    opacity: hoveredIndex === i ? 1 : 0,
                    y: hoveredIndex === i ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
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
                      className="text-lg md:text-2xl font-display font-bold text-white tracking-tight"
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

      {/* Gallery carousel */}
      <motion.div
        className="mt-16 md:mt-28 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="container-custom mb-6 md:mb-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground tracking-tight">
              Gallery
            </h3>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden pl-5 md:pl-12">
          <motion.div
            className="flex gap-3 md:gap-5"
            animate={{ x: `-${currentSlide * 280}px` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[65vw] md:w-[280px] lg:w-[320px] aspect-[3/4] rounded-lg overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Event photo ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="container-custom mt-6">
          <div className="flex gap-1 justify-start">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "bg-primary w-8" : "bg-border w-3"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PortfolioSection;
