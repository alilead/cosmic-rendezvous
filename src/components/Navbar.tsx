import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Location", href: "#rental" },
  { label: "Menu", href: "#menu" },
  { label: "Galerie", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 glass-dark"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button type="button" onClick={() => scrollTo("#hero")} className="flex items-center gap-3 min-h-[44px] min-w-[44px] touch-manipulation py-1">
          <img src="/logo.png" alt="Cosmic Rendezvous" className="h-10 w-auto" />
          <span className="font-display text-lg tracking-[0.2em] neon-glow-pink hidden sm:inline">COSMIC RENDEZVOUS</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="min-h-[44px] min-w-[44px] text-sm font-body tracking-wider text-muted-foreground hover:text-primary active:text-primary transition-colors duration-300 uppercase touch-manipulation px-2"
            >
              {item.label}
            </button>
          ))}
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
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="min-h-[44px] min-w-[44px] w-full text-sm font-body tracking-wider text-muted-foreground hover:text-primary active:text-primary transition-colors uppercase touch-manipulation py-3"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
