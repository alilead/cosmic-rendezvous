import { useState, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";

const SPLINE_SCENE = "https://prod.spline.design/DE1R5Mj-ZqMo9n9M/scene.splinecode";

const AlienIntro = ({ onEnter }: { onEnter: () => void }) => {
  const [phase, setPhase] = useState<"flying" | "ready" | "exit">("flying");
  const [showPrompt, setShowPrompt] = useState(false);

  const handleEnter = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("exit");
    setTimeout(onEnter, 600);
  }, [onEnter, phase]);

  const handleSplineLoad = useCallback(() => {
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
          style={{ perspective: "1200px" }}
        >
          <Suspense fallback={null}>
            <Spline
              scene={SPLINE_SCENE}
              onLoad={handleSplineLoad}
              style={{ width: "100%", height: "100%" }}
            />
          </Suspense>
        </motion.div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40 pointer-events-none"
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
                  handleEnter();
                }}
                className="pointer-events-auto min-h-[48px] px-10 py-3 font-display text-lg md:text-xl tracking-[0.25em] uppercase border-2 border-primary text-primary bg-primary/20 hover:bg-primary/40 active:scale-95 transition-all duration-300 rounded-sm neon-border-pink animate-pulse-glow touch-manipulation flex items-center gap-3"
              >
                ENTRER
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <p className="text-xs md:text-sm tracking-[0.2em] text-muted-foreground font-body uppercase pointer-events-none">
                ou appuyez n&apos;importe où
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlienIntro;
