function bodyToString(raw: unknown): string | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw === "string") return raw;
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(raw)) return raw.toString("utf8");
  if (typeof raw === "object") return JSON.stringify(raw);
  return String(raw);
}

function flattenHeaders(headers: any): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) {
    if (v === undefined) continue;
    out[k] = Array.isArray(v) ? v[0] ?? "" : v;
  }
  return out;
}

/** Bridge Netlify `Handler` to Vercel Node serverless (`api/*.ts`). */
export function netlifyHandlerToVercel(handler: any) {
  return async (req: any, res: any): Promise<void> => {
    const body = bodyToString(req.body);

    const event = {
      httpMethod: req.method ?? "GET",
      body,
      headers: flattenHeaders(req.headers),
    };

    try {
      const result = await handler(event, {} as never);
      const h = result.headers ?? {};
      for (const [key, val] of Object.entries(h)) {
        if (val !== undefined) res.setHeader(key, String(val));
      }
      res.status(result.statusCode).send(result.body ?? "");
    } catch (e) {
      console.error("[api] handler error:", e);
      res
        .status(500)
        .setHeader("Content-Type", "application/json")
        .send(JSON.stringify({ error: "Internal server error" }));
    }
  };
}
