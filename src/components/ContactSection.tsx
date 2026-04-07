import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────── helpers ───────────────────── */
const EVENT_TYPES = [
  "Corporate Event",
  "Brand Activation",
  "Private Event / Wedding",
  "Hostess & Staff",
  "Audio / Video / Lighting",
  "Other",
];

/* ───────────────────── component ───────────────────── */
const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const curtainLineRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "", eventType: "", messaggio: "", privacy: false,
  });

  /* ── GSAP curtain animation ── */
  useEffect(() => {
    const section = sectionRef.current;
    const cL = curtainLeftRef.current;
    const cR = curtainRightRef.current;
    const cLine = curtainLineRef.current;
    const formW = formWrapRef.current;
    const beams = beamsRef.current;
    if (!section || !cL || !cR || !cLine || !formW || !beams) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: false,
          once: true,
        },
      });

      // Curtain center line fade
      tl.to(cLine, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0);

      // Left curtain
      tl.to(cL, {
        xPercent: -105,
        scaleX: 0.98,
        duration: 1.2,
        ease: "power3.inOut",
      }, 0);

      // Right curtain (slight delay for realism)
      tl.to(cR, {
        xPercent: 105,
        scaleX: 0.98,
        duration: 1.2,
        ease: "power3.inOut",
      }, 0.12);

      // Form reveal
      tl.fromTo(formW,
        { opacity: 0, y: 60, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out" },
        0.5
      );

      // Light beams
      tl.fromTo(beams,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power1.out" },
        0.6
      );
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Form handlers ── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(p => ({
      ...p,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

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
          nome: "", cognome: "",
          email: formData.email,
          telefono: "", azienda: "",
          dataEvento: "", messaggio: `[${formData.eventType}] ${formData.messaggio}`,
        },
      });
      if (error) throw error;
      toast({ title: t("contact.successTitle"), description: t("contact.successDesc") });
      setFormData({ email: "", eventType: "", messaggio: "", privacy: false });
    } catch {
      toast({ title: t("contact.errorTitle"), description: t("contact.errorDesc"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-0 overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Stage background ── */}
      <div className="absolute inset-0">
        <img
          src="/images/stage-bg.jpg"
          alt="Stage background"
          className="w-full h-full object-cover opacity-40"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* ── Light beams ── */}
      <div ref={beamsRef} className="absolute inset-0 pointer-events-none opacity-0" aria-hidden>
        <div className="absolute left-[20%] top-0 w-[2px] h-[60%] bg-gradient-to-b from-white/15 via-white/5 to-transparent" style={{ filter: "blur(6px)" }} />
        <div className="absolute left-[50%] top-0 w-[3px] h-[70%] bg-gradient-to-b from-white/20 via-white/8 to-transparent" style={{ filter: "blur(8px)" }} />
        <div className="absolute left-[78%] top-0 w-[2px] h-[55%] bg-gradient-to-b from-white/12 via-white/4 to-transparent" style={{ filter: "blur(5px)" }} />
      </div>

      {/* ── Curtain LEFT ── */}
      <div
        ref={curtainLeftRef}
        className="absolute inset-y-0 left-0 w-1/2 z-30"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #111 100%)",
          transformOrigin: "left center",
          willChange: "transform",
        }}
      />

      {/* ── Curtain RIGHT ── */}
      <div
        ref={curtainRightRef}
        className="absolute inset-y-0 right-0 w-1/2 z-30"
        style={{
          background: "linear-gradient(225deg, #0a0a0a 0%, #1a1a1a 40%, #111 100%)",
          transformOrigin: "right center",
          willChange: "transform",
        }}
      />

      {/* ── Center seam line ── */}
      <div
        ref={curtainLineRef}
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] z-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 5%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.9) 70%, transparent 95%)",
          boxShadow: "0 0 20px 6px rgba(0,0,0,0.5)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 min-h-screen flex items-center justify-center py-24 md:py-32 px-4">
        <div ref={formWrapRef} className="w-full max-w-2xl opacity-0">
          {/* Floating glass panel */}
          <div
            className="relative rounded-[20px] p-8 sm:p-12 md:p-14"
            style={{
              background: "rgba(18,18,18,0.65)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(255,255,255,0.03)",
            }}
          >
            {/* Glow underneath */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Title */}
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white leading-tight">
                {t("contact.heading")}
                <span className="text-white/30"> {t("contact.headingSub")}</span>
              </h2>
              <p className="mt-4 text-white/40 text-sm sm:text-base max-w-md mx-auto">
                {t("contact.description")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StageInput name="nome" placeholder={t("contact.firstName")} value={formData.nome} onChange={handleChange} required />
                <StageInput name="cognome" placeholder={t("contact.lastName")} value={formData.cognome} onChange={handleChange} required />
              </div>

              <StageInput name="email" type="email" placeholder={t("contact.email")} value={formData.email} onChange={handleChange} required />

              {/* Event type select */}
              <div className="relative">
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl px-5 py-4 text-sm text-white/90 outline-none transition-all duration-300 focus:ring-1 focus:ring-white/20"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <option value="" className="bg-neutral-900">Event Type</option>
                  {EVENT_TYPES.map(et => (
                    <option key={et} value={et} className="bg-neutral-900">{et}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              {/* Message */}
              <textarea
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
                required
                rows={4}
                placeholder={t("contact.message")}
                className="w-full rounded-xl px-5 py-4 text-sm text-white/90 placeholder:text-white/25 outline-none resize-none transition-all duration-300 focus:ring-1 focus:ring-white/20"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />

              {/* Privacy */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} className="peer sr-only" />
                  <div className="w-4 h-4 rounded-[4px] border border-white/20 transition-all duration-300 peer-checked:border-white/60 peer-checked:bg-white/90 flex items-center justify-center group-hover:border-white/40">
                    <svg className={`w-2.5 h-2.5 text-black transition-opacity duration-200 ${formData.privacy ? "opacity-100" : "opacity-0"}`} viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <span className="text-[11px] text-white/30 leading-relaxed">
                  {t("contact.privacy")}{" "}
                  <Link to="/privacy-policy" className="text-white/50 hover:text-white/80 underline transition-colors">
                    {t("contact.privacyLink")}
                  </Link>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group relative overflow-hidden rounded-xl py-4 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #fff 0%, #e0e0e0 100%)",
                  boxShadow: "0 4px 20px rgba(255,255,255,0.1)",
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-2 justify-center">
                  {isSubmitting ? (
                    <><span>{t("contact.submitting")}</span><Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <><span>{t("contact.sendRequest")}</span><ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /></>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Grain overlay ── */}
      <div className="absolute inset-0 grain pointer-events-none opacity-30 z-50" aria-hidden />
    </section>
  );
};

/* ───────────────────── Stage Input ───────────────────── */
interface StageInputProps {
  name: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StageInput = ({ name, type = "text", required = false, placeholder, value, onChange }: StageInputProps) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    placeholder={placeholder}
    className="w-full rounded-xl px-5 py-4 text-sm text-white/90 placeholder:text-white/25 outline-none transition-all duration-300 focus:ring-1 focus:ring-white/20"
    style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.08)",
    }}
  />
);

export default ContactSection;
