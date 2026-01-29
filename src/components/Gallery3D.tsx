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

// Gallery items positioned along the corridor walls
const galleryItems: GalleryItem[] = [
  // Left wall pieces
  { imageUrl: diesel1, title: "Diesel Event", category: "Brand Activation", position: [-5.7, 3, -25], side: "left" },
  { imageUrl: event1, title: "Fashion Night", category: "Luxury Event", position: [-5.7, 3, -45], side: "left" },
  { imageUrl: diesel3, title: "Store Opening", category: "Brand Activation", position: [-5.7, 3, -65], side: "left" },
  { imageUrl: event3, title: "VIP Gala", category: "Corporate Event", position: [-5.7, 3, -85], side: "left" },
  { imageUrl: diesel5, title: "Collection Preview", category: "Fashion Event", position: [-5.7, 3, -105], side: "left" },
  { imageUrl: event5, title: "Product Launch", category: "Press Event", position: [-5.7, 3, -125], side: "left" },
  { imageUrl: diesel7, title: "Fashion Night", category: "Experience Design", position: [-5.7, 3, -145], side: "left" },
  
  // Right wall pieces
  { imageUrl: diesel2, title: "VIP Experience", category: "Fashion Event", position: [5.7, 3, -35], side: "right" },
  { imageUrl: event2, title: "Art Exhibition", category: "Cultural Event", position: [5.7, 3, -55], side: "right" },
  { imageUrl: diesel4, title: "Flagship Launch", category: "Store Event", position: [5.7, 3, -75], side: "right" },
  { imageUrl: event4, title: "Cocktail Party", category: "Private Event", position: [5.7, 3, -95], side: "right" },
  { imageUrl: diesel6, title: "Party Night", category: "Brand Activation", position: [5.7, 3, -115], side: "right" },
  { imageUrl: event6, title: "Gala Dinner", category: "Corporate Event", position: [5.7, 3, -135], side: "right" },
  { imageUrl: diesel8, title: "Shopping Experience", category: "Retail Event", position: [5.7, 3, -155], side: "right" },
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