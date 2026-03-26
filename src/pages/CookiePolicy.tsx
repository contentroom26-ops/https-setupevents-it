import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container-custom py-20 md:py-32">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Torna alla home
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tighter mb-8">Cookie Policy</h1>
          <div className="prose prose-invert max-w-3xl">
            <a
              href="https://www.iubenda.com/privacy-policy/23010991/cookie-policy"
              className="iubenda-white iubenda-noiframe iubenda-embed"
              title="Cookie Policy"
            >
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
