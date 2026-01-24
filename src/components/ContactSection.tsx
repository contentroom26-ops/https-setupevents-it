import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, ArrowUpRight } from "lucide-react";
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
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

  const inputClasses = "w-full px-0 py-4 bg-transparent border-0 border-b border-border focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50";

  return (
    <section id="contact" className="section-padding bg-background" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="number-label block mb-4">[08] — Form</span>
            <h2 className="heading-section mb-8">
              RACCONTACI<br />
              <span className="italic font-normal">IL PROGETTO</span>
            </h2>
            <p className="text-body mb-10">
              Compila il modulo con i dettagli del tuo progetto. 
              Ti contatteremo per una consulenza gratuita.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ArrowUpRight className="w-4 h-4" />
                <span>Ti rispondiamo entro 24 ore</span>
              </div>
              <div className="flex items-center gap-3">
                <ArrowUpRight className="w-4 h-4" />
                <span>Consulenza gratuita</span>
              </div>
              <div className="flex items-center gap-3">
                <ArrowUpRight className="w-4 h-4" />
                <span>Preventivo personalizzato</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
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
                  className="mt-1 w-4 h-4 border-border accent-foreground"
                />
                <span className="text-sm text-muted-foreground">
                  Accetto la <a href="#" className="underline-hover text-foreground">Privacy Policy</a> *
                </span>
              </label>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="btn-hero w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Invia richiesta
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
