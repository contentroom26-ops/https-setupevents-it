import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FloatingElements from "./FloatingElements";

const ease = [0.22, 1, 0.36, 1] as const;

const eventTypes = [
  "Corporate Event", "Brand Activation", "Gala Dinner",
  "Lancio Prodotto", "Convention", "Private Event",
  "Fiera / Trade Show", "Altro",
];

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: "", cognome: "", azienda: "", email: "", telefono: "",
    tipoEvento: "", dataEvento: "", messaggio: "", privacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast({ title: "Attenzione", description: "Devi accettare la privacy policy.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nome: formData.nome, cognome: formData.cognome, azienda: formData.azienda,
          email: formData.email, telefono: formData.telefono, tipoEvento: formData.tipoEvento,
          dataEvento: formData.dataEvento, messaggio: formData.messaggio,
        },
      });
      if (error) throw error;
      toast({ title: "Richiesta inviata!", description: "Ti risponderemo entro 24 ore. Grazie!" });
      setFormData({ nome: "", cognome: "", azienda: "", email: "", telefono: "", tipoEvento: "", dataEvento: "", messaggio: "", privacy: false });
    } catch {
      toast({ title: "Errore", description: "Si è verificato un errore. Riprova più tardi.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const inputCls =
    "w-full px-4 py-3.5 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-foreground placeholder:text-muted-foreground text-sm";

  return (
    <section id="contact" className="section-dark py-24 md:py-40 relative grain">
      <FloatingElements variant="lines" count={3} />
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left - Copy */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-mono text-muted-foreground">[06]</span>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
                Contattaci
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tighter leading-[1.05] text-foreground mb-8">
              Inizia il tuo
              <br />
              <span className="text-muted-foreground">progetto</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
              Raccontaci la tua visione. Ti risponderemo entro 24 ore con una proposta personalizzata.
            </p>

            <div className="space-y-4">
              {["Risposta in 24h", "Consulenza gratuita", "Preventivo su misura"].map((b, i) => (
                <motion.div
                  key={b}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, ease }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground/70 font-medium">{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className={inputCls} placeholder="Nome *" />
                <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} required className={inputCls} placeholder="Cognome *" />
              </div>
              <input type="text" name="azienda" value={formData.azienda} onChange={handleChange} className={inputCls} placeholder="Azienda (opzionale)" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputCls} placeholder="Email *" />
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required className={inputCls} placeholder="Telefono *" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select name="tipoEvento" value={formData.tipoEvento} onChange={handleChange} required className={`${inputCls} cursor-pointer`}>
                  <option value="">Tipo di evento *</option>
                  {eventTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
                </select>
                <input type="date" name="dataEvento" value={formData.dataEvento} onChange={handleChange} className={inputCls} />
              </div>
              <textarea name="messaggio" value={formData.messaggio} onChange={handleChange} required rows={4} className={`${inputCls} resize-none`} placeholder="Descrivi il tuo evento ideale... *" />

              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} className="mt-1 w-4 h-4 accent-primary rounded" />
                <span className="text-sm text-muted-foreground">
                  Accetto la <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> *
                </span>
              </label>

              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground px-8 py-4 font-bold text-sm rounded-full flex items-center justify-center gap-3 group disabled:opacity-60"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>Invio in corso... <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <>Invia richiesta <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
