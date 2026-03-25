import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { isFreeDrinkPromotionActive } from "@/lib/freeDrinkPromotion";

export default function FreeDrinkBanner() {
  const { t } = useLanguage();
  const active = isFreeDrinkPromotionActive();

  return (
    <div
      className={`relative z-30 border-b px-4 py-3 text-center transition-colors ${
        active
          ? "border-primary/40 bg-primary/10"
          : "border-border/80 bg-muted/30"
      }`}
    >
      <p className="text-sm md:text-base font-body text-foreground max-w-3xl mx-auto leading-snug">
        <span className="inline-flex items-center justify-center gap-2 align-middle">
          <Gamepad2 className="w-4 h-4 shrink-0 text-primary" aria-hidden />
          <span className="font-display tracking-wide text-primary">{t("freeDrinkBannerTitle")}</span>
        </span>
        <span className="block mt-1 text-muted-foreground">
          {active ? t("freeDrinkBannerBodyActive") : t("freeDrinkBannerBodyInactive")}
        </span>
      </p>
      <Link
        to="/game"
        className="inline-block mt-2 font-display text-xs md:text-sm tracking-[0.15em] uppercase text-secondary hover:text-primary underline underline-offset-4"
      >
        {t("freeDrinkBannerCta")}
      </Link>
    </div>
  );
}
