import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { name: "Chi siamo", href: "#storia" },
  { name: "Servizi", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contatti", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="container-custom flex items-center justify-between h-14 md:h-16">
          {/* Left — empty on desktop for balance, CTA on scroll */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isScrolled
                    ? "text-foreground/50 hover:text-foreground"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Center — logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#");
            }}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <img
              src={logo}
              alt="SetupEvents"
              className={`w-auto drop-shadow-lg transition-all duration-300 ${
                isScrolled ? "h-16 md:h-20 -my-2 md:-my-4" : "h-20 md:h-24 -my-4 md:-my-5"
              }`}
            />
          </a>

          {/* Right — CTA + hamburger */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => scrollToSection("#contact")}
              className={`hidden md:flex text-[11px] font-bold uppercase tracking-[0.1em] px-5 py-2 rounded-full items-center gap-1.5 transition-all duration-300 ${
                isScrolled
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-white text-background hover:bg-white/90"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Preventivo
              <ArrowUpRight className="w-3 h-3" />
            </motion.button>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`w-5 h-5 ${isScrolled ? "text-foreground" : "text-white"}`} />
              ) : (
                <Menu className={`w-5 h-5 ${isScrolled ? "text-foreground" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex flex-col md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="flex-1 flex flex-col items-start justify-center container-custom gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground text-4xl font-display font-extrabold tracking-tight"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, ease }}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="mt-6 bg-foreground text-background px-8 py-4 font-bold text-sm rounded-full"
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
