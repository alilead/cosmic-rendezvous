import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AlienModel() {
  const armRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  const greenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#39ff14",
        roughness: 0.2,
        metalness: 0.3,
      }),
    []
  );

  const eyeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#111111",
        roughness: 0.1,
        metalness: 0.8,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (armRef.current) {
      armRef.current.rotation.x = Math.sin(t * 2) * 0.6 + 0.5;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} scale={0.5}>
      {/* Head */}
      <mesh position={[0, 1.8, 0]} material={greenMaterial} castShadow>
        <sphereGeometry args={[0.8, 64, 64]} />
      </mesh>

      {/* Body */}
      <mesh
        position={[0, 0.8, 0]}
        scale={[0.5, 0.7, 0.4]}
        material={greenMaterial}
        castShadow
      >
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.25, 2, 0.6]} material={eyeMaterial}>
        <sphereGeometry args={[0.2, 32, 32]} />
      </mesh>
      <mesh position={[0.25, 2, 0.6]} material={eyeMaterial}>
        <sphereGeometry args={[0.2, 32, 32]} />
      </mesh>

      {/* Left Arm */}
      <mesh
        position={[-0.7, 1.2, 0]}
        rotation={[0, 0, Math.PI / 4]}
        material={greenMaterial}
        castShadow
      >
        <cylinderGeometry args={[0.08, 0.08, 1.2, 32]} />
      </mesh>

      {/* Right Arm (Animated) */}
      <group ref={armRef} position={[0.7, 1.2, 0]}>
        <mesh position={[0, -0.6, 0]} material={greenMaterial} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 32]} />
        </mesh>
      </group>

      {/* Legs */}
      <mesh position={[-0.2, -0.3, 0]} material={greenMaterial} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 32]} />
      </mesh>
      <mesh position={[0.2, -0.3, 0]} material={greenMaterial} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 32]} />
      </mesh>
    </group>
  );
}

export function AlienIntroScene({ ready }: { ready: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-2, 2, 3]} intensity={0.8} />
      <pointLight position={[2, 1, 3]} intensity={0.6} />
      <AlienModel />
    </>
  );
}
