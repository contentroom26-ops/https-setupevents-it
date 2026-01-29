import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Corporate Events",
    description: "Meeting, convention, cene aziendali e team building progettati per rafforzare il tuo brand.",
    icon: "◆",
  },
  {
    number: "02",
    title: "Brand Activations",
    description: "Esperienze immersive che trasformano i consumatori in ambasciatori del brand.",
    icon: "◇",
  },
  {
    number: "03",
    title: "Event Production",
    description: "Produzione completa con tecnologie all'avanguardia, regia professionale e storytelling.",
    icon: "○",
  },
  {
    number: "04",
    title: "Location & Allestimenti",
    description: "Scouting delle migliori location italiane con allestimenti scenografici su misura.",
    icon: "□",
  },
  {
    number: "05",
    title: "Staff & Regia",
    description: "Team di professionisti esperti per garantire un'esecuzione impeccabile.",
    icon: "△",
  },
  {
    number: "06",
    title: "Hostess & Immagine",
    description: "Personale selezionato per eventi e promozioni. Professionalità e stile impeccabile.",
    icon: "☆",
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
  isInView: boolean;
}

const ServiceCard = ({ service, index, isInView }: ServiceCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const scale = useSpring(1, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const normalizedY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
    scale.set(1.02);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 80, rotateX: 25 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.9, 
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main card */}
        <div className="relative bg-background border border-foreground/20 p-8 md:p-10 overflow-hidden group">
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.08) 100%)",
            }}
          />
          
          {/* Shine sweep effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            }}
          />
          
          {/* Content with Z-depth */}
          <div style={{ transform: "translateZ(30px)" }}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl opacity-30">{service.icon}</span>
                <span className="number-label text-foreground/40">[{service.number}]</span>
              </div>
              <motion.div
                className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center"
                whileHover={{ scale: 1.1, borderColor: "rgba(0,0,0,0.5)" }}
              >
                <ArrowUpRight className="w-4 h-4 text-foreground/50 group-hover:text-foreground transition-colors" />
              </motion.div>
            </div>
            
            <motion.h3 
              className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight text-foreground"
              style={{ transform: "translateZ(10px)" }}
            >
              {service.title}
            </motion.h3>
            
            <p className="text-foreground/60 leading-relaxed">
              {service.description}
            </p>
          </div>
          
          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-foreground"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.4 }}
          />
        </div>
        
        {/* 3D shadow layer */}
        <div 
          className="absolute inset-0 bg-foreground/10 -z-10 blur-2xl"
          style={{ transform: "translateZ(-60px) translateY(20px) scale(0.9)" }}
        />
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="services" className="section-padding bg-transparent" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="number-label text-foreground/60 block mb-4">[03] — Servizi</span>
            <h2 className="heading-section text-foreground">
              COSA<br />
              <span className="italic font-normal">FACCIAMO</span>
            </h2>
          </div>
          <p className="text-body text-foreground/70 max-w-md">
            Ogni servizio è progettato per creare eventi che lasciano il segno. 
            Dalla strategia all'esecuzione.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              service={service} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;