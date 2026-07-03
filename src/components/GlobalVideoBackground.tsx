import { useEffect, useRef, useState } from "react";

const GlobalVideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const tryPlay = () => {
      const video = videoRef.current;
      if (!video || cancelled) return;

      // Forza attributi Safari
      video.muted = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      // Su Safari il load() esplicito è necessario dopo preload="none"
      video.load();

      const attempt = () => {
        if (cancelled) return;
        video
          .play()
          .then(() => {
            if (!cancelled) setVisible(true);
          })
          .catch(() => {
            // Safari può rifiutare il primo tentativo — riprova dopo 300ms
            setTimeout(() => {
              if (!cancelled) {
                video.play().then(() => {
                  if (!cancelled) setVisible(true);
                }).catch(() => {});
              }
            }, 300);
          });
      };

      if (video.readyState >= 2) {
        attempt();
      } else {
        video.addEventListener("canplay", attempt, { once: true });
      }
    };

    // Aspetta che la hero sia finita (3.5s) poi avvia il video
    // Usa setTimeout puro — requestIdleCallback non è supportato su Safari
    const t = setTimeout(tryPlay, 3500);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Il video è sempre nel DOM — Safari lo inizializza prima */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        // @ts-ignore
        webkit-playsinline=""
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <source src="/videos/global-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay scuro sempre visibile — copre il grigio durante il caricamento */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "hsl(var(--background) / 0.72)",
        }}
      />
    </div>
  );
};

export default GlobalVideoBackground;
