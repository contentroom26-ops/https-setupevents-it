import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const FinalCTASection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-32 md:py-40 bg-background/50 text-foreground" ref={ref}>
      <div className="container-custom">
        <motion.div className="text-center max-w-4xl mx-auto" initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="number-label block mb-6 text-foreground/50">{t("finalCta.label")}</span>
          <h2 className="heading-display mb-8">
            {t("finalCta.heading")}<br />
            <span className="italic font-normal">{t("finalCta.headingSub")}</span>
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl mb-12 max-w-xl mx-auto">{t("finalCta.description")}</p>
          <motion.button onClick={scrollToContact} className="bg-foreground text-background px-10 py-5 font-semibold tracking-tight transition-all duration-200 uppercase text-sm inline-flex items-center gap-3 group rounded-full" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            {t("finalCta.cta")}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
