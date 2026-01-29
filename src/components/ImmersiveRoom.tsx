import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

const Room = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const { camera } = useThree();
  const targetZ = useRef(8);

  const corridorLength = 180;
  const roomWidth = 12;
  const roomHeight = 7;

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
      <ambientLight intensity={0.4} color="#ffffff" />
      
      {/* Strong white point lights along corridor */}
      <pointLight position={[0, roomHeight - 1, -20]} intensity={1.5} distance={80} color="#ffffff" />
      <pointLight position={[0, roomHeight - 1, -60]} intensity={1.5} distance={80} color="#ffffff" />
      <pointLight position={[0, roomHeight - 1, -100]} intensity={1.2} distance={80} color="#ffffff" />
      <pointLight position={[0, roomHeight - 1, -140]} intensity={1} distance={80} color="#ffffff" />
      
      {/* Spotlight from front */}
      <spotLight
        position={[0, roomHeight, 10]}
        angle={0.8}
        penumbra={0.5}
        intensity={2}
        color="#ffffff"
        distance={150}
      />

      <fog attach="fog" args={["#0f0f0f", 30, 200]} />

      {/* Floor - lighter */}
      <mesh position={[0, 0, -corridorLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, corridorLength]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Floor grid lines - more visible */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={`grid-${i}`} position={[0, 0.02, -10 - i * 9]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[roomWidth, 0.05]} />
          <meshBasicMaterial color="#3a3a3a" />
        </mesh>
      ))}

      {/* Ceiling */}
      <mesh position={[0, roomHeight, -corridorLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, corridorLength]} />
        <meshStandardMaterial color="#0d0d0d" />
      </mesh>

      {/* Walls - slightly lighter */}
      <mesh position={[-roomWidth / 2, roomHeight / 2, -corridorLength / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[corridorLength, roomHeight]} />
        <meshStandardMaterial color="#181818" roughness={0.8} />
      </mesh>
      <mesh position={[roomWidth / 2, roomHeight / 2, -corridorLength / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[corridorLength, roomHeight]} />
        <meshStandardMaterial color="#181818" roughness={0.8} />
      </mesh>

      {/* Archways with more contrast */}
      {archways.map((arch, i) => (
        <group key={i} position={[0, 0, arch.z]}>
          {/* Left pillar */}
          <mesh position={[-roomWidth / 2 + 0.3, roomHeight / 2, 0]}>
            <boxGeometry args={[0.6, roomHeight, 0.5]} />
            <meshStandardMaterial color="#222222" roughness={0.5} />
          </mesh>
          {/* Right pillar */}
          <mesh position={[roomWidth / 2 - 0.3, roomHeight / 2, 0]}>
            <boxGeometry args={[0.6, roomHeight, 0.5]} />
            <meshStandardMaterial color="#222222" roughness={0.5} />
          </mesh>
          {/* Top beam */}
          <mesh position={[0, roomHeight - 0.2, 0]}>
            <boxGeometry args={[roomWidth, 0.4, 0.5]} />
            <meshStandardMaterial color="#222222" roughness={0.5} />
          </mesh>
          {/* Floor accent line */}
          <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[roomWidth, 0.15]} />
            <meshBasicMaterial color="#444444" />
          </mesh>
        </group>
      ))}

      {/* Bright ceiling light strips */}
      {Array.from({ length: 12 }, (_, i) => (
        <group key={`light-${i}`} position={[0, roomHeight - 0.05, -15 - i * 14]}>
          <mesh>
            <boxGeometry args={[3, 0.08, 0.4]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Glow effect */}
          <mesh position={[0, -0.1, 0]}>
            <planeGeometry args={[3.5, 0.6]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
          </mesh>
        </group>
      ))}

      {/* Wall accent lights */}
      {Array.from({ length: 8 }, (_, i) => (
        <group key={`wall-light-${i}`}>
          <mesh position={[-roomWidth / 2 + 0.1, roomHeight / 2, -25 - i * 20]}>
            <planeGeometry args={[0.05, 3]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
          <mesh position={[roomWidth / 2 - 0.1, roomHeight / 2, -25 - i * 20]}>
            <planeGeometry args={[0.05, 3]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
        </group>
      ))}

      {/* End wall */}
      <mesh position={[0, roomHeight / 2, -corridorLength + 5]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      
      {/* End focal light */}
      <pointLight position={[0, roomHeight / 2, -corridorLength + 15]} intensity={0.8} color="#ffffff" distance={30} />
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
    <div className="fixed inset-0 z-0 bg-[#0a0a0a]">
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
