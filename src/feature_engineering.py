import pandas as pd
import numpy as np

def extract_features(df):
    """
    Extract features for anomaly detection from the raw activity logs dataframe.
    """
    # Ensure timestamp is datetime
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df = df.sort_values(by='timestamp').reset_index(drop=True)
    
    # Basic features
    df['is_off_hours'] = df['timestamp'].dt.hour.apply(lambda x: 1 if x < 6 or x > 19 else 0)
    df['delete_to_add_ratio'] = df['lines_deleted'] / (df['lines_added'] + 1)
    
    # Complex features requiring rolling windows
    # Developer recent activity count (last 1 hour)
    df = df.set_index('timestamp')
    
    # Group by developer, count actions in last 1H
    dev_recent_activity = df.groupby('developer_id')['action_type'].rolling('1h').count().reset_index()
    dev_recent_activity = dev_recent_activity.rename(columns={'action_type': 'dev_recent_activity_count'})
    
    # We need to map this back. Since the rolling was done per developer, we can merge on index/timestamp
    # Wait, rolling on groupby creates a multi-index (developer_id, timestamp)
    # A safer way to compute rolling counts:
    
    features = []
    for idx, row in df.iterrows():
        # Last 1 hour window
        start_time = idx - pd.Timedelta(hours=1)
        window = df.loc[start_time:idx]
        
        # Dev activity count in window
        dev_recent = window[window['developer_id'] == row['developer_id']].shape[0]
        
        # File activity count by OTHER developers in window (conflict indicator)
        file_conflicts = window[(window['file_id'] == row['file_id']) & (window['developer_id'] != row['developer_id'])].shape[0]
        
        features.append({
            'dev_recent_activity_count': dev_recent,
            'file_recent_conflict_count': file_conflicts
        })
        
    df_features = pd.DataFrame(features, index=df.index)
    df = pd.concat([df, df_features], axis=1)
    
    df = df.reset_index()
    
    return df
