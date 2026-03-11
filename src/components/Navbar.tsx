import { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const leftLinks = [
  { name: "Chi siamo", href: "#storia" },
  { name: "Servizi", href: "#services" },
];

const rightLinks = [
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

const NavItem = ({
  link,
  onScroll,
  onMouseEnter,
  onMouseLeave,
  showDropdown,
  onDropdownClose,
}: {
  link: { name: string; href: string };
  onScroll: (href: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  showDropdown?: boolean;
  onDropdownClose?: () => void;
}) => {
  if (link.name === "Servizi") {
    return (
      <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <button
          onClick={() => onScroll(link.href)}
          className="relative px-3 py-2 text-[11px] uppercase tracking-[0.25em] font-medium text-white/40 hover:text-white transition-all duration-500"
        >
          {link.name}
        </button>
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              className="absolute top-full left-1/2 pt-4"
              style={{ x: "-50%" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-[380px] bg-[hsl(var(--background))]/95 backdrop-blur-3xl border border-white/[0.05] rounded-xl overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)]">
                <div className="p-1.5">
                  {serviceItems.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                    >
                      <Link
                        to={item.link}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-all duration-300"
                        onClick={onDropdownClose}
                      >
                        <div className="w-6 h-6 rounded-md bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-primary/20 transition-all duration-300">
                          <span className="text-white/20 text-[9px] font-mono group-hover:text-primary/60 transition-colors duration-300">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-white/70 group-hover:text-white transition-colors duration-300">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-white/20 group-hover:text-white/35 transition-colors duration-300 truncate">
                            {item.desc}
                          </p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-white/0 group-hover:text-white/30 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <button
      onClick={() => onScroll(link.href)}
      className="relative px-3 py-2 text-[11px] uppercase tracking-[0.25em] font-medium text-white/40 hover:text-white transition-all duration-500"
    >
      {link.name}
    </button>
  );
};

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
            ? "bg-[hsl(var(--background))]/70 backdrop-blur-2xl border-b border-white/[0.03]"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          {/* Left links — desktop */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-end">
            {leftLinks.map((link) => (
              <NavItem
                key={link.name}
                link={link}
                onScroll={scrollToSection}
                onMouseEnter={link.name === "Servizi" ? handleMouseEnter : undefined}
                onMouseLeave={link.name === "Servizi" ? handleMouseLeave : undefined}
                showDropdown={link.name === "Servizi" ? showServices : undefined}
                onDropdownClose={() => setShowServices(false)}
              />
            ))}
          </div>

          {/* Center logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollToSection("#"); }}
            className="flex items-center mx-6 md:mx-10 relative"
          >
            <img
              src={logo}
              alt="SetupEvents"
              className={`w-auto drop-shadow-lg transition-all duration-500 ${
                isScrolled ? "h-16 md:h-24 -my-2 md:-my-4" : "h-20 md:h-28 -my-3 md:-my-6"
              }`}
            />
          </a>

          {/* Right links — desktop */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {rightLinks.map((link) => (
              <NavItem key={link.name} link={link} onScroll={scrollToSection} />
            ))}
            <div className="w-px h-4 bg-white/[0.06] mx-3" />
            <motion.button
              onClick={() => scrollToSection("#contact")}
              className="text-[10px] uppercase tracking-[0.2em] font-semibold px-5 py-2 rounded-full border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 flex items-center gap-2 transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Preventivo
              <ArrowUpRight className="w-3 h-3" />
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white/60" />
            ) : (
              <Menu className="w-5 h-5 text-white/60" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[hsl(var(--background))]/98 backdrop-blur-3xl flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              {[...leftLinks, ...rightLinks].map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white/60 hover:text-white text-2xl font-display font-bold tracking-tight transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                className="w-8 h-px bg-white/[0.06] mt-2"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.35 }}
              />
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="mt-2 border border-white/[0.08] text-white/50 px-8 py-3 font-medium text-xs rounded-full uppercase tracking-[0.2em]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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