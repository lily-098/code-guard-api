from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AnomalyResult(BaseModel):
    timestamp: datetime
    developer_name: str
    file_path: Optional[str]
    severity: str
    description: str

class AnomalyResponse(BaseModel):
    status: str
    total_logs_processed: int
    anomalies_detected: int
    anomalies: List[AnomalyResult]
