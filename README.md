# EwakoVision AI 🍃

EwakoVision AI adalah sistem pendeteksi dan klasifikasi sampah hibrida (Offline + Online) menggunakan **YOLOv8 Object Detection** untuk pelacakan koordinat sampah secara *real-time* (Bounding Box) dan **Gemini 1.5 Flash** untuk menyusun panduan rekomendasi daur ulang pintar.

Proyek ini dibangun untuk kompetisi LKS, menggunakan **Next.js** untuk Frontend dan **FastAPI (Python)** untuk Backend AI.

---

## 🛠️ Persyaratan Sistem
Sebelum memulai, pastikan komputer Anda telah terinstal:
- [Node.js](https://nodejs.org/en/) (Versi 18 atau lebih baru)
- [Python](https://www.python.org/downloads/) (Versi 3.9 hingga 3.12)
- Git

## 🚀 Cara Menjalankan Proyek (Setup Guide)

Karena file biner berukuran besar dan kunci rahasia (*API Key*) tidak diunggah ke GitHub, ikuti langkah-langkah berikut untuk membangun ulang lingkungan kerja di laptop Anda setelah melakukan `git clone`.

### Langkah 1: Kloning Repositori
```bash
git clone https://github.com/MuhAlifAnhar/ewakoAI.git
cd ewakoAI
```

---

### Langkah 2: Setup Frontend (Next.js)
Buka terminal baru, lalu jalankan perintah berikut untuk menginstal semua pustaka antarmuka web:
```bash
cd frontend
npm install
```
Setelah instalasi selesai, jalankan server pengembangan:
```bash
npm run dev
```
👉 *Frontend akan berjalan di `http://localhost:3000`*

---

### Langkah 3: Setup Backend (FastAPI & YOLOv8)
Buka tab terminal baru (biarkan terminal frontend tetap berjalan), lalu buat *Virtual Environment* Python agar pustaka AI tidak bentrok dengan komputer Anda:

```bash
cd backend

# Membuat Virtual Environment (Windows)
python -m venv venv

# Mengaktifkan Virtual Environment (Windows)
venv\Scripts\activate
```
*(Catatan: Jika Anda menggunakan Mac/Linux, gunakan `python3 -m venv venv` dan `source venv/bin/activate`)*

Setelah Venv aktif (terlihat tulisan `(venv)` di terminal), instal semua pustaka AI (YOLO, OpenCV, dsb):
```bash
pip install -r requirements.txt
```

---

### Langkah 4: Setup API Key (Gemini AI)
Untuk mengaktifkan fitur cerdas Gemini penyusun saran daur ulang:
1. Di dalam folder `backend/`, buat sebuah file baru bernama `.env`.
2. Buka file `.env` tersebut dan masukkan API Key Gemini Anda seperti format di bawah ini:
```env
GEMINI_API_KEY=AIzaSy...masukkan_api_key_anda_disini...
```

---

### Langkah 5: Jalankan Server AI Backend
Pastikan Anda masih berada di dalam folder `backend` dan Venv masih aktif. Jalankan server dengan perintah:
```bash
uvicorn main:app --reload
```
👉 *Backend akan berjalan di `http://127.0.0.1:8000`*

Saat pertama kali dijalankan dan tombol "Analisis Sampah" ditekan di browser, backend akan secara otomatis mengunduh file `yolov8n.pt` dari internet (sekitar 6 MB).

### 🎯 Menggunakan Model Kustom (Opsional)
Jika Anda memiliki model YOLOv8 khusus yang telah dilatih (misalnya dari Roboflow), cukup ubah nama file model Anda menjadi `trash_yolov8.pt` lalu paste/letakkan di dalam folder `backend/`. Kode secara otomatis akan memuat model kustom Anda.

---
**Selesai!** Buka browser Anda di `http://localhost:3000`, izinkan akses kamera, dan selamat bereksperimen dengan EwakoVision AI!
