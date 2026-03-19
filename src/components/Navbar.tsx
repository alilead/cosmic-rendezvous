import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navKeys = [
  { key: "navHome" as const, href: "#hero" },
  { key: "navAbout" as const, href: "#about" },
  { key: "navRental" as const, path: "/booking" as const },
  { key: "navMenu" as const, href: "#menu" },
  { key: "navGallery" as const, href: "#gallery" },
  { key: "navGame" as const, path: "/game" as const },
  { key: "navContact" as const, href: "#contact" },
];

const navClass =
  "min-h-[44px] min-w-[44px] text-xs font-body tracking-[0.12em] text-muted-foreground hover:text-primary active:text-primary transition-colors duration-300 uppercase touch-manipulation px-1.5 leading-tight flex items-center";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, lang, setLang } = useLanguage();

  const scrollTo = (href: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 glass-dark"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between min-w-0 safe-area-padding">
        <button type="button" onClick={() => scrollTo("#hero")} className="flex items-center gap-3 min-h-[44px] min-w-[44px] touch-manipulation py-1">
          <img src="/logo.png" alt={t("altLogo")} className="h-12 w-auto" />
          <span className="font-display text-base tracking-[0.15em] neon-glow-pink hidden sm:inline whitespace-nowrap">COSMIC RENDEZ-VOUS</span>
        </button>

        {/* Desktop: nav + language switch */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {navKeys.map((item) =>
            "path" in item ? (
              <Link key={item.path} to={item.path} className={navClass}>
                {t(item.key)}
              </Link>
            ) : (
              <button type="button" key={item.href} onClick={() => scrollTo(item.href)} className={navClass}>
                {t(item.key)}
              </button>
            )
          )}
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
              {navKeys.map((item) =>
                "path" in item ? (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="min-h-[44px] w-full text-sm font-body tracking-wider text-muted-foreground hover:text-primary transition-colors uppercase touch-manipulation py-3 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                ) : (
                  <button
                    type="button"
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="min-h-[44px] min-w-[44px] w-full text-sm font-body tracking-wider text-muted-foreground hover:text-primary active:text-primary transition-colors uppercase touch-manipulation py-3"
                  >
                    {t(item.key)}
                  </button>
                )
              )}
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
