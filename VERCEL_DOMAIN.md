# Connecting your live domain to Vercel

If you deploy this site to **Vercel** and want to use your own domain (e.g. `cosmicrendezvous.ch`):

## 1. Deploy to Vercel

- Push the repo to GitHub/GitLab/Bitbucket and import the project in [Vercel](https://vercel.com).
- Or use Vercel CLI: `npx vercel` then `npx vercel --prod`.
- Set **Root Directory** to `cosmic-rendezvous` if the repo root is the parent folder.

## 2. Add your domain in Vercel

1. In Vercel → your project → **Settings** → **Domains**.
2. Click **Add** and enter your domain (e.g. `cosmicrendezvous.ch` or `www.cosmicrendezvous.ch`).
3. Vercel will show you the required DNS records (usually an **A** record or **CNAME**).

## 3. Point your domain’s DNS to Vercel

In your domain registrar (where you bought the domain) or your DNS provider:

- **A record** (for apex `cosmicrendezvous.ch`):  
  - Name: `@` (or leave blank)  
  - Value: `76.76.21.21` (Vercel’s IP; confirm in Vercel’s Domains UI).
- **CNAME** (for `www.cosmicrendezvous.ch`):  
  - Name: `www`  
  - Value: `cname.vercel-dns.com` (or the CNAME Vercel shows you).

Save the DNS changes. Propagation can take from a few minutes up to 48 hours.

## 4. SSL

Vercel will issue an SSL certificate for your domain once DNS is correctly pointing to Vercel. No extra step needed.

---

**Note:** The app is currently set up for **Netlify** (functions, `netlify.toml`). To run the same site on Vercel you’d add serverless API routes or use Vercel’s equivalent for the booking/admin functions, or keep Netlify for the backend and only use Vercel for the frontend (more setup).
