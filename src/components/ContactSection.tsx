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
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { toast } = useToast();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });
  
  // Form emerges from behind the door
  const formY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [300, 200, 50, 0]);
  const formOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7], [0, 0, 0.5, 1]);
  const formScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.9, 1]);
  
  // Light rays effect
  const lightOpacity = useTransform(scrollYProgress, [0.3, 0.6, 0.9], [0, 0.8, 0]);
  
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
    <section id="contact" className="relative min-h-screen" ref={containerRef}>
      {/* Light rays coming from behind the door */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{ opacity: lightOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-white/40 via-transparent to-transparent" 
          style={{
            background: "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 30%, transparent 70%)"
          }}
        />
      </motion.div>

      {/* Main content wrapper */}
      <div ref={ref} className="relative pt-20 pb-32">
        {/* Form emerging from the door */}
        <motion.div
          className="relative z-10"
          style={{
            y: formY,
            opacity: formOpacity,
            scale: formScale,
          }}
        >
          {/* Door frame effect around form */}
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Decorative top door frame */}
              <motion.div 
                className="h-3 bg-foreground mb-0"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              
              {/* Main form container with door sides */}
              <div className="relative">
                {/* Left door edge */}
                <div className="absolute -left-4 top-0 bottom-0 w-4 bg-foreground hidden md:block" />
                {/* Right door edge */}
                <div className="absolute -right-4 top-0 bottom-0 w-4 bg-foreground hidden md:block" />
                
                <div className="bg-background border-x-4 border-foreground md:border-x-0 p-8 md:p-16">
                  {/* Hero CTA Section */}
                  <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background mb-8"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-bold uppercase tracking-widest">
                        La porta è aperta
                      </span>
                    </motion.div>
                    
                    <h2 className="heading-display text-foreground mb-6">
                      CREA IL TUO
                      <br />
                      <span className="italic font-normal">EVENTO</span>
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-foreground/60 max-w-xl mx-auto font-light">
                      Sei arrivato. Ora raccontaci cosa hai in mente.
                    </p>
                  </motion.div>

                  {/* Benefits */}
                  <motion.div
                    className="flex flex-wrap justify-center gap-6 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-foreground" />
                      <span className="text-sm font-medium">Risposta in 24h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-foreground" />
                      <span className="text-sm font-medium">Consulenza gratuita</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-foreground" />
                      <span className="text-sm font-medium">Preventivo su misura</span>
                    </div>
                  </motion.div>

                  {/* Form */}
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
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
                      rows={4}
                      className={`${inputClasses} resize-none`}
                      placeholder="Descrivi il tuo evento ideale... *"
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
                        className="w-full bg-foreground text-background px-8 py-6 font-bold tracking-tight transition-all duration-200 uppercase text-base flex items-center justify-center gap-4 group"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Sparkles className="w-5 h-5" />
                        Inizia la magia
                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                      </motion.button>
                    </div>
                  </motion.form>
                </div>
              </div>
              
              {/* Decorative bottom door frame */}
              <motion.div 
                className="h-3 bg-foreground mt-0"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
