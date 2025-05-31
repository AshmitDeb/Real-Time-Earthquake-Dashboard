ShakeMap – Real‑Time Earthquake Dashboard

Live dashboard that captures worldwide earthquake data from the USGS GeoJSON REST feed, stores it in PostgreSQL, computes roll‑up stats with a lightweight Flask micro‑service, and renders interactive maps/charts in a React front‑end – all orchestrated by Docker Compose.

✨ Features

Real‑time ingest – Node.js cron fetches the USGS feed every minute and streams new quakes over WebSockets.

Persistence & analytics – PostgreSQL keeps a rolling 24‑hour history; Flask provides ad‑hoc magnitude averages.

Interactive UI – React + React‑Leaflet map with live pins and Recharts line graph of magnitude trends.

One‑command dev – docker compose up --build spins up DB, API, analytics, and front‑end services.

🛠️ Tech Stack

Front‑end: React 18, Vite, React‑Leaflet, Recharts, TailwindCSS

API / Stream: Node.js 20, Express, Socket.io, Axios

Data: PostgreSQL 15

Analytics: Python 3.12, Flask

DevOps: Docker & Docker Compose

📐 Architecture

┌────────────┐   WebSocket    ┌────────────┐
│  React UI  │◀──────────────▶│  Node API  │
└────────────┘  (socket.io)   └────────────┘
       ▲ REST /stats ▲               │
       │             │               │ pg‑pool
       │             │               ▼
       │        ┌────────────┐  ┌────────────┐
       └───────▶│  Flask Avg │  │ PostgreSQL │
                └────────────┘  └────────────┘
🚀 Quick Start

# build & launch
$ docker compose up --build

# (first run) load schema
$ cat db/init.sql | docker compose exec -T db psql -U shake -d shakemap

# visit dashboard
http://localhost:3000

🔌 Key Endpoints

GET /api/quakes – returns the latest earthquakes (rolling 24 h)

GET /api/quakes/stats – hourly average magnitudes over the last 12 h

WebSocket new‑quake – event emitted whenever a new quake is inserted

🤝 Contributing

Pull requests welcome! Please open an issue first to discuss major changes.


