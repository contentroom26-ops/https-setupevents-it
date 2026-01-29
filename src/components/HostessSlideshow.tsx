import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hostess1 from "@/assets/hostess-1.jpg";
import hostess2 from "@/assets/hostess-2.jpg";
import hostess3 from "@/assets/hostess-3.jpg";
import hostess4 from "@/assets/hostess-4.jpg";
import hostess5 from "@/assets/hostess-5.jpg";

const slides = [
  {
    image: hostess1,
    title: "Hostess Professionali",
    description: "Staff selezionato per eventi corporate",
  },
  {
    image: hostess2,
    title: "Brand Activation",
    description: "Team coordinato per fiere ed esposizioni",
  },
  {
    image: hostess3,
    title: "Auto Show",
    description: "Ragazze immagine per eventi automotive",
  },
  {
    image: hostess4,
    title: "Gala & Eventi VIP",
    description: "Accoglienza esclusiva per eventi luxury",
  },
  {
    image: hostess5,
    title: "Product Launch",
    description: "Ambassador per lanci prodotto",
  },
];

const HostessSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="section-padding bg-black/40 backdrop-blur-sm text-white overflow-hidden" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="number-label block mb-4 text-background/50">[04] — Staff</span>
            <h2 className="heading-section">
              HOSTESS &<br />
              <span className="italic font-normal">IMMAGINE</span>
            </h2>
          </div>
          <p className="text-background/60 max-w-md">
            Personale selezionato e formato per rappresentare il tuo brand 
            con professionalità, eleganza e stile impeccabile.
          </p>
        </motion.div>
      </div>

      {/* Slideshow Container */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Main Slider */}
        <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Slide Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                <div className="container-custom">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <span className="text-background/60 text-sm uppercase tracking-widest block mb-2">
                      {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-2">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-background/80 text-lg">
                      {slides[currentSlide].description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-background/30 flex items-center justify-center text-background hover:bg-background hover:text-foreground transition-all duration-200 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-background/30 flex items-center justify-center text-background hover:bg-background hover:text-foreground transition-all duration-200 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="container-custom mt-8">
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-20 h-28 md:w-28 md:h-40 overflow-hidden transition-all duration-300 ${
                  index === currentSlide 
                    ? "ring-2 ring-background opacity-100" 
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {index === currentSlide && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-background"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4, ease: "linear" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Dots (Mobile) */}
        <div className="flex md:hidden justify-center gap-2 mt-6 container-custom">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-background w-8" : "bg-background/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HostessSlideshow;
