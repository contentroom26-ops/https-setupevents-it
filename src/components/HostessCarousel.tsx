import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hostessCutout from "@/assets/hostess-cutout.png";

const HostessCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  // 6 hostess slots
  const hostesses = Array(6).fill({
    image: hostessCutout,
    name: "Hostess Professionista",
    role: "Eventi Corporate",
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % hostesses.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + hostesses.length) % hostesses.length);
  };

  const getVisibleHostesses = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + hostesses.length) % hostesses.length;
      visible.push({ ...hostesses[index], offset: i, index });
    }
    return visible;
  };

  return (
    <section className="py-24 overflow-hidden relative" ref={ref}>
      {/* Gradient background with color accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/10 to-transparent pointer-events-none" />
      
      <div className="container-custom mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="number-label block mb-4 text-rose-400/60">[04] — Staff</span>
          <h2 className="heading-section text-white">
            HOSTESS &<br />
            <span className="italic font-normal text-rose-200/80">IMMAGINE</span>
          </h2>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <motion.div
        className="relative h-[500px] md:h-[600px]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Side gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black/90 to-transparent z-20 pointer-events-none" />

        {/* Hostess display */}
        <div className="flex items-end justify-center h-full relative">
          {getVisibleHostesses().map((hostess, idx) => {
            const isCenter = hostess.offset === 0;
            const scale = isCenter ? 1 : 0.7 - Math.abs(hostess.offset) * 0.1;
            const opacity = isCenter ? 1 : 0.4 - Math.abs(hostess.offset) * 0.1;
            const zIndex = 10 - Math.abs(hostess.offset);
            const xOffset = hostess.offset * 180;

            return (
              <motion.div
                key={`${hostess.index}-${idx}`}
                className="absolute bottom-0 cursor-pointer"
                initial={false}
                animate={{
                  x: xOffset,
                  scale,
                  opacity: Math.max(0.2, opacity),
                  zIndex,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
                onClick={() => {
                  if (hostess.offset > 0) nextSlide();
                  if (hostess.offset < 0) prevSlide();
                }}
              >
                <div className="relative">
                  {/* Glow effect for center */}
                  {isCenter && (
                    <div className="absolute -inset-4 bg-rose-500/20 blur-3xl rounded-full" />
                  )}
                  <img
                    src={hostess.image}
                    alt={hostess.name}
                    className="h-[400px] md:h-[520px] w-auto object-contain relative z-10"
                    style={{
                      filter: isCenter ? "drop-shadow(0 20px 40px rgba(244, 63, 94, 0.3))" : "none",
                    }}
                  />
                  {/* Info overlay for center */}
                  {isCenter && (
                    <motion.div
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-white font-display font-bold text-lg">{hostess.name}</p>
                      <p className="text-rose-300/80 text-sm">{hostess.role}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-rose-500/30 bg-black/50 flex items-center justify-center text-white hover:bg-rose-500/20 hover:border-rose-500/50 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-rose-500/30 bg-black/50 flex items-center justify-center text-white hover:bg-rose-500/20 hover:border-rose-500/50 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {hostesses.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? "bg-rose-500 w-6" 
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Description */}
      <div className="container-custom mt-16">
        <motion.p
          className="text-white/60 max-w-xl text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Personale selezionato e formato per rappresentare il tuo brand 
          con professionalità, eleganza e stile impeccabile.
        </motion.p>
      </div>
    </section>
  );
};

export default HostessCarousel;
