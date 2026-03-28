# PesaSkill — Vercel Deployment Guide

## Overview
Deploy as **two separate Vercel projects**:
- **Project 1** → Frontend (React/Vite) — root dir: `pesaskill/frontend`
- **Project 2** → Backend (Node/Express) — root dir: `pesaskill/backend`

---

## Step 1 — MongoDB Atlas (Database)

1. Go to https://cloud.mongodb.com → Create free M0 cluster
2. Database Access → Add user (username + password)
3. Network Access → Add IP `0.0.0.0/0` (allow all — required for Vercel)
4. Connect → Drivers → copy connection string:
   ```
   mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/pesaskill?retryWrites=true&w=majority
   ```

---

## Step 2 — Deploy Backend

1. Go to https://vercel.com/new
2. Import `itechnology416-collab/PESASKILL`
3. **Root Directory** → `pesaskill/backend`
4. Framework Preset → **Other**
5. Build Command → *(leave empty)*
6. Output Directory → *(leave empty)*
7. Click **Environment Variables** and add:

| Name | Value |
|------|-------|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/pesaskill` |
| `JWT_SECRET` | `pesaskill_super_secret_jwt_2024_production` |
| `FRONTEND_URL` | `https://pesaskill-frontend.vercel.app` *(update after frontend deploy)* |
| `NODE_ENV` | `production` |
| `MPESA_BASE_URL` | `https://apisandbox.safaricom.et` |
| `MPESA_CONSUMER_KEY` | `jgdPJACy5TPGniKsmxahZgjYsfCn9ILI2LZanmk5kukRycGd` |
| `MPESA_CONSUMER_SECRET` | `nLIqp5u77VqO2TKshWYAOaG33sMiCkGh7g6NOcnLKFsoneFpwnwskDaOMWs4Vgc1` |
| `MPESA_SHORTCODE` | `6564` |
| `MPESA_PASSWORD` | `YmNlMDhhODI4MzJmOWQwZWZiYjgyNWM1MmNlZWJlMDI2ZjgzMjZkY2U5NTA2OTAyZmUwNDI3NjM0ODZjMTRhZg==` |
| `MPESA_TIMESTAMP` | `20240918055823` |
| `MPESA_CALLBACK_URL` | `https://webhook.site/852f46fe-65c6-406a-9466-06fce89d67a2` |
| `MPESA_INITIATOR_NAME` | `Okay` |
| `MPESA_SECURITY_CREDENTIAL` | *(value from .env.example)* |

8. Click **Deploy**
9. Note your backend URL: `https://pesaskill-api-xxxx.vercel.app`
10. Test: `https://pesaskill-api-xxxx.vercel.app/api/health`

---

## Step 3 — Deploy Frontend

1. Go to https://vercel.com/new
2. Import same repo `itechnology416-collab/PESASKILL`
3. **Root Directory** → `pesaskill/frontend`
4. Framework Preset → **Vite**
5. Build Command → `npm run build`
6. Output Directory → `dist`
7. Add Environment Variable:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://pesaskill-api-xxxx.vercel.app/api` *(your backend URL from Step 2)* |

8. Click **Deploy**
9. Your frontend is live at: `https://pesaskill-frontend-xxxx.vercel.app`

---

## Step 4 — Update CORS

Go back to your **backend** Vercel project:
- Settings → Environment Variables
- Update `FRONTEND_URL` to your actual frontend URL
- Redeploy (Deployments → Redeploy)

---

## Step 5 — Seed Database (one-time)

Run locally with Atlas URI:
```bash
cd pesaskill/backend
# Set MONGO_URI in .env to your Atlas connection string
node seed.js
```

---

## Troubleshooting

### "Page Not Found" on frontend
- Make sure Root Directory is `pesaskill/frontend` (not the repo root)
- The `vercel.json` inside `pesaskill/frontend/` handles SPA routing with rewrites

### API calls failing (CORS error)
- Make sure `FRONTEND_URL` in backend env matches your exact frontend URL
- Redeploy backend after updating env vars

### MongoDB connection error
- Check `MONGO_URI` is correct
- Make sure `0.0.0.0/0` is whitelisted in Atlas Network Access

### Build fails
- Check Node version: Vercel uses Node 18 by default
- Add `"engines": { "node": "18.x" }` to package.json if needed

---

## Local Development
```bash
# Terminal 1 — Backend (port 5000)
cd pesaskill/backend
cp .env.example .env
npm run dev

# Terminal 2 — Frontend (port 5173)
cd pesaskill/frontend
npm run dev
```
