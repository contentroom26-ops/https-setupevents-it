import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.4,
      },
    }),
  };

  return (
    <footer className="bg-foreground text-background py-20" ref={ref}>
      <div className="container-custom">
        {/* Top Section */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16 pb-16 border-b border-background/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="max-w-md"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-display text-3xl font-bold tracking-tight mb-4">
              GABRIELLESHI
            </h3>
            <p className="text-background/60 leading-relaxed">
              Creiamo esperienze memorabili per brand ambiziosi. 
              Dalla visione all'applauso finale.
            </p>
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-background/60 hover:text-background transition-colors text-sm uppercase tracking-widest group"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -2 }}
          >
            Torna su
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Servizi</h4>
            <ul className="space-y-3 text-background/60">
              {["Corporate Events", "Brand Activations", "Event Production", "Hostess & Staff"].map((item, i) => (
                <motion.li 
                  key={item}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <a href="#services" className="hover:text-background transition-colors hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Link</h4>
            <ul className="space-y-3 text-background/60">
              {[
                { name: "Portfolio", href: "#portfolio" },
                { name: "Contatti", href: "#contact" },
                { name: "Privacy Policy", href: "#" },
                { name: "Cookie Policy", href: "#" },
              ].map((item, i) => (
                <motion.li 
                  key={item.name}
                  custom={i + 4}
                  variants={linkVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <a href={item.href} className="hover:text-background transition-colors">
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Contatti</h4>
            <ul className="space-y-4 text-background/60">
              <motion.li 
                className="flex items-center gap-3"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="w-4 h-4" />
                <a href="mailto:info@setupevents.it" className="hover:text-background transition-colors">
                  info@setupevents.it
                </a>
              </motion.li>
              <motion.li 
                className="flex items-center gap-3"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="w-4 h-4" />
                <a href="tel:+393284163053" className="hover:text-background transition-colors">
                  +39 328 416 3053
                </a>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Firenze, Italia</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Social</h4>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/gabrielleshi_events/" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
               ].map((social, i) => (
                <motion.a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-all"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-background/40 text-sm pt-8 border-t border-background/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p>© {new Date().getFullYear()} Gabrielleshi Events</p>
          <p>P.IVA: 07386270487</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
