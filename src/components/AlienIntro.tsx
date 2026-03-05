import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";

const SPLINE_SCENE = "https://prod.spline.design/VioIzR3DIl5LAdp1/scene.splinecode";

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
        {/* Spline scene: flies in from the back */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{
            opacity: 0,
            scale: 0.35,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 2.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ perspective: "1200px" }}
        >
          <Spline
            scene={SPLINE_SCENE}
            onLoad={handleSplineLoad}
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>

        {/* Dark overlay so content is readable */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40 pointer-events-none"
          aria-hidden
        />

        {/* Enter prompt */}
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
