import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NEON_GREEN = new THREE.Color("#00ff88");
const NEON_PINK = new THREE.Color("#ff00aa");
const NEON_CYAN = new THREE.Color("#00ffff");

function Alien({ ready }: { ready: boolean }) {
  const group = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const leftEyePos: [number, number, number] = [-0.12, 1.48, 0.28];
  const rightEyePos: [number, number, number] = [0.12, 1.48, 0.28];

  useFrame((state) => {
    if (!armRef.current || !ready) return;
    const t = state.clock.elapsedTime;
    armRef.current.rotation.x = THREE.MathUtils.lerp(
      armRef.current.rotation.x,
      Math.sin(t * 2) * 0.6,
      0.05
    );
  });

  return (
    <group ref={group} position={[0, -0.5, 0]} scale={1.2}>
      {/* Head */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color={NEON_GREEN} emissive={NEON_GREEN} emissiveIntensity={0.3} />
      </mesh>
      {/* Eyes */}
      <mesh position={leftEyePos}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={NEON_CYAN} emissive={NEON_CYAN} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={rightEyePos}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={NEON_CYAN} emissive={NEON_CYAN} emissiveIntensity={0.8} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.35, 0.6, 24]} />
        <meshStandardMaterial color={NEON_GREEN} emissive={NEON_GREEN} emissiveIntensity={0.2} />
      </mesh>
      {/* Waving arm */}
      <group ref={armRef} position={[0.35, 1, 0]} rotation={[0.3, 0, 0]}>
        <mesh position={[0.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 12]} />
          <meshStandardMaterial color={NEON_GREEN} emissive={NEON_GREEN} emissiveIntensity={0.3} />
        </mesh>
      </group>
      {/* Other arm (static) */}
      <mesh position={[-0.35, 1, 0]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.35, 12]} />
        <meshStandardMaterial color={NEON_GREEN} emissive={NEON_GREEN} emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function UFO() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.4;
    ref.current.position.x = Math.sin(t) * 2.2;
    ref.current.position.z = Math.cos(t * 0.7) * 2 - 2;
    ref.current.position.y = Math.sin(t * 0.5) * 0.4 + 1.2;
    ref.current.rotation.y = t * 0.5;
  });

  return (
    <group ref={ref}>
      {/* Saucer body */}
      <mesh castShadow>
        <sphereGeometry args={[0.25, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
        <meshStandardMaterial
          color={NEON_PINK}
          emissive={NEON_PINK}
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, -0.05, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.4, 0.08, 32]} />
        <meshStandardMaterial
          color={NEON_PINK}
          emissive={NEON_PINK}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Dome top */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <sphereGeometry args={[0.18, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial
          color={NEON_CYAN}
          emissive={NEON_CYAN}
          emissiveIntensity={0.2}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

export function AlienIntroScene({ ready }: { ready: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-3, 2, 2]} color={NEON_PINK} intensity={2} />
      <pointLight position={[3, 1, 2]} color={NEON_CYAN} intensity={1.5} />
      <Alien ready={ready} />
      <UFO />
    </>
  );
}
