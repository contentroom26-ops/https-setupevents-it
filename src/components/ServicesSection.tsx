import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Building2, 
  Sparkles, 
  Clapperboard, 
  MapPin, 
  Users, 
  Star, 
  Palette 
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Corporate Events",
    description: "Meeting, convention, cene aziendali e team building progettati per rafforzare il tuo brand e coinvolgere i tuoi stakeholder.",
  },
  {
    icon: Sparkles,
    title: "Brand Activations",
    description: "Esperienze immersive che trasformano i consumatori in ambasciatori del brand, creando connessioni autentiche e memorabili.",
  },
  {
    icon: Clapperboard,
    title: "Event Production",
    description: "Produzione completa di eventi con tecnologie all'avanguardia, regia professionale e storytelling coinvolgente.",
  },
  {
    icon: MapPin,
    title: "Location & Allestimenti",
    description: "Scouting delle migliori location italiane e internazionali, con allestimenti scenografici su misura per ogni concept.",
  },
  {
    icon: Users,
    title: "Staff & Regia",
    description: "Team di professionisti esperti, dalla regia alla logistica, per garantire un'esecuzione impeccabile di ogni dettaglio.",
  },
  {
    icon: Star,
    title: "Hostess & Ragazze Immagine",
    description: "Personale selezionato per locali, eventi e promozioni. Professionalità, stile e presenza impeccabile per rappresentare al meglio il tuo brand.",
  },
  {
    icon: Palette,
    title: "Experience Design",
    description: "Concept creativi unici che trasformano ogni evento in un'esperienza sensoriale coinvolgente e indimenticabile.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="services" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
            Cosa facciamo
          </span>
          <h2 className="heading-section mb-6">
            Servizi pensati per il <span className="italic">tuo successo</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Ogni servizio è progettato per creare eventi che lasciano il segno. 
            Dalla strategia all'esecuzione, siamo al tuo fianco.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="card-service rounded-lg group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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
