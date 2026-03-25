/** Same rules as src/lib/freeDrinkPromotion.ts (Mon–Sat Zurich, from 12:30). */

const TZ = "Europe/Zurich";

export function isFreeDrinkPromotionActive(now = new Date()): boolean {
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(now);
  if (weekday === "Sun") return false;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);
  const mins = hour * 60 + minute;
  const afterLunch = 12 * 60 + 30;
  return mins >= afterLunch && mins < 24 * 60;
}
