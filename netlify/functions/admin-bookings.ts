import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { getSupabase, BOOKINGS_TABLE, type BookingRow } from "./_lib/supabase";

const ADMIN_SECRET = process.env.ADMIN_SECRET?.trim() || "";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Key",
  };
}

function isAuthorized(event: HandlerEvent): boolean {
  if (!ADMIN_SECRET) return false;
  const auth =
    event.headers["authorization"]?.replace(/^Bearer\s+/i, "") ||
    event.headers["x-admin-key"];
  return auth === ADMIN_SECRET;
}

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  const headers = corsHeaders();
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }
  if (event.httpMethod !== "GET" && event.httpMethod !== "PATCH") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  if (!isAuthorized(event)) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({ error: "Admin service not configured" }),
    };
  }

  try {
    const supabase = getSupabase();

    if (event.httpMethod === "GET") {
      const { data, error } = await supabase
        .from(BOOKINGS_TABLE)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[admin-bookings] list error:", error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: "Failed to load bookings" }),
        };
      }
      return {
        statusCode: 200,
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ bookings: (data ?? []) as BookingRow[] }),
      };
    }

    if (event.httpMethod === "PATCH") {
      let body: unknown;
      try {
        body = event.body ? JSON.parse(event.body) : {};
      } catch {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
      }
      const o = body as Record<string, unknown>;
      const id = typeof o.id === "string" ? o.id.trim() : "";
      const status = typeof o.status === "string" ? o.status.trim() : "";
      if (!id || !["request", "confirmed", "cancelled"].includes(status)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Invalid id or status" }),
        };
      }
      const { data, error } = await supabase
        .from(BOOKINGS_TABLE)
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("[admin-bookings] update error:", error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: "Failed to update booking" }),
        };
      }
      return {
        statusCode: 200,
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ booking: data as BookingRow }),
      };
    }
  } catch (err) {
    console.error("[admin-bookings] Error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }

  return { statusCode: 405, headers, body: "" };
};
