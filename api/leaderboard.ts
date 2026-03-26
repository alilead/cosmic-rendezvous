import type { VercelRequest, VercelResponse } from "@vercel/node";
import { netlifyHandlerToVercel } from "./_vercelAdapter";

function json(res: VercelResponse, statusCode: number, data: unknown) {
  res.status(statusCode).setHeader("Content-Type", "application/json").send(JSON.stringify(data));
}

export default async function leaderboardRoute(req: VercelRequest, res: VercelResponse) {
  const method = (req.method ?? "GET").toUpperCase();

  if (method === "OPTIONS") {
    res
      .status(204)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type")
      .send("");
    return;
  }

  if (method !== "GET" && method !== "POST") {
    json(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const mod = await import("../server/leaderboard");
    const fn = netlifyHandlerToVercel(mod.handler);
    await fn(req, res);
  } catch (e) {
    console.error("[api/leaderboard] failed to load handler:", e);
    json(res, 500, { error: "Internal server error" });
  }
}

