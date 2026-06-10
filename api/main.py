from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import pickle
import os
import io
import sys
from .schemas import AnomalyResponse, AnomalyResult

# Add src to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.feature_engineering import extract_features
from src.database import SessionLocal
from src.models import Developer, ProjectFile

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

@app.post("/upload-log/", response_model=AnomalyResponse)
async def upload_log(file: UploadFile = File(...)):
    if not iso_forest or not scaler:
        return {"status": "error", "message": "Models not loaded."}
        
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    
    # Run feature engineering
    df_features = extract_features(df)
    
    # Make predictions
    feature_cols = ['lines_added', 'lines_deleted', 'is_off_hours', 
                    'delete_to_add_ratio', 'dev_recent_activity_count', 
                    'file_recent_conflict_count']
    X = df_features[feature_cols].fillna(0).values
    X_scaled = scaler.transform(X)
    
    # -1 indicates anomaly, 1 indicates normal
    predictions = iso_forest.predict(X_scaled)
    df_features['prediction'] = predictions
    
    anomalies_df = df_features[df_features['prediction'] == -1]
    
    # We map IDs back to names
    db = SessionLocal()
    devs = {d.id: d.name for d in db.query(Developer).all()}
    files = {f.id: f.filepath for f in db.query(ProjectFile).all()}
    db.close()
    
    results = []
    for _, row in anomalies_df.iterrows():
        # Classify Severity
        severity = "Warning"
        desc = "Unusual activity pattern detected."
        
        if row['lines_deleted'] > 500:
            severity = "Critical"
            desc = "Massive code deletion detected."
        elif row['file_recent_conflict_count'] > 2:
            severity = "Critical"
            desc = "High frequency of modifications to the same file by different developers."
        elif row['is_off_hours'] == 1:
            severity = "Warning"
            desc = "Activity outside normal working hours."
            
        dev_name = devs.get(row['developer_id'], f"Dev ID {row['developer_id']}")
        file_path = files.get(row['file_id'], f"File ID {row['file_id']}")
            
        results.append(AnomalyResult(
            timestamp=row['timestamp'],
            developer_name=dev_name,
            file_path=file_path,
            severity=severity,
            description=desc
        ))
        
    return AnomalyResponse(
        status="success",
        total_logs_processed=len(df),
        anomalies_detected=len(results),
        anomalies=results
    )
