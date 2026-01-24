import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Clock } from "lucide-react";
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

    // Here you would normally send the data to your backend
    toast({
      title: "Richiesta inviata!",
      description: "Ti risponderemo entro 24 ore. Grazie per averci contattato!",
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

  return (
    <section id="contact" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
              Contattaci
            </span>
            <h2 className="heading-section mb-6">
              Raccontaci il tuo <span className="italic">prossimo evento</span>
            </h2>
            <p className="text-body mb-8">
              Compila il modulo con i dettagli del tuo progetto. Il nostro team 
              ti contatterà per una consulenza gratuita e senza impegno.
            </p>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <span>Ti rispondiamo entro 24 ore</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 shadow-lg border border-border/50"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Mario"
                />
              </div>
              <div>
                <label htmlFor="cognome" className="block text-sm font-medium mb-2">
                  Cognome *
                </label>
                <input
                  type="text"
                  id="cognome"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Rossi"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="azienda" className="block text-sm font-medium mb-2">
                Azienda
              </label>
              <input
                type="text"
                id="azienda"
                name="azienda"
                value={formData.azienda}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Nome azienda (opzionale)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="mario@azienda.it"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium mb-2">
                  Telefono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="+39 333 1234567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="tipoEvento" className="block text-sm font-medium mb-2">
                  Tipo di evento *
                </label>
                <select
                  id="tipoEvento"
                  name="tipoEvento"
                  value={formData.tipoEvento}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">Seleziona...</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="dataEvento" className="block text-sm font-medium mb-2">
                  Data evento
                </label>
                <input
                  type="date"
                  id="dataEvento"
                  name="dataEvento"
                  value={formData.dataEvento}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="budget" className="block text-sm font-medium mb-2">
                Budget indicativo
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="Es. €10.000 - €50.000"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="messaggio" className="block text-sm font-medium mb-2">
                Messaggio *
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Descrivi il tuo evento ideale..."
              />
            </div>

            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-border accent-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Ho letto e accetto la <a href="#" className="text-primary underline-gold">Privacy Policy</a> e 
                  acconsento al trattamento dei miei dati personali. *
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full btn-hero rounded-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Invia richiesta
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
