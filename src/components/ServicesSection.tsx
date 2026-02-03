import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Corporate Events",
    description: "Meeting, convention, cene aziendali e team building progettati per rafforzare il tuo brand.",
  },
  {
    number: "02",
    title: "Brand Activations",
    description: "Esperienze immersive che trasformano i consumatori in ambasciatori del brand.",
  },
  {
    number: "03",
    title: "Event Production",
    description: "Produzione completa con tecnologie all'avanguardia, regia professionale e storytelling.",
  },
  {
    number: "04",
    title: "Location & Allestimenti",
    description: "Scouting delle migliori location italiane con allestimenti scenografici su misura.",
  },
  {
    number: "05",
    title: "Staff & Regia",
    description: "Team di professionisti esperti per garantire un'esecuzione impeccabile.",
  },
  {
    number: "06",
    title: "Hostess & Immagine",
    description: "Personale selezionato per eventi e promozioni. Professionalità e stile impeccabile.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest block mb-4">
              Servizi
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Cosa<br />
              <span className="italic font-normal">facciamo</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Ogni servizio è progettato per creare eventi che lasciano il segno. 
            Dalla strategia all'esecuzione.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-background p-8 group hover:bg-foreground hover:text-background transition-colors duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-sm text-muted-foreground group-hover:text-background/60 transition-colors">
                  [{service.number}]
                </span>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 tracking-tight">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground group-hover:text-background/70 transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
