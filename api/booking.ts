import { netlifyHandlerToVercel } from "./_vercelAdapter";

function json(res: any, statusCode: number, data: unknown) {
  res.status(statusCode).setHeader("Content-Type", "application/json").send(JSON.stringify(data));
}

export default async function bookingRoute(req: any, res: any) {
  const method = (req.method ?? "GET").toUpperCase();

  // Keep this route responsive even if the heavy server handler fails to load.
  if (method === "OPTIONS") {
    res
      .status(204)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type")
      .send("");
    return;
  }

  if (method !== "POST") {
    json(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const mod = await import("../server/booking");
    const fn = netlifyHandlerToVercel(mod.handler);
    await fn(req, res);
  } catch (e) {
    console.error("[api/booking] failed to load handler:", e);
    json(res, 500, { error: "Internal server error" });
  }
}

