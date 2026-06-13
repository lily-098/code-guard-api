import random
import pandas as pd
from datetime import datetime, timedelta
from .database import engine, Base, SessionLocal
from .models import Developer, ProjectFile, ActivityLog, ActionType

def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

def generate_mock_data(num_developers=5, num_files=20, num_logs=1000):
    db = SessionLocal()
    
    # Create developers
    developers = []
    for i in range(1, num_developers + 1):
        dev = Developer(name=f"Dev_{i}", email=f"dev{i}@example.com")
        db.add(dev)
        developers.append(dev)
    
    # Create files for different platforms
    files = []
    for i in range(1, num_files + 1):
        if i % 3 == 0:
            file = ProjectFile(filepath=f"GoogleDocs/Document_{i}.gdoc", platform="Google Docs")
        elif i % 3 == 1:
            file = ProjectFile(filepath=f"GoogleColab/Notebook_{i}.ipynb", platform="Google Colab")
        else:
            file = ProjectFile(filepath=f"src/module_{i}/main.py", platform="GitHub")
        db.add(file)
        files.append(file)
    
    db.commit()

    # Generate logs
    start_time = datetime.now() - timedelta(days=30)
    current_time = start_time
    
    anomalies = [] # Track anomalies to ensure they are generated
    
    for _ in range(num_logs):
        current_time += timedelta(minutes=random.randint(5, 60))
        
        # 95% normal, 5% anomalous
        is_anomaly = random.random() < 0.05
        
        dev = random.choice(developers)
        file = random.choice(files)
        
        if is_anomaly:
            # Type 1: Mass deletion / overwrite
            # Type 2: Off hours access
            anomaly_type = random.choice(["mass_delete", "off_hours"])
            if anomaly_type == "mass_delete":
                action = ActionType.DELETE
                added = 0
                deleted = random.randint(500, 2000) # Unusually large deletion
                anomalies.append((current_time, dev.name, "mass_delete"))
            else: # off_hours
                action = ActionType.MODIFY
                added = random.randint(10, 50)
                deleted = random.randint(0, 10)
                # Force time to 3 AM
                current_time = current_time.replace(hour=3, minute=random.randint(0, 59))
                anomalies.append((current_time, dev.name, "off_hours"))
        else:
            action = random.choices([ActionType.MODIFY, ActionType.CREATE, ActionType.DELETE], weights=[0.8, 0.15, 0.05])[0]
            if action == ActionType.DELETE:
                added = 0
                deleted = random.randint(1, 50)
            elif action == ActionType.CREATE:
                added = random.randint(10, 200)
                deleted = 0
            else:
                added = random.randint(1, 100)
                deleted = random.randint(0, 50)
        
        log = ActivityLog(
            timestamp=current_time,
            developer_id=dev.id,
            file_id=file.id,
            action_type=action,
            lines_added=added,
            lines_deleted=deleted
        )
        db.add(log)
        
    db.commit()
    db.close()
    
    print(f"Generated {num_logs} logs with {len(anomalies)} true anomalies.")
    return anomalies

def export_to_csv(filepath="data/raw_logs.csv"):
    import os
    if not os.path.exists("data"):
        os.makedirs("data")
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
    df = pd.DataFrame(data)
    df.to_csv(filepath, index=False)
    db.close()
    print(f"Exported logs to {filepath}")

if __name__ == "__main__":
    setup_db()
    generate_mock_data()
    export_to_csv()
