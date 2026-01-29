import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

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

const Room = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
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
      <ambientLight intensity={0.6} color="#ffffff" />
      
      {/* Soft point lights along corridor */}
      <pointLight position={[0, roomHeight - 1, -20]} intensity={1} distance={80} color="#f0f0f0" />
      <pointLight position={[0, roomHeight - 1, -60]} intensity={1} distance={80} color="#f0f0f0" />
      <pointLight position={[0, roomHeight - 1, -100]} intensity={0.8} distance={80} color="#f0f0f0" />
      <pointLight position={[0, roomHeight - 1, -140]} intensity={0.6} distance={80} color="#f0f0f0" />
      
      {/* Spotlight from front */}
      <spotLight
        position={[0, roomHeight, 10]}
        angle={0.8}
        penumbra={0.5}
        intensity={1.5}
        color="#ffffff"
        distance={150}
      />

      <fog attach="fog" args={["#f8f8f8", 40, 200]} />

      {/* Floor - white marble style */}
      <mesh position={[0, 0, -corridorLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, corridorLength]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Floor grid lines - subtle */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={`grid-${i}`} position={[0, 0.02, -10 - i * 9]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roomWidth, 0.05]} />
          <meshBasicMaterial color="#d0d0d0" />
        </mesh>
      ))}

      {/* Ceiling - white */}
      <mesh position={[0, roomHeight, -corridorLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, corridorLength]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Walls - white/light gray */}
      <mesh position={[-roomWidth / 2, roomHeight / 2, -corridorLength / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[corridorLength, roomHeight]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.6} />
      </mesh>
      <mesh position={[roomWidth / 2, roomHeight / 2, -corridorLength / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[corridorLength, roomHeight]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.6} />
      </mesh>

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
    </group>
  );
};

const ImmersiveRoom = () => {
  const scrollProgressRef = useRef(0);
  const { scrollYProgress } = useScroll();
  
  scrollYProgress.on("change", (value) => {
    scrollProgressRef.current = value;
  });

  return (
    <div className="fixed inset-0 z-0 bg-[#f8f8f8]">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 65 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={1}
        frameloop="always"
      >
        <Room scrollProgress={scrollProgressRef} />
      </Canvas>
    </div>
  );
};

export default ImmersiveRoom;
