import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getSupabase, GAME_SCORES_TABLE } from "./_lib/supabase";

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
      return { statusCode: 200, headers, body: JSON.stringify({ score: data }) };
    }
  } catch (err) {
    console.error("[leaderboard] Error:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Internal server error" }) };
  }

  return { statusCode: 405, headers, body: "" };
};
