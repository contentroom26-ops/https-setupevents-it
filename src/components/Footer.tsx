import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ease = [0.22, 1, 0.36, 1] as const;

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-background text-foreground pt-12 pb-8 relative border-t border-border">
      <div className="container-custom">
        {/* Torna su */}
        <div className="flex justify-end mb-10">
          <motion.button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-[0.2em] font-medium group"
            whileHover={{ y: -2 }}
          >
            Torna su
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10">
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-6 text-foreground/80">Servizi</h4>
            <ul className="space-y-3 text-muted-foreground">
              {[
                { name: "Corporate Events", href: "/corporate-events" },
                { name: "Brand Activation", href: "/brand-activation" },
                { name: "Event Productions", href: "/event-productions" },
                { name: "Hostess & Staff", href: "/hostess-staff" },
                { name: "Public Relations", href: "/public-relations" },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-primary transition-colors text-sm">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-6 text-foreground/80">Link</h4>
            <ul className="space-y-3 text-muted-foreground">
              {[
                { name: "Portfolio", href: "#portfolio" },
                { name: "Contatti", href: "#contact" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Cookie Policy", href: "/cookie-policy" },
              ].map((item) => (
                <li key={item.name}>
                  {item.href.startsWith("/") ? (
                    <Link to={item.href} className="hover:text-primary transition-colors text-sm">{item.name}</Link>
                  ) : (
                    <a href={item.href} className="hover:text-primary transition-colors text-sm">{item.name}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-6 text-foreground/80">Contatti</h4>
            <ul className="space-y-4 text-muted-foreground text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@setupevents.it" className="hover:text-primary transition-colors">info@setupevents.it</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+393284163053" className="hover:text-primary transition-colors">+39 328 416 3053</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Firenze, Italia</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-6 text-foreground/80">Social</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/gabrielleshi_events/" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Lavora con noi */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pb-8 border-b border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-sm text-muted-foreground">Vuoi lavorare con noi come hostess o staff per eventi?</p>
          <motion.a
            href="mailto:hostess@setupevents.it?subject=Candidatura%20Hostess%20-%20Lavora%20con%20noi"
            className="group inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-6 py-3.5 rounded-full font-semibold text-sm border border-border hover:border-primary/50 transition-colors duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-4 h-4 text-primary" />
            Lavora con noi come Hostess
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-xs pt-8 border-t border-border">
          <p>© {new Date().getFullYear()} SetupEvents by Gabriel Lleshi</p>
          <p>P.IVA: 07386270487</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
