import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    number: "01",
    title: "Corporate Events",
    description: "Organizzazione di meeting, convention, cene aziendali e team building per rafforzare il brand.",
    icon: "🎯",
  },
  {
    number: "02",
    title: "Launch Product",
    description: "Lanci prodotto studiati per massimizzare visibilità e impatto sul mercato.",
    icon: "🚀",
  },
  {
    number: "03",
    title: "Hostess e Steward",
    description: "Personale selezionato e formato per accoglienza, promozione e immagine durante gli eventi.",
    icon: "✨",
  },
  {
    number: "04",
    title: "Public Relations",
    description: "Gestione dei contatti e degli ospiti accuratamente selezionata in base alle richieste del cliente, selezione del target giusto.",
    icon: "🤝",
  },
  {
    number: "05",
    title: "Location e Set-up",
    description: "Scouting delle migliori location e allestimenti scenografici su misura per ogni evento.",
    icon: "🏛️",
  },
  {
    number: "06",
    title: "A / V Services",
    description: "Servizi audio-video professionali con tecnologie all'avanguardia per produzioni impeccabili.",
    icon: "🎬",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-light py-28 md:py-40 relative grain">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] block mb-6">
              Servizi
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground">
              Cosa
              <br />
              <span className="italic font-normal text-muted-foreground">facciamo</span>
            </h2>
          </motion.div>
          <motion.p
            className="text-muted-foreground max-w-md text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            Ogni servizio è progettato per creare eventi che lasciano il segno.
            Dalla strategia all'esecuzione.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            >
              <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-full group-hover:-translate-y-1">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl">{service.icon}</span>
                  <span className="text-sm font-mono text-muted-foreground/50">
                    [{service.number}]
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 h-[2px] bg-primary/0 group-hover:bg-primary transition-colors duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
