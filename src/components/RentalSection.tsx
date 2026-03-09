import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Music, Lightbulb, MapPin } from "lucide-react";
import rentalImg from "@/assets/space-rental.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";

const RentalSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t, lang } = useLanguage();
  const features = [
    { icon: Users, label: t("rentalFeature1") },
    { icon: Music, label: t("rentalFeature2") },
    { icon: Lightbulb, label: t("rentalFeature3") },
    { icon: MapPin, label: t("rentalFeature4") },
  ];

  return (
    <section id="rental" className="relative py-24 md:py-32 overflow-hidden scroll-mt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={rentalImg} alt={t("altRentalImg")} className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10 min-w-0 max-w-[100vw]" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-[0.1em] mb-4 neon-glow-pink">
            {t("rentalTitle")}
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            {t("rentalDesc")}
          </p>
        </motion.div>

        {/* Features grid — clickable, scroll to contact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.button
              type="button"
              key={f.label}
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-border rounded-lg p-6 text-center glass-dark hover:neon-border-pink hover:bg-primary/5 active:scale-[0.98] active:bg-primary/10 transition-all duration-300 touch-manipulation min-h-[44px]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            >
              <f.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
              <p className="font-body text-sm text-muted-foreground">{f.label}</p>
            </motion.button>
          ))}
        </div>

        {/* Ideal for */}
        <motion.div
          className="max-w-2xl mx-auto border border-primary/30 rounded-lg p-8 md:p-12 text-center glass-dark neon-border-pink"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="font-display text-lg tracking-[0.15em] mb-6 text-secondary">{t("rentalIdealFor")}</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {translations[lang].rentalIdeals.map((item) => (
              <span key={item} className="px-4 py-2 text-sm font-body border border-border rounded-full text-foreground hover:border-primary hover:text-primary transition-colors duration-300">
                {item}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="min-h-[44px] min-w-[44px] px-10 py-4 font-display text-sm tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/90 transition-all duration-300 rounded-sm animate-pulse-glow touch-manipulation"
          >
            {t("rentalCta")}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default RentalSection;
