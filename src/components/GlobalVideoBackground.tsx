import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Sfondo animato globale (480p, senza audio).
// - Sempre scuro: se il video non parte resta la sua immagine fissa (mai grigio/bianco).
// - Sulla home parte solo quando l'hero esce dallo schermo (l'hero lo copre del tutto).
// - Non viene caricato con risparmio dati, 2G o animazioni ridotte.
const VIDEO_SRC = "/videos/global-bg-480.mp4";
const POSTER_SRC = "/images/global-poster.jpg";
const OTHER_PAGES_DELAY_MS = 1200;

type NetInfo = { saveData?: boolean; effectiveType?: string };

const canPlayVideo = (): boolean => {
  if (typeof window === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  if (conn?.saveData || /2g$/.test(conn?.effectiveType ?? "")) return false;
  return true;
};

const GlobalVideoBackground = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [wanted, setWanted] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  // Quando serve davvero il video?
  useEffect(() => {
    if (!isHome) {
      const id = window.setTimeout(() => setWanted(true), OTHER_PAGES_DELAY_MS);
      return () => window.clearTimeout(id);
    }
    const check = () => window.scrollY > window.innerHeight * 0.6;
    if (check()) {
      setWanted(true);
      return;
    }
    const onScroll = () => {
      if (check()) {
        setWanted(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (wanted && canPlayVideo()) setSrc(VIDEO_SRC);
  }, [wanted]);

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
        width: "100%",
        height: "100lvh",
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
        backgroundColor: "hsl(var(--background))",
        backgroundImage: `url(${POSTER_SRC})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <video
        ref={videoRef}
        src={src ?? undefined}
        loop
        muted
        playsInline
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
