# Supabase setup for Cosmic Rendez-vous (booking / space rental)

The booking system stores rental requests in **Supabase** and sends confirmation emails via **Resend**. This guide covers the database and environment variables.

---

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. **New project** → name (e.g. `cosmic-rendezvous`), region, database password. Create.

---

## 2. Create all tables (bookings + game_scores)

In Supabase → **SQL Editor**, open and run the file **`supabase-schema.sql`** from this repo (or paste its contents). It contains:

- **`bookings`** – reservation requests; `event_type` e.g. `birthday`, `private_party`, `corporate`, `dj_night`, `other`; `status`: `request`, `confirmed`, or `cancelled`. The **Admin** page (`/admin`) lists and updates them.
- **`game_scores`** – Alien Jump leaderboard; the game submits and fetches top scores via `/.netlify/functions/leaderboard`.

---

## 3. Get Supabase URL and keys

Supabase → **Project Settings** → **API**:

- **Project URL** → `SUPABASE_URL`
- **service_role** key (secret, server only) → `SUPABASE_SERVICE_ROLE_KEY`

---

## 4. Resend (emails)

1. Sign up at [resend.com](https://resend.com), verify your domain (e.g. `cosmicrendezvous.ch`).
2. Create an API key → `RESEND_API_KEY`.
3. Optional: set `BAR_EMAIL` to the address that receives new booking notifications (default: `info@cosmicrendezvous.ch`).

---

## 5. Environment variables (Netlify)

In **Netlify** → your site → **Site settings** → **Environment variables**, add:

| Name | Value | Scopes |
|------|--------|--------|
| `SUPABASE_URL` | Your Supabase project URL | All |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service_role key | All |
| `RESEND_API_KEY` | Your Resend API key | All |
| `BAR_EMAIL` | (optional) Email for new request notifications | All |
| `ADMIN_SECRET` | (optional) Secret for the Admin page; set to protect `/admin` | All |

Then **trigger a new deploy** so the booking and admin functions use these variables.

---

## 6. Local development

To test the booking API locally:

1. Install dependencies: `npm install`
2. Run Netlify Dev so the function has access to env: `npx netlify dev`
3. Create a `.env` file in the project root (do not commit it):

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_xxxxx
BAR_EMAIL=info@cosmicrendezvous.ch
ADMIN_SECRET=your-secret-for-admin-page
```

4. The frontend will call `/.netlify/functions/booking`; with `netlify dev` that route is proxied to the local function.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Create a Supabase project |
| 2 | In SQL Editor, run **supabase-schema.sql** (all tables in one file) |
| 3 | Copy Project URL and service_role key from Supabase → API |
| 4 | Create Resend API key and (optional) set BAR_EMAIL |
| 5 | Add all variables in Netlify and redeploy |

After that, submissions from the **Booking** page are stored in Supabase and the guest (and bar) receive emails via Resend. **Alien Jump** top scores are stored in `game_scores` and shown in the permanent leaderboard next to the game.
