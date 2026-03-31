import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AlienIntroScene } from "@/components/AlienIntroScene";

/**
 * Demo component showing alien animation sequence and individual animations
 * Usage: Import and render this component anywhere in your app
 */
export default function AlienAnimationDemo() {
  const [animationType, setAnimationType] = useState<"waving" | "backflip" | "sequence">("sequence");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-2xl h-[600px] relative">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading animations...</p>
          </div>
        }>
          <Canvas
            camera={{ position: [0, 0.5, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full"
          >
            <AlienIntroScene ready={true} animationType={animationType} />
          </Canvas>
        </Suspense>
      </div>

      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => setAnimationType("sequence")}
          className={`px-6 py-3 rounded-lg font-display tracking-wider transition-all ${
            animationType === "sequence"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Sequence (Backflip → Wave)
        </button>
        <button
          onClick={() => setAnimationType("waving")}
          className={`px-6 py-3 rounded-lg font-display tracking-wider transition-all ${
            animationType === "waving"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Waving Only
        </button>
        <button
          onClick={() => setAnimationType("backflip")}
          className={`px-6 py-3 rounded-lg font-display tracking-wider transition-all ${
            animationType === "backflip"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Backflip Only
        </button>
      </div>

      <p className="mt-4 text-sm text-muted-foreground text-center max-w-md">
        <strong>Sequence mode:</strong> Alien performs a backflip once, lands, then waves continuously.<br />
        Click buttons to test individual animations or the full sequence.
      </p>
    </div>
  );
}
