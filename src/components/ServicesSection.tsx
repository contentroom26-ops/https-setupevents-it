import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Corporate Events",
    description: "Organizzazione di meeting, convention, cene aziendali e team building per rafforzare il brand.",
  },
  {
    number: "02",
    title: "Launch Product",
    description: "Lanci prodotto studiati per massimizzare visibilità e impatto sul mercato.",
  },
  {
    number: "03",
    title: "Hostess e Steward",
    description: "Personale selezionato e formato per accoglienza, promozione e immagine durante gli eventi.",
  },
  {
    number: "04",
    title: "Public Relations",
    description: "Gestione dei contatti e degli ospiti accuratamente selezionata in base alle richieste del cliente, selezione del target giusto per ogni occasione.",
  },
  {
    number: "05",
    title: "Location e Set-up",
    description: "Scouting delle migliori location e allestimenti scenografici su misura per ogni evento.",
  },
  {
    number: "06",
    title: "A / V Services",
    description: "Servizi audio-video professionali con tecnologie all'avanguardia per produzioni impeccabili.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
      delay: i * 0.1,
    },
  }),
};

const FlipCard = ({ service, index, isInView }: { service: typeof services[0]; index: number; isInView: boolean }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="h-64 cursor-pointer"
      style={{ perspective: 1000 }}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white/10 backdrop-blur-md p-8 border border-white/20 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-sm text-white/50">[{service.number}]</span>
          <h3 className="text-2xl font-bold tracking-tight text-white">{service.title}</h3>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-white/20 backdrop-blur-md p-8 border border-white/20 flex flex-col justify-center items-center text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="text-lg font-bold mb-3 text-white">{service.title}</h3>
          <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-black/20 backdrop-blur-[1px]" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div>
            <motion.span
              className="text-sm text-white/50 uppercase tracking-widest block mb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Servizi
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Cosa<br />
              <span className="italic font-normal">facciamo</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-white/60 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Ogni servizio è progettato per creare eventi che lasciano il segno.
            Dalla strategia all'esecuzione.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <FlipCard key={service.title} service={service} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
