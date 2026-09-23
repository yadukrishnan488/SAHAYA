# SAHAYA – Welfare Entitlement Assistant

> Multilingual Welfare Entitlement Assistant for Plantation and Fishing Families

SAHAYA is an accessible, multilingual web application built for hackathon demonstration. It helps coastal fishing households and hill plantation worker families discover government welfare schemes they potentially qualify for using a **100% deterministic rules engine**, Malayalam/English voice interaction, interactive assistance centre mapping, and printable document checklists.

---

## 🌟 Key Features

- **Deterministic Rules Engine**: Python rules engine evaluating profile conditions without LLM hallucinations. Categorizes schemes into `POTENTIALLY_ELIGIBLE`, `MORE_INFORMATION_NEEDED`, and `NOT_MATCHED`.
- **Multilingual UI**: Native support for **Malayalam (മലയാളം)** and **English** with real-time toggle.
- **Voice & Accessibility**: Web Speech API integration (`ml-IN` speech recognition) with audio TTS question reader and text fallback.
- **Why This Result**: Expandable rule match breakdown displaying matched rules, missing fields, or failed conditions for complete transparency.
- **12 Demo Schemes**: Pre-loaded realistic demo schemes with architecture ready for importing official organizer resource packs.
- **Printable Document Checklist**: Aggregated document checklist with printable view.
- **Interactive Help Centres Map**: OpenStreetMap Leaflet visualizer displaying Kerala welfare assistance centres (Ernakulam, Kottayam, Idukki, Alappuzha, Wayanad).
- **Admin Dashboard & Test Profiles**: Real-time metrics dashboard, automated test runner, and JSON resource pack importer.
- **Hackathon Judge Shortcuts**: 1-click fast-load profile presets.

---

## 🏗️ Architecture Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Lucide Icons, Leaflet OpenStreetMap.
- **Backend**: FastAPI, Python 3.12, Pydantic v2, SQLAlchemy (SQLite / PostgreSQL fallback).
- **Rules Engine**: Deterministic Python rule evaluator (`app/rules_engine.py`).

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v18+
- Python 3.10+

### 1. Setup & Start Backend (FastAPI)

```bash
cd backend
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
Backend API server will run at `http://localhost:8000` (API docs at `http://localhost:8000/docs`).

### 2. Setup & Start Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```
Frontend web application will run at `http://localhost:3000`.

---

## 📂 Project Structure

```
sahaya/
├── backend/
│   ├── app/
│   │   ├── rules_engine.py   # Deterministic rules evaluator
│   │   ├── ai_service.py     # NLU parameter extraction layer
│   │   ├── seed_data.py      # 12 demo schemes & centres
│   │   ├── schemas.py        # Pydantic models
│   │   └── routers/          # API endpoints
│   ├── tests/                # Pytest unit tests
│   ├── main.py               # FastAPI entry point
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js pages (start, questions, results, centres, docs, admin)
│   │   ├── components/       # Navbar, Footer, VoiceMicButton, LeafletMap
│   │   └── lib/              # dictionary.ts (en/ml), speech.ts, api.ts, context.tsx
│   └── package.json
└── README.md
```

---

## 📜 License
Developed for Hackathon Demonstration.
