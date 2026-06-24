import os
import google.generativeai as genai

def dapatkan_rekomendasi_ewako(nama_objek, kategori, api_key=None):
    # LOGIKA SAKELAR HYBRID
    final_api_key = api_key or os.getenv("GEMINI_API_KEY")
    if not final_api_key or final_api_key.strip() == "":
        # MODE OFFLINE/FALLBACK SYSTEM (Tanpa Gemini)
        if kategori == "Organik":
            return "⚠️ [MODE LOKAL] Objek terdeteksi sebagai sampah organik. Disarankan untuk dimasukkan ke komposter guna pembuatan pupuk tanaman organik sekolah."
        else:
            return "⚠️ [MODE LOKAL] Objek terdeteksi sebagai sampah anorganik. Kumpulkan ke dalam bank sampah sekolah atau pilah untuk diserahkan ke pengepul daur ulang terdekat."
            
    # MODE ONLINE (Menggunakan Keunggulan Gemini API)
    try:
        genai.configure(api_key=final_api_key)
        model = genai.GenerativeModel('gemini-3.5-flash')
        
        prompt = (
            f"Saya mendeteksi sampah '{nama_objek}' kategori '{kategori}' melalui kamera EwakoVision AI. "
            f"Berikan 1 ide daur ulang kreatif atau langkah penanganan lingkungan taktis skala rumah tangga/sekolah "
            f"yang aplikatif untuk masyarakat Makassar. Gunakan Bahasa Indonesia yang ringkas, edukatif, "
            f"dan batasi maksimal hanya 3 kalimat."
        )
        response = model.generate_content(prompt)
        return f"✨ [MODE AI GEMINI] {response.text}"
    except Exception as e:
        return f"❌ Terjadi kesalahan pada Gemini API ({str(e)}). Menggunakan alternatif: Silakan pilah sampah ini dan masukkan ke tempat sampah berkode warna sesuai kategori."
