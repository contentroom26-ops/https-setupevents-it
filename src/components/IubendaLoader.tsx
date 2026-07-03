import { useEffect } from "react";

const IUBENDA_WIDGET_URL =
  "https://embeds.iubenda.com/widgets/6aa1c7bc-8de3-4188-9ea6-70b12bfa000a.js";

const loadIubenda = () => {
  if (document.querySelector(`script[src="${IUBENDA_WIDGET_URL}"]`)) return;
  const script = document.createElement("script");
  script.src = IUBENDA_WIDGET_URL;
  script.async = true;
  document.body.appendChild(script);
};

const IubendaLoader = () => {
  useEffect(() => {
    // Strategia: carica al primo evento utente OPPURE dopo 5s
    // così non blocca mai FCP/LCP
    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      loadIubenda();
      cleanup();
    };

    const cleanup = () => {
      ["mousedown", "touchstart", "keydown", "scroll"].forEach((evt) =>
        window.removeEventListener(evt, load)
      );
    };

    ["mousedown", "touchstart", "keydown", "scroll"].forEach((evt) =>
      window.addEventListener(evt, load, { once: true, passive: true })
    );

    // Fallback: carica comunque dopo 5 secondi
    const timer = setTimeout(load, 5000);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  return null;
};

export default IubendaLoader;
