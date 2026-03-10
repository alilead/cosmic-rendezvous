import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navKeys = [
  { key: "navHome" as const, href: "#hero" },
  { key: "navAbout" as const, href: "#about" },
  { key: "navRental" as const, href: "#rental" },
  { key: "navMenu" as const, href: "#menu" },
  { key: "navGallery" as const, href: "#gallery" },
  { key: "navContact" as const, href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();

  const scrollTo = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 glass-dark"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between min-w-0 safe-area-padding">
        <button type="button" onClick={() => scrollTo("#hero")} className="flex items-center gap-3 min-h-[44px] min-w-[44px] touch-manipulation py-1">
          <img src="/logo.png" alt={t("altLogo")} className="h-10 w-auto" />
          <span className="font-display text-lg tracking-[0.2em] neon-glow-pink hidden sm:inline whitespace-nowrap">COSMIC RENDEZ-VOUS</span>
        </button>

        {/* Desktop: nav + language switch */}
        <div className="hidden md:flex items-center gap-6">
          {navKeys.map(({ key, href }) => (
            <button
              type="button"
              key={href}
              onClick={() => scrollTo(href)}
              className="min-h-[44px] min-w-[44px] text-sm font-body tracking-wider text-muted-foreground hover:text-primary active:text-primary transition-colors duration-300 uppercase touch-manipulation px-2"
            >
              {t(key)}
            </button>
          ))}
          <div className="flex items-center gap-0 border border-border rounded-sm overflow-hidden ml-2">
            <button
              type="button"
              onClick={() => setLang("fr")}
              className={`min-h-[36px] min-w-[44px] px-2 text-xs font-display uppercase touch-manipulation transition-colors ${lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Français"
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`min-h-[36px] min-w-[44px] px-2 text-xs font-display uppercase touch-manipulation transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile toggle */}
        <button type="button" aria-label="Menu" className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-foreground touch-manipulation" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden glass-dark border-t border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-col items-center py-6 gap-4">
              {navKeys.map(({ key, href }) => (
                <button
                  type="button"
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="min-h-[44px] min-w-[44px] w-full text-sm font-body tracking-wider text-muted-foreground hover:text-primary active:text-primary transition-colors uppercase touch-manipulation py-3"
                >
                  {t(key)}
                </button>
              ))}
              <div className="flex items-center gap-0 border border-border rounded-sm overflow-hidden mt-2">
                <button
                  type="button"
                  onClick={() => { setLang("fr"); setIsOpen(false); }}
                  className={`min-h-[40px] min-w-[52px] px-3 text-xs font-display uppercase touch-manipulation ${lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => { setLang("en"); setIsOpen(false); }}
                  className={`min-h-[40px] min-w-[52px] px-3 text-xs font-display uppercase touch-manipulation ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  EN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
