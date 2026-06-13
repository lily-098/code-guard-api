from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import pickle
import os
import io
import sys
from .schemas import AnomalyResponse, AnomalyResult
from typing import Optional

# Add src to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.feature_engineering import extract_features
from src.database import SessionLocal
from src.models import Developer, ProjectFile, ActivityLog

app = FastAPI(title="Code Collaboration Anomaly Detection API")

# Setup CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models
MODEL_DIR = "models/saved"
try:
    with open(f"{MODEL_DIR}/isolation_forest.pkl", "rb") as f:
        iso_forest = pickle.load(f)
    with open(f"{MODEL_DIR}/scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
except FileNotFoundError:
    print("Warning: Models not found. Please train models first.")
    iso_forest, scaler = None, None

@app.get("/health/")
def health_check():
    return {"status": "healthy", "models_loaded": iso_forest is not None}

from pydantic import BaseModel

class GitHubRepoRequest(BaseModel):
    repo_name: str
    limit: Optional[int] = 15

def process_dataframe(df: pd.DataFrame):
    df_features = extract_features(df)
    
    feature_cols = ['lines_added', 'lines_deleted', 'is_off_hours', 
                    'delete_to_add_ratio', 'dev_recent_activity_count', 
                    'file_recent_conflict_count']
    X = df_features[feature_cols].fillna(0).values
    X_scaled = scaler.transform(X)
    
    predictions = iso_forest.predict(X_scaled)
    df_features['prediction'] = predictions
    
    anomalies_df = df_features[df_features['prediction'] == -1]
    
    db = SessionLocal()
    devs = {d.id: d.name for d in db.query(Developer).all()}
    files = {f.id: f.filepath for f in db.query(ProjectFile).all()}
    file_platforms = {f.id: f.platform for f in db.query(ProjectFile).all()}
    db.close()
    
    results = []
    for _, row in anomalies_df.iterrows():
        severity = "Warning"
        desc = "Unusual activity pattern detected."
        
        # Check platform to customize description
        platform = row.get('platform', file_platforms.get(row['file_id'], "GitHub"))
        
        if row['lines_deleted'] > 500:
            severity = "Critical"
            desc = f"Massive content deletion detected on {platform}."
        elif row['file_recent_conflict_count'] > 2:
            severity = "Critical"
            desc = f"High frequency of modifications by different developers on {platform}."
        elif row['is_off_hours'] == 1:
            severity = "Warning"
            desc = f"Off-hours modification on {platform}."
            
        dev_name = devs.get(row['developer_id'], f"Dev ID {row['developer_id']}")
        file_path = files.get(row['file_id'], f"File ID {row['file_id']}")
            
        results.append(AnomalyResult(
            timestamp=row['timestamp'],
            developer_name=dev_name,
            file_path=file_path,
            platform=platform,
            severity=severity,
            description=desc
        ))
        
    return AnomalyResponse(
        status="success",
        total_logs_processed=len(df),
        anomalies_detected=len(results),
        anomalies=results
    )

@app.get("/detect/", response_model=AnomalyResponse)
async def auto_detect():
    if not iso_forest or not scaler:
        return {"status": "error", "message": "Models not loaded."}
    
    try:
        db = SessionLocal()
        logs = db.query(ActivityLog).all()
        data = []
        for log in logs:
            data.append({
                "id": log.id,
                "timestamp": log.timestamp,
                "developer_id": log.developer_id,
                "file_id": log.file_id,
                "platform": log.file.platform if log.file else "GitHub",
                "action_type": log.action_type.value,
                "lines_added": log.lines_added,
                "lines_deleted": log.lines_deleted
            })
        db.close()
        
        if len(data) == 0:
            df = pd.read_csv("data/raw_logs.csv")
        else:
            df = pd.DataFrame(data)
            
        return process_dataframe(df)
    except FileNotFoundError:
        return {"status": "error", "message": "Log file/data not found."}

@app.post("/upload-log/", response_model=AnomalyResponse)
async def upload_log(file: UploadFile = File(...)):
    if not iso_forest or not scaler:
        return {"status": "error", "message": "Models not loaded."}
        
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    return process_dataframe(df)

@app.post("/fetch-github/", response_model=AnomalyResponse)
async def fetch_github(request: GitHubRepoRequest):
    if not iso_forest or not scaler:
        raise HTTPException(status_code=503, detail="Models not loaded.")
        
    try:
        from src.github_fetcher import fetch_real_github_commits
        # Fetch and store in the DB
        fetch_real_github_commits(request.repo_name, limit=request.limit)
        
        # Pull all logs to run detection
        db = SessionLocal()
        logs = db.query(ActivityLog).all()
        data = []
        for log in logs:
            data.append({
                "id": log.id,
                "timestamp": log.timestamp,
                "developer_id": log.developer_id,
                "file_id": log.file_id,
                "platform": log.file.platform if log.file else "GitHub",
                "action_type": log.action_type.value,
                "lines_added": log.lines_added,
                "lines_deleted": log.lines_deleted
            })
        db.close()
        
        df = pd.DataFrame(data)
        return process_dataframe(df)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
