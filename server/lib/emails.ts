const EVENT_TYPE_LABELS_FR: Record<string, string> = {
  meeting_phone: "Appel téléphonique",
  meeting_in_person: "Rencontre sur place",
  meeting_video: "Visioconférence",
  other: "Autre",
  birthday: "Anniversaire",
  private_party: "Fête privée",
  corporate: "Événement corporate",
  dj_night: "DJ night / Soirée",
};

const EVENT_TYPE_LABELS_EN: Record<string, string> = {
  meeting_phone: "Phone call",
  meeting_in_person: "In-person meeting",
  meeting_video: "Video conference",
  other: "Other",
  birthday: "Birthday",
  private_party: "Private party",
  corporate: "Corporate event",
  dj_night: "DJ night / Party",
};

function formatDate(iso: string, lang: "fr" | "en" = "fr"): string {
  const d = new Date(iso + "T12:00:00");
  const locale = lang === "en" ? "en-US" : "fr-CH";
  return d.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function eventTypeLabel(type: string, lang: "fr" | "en" = "fr"): string {
  const labels = lang === "en" ? EVENT_TYPE_LABELS_EN : EVENT_TYPE_LABELS_FR;
  return labels[type] ?? type;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type BookingEmailData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guest_count: number;
  event_type: string;
  message?: string | null;
  lang?: "fr" | "en";
};

/** Guest: request received (space rental is always request, then bar confirms). */
export function guestRequestReceivedHtml(data: BookingEmailData): string {
  const lang = data.lang || "fr";
  const displayDate = formatDate(data.date, lang);
  const pink = "#e91e8c";
  const cyan = "#00e5ff";
  
  const translations = {
    fr: {
      tagline: "Bar électro-alien",
      greeting: `Bonjour ${data.name},`,
      body: "Nous avons bien reçu votre demande de rendez-vous pour discuter de la location de l'espace. Nous vous recontacterons pour convenir d'un échange (téléphone, sur place ou visio).",
      date: "Date",
      time: "Heure souhaitée",
      format: "Format d'échange",
      guests: "Nombre de personnes",
      phone: "Téléphone",
      message: "Message",
      city: "Genève",
    },
    en: {
      tagline: "Geneva's alien bar",
      greeting: `Hello ${data.name},`,
      body: "We have received your meeting request to discuss renting the space. We will contact you to arrange an exchange (phone, in person, or video).",
      date: "Date",
      time: "Preferred time",
      format: "Meeting format",
      guests: "Number of people",
      phone: "Phone",
      message: "Message",
      city: "Geneva",
    },
  };
  
  const t = translations[lang];
  
  return `
<!DOCTYPE html><html lang="${lang}"><body style="margin:0;padding:0;background:#0a0a0f;font-family:system-ui,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;"><tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111;border:1px solid ${pink};">
<tr><td style="padding:32px 24px;text-align:center;">
  <p style="margin:0;font-size:11px;letter-spacing:4px;color:${cyan};">${t.tagline}</p>
  <h1 style="margin:8px 0 0;font-size:28px;letter-spacing:4px;color:${pink};">COSMIC CAFE</h1>
  <p style="margin:4px 0 0;font-size:12px;color:#888;">${t.city}</p>
</td></tr>
<tr><td style="padding:0 24px 24px;">
  <p style="margin:0;font-size:16px;color:#e0e0e0;">${t.greeting}</p>
  <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#b0b0b0;">${t.body}</p>
</td></tr>
<tr><td style="padding:0 24px 24px;">
  <table width="100%" cellpadding="12" cellspacing="0" style="background:#1a1a24;border:1px solid #333;">
  <tr><td style="font-size:13px;color:${cyan};">${t.date}</td><td style="text-align:right;font-size:14px;color:#e0e0e0;">${displayDate}</td></tr>
  <tr><td style="font-size:13px;color:${cyan};">${t.time}</td><td style="text-align:right;font-size:14px;color:#e0e0e0;">${data.time}</td></tr>
  <tr><td style="font-size:13px;color:${cyan};">${t.format}</td><td style="text-align:right;font-size:14px;color:#e0e0e0;">${eventTypeLabel(data.event_type, lang)}</td></tr>
  <tr><td style="font-size:13px;color:${cyan};">${t.guests}</td><td style="text-align:right;font-size:14px;color:#e0e0e0;">${data.guest_count}</td></tr>
  <tr><td style="font-size:13px;color:${cyan};">${t.phone}</td><td style="text-align:right;font-size:14px;color:#e0e0e0;">${data.phone}</td></tr>
  ${data.message ? `<tr><td colspan="2" style="padding-top:12px;border-top:1px solid #333;font-size:13px;color:${cyan};">${t.message}</td></tr><tr><td colspan="2" style="font-size:14px;color:#e0e0e0;">${data.message}</td></tr>` : ""}
  </table>
</td></tr>
<tr><td style="padding:24px;text-align:center;font-size:13px;color:#666;">${t.city} · <a href="tel:+41795247754" style="color:${pink};">+41 79 524 77 54</a> · <a href="mailto:info@cosmic-cafe.ch" style="color:${pink};">info@cosmic-cafe.ch</a></td></tr>
</table></td></tr></table></body></html>`;
}

/** Bar: new rental request. */
export function barNotificationHtml(data: BookingEmailData): string {
  const lang = data.lang || "fr";
  const displayDate = formatDate(data.date, lang);
  const langLabel = lang === "en" ? "🇬🇧 EN" : "🇫🇷 FR";
  return `<p><strong>Nouvelle demande de rendez-vous (location) – Cosmic Cafe ${langLabel}</strong></p><ul>
<li><strong>Nom:</strong> ${data.name}</li>
<li><strong>Email:</strong> ${data.email}</li>
<li><strong>Téléphone:</strong> ${data.phone}</li>
<li><strong>Date:</strong> ${displayDate}</li>
<li><strong>Heure souhaitée:</strong> ${data.time}</li>
<li><strong>Format d'échange:</strong> ${eventTypeLabel(data.event_type, lang)}</li>
<li><strong>Nombre de personnes:</strong> ${data.guest_count}</li>
<li><strong>Langue:</strong> ${langLabel}</li>
${data.message ? `<li><strong>Message:</strong> ${data.message}</li>` : ""}
</ul>`;
}

/** Player: ranked in today’s top 3 on Alien Jump (free drink; promo is 24/7). */
export function dailyTopThreePlayerHtml(data: { playerName: string; score: number; rank: number }): string {
  const name = escapeHtml(data.playerName);
  const pink = "#e91e8c";
  const cyan = "#00e5ff";
  const rankLabel = data.rank === 1 ? "1er" : data.rank === 2 ? "2e" : "3e";
  return `
<!DOCTYPE html><html lang="fr"><body style="margin:0;padding:0;background:#0a0a0f;font-family:system-ui,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;"><tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111;border:1px solid ${pink};">
<tr><td style="padding:32px 24px;text-align:center;">
  <p style="margin:0;font-size:11px;letter-spacing:4px;color:${cyan};">Alien Jump · Cosmic Cafe</p>
  <h1 style="margin:8px 0 0;font-size:24px;letter-spacing:3px;color:${pink};">Top 3 du jour — ${rankLabel} place</h1>
</td></tr>
<tr><td style="padding:0 24px 24px;">
  <p style="margin:0;font-size:16px;color:#e0e0e0;">Bravo ${name},</p>
  <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#b0b0b0;">Tu fais partie du <strong style="color:#fff;">top 3 des scores du jour</strong> (${rankLabel}) avec <strong style="color:${cyan};">${data.score}</strong> points.</p>
  <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#b0b0b0;">Présente cet email au bar : <strong style="color:#fff;">une boisson offerte</strong> t’attend (selon disponibilité, sur présentation de ce message).</p>
</td></tr>
<tr><td style="padding:24px;text-align:center;font-size:13px;color:#666;">Cosmic Cafe · Genève</td></tr>
</table></td></tr></table></body></html>`;
}

/** Bar: top-3 daily finisher (free drink). */
export function dailyTopThreeBarHtml(data: {
  playerName: string;
  score: number;
  rank: number;
  email: string | null;
}): string {
  const name = escapeHtml(data.playerName);
  const em = data.email ? escapeHtml(data.email) : "—";
  return `<p><strong>Alien Jump — Top 3 du jour (#${data.rank})</strong></p>
<ul>
<li><strong>Joueur:</strong> ${name}</li>
<li><strong>Rang du jour:</strong> ${data.rank}</li>
<li><strong>Score:</strong> ${data.score}</li>
<li><strong>Email:</strong> ${em}</li>
</ul>
<p>Prévoir <strong>une boisson offerte</strong> pour ce joueur s’il se présente au bar (vérifiez l’identité / le message).</p>`;
}
