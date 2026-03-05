import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/i18n/translations";

type MenuItem = { name: string; price: string };
type MenuCategory = { titleKey: TranslationKey; note?: string; items: MenuItem[] };

const menu: MenuCategory[] = [
  {
    titleKey: "menuCatHot",
    items: [
      { name: "Café / Thé", price: "3.50" },
      { name: "Lait", price: "3.–" },
      { name: "Renversé / Cappuccino", price: "4.50" },
      { name: "Iced Coffee", price: "4.50" },
      { name: "Chocolat Chaud", price: "4.50" },
      { name: "Hot Ginger", price: "5.–" },
      { name: "Grog", price: "9.–" },
    ],
  },
  {
    titleKey: "menuCatSofts",
    note: "3 dl",
    items: [
      { name: "Sirop", price: "3.–" },
      { name: "Limonade", price: "3.–" },
      { name: "Pepsi / Pepsi O / Ice Tea", price: "4.–" },
      { name: "Jus / Eau Gaz / Tonic", price: "4.–" },
      { name: "Ginger Ale", price: "5.–" },
      { name: "Maté / Ginger Beer", price: "5.–" },
    ],
  },
  {
    titleKey: "menuCatBeers",
    note: "30 cl / 50 cl",
    items: [
      { name: "Blonde", price: "4.– / 7.–" },
      { name: "Blanche", price: "5.50 / 9.–" },
      { name: "IPA", price: "5.50 / 8.–" },
      { name: "Supp Ginger", price: "+1.–" },
    ],
  },
  {
    titleKey: "menuCatWines",
    note: "15 dl",
    items: [
      { name: "Chasselas", price: "6.–" },
      { name: "Gamaret", price: "6.–" },
      { name: "Rosé", price: "6.–" },
      { name: "Chardonnay", price: "7.50" },
      { name: "Pinot", price: "7.50" },
      { name: "Prosecco", price: "7.–" },
    ],
  },
  {
    titleKey: "menuCatShots",
    note: "2 cl",
    items: [
      { name: "Berliner", price: "4.–" },
      { name: "Rhum / Vodka / Amaretto", price: "5.–" },
      { name: "Tequila", price: "5.– / 7.–" },
      { name: "Mezcal", price: "7.– / 9.–" },
    ],
  },
  {
    titleKey: "menuCatLong",
    items: [
      { name: "Vodka Maté", price: "" },
      { name: "Mule (Moscow / Jamaican / London)", price: "" },
      { name: "Marry Love Bloody", price: "" },
      { name: "Vodka / Gin", price: "" },
      { name: "Rhum / Whisky + Soft", price: "" },
    ],
  },
  {
    titleKey: "menuCatApero",
    items: [
      { name: "Suze / Martini / Ricard", price: "" },
      { name: "Williamine / Abricotine", price: "" },
      { name: "Moitié Moitié (Poire / Abricot)", price: "" },
      { name: "Baileys", price: "" },
      { name: "Absinthe", price: "" },
      { name: "Cognac", price: "" },
      { name: "Armagnac", price: "" },
      { name: "Spritz Aperol", price: "" },
      { name: "Spritz Campari", price: "" },
      { name: "Hugo", price: "13.–" },
    ],
  },
];

const MenuSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="menu" className="relative py-24 md:py-32 cosmic-gradient noise-bg scroll-mt-20">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-[0.1em] mb-4 neon-glow-cyan">
            {t("menuTitle")}
          </h2>
          <p className="font-body text-muted-foreground">{t("menuSubtitle")}</p>
        </motion.div>

        {/* Scrollable category cards */}
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory -mx-4 px-4">
          {menu.map((cat, i) => (
            <motion.div
              key={cat.titleKey}
              className="min-w-[300px] md:min-w-[340px] snap-center border border-border rounded-lg p-6 glass-dark group hover:neon-border-cyan transition-all duration-500 flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
            >
              <div className="flex items-baseline gap-3 mb-5">
                <h3 className="font-display text-base tracking-[0.15em] text-neon-cyan uppercase">
                  {t(cat.titleKey)}
                </h3>
                {cat.note && (
                  <span className="text-xs font-body text-muted-foreground">[{cat.note}]</span>
                )}
              </div>

              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex justify-between items-baseline gap-4 group/item">
                    <span className="font-body text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                      {item.name}
                    </span>
                    {item.price && (
                      <span className="font-display text-sm text-primary whitespace-nowrap">
                        {item.price}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
