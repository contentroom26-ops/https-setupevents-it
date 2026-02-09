import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

// Scroll percentages that position the camera at each section
// Camera: z = 5 - progress * 75, so progress = (5 - z_target) / 75
const sectionScrollMap: Record<string, number> = {
  "#services": 0.52,   // z = -34
  "#portfolio": 0.68,  // z = -46
  "#contact": 0.93,    // z = -65
};

const navLinks = [
  { name: "Servizi", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contatti", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const progress = sectionScrollMap[href];
    if (progress !== undefined) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: progress * maxScroll, behavior: "smooth" });
    } else if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/60 backdrop-blur-md border-b border-white/10 py-4"
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollToSection("#"); }}
            className="font-display text-xl font-bold tracking-tight text-white"
          >
            GABRIELLESHI
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium tracking-wide uppercase transition-colors text-white/80 hover:text-white"
              >
                {link.name}
              </button>
            ))}
            <motion.button
              onClick={() => scrollToSection("#contact")}
              className="text-sm font-semibold tracking-wide uppercase px-6 py-3 transition-all duration-300 flex items-center gap-2 rounded-full bg-white text-black hover:bg-white/90"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Preventivo
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-1 flex flex-col items-start justify-center container-custom gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white text-4xl font-display font-bold tracking-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="mt-8 bg-white text-black px-8 py-4 font-semibold tracking-tight uppercase text-sm rounded-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
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
