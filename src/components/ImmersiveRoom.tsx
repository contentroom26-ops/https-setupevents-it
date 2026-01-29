import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";
import Gallery3D from "./Gallery3D";

// Animated Door component
const AnimatedDoor = ({ 
  position, 
  scrollProgress,
  isLeft 
}: { 
  position: [number, number, number]; 
  scrollProgress: React.MutableRefObject<number>;
  isLeft: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const doorWidth = 2.8;
  const doorHeight = 6;

  useFrame(() => {
    if (meshRef.current) {
      // Door starts opening at 85% scroll progress
      const doorProgress = Math.max(0, (scrollProgress.current - 0.85) / 0.15);
      const maxRotation = Math.PI / 2.2;
      const targetRotation = isLeft ? doorProgress * maxRotation : -doorProgress * maxRotation;
      
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation,
        0.1
      );
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position}
    >
      <boxGeometry args={[doorWidth, doorHeight, 0.15]} />
      <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.7} />
    </mesh>
  );
};

interface RoomProps {
  scrollProgress: React.MutableRefObject<number>;
  selectedFrame: number | null;
  onFrameSelect: (index: number | null) => void;
}

const Room = ({ scrollProgress, selectedFrame, onFrameSelect }: RoomProps) => {
  const { camera } = useThree();
  const targetZ = useRef(8);

  const corridorLength = 180;
  const roomWidth = 12;
  const roomHeight = 7;
  const doorZ = -corridorLength + 8;

  const archways = useMemo(() => 
    Array.from({ length: 10 }, (_, i) => ({ z: -15 - i * 16 })), 
  []);

  useFrame((_, delta) => {
    const progress = scrollProgress.current;
    const endZ = -corridorLength + 30;
    targetZ.current = THREE.MathUtils.lerp(targetZ.current, 8 + (endZ - 8) * progress, delta * 3);
    
    camera.position.z = targetZ.current;
    camera.position.y = 2;
    camera.position.x = 0;
    camera.lookAt(0, 2, camera.position.z - 20);
  });

  return (
    <group>
      {/* Brighter ambient light */}
      <ambientLight intensity={0.8} color="#ffffff" />
      
      {/* Multiple point lights along corridor for dramatic lighting */}
      <pointLight position={[0, roomHeight - 1, -10]} intensity={1.5} distance={60} color="#ffffff" />
      <pointLight position={[0, roomHeight - 1, -30]} intensity={1.5} distance={60} color="#ffffff" />
      <pointLight position={[0, roomHeight - 1, -50]} intensity={1.5} distance={60} color="#ffffff" />
      <pointLight position={[0, roomHeight - 1, -70]} intensity={1.2} distance={60} color="#ffffff" />
      <pointLight position={[0, roomHeight - 1, -90]} intensity={1.2} distance={60} color="#ffffff" />
      <pointLight position={[0, roomHeight - 1, -110]} intensity={1} distance={60} color="#ffffff" />
      <pointLight position={[0, roomHeight - 1, -130]} intensity={1} distance={60} color="#ffffff" />
      <pointLight position={[0, roomHeight - 1, -150]} intensity={0.8} distance={60} color="#ffffff" />
      
      {/* Side wall accent lights */}
      <pointLight position={[-4, 3, -25]} intensity={0.8} distance={30} color="#ffffff" />
      <pointLight position={[4, 3, -25]} intensity={0.8} distance={30} color="#ffffff" />
      <pointLight position={[-4, 3, -55]} intensity={0.8} distance={30} color="#ffffff" />
      <pointLight position={[4, 3, -55]} intensity={0.8} distance={30} color="#ffffff" />
      <pointLight position={[-4, 3, -85]} intensity={0.8} distance={30} color="#ffffff" />
      <pointLight position={[4, 3, -85]} intensity={0.8} distance={30} color="#ffffff" />
      <pointLight position={[-4, 3, -115]} intensity={0.8} distance={30} color="#ffffff" />
      <pointLight position={[4, 3, -115]} intensity={0.8} distance={30} color="#ffffff" />
      
      {/* Spotlight from front */}
      <spotLight
        position={[0, roomHeight, 10]}
        angle={0.8}
        penumbra={0.5}
        intensity={2}
        color="#ffffff"
        distance={200}
      />

      <fog attach="fog" args={["#ffffff", 80, 250]} />

      {/* Floor - white marble with black grid */}
      <mesh position={[0, -0.1, -corridorLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth + 2, corridorLength + 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Floor grid lines - black for contrast */}
      {Array.from({ length: 25 }, (_, i) => (
        <mesh key={`grid-${i}`} position={[0, 0.01, -5 - i * 7]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roomWidth, 0.08]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
      ))}
      
      {/* Vertical floor lines */}
      {[-4, -2, 0, 2, 4].map((x, i) => (
        <mesh key={`vgrid-${i}`} position={[x, 0.01, -corridorLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.04, corridorLength]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
      ))}

      {/* Ceiling - pure white */}
      <mesh position={[0, roomHeight, -corridorLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth + 2, corridorLength + 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* Walls - SOLID white boxes (visible from both sides) */}
      <mesh position={[-roomWidth / 2 - 0.1, roomHeight / 2, -corridorLength / 2]}>
        <boxGeometry args={[0.2, roomHeight, corridorLength + 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[roomWidth / 2 + 0.1, roomHeight / 2, -corridorLength / 2]}>
        <boxGeometry args={[0.2, roomHeight, corridorLength + 20]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Wall panels - white with black trim */}
      {Array.from({ length: 12 }, (_, i) => (
        <group key={`panel-${i}`}>
          {/* Left wall panel */}
          <mesh position={[-roomWidth / 2 + 0.02, roomHeight / 2, -15 - i * 14]}>
            <boxGeometry args={[0.05, roomHeight - 1, 10]} />
            <meshStandardMaterial color="#fafafa" roughness={0.4} />
          </mesh>
          {/* Right wall panel */}
          <mesh position={[roomWidth / 2 - 0.02, roomHeight / 2, -15 - i * 14]}>
            <boxGeometry args={[0.05, roomHeight - 1, 10]} />
            <meshStandardMaterial color="#fafafa" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Archways - dark for contrast */}
      {archways.map((arch, i) => (
        <group key={i} position={[0, 0, arch.z]}>
          {/* Left pillar */}
          <mesh position={[-roomWidth / 2 + 0.3, roomHeight / 2, 0]}>
            <boxGeometry args={[0.6, roomHeight, 0.5]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
          </mesh>
          {/* Right pillar */}
          <mesh position={[roomWidth / 2 - 0.3, roomHeight / 2, 0]}>
            <boxGeometry args={[0.6, roomHeight, 0.5]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
          </mesh>
          {/* Top beam */}
          <mesh position={[0, roomHeight - 0.2, 0]}>
            <boxGeometry args={[roomWidth, 0.4, 0.5]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
          </mesh>
          {/* Floor accent line */}
          <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[roomWidth, 0.15]} />
            <meshBasicMaterial color="#c0c0c0" />
          </mesh>
        </group>
      ))}

      {/* Ceiling light strips - subtle */}
      {Array.from({ length: 12 }, (_, i) => (
        <group key={`light-${i}`} position={[0, roomHeight - 0.05, -15 - i * 14]}>
          <mesh>
            <boxGeometry args={[3, 0.08, 0.4]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
        </group>
      ))}

      {/* Wall accent lights - dark lines */}
      {Array.from({ length: 8 }, (_, i) => (
        <group key={`wall-light-${i}`}>
          <mesh position={[-roomWidth / 2 + 0.1, roomHeight / 2, -25 - i * 20]}>
            <planeGeometry args={[0.05, 3]} />
            <meshBasicMaterial color="#1a1a1a" transparent opacity={0.6} />
          </mesh>
          <mesh position={[roomWidth / 2 - 0.1, roomHeight / 2, -25 - i * 20]}>
            <planeGeometry args={[0.05, 3]} />
            <meshBasicMaterial color="#1a1a1a" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Door Frame at end */}
      <group position={[0, 0, doorZ]}>
        {/* Door frame - grand entrance style */}
        <mesh position={[-3.2, roomHeight / 2, 0]}>
          <boxGeometry args={[0.4, roomHeight, 0.3]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[3.2, roomHeight / 2, 0]}>
          <boxGeometry args={[0.4, roomHeight, 0.3]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, roomHeight - 0.2, 0]}>
          <boxGeometry args={[6.8, 0.4, 0.3]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Decorative arch above door */}
        <mesh position={[0, roomHeight + 0.3, 0]}>
          <boxGeometry args={[7.5, 0.6, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
        </mesh>
      </group>

      {/* Animated Double Doors */}
      <group position={[0, 0, doorZ]}>
        {/* Left door - pivot from left edge */}
        <group position={[-1.4, 0, 0]}>
          <AnimatedDoor 
            position={[-1.4, 3, 0]} 
            scrollProgress={scrollProgress}
            isLeft={true}
          />
        </group>
        {/* Right door - pivot from right edge */}
        <group position={[1.4, 0, 0]}>
          <AnimatedDoor 
            position={[1.4, 3, 0]} 
            scrollProgress={scrollProgress}
            isLeft={false}
          />
        </group>
      </group>

      {/* Glowing light behind door - visible when open */}
      <pointLight 
        position={[0, roomHeight / 2, doorZ - 5]} 
        intensity={2} 
        color="#ffffff" 
        distance={40} 
      />
      
      {/* Bright room behind door */}
      <mesh position={[0, roomHeight / 2, doorZ - 10]}>
        <planeGeometry args={[20, roomHeight + 4]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* 3D Gallery - Interactive art pieces on walls */}
      <Gallery3D 
        selectedFrame={selectedFrame} 
        onFrameSelect={onFrameSelect} 
      />
    </group>
  );
};

const ImmersiveRoom = () => {
  const scrollProgressRef = useRef(0);
  const { scrollYProgress } = useScroll();
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);
  
  scrollYProgress.on("change", (value) => {
    scrollProgressRef.current = value;
  });

  // Close selected frame when clicking outside
  const handleCanvasClick = () => {
    if (selectedFrame !== null) {
      setSelectedFrame(null);
    }
  };

  return (
    <div className="fixed inset-0 z-0 bg-[#f8f8f8]">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 65 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        frameloop="always"
        onPointerMissed={handleCanvasClick}
      >
        <Room 
          scrollProgress={scrollProgressRef} 
          selectedFrame={selectedFrame}
          onFrameSelect={setSelectedFrame}
        />
      </Canvas>
      
      {/* Instruction hint */}
      {selectedFrame === null && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <p className="text-foreground/40 text-sm font-display tracking-widest uppercase animate-pulse">
            Passa sulle opere per esplorarle • Clicca per ingrandire
          </p>
        </div>
      )}
      
      {/* Close button when frame is selected */}
      {selectedFrame !== null && (
        <button
          onClick={() => setSelectedFrame(null)}
          className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors"
        >
          <span className="text-2xl font-light">×</span>
        </button>
      )}
    </div>
  );
};

export default ImmersiveRoom;
