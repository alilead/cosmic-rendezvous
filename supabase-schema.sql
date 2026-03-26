-- Cosmic Cafe: run this entire file in Supabase → SQL Editor

-- 1. Bookings table (reservation / space rental)
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  date date not null,
  time text not null,
  guest_count int not null default 1,
  event_type text not null default 'other',
  message text,
  status text not null default 'request',
  created_at timestamptz default now() not null,
  updated_at timestamptz
);

alter table public.bookings enable row level security;

drop policy if exists "Service role only" on public.bookings;
create policy "Service role only"
  on public.bookings
  for all
  using (false)
  with check (false);

-- Allow booking requests to be inserted by the public (anon) client.
-- This is used as a fallback when serverless `/api/booking` is unavailable.
create policy "Public insert booking requests"
  on public.bookings
  for insert
  to anon
  with check (true);

-- 2. Game scores table (Alien Jump leaderboard)
create table if not exists public.game_scores (
  id uuid primary key default gen_random_uuid(),
  player_name text not null default 'Alien',
  email text,
  score int not null check (score >= 0),
  created_at timestamptz default now() not null
);

create index if not exists idx_game_scores_score on public.game_scores (score desc);

-- Optional: set via leaderboard POST (Alien Jump prize flow)
alter table public.game_scores add column if not exists instagram_followed boolean;
alter table public.game_scores add column if not exists newsletter_opt_in boolean;

alter table public.game_scores enable row level security;

drop policy if exists "Service role only" on public.game_scores;
create policy "Service role only"
  on public.game_scores
  for all
  using (false)
  with check (false);
