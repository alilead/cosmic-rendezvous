import { useRef, useEffect, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import type { Group } from "three";
import * as THREE from "three";

const WAVING_FBX = "/Waving.fbx";
const BACKFLIP_FBX = "/Backflip.fbx";

type AnimationType = "waving" | "backflip" | "sequence";

function AlienFBX({ animationType = "sequence" }: { animationType?: AnimationType }) {
  const wavingFbx = useLoader(FBXLoader, WAVING_FBX) as Group & { animations?: THREE.AnimationClip[] };
  const backflipFbx = useLoader(FBXLoader, BACKFLIP_FBX) as Group & { animations?: THREE.AnimationClip[] };
  
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const [currentAnimation, setCurrentAnimation] = useState<"waving" | "backflip">(
    animationType === "sequence" ? "backflip" : animationType
  );
  const [hasPlayedBackflip, setHasPlayedBackflip] = useState(false);

  const activeFbx = currentAnimation === "waving" ? wavingFbx : backflipFbx;

  useEffect(() => {
    if (!activeFbx?.animations?.length) return;
    
    // Clean up previous mixer
    if (mixerRef.current) {
      mixerRef.current.stopAllAction();
      mixerRef.current = null;
    }

    const mixer = new THREE.AnimationMixer(activeFbx);
    mixerRef.current = mixer;
    const action = mixer.clipAction(activeFbx.animations[0]);
    
    // If it's the backflip in sequence mode, play once then switch to waving
    if (currentAnimation === "backflip" && animationType === "sequence" && !hasPlayedBackflip) {
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      
      // Listen for animation finish
      const onFinished = () => {
        setHasPlayedBackflip(true);
        setCurrentAnimation("waving");
      };
      
      mixer.addEventListener("finished", onFinished);
      action.play();
      
      return () => {
        mixer.removeEventListener("finished", onFinished);
        mixer.stopAllAction();
        if (activeFbx.animations?.[0]) {
          mixer.uncacheClip(activeFbx.animations[0]);
        }
        mixerRef.current = null;
      };
    } else if (currentAnimation === "waving" && animationType === "sequence") {
      // In sequence mode, waving plays 2-3 times at 50% speed then stops
      action.setLoop(THREE.LoopRepeat, 3); // Play 3 times
      action.clampWhenFinished = true; // Stay at final pose
      action.timeScale = 0.5; // 50% speed (slower waving)
      action.play();
    } else {
      // Standalone animations loop infinitely
      action.setLoop(THREE.LoopRepeat, Infinity);
      if (currentAnimation === "waving") {
        action.timeScale = 0.5; // Slower waving for standalone too
      }
      action.play();
    }

    return () => {
      mixer.stopAllAction();
      if (activeFbx.animations?.[0]) {
        mixer.uncacheClip(activeFbx.animations[0]);
      }
      mixerRef.current = null;
    };
  }, [activeFbx, currentAnimation, animationType, hasPlayedBackflip]);

  // Handle external animation type changes
  useEffect(() => {
    if (animationType !== "sequence") {
      setCurrentAnimation(animationType);
      setHasPlayedBackflip(false);
    }
  }, [animationType]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={0.8}>
      <primitive object={activeFbx} dispose={false} />
    </group>
  );
}

export function AlienIntroScene({ 
  ready, 
  animationType = "sequence" 
}: { 
  ready: boolean;
  animationType?: "waving" | "backflip" | "sequence";
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-2, 2, 3]} intensity={0.8} />
      <pointLight position={[2, 1, 3]} intensity={0.6} />
      <AlienFBX animationType={animationType} />
    </>
  );
}
