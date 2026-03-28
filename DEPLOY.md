# PesaSkill — Vercel Deployment Guide

## Architecture
- **Frontend** → Vercel Static (React + Vite)
- **Backend**  → Vercel Serverless (Node.js + Express)
- **Database** → MongoDB Atlas (free tier)

---

## Step 1 — MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com → Create free cluster
2. Create a database user (username + password)
3. Whitelist IP: `0.0.0.0/0` (allow all — required for Vercel)
4. Get connection string:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/pesaskill?retryWrites=true&w=majority
   ```

---

## Step 2 — Deploy Backend to Vercel

### Option A: Vercel CLI
```bash
cd pesaskill/backend
npx vercel --prod
```

### Option B: Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repo: `Abdulmalik-73/PesaSkill-project`
3. Set **Root Directory** to `pesaskill/backend`
4. Framework: **Other**
5. Add Environment Variables (see below)
6. Deploy

### Backend Environment Variables (add in Vercel dashboard):
| Variable | Value |
|----------|-------|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/pesaskill` |
| `JWT_SECRET` | `your_super_secret_jwt_key_min_32_chars` |
| `FRONTEND_URL` | `https://pesaskill.vercel.app` |
| `MPESA_BASE_URL` | `https://apisandbox.safaricom.et` |
| `MPESA_CONSUMER_KEY` | `jgdPJACy5TPGniKsmxahZgjYsfCn9ILI2LZanmk5kukRycGd` |
| `MPESA_CONSUMER_SECRET` | `nLIqp5u77VqO2TKshWYAOaG33sMiCkGh7g6NOcnLKFsoneFpwnwskDaOMWs4Vgc1` |
| `MPESA_SHORTCODE` | `6564` |
| `MPESA_PASSWORD` | `YmNlMDhhODI4MzJmOWQwZWZiYjgyNWM1MmNlZWJlMDI2ZjgzMjZkY2U5NTA2OTAyZmUwNDI3NjM0ODZjMTRhZg==` |
| `MPESA_TIMESTAMP` | `20240918055823` |
| `MPESA_CALLBACK_URL` | `https://webhook.site/852f46fe-65c6-406a-9466-06fce89d67a2` |
| `MPESA_INITIATOR_NAME` | `Okay` |
| `MPESA_SECURITY_CREDENTIAL` | *(from .env.example)* |
| `NODE_ENV` | `production` |

After deploy, note your backend URL e.g. `https://pesaskill-api.vercel.app`

---

## Step 3 — Deploy Frontend to Vercel

### Option A: Vercel CLI
```bash
cd pesaskill/frontend
npx vercel --prod
```

### Option B: Vercel Dashboard
1. Go to https://vercel.com/new → Import same repo
2. Set **Root Directory** to `pesaskill/frontend`
3. Framework: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variables (see below)
7. Deploy

### Frontend Environment Variables:
| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://pesaskill-api.vercel.app/api` |

---

## Step 4 — Seed the Database (one-time)

After backend is deployed, run locally pointing to Atlas:
```bash
cd pesaskill/backend
# Edit .env: set MONGO_URI to your Atlas connection string
node seed.js
```

---

## Step 5 — Update CORS

In Vercel backend dashboard, update `FRONTEND_URL` to your actual frontend URL:
```
FRONTEND_URL=https://pesaskill-xyz.vercel.app
```

---

## Quick Deploy (Both at once via root vercel.json)

From the repo root:
```bash
npx vercel --prod
```
This uses the root `vercel.json` which builds both frontend and backend.

---

## Project URLs (after deploy)
- Frontend: `https://pesaskill.vercel.app`
- Backend API: `https://pesaskill-api.vercel.app`
- Health check: `https://pesaskill-api.vercel.app/api/health`

---

## Local Development
```bash
# Terminal 1 — Backend
cd pesaskill/backend
cp .env.example .env   # fill in values
npm run dev            # :5000

# Terminal 2 — Frontend  
cd pesaskill/frontend
npm run dev            # :5173
```
