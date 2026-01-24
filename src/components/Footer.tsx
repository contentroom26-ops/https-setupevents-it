import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-20">
      <div className="container-custom">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16 pb-16 border-b border-background/10">
          <div className="max-w-md">
            <h3 className="font-display text-3xl font-bold tracking-tight mb-4">
              GABRIELLESHI
            </h3>
            <p className="text-background/60 leading-relaxed">
              Creiamo esperienze memorabili per brand ambiziosi. 
              Dalla visione all'applauso finale.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-background/60 hover:text-background transition-colors text-sm uppercase tracking-widest"
          >
            Torna su
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Servizi</h4>
            <ul className="space-y-3 text-background/60">
              <li><a href="#services" className="hover:text-background transition-colors">Corporate Events</a></li>
              <li><a href="#services" className="hover:text-background transition-colors">Brand Activations</a></li>
              <li><a href="#services" className="hover:text-background transition-colors">Event Production</a></li>
              <li><a href="#services" className="hover:text-background transition-colors">Hostess & Staff</a></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Link</h4>
            <ul className="space-y-3 text-background/60">
              <li><a href="#portfolio" className="hover:text-background transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-background transition-colors">Contatti</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Contatti</h4>
            <ul className="space-y-4 text-background/60">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@gabrielleshievents.it" className="hover:text-background transition-colors">
                  info@gabrielleshievents.it
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <a href="tel:+393XXXXXXXXX" className="hover:text-background transition-colors">
                  +39 3XX XXX XXXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Milano, Italia</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Social</h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-background/40 text-sm pt-8 border-t border-background/10">
          <p>© {new Date().getFullYear()} Gabrielleshi Events</p>
          <p>P.IVA: XXXXXXXXXXX</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
