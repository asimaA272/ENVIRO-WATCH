# EnviroWatch — Multi-Agent Environmental Monitoring System

Semester project — Full-stack environmental monitoring dashboard.

## Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Recharts, Lucide Icons
- **Backend**: Next.js API Routes (no separate server needed)
- **Database**: Vercel KV (Redis) — free tier
- **Data**: Hardcoded NASA EONET-style realistic dataset
- **Deploy**: Vercel (free)

## Project Structure
```
enviro-watch/
├── src/
│   ├── app/
│   │   ├── page.jsx              # Main dashboard page
│   │   ├── layout.jsx            # Root layout
│   │   ├── globals.css           # Global styles + animations
│   │   ├── components/
│   │   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   │   ├── MetricCards.jsx   # 4 summary cards
│   │   │   ├── AlertPanel.jsx    # Active alerts with ACK
│   │   │   ├── AgentPipeline.jsx # LangGraph agents status
│   │   │   ├── SensorTable.jsx   # Live sensor readings
│   │   │   ├── Charts.jsx        # CO2, AQI, Events charts
│   │   │   ├── DbStatus.jsx      # Vercel KV panel
│   │   │   └── EventsPanel.jsx   # NASA EONET events
│   │   └── api/
│   │       ├── events/route.js   # GET/POST NASA events
│   │       ├── sensors/route.js  # GET live sensor data
│   │       ├── alerts/route.js   # GET/PATCH alerts
│   │       ├── agents/route.js   # GET agent statuses
│   │       └── db-status/route.js# GET KV stats
│   └── lib/
│       ├── data.js               # All hardcoded datasets
│       └── kv.js                 # Vercel KV helper
├── package.json
├── next.config.js
├── tailwind.config.js
├── vercel.json
└── .env.example
```

## Deploy to Vercel (Step by Step)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/enviro-watch.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Click "Deploy" — it auto-detects Next.js

### Step 3 — Add Vercel KV Database
1. In Vercel Dashboard → your project → "Storage" tab
2. Click "Create Database" → choose "KV"
3. Name it `enviro-watch-kv`
4. Click "Connect to Project"
5. Vercel auto-adds the environment variables — done!

### Step 4 — Redeploy
After connecting KV, click "Redeploy" in Vercel.
Your app is now live with real Redis persistence!

## Run Locally
```bash
npm install
# Copy .env.example to .env.local and fill in Vercel KV values
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000

> Without KV env vars, the app still works — data is served from hardcoded dataset, KV features gracefully disabled.

## What Looks "Real" to a Viewer
- Sensor readings update every 30 seconds with small random variations
- Alert acknowledgement actually saves to Vercel KV Redis
- DB Status panel shows real KV stats (reads, keys, records)
- Agent pipeline shows animated statuses
- All charts use realistic environmental data
