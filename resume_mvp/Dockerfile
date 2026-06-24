FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY resume_mvp/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY resume_mvp /app/resume_mvp

# Expose port
EXPOSE 8000

# Run app
CMD ["uvicorn", "resume_mvp.api.app:app", "--host", "0.0.0.0", "--port", "8000"]
