import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

const CORRIDOR_LENGTH = 120;
const CORRIDOR_WIDTH = 6;
const CORRIDOR_HEIGHT = 8;
const TUBE_SPACING = 3;
const TUBE_HEIGHT = 7;

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

    camera.position.z = 5 - progress * (CORRIDOR_LENGTH - 5);
    camera.position.y = 1.65;
    camera.position.x = Math.sin(progress * Math.PI * 2.5) * 0.08;
    camera.position.y += Math.sin(progress * Math.PI * 14) * 0.025;

    camera.lookAt(0, 1.4, camera.position.z - 20);
  });

  return null;
}

function NeonTube({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Glowing tube */}
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, TUBE_HEIGHT, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh>
      {/* Soft glow around tube */}
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, TUBE_HEIGHT, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#eeeeff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.15}
          toneMapped={false}
        />
      </mesh>
      {/* Point light from tube */}
      <pointLight
        color="#e8e8ff"
        intensity={1.8}
        distance={6}
        position={[0, 0, 0]}
      />
    </group>
  );
}

function CorridorScene() {
  const tubePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let z = 4; z > -CORRIDOR_LENGTH; z -= TUBE_SPACING) {
      // Left wall tubes
      positions.push([-CORRIDOR_WIDTH / 2 + 0.15, TUBE_HEIGHT / 2, z]);
      // Right wall tubes
      positions.push([CORRIDOR_WIDTH / 2 - 0.15, TUBE_HEIGHT / 2, z]);
    }
    return positions;
  }, []);

  return (
    <group>
      {/* Floor - dark reflective */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH + 20]} />
        <meshStandardMaterial
          color="#050505"
          metalness={0.98}
          roughness={0.02}
        />
      </mesh>

      {/* Left wall - pure black */}
      <mesh
        rotation={[0, Math.PI / 2, 0]}
        position={[-CORRIDOR_WIDTH / 2, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH / 2]}
      >
        <planeGeometry args={[CORRIDOR_LENGTH + 20, CORRIDOR_HEIGHT]} />
        <meshStandardMaterial color="#020202" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Right wall - pure black */}
      <mesh
        rotation={[0, -Math.PI / 2, 0]}
        position={[CORRIDOR_WIDTH / 2, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH / 2]}
      >
        <planeGeometry args={[CORRIDOR_LENGTH + 20, CORRIDOR_HEIGHT]} />
        <meshStandardMaterial color="#020202" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Ceiling - black */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, CORRIDOR_HEIGHT, -CORRIDOR_LENGTH / 2]}
      >
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_LENGTH + 20]} />
        <meshStandardMaterial color="#010101" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Neon tubes */}
      {tubePositions.map((pos, i) => (
        <NeonTube key={i} position={pos} />
      ))}

      {/* End - darkness/faint glow */}
      <mesh position={[0, CORRIDOR_HEIGHT / 2, -CORRIDOR_LENGTH]}>
        <planeGeometry args={[CORRIDOR_WIDTH, CORRIDOR_HEIGHT]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#111122"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}

const Corridor3D = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.65, 5], fov: 70, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8,
        }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 30, 100]} />

        <ambientLight intensity={0.03} />

        <ScrollCamera />
        <CorridorScene />
      </Canvas>
    </div>
  );
};

export default Corridor3D;
