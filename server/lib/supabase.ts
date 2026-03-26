import { createClient } from "@supabase/supabase-js";

let client: any = null;

export function getSupabase(): any {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  }
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

export const BOOKINGS_TABLE = "bookings";
export const GAME_SCORES_TABLE = "game_scores";

// BookingRow type removed to keep serverless bundles maximally compatible.
