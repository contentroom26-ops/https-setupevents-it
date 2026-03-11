import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
            ? "bg-background/90 backdrop-blur-xl border-b border-border py-2"
            : "bg-transparent py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-custom flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollToSection("#"); }}
          >
            <img src={logo} alt="SetupEvents" className="h-[6.5rem] md:h-[9rem] w-auto drop-shadow-lg transition-all duration-300" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
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
            ))}
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
