import type { VercelRequest, VercelResponse } from "@vercel/node";
import { netlifyHandlerToVercel } from "./_vercelAdapter";

function json(res: VercelResponse, statusCode: number, data: unknown) {
  res.status(statusCode).setHeader("Content-Type", "application/json").send(JSON.stringify(data));
}

export default async function adminBookingsRoute(req: VercelRequest, res: VercelResponse) {
  const method = (req.method ?? "GET").toUpperCase();

  if (method === "OPTIONS") {
    res
      .status(204)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "GET, PATCH, OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Key")
      .send("");
    return;
  }

  if (method !== "GET" && method !== "PATCH") {
    json(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const mod = await import("../server/admin-bookings");
    const fn = netlifyHandlerToVercel(mod.handler);
    await fn(req, res);
  } catch (e) {
    console.error("[api/admin-bookings] failed to load handler:", e);
    json(res, 500, { error: "Internal server error" });
  }
}

