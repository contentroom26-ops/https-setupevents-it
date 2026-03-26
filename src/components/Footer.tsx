import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ease = [0.22, 1, 0.36, 1] as const;

const Footer = () => {
  const { t } = useTranslation();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-background text-foreground pt-16 pb-10 relative border-t border-border">
      <div className="container-custom">
        <div className="flex justify-end mb-14">
          <motion.button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 text-sm uppercase tracking-[0.2em] font-medium group"
            whileHover={{ y: -3 }}
          >
            {t("footer.backToTop")}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-14 mb-14">
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-7 text-foreground/70">{t("footer.services")}</h4>
            <ul className="space-y-3.5 text-muted-foreground">
              {[
                { name: "Corporate Events", href: "/corporate-events" },
                { name: "Brand Activation", href: "/brand-activation" },
                { name: "Event Productions", href: "/event-productions" },
                { name: "Hostess & Staff", href: "/hostess-staff" },
                { name: "Public Relations", href: "/public-relations" },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-primary transition-colors duration-300 text-sm inline-block hover:translate-x-1 transform transition-transform">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-7 text-foreground/70">{t("footer.links")}</h4>
            <ul className="space-y-3.5 text-muted-foreground">
              {[
                { name: t("footer.portfolio"), href: "#portfolio" },
                { name: t("footer.contactLink"), href: "#contact" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Cookie Policy", href: "/cookie-policy" },
                { name: "Termini e Condizioni", href: "/termini-condizioni" },
              ].map((item) => (
                <li key={item.name}>
                  {item.href.startsWith("/") ? (
                    <Link to={item.href} className="hover:text-primary transition-colors duration-300 text-sm inline-block hover:translate-x-1 transform transition-transform">{item.name}</Link>
                  ) : (
                    <a href={item.href} className="hover:text-primary transition-colors duration-300 text-sm inline-block hover:translate-x-1 transform transition-transform">{item.name}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-7 text-foreground/70">{t("footer.contacts")}</h4>
            <ul className="space-y-4.5 text-muted-foreground text-sm">
              <li className="flex items-center gap-3 group">
                <Mail className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                <a href="mailto:info@setupevents.it" className="hover:text-primary transition-colors duration-300">info@setupevents.it</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                <a href="tel:+393284163053" className="hover:text-primary transition-colors duration-300">+39 328 416 3053</a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                <span>Firenze, Italia</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-7 text-foreground/70">{t("footer.social")}</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/gabrielleshi_events/" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/feed/" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-14 pb-10 border-b border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-sm text-muted-foreground">{t("footer.workWithUs")}</p>
          <motion.a
            href="mailto:hostess@setupevents.it?subject=Candidatura%20Hostess%20-%20Lavora%20con%20noi"
            className="group inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-7 py-4 rounded-full font-semibold text-sm border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)]"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-4 h-4 text-primary" />
            {t("footer.workCta")}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground/60 text-xs pt-8">
          <p>© {new Date().getFullYear()} SetupEvents by Gabriel Lleshi</p>
          <p>P.IVA: 07386270487</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
