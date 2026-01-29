import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

// Geometric room component
const Room = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Create room geometry
  const roomGeometry = useMemo(() => {
    const shapes: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number]; opacity: number }[] = [
      // Floor
      { position: [0, -5, 0], rotation: [-Math.PI / 2, 0, 0], scale: [40, 40, 1], opacity: 0.3 },
      // Left wall
      { position: [-15, 5, 0], rotation: [0, Math.PI / 2, 0], scale: [60, 20, 1], opacity: 0.2 },
      // Right wall
      { position: [15, 5, 0], rotation: [0, -Math.PI / 2, 0], scale: [60, 20, 1], opacity: 0.2 },
      // Ceiling
      { position: [0, 15, 0], rotation: [Math.PI / 2, 0, 0], scale: [40, 40, 1], opacity: 0.15 },
      // Back walls - geometric shapes
      { position: [-8, 8, -25], rotation: [0, 0.3, 0], scale: [12, 18, 1], opacity: 0.25 },
      { position: [8, 6, -20], rotation: [0, -0.2, 0], scale: [10, 14, 1], opacity: 0.2 },
      { position: [0, 10, -30], rotation: [0, 0, 0], scale: [20, 25, 1], opacity: 0.15 },
      // Geometric pillars
      { position: [-10, 0, -15], rotation: [0, 0.5, 0], scale: [3, 15, 3], opacity: 0.3 },
      { position: [12, 2, -18], rotation: [0, -0.3, 0], scale: [4, 20, 4], opacity: 0.25 },
      { position: [5, -2, -40], rotation: [0, 0.1, 0], scale: [8, 25, 6], opacity: 0.2 },
      { position: [-12, 5, -50], rotation: [0, 0.4, 0], scale: [10, 30, 8], opacity: 0.15 },
      // Far elements
      { position: [0, 0, -70], rotation: [0, 0, 0], scale: [30, 35, 1], opacity: 0.1 },
      { position: [-20, 10, -80], rotation: [0, 0.6, 0], scale: [15, 40, 1], opacity: 0.1 },
      { position: [25, 8, -90], rotation: [0, -0.4, 0], scale: [20, 45, 1], opacity: 0.08 },
    ];
    return shapes;
  }, []);

  useFrame(() => {
    const progress = scrollProgress.current;
    
    // Move camera forward as user scrolls
    const startZ = 15;
    const endZ = -100;
    camera.position.z = startZ + (endZ - startZ) * progress;
    
    // Subtle camera movement
    camera.position.y = 2 + Math.sin(progress * Math.PI * 2) * 0.5;
    camera.position.x = Math.sin(progress * Math.PI) * 2;
    
    // Look slightly ahead
    camera.lookAt(0, 2, camera.position.z - 20);

    // Rotate room elements subtly
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(progress * Math.PI * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      
      {/* Main directional light (like the light beam in the reference) */}
      <directionalLight
        position={[10, 15, 5]}
        intensity={1}
        color="#ffffff"
        castShadow
      />
      
      {/* Subtle fill light */}
      <pointLight position={[-10, 10, -20]} intensity={0.3} color="#8888aa" />
      
      {/* Fog for depth */}
      <fog attach="fog" args={["#0a0a0a", 20, 120]} />

      {/* Room geometry */}
      {roomGeometry.map((shape, index) => (
        <mesh
          key={index}
          position={shape.position}
          rotation={shape.rotation}
          scale={shape.scale}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#1a1a1a"
            transparent
            opacity={shape.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Light beam effect */}
      <mesh position={[8, 5, -10]} rotation={[0.3, -0.5, 0]}>
        <coneGeometry args={[8, 25, 32, 1, true]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ground plane with gradient */}
      <mesh position={[0, -5, -40]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 200]} />
        <meshStandardMaterial
          color="#0d0d0d"
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      {/* Floating geometric elements */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={`float-${i}`}
          position={[
            (Math.random() - 0.5) * 30,
            Math.random() * 10 + 2,
            -20 - Math.random() * 60
          ]}
          rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          ]}
        >
          <boxGeometry args={[1 + Math.random() * 2, 1 + Math.random() * 3, 0.1]} />
          <meshStandardMaterial
            color="#222222"
            transparent
            opacity={0.4}
          />
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
        camera={{ position: [0, 2, 15], fov: 60 }}
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
