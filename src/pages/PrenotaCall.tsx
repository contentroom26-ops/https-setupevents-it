import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { CalendarIcon, Clock, ArrowRight, ArrowLeft, Loader2, CheckCircle2, Video, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const TIME_SLOTS = ["09:30", "10:30", "11:30", "14:30", "15:30", "16:30", "17:30"];
const TOPICS = [
  "Corporate Event",
  "Brand Activation",
  "Hostess & Staff",
  "Public Relations",
  "Event Production",
  "Altro",
];
const CHANNELS = [
  { id: "video", label: "Videocall", icon: <Video className="w-4 h-4" /> },
  { id: "phone", label: "Telefono", icon: <Phone className="w-4 h-4" /> },
];

const PrenotaCall = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [date, setDate] = useState<Date>();
  const [data, setData] = useState({
    nome: "",
    email: "",
    telefono: "",
    azienda: "",
    argomento: "",
    canale: "video",
    orario: "",
    note: "",
  });

  useEffect(() => {
    document.title = "Prenota una call — SetupEvents";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Prenota una call con il team SetupEvents: 30 minuti per parlare del tuo evento.");
  }, []);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(p => ({ ...p, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !data.orario || !data.email || !data.nome) {
      toast({ title: "Campi obbligatori", description: "Nome, email, data e orario sono richiesti.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const dataStr = format(date, "EEEE d MMMM yyyy", { locale: it });
      const messaggio = `🗓 RICHIESTA PRENOTAZIONE CALL

📅 Data: ${dataStr}
🕒 Orario: ${data.orario}
📞 Canale: ${data.canale === "video" ? "Videocall" : "Telefono"}
🎯 Argomento: ${data.argomento || "Non specificato"}

👤 Nome: ${data.nome}
📧 Email: ${data.email}
☎️ Telefono: ${data.telefono || "—"}
🏢 Azienda: ${data.azienda || "—"}

📝 Note:
${data.note || "—"}`;

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nome: data.nome, cognome: "",
          email: data.email,
          telefono: data.telefono,
          azienda: data.azienda,
          tipoEvento: `📞 Prenotazione Call — ${data.argomento || "Generale"}`,
          dataEvento: `${dataStr} · ${data.orario}`,
          messaggio,
        },
      });
      if (error) throw error;
      setDone(true);
    } catch {
      toast({ title: "Errore", description: "Riprova più tardi.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-background overflow-hidden">
      {/* Atmospheric bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-60"
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.18) 0%, transparent 55%)" }} />
        <div className="absolute inset-0 grain opacity-25" aria-hidden />
      </div>

      <Navbar />

      <main className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto px-6 pt-32 md:pt-40 pb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <Link to="/contatti" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs uppercase tracking-[0.3em] mb-8 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Torna ai contatti
          </Link>
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary/80 font-semibold mb-5">
            Prenota una call
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter leading-[1.05]">
            30 minuti per <span className="text-primary">conoscerci</span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-white/50 max-w-xl mx-auto leading-relaxed">
            Scegli quando preferisci. Confermiamo via email entro qualche ora con il link della videocall o richiamandoti.
          </p>
        </motion.div>

        {/* Form / success */}
        <div className="container-custom px-6 pb-24 md:pb-32">
          <motion.div
            className="max-w-3xl mx-auto rounded-2xl p-7 md:p-10"
            style={{
              background: "rgba(20,20,20,0.55)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
          >
            {done ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Richiesta ricevuta</h2>
                <p className="text-white/60 max-w-md mx-auto">
                  Abbiamo ricevuto la tua richiesta di call. Ti confermiamo orario e dettagli via email entro qualche ora.
                </p>
                <Link to="/" className="inline-flex items-center gap-2 mt-8 text-primary hover:text-primary/80 text-sm uppercase tracking-[0.2em] font-semibold">
                  Torna alla home <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-7">
                {/* Step: data + ora */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">1 · Quando ti va bene?</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            "flex items-center justify-between w-full rounded-xl px-5 py-4 text-sm text-left outline-none transition-all hover:border-primary/40",
                            !date && "text-white/40"
                          )}
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          <span className={date ? "text-white" : ""}>
                            {date ? format(date, "EEEE d MMMM yyyy", { locale: it }) : "Seleziona la data"}
                          </span>
                          <CalendarIcon className="w-4 h-4 text-primary" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-card border-white/10" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          locale={it}
                          disabled={(d) => {
                            const today = new Date(); today.setHours(0, 0, 0, 0);
                            const day = d.getDay();
                            return d < today || day === 0 || day === 6;
                          }}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>

                    <div className="relative">
                      <select
                        name="orario"
                        value={data.orario}
                        onChange={handle}
                        required
                        className="w-full appearance-none rounded-xl pl-5 pr-12 py-4 text-sm text-white outline-none transition-all hover:border-primary/40"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <option value="" className="bg-neutral-900">Seleziona l'orario</option>
                        {TIME_SLOTS.map(t => <option key={t} value={t} className="bg-neutral-900">{t}</option>)}
                      </select>
                      <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Step canale */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">2 · Come ti chiamiamo?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {CHANNELS.map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setData(p => ({ ...p, canale: c.id }))}
                        className={cn(
                          "flex items-center justify-center gap-3 rounded-xl py-4 text-sm font-medium transition-all",
                          data.canale === c.id
                            ? "text-white border-primary/50 bg-primary/10"
                            : "text-white/60 border-white/[0.08] hover:border-white/20"
                        )}
                        style={{
                          background: data.canale === c.id ? "hsl(var(--primary) / 0.10)" : "rgba(255,255,255,0.04)",
                          borderWidth: 1, borderStyle: "solid",
                        }}
                      >
                        <span className={data.canale === c.id ? "text-primary" : "text-white/50"}>{c.icon}</span>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step dati */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">3 · I tuoi dati</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field name="nome" required placeholder="Nome e cognome *" value={data.nome} onChange={handle} />
                    <Field name="email" type="email" required placeholder="Email *" value={data.email} onChange={handle} />
                    <Field name="telefono" type="tel" placeholder="Telefono" value={data.telefono} onChange={handle} />
                    <Field name="azienda" placeholder="Azienda" value={data.azienda} onChange={handle} />
                  </div>
                </div>

                {/* Argomento + note */}
                <div className="space-y-4">
                  <div className="relative">
                    <select
                      name="argomento"
                      value={data.argomento}
                      onChange={handle}
                      className="w-full appearance-none rounded-xl px-5 py-4 text-sm text-white outline-none transition-all hover:border-primary/40"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <option value="" className="bg-neutral-900">Di cosa vuoi parlare?</option>
                      {TOPICS.map(t => <option key={t} value={t} className="bg-neutral-900">{t}</option>)}
                    </select>
                    <svg className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <textarea
                    name="note"
                    value={data.note}
                    onChange={handle}
                    rows={4}
                    placeholder="Note aggiuntive (opzionale)"
                    maxLength={2000}
                    className="w-full rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/30 outline-none resize-none transition-all hover:border-primary/40"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative overflow-hidden rounded-xl py-4 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 border border-primary/40"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary) / 0.22), hsl(var(--primary) / 0.08))",
                    boxShadow: "0 8px 32px hsl(var(--primary) / 0.18)",
                  }}
                >
                  <span className="relative z-10 inline-flex items-center gap-2 justify-center uppercase tracking-[0.2em] text-xs">
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Invio in corso</>
                    ) : (
                      <>Conferma prenotazione <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /></>
                    )}
                  </span>
                </button>

                <p className="text-[11px] text-white/30 text-center">
                  Inviando il form accetti la nostra{" "}
                  <Link to="/privacy-policy" className="text-white/50 hover:text-white underline underline-offset-2">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Field = ({ name, type = "text", required = false, placeholder, value, onChange }:
  { name: string; type?: string; required?: boolean; placeholder: string; value: string; onChange: any }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    placeholder={placeholder}
    maxLength={255}
    className="w-full rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/30 outline-none transition-all hover:border-primary/40 focus:border-primary/40"
    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
  />
);

export default PrenotaCall;
