import { useState, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { AlienIntroScene } from "@/components/AlienIntroScene";
import { useLanguage } from "@/contexts/LanguageContext";

const AlienIntro = ({ onEnter }: { onEnter: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "ready" | "exit">("loading");
  const [showPrompt, setShowPrompt] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const { t } = useLanguage();

  const handleEnter = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("exit");
    setTimeout(onEnter, 500);
  }, [onEnter, phase]);

  const handleUserInteraction = useCallback(() => {
    if (!userInteracted) {
      setUserInteracted(true);
      // Trigger audio play in AlienIntroScene
      if ((window as any).__alienAudioInteraction) {
        (window as any).__alienAudioInteraction();
      }
    }
  }, [userInteracted]);

  const handleCreated = useCallback(() => {
    setPhase("ready");
    setTimeout(() => setShowPrompt(true), 600);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden cursor-pointer"
        onClick={(e) => {
          handleUserInteraction();
          handleEnter();
        }}
        initial={false}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0.5, 5], fov: 50 }}
              onCreated={handleCreated}
              gl={{ antialias: true, alpha: true }}
              className="w-full h-full"
            >
              <AlienIntroScene 
                ready={phase === "ready"} 
                animationType="sequence"
                onUserInteraction={handleUserInteraction}
              />
            </Canvas>
          </Suspense>
        </motion.div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30 pointer-events-none"
          aria-hidden
        />

        <AnimatePresence>
          {showPrompt && phase === "ready" && (
            <motion.div
              className="relative z-10 mt-auto pb-16 text-center flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserInteraction();
                  handleEnter();
                }}
                className="pointer-events-auto min-h-[48px] px-10 py-3 font-display text-lg md:text-xl tracking-[0.25em] uppercase border-2 border-primary text-primary bg-primary/20 hover:bg-primary/40 active:scale-95 transition-all duration-300 rounded-sm neon-border-pink animate-pulse-glow touch-manipulation flex items-center gap-3"
              >
                {t("introEnter")}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <p className="text-xs md:text-sm tracking-[0.2em] text-muted-foreground font-body uppercase pointer-events-none">
                {t("introHint")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlienIntro;
