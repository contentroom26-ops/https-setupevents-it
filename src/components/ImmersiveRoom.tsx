import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

// Optimized minimal corridor
const Room = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const { camera } = useThree();
  const targetZ = useRef(8);
  const targetY = useRef(1.6);

  const corridorLength = 180;
  const roomWidth = 10;
  const roomHeight = 6;

  // Reduced archways - only 8
  const archways = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({ z: -20 - i * 20 })), 
  []);

  useFrame((_, delta) => {
    const progress = scrollProgress.current;
    
    // Smooth lerp for camera movement
    const endZ = -corridorLength + 30;
    targetZ.current = THREE.MathUtils.lerp(targetZ.current, 8 + (endZ - 8) * progress, delta * 3);
    targetY.current = THREE.MathUtils.lerp(targetY.current, 1.6, delta * 5);
    
    camera.position.z = targetZ.current;
    camera.position.y = targetY.current;
    camera.position.x = 0;
    camera.lookAt(0, 1.6, camera.position.z - 20);
  });

  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, roomHeight - 1, -80]} intensity={0.6} distance={120} />
      
      <fog attach="fog" args={["#0a0a0a", 20, 180]} />

      {/* Floor */}
      <mesh position={[0, 0, -corridorLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, corridorLength]} />
        <meshBasicMaterial color="#141414" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, roomHeight, -corridorLength / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, corridorLength]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>

      {/* Walls */}
      <mesh position={[-roomWidth / 2, roomHeight / 2, -corridorLength / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[corridorLength, roomHeight]} />
        <meshBasicMaterial color="#121212" />
      </mesh>
      <mesh position={[roomWidth / 2, roomHeight / 2, -corridorLength / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[corridorLength, roomHeight]} />
        <meshBasicMaterial color="#121212" />
      </mesh>

      {/* Simplified archways */}
      {archways.map((arch, i) => (
        <group key={i} position={[0, 0, arch.z]}>
          <mesh position={[-roomWidth / 2 + 0.2, roomHeight / 2, 0]}>
            <boxGeometry args={[0.4, roomHeight, 0.3]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[roomWidth / 2 - 0.2, roomHeight / 2, 0]}>
            <boxGeometry args={[0.4, roomHeight, 0.3]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0, roomHeight - 0.15, 0]}>
            <boxGeometry args={[roomWidth, 0.3, 0.3]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
        </group>
      ))}

      {/* Minimal ceiling lights - only 6 */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[0, roomHeight - 0.05, -30 - i * 25]}>
          <planeGeometry args={[1.5, 0.2]} />
          <meshBasicMaterial color="#333333" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* End wall */}
      <mesh position={[0, roomHeight / 2, -corridorLength + 5]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshBasicMaterial color="#0a0a0a" />
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
    <div className="fixed inset-0 z-0 bg-[#0a0a0a]">
      <Canvas
        camera={{ position: [0, 1.6, 8], fov: 65 }}
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
