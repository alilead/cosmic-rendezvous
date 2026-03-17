import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const ALIEN_ALT = "Cosmic Rendez-vous mascot";

/**
 * AlienWaveHero – full-screen hero with centered alien mascot.
 * Idle: gentle float (3px). Wave: right arm waves 3 times after 1s delay, repeats after 4s pause.
 */
const AlienWaveHero = ({ onEnter }: { onEnter: () => void }) => {
  const [phase, setPhase] = useState<"idle" | "exit">("idle");
  const { t } = useLanguage();

  const handleEnter = useCallback(() => {
    setPhase("exit");
    setTimeout(onEnter, 500);
  }, [onEnter]);

  return (
    <AnimatePresence>
      <motion.section
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-background cursor-pointer"
        onClick={handleEnter}
        initial={false}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        aria-label="Enter Cosmic Rendez-vous"
      >
        {/* Centered alien with layers */}
        <div className="relative flex items-center justify-center flex-1 w-full">
          <motion.div
            className="relative flex items-center justify-center"
            style={{ width: "min(85vw, 320px)" }}
            animate={{
              y: [0, -3, 0],
              scale: [1, 1.015, 1],
            }}
            transition={{
              y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {/* Base layer: full alien (head + body + both arms + legs) */}
            <div
              className="relative w-full aspect-[3/4] max-h-[70vh] bg-no-repeat bg-center bg-contain"
              style={{
                backgroundImage: "url(/alien.png)",
                backgroundSize: "contain",
              }}
              role="img"
              aria-label={ALIEN_ALT}
            >
              {/* Right-arm layer: same image, clipped to arm, origin at shoulder – for wave */}
              <motion.div
                className="absolute inset-0 bg-no-repeat bg-center bg-contain pointer-events-none"
                style={{
                  backgroundImage: "url(/alien.png)",
                  backgroundSize: "contain",
                  clipPath:
                    "polygon(0% 18%, 32% 20%, 34% 65%, 8% 70%, 0% 68%, 0% 18%)",
                  transformOrigin: "24% 22%",
                }}
                animate={{ rotate: [0, -25, 15, -15, 10, 0] }}
                transition={{
                  delay: 1,
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
                aria-hidden
              />
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-3 pb-16"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleEnter();
            }}
            className="min-h-[48px] px-10 py-3 font-display text-lg md:text-xl tracking-[0.25em] uppercase border-2 border-primary text-primary bg-primary/20 hover:bg-primary/40 active:scale-95 transition-all duration-300 rounded-sm neon-border-pink animate-pulse-glow touch-manipulation flex items-center gap-3"
          >
            {t("introEnter")}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
          <p className="text-xs md:text-sm tracking-[0.2em] text-muted-foreground font-body uppercase">
            {t("introHint")}
          </p>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};

export default AlienWaveHero;
