import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const drinks = [
  { name: "Nébuleuse Rose", desc: "Gin, litchi, rose, prosecco", price: "18", category: "Signature" },
  { name: "Alien Acid", desc: "Mezcal, citron vert, agave, vert chartreuse", price: "20", category: "Signature" },
  { name: "Cosmic Spritz", desc: "Aperol, prosecco, soda, zeste cosmique", price: "16", category: "Spritz" },
  { name: "Dark Matter", desc: "Whisky, charbon, miel, fumée", price: "22", category: "Signature" },
  { name: "Plasma Tonic", desc: "Vodka, tonic UV, concombre, basilic", price: "17", category: "Long Drink" },
  { name: "Stardust Margarita", desc: "Tequila, triple sec, citron, sel étoilé", price: "19", category: "Classique" },
];

const MenuSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="menu" className="relative py-24 md:py-32 cosmic-gradient noise-bg">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-[0.1em] mb-4 neon-glow-cyan">
            COCKTAILS COSMIQUES
          </h2>
          <p className="font-body text-muted-foreground">Des élixirs d'un autre monde</p>
        </motion.div>

        {/* Scrollable cards */}
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {drinks.map((drink, i) => (
            <motion.div
              key={drink.name}
              className="min-w-[280px] md:min-w-[320px] snap-center border border-border rounded-lg p-6 glass-dark group hover:neon-border-cyan transition-all duration-500 flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
            >
              <span className="text-xs font-display tracking-[0.2em] text-neon-cyan uppercase">{drink.category}</span>
              <h3 className="font-display text-lg tracking-wider mt-2 mb-3 group-hover:neon-glow-pink transition-all">
                {drink.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-4">{drink.desc}</p>
              <p className="font-display text-2xl text-primary">{drink.price} CHF</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
