import base64
import binascii
import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from gemini_service import dapatkan_rekomendasi_ewako
from ml_model import predict_object

# Load environment variables dari .env file
load_dotenv()

app = FastAPI(title="EwakoVision AI Backend Engine")

# Mengatasi isu keamanan jalur CORS lintas port (3000 ke 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    image: str


def _decode_base64_image(image_data: str) -> bytes:
    normalized = image_data.strip()
    if normalized.startswith("data:image/"):
        normalized = normalized.split(",", 1)[1]

    try:
        return base64.b64decode(normalized, validate=True)
    except binascii.Error as exc:
        raise ValueError("Format gambar base64 tidak valid.") from exc


@app.post("/api/predict")
def predict_endpoint(payload: PredictRequest):
    if not payload.image or not payload.image.strip():
        raise HTTPException(status_code=400, detail="Payload gambar wajib diisi.")

    try:
        image_bytes = _decode_base64_image(payload.image)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    try:
        object_name, category, confidence, _ = predict_object(image_bytes)
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key:
            object_name, category, _ = dapatkan_rekomendasi_ewako(
                object_name,
                category,
                confidence,
                image_bytes,
                api_key,
            )

        return {
            "object_name": str(object_name),
            "category": str(category),
            "confidence": float(confidence * 100),
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(exc)}") from exc


@app.post("/api/analyze")
def analyze_endpoint(payload: PredictRequest):
    return predict_endpoint(payload)
