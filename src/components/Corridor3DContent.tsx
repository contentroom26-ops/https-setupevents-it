import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Send, ArrowRight, Loader2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Portfolio images
import diesel1 from "@/assets/diesel-1.jpg";
import diesel2 from "@/assets/diesel-2.jpg";
import dieselEvent1 from "@/assets/diesel-event-1.jpg";
import dieselEvent2 from "@/assets/diesel-event-2.jpg";
import dieselEvent4 from "@/assets/diesel-event-4.jpg";
import dieselEvent5 from "@/assets/diesel-event-5.jpg";

// Section Z positions along the corridor
const Z = {
  hero: 0,
  story: -12,
  method: -22,
  services: -34,
  portfolio: -46,
  whyUs: -56,
  contact: -65,
  footer: -73,
};

// Visibility wrapper - only renders Html when camera is within range
function Section3D({
  position,
  children,
  range = 25,
  width = 700,
}: {
  position: [number, number, number];
  children: React.ReactNode;
  range?: number;
  width?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    if (groupRef.current) {
      const dist = Math.abs(camera.position.z - position[2]);
      groupRef.current.visible = dist < range;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Html center transform distanceFactor={10} zIndexRange={[100, 0]}>
        <div style={{ width, pointerEvents: "auto" }}>{children}</div>
      </Html>
    </group>
  );
}

// ─── HERO ───────────────────────────────────────────
function Hero3D() {
  const scrollToContact = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const phoneNumber = "393284163053";
    const message = encodeURIComponent(
      "Salve, vorrei organizzare un evento, vorrei avere più informazioni."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <Section3D position={[0, 3.5, Z.hero]} width={800}>
      <div className="text-center">
        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white/80 text-sm uppercase tracking-widest mb-8">
          Event Agency
        </span>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[0.95] tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Creiamo eventi
          <br />
          <span className="italic font-normal">indimenticabili</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
          Corporate events, brand activations, produzioni spettacolari. Dalla
          visione all'applauso finale.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToContact}
            className="bg-white text-black px-8 py-4 font-semibold tracking-tight uppercase text-sm flex items-center gap-2 rounded-full hover:bg-white/90 transition-all"
          >
            Richiedi preventivo
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={openWhatsApp}
            className="bg-transparent border-2 border-white text-white px-8 py-4 font-semibold tracking-tight uppercase text-sm flex items-center gap-2 rounded-full hover:bg-white hover:text-black transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            Parla con noi
          </button>
        </div>
      </div>
    </Section3D>
  );
}

// ─── STORY ──────────────────────────────────────────
function Story3D() {
  return (
    <Section3D position={[-1.5, 3, Z.story]} width={600}>
      <div className="bg-black/50 backdrop-blur-md p-10 border border-white/10 rounded-lg">
        <span className="text-sm text-white/50 uppercase tracking-widest block mb-4">
          La nostra storia
        </span>
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Dall'intrattenimento
          <br />
          <span className="italic font-normal">all'eccellenza</span>
        </h2>
        <p className="text-white/70 leading-relaxed text-lg mb-8">
          Setup Events è una realtà specializzata nella progettazione e
          organizzazione di eventi su misura a Firenze. Grazie a una solida
          esperienza nel mondo dell'intrattenimento e a una profonda conoscenza
          del territorio, creiamo esperienze pensate per valorizzare brand,
          location e pubblico di riferimento.
        </p>
        <div className="flex items-center gap-6">
          <div className="w-16 h-px bg-white/50" />
          <span className="text-sm uppercase tracking-widest text-white/50">
            Gabriel Lleshi, Founder
          </span>
        </div>
      </div>
    </Section3D>
  );
}

// ─── METHOD ─────────────────────────────────────────
const steps = [
  { number: "01", title: "Brief", description: "Ascoltiamo le tue esigenze e obiettivi." },
  { number: "02", title: "Concept", description: "Sviluppiamo idee creative su misura." },
  { number: "03", title: "Produzione", description: "Gestiamo location, fornitori, staff." },
  { number: "04", title: "Evento", description: "Esecuzione perfetta, ogni dettaglio curato." },
];

function Method3D() {
  return (
    <Section3D position={[0, 3, Z.method]} width={900}>
      <div className="bg-black/50 backdrop-blur-md p-10 border border-white/10 rounded-lg">
        <span className="text-sm text-white/50 uppercase tracking-widest block mb-4">
          Metodo
        </span>
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-10 text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Il nostro
          <br />
          <span className="italic font-normal">processo</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="group">
              <span className="text-5xl font-bold text-white/10 block leading-none">
                {step.number}
              </span>
              <h3
                className="text-xl font-bold mt-3 mb-2 text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-white/60 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section3D>
  );
}

// ─── SERVICES ───────────────────────────────────────
const services = [
  { number: "01", title: "Corporate Events", description: "Meeting, convention, cene aziendali e team building." },
  { number: "02", title: "Launch Product", description: "Lanci prodotto per massimizzare visibilità e impatto." },
  { number: "03", title: "Hostess e Steward", description: "Personale selezionato per accoglienza e promozione." },
  { number: "04", title: "Public Relations", description: "Gestione contatti e ospiti con selezione del target." },
  { number: "05", title: "Location e Set-up", description: "Scouting location e allestimenti scenografici." },
  { number: "06", title: "A / V Services", description: "Audio-video professionali con tecnologie all'avanguardia." },
];

function Services3D() {
  return (
    <Section3D position={[0, 3, Z.services]} width={900}>
      <div className="bg-black/50 backdrop-blur-md p-10 border border-white/10 rounded-lg">
        <span className="text-sm text-white/50 uppercase tracking-widest block mb-4">
          Servizi
        </span>
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-10 text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Cosa
          <br />
          <span className="italic font-normal">facciamo</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.number}
              className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors"
            >
              <span className="text-xs text-white/40">[{s.number}]</span>
              <h3
                className="text-lg font-bold text-white mt-2 mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {s.title}
              </h3>
              <p className="text-white/60 text-sm">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section3D>
  );
}

// ─── PORTFOLIO ──────────────────────────────────────
const projects = [
  { image: dieselEvent1, title: "Diesel Store Opening", category: "Brand Activation" },
  { image: diesel1, title: "Diesel Fashion Night", category: "Fashion Event" },
  { image: dieselEvent2, title: "Diesel Collection", category: "Product Launch" },
  { image: dieselEvent4, title: "Fashion Showcase", category: "Fashion Event" },
  { image: diesel2, title: "VIP Experience", category: "Exclusive Event" },
  { image: dieselEvent5, title: "Shopping Experience", category: "Brand Activation" },
];

function Portfolio3D() {
  return (
    <Section3D position={[0, 3, Z.portfolio]} width={900}>
      <div className="bg-black/50 backdrop-blur-md p-10 border border-white/10 rounded-lg">
        <span className="text-sm text-white/50 uppercase tracking-widest block mb-4">
          Portfolio
        </span>
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-10 text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          I nostri
          <br />
          <span className="italic font-normal">eventi</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.title} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden mb-2">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                {p.category}
              </span>
              <h3 className="text-sm font-bold text-white mt-1">{p.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </Section3D>
  );
}

// ─── WHY US ─────────────────────────────────────────
const stats = [
  { number: "100%", label: "Clienti soddisfatti" },
  { number: "20+", label: "Eventi realizzati" },
  { number: "24h", label: "Tempo di risposta" },
];

function WhyUs3D() {
  return (
    <Section3D position={[0, 3, Z.whyUs]} width={800}>
      <div className="bg-black/50 backdrop-blur-md p-10 border border-white/10 rounded-lg text-center">
        <span className="text-sm text-white/50 uppercase tracking-widest block mb-4">
          Risultati
        </span>
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Perché
          <br />
          <span className="italic font-normal">sceglierci</span>
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <span
                className="text-5xl md:text-6xl font-bold text-white block"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {s.number}
              </span>
              <p className="text-white/50 mt-2 text-sm uppercase tracking-widest">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section3D>
  );
}

// ─── CONTACT ────────────────────────────────────────
const eventTypes = [
  "Corporate Event", "Brand Activation", "Gala Dinner", "Lancio Prodotto",
  "Convention", "Private Event", "Fiera / Trade Show", "Altro",
];

function Contact3D() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    nome: "", cognome: "", azienda: "", email: "", telefono: "",
    tipoEvento: "", dataEvento: "", budget: "", messaggio: "", privacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      setSubmitStatus("error");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          nome: formData.nome, cognome: formData.cognome, azienda: formData.azienda,
          email: formData.email, telefono: formData.telefono, tipoEvento: formData.tipoEvento,
          dataEvento: formData.dataEvento, budget: formData.budget, messaggio: formData.messaggio,
        },
      });
      if (error) throw error;
      setSubmitStatus("success");
      setFormData({
        nome: "", cognome: "", azienda: "", email: "", telefono: "",
        tipoEvento: "", dataEvento: "", budget: "", messaggio: "", privacy: false,
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const inputCls =
    "w-full px-0 py-3 bg-transparent border-0 border-b border-white/30 focus:outline-none focus:border-white transition-colors placeholder:text-white/40 text-white text-sm";

  return (
    <Section3D position={[0, 3.5, Z.contact]} width={700} range={20}>
      <div
        id="contact"
        className="bg-black/60 backdrop-blur-md p-10 border border-white/10 rounded-lg"
      >
        <div className="text-center mb-10">
          <span className="text-sm text-white/50 uppercase tracking-widest block mb-4">
            Contattaci
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Inizia il tuo
            <br />
            <span className="italic font-normal">progetto</span>
          </h2>
          <p className="text-white/60 text-base">
            Raccontaci la tua visione. Ti risponderemo entro 24 ore.
          </p>
        </div>

        {submitStatus === "success" ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-white mb-3">Richiesta inviata!</h3>
            <p className="text-white/60">Ti risponderemo entro 24 ore. Grazie!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-x-6">
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className={inputCls} placeholder="Nome *" />
              <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} required className={inputCls} placeholder="Cognome *" />
            </div>
            <input type="text" name="azienda" value={formData.azienda} onChange={handleChange} className={inputCls} placeholder="Azienda (opzionale)" />
            <div className="grid grid-cols-2 gap-x-6">
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputCls} placeholder="Email *" />
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required className={inputCls} placeholder="Telefono *" />
            </div>
            <div className="grid grid-cols-2 gap-x-6">
              <select name="tipoEvento" value={formData.tipoEvento} onChange={handleChange} required className={`${inputCls} cursor-pointer`}>
                <option value="">Tipo di evento *</option>
                {eventTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
              <input type="date" name="dataEvento" value={formData.dataEvento} onChange={handleChange} className={inputCls} />
            </div>
            <input type="text" name="budget" value={formData.budget} onChange={handleChange} className={inputCls} placeholder="Budget indicativo" />
            <textarea name="messaggio" value={formData.messaggio} onChange={handleChange} required rows={3} className={`${inputCls} resize-none`} placeholder="Descrivi il tuo evento ideale... *" />
            <div className="pt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} className="mt-1 w-4 h-4 accent-white" />
                <span className="text-xs text-white/60">Accetto la Privacy Policy *</span>
              </label>
            </div>
            {submitStatus === "error" && (
              <p className="text-red-400 text-sm">Errore. Riprova o accetta la privacy policy.</p>
            )}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black px-8 py-4 font-bold tracking-tight uppercase text-sm flex items-center justify-center gap-3 rounded-full hover:bg-white/90 transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>Invio in corso... <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : (
                  <>Invia richiesta <Send className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Section3D>
  );
}

// ─── FOOTER ─────────────────────────────────────────
function Footer3D() {
  return (
    <Section3D position={[0, 2, Z.footer]} width={600}>
      <div className="text-center text-white/50 text-sm space-y-3">
        <h3
          className="text-2xl font-bold text-white tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          GABRIELLESHI
        </h3>
        <p>Creiamo esperienze memorabili per brand ambiziosi.</p>
        <div className="flex items-center justify-center gap-6 text-xs uppercase tracking-widest">
          <a href="mailto:info@setupevents.it" className="hover:text-white transition-colors">
            info@setupevents.it
          </a>
          <span>•</span>
          <a href="tel:+393284163053" className="hover:text-white transition-colors">
            +39 328 416 3053
          </a>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4">
          <a
            href="https://www.instagram.com/gabrielleshi_events/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white"
          >
            IG
          </a>
        </div>
        <div className="pt-6 text-xs text-white/30 border-t border-white/10 mt-6">
          <p>© {new Date().getFullYear()} Gabrielleshi Events • P.IVA: 07386270487</p>
        </div>
      </div>
    </Section3D>
  );
}

// ─── MAIN EXPORT ────────────────────────────────────
const Corridor3DContent = () => {
  return (
    <group>
      <Hero3D />
      <Story3D />
      <Method3D />
      <Services3D />
      <Portfolio3D />
      <WhyUs3D />
      <Contact3D />
      <Footer3D />
    </group>
  );
};

export default Corridor3DContent;
