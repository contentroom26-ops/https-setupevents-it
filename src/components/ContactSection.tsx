import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ease = [0.22, 1, 0.36, 1] as const;

interface MinimalInputProps {
  name: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MinimalInput = ({ name, type = "text", required = false, placeholder, value, onChange }: MinimalInputProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-border/40 py-4 text-base md:text-lg text-foreground placeholder:text-muted-foreground/30 outline-none transition-colors duration-500 focus:border-foreground hover:border-muted-foreground/60"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-foreground origin-left"
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.4, ease }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

interface MinimalTextareaProps {
  name: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MinimalTextarea = ({ name, required = false, placeholder, value, onChange }: MinimalTextareaProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={4}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-border/40 py-4 text-base md:text-lg text-foreground placeholder:text-muted-foreground/30 outline-none transition-colors duration-500 focus:border-foreground hover:border-muted-foreground/60 resize-none"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-foreground origin-left"
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.4, ease }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

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
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div className="container-custom relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-xs font-mono text-muted-foreground">[04]</span>
          <div className="h-px w-12 bg-primary/40" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">{t("contact.label")}</span>
        </motion.div>

        {/* Big heading */}
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter leading-[0.9] text-foreground mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          {t("contact.heading")}
          <span className="text-muted-foreground/20">.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-16 mt-16 md:mt-24">
          {/* Left text */}
          <motion.div
            className="lg:col-span-4 flex flex-col justify-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <p className="text-muted-foreground/60 text-lg md:text-xl leading-relaxed max-w-sm">
              {t("contact.description")}
            </p>
          </motion.div>

          {/* Right form */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <form onSubmit={handleSubmit} className="space-y-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <MinimalInput name="nome" required placeholder={t("contact.firstName") + " *"} value={formData.nome} onChange={handleChange} />
                <MinimalInput name="cognome" required placeholder={t("contact.lastName") + " *"} value={formData.cognome} onChange={handleChange} />
              </div>
              <MinimalInput name="azienda" placeholder={t("contact.company")} value={formData.azienda} onChange={handleChange} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <MinimalInput name="email" type="email" required placeholder={t("contact.email") + " *"} value={formData.email} onChange={handleChange} />
                <MinimalInput name="telefono" type="tel" required placeholder={t("contact.phone") + " *"} value={formData.telefono} onChange={handleChange} />
              </div>
              <MinimalInput name="dataEvento" type="date" placeholder={t("contact.eventDate")} value={formData.dataEvento} onChange={handleChange} />
              <MinimalTextarea name="messaggio" required placeholder={t("contact.message")} value={formData.messaggio} onChange={handleChange} />

              {/* Privacy */}
              <div className="pt-8">
                <label className="flex items-start gap-3 cursor-pointer group/check">
                  <div className="relative mt-1">
                    <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} className="peer sr-only" />
                    <div className="w-4 h-4 border border-muted-foreground/30 rounded-sm transition-all duration-300 peer-checked:border-foreground peer-checked:bg-foreground flex items-center justify-center group-hover/check:border-muted-foreground/60">
                      <svg className={`w-2.5 h-2.5 text-background transition-opacity duration-200 ${formData.privacy ? "opacity-100" : "opacity-0"}`} viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground/50 leading-relaxed">
                    {t("contact.privacy")} <Link to="/privacy-policy" className="text-foreground/70 hover:text-foreground underline transition-colors">{t("contact.privacyLink")}</Link>
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="pt-10">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-full text-sm font-semibold tracking-wide disabled:opacity-40 transition-all duration-300 hover:gap-5"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                >
                  {isSubmitting ? (
                    <><span>{t("contact.submitting")}</span><Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <><span>{t("contact.submit")}</span><ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /></>
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
