import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import hostessCutout from "@/assets/hostess-cutout.png";

const HostessCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Create array of hostesses for the infinite scroll
  const hostesses = Array(12).fill(hostessCutout);

  return (
    <section className="py-20 bg-black/15 overflow-hidden" ref={ref}>
      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="number-label block mb-4 text-white/50">[04] — Staff</span>
          <h2 className="heading-section text-white">
            HOSTESS &<br />
            <span className="italic font-normal">IMMAGINE</span>
          </h2>
        </motion.div>
      </div>

      {/* Infinite Carousel */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/80 to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex">
          <motion.div
            className="flex gap-8 items-end"
            animate={{
              x: [0, -50 * hostesses.length * 16], // Move left by width of all items
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* First set of hostesses */}
            {hostesses.map((img, index) => (
              <motion.div
                key={`hostess-1-${index}`}
                className="flex-shrink-0 relative group"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-lg" />
                  <img
                    src={img}
                    alt={`Hostess ${index + 1}`}
                    className="h-[400px] md:h-[500px] w-auto object-contain drop-shadow-2xl"
                  />
                  {/* Subtle reflection */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
            {/* Duplicate set for seamless loop */}
            {hostesses.map((img, index) => (
              <motion.div
                key={`hostess-2-${index}`}
                className="flex-shrink-0 relative group"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-lg" />
                  <img
                    src={img}
                    alt={`Hostess ${index + 1}`}
                    className="h-[400px] md:h-[500px] w-auto object-contain drop-shadow-2xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom text */}
        <div className="container-custom mt-12">
          <motion.p
            className="text-white/60 max-w-xl text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Personale selezionato e formato per rappresentare il tuo brand 
            con professionalità, eleganza e stile impeccabile.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default HostessCarousel;
