import { handler } from "../server/leaderboard";

export default async function leaderboardRoute(req: any, res: any) {
  try {
    const method = (req?.method ?? "GET").toUpperCase();
    const bodyStr =
      method === "POST"
        ? req?.body === undefined
          ? ""
          : typeof req.body === "string"
            ? req.body
            : JSON.stringify(req.body)
        : "";

    const event = {
      httpMethod: method,
      body: bodyStr,
      headers: req?.headers ?? {},
    } as any;

    const result = await handler(event, {} as any);
    const headers = result?.headers ?? {};
    for (const [key, val] of Object.entries(headers)) {
      if (val !== undefined) res.setHeader(key, String(val));
    }
    res.status(result?.statusCode ?? 500).send(result?.body ?? "");
  } catch (e) {
    console.error("[api/leaderboard] failed:", e);
    res.status(500).json({ error: "Internal server error" });
  }
}

