import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const contactItems = [
    { icon: MapPin, labelKey: "contactLocation" as const, href: "https://www.google.com/maps/search/genève+cosmic+bar" },
    { icon: Phone, labelKey: "contactPhone" as const, href: "tel:+41795247754" },
    { icon: Instagram, labelKey: "contactInstagram" as const, href: "https://www.instagram.com/cosmic_cafe_gva/" },
    { icon: Mail, labelKey: "contactEmail" as const, href: "mailto:info@cosmicrendezvous.ch" },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 cosmic-gradient noise-bg scroll-mt-20">
      <div className="container mx-auto px-4 relative z-10 max-w-3xl min-w-0" ref={ref}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-[0.1em] mb-4 neon-glow-pink">
            {t("contactTitle")}
          </h2>
          <p className="font-body text-muted-foreground mb-12">{t("contactSubtitle")}</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {contactItems.map((item, i) => (
              <motion.a
                key={item.labelKey}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 min-h-[44px] p-5 border border-border rounded-lg glass-dark hover:neon-border-pink active:opacity-90 transition-all duration-500 group touch-manipulation"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              >
                <item.icon className="w-5 h-5 text-primary group-hover:text-neon-cyan transition-colors" />
                <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {t(item.labelKey)}
                </span>
              </motion.a>
            ))}
          </div>

          <motion.a
            href="mailto:info@cosmicrendezvous.ch"
            className="inline-block min-h-[44px] min-w-[44px] px-12 py-4 font-display text-sm tracking-[0.2em] uppercase border border-primary text-primary-foreground bg-primary/20 hover:bg-primary/40 active:bg-primary/50 transition-all duration-300 rounded-sm neon-border-pink animate-pulse-glow touch-manipulation"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            {t("contactCta")}
          </motion.a>
        </motion.div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border text-center">
          <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">
            {t("footer")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
