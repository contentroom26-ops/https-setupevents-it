import { motion } from "framer-motion";
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">Gabrielleshi Events</h3>
            <p className="text-white/60 leading-relaxed mb-6">
              Creiamo esperienze memorabili per brand ambiziosi. 
              Dalla visione all'applauso finale.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium text-lg mb-4">Servizi</h4>
            <ul className="space-y-3 text-white/60">
              <li><a href="#services" className="hover:text-primary transition-colors">Corporate Events</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Brand Activations</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Event Production</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Hostess & Staff</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Experience Design</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">Link Utili</h4>
            <ul className="space-y-3 text-white/60">
              <li><a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contatti</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contatti</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@gabrielleshievents.it" className="hover:text-primary transition-colors">
                  info@gabrielleshievents.it
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+393XXXXXXXXX" className="hover:text-primary transition-colors">
                  +39 3XX XXX XXXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Milano, Italia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Gabrielleshi Events. Tutti i diritti riservati.</p>
          <p>P.IVA: XXXXXXXXXXX</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
