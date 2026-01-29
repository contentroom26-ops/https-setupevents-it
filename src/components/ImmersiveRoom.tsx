import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

// Architectural room/corridor component
const Room = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Room dimensions
  const roomWidth = 12;
  const roomHeight = 8;
  const corridorLength = 200;

  // Create architectural elements
  const archways = useMemo(() => {
    const arches = [];
    for (let i = 0; i < 15; i++) {
      arches.push({
        z: -15 - i * 12,
        width: roomWidth - 1,
        height: roomHeight - 0.5,
      });
    }
    return arches;
  }, []);

  useFrame(() => {
    const progress = scrollProgress.current;
    
    // Camera moves through the corridor
    const startZ = 8;
    const endZ = -corridorLength + 20;
    camera.position.z = startZ + (endZ - startZ) * progress;
    
    // Subtle breathing movement
    camera.position.y = 1.6 + Math.sin(progress * Math.PI * 4) * 0.15;
    camera.position.x = Math.sin(progress * Math.PI * 2) * 0.3;
    
    // Look straight ahead
    camera.lookAt(
      camera.position.x * 0.5, 
      1.6, 
      camera.position.z - 15
    );

    // Very subtle room sway
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(progress * Math.PI) * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.15} />
      
      {/* Main light from above */}
      <pointLight position={[0, roomHeight - 1, -50]} intensity={0.8} color="#ffffff" distance={100} />
      <pointLight position={[0, roomHeight - 1, -100]} intensity={0.6} color="#ffffff" distance={100} />
      <pointLight position={[0, roomHeight - 1, -150]} intensity={0.4} color="#ffffff" distance={100} />
      
      {/* Spotlight effect */}
      <spotLight
        position={[0, roomHeight, 5]}
        angle={0.6}
        penumbra={0.8}
        intensity={1}
        color="#ffffff"
        target-position={[0, 0, -20]}
      />

      {/* Fog for depth */}
      <fog attach="fog" args={["#0a0a0a", 15, 120]} />

      {/* === FLOOR === */}
      <mesh position={[0, 0, -corridorLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, corridorLength]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Floor grid lines */}
      {[...Array(30)].map((_, i) => (
        <mesh key={`floor-line-${i}`} position={[0, 0.01, -5 - i * 7]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roomWidth, 0.02]} />
          <meshBasicMaterial color="#2a2a2a" />
        </mesh>
      ))}

      {/* === CEILING === */}
      <mesh position={[0, roomHeight, -corridorLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, corridorLength]} />
        <meshStandardMaterial 
          color="#0d0d0d" 
          roughness={0.9}
        />
      </mesh>

      {/* === LEFT WALL === */}
      <mesh position={[-roomWidth / 2, roomHeight / 2, -corridorLength / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[corridorLength, roomHeight]} />
        <meshStandardMaterial 
          color="#151515" 
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* === RIGHT WALL === */}
      <mesh position={[roomWidth / 2, roomHeight / 2, -corridorLength / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[corridorLength, roomHeight]} />
        <meshStandardMaterial 
          color="#151515" 
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* === ARCHWAYS / FRAMES === */}
      {archways.map((arch, index) => (
        <group key={`arch-${index}`} position={[0, 0, arch.z]}>
          {/* Left pillar */}
          <mesh position={[-roomWidth / 2 + 0.3, roomHeight / 2, 0]}>
            <boxGeometry args={[0.6, roomHeight, 0.4]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
          </mesh>
          
          {/* Right pillar */}
          <mesh position={[roomWidth / 2 - 0.3, roomHeight / 2, 0]}>
            <boxGeometry args={[0.6, roomHeight, 0.4]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
          </mesh>
          
          {/* Top beam */}
          <mesh position={[0, roomHeight - 0.2, 0]}>
            <boxGeometry args={[roomWidth, 0.4, 0.4]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
          </mesh>

          {/* Floor edge accent */}
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[roomWidth, 0.1]} />
            <meshBasicMaterial color="#333333" />
          </mesh>
        </group>
      ))}

      {/* === WALL PANELS === */}
      {[...Array(12)].map((_, i) => (
        <group key={`panel-${i}`}>
          {/* Left wall panels */}
          <mesh position={[-roomWidth / 2 + 0.02, roomHeight / 2, -20 - i * 15]}>
            <boxGeometry args={[0.05, roomHeight - 2, 8]} />
            <meshStandardMaterial color="#1f1f1f" roughness={0.6} />
          </mesh>
          
          {/* Right wall panels */}
          <mesh position={[roomWidth / 2 - 0.02, roomHeight / 2, -20 - i * 15]}>
            <boxGeometry args={[0.05, roomHeight - 2, 8]} />
            <meshStandardMaterial color="#1f1f1f" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* === CEILING LIGHTS === */}
      {[...Array(20)].map((_, i) => (
        <group key={`light-${i}`} position={[0, roomHeight - 0.1, -10 - i * 10]}>
          {/* Light fixture */}
          <mesh>
            <boxGeometry args={[2, 0.1, 0.5]} />
            <meshBasicMaterial color="#333333" />
          </mesh>
          {/* Light glow */}
          <mesh position={[0, -0.1, 0]}>
            <planeGeometry args={[1.8, 0.3]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
          {/* Point light for actual illumination */}
          <pointLight 
            position={[0, -0.5, 0]} 
            intensity={0.2} 
            color="#ffffff" 
            distance={15}
          />
        </group>
      ))}

      {/* === DECORATIVE ELEMENTS === */}
      {/* Vertical accent lines on walls */}
      {[...Array(25)].map((_, i) => (
        <group key={`accent-${i}`}>
          <mesh position={[-roomWidth / 2 + 0.01, roomHeight / 2, -8 - i * 8]}>
            <boxGeometry args={[0.02, roomHeight, 0.02]} />
            <meshBasicMaterial color="#2a2a2a" />
          </mesh>
          <mesh position={[roomWidth / 2 - 0.01, roomHeight / 2, -8 - i * 8]}>
            <boxGeometry args={[0.02, roomHeight, 0.02]} />
            <meshBasicMaterial color="#2a2a2a" />
          </mesh>
        </group>
      ))}

      {/* === END OF CORRIDOR - Focal point === */}
      <group position={[0, 0, -corridorLength + 10]}>
        {/* Back wall */}
        <mesh position={[0, roomHeight / 2, 0]}>
          <planeGeometry args={[roomWidth, roomHeight]} />
          <meshStandardMaterial color="#0d0d0d" roughness={0.9} />
        </mesh>
        
        {/* Decorative frame on back wall */}
        <mesh position={[0, roomHeight / 2, 0.1]}>
          <boxGeometry args={[6, 5, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
        </mesh>
        
        {/* Subtle glow at the end */}
        <pointLight position={[0, roomHeight / 2, 2]} intensity={0.5} color="#ffffff" distance={20} />
      </group>

      {/* === AMBIENT DUST PARTICLES (static) === */}
      {[...Array(50)].map((_, i) => (
        <mesh
          key={`dust-${i}`}
          position={[
            (Math.random() - 0.5) * roomWidth * 0.8,
            Math.random() * roomHeight * 0.8 + 1,
            -Math.random() * 150
          ]}
        >
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
};

const ImmersiveRoom = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  
  const { scrollYProgress } = useScroll();
  
  // Update scroll progress ref
  scrollYProgress.on("change", (value) => {
    scrollProgressRef.current = value;
  });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ background: "#0a0a0a" }}
    >
      <Canvas
        camera={{ position: [0, 1.6, 8], fov: 70 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <Room scrollProgress={scrollProgressRef} />
      </Canvas>
    </div>
  );
};

export default ImmersiveRoom;
