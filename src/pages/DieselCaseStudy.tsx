import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SideAccent from "@/components/SideAccent";

import diesel1 from "@/assets/diesel-1.jpg";
import diesel2 from "@/assets/diesel-2.jpg";
import diesel3 from "@/assets/diesel-3.jpg";
import diesel4 from "@/assets/diesel-4.jpg";
import dieselCard from "@/assets/diesel-card.jpg";
import dieselEvent1 from "@/assets/diesel-event-1.jpg";
import dieselEvent2 from "@/assets/diesel-event-2.jpg";
import dieselEvent3 from "@/assets/diesel-event-3.jpg";
import dieselEvent4 from "@/assets/diesel-event-4.jpg";
import dieselEvent5 from "@/assets/diesel-event-5.jpg";
import dieselEvent6 from "@/assets/diesel-event-6.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const galleryImages = [dieselEvent1, dieselEvent2, dieselEvent3, dieselEvent4, dieselEvent5, dieselEvent6];

const DieselCaseStudy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SideAccent />

      {/* Hero with marble-style dark bg */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Dark textured background */}
        <div className="absolute inset-0 bg-background">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url(${dieselCard})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(100%) contrast(1.2)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        {/* Back button */}
        <motion.button
          onClick={() => navigate("/#portfolio")}
          className="fixed top-24 right-6 md:right-12 z-40 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-[0.2em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ArrowLeft size={14} />
          Indietro
        </motion.button>

        <div className="relative z-10 container-custom pt-28 md:pt-40 pb-16 md:pb-24">
          {/* Section label */}
          <motion.div
            className="flex items-center gap-3 mb-8 md:mb-12 ml-6 md:ml-14 lg:ml-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="text-[10px] md:text-xs font-mono text-white/40">[Case Study]</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-medium">
              Brand Activation
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-display font-extrabold tracking-tighter text-white leading-[0.95] mb-4 ml-6 md:ml-14 lg:ml-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            DIESEL
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl font-display text-white/50 tracking-tight mb-16 md:mb-24 ml-6 md:ml-14 lg:ml-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            Fashion Night Event
          </motion.p>

          {/* Asymmetric photo grid — matching PDF layout */}
          <div className="relative ml-6 md:ml-14 lg:ml-16">
            <div className="grid grid-cols-12 gap-3 md:gap-5">
              {/* Top row */}
              <motion.div
                className="col-span-5 md:col-span-3 aspect-square rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
              >
                <img src={diesel1} alt="Diesel event" className="w-full h-full object-cover" loading="lazy" />
              </motion.div>

              <motion.div
                className="col-span-7 md:col-span-4 aspect-[4/5] rounded-lg overflow-hidden -mt-0 md:-mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease }}
              >
                <img src={diesel2} alt="Diesel event" className="w-full h-full object-cover" loading="lazy" />
              </motion.div>

              {/* Description text — right side */}
              <motion.div
                className="col-span-12 md:col-span-5 flex flex-col justify-end md:pl-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease }}
              >
                <div className="hidden md:block">
                  <img
                    src={diesel3}
                    alt="Diesel event"
                    className="w-full aspect-[16/10] object-cover rounded-lg mb-8"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Bottom row */}
              <motion.div
                className="col-span-6 md:col-span-4 aspect-square rounded-lg overflow-hidden md:-mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease }}
              >
                <img src={diesel4} alt="Diesel event" className="w-full h-full object-cover" loading="lazy" />
              </motion.div>

              <motion.div
                className="col-span-6 md:col-span-3 aspect-[4/5] rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease }}
              >
                <img src={dieselCard} alt="Diesel event" className="w-full h-full object-cover" loading="lazy" />
              </motion.div>

              {/* Description block */}
              <motion.div
                className="col-span-12 md:col-span-5 md:pl-8 flex items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease }}
              >
                <div>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed text-justify">
                    An exclusive event organized for Diesel at the Florence store. The event was designed to engage an audience aligned with the brand's positioning and enhance its identity. We handled public relations, overseeing guest selection and management. We provided professional hostesses, selected to match the requested image and style. Additionally, we coordinated the audio-visual service, ensuring timely technical support and a seamless execution of the entire evening.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional gallery */}
      <section className="py-16 md:py-28 relative grain">
        <div className="container-custom ml-auto mr-auto">
          <motion.h2
            className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight mb-10 md:mb-16 ml-6 md:ml-14 lg:ml-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            Gallery
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 ml-6 md:ml-14 lg:ml-16">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                className="aspect-[3/4] rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <img
                  src={img}
                  alt={`Diesel gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DieselCaseStudy;
