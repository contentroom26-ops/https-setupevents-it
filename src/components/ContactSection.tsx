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

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-card hidden lg:block" />
      <FloatingElements variant="lines" count={3} />

      <div className="container-custom relative z-10">
        <motion.div className="flex items-center gap-4 mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
          <span className="text-xs font-mono text-muted-foreground">[04]</span>
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">{t("contact.label")}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div className="lg:col-span-5 flex flex-col justify-between" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease }}>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tighter leading-[0.95] text-foreground mb-6">
                {t("contact.heading")}<br />
                <span className="italic font-normal text-muted-foreground">{t("contact.headingSub")}</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">{t("contact.description")}</p>
            </div>
          </motion.div>

          <motion.div className="lg:col-span-7" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2, ease }}>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl" />
              <h3 className="text-lg font-display font-bold text-foreground mb-1">{t("contact.formTitle")}</h3>
              <p className="text-sm text-muted-foreground mb-8">{t("contact.formSubtitle")}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative group">
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary/60 transition-colors text-foreground placeholder:text-muted-foreground text-sm peer" placeholder={t("contact.firstName")} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 peer-focus:w-full rounded-full" />
                  </div>
                  <div className="relative group">
                    <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} required className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary/60 transition-colors text-foreground placeholder:text-muted-foreground text-sm peer" placeholder={t("contact.lastName")} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 peer-focus:w-full rounded-full" />
                  </div>
                </div>
                <div className="relative">
                  <input type="text" name="azienda" value={formData.azienda} onChange={handleChange} className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary/60 transition-colors text-foreground placeholder:text-muted-foreground text-sm peer" placeholder={t("contact.company")} />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 peer-focus:w-full rounded-full" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary/60 transition-colors text-foreground placeholder:text-muted-foreground text-sm peer" placeholder={t("contact.email")} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 peer-focus:w-full rounded-full" />
                  </div>
                  <div className="relative">
                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary/60 transition-colors text-foreground placeholder:text-muted-foreground text-sm peer" placeholder={t("contact.phone")} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 peer-focus:w-full rounded-full" />
                  </div>
                </div>
                <div className="relative">
                  <input type="date" name="dataEvento" value={formData.dataEvento} onChange={handleChange} className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary/60 transition-colors text-foreground placeholder:text-muted-foreground text-sm peer" placeholder={t("contact.eventDate")} />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 peer-focus:w-full rounded-full" />
                </div>
                <div className="relative">
                  <textarea name="messaggio" value={formData.messaggio} onChange={handleChange} required rows={4} className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary/60 transition-colors text-foreground placeholder:text-muted-foreground text-sm resize-none peer" placeholder={t("contact.message")} />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 peer-focus:w-full rounded-full" />
                </div>
                <label className="flex items-start gap-3 cursor-pointer pt-2">
                  <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} className="mt-1 w-4 h-4 accent-primary rounded" />
                  <span className="text-sm text-muted-foreground">
                    {t("contact.privacy")} <Link to="/privacy-policy" className="text-primary hover:underline">{t("contact.privacyLink")}</Link> *
                  </span>
                </label>
                <div className="pt-4">
                  <motion.button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground px-8 py-4 font-bold text-sm rounded-full flex items-center justify-center gap-3 group disabled:opacity-60" whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }}>
                    {isSubmitting ? (
                      <>{t("contact.submitting")} <Loader2 className="w-4 h-4 animate-spin" /></>
                    ) : (
                      <>{t("contact.submit")} <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>
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
