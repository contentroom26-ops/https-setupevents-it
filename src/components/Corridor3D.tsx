import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

const CORRIDOR_LENGTH = 80;
const CORRIDOR_WIDTH = 12;
const CORRIDOR_HEIGHT = 8;

function ScrollCamera() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current = window.scrollY / maxScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    scrollRef.current += (targetRef.current - scrollRef.current) * 0.05;
    const progress = scrollRef.current;
    camera.position.z = 5 - progress * (CORRIDOR_LENGTH - 10);
    camera.position.y = 2.5 - progress * 0.5;
  });

  return null;
}

function LightPanel({ position, rotation, width = 2, height = 6 }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number];
  width?: number;
  height?: number;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial 
        color="#ffffff" 
        emissive="#ffffff" 
        emissiveIntensity={0.8} 
        toneMapped={false}
      />
    </mesh>
  );
}

function CorridorGeometry() {
  // Floor - dark reflective
  const floorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#0a0a0a",
    metalness: 0.9,
    roughness: 0.1,
  }), []);

  // Walls - light gray
  const wallMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#e8e8e8",
    metalness: 0.1,
    roughness: 0.4,
  }), []);

  // Ceiling - white with ribs
  const ceilingMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#f5f5f5",
    metalness: 0.05,
    roughness: 0.5,
  }), []);

  const ribMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#d0d0d0",
    metalness: 0.1,
    roughness: 0.3,
  }), []);

  // Generate ceiling ribs
  const ribs = useMemo(() => {
    const items = [];
    for (let z = 5; z > -CORRIDOR_LENGTH; z -= 1.5) {
      items.push(z);
    }
    return items;
  }, []);

  // Wall light panels
  const lightPanels = useMemo(() => {
    const items = [];
    for (let z = 0; z > -CORRIDOR_LENGTH; z -= 12) {
      items.push(z);
    }
    return items;
  }, []);

  // Seating rows (like the image)
  const seats = useMemo(() => {
    const items = [];
    for (let z = -5; z > -CORRIDOR_LENGTH + 20; z -= 3) {
      items.push(z);
    }
    return items;
  }, []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -CORRIDOR_LENGTH / 2]} material={floorMaterial}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
      </mesh>

      {/* Central runway/path - slightly lighter */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[3, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.05} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-CORRIDOR_WIDTH / 2, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH / 2]} material={wallMaterial}>
        <planeGeometry args={[0.1, CORRIDOR_HEIGHT]} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-CORRIDOR_WIDTH / 2, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH / 2]} material={wallMaterial}>
        <planeGeometry args={[CORRIDOR_LENGTH, CORRIDOR_HEIGHT]} />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[CORRIDOR_WIDTH / 2, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH / 2]} material={wallMaterial}>
        <planeGeometry args={[CORRIDOR_LENGTH, CORRIDOR_HEIGHT]} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, CORRIDOR_HEIGHT, -CORRIDOR_LENGTH / 2]} material={ceilingMaterial}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH]} />
      </mesh>

      {/* Ceiling ribs */}
      {ribs.map((z, i) => (
        <mesh key={`rib-${i}`} position={[0, CORRIDOR_HEIGHT - 0.05, z]} material={ribMaterial}>
          <boxGeometry args={[CORRIDOR_WIDTH, 0.1, 0.15]} />
        </mesh>
      ))}

      {/* Central ceiling light strip */}
      <mesh position={[0, CORRIDOR_HEIGHT - 0.1, -CORRIDOR_LENGTH / 2]}>
        <boxGeometry args={[2, 0.05, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} toneMapped={false} />
      </mesh>

      {/* Wall light panels - left */}
      {lightPanels.map((z, i) => (
        <LightPanel 
          key={`lp-l-${i}`} 
          position={[-CORRIDOR_WIDTH / 2 + 0.1, CORRIDOR_HEIGHT / 2, z]} 
          rotation={[0, Math.PI / 2, 0]} 
          width={4}
          height={CORRIDOR_HEIGHT - 1}
        />
      ))}

      {/* Wall light panels - right */}
      {lightPanels.map((z, i) => (
        <LightPanel 
          key={`lp-r-${i}`} 
          position={[CORRIDOR_WIDTH / 2 - 0.1, CORRIDOR_HEIGHT / 2, z]} 
          rotation={[0, -Math.PI / 2, 0]} 
          width={4}
          height={CORRIDOR_HEIGHT - 1}
        />
      ))}

      {/* Seating rows - left side */}
      {seats.map((z, i) => (
        <group key={`seat-l-${i}`}>
          {/* Seat block - left */}
          <mesh position={[-3.5, 0.4, z]}>
            <boxGeometry args={[2, 0.8, 0.5]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
          </mesh>
          {/* Seat block - right */}
          <mesh position={[3.5, 0.4, z]}>
            <boxGeometry args={[2, 0.8, 0.5]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* End wall / stage */}
      <mesh position={[0, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_HEIGHT]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>

      {/* Stage platform at the end */}
      <mesh position={[0, 0.3, -CORRIDOR_LENGTH + 5]}>
        <cylinderGeometry args={[4, 4.5, 0.6, 64]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.3} roughness={0.2} />
      </mesh>
    </group>
  );
}

const Corridor3D = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2.5, 5], fov: 60, near: 0.1, far: 200 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 30, 90]} />
        
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 10, 5]} intensity={0.5} />
        <pointLight position={[0, 6, -10]} intensity={1} distance={30} />
        <pointLight position={[0, 6, -30]} intensity={1} distance={30} />
        <pointLight position={[0, 6, -50]} intensity={1} distance={30} />
        <pointLight position={[0, 6, -70]} intensity={1} distance={30} />

        <ScrollCamera />
        <CorridorGeometry />
      </Canvas>
    </div>
  );
};

export default Corridor3D;
