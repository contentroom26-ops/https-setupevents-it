import { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const serviceKeys = ["corporate", "brand", "hostess", "pr", "location", "av"] as const;
const serviceLinks = [
  "/corporate-events",
  "/brand-activation",
  "/hostess-staff",
  "/public-relations",
  "/event-productions",
  "/event-productions",
];

const ease = [0.22, 1, 0.36, 1] as const;

const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navLinks = [
    { name: t("nav.about"), href: "#storia" },
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.portfolio"), href: "#portfolio" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
        style={{ WebkitBackdropFilter: isScrolled ? "blur(24px)" : undefined }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="container-custom flex items-center justify-between h-24 md:h-28 px-6 md:px-10">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setIsMobileMenuOpen(false); }}
            className="flex items-center flex-shrink-0"
          >
            <img
              src={logo}
              alt="SetupEvents"
              className="w-auto h-24 sm:h-28 md:h-40 -my-6 sm:-my-7 md:-my-12 drop-shadow-lg transition-all duration-500"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.name === t("nav.services") ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="px-5 py-3 text-[15px] font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-wide"
                  >
                    {link.name}
                  </button>

                  <AnimatePresence>
                    {showServices && (
                      <motion.div
                        className="absolute top-full left-1/2 pt-3"
                        style={{ x: "-50%" }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2, ease }}
                      >
                        <div className="w-[360px] bg-black/90 backdrop-blur-2xl border border-white/[0.1] rounded-xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)]">
                          <div className="px-4 pt-4 pb-1">
                            <p className="text-[9px] uppercase tracking-[0.4em] text-white/25 font-semibold">
                              {t("nav.ourServices")}
                            </p>
                          </div>
                          <div className="p-2">
                            {serviceKeys.map((key, i) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.03, duration: 0.2 }}
                              >
                                <Link
                                  to={serviceLinks[i]}
                                  className="group/item flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.06] transition-all duration-300"
                                  onClick={() => setShowServices(false)}
                                >
                                  <span className="text-white/20 text-[10px] font-mono w-5 group-hover/item:text-white/40 transition-colors">
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-medium text-white/70 group-hover/item:text-white transition-colors truncate">
                                      {t(`navServices.${key}.title`)}
                                    </p>
                                  </div>
                                  <ArrowRight className="w-3 h-3 text-white/0 group-hover/item:text-white/30 transition-all duration-300" />
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
                  className="px-5 py-3 text-[15px] font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-wide"
                >
                  {link.name}
                </button>
              )
            )}
            <LanguageSwitcher />
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white/70" />
              ) : (
                <Menu className="w-5 h-5 text-white/70" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] backdrop-blur-2xl flex flex-col lg:hidden"
            style={{ background: "hsl(var(--primary) / 0.85)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white hover:text-white/80 text-2xl font-display font-bold tracking-tight transition-colors drop-shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease }}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                className="w-8 h-px bg-white/30"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3 }}
              />
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="mt-2 border border-white/40 text-white hover:bg-white/10 px-8 py-3 font-medium text-xs rounded-lg uppercase tracking-[0.2em] transition-colors drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {t("nav.requestQuote")}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
