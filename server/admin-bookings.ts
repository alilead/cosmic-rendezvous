import { getSupabase, BOOKINGS_TABLE } from "./lib/supabase";

const ADMIN_SECRET = process.env.ADMIN_SECRET?.trim() || "";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Key",
  };
}

function jsonHeaders(): Record<string, string> {
  return { ...corsHeaders(), "Content-Type": "application/json" };
}

function isAuthorized(event: any): boolean {
  if (!ADMIN_SECRET) return false;
  const h = event.headers as Record<string, string | undefined>;
  const auth =
    h["authorization"]?.replace(/^Bearer\s+/i, "") ||
    h["Authorization"]?.replace(/^Bearer\s+/i, "") ||
    h["x-admin-key"] ||
    h["X-Admin-Key"];
  return auth === ADMIN_SECRET;
}

export const handler = async (event: any, _context: any) => {
  const headers = jsonHeaders();
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
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
        headers,
        body: JSON.stringify({ bookings: data ?? [] }),
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
        headers,
        body: JSON.stringify({ booking: data }),
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

  return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
};
