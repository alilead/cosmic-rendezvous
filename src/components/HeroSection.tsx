import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-bar.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-0">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImg} alt={t("altHero")} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <img
            src="/logo.png"
            alt={t("altLogo")}
            className="h-48 min-[400px]:h-52 sm:h-60 md:h-72 lg:h-80 xl:h-[22rem] mx-auto drop-shadow-[0_0_30px_hsl(var(--neon-pink)/0.5)] max-w-[min(94vw,32rem)] w-auto object-contain"
          />
        </motion.div>

        <motion.h1
          className="font-display text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.04em] sm:tracking-[0.08em] mb-4 neon-glow-pink text-center max-w-3xl mx-auto px-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {lang === "fr" ? "VOTRE ORBITE NOCTURNE" : "YOUR NIGHT ORBIT"}
        </motion.h1>

        <motion.p
          className="font-display text-sm md:text-base tracking-[0.3em] text-secondary mb-8 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {t("heroTagline")}
        </motion.p>

        <motion.p
          className="font-body text-sm md:text-base max-w-md mx-auto mb-12 text-foreground bg-background/75 px-4 py-3 rounded-md shadow-[0_0_20px_rgba(0,0,0,0.7)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {t("heroDesc")}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <button
            type="button"
            onClick={() => navigate("/booking")}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-8 py-4 font-display text-sm tracking-[0.2em] uppercase border border-primary text-primary-foreground bg-primary/20 hover:bg-primary/40 active:bg-primary/50 transition-all duration-300 rounded-sm neon-border-pink animate-pulse-glow touch-manipulation"
          >
            {t("heroBook")}
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#about")}
            className="min-h-[44px] min-w-[44px] px-8 py-4 font-display text-sm tracking-[0.2em] uppercase border border-secondary text-secondary hover:bg-secondary/10 active:bg-secondary/20 transition-all duration-300 rounded-sm neon-border-cyan touch-manipulation"
          >
            {t("heroDiscover")}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
