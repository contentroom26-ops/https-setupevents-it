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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              className={`w-auto drop-shadow-lg transition-all duration-300 ${
                isScrolled ? "h-20 md:h-28 -my-4 md:-my-6" : "h-24 md:h-32 -my-5 md:-my-8"
              }`}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
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
                    className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isScrolled
                        ? "text-foreground/60 hover:text-foreground"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {showServices && (
                      <motion.div
                        className="absolute top-full left-1/2 pt-4"
                        style={{ x: "-50%" }}
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="w-[420px] bg-background/95 backdrop-blur-2xl border border-border rounded-2xl p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
                          {serviceItems.map((item, i) => (
                            <motion.div
                              key={item.title}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <Link
                                to={item.link}
                                className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/[0.06] transition-colors duration-200"
                                onClick={() => setShowServices(false)}
                              >
                                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors">
                                  <span className="text-primary text-[10px] font-bold font-mono">
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-foreground/40 group-hover:text-foreground/55 transition-colors truncate">
                                    {item.desc}
                                  </p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isScrolled
                      ? "text-foreground/60 hover:text-foreground"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                </button>
              )
            )}
            <motion.button
              onClick={() => scrollToSection("#contact")}
              className="text-sm font-bold px-6 py-2.5 rounded-full bg-white text-background flex items-center gap-2 hover:brightness-110 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Preventivo
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex flex-col md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex-1 flex flex-col items-start justify-center container-custom gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground text-4xl font-display font-extrabold tracking-tight"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="mt-6 bg-white text-background px-8 py-4 font-bold text-sm rounded-full"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
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