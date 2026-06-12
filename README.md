# 🛡️ CodeGuard — Code Collaboration Anomaly Detection

> An AI-powered system that monitors developer activity logs and automatically detects suspicious patterns using Machine Learning.

![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.136-green?logo=fastapi)
![PyTorch](https://img.shields.io/badge/PyTorch-2.12-red?logo=pytorch)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.9-orange?logo=scikit-learn)
![License](https://img.shields.io/badge/License-MIT-purple)

---

## 📌 What It Does

CodeGuard analyses developer activity logs and flags anomalous behaviour such as:

| Anomaly Type | Severity | Description |
|---|---|---|
| 🔴 Mass Deletion | Critical | Developer deletes 500+ lines at once |
| 🔴 File Conflicts | Critical | Multiple devs modify the same file rapidly |
| 🟡 Off-Hours Activity | Warning | Code committed between midnight and 6 AM |

---

## 🏗️ Architecture

```
┌─────────────────┐     CSV Upload      ┌──────────────────┐
│   Frontend UI   │ ─────────────────►  │  FastAPI Backend  │
│  (HTML/CSS/JS)  │ ◄─────────────────  │  /upload-log/     │
│  Bilingual EN/HI│   Anomaly Report    └────────┬─────────┘
└─────────────────┘                              │
                                                 ▼
                                    ┌────────────────────────┐
                                    │   Feature Engineering   │
                                    │  • is_off_hours         │
                                    │  • delete_to_add_ratio  │
                                    │  • dev_activity_count   │
                                    │  • file_conflict_count  │
                                    └────────────┬───────────┘
                                                 │
                               ┌─────────────────┴──────────────────┐
                               │                                      │
                    ┌──────────▼──────────┐              ┌───────────▼──────────┐
                    │  Isolation Forest   │              │   LSTM Autoencoder   │
                    │  (sklearn)          │              │   (PyTorch)          │
                    │  Point anomalies    │              │   Sequence anomalies │
                    └─────────────────────┘              └──────────────────────┘
```

---

## 📁 Project Structure

```
code-collaboration-anomaly-detection/
├── api/
│   ├── main.py          # FastAPI app & endpoints
│   └── schemas.py       # Pydantic response models
├── models/
│   ├── lstm.py          # LSTM Autoencoder (PyTorch)
│   ├── train.py         # Training script
│   └── saved/           # Trained model files (git-ignored)
├── src/
│   ├── data_simulator.py  # Mock data generator
│   ├── database.py        # SQLAlchemy + SQLite setup
│   ├── feature_engineering.py  # ML feature extraction
│   └── models.py          # DB schema (ORM models)
├── frontend/
│   ├── index.html       # Main UI (bilingual EN/HI)
│   ├── style.css        # Dark theme styles
│   └── app.js           # UI logic + Voice Guide
├── data/                # Generated CSV logs (git-ignored)
├── Dockerfile           # For GCP Cloud Run deployment
├── requirements.txt     # Python dependencies
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/sprihasingh7/code-collaboration-anomaly-detection.git
cd code-collaboration-anomaly-detection

python -m venv venv
# Windows:
.\venv\Scripts\Activate.ps1
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Generate Mock Data

```bash
python -m src.data_simulator
```
Generates `data/raw_logs.csv` with 1000 activity logs (5% anomalies injected).

### 3. Train ML Models

```bash
python -m models.train
```
Trains Isolation Forest + LSTM Autoencoder. Saves to `models/saved/`.

### 4. Start the API

```bash
uvicorn api.main:app --host 0.0.0.0 --port 8080 --reload
```
API live at **http://localhost:8080** · Docs at **http://localhost:8080/docs**

### 5. Open the Frontend

```bash
cd frontend
python -m http.server 3000
```
Open **http://localhost:3000** in your browser.

---

## 🌐 Frontend Features

- **Bilingual** — Toggle between English and हिंदी
- **🔊 Voice Guide** — Audio explanation of the system in both languages
- **Drag & Drop** CSV upload
- **Real-time** anomaly results with severity classification
- **Filter** by Critical / Warning
- **Timeline** view of anomalies
- **Export** report as JSON
- **Offline banner** with instructions when backend is down

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health/` | Check API & model status |
| `POST` | `/upload-log/` | Upload CSV, get anomaly report |

### Sample Response

```json
{
  "status": "success",
  "total_logs_processed": 1000,
  "anomalies_detected": 47,
  "anomalies": [
    {
      "timestamp": "2026-05-10T03:22:00",
      "developer_name": "Dev_3",
      "file_path": "src/module_7/main.py",
      "severity": "Critical",
      "description": "Massive code deletion detected."
    }
  ]
}
```

---

## 🐳 Docker / Cloud Run

```bash
docker build -t codeguard .
docker run -p 8080:8080 codeguard
```

---

## 🧠 ML Models

| Model | Library | Purpose |
|---|---|---|
| **Isolation Forest** | scikit-learn | Detects statistical outliers (used for API inference) |
| **LSTM Autoencoder** | PyTorch | Learns temporal patterns; high reconstruction error = anomaly |

**Features used:**
- `lines_added`, `lines_deleted`
- `is_off_hours` (before 6 AM or after 7 PM)
- `delete_to_add_ratio`
- `dev_recent_activity_count` (rolling 1-hour window)
- `file_recent_conflict_count` (other devs on same file)

---

## 📋 CSV Format

Your activity log CSV must contain these columns:

| Column | Type | Description |
|---|---|---|
| `timestamp` | datetime | ISO format datetime |
| `developer_id` | integer | Developer identifier |
| `file_id` | integer | File identifier |
| `action_type` | string | `MODIFY` / `CREATE` / `DELETE` |
| `lines_added` | integer | Lines of code added |
| `lines_deleted` | integer | Lines of code deleted |

---

## 📄 License

MIT © 2026 sprihasingh7