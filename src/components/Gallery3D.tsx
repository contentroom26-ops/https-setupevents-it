import { useState, useCallback, Suspense } from "react";
import GalleryFrame from "./GalleryFrame3D";

// Import all gallery images
import diesel1 from "@/assets/diesel-1.jpg";
import diesel2 from "@/assets/diesel-2.jpg";
import diesel3 from "@/assets/diesel-3.jpg";
import diesel4 from "@/assets/diesel-4.jpg";
import diesel5 from "@/assets/diesel-5.jpg";
import diesel6 from "@/assets/diesel-6.jpg";
import diesel7 from "@/assets/diesel-7.jpg";
import diesel8 from "@/assets/diesel-8.jpg";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import event5 from "@/assets/event-5.jpg";
import event6 from "@/assets/event-6.jpg";

interface GalleryItem {
  imageUrl: string;
  title: string;
  category: string;
  position: [number, number, number];
  side: "left" | "right";
}

// Gallery items positioned floating above the runway sides
const galleryItems: GalleryItem[] = [
  // Left side floating frames - above the audience
  { imageUrl: diesel1, title: "Diesel Event", category: "Brand Activation", position: [-6.5, 4, -25], side: "left" },
  { imageUrl: event1, title: "Fashion Night", category: "Luxury Event", position: [-6.5, 4, -50], side: "left" },
  { imageUrl: diesel3, title: "Store Opening", category: "Brand Activation", position: [-6.5, 4, -75], side: "left" },
  { imageUrl: event3, title: "VIP Gala", category: "Corporate Event", position: [-6.5, 4, -100], side: "left" },
  { imageUrl: diesel5, title: "Collection Preview", category: "Fashion Event", position: [-6.5, 4, -125], side: "left" },
  { imageUrl: event5, title: "Product Launch", category: "Press Event", position: [-6.5, 4, -150], side: "left" },
  
  // Right side floating frames
  { imageUrl: diesel2, title: "VIP Experience", category: "Fashion Event", position: [6.5, 4, -37], side: "right" },
  { imageUrl: event2, title: "Art Exhibition", category: "Cultural Event", position: [6.5, 4, -62], side: "right" },
  { imageUrl: diesel4, title: "Flagship Launch", category: "Store Event", position: [6.5, 4, -87], side: "right" },
  { imageUrl: event4, title: "Cocktail Party", category: "Private Event", position: [6.5, 4, -112], side: "right" },
  { imageUrl: diesel6, title: "Party Night", category: "Brand Activation", position: [6.5, 4, -137], side: "right" },
  { imageUrl: event6, title: "Gala Dinner", category: "Corporate Event", position: [6.5, 4, -162], side: "right" },
];

interface Gallery3DProps {
  onFrameSelect?: (index: number | null) => void;
  selectedFrame: number | null;
}

const Gallery3D = ({ onFrameSelect, selectedFrame }: Gallery3DProps) => {
  const handleSelect = useCallback((index: number) => {
    if (selectedFrame === index) {
      onFrameSelect?.(null);
    } else {
      onFrameSelect?.(index);
    }
  }, [selectedFrame, onFrameSelect]);

  return (
    <Suspense fallback={null}>
      {galleryItems.map((item, index) => (
        <GalleryFrame
          key={index}
          position={item.position}
          imageUrl={item.imageUrl}
          title={item.title}
          category={item.category}
          side={item.side}
          isSelected={selectedFrame === index}
          onSelect={() => handleSelect(index)}
        />
      ))}
    </Suspense>
  );
};

export default Gallery3D;