"""
EwakoVision AI - Core AI Layer
Arsitektur: YOLOv8 Object Detection
Keunggulan: Deteksi bounding box presisi.
Sebagai prototipe, model menggunakan yolov8n.pt (COCO Dataset).
Gantilah file yolov8n.pt dengan model sampah kustom Anda kelak (trash_yolov8.pt).
"""

from ultralytics import YOLO
from PIL import Image
import io
import os

# ============================================================
# INISIALISASI MODEL YOLOv8
# ============================================================
print("[EwakoVision AI] Memuat model YOLOv8...")

# Cek jika ada model custom, jika tidak pakai yolov8n
model_path = "trash_yolov8.pt"
if not os.path.exists(model_path):
    model_path = "yolov8n.pt" # Akan mendownload otomatis saat pertama kali

YOLO_MODEL = YOLO(model_path)
print(f"[EwakoVision AI] Model YOLOv8 ({model_path}) berhasil dimuat! [OK]")

# ============================================================
# PEMETAAN KELAS COCO (yolov8n) KE KATEGORI SAMPAH
# Ini hanya sementara untuk demo. Jika Anda memakai model
# khusus sampah nanti, sesuaikan dict ini dengan kelas model Anda.
# ============================================================
KATEGORI_MAP = {
    # COCO Classes yang relevan dengan sampah
    "bottle": "Anorganik / Daur Ulang",
    "cup": "Anorganik / Daur Ulang",
    "wine glass": "Anorganik / Daur Ulang",
    "fork": "Anorganik / Residu",
    "knife": "Anorganik / Residu",
    "spoon": "Anorganik / Residu",
    "bowl": "Anorganik / Daur Ulang",
    "banana": "Organik / Kompos",
    "apple": "Organik / Kompos",
    "orange": "Organik / Kompos",
    "broccoli": "Organik / Kompos",
    "carrot": "Organik / Kompos",
    "potted plant": "Organik / Kompos",
    "cell phone": "B3 (Bahan Berbahaya & Beracun) / E-Waste",
    "mouse": "B3 (Bahan Berbahaya & Beracun) / E-Waste",
    "remote": "B3 (Bahan Berbahaya & Beracun) / E-Waste",
    "keyboard": "B3 (Bahan Berbahaya & Beracun) / E-Waste",
    "book": "Anorganik / Daur Ulang",
    "scissors": "Anorganik / Daur Ulang",
    "teddy bear": "Anorganik / Residu",
    "toothbrush": "Anorganik / Residu",
    "vase": "Anorganik / Daur Ulang",
    
    # Custom TrashNet / Roboflow Classes
    "Garbage": "Anorganik / Residu",
    "garbage": "Anorganik / Residu",
    "trash": "Anorganik / Residu",
    "plastic": "Anorganik / Daur Ulang",
    "paper": "Anorganik / Daur Ulang",
    "metal": "Anorganik / Daur Ulang",
    "glass": "Anorganik / Daur Ulang",
    "cardboard": "Anorganik / Daur Ulang"
}

# Terjemahan ID agar lebih enak dibaca juri
TERJEMAHAN_LOKAL = {
    "bottle": "Botol Bekas",
    "cup": "Gelas Plastik/Kertas",
    "wine glass": "Gelas Kaca",
    "fork": "Garpu Plastik/Logam",
    "knife": "Pisau",
    "spoon": "Sendok Plastik/Logam",
    "bowl": "Mangkuk",
    "banana": "Kulit Pisang (Organik)",
    "apple": "Sisa Apel (Organik)",
    "orange": "Kulit Jeruk (Organik)",
    "broccoli": "Sisa Sayur (Organik)",
    "carrot": "Sisa Sayur (Organik)",
    "potted plant": "Tanaman",
    "cell phone": "Ponsel Bekas",
    "mouse": "Mouse Komputer Bekas",
    "remote": "Remote Bekas",
    "keyboard": "Keyboard Bekas",
    "book": "Buku Bekas",
    "scissors": "Gunting",
    "toothbrush": "Sikat Gigi Bekas",
    "vase": "Vas Pecah",
    
    # Custom TrashNet / Roboflow Classes
    "Garbage": "Sampah Umum",
    "garbage": "Sampah Umum",
    "trash": "Sampah Umum",
    "plastic": "Plastik",
    "paper": "Kertas",
    "metal": "Logam/Kaleng",
    "glass": "Kaca/Beling",
    "cardboard": "Kardus"
}

def predict_object(image_bytes):
    """
    Fungsi utama prediksi objek menggunakan YOLOv8.
    Mengembalikan (nama_objek, kategori, akurasi, bbox).
    Bbox adalah dictionary {"x1", "y1", "x2", "y2"} dalam format persentase (0-1).
    """
    try:
        # 1. Buka gambar dari bytes
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        img_width, img_height = image.size
        
        # 2. Jalankan inferensi YOLOv8
        results = YOLO_MODEL(image, verbose=False)
        result = results[0]  # Ambil hasil pertama (karena input hanya 1 gambar)
        
        # Cek apakah ada objek yang terdeteksi
        if len(result.boxes) == 0:
            return "Tidak Ada Objek", "Tidak Diketahui", 0.0, None
            
        # 3. Urutkan berdasarkan confidence (akurasi) tertinggi
        boxes = result.boxes
        best_box = None
        best_conf = 0.0
        
        for box in boxes:
            conf = float(box.conf[0])
            if conf > best_conf:
                best_conf = conf
                best_box = box
                
        if best_box is None:
             return "Tidak Ada Objek", "Tidak Diketahui", 0.0, None
             
        # Ambil kelas hasil
        cls_id = int(best_box.cls[0])
        cls_name = YOLO_MODEL.names[cls_id]
        
        # Terjemahkan ke nama lokal
        nama_tampil = TERJEMAHAN_LOKAL.get(cls_name, cls_name.title())
        kategori = KATEGORI_MAP.get(cls_name, "Anorganik / Daur Ulang")
        
        # Koordinat bounding box (x_min, y_min, x_max, y_max)
        x1, y1, x2, y2 = best_box.xyxy[0].tolist()
        
        # Normalisasi ke format persentase (0-1) agar kompatibel dengan UI frontend (berapapun ukurannya)
        bbox_normalized = {
            "x1": x1 / img_width,
            "y1": y1 / img_height,
            "x2": x2 / img_width,
            "y2": y2 / img_height
        }
        
        print(f"[EwakoVision AI] Deteksi: {nama_tampil} ({best_conf*100:.2f}%) BBox: {bbox_normalized}")
        
        return nama_tampil, kategori, best_conf, bbox_normalized
        
    except Exception as e:
        print(f"[EwakoVision AI] Error pada prediksi YOLOv8: {str(e)}")
        return "Objek Tidak Dikenali", "Anorganik / Daur Ulang", 0.0, None
