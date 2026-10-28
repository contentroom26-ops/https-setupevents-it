import { useEffect, useRef, useState } from "react";

// Video di sfondo leggero (480p, senza audio). Parte solo dopo l'intro dell'hero
// e non viene caricato con risparmio dati, 2G o animazioni ridotte.
const pickGlobalVideo = (): string | null => {
  if (typeof window === "undefined") return null;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return null;
  if (conn?.saveData || /2g$/.test(conn?.effectiveType ?? "")) return null;
  return "/videos/global-bg-480.mp4";
};

const START_DELAY_MS = 3500;

const GlobalVideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  // Non compete con il caricamento iniziale: si attiva dopo l'intro del logo
  useEffect(() => {
    const id = window.setTimeout(() => setSrc(pickGlobalVideo()), START_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let cancelled = false;

    // Attributi Safari — impostati subito prima del play
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      if (cancelled) return;
      video
        .play()
        .then(() => {
          if (!cancelled) setVisible(true);
        })
        .catch(() => {
          setTimeout(() => {
            if (!cancelled) {
              video
                .play()
                .then(() => {
                  if (!cancelled) setVisible(true);
                })
                .catch(() => {});
            }
          }, 500);
        });
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", tryPlay);
    };
  }, [src]);

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
      <video
        ref={videoRef}
        src={src ?? undefined}
        loop
        muted
        playsInline
        // @ts-ignore
        webkit-playsinline=""
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      />

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
