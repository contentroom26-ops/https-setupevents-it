import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Sparkles, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const eventTypes = [
  "Corporate Event",
  "Brand Activation",
  "Gala Dinner",
  "Lancio Prodotto",
  "Convention",
  "Private Event",
  "Fiera / Trade Show",
  "Altro",
];

const ContactSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"]
  });
  
  const doorOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const doorScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.95, 1]);
  
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    azienda: "",
    email: "",
    telefono: "",
    tipoEvento: "",
    dataEvento: "",
    budget: "",
    messaggio: "",
    privacy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      toast({
        title: "Attenzione",
        description: "Devi accettare la privacy policy per procedere.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Richiesta inviata!",
      description: "Ti risponderemo entro 24 ore. Grazie!",
    });

    setFormData({
      nome: "",
      cognome: "",
      azienda: "",
      email: "",
      telefono: "",
      tipoEvento: "",
      dataEvento: "",
      budget: "",
      messaggio: "",
      privacy: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const inputClasses = "w-full px-0 py-4 bg-transparent border-0 border-b border-foreground/20 focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/40 text-foreground";

  return (
    <section id="contact" className="relative" ref={containerRef}>
      {/* Door reveal effect wrapper */}
      <motion.div
        ref={ref}
        className="relative section-padding bg-background"
        style={{
          opacity: doorOpacity,
          scale: doorScale,
        }}
      >
        {/* Decorative door frame overlay */}
        <div className="absolute inset-x-0 top-0 h-2 bg-foreground" />
        
        {/* Glowing entrance effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 via-transparent to-transparent" />
        </motion.div>

        <div className="container-custom relative z-10">
          {/* Hero CTA Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-foreground/10 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-foreground/70" />
              <span className="text-sm font-medium text-foreground/70 uppercase tracking-widest">
                Benvenuto oltre la porta
              </span>
            </motion.div>
            
            <h2 className="heading-display text-foreground mb-6">
              IL TUO EVENTO
              <br />
              <span className="italic font-normal">INIZIA QUI</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto mb-10 font-light">
              Hai attraversato il corridoio del possibile.<br />
              Ora trasformiamo la tua visione in realtà.
            </p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-foreground/5">
                <ArrowRight className="w-4 h-4" />
                <span className="text-sm">Risposta in 24h</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-foreground/5">
                <ArrowRight className="w-4 h-4" />
                <span className="text-sm">Consulenza gratuita</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-foreground/5">
                <ArrowRight className="w-4 h-4" />
                <span className="text-sm">Preventivo su misura</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <div className="max-w-3xl mx-auto">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-2 bg-background/80 backdrop-blur-sm p-8 md:p-12 border border-foreground/10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center mb-10">
                <span className="number-label text-foreground/60 block mb-2">[09] — Compila il form</span>
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Raccontaci il tuo progetto
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Nome *"
                />
                <input
                  type="text"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Cognome *"
                />
              </div>

              <input
                type="text"
                name="azienda"
                value={formData.azienda}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Azienda (opzionale)"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Email *"
                />
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Telefono *"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <select
                  name="tipoEvento"
                  value={formData.tipoEvento}
                  onChange={handleChange}
                  required
                  className={`${inputClasses} cursor-pointer`}
                >
                  <option value="">Tipo di evento *</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <input
                  type="date"
                  name="dataEvento"
                  value={formData.dataEvento}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Budget indicativo"
              />

              <textarea
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                required
                rows={3}
                className={`${inputClasses} resize-none`}
                placeholder="Descrivi il tuo evento *"
              />

              <div className="pt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 border-foreground/20 accent-foreground"
                  />
                  <span className="text-sm text-foreground/60">
                    Accetto la <a href="#" className="underline-hover text-foreground">Privacy Policy</a> *
                  </span>
                </label>
              </div>

              <div className="pt-8">
                <motion.button
                  type="submit"
                  className="w-full bg-foreground text-background px-8 py-5 font-semibold tracking-tight transition-all duration-200 uppercase text-sm flex items-center justify-center gap-3 group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Sparkles className="w-5 h-5" />
                  Inizia l'avventura
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
