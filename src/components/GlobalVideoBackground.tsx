const GlobalVideoBackground = () => {
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
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/videos/global-bg.mp4" type="video/mp4" />
      </video>
      {/* Subtle dark overlay for readability */}
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
