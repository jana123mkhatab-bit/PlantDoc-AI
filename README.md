# 🌿 PlantDoc AI — Plant Disease Diagnosis Platform

> Full-stack AI application for real-time plant disease diagnosis using dual specialized deep learning models.

![PlantDoc](https://img.shields.io/badge/AI-Plant%20Disease%20Diagnosis-4c8a57?style=for-the-badge&logo=leaf)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![ONNX](https://img.shields.io/badge/ONNX-Runtime-005CED?style=for-the-badge)

---

## ✨ Features

- **Dual-Model AI Engine** — Two fine-tuned MobileNetV2 CNNs: one for crop diseases, one for indoor houseplants
- **Intelligent Auto-Routing** — Automatically selects the best model based on image content using confidence-delta analysis
- **Shannon Entropy Confidence Calibration** — Flags ambiguous or low-certainty predictions with advisory warnings
- **Clinical Treatment Reports** — Structured immediate actions, organic remedies, long-term prevention tips, and pathology specs per diagnosis
- **Top-5 Probability Distribution** — Visual confidence chart showing ranked differential diagnoses
- **30+ Plant Conditions** — Covering common crop and indoor plant diseases
- **Sub-60ms CPU Inference** — ONNX Runtime with full graph optimization
- **Beautiful React UI** — Drag-and-drop upload, animated scanning, dark mode, session history

---

## 🏗️ Architecture

\\\
PlantDoc/
├── backend/               # FastAPI + ONNX Runtime
│   ├── app/
│   │   ├── api/           # REST endpoints (/predict, /health, /stats, /classes)
│   │   ├── core/          # Config & intelligent router engine
│   │   ├── data/          # Disease database (JSON), class lists
│   │   ├── models/        # ONNX model files (not committed — see Releases)
│   │   └── services/      # Inference engine, treatment service, validator
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/              # React 18 + Vite + TailwindCSS
│   └── src/
│       ├── components/    # ResultsView, TreatmentTabs, ConfidenceChart, etc.
│       └── utils/         # API client
│
├── Model_A_Crop_Disease_MobileNetV2.ipynb    # Training notebook — Model A
└── Model_B_Indoor_Plant_MobileNetV2.ipynb   # Training notebook — Model B
\\\

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### Backend
\\\ash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
python run.py
\\\

> **Note:** ONNX model files are not committed to this repo due to their size.  
> Download them from the [Releases](../../releases) page and place them in \ackend/app/models/\.

### Frontend
\\\ash
cd frontend
npm install
npm run dev
\\\

The app will be available at \http://localhost:5173\.

---

## 🧠 Tech Stack

| Layer | Technology |
|---|---|
| ML Framework | MobileNetV2 (fine-tuned), ONNX Runtime |
| Backend | FastAPI, Python 3.10, Uvicorn |
| Frontend | React 18, Vite, TailwindCSS |
| Containerization | Docker |

---

## 📄 License

MIT
