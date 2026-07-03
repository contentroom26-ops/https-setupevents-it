import { useEffect, useRef, useState } from "react";

const GlobalVideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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
              video.play()
                .then(() => { if (!cancelled) setVisible(true); })
                .catch(() => {});
            }
          }, 500);
        });
    };

    // Inizia a caricare subito — durante l'intro logo
    video.load();

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", tryPlay);
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
      <video
        ref={videoRef}
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
      >
        <source src="/videos/global-bg.mp4" type="video/mp4" />
      </video>

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
