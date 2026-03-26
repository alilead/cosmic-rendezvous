import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const EVENT_TYPES = ["meeting_phone", "meeting_in_person", "meeting_video", "other"];
const FROM = "Cosmic Cafe <info@cosmic-cafe.ch>";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(res, statusCode, data) {
  const ch = corsHeaders();
  for (const [k, v] of Object.entries(ch)) res.setHeader(k, v);
  res.status(statusCode).setHeader("Content-Type", "application/json").send(JSON.stringify(data));
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(dateISO) {
  const d = new Date(dateISO + "T12:00:00");
  return d.toLocaleDateString("fr-CH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function eventTypeLabel(type) {
  const labels = {
    meeting_phone: "Appel téléphonique",
    meeting_in_person: "Rencontre sur place",
    meeting_video: "Visioconférence",
    other: "Autre",
    birthday: "Anniversaire",
    private_party: "Fête privée",
    corporate: "Événement corporate",
    dj_night: "DJ night / Soirée",
  };
  return labels[type] ?? type;
}

function guestRequestReceivedHtml(data) {
  const displayDate = formatDate(data.date);
  return `<!doctype html><html lang="fr"><body style="font-family:system-ui,sans-serif;background:#0a0a0f;color:#e8e4dc;margin:0;padding:0;">
    <div style="max-width:600px;margin:0 auto;padding:24px;">
      <h2 style="margin:0 0 8px;color:#e91e8c;letter-spacing:3px;">COSMIC CAFE</h2>
      <p>Bonjour ${escapeHtml(data.name)},</p>
      <p>Nous avons bien reçu votre demande de rendez-vous pour discuter de la location de l'espace.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        <tr><td style="padding:6px 0;color:#00e5ff;">Date</td><td style="padding:6px 0;text-align:right;">${escapeHtml(displayDate)}</td></tr>
        <tr><td style="padding:6px 0;color:#00e5ff;">Heure</td><td style="padding:6px 0;text-align:right;">${escapeHtml(data.time)}</td></tr>
        <tr><td style="padding:6px 0;color:#00e5ff;">Format</td><td style="padding:6px 0;text-align:right;">${escapeHtml(eventTypeLabel(data.event_type))}</td></tr>
        <tr><td style="padding:6px 0;color:#00e5ff;">Personnes</td><td style="padding:6px 0;text-align:right;">${escapeHtml(data.guest_count)}</td></tr>
        <tr><td style="padding:6px 0;color:#00e5ff;">Téléphone</td><td style="padding:6px 0;text-align:right;">${escapeHtml(data.phone)}</td></tr>
      </table>
      <p style="margin-top:18px;">À bientôt, l'équipe Cosmic Cafe.</p>
    </div>
  </body></html>`;
}

function barNotificationHtml(data) {
  const displayDate = formatDate(data.date);
  const msg = data.message ? `<li><strong>Message:</strong> ${escapeHtml(data.message)}</li>` : "";
  return `<p><strong>Nouvelle demande (location)</strong> — Cosmic Cafe</p>
    <ul>
      <li><strong>Nom:</strong> ${escapeHtml(data.name)}</li>
      <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
      <li><strong>Téléphone:</strong> ${escapeHtml(data.phone)}</li>
      <li><strong>Date:</strong> ${escapeHtml(displayDate)}</li>
      <li><strong>Heure:</strong> ${escapeHtml(data.time)}</li>
      <li><strong>Format:</strong> ${escapeHtml(eventTypeLabel(data.event_type))}</li>
      <li><strong>Personnes:</strong> ${escapeHtml(data.guest_count)}</li>
      ${msg}
    </ul>`;
}

export default async function booking(req, res) {
  const method = (req.method ?? "GET").toUpperCase();

  if (method === "OPTIONS") {
    res.status(204);
    const ch = corsHeaders();
    for (const [k, v] of Object.entries(ch)) res.setHeader(k, v);
    res.send("");
    return;
  }

  if (method !== "POST") {
    json(res, 405, { error: "Method not allowed" });
    return;
  }

  // Debug marker: helps confirm Vercel is invoking this exact file.
  // Remove once booking email flow is confirmed working.
  json(res, 200, { marker: "booking.js", typeofReqBody: typeof req.body });
  return;

  let key = process.env.RESEND_API_KEY;
  if (!key) {
    json(res, 503, { error: "Booking service not configured" });
    return;
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    json(res, 503, { error: "Booking service not configured" });
    return;
  }

  let body;
  try {
    body = req.body ?? {};
    if (typeof body === "string") {
      const t = body.trim();
      // Vercel should usually provide a parsed object, but sometimes this comes as a string.
      // Be tolerant: attempt to parse the JSON object inside the string.
      const firstCurly = t.indexOf("{");
      const lastCurly = t.lastIndexOf("}");
      const firstSquare = t.indexOf("[");
      const lastSquare = t.lastIndexOf("]");

      const looksLikeJsonObject = t.startsWith("{") && lastCurly > firstCurly;
      const looksLikeJsonArray = t.startsWith("[") && lastSquare > firstSquare;

      if (looksLikeJsonObject) {
        body = JSON.parse(t);
      } else if (looksLikeJsonArray) {
        body = JSON.parse(t);
      } else if (firstCurly !== -1 && lastCurly !== -1 && lastCurly > firstCurly) {
        body = JSON.parse(t.slice(firstCurly, lastCurly + 1));
      } else if (firstSquare !== -1 && lastSquare !== -1 && lastSquare > firstSquare) {
        body = JSON.parse(t.slice(firstSquare, lastSquare + 1));
      } else {
        body = JSON.parse(t); // will throw
      }
    }
  } catch (e) {
    const preview = typeof req.body === "string" ? req.body.slice(0, 200) : null;
    json(res, 400, { error: "Invalid JSON", typeofBody: typeof req.body, bodyPreview: preview });
    return;
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const date = typeof body.date === "string" ? body.date.trim() : "";
  const time = typeof body.time === "string" ? body.time.trim() : "";
  const guestCount = typeof body.guest_count === "number" ? body.guest_count : Number(body.guest_count);
  const eventType = EVENT_TYPES.includes(body.event_type) ? body.event_type : "other";
  const message = body.message != null && body.message !== "" ? String(body.message).trim() : null;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (name.length < 2 || !emailOk || phone.length < 10 || !date || !time || !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 200) {
    json(res, 400, { error: "Invalid booking data" });
    return;
  }

  const BAR_EMAIL = process.env.BAR_EMAIL?.trim() || "info@cosmic-cafe.ch";

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  const resend = new Resend(key);

  try {
    const { data: inserted, error: insertErr } = await supabase
      .from("bookings")
      .insert({
        name,
        email,
        phone,
        date,
        time,
        guest_count: guestCount,
        event_type: eventType,
        message,
        status: "request",
      })
      .select("id")
      .single();

    if (insertErr || !inserted) {
      console.error("[booking] Supabase insert failed:", insertErr);
      json(res, 500, { error: "Failed to save request", details: insertErr?.message ?? null });
      return;
    }

    let guestEmailSent = false;
    let barEmailSent = false;

    const emailData = { name, email, phone, date, time, guest_count: guestCount, event_type: eventType, message };

    try {
      const { error: guestErr } = await resend.emails.send({
        from: FROM,
        to: [email],
        subject: `Rendez-vous location – Cosmic Cafe – ${name}`,
        html: guestRequestReceivedHtml(emailData),
      });
      guestEmailSent = !guestErr;
      if (guestErr) console.error("[booking] guest email failed:", guestErr);
    } catch (e) {
      console.error("[booking] guest email threw:", e);
    }

    try {
      const { error: barErr } = await resend.emails.send({
        from: FROM,
        to: [BAR_EMAIL],
        subject: `[Cosmic] Nouveau rendez-vous location : ${name} – ${date} ${time}`,
        html: barNotificationHtml(emailData),
      });
      barEmailSent = !barErr;
      if (barErr) console.error("[booking] bar email failed:", barErr);
    } catch (e) {
      console.error("[booking] bar email threw:", e);
    }

    json(res, 200, { success: true, confirmed: false, emailSent: guestEmailSent, guestEmailSent, barEmailSent });
  } catch (e) {
    console.error("[booking] error:", e);
    json(res, 500, { error: "Failed to process booking" });
  }
}

