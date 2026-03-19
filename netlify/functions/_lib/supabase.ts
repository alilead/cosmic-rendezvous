import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
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

export type BookingRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guest_count: number;
  event_type: string;
  message: string | null;
  status: string;
  created_at?: string;
  updated_at?: string | null;
};
