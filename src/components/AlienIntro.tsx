import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Star = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-foreground"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{ duration: 2 + Math.random() * 3, delay, repeat: Infinity }}
  />
);

const AlienIntro = ({ onEnter }: { onEnter: () => void }) => {
  const [phase, setPhase] = useState<"appear" | "blink" | "text" | "exit">("appear");
  const [stars] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }))
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("blink"), 2000);
    const t2 = setTimeout(() => setPhase("text"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleEnter = useCallback(() => {
    setPhase("exit");
    setTimeout(onEnter, 800);
  }, [onEnter]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden cursor-pointer"
          onClick={phase === "text" ? handleEnter : undefined}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8 }}
        >
          {stars.map((s) => (
            <Star key={s.id} {...s} />
          ))}

          {/* Alien SVG */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <motion.svg
              width="180"
              height="240"
              viewBox="0 0 180 240"
              className="drop-shadow-[0_0_40px_hsl(var(--neon-green)/0.6)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Head */}
              <motion.ellipse
                cx="90"
                cy="80"
                rx="65"
                ry="75"
                fill="none"
                stroke="hsl(140, 100%, 50%)"
                strokeWidth="2"
                filter="url(#glow)"
                animate={{ ry: [75, 73, 75] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Eyes */}
              <motion.ellipse
                cx="65"
                cy="75"
                rx="18"
                ry="10"
                fill="hsl(190, 100%, 50%)"
                opacity="0.9"
                animate={phase === "blink" ? { ry: [10, 1, 10], opacity: [0.9, 0.3, 0.9] } : {}}
                transition={{ duration: 0.4 }}
              />
              <motion.ellipse
                cx="115"
                cy="75"
                rx="18"
                ry="10"
                fill="hsl(190, 100%, 50%)"
                opacity="0.9"
                animate={phase === "blink" ? { ry: [10, 1, 10], opacity: [0.9, 0.3, 0.9] } : {}}
                transition={{ duration: 0.4 }}
              />
              {/* Eye pupils */}
              <ellipse cx="68" cy="75" rx="5" ry="4" fill="hsl(240, 50%, 3%)" />
              <ellipse cx="118" cy="75" rx="5" ry="4" fill="hsl(240, 50%, 3%)" />
              {/* Mouth */}
              <ellipse cx="90" cy="110" rx="8" ry="3" fill="none" stroke="hsl(330, 100%, 60%)" strokeWidth="1.5" />
              {/* Body outline */}
              <motion.path
                d="M50,155 Q50,130 65,120 Q90,110 115,120 Q130,130 130,155 L120,200 Q90,210 60,200 Z"
                fill="none"
                stroke="hsl(140, 100%, 50%)"
                strokeWidth="1.5"
                opacity="0.5"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </motion.svg>
          </motion.div>

          {/* Text */}
          <AnimatePresence>
            {phase === "text" && (
              <motion.div
                className="relative z-10 mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-2xl md:text-3xl font-display tracking-[0.3em] neon-glow-green mb-6">
                  VOUS ÊTES ENTRÉ DANS LE COSMIC.
                </h1>
                <motion.p
                  className="text-sm md:text-base tracking-[0.2em] text-muted-foreground font-body uppercase"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Appuyez pour entrer
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default AlienIntro;
