import type { Handler, HandlerEvent } from "@netlify/functions";
import type { VercelRequest, VercelResponse } from "@vercel/node";

function bodyToString(raw: unknown): string | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw === "string") return raw;
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(raw)) return raw.toString("utf8");
  if (typeof raw === "object") return JSON.stringify(raw);
  return String(raw);
}

function flattenHeaders(headers: VercelRequest["headers"]): HandlerEvent["headers"] {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) {
    if (v === undefined) continue;
    out[k] = Array.isArray(v) ? v[0] ?? "" : v;
  }
  return out as HandlerEvent["headers"];
}

/** Bridge Netlify `Handler` to Vercel Node serverless (`api/*.ts`). */
export function netlifyHandlerToVercel(handler: Handler) {
  return async (req: VercelRequest, res: VercelResponse): Promise<void> => {
    const body = bodyToString(req.body);

    const event = {
      httpMethod: req.method ?? "GET",
      body,
      headers: flattenHeaders(req.headers),
    } as HandlerEvent;

    const result = await handler(event, {} as never);
    const h = result.headers ?? {};
    for (const [key, val] of Object.entries(h)) {
      if (val !== undefined) res.setHeader(key, String(val));
    }
    res.status(result.statusCode).send(result.body ?? "");
  };
}
