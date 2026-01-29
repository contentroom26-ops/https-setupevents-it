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
    <section id="services" className="section-padding bg-black/15" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="number-label text-white/60 block mb-4">[03] — Servizi</span>
            <h2 className="heading-section text-white">
              COSA<br />
              <span className="italic font-normal">FACCIAMO</span>
            </h2>
          </div>
          <p className="text-body text-white/70 max-w-md">
            Ogni servizio è progettato per creare eventi che lasciano il segno. 
            Dalla strategia all'esecuzione.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-black/10 p-8 md:p-10 group cursor-pointer hover:bg-black/25 transition-colors duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="number-label text-white/50">[{service.number}]</span>
                <ArrowUpRight className="w-5 h-5 text-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 tracking-tight text-white">
                {service.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
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
