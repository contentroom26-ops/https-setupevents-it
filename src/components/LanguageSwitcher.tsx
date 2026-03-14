import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

const languages = [
  { code: "it", label: "IT", flag: "🇮🇹" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
    // Update HTML lang attribute
    document.documentElement.lang = code === "zh" ? "zh-CN" : code;
    // Update SEO meta tags
    updateSeoMeta(code);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-300 text-[10px] md:text-[11px] uppercase tracking-[0.1em] font-medium"
      >
        <Globe className="w-3 h-3 md:w-3.5 md:h-3.5" />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full right-0 mt-2 bg-[hsl(var(--background))]/95 backdrop-blur-2xl border border-white/[0.12] rounded-xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)] z-50 min-w-[120px]"
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="p-1.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    i18n.language === lang.code
                      ? "bg-white/[0.1] text-white"
                      : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="text-[11px] font-medium tracking-wide">{lang.label}</span>
                  {i18n.language === lang.code && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function updateSeoMeta(lang: string) {
  const translations = {
    it: {
      title: "Organizzazione Eventi a Firenze | SetupEvents by Gabriel Lleshi",
      description: "SetupEvents di Gabriel Lleshi organizza eventi esclusivi a Firenze: corporate, privati, luxury e VIP. Location, catering, PR e produzione completa.",
    },
    en: {
      title: "Event Planning in Florence | SetupEvents by Gabriel Lleshi",
      description: "SetupEvents by Gabriel Lleshi organizes exclusive events in Florence: corporate, private, luxury and VIP. Venues, catering, PR and full production.",
    },
    zh: {
      title: "佛罗伦萨活动策划 | SetupEvents - Gabriel Lleshi",
      description: "SetupEvents由Gabriel Lleshi创立，在佛罗伦萨策划高端活动：企业活动、私人活动、奢华活动及VIP活动。",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.it;
  document.title = t.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", t.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.description);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", t.title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", t.description);
}

export default LanguageSwitcher;
