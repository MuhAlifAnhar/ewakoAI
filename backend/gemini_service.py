import io
import json
import os

from PIL import Image
from google import genai
from google.genai import types


def dapatkan_rekomendasi_ewako(nama_objek, kategori, akurasi, image_bytes=None, api_key=None):
    final_api_key = api_key or os.getenv("GEMINI_API_KEY")
    perlu_verifikasi_visual = (akurasi < 0.70) and (image_bytes is not None)

    if not final_api_key or final_api_key.strip() == "":
        fallback_msg = (
            "⚠️ [MODE LOKAL] Objek terdeteksi sebagai sampah organik. Disarankan untuk dimasukkan ke komposter."
            if kategori == "Organik"
            else "⚠️ [MODE LOKAL] Kumpulkan ke bank sampah."
        )
        return nama_objek, kategori, fallback_msg

    try:
        client = genai.Client(api_key=final_api_key)

        if perlu_verifikasi_visual:
            image_pil = Image.open(io.BytesIO(image_bytes)).convert("RGB")
            image_bytes_for_model = io.BytesIO()
            image_pil.save(image_bytes_for_model, format="JPEG")

            prompt = (
                f"Sistem Computer Vision lokal mendeteksi objek ini sebagai '{nama_objek}' "
                f"namun tingkat keyakinannya sangat rendah ({akurasi * 100:.1f}%). "
                f"Tolong lihat gambar ini dan verifikasi jenis sampah apa yang sebenarnya terlihat (misal: Botol Plastik Bening, Kardus Bekas, Gelas Kaca). "
                f"Lalu berikan 1 rekomendasi daur ulang taktis skala rumah/sekolah maksimal 2 kalimat. "
                f"PENTING: Jawab HANYA menggunakan format JSON valid dengan key: 'nama_objek_baru', 'kategori_sampah_baru' (pilih: Organik/Anorganik/B3), dan 'rekomendasi_aksi'."
            )

            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[
                    prompt,
                    types.Part.from_bytes(
                        data=image_bytes_for_model.getvalue(),
                        mime_type="image/jpeg",
                    ),
                ],
            )
            text_resp = (getattr(response, "text", "") or "").strip()

            if text_resp.startswith("```json"):
                text_resp = text_resp[7:-3]
            elif text_resp.startswith("```"):
                text_resp = text_resp[3:-3]

            try:
                data = json.loads(text_resp)
                verified_name = data.get("nama_objek_baru", nama_objek)
                verified_cat = data.get("kategori_sampah_baru", kategori)
                verified_rec = f"👁️✨ [GEMINI VISION VERIFIED] {data.get('rekomendasi_aksi', '')}"
                return verified_name, verified_cat, verified_rec
            except json.JSONDecodeError:
                return nama_objek, kategori, f"👁️✨ [GEMINI VISION VERIFIED] {text_resp}"

        prompt = (
            f"Saya mendeteksi sampah '{nama_objek}' kategori '{kategori}' melalui kamera EwakoVision AI. "
            f"Berikan 1 ide daur ulang kreatif atau langkah penanganan lingkungan taktis skala rumah tangga "
            f"yang aplikatif. Gunakan Bahasa Indonesia yang ringkas, edukatif, maksimal 3 kalimat."
        )
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        return nama_objek, kategori, f"✨ [MODE AI TEXT] {(getattr(response, 'text', '') or '')}"

    except Exception as exc:
        return nama_objek, kategori, f"❌ Terjadi kesalahan pada Gemini API ({exc}). Menggunakan alternatif panduan manual."
