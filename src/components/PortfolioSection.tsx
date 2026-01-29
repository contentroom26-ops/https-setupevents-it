import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import diesel1 from "@/assets/diesel-1.jpg";
import diesel2 from "@/assets/diesel-2.jpg";
import diesel3 from "@/assets/diesel-3.jpg";
import diesel4 from "@/assets/diesel-4.jpg";
import diesel5 from "@/assets/diesel-5.jpg";
import diesel6 from "@/assets/diesel-6.jpg";
import diesel7 from "@/assets/diesel-7.jpg";
import diesel8 from "@/assets/diesel-8.jpg";

const portfolio = [
  {
    image: diesel1,
    title: "Diesel Event",
    client: "Diesel",
    category: "Brand Activation",
  },
  {
    image: diesel2,
    title: "VIP Experience",
    client: "Diesel",
    category: "Fashion Event",
  },
  {
    image: diesel3,
    title: "Store Opening",
    client: "Diesel",
    category: "Brand Activation",
  },
  {
    image: diesel4,
    title: "Flagship Launch",
    client: "Diesel",
    category: "Store Event",
  },
  {
    image: diesel5,
    title: "Collection Preview",
    client: "Diesel",
    category: "Fashion Event",
  },
  {
    image: diesel6,
    title: "Party Night",
    client: "Diesel",
    category: "Brand Activation",
  },
  {
    image: diesel7,
    title: "Fashion Night",
    client: "Diesel",
    category: "Experience Design",
  },
  {
    image: diesel8,
    title: "Shopping Experience",
    client: "Diesel",
    category: "Retail Event",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="section-padding bg-black/15" ref={ref}>
      <div className="container-custom">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="number-label text-white/60 block mb-4">[06] — Portfolio</span>
            <h2 className="heading-section text-white">
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
