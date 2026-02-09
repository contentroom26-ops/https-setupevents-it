import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

const formFieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.4 + i * 0.05,
    },
  }),
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      toast({
        title: "Attenzione",
        description: "Devi accettare la privacy policy per procedere.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          nome: formData.nome,
          cognome: formData.cognome,
          azienda: formData.azienda,
          email: formData.email,
          telefono: formData.telefono,
          tipoEvento: formData.tipoEvento,
          dataEvento: formData.dataEvento,
          budget: formData.budget,
          messaggio: formData.messaggio,
        },
      });

      if (error) throw error;

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
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const inputClasses = "w-full px-0 py-4 bg-transparent border-0 border-b border-white/30 focus:outline-none focus:border-white transition-colors placeholder:text-white/40 text-white";

  return (
    <section id="contact" className="py-24 md:py-32 bg-black/30 backdrop-blur-[1px]" ref={ref}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.span 
              className="text-sm text-white/50 uppercase tracking-widest block mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Contattaci
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Inizia il tuo<br />
              <span className="italic font-normal">progetto</span>
            </motion.h2>
            <motion.p 
              className="text-white/60 max-w-xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Raccontaci la tua visione. Ti risponderemo entro 24 ore.
            </motion.p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {["Risposta in 24h", "Consulenza gratuita", "Preventivo su misura"].map((benefit, i) => (
              <motion.div 
                key={benefit}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <ArrowRight className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            className="bg-white/10 backdrop-blur-md p-8 md:p-12 border border-white/20"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <motion.input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Nome *"
                  custom={0}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
                <motion.input
                  type="text"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Cognome *"
                  custom={1}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
              </div>

              <motion.input
                type="text"
                name="azienda"
                value={formData.azienda}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Azienda (opzionale)"
                custom={2}
                variants={formFieldVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Email *"
                  custom={3}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
                <motion.input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  placeholder="Telefono *"
                  custom={4}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <motion.select
                  name="tipoEvento"
                  value={formData.tipoEvento}
                  onChange={handleChange}
                  required
                  className={`${inputClasses} cursor-pointer`}
                  custom={5}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <option value="">Tipo di evento *</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </motion.select>
                <motion.input
                  type="date"
                  name="dataEvento"
                  value={formData.dataEvento}
                  onChange={handleChange}
                  className={inputClasses}
                  custom={6}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                />
              </div>

              <motion.input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Budget indicativo"
                custom={7}
                variants={formFieldVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />

              <motion.textarea
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                required
                rows={4}
                className={`${inputClasses} resize-none`}
                placeholder="Descrivi il tuo evento ideale... *"
                custom={8}
                variants={formFieldVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />

              <motion.div 
                className="pt-6"
                custom={9}
                variants={formFieldVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 border-white/30 accent-white"
                  />
                  <span className="text-sm text-white/60">
                    Accetto la <a href="#" className="text-white underline">Privacy Policy</a> *
                  </span>
                </label>
              </motion.div>

              <motion.div 
                className="pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black px-8 py-5 font-bold tracking-tight transition-all duration-300 uppercase text-sm flex items-center justify-center gap-4 group rounded-full disabled:opacity-70"
                  whileHover={{ scale: isSubmitting ? 1 : 1.05, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      Invio in corso...
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Invia richiesta
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
