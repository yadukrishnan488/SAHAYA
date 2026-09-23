# SAHAYA – Welfare Entitlement Assistant

**SAHAYA** is a multilingual, accessible, rules-driven web application designed to help plantation and fishing families discover government welfare schemes they potentially qualify for.

> **Hackathon Notice**: This prototype uses clearly marked DEMO scheme rules and demo application centre data. The deterministic engine architecture allows verified government scheme resource packs to be imported without modifying core logic.

---

## 🌟 Key Features

- **Multilingual Support**: Full UI available in **Malayalam (മലയാളം)** and **English** with real-time toggle.
- **Sector Screening**: Tailored screening wizards for **Fishing Families 🎣** and **Plantation Families 🌿**.
- **Single-Question Wizard**: Step-by-step screening with progress indicators, audio question read-aloud (TTS), Web Speech API voice input (`ml-IN`), and manual text fallback.
- **Deterministic Rules Engine**: 100% rules-driven evaluation (`POTENTIALLY_ELIGIBLE`, `MORE_INFORMATION_NEEDED`, `NOT_MATCHED`). AI/LLM is strictly restricted to language extraction and explanation rendering.
- **"Why Am I Seeing This?"**: Transparent match breakdown displaying matched rules, missing parameters, or failed criteria derived directly from engine outputs.
- **Printable Document Checklist**: Aggregated document checklist with checkboxes and print support.
- **Interactive Help Centres Map**: OpenStreetMap + Leaflet interactive map displaying Kerala welfare assistance locations with district filters.
- **Voice Assistant**: Malayalam/English conversational voice assistant collecting missing household fields.
- **Administrator Dashboard**: System metrics, test profile runner (100% PASS rate), and JSON/CSV resource pack importer.
- **Hackathon Judge Shortcuts**: One-click sample profile loaders on the home page for fast evaluation.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 1. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```
Backend API server runs at `http://localhost:8000` (API docs at `http://localhost:8000/docs`).

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Frontend application runs at `http://localhost:3000`.

---

## 📂 Project Structure

```
sahaya/
├── backend/
│   ├── app/
│   │   ├── routers/       # API routes (screening, schemes, centres, ai, admin)
│   │   ├── config.py      # Environment configuration
│   │   ├── rules_engine.py# Deterministic rules evaluation engine
│   │   ├── ai_service.py  # NLU parameter extractor & explanation layer
│   │   ├── schemas.py     # Pydantic data models
│   │   └── seed_data.py   # 12 demo schemes & Kerala application centres
│   ├── tests/             # Pytest unit tests for rules engine
│   ├── main.py            # FastAPI entry point
│   └── requirements.txt   # Python dependencies
└── frontend/
    ├── src/
    │   ├── app/           # Next.js App Router pages (/, /start, /questions, /results, /scheme/[id], /documents, /centres, /assistant, /admin)
    │   ├── components/    # Navbar, Footer, VoiceMicButton, LeafletMap
    │   └── lib/           # Types, Dictionary (Malayalam/English), Speech API, API client, Context
    ├── public/            # Static assets
    └── package.json       # Node dependencies
```

---

## 📄 License
This project is built for hackathon demonstration.
