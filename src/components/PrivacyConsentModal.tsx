import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

/** Must match `public/alien-jump.html` (game iframe reads same key). */
export const PRIVACY_CONSENT_STORAGE_KEY = "cosmic-privacy-consent-v1";

export function PrivacyConsentModal() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(PRIVACY_CONSENT_STORAGE_KEY) === "1") return;
    } catch {
      return;
    }
    setOpen(true);
  }, []);

  const handleAccept = useCallback(() => {
    if (!checked) return;
    try {
      localStorage.setItem(PRIVACY_CONSENT_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
    window.dispatchEvent(new Event("cosmic-privacy-consent"));
    document.querySelectorAll("iframe").forEach((frame) => {
      try {
        frame.contentWindow?.postMessage({ type: "cosmic-privacy-consent" }, "*");
      } catch {
        /* ignore */
      }
    });
  }, [checked]);

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="font-display tracking-wide">{t("privacyModalTitle")}</DialogTitle>
          <DialogDescription>{t("privacyModalIntro")}</DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-3 py-2">
          <Checkbox
            id="privacy-site-consent"
            checked={checked}
            onCheckedChange={(v) => setChecked(v === true)}
            className="mt-1"
          />
          <Label htmlFor="privacy-site-consent" className="text-sm font-normal leading-relaxed cursor-pointer">
            {t("privacyModalCheckboxBefore")}{" "}
            <Link to="/privacy-policy" className="text-primary underline underline-offset-2">
              {t("privacyModalReadPolicy")}
            </Link>
            .
          </Label>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleAccept} disabled={!checked} className="w-full sm:w-auto min-h-11">
            {t("privacyModalAccept")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
