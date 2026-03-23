import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { Resend } from "resend";
import { getSupabase, BOOKINGS_TABLE } from "./_lib/supabase";
import { guestRequestReceivedHtml, barNotificationHtml } from "./_lib/emails";

const FROM = "Cosmic Cafe <info@cosmic-cafe.ch>";
const BAR_EMAIL = process.env.BAR_EMAIL?.trim() || "info@cosmic-cafe.ch";

const EVENT_TYPES = ["birthday", "private_party", "corporate", "dj_night", "other"] as const;

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const headers = corsHeaders();
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[booking] RESEND_API_KEY not set");
    return { statusCode: 503, headers, body: JSON.stringify({ error: "Booking service not configured" }) };
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[booking] Supabase not configured");
    return { statusCode: 503, headers, body: JSON.stringify({ error: "Booking service not configured" }) };
  }

  let body: unknown;
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const o = (body ?? {}) as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const date = typeof o.date === "string" ? o.date.trim() : "";
  const time = typeof o.time === "string" ? o.time.trim() : "";
  const guestCount = typeof o.guest_count === "number" ? o.guest_count : Number(o.guest_count);
  const eventType = EVENT_TYPES.includes(o.event_type as (typeof EVENT_TYPES)[number])
    ? (o.event_type as string)
    : "other";
  const message =
    o.message != null && o.message !== "" ? String(o.message).trim() : null;

  if (
    name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    phone.length < 10 ||
    !date ||
    !time ||
    !Number.isInteger(guestCount) ||
    guestCount < 1 ||
    guestCount > 200
  ) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid booking data" }) };
  }

  const dateObj = new Date(date + "T12:00:00");
  if (isNaN(dateObj.getTime())) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid date" }) };
  }

  const resend = new Resend(key);
  const emailData = { name, email, phone, date, time, guest_count: guestCount, event_type: eventType, message };

  try {
    const supabase = getSupabase();
    const { data: inserted, error: insertErr } = await supabase
      .from(BOOKINGS_TABLE)
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
      const isSchema = /column .* does not exist|relation .* does not exist/i.test(insertErr?.message ?? "");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: "Failed to save request",
          ...(isSchema && { details: "Database schema may be out of date. See SUPABASE_SETUP.md." }),
        }),
      };
    }

    let emailSent = true;
    try {
      const { error: sendErr } = await resend.emails.send({
        from: FROM,
        to: [email],
        bcc: [BAR_EMAIL],
        subject: `Demande de location – Cosmic Cafe – ${name}`,
        html: guestRequestReceivedHtml(emailData),
      });
      if (sendErr) {
        console.error("[booking] Guest email failed:", sendErr);
        emailSent = false;
      }
      if (emailSent) {
        const { error: barErr } = await resend.emails.send({
          from: FROM,
          to: [BAR_EMAIL],
          subject: `[Cosmic] Nouvelle demande de location : ${name} – ${date} ${time}`,
          html: barNotificationHtml(emailData),
        });
        if (barErr) console.error("[booking] Bar notification email failed:", barErr);
      }
    } catch (emailError) {
      console.error("[booking] Email send threw:", emailError);
      emailSent = false;
    }

    return {
      statusCode: 200,
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, confirmed: false, emailSent }),
    };
  } catch (err) {
    console.error("[booking] Error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Failed to process booking" }) };
  }
};
