import { useState, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { AlienIntroScene } from "./AlienIntroScene";

const AlienIntro = ({ onEnter }: { onEnter: () => void }) => {
  const [phase, setPhase] = useState<"flying" | "ready" | "exit">("flying");
  const [showPrompt, setShowPrompt] = useState(false);

  const handleEnter = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("exit");
    setTimeout(onEnter, 600);
  }, [onEnter, phase]);

  const handleSceneReady = useCallback(() => {
    setPhase("ready");
    setTimeout(() => setShowPrompt(true), 800);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden cursor-pointer"
        onClick={handleEnter}
        initial={false}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 0.4, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          onAnimationComplete={() => handleSceneReady()}
        >
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <AlienIntroScene ready={phase === "ready"} />
            </Canvas>
          </Suspense>
        </motion.div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40 pointer-events-none"
          aria-hidden
        />

        <AnimatePresence>
          {showPrompt && phase === "ready" && (
            <motion.div
              className="relative z-10 mt-auto pb-16 text-center pointer-events-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-sm md:text-base tracking-[0.2em] text-muted-foreground font-body uppercase"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Appuyez pour entrer
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlienIntro;
