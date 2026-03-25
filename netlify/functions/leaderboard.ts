import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { Resend } from "resend";
import { getSupabase, GAME_SCORES_TABLE } from "./_lib/supabase";
import { dailyHighBarHtml, dailyHighPlayerHtml } from "./_lib/emails";

const FROM = "Cosmic Cafe <info@cosmic-cafe.ch>";
const BAR_EMAIL = process.env.BAR_EMAIL?.trim() || "info@cosmic-cafe.ch";

const TOP_N = 10;
const MAX_NAME_LENGTH = 20;
const MAX_EMAIL_LENGTH = 100;

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const headers = { ...corsHeaders(), "Content-Type": "application/json" };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }
  if (event.httpMethod !== "GET" && event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { statusCode: 503, headers, body: JSON.stringify({ error: "Leaderboard not configured" }) };
  }

  try {
    const supabase = getSupabase();

    if (event.httpMethod === "GET") {
      const { data, error } = await supabase
        .from(GAME_SCORES_TABLE)
        .select("id, player_name, score, created_at")
        .order("score", { ascending: false })
        .limit(TOP_N);

      if (error) {
        console.error("[leaderboard] list error:", error);
        return { statusCode: 500, headers, body: JSON.stringify({ error: "Failed to load leaderboard" }) };
      }
      return { statusCode: 200, headers, body: JSON.stringify({ scores: data ?? [] }) };
    }

    if (event.httpMethod === "POST") {
      let body: unknown;
      try {
        body = event.body ? JSON.parse(event.body) : {};
      } catch {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
      }
      const o = body as Record<string, unknown>;
      const playerName = typeof o.player_name === "string"
        ? o.player_name.trim().slice(0, MAX_NAME_LENGTH) || "Alien"
        : "Alien";
      const emailRaw = typeof o.email === "string" ? o.email.trim() : "";
      const emailVal = emailRaw.length > 0 ? emailRaw.slice(0, MAX_EMAIL_LENGTH) : "";
      if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid email" }) };
      }
      const scoreVal = typeof o.score === "number" ? Math.floor(o.score) : Number(o.score);
      if (!Number.isInteger(scoreVal) || scoreVal < 0) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid score" }) };
      }

      const startOfUtcDay = new Date();
      startOfUtcDay.setUTCHours(0, 0, 0, 0);
      const endOfUtcDay = new Date(startOfUtcDay);
      endOfUtcDay.setUTCDate(endOfUtcDay.getUTCDate() + 1);

      const { data: todayRows, error: dayErr } = await supabase
        .from(GAME_SCORES_TABLE)
        .select("score")
        .gte("created_at", startOfUtcDay.toISOString())
        .lt("created_at", endOfUtcDay.toISOString());

      if (dayErr) console.warn("[leaderboard] today scores query:", dayErr);
      const prevMax =
        todayRows && todayRows.length > 0 ? Math.max(...todayRows.map((r) => r.score)) : null;

      function missingEmailColumn(err: { message?: string } | null): boolean {
        const m = (err?.message ?? "").toLowerCase();
        if (!m.includes("email")) return false;
        return (
          m.includes("column") ||
          m.includes("schema") ||
          m.includes("does not exist") ||
          m.includes("unknown column")
        );
      }

      const baseRow = { player_name: playerName, score: scoreVal };
      const withEmail =
        emailVal.length > 0 ? { ...baseRow, email: emailVal } : { ...baseRow, email: null as string | null };

      let { data, error } = await supabase
        .from(GAME_SCORES_TABLE)
        .insert(withEmail)
        .select("id, player_name, score, created_at")
        .single();

      if (error && missingEmailColumn(error)) {
        console.warn("[leaderboard] email column missing in DB; retrying insert without email");
        ({ data, error } = await supabase
          .from(GAME_SCORES_TABLE)
          .insert(baseRow)
          .select("id, player_name, score, created_at")
          .single());
      }

      if (error) {
        console.error("[leaderboard] insert error:", error);
        return { statusCode: 500, headers, body: JSON.stringify({ error: "Failed to submit score" }) };
      }

      const isNewDailyHigh = prevMax === null || scoreVal > prevMax;
      const resendKey = process.env.RESEND_API_KEY;
      if (isNewDailyHigh && resendKey) {
        try {
          const resend = new Resend(resendKey);
          if (emailVal) {
            const { error: e1 } = await resend.emails.send({
              from: FROM,
              to: [emailVal],
              subject: `Cosmic Cafe — Top score du jour (${scoreVal} pts)`,
              html: dailyHighPlayerHtml({ playerName, score: scoreVal }),
            });
            if (e1) console.error("[leaderboard] player email:", e1);
          }
          const { error: e2 } = await resend.emails.send({
            from: FROM,
            to: [BAR_EMAIL],
            subject: `[Alien Jump] Record du jour : ${playerName.replace(/[\r\n]/g, " ").slice(0, 40)} — ${scoreVal} pts`,
            html: dailyHighBarHtml({ playerName, score: scoreVal, email: emailVal || null }),
          });
          if (e2) console.error("[leaderboard] bar email:", e2);
        } catch (err) {
          console.error("[leaderboard] Resend error:", err);
        }
      }

      return { statusCode: 200, headers, body: JSON.stringify({ score: data }) };
    }
  } catch (err) {
    console.error("[leaderboard] Error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Internal server error" }) };
  }

  return { statusCode: 405, headers, body: "" };
};
