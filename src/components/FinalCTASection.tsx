import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-32 md:py-40 bg-black/5 text-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="number-label block mb-6 text-background/50">[08] — Contattaci</span>
          
          <h2 className="heading-display mb-8">
            PRONTO A<br />
            <span className="italic font-normal">STUPIRE?</span>
          </h2>
          
          <p className="text-background/60 text-lg md:text-xl mb-12 max-w-xl mx-auto">
            Raccontaci la tua visione. Insieme creeremo qualcosa di straordinario.
          </p>
          
          <motion.button
            onClick={scrollToContact}
            className="bg-background text-foreground px-10 py-5 font-semibold tracking-tight transition-all duration-200 uppercase text-sm inline-flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Inizia il progetto
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
