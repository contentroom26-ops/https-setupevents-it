import { useState, useEffect } from "react";

const GlobalVideoBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Aspetta che il browser sia idle prima di caricare il video globale,
    // così non compete con le risorse critiche della hero
    const load = () => setVideoLoaded(true);
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(load, { timeout: 4000 });
    } else {
      const t = setTimeout(load, 4000);
      return () => clearTimeout(t);
    }
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
      {videoLoaded && (
        <video
          autoPlay
          loop
          muted
          playsInline
          // @ts-ignore
          webkit-playsinline=""
          preload="none"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/global-bg.mp4" type="video/mp4" />
        </video>
      )}
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
