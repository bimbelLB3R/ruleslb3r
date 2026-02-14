import { useState } from "react";
import Swal from "sweetalert2";
import Latex from "react-latex";
import ImageUpload from "./ImageUpload";

// ─── Helper: parse slug kategori ─────────────────────────────────────────────
// Format slug:
//   SNBT → "snbt_{subtes}_{paket}"          e.g. "snbt_pu_01"
//   TKA  → "tka_{jenjang}_{subtes}_{paket}" e.g. "tka_smp_matematika_01"

const SUBTES_LABEL = {
  pu: "Penalaran Umum",
  ppu: "Pengetahuan & Pemahaman Umum",
  pbm: "Pemahaman Bacaan & Menulis",
  pk: "Pengetahuan Kuantitatif",
  lbe: "Literasi Bahasa Inggris",
  lbi: "Literasi Bahasa Indonesia",
  pm: "Penalaran Matematika",
  matematika: "Matematika",
  ipa: "IPA",
  b_indonesia: "Bahasa Indonesia",
  b_inggris: "Bahasa Inggris",
  ips: "IPS",
  fisika: "Fisika",
  kimia: "Kimia",
  biologi: "Biologi",
  ekonomi: "Ekonomi",
  geografi: "Geografi",
  sejarah: "Sejarah",
  sosiologi: "Sosiologi",
};

function parseKategoriSlug(slug = "") {
  const parts = slug.split("_");
  if (parts[0] === "snbt") {
    const subtesKey = parts[1] ?? "";
    return {
      jenisUjian: "SNBT",
      jenjang: null,
      subtesKey,
      subtesLabel: SUBTES_LABEL[subtesKey] ?? subtesKey,
      paket: parts[2] ?? "-",
      colorScheme: "blue",
    };
  }
  if (parts[0] === "tka") {
    const jenjang = parts[1] ?? "";
    const paket = parts[parts.length - 1];
    // subtes bisa multi-part: tka_smp_b_indonesia_01 → ["tka","smp","b","indonesia","01"]
    const subtesKey = parts.slice(2, -1).join("_");
    return {
      jenisUjian: "TKA",
      jenjang: jenjang.toUpperCase(),
      subtesKey,
      subtesLabel: SUBTES_LABEL[subtesKey] ?? subtesKey,
      paket,
      colorScheme: "emerald",
    };
  }
  return {
    jenisUjian: slug,
    jenjang: null,
    subtesKey: "-",
    subtesLabel: "-",
    paket: "-",
    colorScheme: "gray",
  };
}

// ─── Color scheme ─────────────────────────────────────────────────────────────
const SCHEME = {
  blue: {
    ring: "focus:ring-blue-400",
    border: "border-blue-500",
    tab: "border-b-2 border-blue-600 text-blue-600 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    badgeJenjang: "bg-blue-50 text-blue-600",
    btn: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    accent: "text-blue-600",
    sectionBg: "bg-blue-50 border-blue-200",
    sectionTitle: "text-blue-700",
    stepDot: "bg-blue-600",
  },
  emerald: {
    ring: "focus:ring-emerald-400",
    border: "border-emerald-500",
    tab: "border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
    badgeJenjang: "bg-emerald-50 text-emerald-600",
    btn: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
    accent: "text-emerald-600",
    sectionBg: "bg-emerald-50 border-emerald-200",
    sectionTitle: "text-emerald-700",
    stepDot: "bg-emerald-600",
  },
  gray: {
    ring: "focus:ring-gray-400",
    border: "border-gray-500",
    tab: "border-b-2 border-gray-600 text-gray-600 bg-gray-50",
    badge: "bg-gray-100 text-gray-700",
    badgeJenjang: "bg-gray-50 text-gray-600",
    btn: "bg-gray-700 hover:bg-gray-800 focus:ring-gray-500",
    accent: "text-gray-600",
    sectionBg: "bg-gray-50 border-gray-200",
    sectionTitle: "text-gray-700",
    stepDot: "bg-gray-600",
  },
};

// ─── Sub-komponen: InputField ─────────────────────────────────────────────────
function InputField({ label, required, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

// ─── Sub-komponen: LaTeXPreview ───────────────────────────────────────────────
function LaTeXPreview({ value, scheme }) {
  if (!value) return null;
  return (
    <div className={`mt-2 p-3 rounded-lg border text-sm ${scheme.sectionBg}`}>
      <p className={`text-xs font-semibold mb-1.5 ${scheme.sectionTitle}`}>
        👁 Preview
      </p>
      <div className="text-gray-800">
        <Latex>{value}</Latex>
      </div>
    </div>
  );
}

// ─── Sub-komponen: OptionCard ─────────────────────────────────────────────────
function OptionCard({ label, scheme, children }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/70">
      <p className={`text-xs font-bold uppercase tracking-wide mb-3 ${scheme.accent}`}>
        {label}
      </p>
      {children}
    </div>
  );
}

// ─── Section 1: Info Dasar ────────────────────────────────────────────────────
function BasicInfoSection({ formData, handleChange, useImageUpload, setUseImageUpload, meta, scheme }) {
  const handleImageUpload = (url) => {
    handleChange({ target: { name: "link_gambar", value: url } });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Nomor Soal" required>
          <input
            type="number"
            name="nomor_soal"
            className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${scheme.ring} focus:border-transparent transition`}
            value={formData.nomor_soal}
            onChange={handleChange}
            required
            min="1"
          />
        </InputField>

        <InputField
          label="Sub-Tes / Mata Pelajaran"
          hint="Otomatis diambil dari pilihan kategori di atas"
        >
          <div className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-100 text-gray-500 cursor-not-allowed`}>
            {meta.subtesLabel || "-"}
          </div>
          {/* Hidden field untuk dikirim ke API */}
          <input type="hidden" name="kategori_soal" value={meta.subtesLabel} />
        </InputField>
      </div>

      {/* Konteks otomatis */}
      <div className={`rounded-xl border p-3 flex flex-wrap gap-2 ${scheme.sectionBg}`}>
        <span className="text-xs text-gray-500 font-medium self-center mr-1">Konteks:</span>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${scheme.badge}`}>
          {meta.jenisUjian} {meta.jenjang ? `· ${meta.jenjang}` : ""}
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
          {meta.subtesLabel}
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
          Paket {meta.paket}
        </span>
      </div>

      {/* Link Gambar / Upload */}
      <div className="border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-700">
            Gambar Soal <span className="text-xs font-normal text-gray-400">(opsional)</span>
          </label>
          <button
            type="button"
            onClick={() => setUseImageUpload(!useImageUpload)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
              useImageUpload
                ? "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                : `${scheme.badge} border-transparent hover:opacity-80`
            }`}
          >
            {useImageUpload ? "🔗 Ganti ke URL" : "🖼️ Upload File"}
          </button>
        </div>

        {useImageUpload ? (
          <ImageUpload
            currentImage={formData.link_gambar}
            onImageUploaded={handleImageUpload}
            label="Upload Gambar Soal"
          />
        ) : (
          <>
            <input
              type="text"
              name="link_gambar"
              className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${scheme.ring} focus:border-transparent transition`}
              value={formData.link_gambar}
              onChange={handleChange}
              placeholder="https://example.com/image.png"
            />
            {formData.link_gambar && (
              <div className="mt-3">
                <p className="text-xs text-gray-400 mb-2">Preview:</p>
                <img
                  src={formData.link_gambar}
                  alt="Preview"
                  className="max-h-48 rounded-lg border border-gray-200 shadow-sm object-contain"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Section 2: Bacaan / Stimulus ─────────────────────────────────────────────
function BacaanSection({ formData, handleChange, scheme }) {
  // Hanya tampilkan field yang sudah ada isinya, atau buka semua jika perlu
  const [showAll, setShowAll] = useState(false);
  const filledCount = [...Array(16)].filter((_, i) => formData[`bacaan_${i + 1}`]).length;
  const visibleCount = showAll ? 16 : Math.max(3, filledCount + 1);

  return (
    <div className="space-y-5">
      <InputField label="Judul Bacaan / Stimulus">
        <input
          type="text"
          name="judul_text1"
          className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${scheme.ring} focus:border-transparent transition`}
          value={formData.judul_text1}
          onChange={handleChange}
          placeholder="Judul teks bacaan (opsional)"
        />
      </InputField>

      <div className="space-y-4">
        {[...Array(visibleCount)].map((_, i) => {
          const num = i + 1;
          const isBold = num === 10 || num === 16;
          return (
            <div key={num}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                Paragraf {num}
                {isBold && (
                  <span className="text-xs font-bold px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded">
                    BOLD
                  </span>
                )}
              </label>
              <textarea
                name={`bacaan_${num}`}
                className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${scheme.ring} focus:border-transparent transition resize-none`}
                rows={3}
                value={formData[`bacaan_${num}`]}
                onChange={handleChange}
                placeholder={`Teks paragraf ${num}… (LaTeX: $x^2$)`}
              />
              <LaTeXPreview value={formData[`bacaan_${num}`]} scheme={scheme} />
            </div>
          );
        })}
      </div>

      {!showAll && visibleCount < 16 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className={`text-sm font-semibold ${scheme.accent} hover:underline`}
        >
          + Tampilkan semua paragraf (sampai 16)
        </button>
      )}
    </div>
  );
}

// ─── Section 3: Soal & Opsi ───────────────────────────────────────────────────
function SoalOpsiSection({ formData, handleChange, scheme }) {
  const [showImageUpload, setShowImageUpload] = useState({});

  const handleImageUpload = (field, url) => {
    handleChange({ target: { name: field, value: url } });
  };

  const toggleImgUpload = (key) =>
    setShowImageUpload((prev) => ({ ...prev, [key]: !prev[key] }));

  const inputCls = `w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 ${scheme.ring} focus:border-transparent transition`;

  return (
    <div className="space-y-5">
      {/* Teks Soal */}
      <InputField label="Teks Soal" required>
        <textarea
          name="soal"
          className={`${inputCls} resize-none`}
          rows={4}
          value={formData.soal}
          onChange={handleChange}
          placeholder="Tulis pertanyaan di sini. LaTeX: $\frac{a}{b}$"
          required
        />
        <LaTeXPreview value={formData.soal} scheme={scheme} />
      </InputField>

      {/* Tipe & Inner HTML */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Tipe Opsi Jawaban">
          <select
            name="typeOpsi"
            className={inputCls}
            value={formData.typeOpsi}
            onChange={handleChange}
          >
            <option value="pilgan">Pilihan Ganda (A–E)</option>
            <option value="benarsalah">Benar / Salah</option>
            <option value="checkbox">Checkbox (Multiple)</option>
            <option value="inputangka">Input Angka</option>
          </select>
        </InputField>
        <InputField label="Render Mode" hint="Pilih LaTeX jika soal mengandung formula">
          <select
            name="inner_html"
            className={inputCls}
            value={formData.inner_html}
            onChange={handleChange}
          >
            <option value="no">LaTeX (default)</option>
            <option value="yes">HTML Langsung</option>
          </select>
        </InputField>
      </div>

      {/* ── Pilihan Ganda A–E ── */}
      {formData.typeOpsi === "pilgan" && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">Pilihan Jawaban</p>
          {["a", "b", "c", "d", "e"].map((opt) => (
            <OptionCard key={opt} label={`Pilihan ${opt.toUpperCase()}`} scheme={scheme}>
              <div className="flex items-center justify-between mb-2">
                <span />
                <button
                  type="button"
                  onClick={() => toggleImgUpload(opt)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition ${
                    showImageUpload[opt]
                      ? "bg-gray-100 text-gray-600 border-gray-200"
                      : `${scheme.badge} border-transparent`
                  }`}
                >
                  {showImageUpload[opt] ? "📝 Ganti ke Teks" : "🖼️ Upload Gambar"}
                </button>
              </div>

              {showImageUpload[opt] ? (
                <ImageUpload
                  currentImage={formData[`pilihan_${opt}_img`]}
                  onImageUploaded={(url) => handleImageUpload(`pilihan_${opt}_img`, url)}
                  label={`Gambar Pilihan ${opt.toUpperCase()}`}
                />
              ) : (
                <>
                  <textarea
                    name={`pilihan_${opt}`}
                    className={`${inputCls} resize-none`}
                    rows={2}
                    value={formData[`pilihan_${opt}`]}
                    onChange={handleChange}
                    placeholder={`Teks pilihan ${opt.toUpperCase()}…`}
                  />
                  <LaTeXPreview value={formData[`pilihan_${opt}`]} scheme={scheme} />
                </>
              )}
            </OptionCard>
          ))}
        </div>
      )}

      {/* ── Benar/Salah & Checkbox ── */}
      {(formData.typeOpsi === "benarsalah" || formData.typeOpsi === "checkbox") && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">Daftar Pernyataan</p>
          {[1, 2, 3, 4, 5].map((num) => {
            const imgKey = `pernyataan_${num}`;
            return (
              <OptionCard key={num} label={`Pernyataan ${num}`} scheme={scheme}>
                <div className="flex items-center justify-between mb-2">
                  <span />
                  <button
                    type="button"
                    onClick={() => toggleImgUpload(imgKey)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition ${
                      showImageUpload[imgKey]
                        ? "bg-gray-100 text-gray-600 border-gray-200"
                        : `${scheme.badge} border-transparent`
                    }`}
                  >
                    {showImageUpload[imgKey] ? "📝 Ganti ke Teks" : "🖼️ Upload Gambar"}
                  </button>
                </div>

                {showImageUpload[imgKey] ? (
                  <ImageUpload
                    currentImage={formData[`pernyataan_${num}_img`]}
                    onImageUploaded={(url) => handleImageUpload(`pernyataan_${num}_img`, url)}
                    label={`Gambar Pernyataan ${num}`}
                  />
                ) : (
                  <textarea
                    name={`pernyataan_${num}`}
                    className={`${inputCls} resize-none`}
                    rows={2}
                    value={formData[`pernyataan_${num}`]}
                    onChange={handleChange}
                    placeholder={`Teks pernyataan ${num}…`}
                  />
                )}
              </OptionCard>
            );
          })}
        </div>
      )}

      {/* ── Kunci Jawaban ── */}
      <div className={`rounded-xl border-2 p-4 ${scheme.sectionBg}`}>
        <InputField
          label="Kunci Jawaban"
          required
          hint={
            formData.typeOpsi === "pilgan"
              ? "Format: huruf A / B / C / D / E"
              : formData.typeOpsi === "benarsalah"
              ? "Format: 1B2S3B4S5B (B=Benar, S=Salah)"
              : formData.typeOpsi === "checkbox"
              ? "Format: 123 (nomor pernyataan yang benar)"
              : "Format: angka saja"
          }
        >
          <input
            type="text"
            name="kunci_jawaban"
            className={`w-full border-2 ${scheme.border} rounded-lg px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 ${scheme.ring} focus:border-transparent transition`}
            value={formData.kunci_jawaban}
            onChange={handleChange}
            required
            placeholder={
              formData.typeOpsi === "pilgan" ? "A"
              : formData.typeOpsi === "benarsalah" ? "1B2S3B4S5B"
              : formData.typeOpsi === "checkbox" ? "123"
              : "42"
            }
          />
        </InputField>
      </div>
    </div>
  );
}

// ─── Main: SoalForm ───────────────────────────────────────────────────────────
export default function SoalForm({ kategori, editData, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [useImageUpload, setUseImageUpload] = useState(false);

  const meta = parseKategoriSlug(kategori);
  const scheme = SCHEME[meta.colorScheme];

  const [formData, setFormData] = useState(
    editData || {
      nomor_soal: "",
      kategori_soal: meta.subtesLabel,
      judul_text1: "",
      ...Object.fromEntries([...Array(16)].map((_, i) => [`bacaan_${i + 1}`, ""])),
      link_gambar: "",
      soal: "",
      typeOpsi: "pilgan",
      inner_html: "no",
      pilihan_a: "", pilihan_b: "", pilihan_c: "", pilihan_d: "", pilihan_e: "",
      pernyataan_1: "", pernyataan_2: "", pernyataan_3: "", pernyataan_4: "", pernyataan_5: "",
      kunci_jawaban: "",
      pilihan_a_img: "", pilihan_b_img: "", pilihan_c_img: "", pilihan_d_img: "", pilihan_e_img: "",
      pernyataan_1_img: "", pernyataan_2_img: "", pernyataan_3_img: "", pernyataan_4_img: "", pernyataan_5_img: "",
    }
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validasi sederhana sebelum submit
  const validate = () => {
    if (!formData.nomor_soal) return "Nomor soal wajib diisi.";
    if (!formData.soal) return "Teks soal wajib diisi.";
    if (!formData.kunci_jawaban) return "Kunci jawaban wajib diisi.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      Swal.fire("Validasi Gagal", err, "warning");
      return;
    }

    setLoading(true);
    try {
      const url = editData ? "/api/admin/soal/myupdate" : "/api/admin/soal/mycreate";
      const method = editData ? "PUT" : "POST";

      const payload = {
        ...(editData ? { id: editData.id } : {}),
        kategori,
        // Override kategori_soal dengan label dari slug agar konsisten
        ...formData,
        kategori_soal: meta.subtesLabel,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = null;
      try { data = await response.json(); } catch { data = null; }

      if (response.ok) {
        Swal.fire({
          title: "Berhasil!",
          text: data?.message ?? (editData ? "Soal diperbarui." : "Soal disimpan."),
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
        onSuccess?.();
      } else {
        Swal.fire("Gagal", data?.error ?? "Terjadi kesalahan", "error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      Swal.fire("Error", "Terjadi kesalahan sistem", "error");
    } finally {
      setLoading(false);
    }
  };

  // ── Tab config ──────────────────────────────────────────────────────────────
  const tabs = [
    { id: "basic",  label: "📋 Info Dasar" },
    { id: "bacaan", label: "📖 Bacaan / Stimulus" },
    { id: "opsi",   label: "✏️ Soal & Jawaban" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className={`px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${scheme.sectionBg}`}>
        <div>
          <h2 className="text-base font-extrabold text-gray-800">
            {editData ? "✏️ Edit Soal" : "➕ Tambah Soal Baru"}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${scheme.badge}`}>
              {meta.jenisUjian}{meta.jenjang ? ` · ${meta.jenjang}` : ""}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
              {meta.subtesLabel}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
              Paket {meta.paket}
            </span>
            {editData && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
                No. {editData.nomor_soal}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Tab Navigasi ───────────────────────────────────────────────────── */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSection(tab.id)}
            className={`px-5 py-3 text-sm font-medium transition-all ${
              activeSection === tab.id
                ? scheme.tab
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Form Content ───────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          {activeSection === "basic" && (
            <BasicInfoSection
              formData={formData}
              handleChange={handleChange}
              useImageUpload={useImageUpload}
              setUseImageUpload={setUseImageUpload}
              meta={meta}
              scheme={scheme}
            />
          )}
          {activeSection === "bacaan" && (
            <BacaanSection
              formData={formData}
              handleChange={handleChange}
              scheme={scheme}
            />
          )}
          {activeSection === "opsi" && (
            <SoalOpsiSection
              formData={formData}
              handleChange={handleChange}
              scheme={scheme}
            />
          )}
        </div>

        {/* ── Footer Aksi ────────────────────────────────────────────────── */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between gap-3">
          {/* Navigasi antar section */}
          <div className="flex gap-2">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeSection === tab.id
                    ? `${scheme.stepDot} scale-125`
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                title={tab.label}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 text-sm font-semibold border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              Batal
            </button>

            {/* Tombol pindah section */}
            {activeSection !== "opsi" && (
              <button
                type="button"
                onClick={() => {
                  const idx = tabs.findIndex((t) => t.id === activeSection);
                  setActiveSection(tabs[idx + 1].id);
                }}
                className={`px-5 py-2.5 text-sm font-semibold rounded-lg text-white transition ${scheme.btn}`}
              >
                Lanjut →
              </button>
            )}

            {/* Submit hanya di section terakhir */}
            {activeSection === "opsi" && (
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2.5 text-sm font-bold rounded-lg text-white transition disabled:opacity-50 flex items-center gap-2 ${scheme.btn}`}
              >
                {loading && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                {loading ? "Menyimpan…" : editData ? "💾 Update Soal" : "💾 Simpan Soal"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}