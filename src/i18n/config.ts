import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import it from "./locales/it.json";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: { translation: it },
      en: { translation: en },
      zh: { translation: zh },
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

export const i18nReady = Promise.resolve();
export default i18n;
