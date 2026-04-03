import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Send, Loader2, User, Building2, Mail, Phone, Calendar, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import FloatingElements from "./FloatingElements";

const ease = [0.22, 1, 0.36, 1] as const;

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const FloatingInput = ({ icon: Icon, name, type = "text", required = false, placeholder, colSpan = false }: {
    icon: React.ElementType; name: string; type?: string; required?: boolean; placeholder: string; colSpan?: boolean;
  }) => {
    const isFocused = focusedField === name;
    const hasValue = formData[name as keyof typeof formData] as string;
    return (
      <motion.div
        className={`relative group ${colSpan ? "sm:col-span-2" : ""}`}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease }}
      >
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${isFocused || hasValue ? "text-primary" : "text-muted-foreground/40"}`}>
          <Icon className="w-4 h-4" />
        </div>
        <input
          type={type}
          name={name}
          value={formData[name as keyof typeof formData] as string}
          onChange={handleChange}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          required={required}
          placeholder={placeholder}
          className={`w-full pl-11 pr-5 py-4 bg-transparent border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-500 outline-none
            ${isFocused
              ? "border-primary/60 shadow-[0_0_0_3px_hsl(var(--primary)/0.1),0_8px_24px_-8px_hsl(var(--primary)/0.15)] bg-primary/[0.03]"
              : "border-border/60 hover:border-border group-hover:bg-card/50"
            }`}
        />
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.4, ease }}
        />
      </motion.div>
    );
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
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
            <div className="relative rounded-3xl p-[1px] overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-border/40 to-primary/10" />
              
              <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 overflow-hidden">
                {/* Inner glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/[0.06] blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/[0.04] blur-[60px] pointer-events-none" />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease }}
                >
                  <h3 className="text-xl font-display font-bold text-foreground mb-1.5">{t("contact.formTitle")}</h3>
                  <p className="text-sm text-muted-foreground/60 mb-10">{t("contact.formSubtitle")}</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingInput icon={User} name="nome" required placeholder={t("contact.firstName")} />
                    <FloatingInput icon={User} name="cognome" required placeholder={t("contact.lastName")} />
                  </div>
                  <FloatingInput icon={Building2} name="azienda" placeholder={t("contact.company")} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingInput icon={Mail} name="email" type="email" required placeholder={t("contact.email")} />
                    <FloatingInput icon={Phone} name="telefono" type="tel" required placeholder={t("contact.phone")} />
                  </div>
                  <FloatingInput icon={Calendar} name="dataEvento" type="date" placeholder={t("contact.eventDate")} />
                  
                  {/* Textarea with icon */}
                  <motion.div
                    className="relative group"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <div className={`absolute left-4 top-4 transition-all duration-300 ${focusedField === "messaggio" || formData.messaggio ? "text-primary" : "text-muted-foreground/40"}`}>
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      name="messaggio"
                      value={formData.messaggio}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("messaggio")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      placeholder={t("contact.message")}
                      className={`w-full pl-11 pr-5 py-4 bg-transparent border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-500 outline-none resize-none
                        ${focusedField === "messaggio"
                          ? "border-primary/60 shadow-[0_0_0_3px_hsl(var(--primary)/0.1),0_8px_24px_-8px_hsl(var(--primary)/0.15)] bg-primary/[0.03]"
                          : "border-border/60 hover:border-border group-hover:bg-card/50"
                        }`}
                    />
                  </motion.div>
                  
                  {/* Privacy checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer pt-2 group/check">
                    <div className="relative mt-0.5">
                      <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} className="peer sr-only" />
                      <div className="w-5 h-5 border-2 border-border/60 rounded-md transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center group-hover/check:border-muted-foreground/40">
                        <motion.svg
                          className="w-3 h-3 text-primary-foreground"
                          viewBox="0 0 12 12"
                          initial={false}
                          animate={formData.privacy ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        >
                          <motion.path
                            d="M2 6l3 3 5-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {t("contact.privacy")} <Link to="/privacy-policy" className="text-primary hover:underline transition-colors">{t("contact.privacyLink")}</Link> *
                    </span>
                  </label>

                  {/* Submit button */}
                  <div className="pt-6">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full overflow-hidden bg-primary text-primary-foreground px-8 py-5 font-bold text-sm rounded-2xl flex items-center justify-center gap-3 group disabled:opacity-60 transition-all duration-500"
                      whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                      {/* Button glow */}
                      <div className="absolute inset-0 shadow-[0_8px_32px_-6px_hsl(var(--primary)/0.5)] group-hover:shadow-[0_12px_40px_-6px_hsl(var(--primary)/0.6)] transition-shadow duration-500" />
                      
                      <span className="relative z-10 flex items-center gap-3">
                        {isSubmitting ? (
                          <>{t("contact.submitting")} <Loader2 className="w-4 h-4 animate-spin" /></>
                        ) : (
                          <>{t("contact.submit")} <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" /></>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;