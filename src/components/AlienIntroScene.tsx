import { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import type { Group } from "three";
import * as THREE from "three";

const FBX_URL = "/alen.fbx";

function AlienFBX() {
  const fbx = useLoader(FBXLoader, FBX_URL) as Group & { animations?: THREE.AnimationClip[] };
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (!fbx?.animations?.length) return;
    const mixer = new THREE.AnimationMixer(fbx);
    mixerRef.current = mixer;
    const action = mixer.clipAction(fbx.animations[0]);
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.play();
    return () => {
      mixer.stopAllAction();
      mixer.uncacheClip(fbx.animations![0]);
      mixerRef.current = null;
    };
  }, [fbx]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={0.8}>
      <primitive object={fbx} dispose={false} />
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
      <AlienFBX />
    </>
  );
}
