import requests

url = "http://127.0.0.1:8005/upload-log/"
files = {'file': open('data/raw_logs.csv', 'rb')}

try:
    response = requests.post(url, files=files)
    print("Status Code:", response.status_code)
    
    if response.status_code == 200:
        data = response.json()
        print("Status:", data['status'])
        print("Total Logs Processed:", data['total_logs_processed'])
        print("Anomalies Detected:", data['anomalies_detected'])
        print("\nFirst 3 Anomalies:")
        for anomaly in data['anomalies'][:3]:
            print(f"- {anomaly['severity']} | {anomaly['developer_name']} | {anomaly['description']}")
    else:
        print("Error:", response.text)
except Exception as e:
    print("Failed to connect:", e)
