# 🌿 PlantDoc AI — Plant Disease Diagnosis Platform

> Full-stack AI application for real-time plant disease diagnosis using dual specialized deep learning models.

<p align="center">
  <img src="https://img.shields.io/badge/AI-Plant%20Disease%20Diagnosis-4c8a57?style=for-the-badge&logo=leaf" alt="AI"/>
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/ONNX-Runtime-005CED?style=for-the-badge" alt="ONNX"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License"/>
</p>

---

## 📸 Interface Preview

<div align="center">
  <img src="assets/diagnosis_screenshot.png" alt="PlantDoc AI Diagnosis UI" width="900" style="border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
  <p><em>Real-time diagnosis view showing confidence probability distribution, entropy-based certainty calibration, and actionable remedial checklist.</em></p>
</div>

<details>
<summary><b>🔍 View Additional Workflow Previews</b></summary>
<br/>

| Upload & Pre-Flight Scan | Crop Specialist Diagnosis | Indoor Specialist Diagnosis |
|:---:|:---:|:---:|
| <img src="assets/demo_upload_scan.jpg" width="280" alt="Upload & Scan"/> | <img src="assets/demo_crop_diagnosis.jpg" width="280" alt="Crop Diagnosis"/> | <img src="assets/demo_indoor_diagnosis.jpg" width="280" alt="Indoor Diagnosis"/> |

</details>

---

## ✨ Features

- **Dual-Model AI Engine** — Two fine-tuned MobileNetV2 CNNs: one for agricultural crop diseases and one for indoor houseplants.
- **Intelligent Auto-Routing** — Dynamically selects the optimal model based on visual features and confidence-delta analysis.
- **Shannon Entropy Confidence Calibration** — Accurately flags ambiguous or low-certainty predictions with advisory warnings.
- **Clinical Treatment Reports** — Structured remedial recommendations including immediate actions, organic remedies, long-term prevention, and pathology specs.
- **Top-5 Probability Distribution** — Visual probability breakdown showing ranked differential diagnoses.
- **30+ Plant & Crop Conditions** — Broad coverage across fruit, vegetable, and ornamental houseplant pathogens.
- **Sub-60ms CPU Inference** — Powered by ONNX Runtime with full graph optimization.
- **Modern Botanic UI** — Responsive drag-and-drop upload, animated scanning, dark mode, and interactive demo showcases.

---

## 🏗️ Architecture

```text
PlantDoc/
├── assets/                                  # Screenshots and documentation media
│   └── diagnosis_screenshot.png
├── backend/                                 # FastAPI + ONNX Runtime
│   ├── app/
│   │   ├── api/                             # REST endpoints (/predict, /health, /stats, /classes)
│   │   ├── core/                            # Config & intelligent router engine
│   │   ├── data/                            # Disease database (JSON), class mappings
│   │   ├── models/                          # ONNX model files (see Releases)
│   │   └── services/                        # Inference engine, treatment service, validator
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/                                # React 18 + Vite + TailwindCSS
│   └── src/
│       ├── components/                      # ResultsView, TreatmentTabs, ConfidenceChart, ShowcaseSection
│       └── utils/                           # API client
│
├── Model_A_Crop_Disease_MobileNetV2.ipynb    # Training notebook — Model A (Agricultural Crops)
└── Model_B_Indoor_Plant_MobileNetV2.ipynb   # Training notebook — Model B (Houseplants)
```

---

## 🚀 Getting Started

### Prerequisites
- **Python** 3.10+
- **Node.js** 18+ & **npm**

---

### 1. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv .venv

# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
python run.py
```

> **Note:** ONNX model files are not committed to git due to file size limits.  
> Download them from the [GitHub Releases](../../releases) page and place them in `backend/app/models/`.

The backend API documentation will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

---

### 2. Frontend Setup

```bash
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will be accessible at [http://localhost:5173](http://localhost:5173).

---

## 🧠 Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **ML Framework** | MobileNetV2 (fine-tuned), ONNX Runtime | Low-latency CPU inference engine (<60ms) |
| **Backend API** | FastAPI, Python 3.10, Uvicorn | Async REST API with Pydantic validation |
| **Frontend UI** | React 18, Vite, TailwindCSS, Lucide Icons | Responsive botanic UI with light/dark themes |
| **Containerization** | Docker | Production container image |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
