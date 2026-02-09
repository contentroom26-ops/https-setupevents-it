import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

const CORRIDOR_LENGTH = 100;
const CORRIDOR_WIDTH = 14;
const CORRIDOR_HEIGHT = 9;

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
    scrollRef.current += (targetRef.current - scrollRef.current) * 0.04;
    const progress = scrollRef.current;

    // Walking camera: eye height ~1.7m, moving forward along the runway
    camera.position.z = 8 - progress * (CORRIDOR_LENGTH - 5);
    camera.position.y = 1.7;
    camera.position.x = Math.sin(progress * Math.PI * 3) * 0.15; // subtle sway

    // Slight head bob for walking feel
    camera.position.y += Math.sin(progress * Math.PI * 12) * 0.04;

    // Look slightly ahead and down the runway
    camera.lookAt(
      0,
      1.5 - progress * 0.3,
      camera.position.z - 15
    );
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
        emissiveIntensity={1.2} 
        toneMapped={false}
      />
    </mesh>
  );
}

function FloatingLight({ position, color, intensity }: { 
  position: [number, number, number]; 
  color: string;
  intensity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5 + offset.current) * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <pointLight position={position} color={color} intensity={intensity} distance={15} />
    </group>
  );
}

function CorridorGeometry() {
  // Floor - dark reflective marble
  const floorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#080808",
    metalness: 0.95,
    roughness: 0.05,
  }), []);

  // Walls - light gray panels
  const wallMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#e0e0e0",
    metalness: 0.15,
    roughness: 0.3,
  }), []);

  // Ceiling
  const ceilingMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#f0f0f0",
    metalness: 0.05,
    roughness: 0.5,
  }), []);

  const ribMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#c8c8c8",
    metalness: 0.15,
    roughness: 0.25,
  }), []);

  // White runway material
  const runwayMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#f8f8f8",
    metalness: 0.1,
    roughness: 0.15,
    emissive: "#ffffff",
    emissiveIntensity: 0.15,
  }), []);

  const ribs = useMemo(() => {
    const items = [];
    for (let z = 10; z > -CORRIDOR_LENGTH; z -= 1.2) items.push(z);
    return items;
  }, []);

  const lightPanels = useMemo(() => {
    const items = [];
    for (let z = 0; z > -CORRIDOR_LENGTH; z -= 10) items.push(z);
    return items;
  }, []);

  const seats = useMemo(() => {
    const items = [];
    for (let z = -2; z > -CORRIDOR_LENGTH + 15; z -= 2.5) items.push(z);
    return items;
  }, []);

  const floorLights = useMemo(() => {
    const items = [];
    for (let z = 0; z > -CORRIDOR_LENGTH; z -= 8) items.push(z);
    return items;
  }, []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -CORRIDOR_LENGTH / 2]} material={floorMaterial}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH + 20]} />
      </mesh>

      {/* WHITE RUNWAY / passerella bianca */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -CORRIDOR_LENGTH / 2]} material={runwayMaterial}>
        <planeGeometry args={[3.5, CORRIDOR_LENGTH + 20]} />
      </mesh>

      {/* Runway edge lights - left */}
      {floorLights.map((z, i) => (
        <mesh key={`fl-l-${i}`} position={[-1.8, 0.03, z]}>
          <boxGeometry args={[0.08, 0.06, 1.5]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      ))}
      {/* Runway edge lights - right */}
      {floorLights.map((z, i) => (
        <mesh key={`fl-r-${i}`} position={[1.8, 0.03, z]}>
          <boxGeometry args={[0.08, 0.06, 1.5]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      ))}

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-CORRIDOR_WIDTH / 2, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH / 2]} material={wallMaterial}>
        <planeGeometry args={[CORRIDOR_LENGTH + 20, CORRIDOR_HEIGHT]} />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[CORRIDOR_WIDTH / 2, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH / 2]} material={wallMaterial}>
        <planeGeometry args={[CORRIDOR_LENGTH + 20, CORRIDOR_HEIGHT]} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, CORRIDOR_HEIGHT, -CORRIDOR_LENGTH / 2]} material={ceilingMaterial}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH + 20]} />
      </mesh>

      {/* Ceiling ribs */}
      {ribs.map((z, i) => (
        <mesh key={`rib-${i}`} position={[0, CORRIDOR_HEIGHT - 0.05, z]} material={ribMaterial}>
          <boxGeometry args={[CORRIDOR_WIDTH, 0.12, 0.12]} />
        </mesh>
      ))}

      {/* Central ceiling light strip - bright */}
      <mesh position={[0, CORRIDOR_HEIGHT - 0.08, -CORRIDOR_LENGTH / 2]}>
        <boxGeometry args={[3, 0.05, CORRIDOR_LENGTH + 20]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      {/* Wall light panels - left */}
      {lightPanels.map((z, i) => (
        <LightPanel 
          key={`lp-l-${i}`} 
          position={[-CORRIDOR_WIDTH / 2 + 0.05, CORRIDOR_HEIGHT / 2, z]} 
          rotation={[0, Math.PI / 2, 0]} 
          width={5}
          height={CORRIDOR_HEIGHT - 1}
        />
      ))}

      {/* Wall light panels - right */}
      {lightPanels.map((z, i) => (
        <LightPanel 
          key={`lp-r-${i}`} 
          position={[CORRIDOR_WIDTH / 2 - 0.05, CORRIDOR_HEIGHT / 2, z]} 
          rotation={[0, -Math.PI / 2, 0]} 
          width={5}
          height={CORRIDOR_HEIGHT - 1}
        />
      ))}

      {/* Seating rows */}
      {seats.map((z, i) => (
        <group key={`seat-${i}`}>
          <mesh position={[-4, 0.35, z]}>
            <boxGeometry args={[2.5, 0.7, 0.4]} />
            <meshStandardMaterial color="#151515" metalness={0.4} roughness={0.6} />
          </mesh>
          <mesh position={[4, 0.35, z]}>
            <boxGeometry args={[2.5, 0.7, 0.4]} />
            <meshStandardMaterial color="#151515" metalness={0.4} roughness={0.6} />
          </mesh>
          {/* Chair backs */}
          <mesh position={[-4, 0.85, z - 0.15]}>
            <boxGeometry args={[2.5, 0.5, 0.08]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
          </mesh>
          <mesh position={[4, 0.85, z - 0.15]}>
            <boxGeometry args={[2.5, 0.5, 0.08]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Floating ambient lights along corridor */}
      <FloatingLight position={[-3, 5, -15]} color="#e0e8ff" intensity={2} />
      <FloatingLight position={[3, 5.5, -25]} color="#ffe8e0" intensity={1.5} />
      <FloatingLight position={[-2, 6, -40]} color="#e0ffe8" intensity={1.5} />
      <FloatingLight position={[2, 5, -55]} color="#e8e0ff" intensity={2} />
      <FloatingLight position={[-3, 5.5, -70]} color="#ffe0f0" intensity={1.5} />
      <FloatingLight position={[3, 6, -85]} color="#e0f0ff" intensity={2} />

      {/* End wall - bright glow */}
      <mesh position={[0, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_HEIGHT]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} toneMapped={false} />
      </mesh>

      {/* Stage platform at the end */}
      <mesh position={[0, 0.35, -CORRIDOR_LENGTH + 5]}>
        <cylinderGeometry args={[4.5, 5, 0.7, 64]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.15} emissive="#ffffff" emissiveIntensity={0.1} />
      </mesh>

      {/* Spotlight cones at end */}
      <spotLight position={[-3, 8, -CORRIDOR_LENGTH + 8]} angle={0.4} penumbra={0.8} intensity={3} color="#ffffff" target-position={[0, 0, -CORRIDOR_LENGTH + 5]} />
      <spotLight position={[3, 8, -CORRIDOR_LENGTH + 8]} angle={0.4} penumbra={0.8} intensity={3} color="#ffffff" />
    </group>
  );
}

const Corridor3D = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.7, 8], fov: 65, near: 0.1, far: 250 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 40, 110]} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 10, 5]} intensity={0.4} />
        
        {/* Corridor lighting - more lights for atmosphere */}
        <pointLight position={[0, 7, -5]} intensity={1.5} distance={25} color="#ffffff" />
        <pointLight position={[0, 7, -15]} intensity={1.5} distance={25} color="#f0f0ff" />
        <pointLight position={[0, 7, -25]} intensity={1.5} distance={25} color="#ffffff" />
        <pointLight position={[0, 7, -35]} intensity={1.5} distance={25} color="#f0f0ff" />
        <pointLight position={[0, 7, -45]} intensity={1.5} distance={25} color="#ffffff" />
        <pointLight position={[0, 7, -55]} intensity={1.5} distance={25} color="#f0f0ff" />
        <pointLight position={[0, 7, -65]} intensity={1.5} distance={25} color="#ffffff" />
        <pointLight position={[0, 7, -75]} intensity={1.5} distance={25} color="#f0f0ff" />
        <pointLight position={[0, 7, -85]} intensity={1.5} distance={25} color="#ffffff" />
        <pointLight position={[0, 7, -95]} intensity={1.5} distance={25} color="#f0f0ff" />

        {/* Runway floor lights */}
        <pointLight position={[0, 0.5, -10]} intensity={0.8} distance={12} color="#ffffff" />
        <pointLight position={[0, 0.5, -30]} intensity={0.8} distance={12} color="#ffffff" />
        <pointLight position={[0, 0.5, -50]} intensity={0.8} distance={12} color="#ffffff" />
        <pointLight position={[0, 0.5, -70]} intensity={0.8} distance={12} color="#ffffff" />
        <pointLight position={[0, 0.5, -90]} intensity={0.8} distance={12} color="#ffffff" />

        <ScrollCamera />
        <CorridorGeometry />
      </Canvas>
    </div>
  );
};

export default Corridor3D;
