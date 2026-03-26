import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FloatingElements from "./FloatingElements";

const ease = [0.22, 1, 0.36, 1] as const;

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: "", cognome: "", azienda: "", email: "", telefono: "",
    dataEvento: "", messaggio: "", privacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      toast({ title: t("contact.errorTitle"), description: t("contact.privacyWarning"), variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nome: formData.nome, cognome: formData.cognome, azienda: formData.azienda,
          email: formData.email, telefono: formData.telefono,
          dataEvento: formData.dataEvento, messaggio: formData.messaggio,
        },
      });
      if (error) throw error;
      toast({ title: t("contact.successTitle"), description: t("contact.successDesc") });
      setFormData({ nome: "", cognome: "", azienda: "", email: "", telefono: "", dataEvento: "", messaggio: "", privacy: false });
    } catch {
      toast({ title: t("contact.errorTitle"), description: t("contact.errorDesc"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const inputClasses = "w-full px-5 py-4 bg-background border border-border rounded-xl focus:outline-none focus:border-primary/50 focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.08)] transition-all duration-300 text-foreground placeholder:text-muted-foreground/60 text-sm";

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-card hidden lg:block" />
      <FloatingElements variant="lines" count={3} />

      <div className="container-custom relative z-10">
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-mono text-muted-foreground">[04]</span>
          <div className="h-px w-12 bg-primary/40" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">{t("contact.label")}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground mb-8">
                {t("contact.heading")}<br />
                <span className="text-muted-foreground/40">{t("contact.headingSub")}</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">{t("contact.description")}</p>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[var(--shadow-card)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.06] blur-[60px] pointer-events-none" />
              <h3 className="text-lg font-display font-bold text-foreground mb-1.5">{t("contact.formTitle")}</h3>
              <p className="text-sm text-muted-foreground/60 mb-10">{t("contact.formSubtitle")}</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className={inputClasses} placeholder={t("contact.firstName")} />
                  <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} required className={inputClasses} placeholder={t("contact.lastName")} />
                </div>
                <input type="text" name="azienda" value={formData.azienda} onChange={handleChange} className={inputClasses} placeholder={t("contact.company")} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder={t("contact.email")} />
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required className={inputClasses} placeholder={t("contact.phone")} />
                </div>
                <input type="date" name="dataEvento" value={formData.dataEvento} onChange={handleChange} className={inputClasses} placeholder={t("contact.eventDate")} />
                <textarea name="messaggio" value={formData.messaggio} onChange={handleChange} required rows={4} className={`${inputClasses} resize-none`} placeholder={t("contact.message")} />
                
                <label className="flex items-start gap-3 cursor-pointer pt-2">
                  <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} className="mt-1 w-4 h-4 accent-primary rounded" />
                  <span className="text-sm text-muted-foreground">
                    {t("contact.privacy")} <Link to="/privacy-policy" className="text-primary hover:underline transition-colors">{t("contact.privacyLink")}</Link> *
                  </span>
                </label>

                <div className="pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground px-8 py-4.5 font-bold text-sm rounded-full flex items-center justify-center gap-3 group disabled:opacity-60 shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.4)] transition-shadow duration-500 hover:shadow-[0_12px_32px_-6px_hsl(var(--primary)/0.5)]"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>{t("contact.submitting")} <Loader2 className="w-4 h-4 animate-spin" /></>
                    ) : (
                      <>{t("contact.submit")} <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /></>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
