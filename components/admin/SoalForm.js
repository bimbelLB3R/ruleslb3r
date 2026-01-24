import { useState } from "react";
import Swal from "sweetalert2";
import Latex from "react-latex";
import ImageUpload from "./ImageUpload";

export default function SoalForm({ kategori, editData, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [useImageUpload, setUseImageUpload] = useState(false);
  
  const [formData, setFormData] = useState(
    editData || {
      nomor_soal: "",
      kategori_soal: "",
      judul_text1: "",
      bacaan_1: "",
      bacaan_2: "",
      bacaan_3: "",
      bacaan_4: "",
      bacaan_5: "",
      bacaan_6: "",
      bacaan_7: "",
      bacaan_8: "",
      bacaan_9: "",
      bacaan_10: "",
      bacaan_11: "",
      bacaan_12: "",
      bacaan_13: "",
      bacaan_14: "",
      bacaan_15: "",
      bacaan_16: "",
      link_gambar: "",
      soal: "",
      typeOpsi: "pilgan",
      inner_html: "no",
      pilihan_a: "",
      pilihan_b: "",
      pilihan_c: "",
      pilihan_d: "",
      pilihan_e: "",
      pernyataan_1: "",
      pernyataan_2: "",
      pernyataan_3: "",
      pernyataan_4: "",
      pernyataan_5: "",
      kunci_jawaban: "",
      pilihan_a_img: "",
      pilihan_b_img: "",
      pilihan_c_img: "",
      pilihan_d_img: "",
      pilihan_e_img: "",
      pernyataan_1_img: "",
      pernyataan_2_img: "",
      pernyataan_3_img: "",
      pernyataan_4_img: "",
      pernyataan_5_img: "",
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editData
        ? "/api/admin/soal/update"
        : "/api/admin/soal/create";

      const method = editData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(editData ? { id: editData.id } : {}),
          kategori,
          ...formData,
        }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok) {
        Swal.fire("Berhasil", data.message, "success");
        onSuccess?.();
      } else {
        Swal.fire("Gagal", data?.error || "Terjadi kesalahan", "error");
      }
    } catch (error) {
      console.error("FETCH ERROR:", error);
      Swal.fire("Error", "Terjadi kesalahan sistem", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">
          {editData ? "Edit Soal" : "Tambah Soal Baru"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Kategori: {kategori}</p>
      </div>

      <div className="flex border-b">
        <button
          className={`px-6 py-3 ${
            activeSection === "basic"
              ? "border-b-2 border-blue-600 text-blue-600 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveSection("basic")}
        >
          Info Dasar
        </button>
        <button
          className={`px-6 py-3 ${
            activeSection === "bacaan"
              ? "border-b-2 border-blue-600 text-blue-600 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveSection("bacaan")}
        >
          Bacaan/Stimulus
        </button>
        <button
          className={`px-6 py-3 ${
            activeSection === "opsi"
              ? "border-b-2 border-blue-600 text-blue-600 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveSection("opsi")}
        >
          Soal & Opsi Jawaban
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {activeSection === "basic" && (
          <BasicInfoSection 
            formData={formData} 
            handleChange={handleChange}
            useImageUpload={useImageUpload}
            setUseImageUpload={setUseImageUpload}
          />
        )}

        {activeSection === "bacaan" && (
          <BacaanSection formData={formData} handleChange={handleChange} />
        )}

        {activeSection === "opsi" && (
          <SoalOpsiSection formData={formData} handleChange={handleChange} />
        )}

        <div className="mt-6 flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border rounded hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : editData ? "Update" : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}

function BasicInfoSection({ formData, handleChange, useImageUpload, setUseImageUpload }) {
  const handleImageUpload = (url) => {
    handleChange({ target: { name: "link_gambar", value: url } });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-2">
            Nomor Soal <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="nomor_soal"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.nomor_soal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Kategori Soal</label>
          <input
            type="text"
            name="kategori_soal"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.kategori_soal}
            onChange={handleChange}
            placeholder="contoh: Literasi Bahasa Indonesia"
          />
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <label className="block font-medium">Link Gambar</label>
          <button
            type="button"
            onClick={() => setUseImageUpload(!useImageUpload)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {useImageUpload ? "🔗 Input URL Manual" : "🖼️ Upload Gambar"}
          </button>
        </div>

        {useImageUpload ? (
          <ImageUpload
            currentImage={formData.link_gambar}
            onImageUploaded={handleImageUpload}
            label="Upload Gambar Soal"
          />
        ) : (
          <div>
            <input
              type="text"
              name="link_gambar"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.link_gambar}
              onChange={handleChange}
              placeholder="https://example.com/image.png"
            />
            {formData.link_gambar && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <img
                  src={formData.link_gambar}
                  alt="Preview"
                  className="max-w-xs border rounded shadow-sm"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BacaanSection({ formData, handleChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-2">Judul Bacaan</label>
        <input
          type="text"
          name="judul_text1"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.judul_text1}
          onChange={handleChange}
        />
      </div>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((num) => (
        <div key={num}>
          <label className="block font-medium mb-2">
            Bacaan {num} {(num === 10 || num === 16) && "(bold)"}
          </label>
          <textarea
            name={`bacaan_${num}`}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            value={formData[`bacaan_${num}`]}
            onChange={handleChange}
            placeholder="Gunakan LaTeX untuk formula matematika: $x^2 + y^2 = z^2$"
          ></textarea>
          {formData[`bacaan_${num}`] && (
            <div className="mt-1 p-2 bg-gray-50 rounded text-sm">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <Latex>{formData[`bacaan_${num}`]}</Latex>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SoalOpsiSection({ formData, handleChange }) {
  const [showImageUpload, setShowImageUpload] = useState({});

  const handleImageUpload = (field, url) => {
    handleChange({ target: { name: field, value: url } });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-2">Soal</label>
        <textarea
          name="soal"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          value={formData.soal}
          onChange={handleChange}
          placeholder="Ketik soal di sini. Gunakan LaTeX untuk formula: $\frac{a}{b}$"
        ></textarea>
        {formData.soal && (
          <div className="mt-2 p-3 bg-gray-50 rounded">
            <p className="text-xs text-gray-500 mb-2">Preview Soal:</p>
            <Latex>{formData.soal}</Latex>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-2">Tipe Opsi</label>
          <select
            name="typeOpsi"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.typeOpsi}
            onChange={handleChange}
          >
            <option value="pilgan">Pilihan Ganda (A-E)</option>
            <option value="benarsalah">Benar/Salah</option>
            <option value="checkbox">Checkbox (Multiple)</option>
            <option value="inputangka">Input Angka</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-2">Inner HTML?</label>
          <select
            name="inner_html"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.inner_html}
            onChange={handleChange}
          >
            <option value="no">No (gunakan LaTeX)</option>
            <option value="yes">Yes (HTML langsung)</option>
          </select>
        </div>
      </div>

      {formData.typeOpsi === "pilgan" && (
        <div className="space-y-4">
          <p className="font-medium">Pilihan Jawaban:</p>
          {["a", "b", "c", "d", "e"].map((option) => (
            <div key={option} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <label className="block font-medium">
                  Pilihan {option.toUpperCase()}
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setShowImageUpload({
                      ...showImageUpload,
                      [option]: !showImageUpload[option],
                    })
                  }
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {showImageUpload[option] ? "📝 Text" : "🖼️ Upload Gambar"}
                </button>
              </div>

              {showImageUpload[option] ? (
                <ImageUpload
                  currentImage={formData[`pilihan_${option}_img`]}
                  onImageUploaded={(url) =>
                    handleImageUpload(`pilihan_${option}_img`, url)
                  }
                  label={`Gambar Pilihan ${option.toUpperCase()}`}
                />
              ) : (
                <textarea
                  name={`pilihan_${option}`}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  value={formData[`pilihan_${option}`]}
                  onChange={handleChange}
                  placeholder="Atau upload gambar dengan klik tombol di atas"
                ></textarea>
              )}
            </div>
          ))}
        </div>
      )}

      {(formData.typeOpsi === "benarsalah" || formData.typeOpsi === "checkbox") && (
        <div className="space-y-4">
          <p className="font-medium">Pernyataan:</p>
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <label className="block font-medium">Pernyataan {num}</label>
                <button
                  type="button"
                  onClick={() => {
                    const key = `pernyataan_${num}`;
                    setShowImageUpload({
                      ...showImageUpload,
                      [key]: !showImageUpload[key],
                    });
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {showImageUpload[`pernyataan_${num}`] ? "📝 Text" : "🖼️ Upload Gambar"}
                </button>
              </div>

              {showImageUpload[`pernyataan_${num}`] ? (
                <ImageUpload
                  currentImage={formData[`pernyataan_${num}_img`]}
                  onImageUploaded={(url) =>
                    handleImageUpload(`pernyataan_${num}_img`, url)
                  }
                  label={`Gambar Pernyataan ${num}`}
                />
              ) : (
                <textarea
                  name={`pernyataan_${num}`}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  value={formData[`pernyataan_${num}`]}
                  onChange={handleChange}
                ></textarea>
              )}
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="block font-medium mb-2">
          Kunci Jawaban <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="kunci_jawaban"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.kunci_jawaban}
          onChange={handleChange}
          required
          placeholder={
            formData.typeOpsi === "pilgan"
              ? "contoh: A"
              : formData.typeOpsi === "benarsalah"
              ? "contoh: 1B2S3B4S5B"
              : formData.typeOpsi === "checkbox"
              ? "contoh: 123"
              : "contoh: 42"
          }
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.typeOpsi === "pilgan" && "Format: huruf A/B/C/D/E"}
          {formData.typeOpsi === "benarsalah" &&
            "Format: 1B2S3B (1=Benar, 2=Salah, 3=Benar)"}
          {formData.typeOpsi === "checkbox" && "Format: 123 (pilihan 1,2,3 yang benar)"}
          {formData.typeOpsi === "inputangka" && "Format: angka saja"}
        </p>
      </div>
    </div>
  );
}