import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";
import Gallery3D from "./Gallery3D";

// Industrial Metal Truss Component
const MetalTruss = ({ position, length }: { position: [number, number, number]; length: number }) => {
  const trussHeight = 2;
  const trussWidth = 0.15;
  
  return (
    <group position={position}>
      {/* Main horizontal beams */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[trussWidth, trussWidth, length]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.8} />
      </mesh>
      <mesh position={[0, trussHeight, 0]}>
        <boxGeometry args={[trussWidth, trussWidth, length]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.8} />
      </mesh>
      
      {/* Diagonal cross braces */}
      {Array.from({ length: Math.floor(length / 4) }, (_, i) => (
        <group key={i} position={[0, trussHeight / 2, -length / 2 + 2 + i * 4]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.08, trussHeight * 1.5, 0.08]} />
            <meshStandardMaterial color="#0d0d0d" roughness={0.7} metalness={0.9} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.08, trussHeight * 1.5, 0.08]} />
            <meshStandardMaterial color="#0d0d0d" roughness={0.7} metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Ceiling Truss Structure
const CeilingTrussStructure = ({ corridorLength }: { corridorLength: number }) => {
  const roofHeight = 12;
  const roofWidth = 20;
  
  return (
    <group>
      {/* Main roof trusses - A-frame style */}
      {Array.from({ length: 15 }, (_, i) => (
        <group key={i} position={[0, roofHeight - 2, -10 - i * 12]}>
          {/* Left angled beam */}
          <mesh position={[-roofWidth / 4, 1.5, 0]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[0.2, 7, 0.2]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.5} metalness={0.9} />
          </mesh>
          {/* Right angled beam */}
          <mesh position={[roofWidth / 4, 1.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <boxGeometry args={[0.2, 7, 0.2]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.5} metalness={0.9} />
          </mesh>
          {/* Cross beam */}
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[roofWidth * 0.8, 0.15, 0.15]} />
            <meshStandardMaterial color="#0d0d0d" roughness={0.6} metalness={0.8} />
          </mesh>
        </group>
      ))}
      
      {/* Longitudinal trusses along ceiling */}
      <MetalTruss position={[-6, 10, -corridorLength / 2]} length={corridorLength} />
      <MetalTruss position={[6, 10, -corridorLength / 2]} length={corridorLength} />
      <MetalTruss position={[-3, 11, -corridorLength / 2]} length={corridorLength} />
      <MetalTruss position={[3, 11, -corridorLength / 2]} length={corridorLength} />
    </group>
  );
};

// Central Runway Spotlight Row
const RunwaySpotlights = ({ corridorLength }: { corridorLength: number }) => {
  const spotlightCount = 30;
  
  return (
    <group>
      {Array.from({ length: spotlightCount }, (_, i) => {
        const z = -5 - i * (corridorLength / spotlightCount);
        return (
          <group key={i} position={[0, 11, z]}>
            {/* Spotlight fixture */}
            <mesh>
              <cylinderGeometry args={[0.3, 0.4, 0.5, 8]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.9} />
            </mesh>
            {/* Light cone effect */}
            <mesh position={[0, -0.4, 0]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshBasicMaterial color="#fffaf0" />
            </mesh>
            {/* Actual spotlight */}
            <spotLight
              position={[0, -0.5, 0]}
              angle={0.4}
              penumbra={0.8}
              intensity={3}
              color="#fffaf0"
              distance={15}
              target-position={[0, 0, z]}
            />
          </group>
        );
      })}
    </group>
  );
};

// Gold Edge Light Strips
const GoldLightStrips = ({ corridorLength }: { corridorLength: number }) => {
  return (
    <group>
      {/* Left gold strip */}
      <mesh position={[-3.2, 0.05, -corridorLength / 2]}>
        <boxGeometry args={[0.15, 0.08, corridorLength + 20]} />
        <meshBasicMaterial color="#daa520" />
      </mesh>
      {/* Right gold strip */}
      <mesh position={[3.2, 0.05, -corridorLength / 2]}>
        <boxGeometry args={[0.15, 0.08, corridorLength + 20]} />
        <meshBasicMaterial color="#daa520" />
      </mesh>
      
      {/* Point lights along the strips for glow effect */}
      {Array.from({ length: 20 }, (_, i) => (
        <group key={i}>
          <pointLight
            position={[-3.2, 0.3, -10 - i * 8]}
            intensity={0.5}
            distance={8}
            color="#daa520"
          />
          <pointLight
            position={[3.2, 0.3, -10 - i * 8]}
            intensity={0.5}
            distance={8}
            color="#daa520"
          />
        </group>
      ))}
    </group>
  );
};

// Industrial Pillars
const IndustrialPillars = ({ corridorLength }: { corridorLength: number }) => {
  const pillarCount = 12;
  
  return (
    <group>
      {Array.from({ length: pillarCount }, (_, i) => {
        const z = -15 - i * 12;
        return (
          <group key={i}>
            {/* Left pillar */}
            <mesh position={[-8, 5, z]}>
              <boxGeometry args={[0.4, 10, 0.4]} />
              <meshStandardMaterial color="#0d0d0d" roughness={0.7} metalness={0.6} />
            </mesh>
            {/* Right pillar */}
            <mesh position={[8, 5, z]}>
              <boxGeometry args={[0.4, 10, 0.4]} />
              <meshStandardMaterial color="#0d0d0d" roughness={0.7} metalness={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Audience Seating silhouettes on the sides
const AudienceSeating = ({ corridorLength }: { corridorLength: number }) => {
  return (
    <group>
      {Array.from({ length: 20 }, (_, i) => {
        const z = -12 - i * 8;
        return (
          <group key={i}>
            {/* Left side seating blocks */}
            <mesh position={[-5, 0.5, z]}>
              <boxGeometry args={[2, 1, 1.5]} />
              <meshStandardMaterial color="#050505" roughness={0.9} />
            </mesh>
            {/* Right side seating blocks */}
            <mesh position={[5, 0.5, z]}>
              <boxGeometry args={[2, 1, 1.5]} />
              <meshStandardMaterial color="#050505" roughness={0.9} />
            </mesh>
          </group>
        );
      })}
    </group>
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

  useFrame((_, delta) => {
    const progress = scrollProgress.current;
    const endZ = -corridorLength + 30;
    targetZ.current = THREE.MathUtils.lerp(targetZ.current, 8 + (endZ - 8) * progress, delta * 3);
    
    camera.position.z = targetZ.current;
    camera.position.y = 2;
    camera.position.x = 0;
    camera.lookAt(0, 2, camera.position.z - 25);
  });

  return (
    <group>
      {/* Very dark ambient - industrial atmosphere */}
      <ambientLight intensity={0.15} color="#1a1a1a" />
      
      {/* Dramatic volumetric fog */}
      <fog attach="fog" args={["#000000", 30, 120]} />

      {/* Central runway floor - dark concrete */}
      <mesh position={[0, 0, -corridorLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6.5, corridorLength + 20]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.85} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Side floor areas - even darker */}
      <mesh position={[-6, -0.01, -corridorLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, corridorLength + 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>
      <mesh position={[6, -0.01, -corridorLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, corridorLength + 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>

      {/* Gold edge light strips */}
      <GoldLightStrips corridorLength={corridorLength} />
      
      {/* Runway spotlights along ceiling */}
      <RunwaySpotlights corridorLength={corridorLength} />
      
      {/* Industrial ceiling truss structure */}
      <CeilingTrussStructure corridorLength={corridorLength} />
      
      {/* Side pillars */}
      <IndustrialPillars corridorLength={corridorLength} />
      
      {/* Audience seating silhouettes */}
      <AudienceSeating corridorLength={corridorLength} />
      
      {/* Ceiling - dark industrial */}
      <mesh position={[0, 13, -corridorLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, corridorLength + 20]} />
        <meshStandardMaterial color="#050505" roughness={0.95} />
      </mesh>
      
      {/* Far end bright light - vanishing point glow */}
      <pointLight 
        position={[0, 2, -corridorLength]} 
        intensity={8} 
        color="#fffaf0" 
        distance={80} 
      />
      <mesh position={[0, 3, -corridorLength - 5]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
      
      {/* Atmospheric haze effect - subtle planes */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh 
          key={i} 
          position={[0, 4, -30 - i * 18]} 
          rotation={[0, 0, 0]}
        >
          <planeGeometry args={[20, 8]} />
          <meshBasicMaterial 
            color="#1a1a1a" 
            transparent 
            opacity={0.1} 
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* 3D Gallery - Interactive art pieces floating on sides */}
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

  const handleCanvasClick = () => {
    if (selectedFrame !== null) {
      setSelectedFrame(null);
    }
  };

  return (
    <div className="fixed inset-0 z-0 bg-black">
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
          <p className="text-white/40 text-sm font-display tracking-widest uppercase animate-pulse">
            Scorri per percorrere la passerella • Clicca sulle opere
          </p>
        </div>
      )}
      
      {/* Close button when frame is selected */}
      {selectedFrame !== null && (
        <button
          onClick={() => setSelectedFrame(null)}
          className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-black transition-colors"
        >
          <span className="text-2xl font-light">×</span>
        </button>
      )}
    </div>
  );
};

// Add missing import
import { useState } from "react";

export default ImmersiveRoom;
