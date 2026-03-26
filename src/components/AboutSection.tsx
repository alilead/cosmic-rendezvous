import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t, lang } = useLanguage();

  return (
    <section id="about" className="relative py-12 md:py-20 cosmic-gradient noise-bg scroll-mt-20">
      <div className="container mx-auto px-4 relative z-10 min-w-0 max-w-[100vw]">
        <div ref={ref} className="space-y-8 md:space-y-10">
          {/* Header above image — better UX */}
          <motion.h2
            className="font-display text-3xl md:text-4xl tracking-[0.1em] text-center md:text-left neon-glow-cyan"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {t("aboutTitle")}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <motion.div
              className="relative rounded-lg overflow-hidden h-[280px] sm:h-[320px] md:h-[360px]"
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <img src="/photo/WhatsApp Image 2026-03-25 at 16.42.50.jpeg" alt={t("altAboutImg")} className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute inset-0 border border-primary/20 rounded-lg neon-border-pink" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
            <div className="space-y-5 font-body text-muted-foreground leading-relaxed text-base md:text-lg max-w-xl">
              <p>{t("aboutP1")}</p>
              <p>{t("aboutP2")}</p>
              <p>{t("aboutP3")}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {translations[lang].aboutTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs font-display tracking-[0.2em] uppercase border border-border text-muted-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
