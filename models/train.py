import os
import sys
import pickle
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset

# Add parent directory to path to import src
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.feature_engineering import extract_features
from models.lstm import LSTMAutoencoder

def prepare_data(csv_path="data/raw_logs.csv"):
    df = pd.read_csv(csv_path)
    df = extract_features(df)
    
    # Select numerical features for modeling
    feature_cols = ['lines_added', 'lines_deleted', 'is_off_hours', 
                    'delete_to_add_ratio', 'dev_recent_activity_count', 
                    'file_recent_conflict_count']
    
    X = df[feature_cols].fillna(0).values
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return df, X_scaled, scaler

def train_isolation_forest(X_scaled):
    print("Training Isolation Forest...")
    iso_forest = IsolationForest(contamination=0.05, random_state=42)
    iso_forest.fit(X_scaled)
    
    os.makedirs("models/saved", exist_ok=True)
    with open("models/saved/isolation_forest.pkl", "wb") as f:
        pickle.dump(iso_forest, f)
    print("Saved Isolation Forest model.")
    return iso_forest

def create_sequences(data, seq_length=5):
    sequences = []
    for i in range(len(data) - seq_length + 1):
        seq = data[i:i + seq_length]
        sequences.append(seq)
    return np.array(sequences)

def train_lstm_autoencoder(X_scaled, epochs=20, batch_size=32, seq_length=5):
    print("Training LSTM Autoencoder...")
    # Prepare sequential data
    X_seq = create_sequences(X_scaled, seq_length=seq_length)
    X_tensor = torch.tensor(X_seq, dtype=torch.float32)
    
    dataset = TensorDataset(X_tensor, X_tensor)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
    
    input_dim = X_scaled.shape[1]
    hidden_dim = 16
    
    model = LSTMAutoencoder(input_dim=input_dim, hidden_dim=hidden_dim)
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    
    for epoch in range(epochs):
        epoch_loss = 0
        for batch_x, _ in dataloader:
            optimizer.zero_grad()
            output = model(batch_x)
            loss = criterion(output, batch_x)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item()
            
        if (epoch + 1) % 5 == 0:
            print(f"Epoch {epoch+1}/{epochs}, Loss: {epoch_loss/len(dataloader):.4f}")
            
    os.makedirs("models/saved", exist_ok=True)
    torch.save(model.state_dict(), "models/saved/lstm_autoencoder.pth")
    print("Saved LSTM Autoencoder model.")
    return model

if __name__ == "__main__":
    df, X_scaled, scaler = prepare_data("data/raw_logs.csv")
    
    os.makedirs("models/saved", exist_ok=True)
    with open("models/saved/scaler.pkl", "wb") as f:
        pickle.dump(scaler, f)
        
    train_isolation_forest(X_scaled)
    train_lstm_autoencoder(X_scaled)
    print("Training complete!")
