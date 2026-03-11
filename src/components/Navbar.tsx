import { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Chi siamo", href: "#storia" },
  { name: "Servizi", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contatti", href: "#contact" },
];

const serviceItems = [
  { title: "Corporate Events", desc: "Meeting, convention e team building", link: "/corporate-events" },
  { title: "Brand Activations", desc: "Lanci prodotto ed esperienze immersive", link: "/brand-activation" },
  { title: "Hostess & Staff", desc: "Personale selezionato per ogni evento", link: "/hostess-staff" },
  { title: "Public Relations", desc: "Gestione relazioni e guest management", link: "/public-relations" },
  { title: "Location & Set-up", desc: "Scouting e allestimenti scenografici", link: "/event-productions" },
  { title: "Audio & Video", desc: "Produzione tecnica AV professionale", link: "/event-productions" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
    setShowServices(false);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setShowServices(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setShowServices(false), 200);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-2xl border-b border-white/[0.04]"
            : "bg-gradient-to-b from-black/40 to-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollToSection("#"); }}
            className="flex items-center"
          >
            <img
              src={logo}
              alt="SetupEvents"
              className={`w-auto drop-shadow-lg transition-all duration-500 ${
                isScrolled ? "h-20 md:h-28 -my-4 md:-my-6" : "h-24 md:h-32 -my-5 md:-my-8"
              }`}
            />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.name === "Servizi" ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="relative px-4 py-2 text-[13px] uppercase tracking-[0.15em] font-medium text-white/50 hover:text-white transition-all duration-300 group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary group-hover:w-3/4 transition-all duration-500" />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {showServices && (
                      <motion.div
                        className="absolute top-full left-1/2 pt-5"
                        style={{ x: "-50%" }}
                        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="w-[400px] bg-background/90 backdrop-blur-3xl border border-white/[0.06] rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
                          {/* Header accent */}
                          <div className="px-5 pt-4 pb-2">
                            <p className="text-[9px] uppercase tracking-[0.4em] text-white/25 font-medium">I nostri servizi</p>
                          </div>
                          <div className="px-2 pb-2">
                            {serviceItems.map((item, i) => (
                              <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              >
                                <Link
                                  to={item.link}
                                  className="group flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
                                  onClick={() => setShowServices(false)}
                                >
                                  {/* Hover glow */}
                                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-primary/[0.03] to-transparent" />
                                  
                                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 group-hover:bg-primary/[0.06] transition-all duration-300">
                                    <span className="text-white/30 text-[10px] font-mono group-hover:text-primary transition-colors duration-300">
                                      {String(i + 1).padStart(2, "0")}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-semibold text-white/80 group-hover:text-white transition-colors duration-300 tracking-wide">
                                      {item.title}
                                    </p>
                                    <p className="text-[11px] text-white/25 group-hover:text-white/40 transition-colors duration-300 truncate">
                                      {item.desc}
                                    </p>
                                  </div>
                                  <ArrowRight className="w-3 h-3 text-white/10 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="relative px-4 py-2 text-[13px] uppercase tracking-[0.15em] font-medium text-white/50 hover:text-white transition-all duration-300 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary group-hover:w-3/4 transition-all duration-500" />
                </button>
              )
            )}
            <div className="w-px h-5 bg-white/10 mx-3" />
            <motion.button
              onClick={() => scrollToSection("#contact")}
              className="text-[12px] uppercase tracking-[0.15em] font-semibold px-5 py-2 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.04] flex items-center gap-2 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Preventivo
              <ArrowUpRight className="w-3 h-3" />
            </motion.button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white/70" />
            ) : (
              <Menu className="w-5 h-5 text-white/70" />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex-1 flex flex-col items-start justify-center container-custom gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white/80 hover:text-white text-3xl font-display font-extrabold tracking-tight transition-colors"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                className="w-12 h-px bg-white/10 mt-2"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.4 }}
              />
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="mt-2 border border-white/15 text-white/70 px-8 py-3.5 font-semibold text-sm rounded-full uppercase tracking-[0.15em]"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Richiedi preventivo
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;