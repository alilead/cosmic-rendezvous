/**
 * Netlify Functions URL. Prefer `/api/:name` (rewritten in netlify.toml) so POST
 * is not swallowed by the SPA fallback. Override with VITE_FUNCTIONS_ORIGIN for
 * split hosting (e.g. static domain → Netlify app origin).
 */
export function netlifyFunctionUrl(name: string): string {
  const origin = (import.meta.env.VITE_FUNCTIONS_ORIGIN as string | undefined)?.trim().replace(/\/$/, "");
  if (origin) return `${origin}/.netlify/functions/${name}`;
  return `/api/${name}`;
}
