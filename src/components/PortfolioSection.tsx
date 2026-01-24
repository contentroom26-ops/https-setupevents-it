import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import event5 from "@/assets/event-5.jpg";
import event6 from "@/assets/event-6.jpg";

const portfolio = [
  {
    image: event1,
    title: "Fashion Show Diesel",
    category: "Brand Activation",
    span: "row-span-2",
  },
  {
    image: event2,
    title: "Product Launch",
    category: "Corporate Event",
    span: "",
  },
  {
    image: event3,
    title: "Gala Dinner Mediolanum",
    category: "Corporate Event",
    span: "",
  },
  {
    image: event4,
    title: "Annual Conference",
    category: "Event Production",
    span: "",
  },
  {
    image: event5,
    title: "Private Luxury Event",
    category: "Experience Design",
    span: "row-span-2",
  },
  {
    image: event6,
    title: "Trade Show Activation",
    category: "Hostess & Staff",
    span: "",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">
            Portfolio
          </span>
          <h2 className="heading-section mb-6">
            I nostri <span className="italic">eventi recenti</span>
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Ogni progetto racconta una storia di eccellenza, creatività e attenzione ai dettagli.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {portfolio.map((item, index) => (
            <motion.div
              key={item.title}
              className={`relative group overflow-hidden rounded-lg cursor-pointer ${item.span}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`relative overflow-hidden ${item.span ? 'h-full min-h-[400px]' : 'aspect-[4/3]'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-primary text-sm font-medium tracking-wider uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-serif font-medium mt-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
