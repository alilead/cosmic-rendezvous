import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { isFreeDrinkPromotionActive } from "@/lib/freeDrinkPromotion";

function MarqueeSegment({
  active,
  ariaHidden,
}: {
  active: boolean;
  ariaHidden?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <div
      className="flex shrink-0 items-center gap-3 px-6 py-2 text-sm md:text-base"
      aria-hidden={ariaHidden}
    >
      <Gamepad2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      <span className="whitespace-nowrap font-display tracking-wide text-primary">{t("freeDrinkBannerTitle")}</span>
      <span className="text-muted-foreground">·</span>
      <span className="whitespace-nowrap text-muted-foreground">
        {active ? t("freeDrinkBannerBodyActive") : t("freeDrinkBannerBodyInactive")}
      </span>
      <span className="text-muted-foreground">·</span>
      <Link
        to="/game"
        className="whitespace-nowrap font-display text-xs uppercase tracking-[0.15em] text-secondary underline-offset-4 hover:text-primary hover:underline"
      >
        {t("freeDrinkBannerCta")}
      </Link>
      <span className="px-4 text-primary/40" aria-hidden>
        ◆
      </span>
    </div>
  );
}

export default function FreeDrinkBanner() {
  const active = isFreeDrinkPromotionActive();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      className={`relative z-30 overflow-hidden border-b ${
        active ? "border-primary/40 bg-primary/10" : "border-border/80 bg-muted/30"
      }`}
    >
      {reduceMotion ? (
        <div className="flex justify-center py-1">
          <MarqueeSegment active={active} />
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee">
            <MarqueeSegment active={active} />
            <MarqueeSegment active={active} ariaHidden />
          </div>
        </div>
      )}
    </div>
  );
}
