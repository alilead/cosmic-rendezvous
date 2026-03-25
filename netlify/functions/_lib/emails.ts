const EVENT_TYPE_LABELS: Record<string, string> = {
  meeting_phone: "Appel téléphonique",
  meeting_in_person: "Rencontre sur place",
  meeting_video: "Visioconférence",
  other: "Autre",
  birthday: "Anniversaire",
  private_party: "Fête privée",
  corporate: "Événement corporate",
  dj_night: "DJ night / Soirée",
};

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("fr-CH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function eventTypeLabel(type: string): string {
  return EVENT_TYPE_LABELS[type] ?? type;
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
};

/** Guest: request received (space rental is always request, then bar confirms). */
export function guestRequestReceivedHtml(data: BookingEmailData): string {
  const displayDate = formatDate(data.date);
  const pink = "#e91e8c";
  const cyan = "#00e5ff";
  return `
<!DOCTYPE html><html lang="fr"><body style="margin:0;padding:0;background:#0a0a0f;font-family:system-ui,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;"><tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111;border:1px solid ${pink};">
<tr><td style="padding:32px 24px;text-align:center;">
  <p style="margin:0;font-size:11px;letter-spacing:4px;color:${cyan};">Bar électro-alien</p>
  <h1 style="margin:8px 0 0;font-size:28px;letter-spacing:4px;color:${pink};">COSMIC CAFE</h1>
  <p style="margin:4px 0 0;font-size:12px;color:#888;">Genève</p>
</td></tr>
<tr><td style="padding:0 24px 24px;">
  <p style="margin:0;font-size:16px;color:#e0e0e0;">Bonjour ${data.name},</p>
  <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#b0b0b0;">Nous avons bien reçu votre demande de rendez-vous pour discuter de la location de l'espace. Nous vous recontacterons pour convenir d'un échange (téléphone, sur place ou visio).</p>
</td></tr>
<tr><td style="padding:0 24px 24px;">
  <table width="100%" cellpadding="12" cellspacing="0" style="background:#1a1a24;border:1px solid #333;">
  <tr><td style="font-size:13px;color:${cyan};">Date</td><td style="text-align:right;font-size:14px;color:#e0e0e0;">${displayDate}</td></tr>
  <tr><td style="font-size:13px;color:${cyan};">Heure souhaitée</td><td style="text-align:right;font-size:14px;color:#e0e0e0;">${data.time}</td></tr>
  <tr><td style="font-size:13px;color:${cyan};">Format d'échange</td><td style="text-align:right;font-size:14px;color:#e0e0e0;">${eventTypeLabel(data.event_type)}</td></tr>
  <tr><td style="font-size:13px;color:${cyan};">Nombre de personnes</td><td style="text-align:right;font-size:14px;color:#e0e0e0;">${data.guest_count}</td></tr>
  <tr><td style="font-size:13px;color:${cyan};">Téléphone</td><td style="text-align:right;font-size:14px;color:#e0e0e0;">${data.phone}</td></tr>
  ${data.message ? `<tr><td colspan="2" style="padding-top:12px;border-top:1px solid #333;font-size:13px;color:${cyan};">Message</td></tr><tr><td colspan="2" style="font-size:14px;color:#e0e0e0;">${data.message}</td></tr>` : ""}
  </table>
</td></tr>
<tr><td style="padding:24px;text-align:center;font-size:13px;color:#666;">Genève · <a href="tel:+41795247754" style="color:${pink};">+41 79 524 77 54</a> · <a href="mailto:info@cosmicrendezvous.ch" style="color:${pink};">info@cosmicrendezvous.ch</a></td></tr>
</table></td></tr></table></body></html>`;
}

/** Bar: new rental request. */
export function barNotificationHtml(data: BookingEmailData): string {
  const displayDate = formatDate(data.date);
  return `<p><strong>Nouvelle demande de rendez-vous (location) – Cosmic Cafe</strong></p><ul>
<li><strong>Nom:</strong> ${data.name}</li>
<li><strong>Email:</strong> ${data.email}</li>
<li><strong>Téléphone:</strong> ${data.phone}</li>
<li><strong>Date:</strong> ${displayDate}</li>
<li><strong>Heure souhaitée:</strong> ${data.time}</li>
<li><strong>Format d'échange:</strong> ${eventTypeLabel(data.event_type)}</li>
<li><strong>Nombre de personnes:</strong> ${data.guest_count}</li>
${data.message ? `<li><strong>Message:</strong> ${data.message}</li>` : ""}
</ul>`;
}

/** Player: new daily high score on Alien Jump (optional reward at the bar). */
export function dailyHighPlayerHtml(data: { playerName: string; score: number }): string {
  const name = escapeHtml(data.playerName);
  const pink = "#e91e8c";
  const cyan = "#00e5ff";
  return `
<!DOCTYPE html><html lang="fr"><body style="margin:0;padding:0;background:#0a0a0f;font-family:system-ui,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;"><tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111;border:1px solid ${pink};">
<tr><td style="padding:32px 24px;text-align:center;">
  <p style="margin:0;font-size:11px;letter-spacing:4px;color:${cyan};">Alien Jump · Cosmic Cafe</p>
  <h1 style="margin:8px 0 0;font-size:24px;letter-spacing:3px;color:${pink};">Top score du jour !</h1>
</td></tr>
<tr><td style="padding:0 24px 24px;">
  <p style="margin:0;font-size:16px;color:#e0e0e0;">Bravo ${name},</p>
  <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#b0b0b0;">Tu viens d’établir le <strong style="color:#fff;">meilleur score du jour</strong> avec <strong style="color:${cyan};">${data.score}</strong> points.</p>
  <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#b0b0b0;">Présente cet email au bar : <strong style="color:#fff;">une boisson offerte</strong> t’attend (selon disponibilité, sur présentation de ce message).</p>
</td></tr>
<tr><td style="padding:24px;text-align:center;font-size:13px;color:#666;">Cosmic Cafe · Genève</td></tr>
</table></td></tr></table></body></html>`;
}

/** Bar: notify team that someone beat today’s high score (free drink). */
export function dailyHighBarHtml(data: {
  playerName: string;
  score: number;
  email: string | null;
}): string {
  const name = escapeHtml(data.playerName);
  const em = data.email ? escapeHtml(data.email) : "—";
  return `<p><strong>Alien Jump — nouveau record du jour</strong></p>
<ul>
<li><strong>Joueur:</strong> ${name}</li>
<li><strong>Score:</strong> ${data.score}</li>
<li><strong>Email:</strong> ${em}</li>
</ul>
<p>Prévoir <strong>une boisson offerte</strong> pour ce joueur s’il se présente au bar (vérifiez l’identité / le message).</p>`;
}
