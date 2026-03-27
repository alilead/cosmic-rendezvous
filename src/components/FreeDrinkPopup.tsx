import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DISMISS_KEY = "cosmic-free-drink-popup-dismissed-v1";

export default function FreeDrinkPopup() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
    if (!dismissed) setOpen(true);
  }, []);

  const close = () => {
    window.localStorage.setItem(DISMISS_KEY, "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 px-4">
      <div className="relative w-full max-w-md rounded-lg border border-primary/40 bg-card p-6 text-card-foreground shadow-2xl">
        <button
          type="button"
          aria-label={t("freeDrinkPopupClose")}
          onClick={close}
          className="absolute right-3 top-3 rounded-sm p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-primary/15">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
        </div>

        <h3 className="mb-2 text-center font-display text-xl tracking-[0.08em] text-primary">
          {t("freeDrinkPopupTitle")}
        </h3>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          {t("freeDrinkPopupBody")}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={close}
            className="min-h-[44px] rounded-sm border border-border px-4 text-sm font-medium text-foreground hover:bg-muted"
          >
            {t("freeDrinkPopupClose")}
          </button>
          <Link
            to="/game"
            onClick={close}
            className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t("freeDrinkPopupCta")}
          </Link>
        </div>
      </div>
    </div>
  );
}

