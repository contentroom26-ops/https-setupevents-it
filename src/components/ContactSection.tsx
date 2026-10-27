import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactPageContent from "./ContactPageContent";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const curtainLineRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cL = curtainLeftRef.current;
    const cR = curtainRightRef.current;
    const cLine = curtainLineRef.current;
    const wrap = contentWrapRef.current;
    if (!section || !cL || !cR || !cLine || !wrap) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });
      tl.to(cLine, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0)
        .to(cL, { xPercent: -105, duration: 1.2, ease: "power3.inOut" }, 0)
        .to(cR, { xPercent: 105, duration: 1.2, ease: "power3.inOut" }, 0.12)
        .fromTo(wrap, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 0.5);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
      // Fondo neutro (niente dominante calda) che finisce esattamente sul colore del footer (#0a0a0a)
      style={{ background: "linear-gradient(to bottom, #0d0d0d 0%, #0d0d0d 65%, #0a0a0a 100%)" }}
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bagliore rosso più contenuto, su fondo neutro: resta rosso, non vira al marrone */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 45% at 50% 0%, hsl(var(--primary) / 0.12) 0%, transparent 100%)" }} />
        <div className="absolute inset-0 grain opacity-25" aria-hidden />
      </div>

      {/* Curtains */}
      <div ref={curtainLeftRef} className="absolute inset-y-0 left-0 w-1/2 z-30"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #111 100%)", transformOrigin: "left center", willChange: "transform" }} />
      <div ref={curtainRightRef} className="absolute inset-y-0 right-0 w-1/2 z-30"
        style={{ background: "linear-gradient(225deg, #0a0a0a 0%, #1a1a1a 40%, #111 100%)", transformOrigin: "right center", willChange: "transform" }} />
      <div ref={curtainLineRef} className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] z-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 5%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.9) 70%, transparent 95%)", boxShadow: "0 0 20px 6px rgba(0,0,0,0.5)" }} />

      <div ref={contentWrapRef} className="relative z-20 opacity-0">
        <ContactPageContent />
      </div>
    </section>
  );
};

export default ContactSection;
