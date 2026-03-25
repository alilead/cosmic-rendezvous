import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { isFreeDrinkPromotionActive } from "@/lib/freeDrinkPromotion";

export default function Game() {
  const { t } = useLanguage();
  const promo = isFreeDrinkPromotionActive();

  return (
    <div className="min-h-screen bg-background overflow-hidden flex flex-col">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="flex-1 flex flex-col md:pt-16 overflow-hidden md:px-4">
        <div className="flex flex-col items-center flex-1 min-h-0 max-w-[800px] w-full mx-auto md:py-4">
          <h1 className="hidden md:block font-display text-2xl tracking-wider text-primary mb-2 shrink-0">Alien Jump</h1>
          <p className="hidden md:block text-muted-foreground text-sm mb-2 shrink-0">The Alien · Jump between platforms</p>
          <p
            className={`text-xs text-center max-w-md mb-4 shrink-0 px-2 ${promo ? "text-secondary" : "text-muted-foreground"}`}
          >
            {promo ? t("gamePromoActive") : t("gamePromoInactive")}
          </p>
          <div className="flex-1 min-h-0 w-full flex justify-center">
            <iframe
              src="/alien-jump.html"
              title="Alien Jump"
              className="w-screen h-screen md:w-[740px] md:max-w-full border-0 md:rounded-lg md:shadow-lg bg-transparent md:min-h-[calc(100vh-14rem)]"
            />
          </div>
          <Button variant="ghost" asChild className="hidden md:inline-flex mt-4 shrink-0">
            <Link to="/">← Back to site</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
