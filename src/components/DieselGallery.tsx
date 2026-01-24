import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";

import diesel1 from "@/assets/diesel-1.jpg";
import diesel2 from "@/assets/diesel-2.jpg";
import diesel3 from "@/assets/diesel-3.jpg";
import diesel4 from "@/assets/diesel-4.jpg";
import diesel5 from "@/assets/diesel-5.jpg";
import diesel6 from "@/assets/diesel-6.jpg";
import diesel7 from "@/assets/diesel-7.jpg";

const images = [
  { src: diesel1, title: "Party Vibes", category: "People" },
  { src: diesel2, title: "Fashion Duo", category: "People" },
  { src: diesel3, title: "Store Opening", category: "People" },
  { src: diesel4, title: "Entrance", category: "Venue" },
  { src: diesel5, title: "Grand Opening", category: "Venue" },
  { src: diesel6, title: "Collection", category: "Product" },
  { src: diesel7, title: "Accessories", category: "Product" },
];

interface ImageCardProps {
  image: typeof images[0];
  index: number;
  className?: string;
  onSelect: () => void;
}

const ImageCard = ({ image, index, className, onSelect }: ImageCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden cursor-pointer group ${className}`}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
    >
      {/* Image */}
      <motion.img
        src={image.src}
        alt={image.title}
        className="w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      />
      
      {/* Gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isHovered ? 0.9 : 0.3 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Category tag */}
      <motion.div
        className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-white text-xs uppercase tracking-wider font-medium">
          {image.category}
        </span>
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-end justify-between">
          <div>
            <motion.span 
              className="text-white/60 text-sm block mb-1"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              0{index + 1}
            </motion.span>
            <motion.h3 
              className="text-white text-xl font-semibold"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              {image.title}
            </motion.h3>
          </div>
          <motion.div
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: isHovered ? 1 : 0, rotate: isHovered ? 0 : -45 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ArrowUpRight className="w-5 h-5 text-black" />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Decorative corner lines */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-0 right-0 w-full h-px bg-white/50" />
        <div className="absolute top-0 right-0 w-px h-full bg-white/50" />
      </motion.div>
    </motion.div>
  );
};

const DieselGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="number-label text-white/40 block mb-4">[GALLERY]</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="heading-lg text-white">
              DIESEL<br />
              <span className="italic font-normal text-white/60">Store Opening</span>
            </h2>
            <p className="text-white/50 max-w-md text-lg">
              Momenti catturati durante l'inaugurazione esclusiva del nuovo flagship store Diesel.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Large featured image */}
          <ImageCard 
            image={images[0]} 
            index={0} 
            className="col-span-12 md:col-span-7 h-[400px] md:h-[600px] rounded-2xl"
            onSelect={() => setSelectedImage(0)}
          />
          
          {/* Stacked column */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
            <ImageCard 
              image={images[1]} 
              index={1} 
              className="h-[280px] md:h-[290px] rounded-2xl"
              onSelect={() => setSelectedImage(1)}
            />
            <ImageCard 
              image={images[2]} 
              index={2} 
              className="h-[280px] md:h-[290px] rounded-2xl"
              onSelect={() => setSelectedImage(2)}
            />
          </div>
          
          {/* Three column row */}
          <ImageCard 
            image={images[3]} 
            index={3} 
            className="col-span-12 md:col-span-4 h-[300px] rounded-2xl"
            onSelect={() => setSelectedImage(3)}
          />
          <ImageCard 
            image={images[4]} 
            index={4} 
            className="col-span-12 md:col-span-4 h-[300px] rounded-2xl"
            onSelect={() => setSelectedImage(4)}
          />
          <ImageCard 
            image={images[5]} 
            index={5} 
            className="col-span-12 md:col-span-4 h-[300px] rounded-2xl"
            onSelect={() => setSelectedImage(5)}
          />
          
          {/* Full width closing image */}
          <ImageCard 
            image={images[6]} 
            index={6} 
            className="col-span-12 h-[350px] md:h-[450px] rounded-2xl"
            onSelect={() => setSelectedImage(6)}
          />
        </div>

        {/* Stats row */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { value: "500+", label: "Guests" },
            { value: "7", label: "Hours" },
            { value: "1", label: "Night" },
            { value: "∞", label: "Memories" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-white block mb-2">
                {stat.value}
              </span>
              <span className="text-white/40 uppercase tracking-wider text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
          
          <motion.img
            src={images[selectedImage].src}
            alt={images[selectedImage].title}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            onClick={(e) => e.stopPropagation()}
          />
          
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white/40 text-sm block mb-1">
              {selectedImage + 1} / {images.length}
            </span>
            <h3 className="text-white text-xl font-semibold">
              {images[selectedImage].title}
            </h3>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default DieselGallery;
