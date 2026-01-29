import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

// Geometric room component
const Room = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Create room geometry - extended for longer journey
  const roomGeometry = useMemo(() => {
    const shapes: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number]; opacity: number }[] = [
      // Floor - extended
      { position: [0, -5, -50], rotation: [-Math.PI / 2, 0, 0], scale: [60, 200, 1], opacity: 0.3 },
      // Left wall - extended
      { position: [-20, 5, -50], rotation: [0, Math.PI / 2, 0], scale: [200, 25, 1], opacity: 0.2 },
      // Right wall - extended
      { position: [20, 5, -50], rotation: [0, -Math.PI / 2, 0], scale: [200, 25, 1], opacity: 0.2 },
      // Ceiling - extended
      { position: [0, 18, -50], rotation: [Math.PI / 2, 0, 0], scale: [60, 200, 1], opacity: 0.15 },
      
      // Geometric structures along the path
      { position: [-8, 8, -25], rotation: [0, 0.3, 0], scale: [12, 18, 1], opacity: 0.25 },
      { position: [8, 6, -20], rotation: [0, -0.2, 0], scale: [10, 14, 1], opacity: 0.2 },
      { position: [0, 10, -35], rotation: [0, 0, 0], scale: [20, 25, 1], opacity: 0.15 },
      
      // Pillars - more spread out
      { position: [-12, 0, -15], rotation: [0, 0.5, 0], scale: [4, 20, 4], opacity: 0.35 },
      { position: [14, 2, -25], rotation: [0, -0.3, 0], scale: [5, 25, 5], opacity: 0.3 },
      { position: [-10, -2, -45], rotation: [0, 0.2, 0], scale: [6, 22, 5], opacity: 0.25 },
      { position: [12, 0, -55], rotation: [0, -0.4, 0], scale: [5, 28, 4], opacity: 0.22 },
      { position: [-15, 5, -70], rotation: [0, 0.4, 0], scale: [8, 35, 6], opacity: 0.18 },
      { position: [10, 3, -85], rotation: [0, -0.2, 0], scale: [7, 30, 5], opacity: 0.15 },
      { position: [-8, 0, -100], rotation: [0, 0.3, 0], scale: [6, 25, 4], opacity: 0.12 },
      { position: [15, 5, -115], rotation: [0, -0.5, 0], scale: [10, 40, 8], opacity: 0.1 },
      { position: [-12, 2, -130], rotation: [0, 0.2, 0], scale: [8, 32, 6], opacity: 0.08 },
      { position: [8, 0, -145], rotation: [0, -0.3, 0], scale: [7, 28, 5], opacity: 0.06 },
      
      // Far end destination
      { position: [0, 5, -160], rotation: [0, 0, 0], scale: [40, 45, 1], opacity: 0.15 },
      { position: [-25, 10, -170], rotation: [0, 0.6, 0], scale: [20, 50, 1], opacity: 0.1 },
      { position: [25, 8, -175], rotation: [0, -0.4, 0], scale: [25, 55, 1], opacity: 0.08 },
    ];
    return shapes;
  }, []);

  useFrame(() => {
    const progress = scrollProgress.current;
    
    // Move camera forward as user scrolls - FASTER movement for dramatic effect
    const startZ = 20;
    const endZ = -180; // Much deeper travel
    camera.position.z = startZ + (endZ - startZ) * progress;
    
    // More dramatic camera movement
    camera.position.y = 2 + Math.sin(progress * Math.PI * 3) * 1.5;
    camera.position.x = Math.sin(progress * Math.PI * 1.5) * 4;
    
    // Dynamic FOV for speed sensation
    (camera as THREE.PerspectiveCamera).fov = 60 + progress * 15;
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    
    // Look ahead with slight tilt
    camera.lookAt(
      Math.sin(progress * Math.PI) * 2, 
      2 + Math.cos(progress * Math.PI * 2) * 0.5, 
      camera.position.z - 30
    );

    // More pronounced room rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(progress * Math.PI) * 0.1;
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
      <fog attach="fog" args={["#0a0a0a", 30, 180]} />

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

      {/* Ground plane with gradient - extended */}
      <mesh position={[0, -5, -80]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 300]} />
        <meshStandardMaterial
          color="#0d0d0d"
          metalness={0.8}
          roughness={0.4}
        />
      </mesh>

      {/* Floating geometric elements - more spread out */}
      {[...Array(15)].map((_, i) => (
        <mesh
          key={`float-${i}`}
          position={[
            (Math.random() - 0.5) * 40,
            Math.random() * 12 + 2,
            -10 - i * 12 - Math.random() * 10
          ]}
          rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          ]}
        >
          <boxGeometry args={[1 + Math.random() * 3, 1 + Math.random() * 4, 0.15]} />
          <meshStandardMaterial
            color="#1a1a1a"
            transparent
            opacity={0.5 - i * 0.02}
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
