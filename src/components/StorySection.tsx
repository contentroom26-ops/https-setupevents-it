import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="storia" className="py-24 md:py-32 bg-black/40 backdrop-blur-[2px]" ref={ref}>
      <div className="container-custom">
        <div className="max-w-3xl">
          <motion.div initial={{
          opacity: 0,
          x: -60
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.8,
          ease: "easeOut"
        }}>
            <motion.span className="text-sm text-white/50 uppercase tracking-widest block mb-4" initial={{
            opacity: 0,
            y: 20
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
              La nostra storia
            </motion.span>

            <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-white" initial={{
            opacity: 0,
            y: 30
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              Dall'intrattenimento<br />
              <span className="italic font-normal">all'eccellenza</span>
            </motion.h2>

            <motion.div className="space-y-6 text-white/70 leading-relaxed" initial={{
            opacity: 0,
            y: 30
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.6,
            delay: 0.3
          }}>
              <p className="text-lg">Setup Events è una realtà specializzata nella progettazione e organizzazione di eventi su misura a Firenze. Grazie a una solida esperienza nel mondo dell'intrattenimento e a una profonda conoscenza del territorio, creiamo esperienze pensate per valorizzare brand, location e pubblico di riferimento. 
Operiamo nel settore corporate, nei lanci prodotto e negli eventi esclusivi, curando ogni dettaglio con un approccio strategico, creativo e professionale. Non realizziamo semplici eventi, ma esperienze che lasciano il segno.</p>
            </motion.div>

            <motion.div className="mt-10 flex items-center gap-6" initial={{
            opacity: 0,
            y: 20
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.5,
            delay: 0.5
          }}>
              <div className="w-16 h-px bg-white/50" />
              <span className="text-sm uppercase tracking-widest text-white/50">
                Gabriel Lleshi, Founder
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default StorySection;
