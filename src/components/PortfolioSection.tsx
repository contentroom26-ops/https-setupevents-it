import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import event5 from "@/assets/event-5.jpg";
import event6 from "@/assets/event-6.jpg";

const portfolio = [
  {
    image: event1,
    title: "Fashion Show",
    client: "Diesel",
    category: "Brand Activation",
  },
  {
    image: event2,
    title: "Product Launch",
    client: "Tech Brand",
    category: "Corporate Event",
  },
  {
    image: event3,
    title: "Gala Dinner",
    client: "Mediolanum",
    category: "Corporate Event",
  },
  {
    image: event4,
    title: "Annual Conference",
    client: "Private",
    category: "Event Production",
  },
  {
    image: event5,
    title: "Luxury Event",
    client: "Private",
    category: "Experience Design",
  },
  {
    image: event6,
    title: "Trade Show",
    client: "Various",
    category: "Hostess & Staff",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="section-padding bg-secondary" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="number-label block mb-4">[05] — Portfolio</span>
            <h2 className="heading-section">
              EVENTI<br />
              <span className="italic font-normal">RECENTI</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.map((item, index) => (
            <motion.div
              key={item.title}
              className="relative group cursor-pointer overflow-hidden bg-foreground"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-white/60 text-xs uppercase tracking-widest block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-white text-xl font-display font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <span className="text-white/80 text-sm">{item.client}</span>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-white" />
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
