import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import hostess1 from "@/assets/hostess-white-1.jpg";
import hostess2 from "@/assets/hostess-white-2.jpg";
import hostess3 from "@/assets/hostess-white-3.jpg";
import hostess4 from "@/assets/hostess-white-4.jpg";
import hostess5 from "@/assets/hostess-white-5.jpg";

const hostesses = [
  {
    id: 1,
    image: hostess1,
    name: "Corporate Events",
    role: "Hostess Professionali",
    description: "Staff selezionato per accoglienza e gestione eventi aziendali",
  },
  {
    id: 2,
    image: hostess2,
    name: "Fashion & Luxury",
    role: "Modelle Immagine",
    description: "Presenza elegante per eventi fashion e luxury brand",
  },
  {
    id: 3,
    image: hostess3,
    name: "Brand Activation",
    role: "Brand Ambassador",
    description: "Rappresentanza professionale per attivazioni e promozioni",
  },
  {
    id: 4,
    image: hostess4,
    name: "Gala & VIP Events",
    role: "Event Hostess",
    description: "Accoglienza esclusiva per eventi di gala e cerimonie",
  },
  {
    id: 5,
    image: hostess5,
    name: "Fiere & Congressi",
    role: "Exhibition Staff",
    description: "Staff professionale per fiere internazionali e congressi",
  },
];

const HostessSlideshow = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <section className="section-padding bg-background overflow-hidden" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="number-label block mb-4">[04] — Staff</span>
            <h2 className="heading-section">
              HOSTESS &<br />
              <span className="italic font-normal">IMMAGINE</span>
            </h2>
          </div>
          <p className="text-body max-w-md">
            Personale selezionato e formato per rappresentare il tuo brand 
            con professionalità, eleganza e stile impeccabile.
          </p>
        </motion.div>

        {/* Interactive Slideshow */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Image Display */}
          <div className="relative aspect-[3/4] bg-secondary overflow-hidden order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.img
                key={displayIndex}
                src={hostesses[displayIndex].image}
                alt={hostesses[displayIndex].name}
                className="w-full h-full object-cover object-top"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </AnimatePresence>
            
            {/* Floating Info Card */}
            <motion.div
              className="absolute bottom-6 left-6 right-6 bg-background p-6 border border-border"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={displayIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-muted-foreground text-xs uppercase tracking-widest">
                    {hostesses[displayIndex].role}
                  </span>
                  <h3 className="font-display font-bold text-xl mt-1">
                    {hostesses[displayIndex].name}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Counter */}
            <div className="absolute top-6 right-6 font-display font-bold text-6xl text-foreground/10">
              {String(displayIndex + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Interactive List */}
          <div className="space-y-0 order-1 lg:order-2">
            {hostesses.map((hostess, index) => (
              <motion.div
                key={hostess.id}
                className={`group cursor-pointer border-b border-border py-6 transition-all duration-300 ${
                  displayIndex === index ? "bg-secondary -mx-6 px-6" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <span className={`font-display font-bold text-3xl transition-colors duration-300 ${
                      displayIndex === index ? "text-foreground" : "text-muted-foreground/30"
                    }`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className={`font-display font-bold text-lg md:text-xl transition-colors duration-300 ${
                        displayIndex === index ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {hostess.name}
                      </h3>
                      <p className={`text-sm transition-all duration-300 overflow-hidden ${
                        displayIndex === index 
                          ? "text-muted-foreground max-h-20 opacity-100 mt-1" 
                          : "max-h-0 opacity-0"
                      }`}>
                        {hostess.description}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    className={`transition-all duration-300 ${
                      displayIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                    animate={{ x: displayIndex === index ? 0 : -10 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-12 justify-center lg:justify-start">
          {hostesses.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1 transition-all duration-500 ${
                activeIndex === index 
                  ? "w-12 bg-foreground" 
                  : "w-6 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HostessSlideshow;
