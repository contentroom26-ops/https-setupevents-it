import { useState, useEffect, useRef } from "react";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
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
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className={`mt-3 md:mt-4 flex items-center justify-between rounded-2xl border transition-all duration-700 w-full max-w-6xl px-4 md:px-6 ${
            isScrolled
              ? "bg-white/80 border-black/[0.06] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
              : "bg-white/50 border-black/[0.04] backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
          }`}
          style={{
            height: isScrolled ? 60 : 72,
            WebkitBackdropFilter: isScrolled ? "blur(40px)" : "blur(24px)",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollToSection("#"); }}
            className="flex items-center flex-shrink-0"
          >
            <img
              src={logo}
              alt="SetupEvents"
              className={`w-auto min-w-[80px] transition-all duration-500 ${
                isScrolled ? "h-20 sm:h-24 md:h-32 -my-4 sm:-my-5 md:-my-8" : "h-24 sm:h-28 md:h-36 -my-6 sm:-my-7 md:-my-10"
              }`}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
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
                    className="group relative px-2 sm:px-3 md:px-4 py-2 text-[11px] md:text-[13px] uppercase tracking-[0.12em] md:tracking-[0.18em] font-medium text-foreground/50 hover:text-foreground transition-all duration-400"
                  >
                    {link.name}
                    <span className="absolute inset-0 rounded-xl bg-foreground/0 group-hover:bg-foreground/[0.04] transition-all duration-400" />
                  </button>

                  <AnimatePresence>
                    {showServices && (
                      <motion.div
                        className="absolute top-full left-1/2 pt-3"
                        style={{ x: "-50%" }}
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="w-[380px] bg-white/95 backdrop-blur-3xl border border-black/[0.08] rounded-2xl overflow-hidden shadow-[0_30px_80px_-10px_rgba(0,0,0,0.15)]">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                          <div className="px-4 pt-4 pb-1">
                            <p className="text-[9px] uppercase tracking-[0.4em] text-foreground/30 font-semibold">{t("nav.ourServices")}</p>
                          </div>
                          <div className="p-2">
                            {serviceKeys.map((key, i) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.2 }}
                              >
                                <Link
                                  to={serviceLinks[i]}
                                  className="group/item flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-foreground/[0.04] transition-all duration-300"
                                  onClick={() => setShowServices(false)}
                                >
                                  <div className="w-8 h-8 rounded-lg bg-foreground/[0.04] border border-border flex items-center justify-center flex-shrink-0 group-hover/item:border-primary/30 group-hover/item:bg-primary/[0.06] transition-all duration-300">
                                    <span className="text-foreground/30 text-[10px] font-mono group-hover/item:text-primary transition-colors duration-300">
                                      {String(i + 1).padStart(2, "0")}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-semibold text-foreground/80 group-hover/item:text-foreground transition-colors duration-300">
                                      {t(`navServices.${key}.title`)}
                                    </p>
                                    <p className="text-[11px] text-muted-foreground group-hover/item:text-foreground/60 transition-colors duration-300 truncate">
                                      {t(`navServices.${key}.desc`)}
                                    </p>
                                  </div>
                                  <ArrowRight className="w-3.5 h-3.5 text-foreground/10 group-hover/item:text-primary group-hover/item:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="group relative px-2 sm:px-3 md:px-4 py-2 text-[11px] md:text-[13px] uppercase tracking-[0.12em] md:tracking-[0.18em] font-medium text-foreground/50 hover:text-foreground transition-all duration-400"
                >
                  {link.name}
                  <span className="absolute inset-0 rounded-xl bg-foreground/0 group-hover:bg-foreground/[0.04] transition-all duration-400" />
                </button>
              )
            )}
            <LanguageSwitcher />
            <div className="w-px h-5 bg-border mx-2" />
            <motion.button
              onClick={() => scrollToSection("#contact")}
              className="text-[9px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.18em] font-semibold px-2.5 sm:px-3 md:px-5 py-1.5 sm:py-2 rounded-xl bg-foreground text-background border border-foreground/90 hover:bg-foreground/90 flex items-center gap-1 sm:gap-1.5 md:gap-2 transition-all duration-400 whitespace-nowrap flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="hidden sm:inline">{t("nav.quote")}</span>
              <span className="sm:hidden">{t("nav.quote")}</span>
              <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
            </motion.button>
          </div>

          {/* Mobile/Tablet: CTA + lang + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <motion.button
              onClick={() => scrollToSection("#contact")}
              className="text-[9px] uppercase tracking-[0.12em] font-semibold px-3 py-1.5 rounded-xl bg-primary text-primary-foreground flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
              whileTap={{ scale: 0.95 }}
            >
              {t("nav.quote")}
              <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
            </motion.button>
            <LanguageSwitcher />
            <button
              className="p-2 rounded-xl hover:bg-foreground/[0.05] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground/60" />
              ) : (
                <Menu className="w-5 h-5 text-foreground/60" />
              )}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground/60 hover:text-foreground text-2xl font-display font-bold tracking-tight transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                className="w-8 h-px bg-border"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.35 }}
              />
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="mt-2 bg-foreground text-background px-8 py-3 font-medium text-xs rounded-xl uppercase tracking-[0.2em]"
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
