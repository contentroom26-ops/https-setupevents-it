import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";

interface GalleryFrameProps {
  position: [number, number, number];
  imageUrl: string;
  title: string;
  category: string;
  size?: [number, number];
  onSelect?: () => void;
  isSelected?: boolean;
  side: "left" | "right";
}

const GalleryFrame = ({
  position,
  imageUrl,
  title,
  category,
  size = [2.5, 3.2],
  onSelect,
  isSelected,
  side,
}: GalleryFrameProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { camera, size: viewportSize } = useThree();
  
  // Load texture
  const texture = useLoader(TextureLoader, imageUrl);
  
  // Ensure texture looks sharp
  useMemo(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  // Calculate target position when selected (move to center of view)
  const baseRotation = side === "left" ? Math.PI / 2 : -Math.PI / 2;
  
  useFrame(() => {
    if (!groupRef.current) return;
    
    const targetScale = isSelected ? 1.8 : hovered ? 1.15 : 1;
    const targetRotationY = isSelected ? 0 : baseRotation;
    
    // Get camera Z position to calculate where to bring the frame
    const cameraZ = camera.position.z;
    
    // Target position when selected - bring in front of camera
    const targetX = isSelected ? 0 : position[0];
    const targetY = isSelected ? 2.5 : position[1];
    const targetZ = isSelected ? cameraZ - 4 : position[2];
    
    // Smooth lerp
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
    
    groupRef.current.position.lerp(
      new THREE.Vector3(targetX, targetY, targetZ),
      isSelected ? 0.08 : 0.15
    );
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.1
    );
  });

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onSelect?.();
  };

  const frameDepth = 0.08;
  const borderWidth = 0.12;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, baseRotation, 0]}
    >
      {/* Frame border - dark elegant */}
      <mesh position={[0, 0, -frameDepth / 2]}>
        <boxGeometry args={[size[0] + borderWidth * 2, size[1] + borderWidth * 2, frameDepth]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Inner mat - white */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[size[0] + 0.1, size[1] + 0.1]} />
        <meshBasicMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Image */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={size} />
        <meshBasicMaterial map={texture} />
      </mesh>
      
      {/* Hover/Selected glow effect */}
      {(hovered || isSelected) && (
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[size[0] + 0.8, size[1] + 0.8]} />
          <meshBasicMaterial 
            color={isSelected ? "#ffffff" : "#e0e0e0"} 
            transparent 
            opacity={isSelected ? 0.4 : 0.2} 
          />
        </mesh>
      )}
      
      {/* Title label when hovered or selected */}
      {(hovered || isSelected) && (
        <Html
          position={[0, -(size[1] / 2) - 0.4, 0.1]}
          center
          style={{
            transition: "opacity 0.3s",
            opacity: 1,
            pointerEvents: "none",
          }}
        >
          <div className="text-center bg-background/90 px-4 py-2 rounded-sm border border-border backdrop-blur-sm whitespace-nowrap">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">{category}</p>
            <p className="text-sm font-display font-bold text-foreground">{title}</p>
          </div>
        </Html>
      )}
      
      {/* Invisible interaction plane */}
      <mesh 
        position={[0, 0, 0.05]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <planeGeometry args={[size[0] + borderWidth * 2, size[1] + borderWidth * 2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};

export default GalleryFrame;