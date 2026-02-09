import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-accent text-accent-foreground pt-20 pb-8 relative">
      <div className="container-custom">
        {/* Top */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16 pb-16 border-b border-accent-foreground/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="max-w-md">
            <h3 className="font-display text-2xl font-extrabold tracking-tight mb-4">
              SETUP<span className="text-primary">EVENTS</span>
            </h3>
            <p className="text-accent-foreground/50 leading-relaxed">
              Creiamo esperienze memorabili per brand ambiziosi.
              Dalla visione all'applauso finale.
            </p>
          </div>

          <motion.button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-accent-foreground/50 hover:text-accent-foreground transition-colors text-sm uppercase tracking-[0.2em] font-medium group"
            whileHover={{ y: -2 }}
          >
            Torna su
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-6 text-accent-foreground/80">Servizi</h4>
            <ul className="space-y-3 text-accent-foreground/40">
              {["Corporate Events", "Brand Activations", "Event Production", "Hostess & Staff", "Public Relations"].map((item) => (
                <li key={item}>
                  <a href="#services" className="hover:text-primary transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-6 text-accent-foreground/80">Link</h4>
            <ul className="space-y-3 text-accent-foreground/40">
              {[
                { name: "Portfolio", href: "#portfolio" },
                { name: "Contatti", href: "#contact" },
                { name: "Privacy Policy", href: "#" },
                { name: "Cookie Policy", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-primary transition-colors text-sm">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-6 text-accent-foreground/80">Contatti</h4>
            <ul className="space-y-4 text-accent-foreground/40 text-sm">
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
            <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] mb-6 text-accent-foreground/80">Social</h4>
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
                  className="w-10 h-10 rounded-full border border-accent-foreground/10 flex items-center justify-center text-accent-foreground/40 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
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

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-accent-foreground/25 text-xs pt-8 border-t border-accent-foreground/5">
          <p>© {new Date().getFullYear()} SetupEvents by Gabriel Lleshi</p>
          <p>P.IVA: 07386270487</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
