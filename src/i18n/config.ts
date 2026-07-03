import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Rileva la lingua prima di caricare — evita di scaricare tutte e 3 le lingue
const detectedLang = (() => {
  try {
    const qs = new URLSearchParams(window.location.search).get("lang");
    if (qs && ["it", "en", "zh"].includes(qs)) return qs;
    const stored = localStorage.getItem("i18nextLng");
    if (stored && ["it", "en", "zh"].includes(stored)) return stored;
    const nav = navigator.language?.slice(0, 2);
    if (nav && ["it", "en", "zh"].includes(nav)) return nav;
  } catch {}
  return "it";
})();

// Carica solo la lingua necessaria subito, le altre lazy
const loadTranslations = async (lang: string) => {
  const map: Record<string, () => Promise<unknown>> = {
    it: () => import("./locales/it.json"),
    en: () => import("./locales/en.json"),
    zh: () => import("./locales/zh.json"),
  };
  const mod = await (map[lang] ?? map["it"])();
  return (mod as { default: unknown }).default;
};

const initI18n = async () => {
  const translations = await loadTranslations(detectedLang);

  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        [detectedLang]: { translation: translations },
      },
      fallbackLng: "it",
      lng: detectedLang,
      interpolation: { escapeValue: false },
      detection: {
        order: ["querystring", "localStorage", "navigator"],
        lookupQuerystring: "lang",
        caches: ["localStorage"],
      },
    });

  // Carica le altre lingue in background dopo il boot
  const others = ["it", "en", "zh"].filter((l) => l !== detectedLang);
  others.forEach(async (lang) => {
    const t = await loadTranslations(lang);
    i18n.addResourceBundle(lang, "translation", t);
  });
};

// Esporta la promise così main.tsx può aspettarla
export const i18nReady = initI18n();
export default i18n;
