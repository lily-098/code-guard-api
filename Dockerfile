FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run simulation and training to bake the database and models into the image
RUN python -m src.data_simulator && python -m models.train

# Expose port (Render/Cloud Run will read this or inject PORT)
EXPOSE 8080

# Start FastAPI binding to the dynamic PORT environment variable (default to 8080)
CMD ["sh", "-c", "uvicorn api.main:app --host 0.0.0.0 --port ${PORT:-8080}"]
