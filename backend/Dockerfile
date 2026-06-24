# ==========================================
# EwakoVision AI - Backend Dockerfile
# ==========================================
# Menggunakan Python 3.12 slim untuk ukuran image yang ringan.
# PyTorch CPU-only diinstal dari index khusus agar tidak
# mengunduh pustaka CUDA yang sangat besar (~2GB).
# ==========================================

FROM python:3.12-slim

# Metadata
LABEL maintainer="MuhAlifAnhar"
LABEL description="EwakoVision AI Backend - YOLOv8 Object Detection & Gemini AI"

# Set environment agar Python tidak buffer output dan tidak buat .pyc
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependensi sistem yang dibutuhkan OpenCV
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements terlebih dahulu (agar layer cache Docker efisien)
COPY requirements.txt .

# Install PyTorch CPU-only dari index khusus, lalu sisanya dari PyPI
RUN pip install --no-cache-dir \
    torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir ultralytics opencv-python-headless

# Copy seluruh kode backend
COPY . .

# Expose port yang digunakan Uvicorn
EXPOSE 8000

# Jalankan server Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
