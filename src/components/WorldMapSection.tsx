import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const locations = [
  { id: 1, city: "Milano", country: "Italia", x: 51, y: 32, events: "50+" },
  { id: 2, city: "Roma", country: "Italia", x: 52, y: 36, events: "30+" },
  { id: 3, city: "Londra", country: "UK", x: 48, y: 28, events: "15+" },
  { id: 4, city: "Parigi", country: "Francia", x: 49, y: 31, events: "20+" },
  { id: 5, city: "Dubai", country: "UAE", x: 62, y: 42, events: "10+" },
  { id: 6, city: "New York", country: "USA", x: 26, y: 35, events: "8+" },
  { id: 7, city: "Monaco", country: "Principato", x: 50, y: 34, events: "12+" },
];

const WorldMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);

  return (
    <section className="section-padding bg-foreground text-background overflow-hidden" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="number-label block mb-4 text-background/50">[05] — Global</span>
            <h2 className="heading-section">
              DOVE<br />
              <span className="italic font-normal">OPERIAMO</span>
            </h2>
          </div>
          <p className="text-background/60 max-w-md">
            Organizziamo eventi in tutta Europa e nel mondo. 
            Il nostro team è pronto a seguirti ovunque.
          </p>
        </motion.div>

        {/* Interactive World Map */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Map SVG */}
          <div className="relative aspect-[2/1] w-full">
            <svg
              viewBox="0 0 100 50"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* World Map Path - Simplified continents */}
              <motion.path
                d="M15,20 Q20,15 30,18 T45,15 Q55,12 65,18 T80,22 Q85,25 82,30 T75,35 Q68,40 55,38 T35,42 Q25,45 18,40 T12,32 Q10,25 15,20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                className="text-background/20"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* North America */}
              <motion.path
                d="M12,18 Q15,12 25,14 T32,20 Q35,25 30,32 T20,35 Q12,33 10,28 T12,18 Z"
                fill="currentColor"
                className="text-background/10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              
              {/* Europe */}
              <motion.path
                d="M45,22 Q50,18 55,20 T58,28 Q56,34 50,35 T44,30 Q42,26 45,22 Z"
                fill="currentColor"
                className="text-background/15"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
              
              {/* Africa */}
              <motion.path
                d="M48,38 Q52,35 56,38 T58,48 Q54,52 50,50 T46,44 Q45,40 48,38 Z"
                fill="currentColor"
                className="text-background/10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              />
              
              {/* Asia */}
              <motion.path
                d="M58,20 Q68,16 78,22 T82,32 Q80,38 70,40 T58,35 Q55,28 58,20 Z"
                fill="currentColor"
                className="text-background/10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.1 }}
              />
              
              {/* Australia */}
              <motion.path
                d="M78,42 Q82,40 85,43 T84,48 Q81,50 78,48 T78,42 Z"
                fill="currentColor"
                className="text-background/10"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.3 }}
              />

              {/* Grid Lines */}
              {[...Array(9)].map((_, i) => (
                <motion.line
                  key={`h-${i}`}
                  x1="0"
                  y1={(i + 1) * 5}
                  x2="100"
                  y2={(i + 1) * 5}
                  stroke="currentColor"
                  strokeWidth="0.05"
                  className="text-background/10"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                />
              ))}
              {[...Array(19)].map((_, i) => (
                <motion.line
                  key={`v-${i}`}
                  x1={(i + 1) * 5}
                  y1="0"
                  x2={(i + 1) * 5}
                  y2="50"
                  stroke="currentColor"
                  strokeWidth="0.05"
                  className="text-background/10"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                />
              ))}

              {/* Location Markers */}
              {locations.map((location, index) => (
                <motion.g
                  key={location.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                >
                  {/* Pulse Ring */}
                  <motion.circle
                    cx={location.x}
                    cy={location.y}
                    r="1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.1"
                    className="text-background/40"
                    animate={{
                      r: [1.5, 3, 1.5],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                  
                  {/* Main Dot */}
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r={hoveredLocation === location.id ? 1.2 : 0.8}
                    fill="currentColor"
                    className={`transition-all duration-300 cursor-pointer ${
                      hoveredLocation === location.id ? "text-background" : "text-background/80"
                    }`}
                    onMouseEnter={() => setHoveredLocation(location.id)}
                    onMouseLeave={() => setHoveredLocation(null)}
                  />
                </motion.g>
              ))}
            </svg>

            {/* Location Labels */}
            {locations.map((location) => (
              <motion.div
                key={location.id}
                className={`absolute transition-all duration-300 pointer-events-none ${
                  hoveredLocation === location.id 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-95"
                }`}
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                  transform: "translate(-50%, -120%)",
                }}
              >
                <div className="bg-background text-foreground px-4 py-2 text-center whitespace-nowrap">
                  <p className="font-display font-bold text-sm">{location.city}</p>
                  <p className="text-xs text-muted-foreground">{location.events} eventi</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Location List */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                className={`text-center p-4 border transition-all duration-300 cursor-pointer ${
                  hoveredLocation === location.id 
                    ? "border-background bg-background/10" 
                    : "border-background/20 hover:border-background/40"
                }`}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
              >
                <p className="font-display font-bold text-lg">{location.city}</p>
                <p className="text-background/50 text-xs uppercase tracking-wider mt-1">
                  {location.events} eventi
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorldMapSection;
