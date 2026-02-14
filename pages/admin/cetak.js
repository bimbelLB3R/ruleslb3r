// pages/admin/cetak.jsx
// Halaman cetak soal untuk admin — diakses via:
// /admin/cetak?kategori=snbt_pu_01
//
// Cara pakai:
// 1. Admin klik tombol "Cetak PDF" di AdminDashboard
// 2. Halaman ini terbuka di tab baru dengan semua soal ter-render
// 3. LaTeX dan gambar selesai dirender, baru html2pdf dijalankan
// 4. PDF otomatis ter-download

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Latex from "react-latex";

// ── Helper: resolve label subtes dari slug ────────────────────────────────────
const SUBTES_LABEL = {
  pu:  "Penalaran Umum",
  ppu: "Pengetahuan & Pemahaman Umum",
  pbm: "Pemahaman Bacaan & Menulis",
  pk:  "Pengetahuan Kuantitatif",
  lbe: "Literasi Bahasa Inggris",
  lbi: "Literasi Bahasa Indonesia",
  pm:  "Penalaran Matematika",
};

function getLabelFromSlug(slug = "") {
  // "snbt_pu_01"           → "SNBT · Penalaran Umum · Paket 01"
  // "tka_smp_matematika_01"→ "TKA SMP · Matematika · Paket 01"
  const parts = slug.split("_");
  if (parts[0] === "snbt") {
    const subtes = parts.slice(1, -1).join("_");
    const paket  = parts[parts.length - 1];
    return {
      ujian:  "SNBT",
      subtes: SUBTES_LABEL[subtes] ?? subtes.toUpperCase(),
      paket:  `Paket ${paket}`,
      full:   `SNBT · ${SUBTES_LABEL[subtes] ?? subtes} · Paket ${paket}`,
    };
  }
  if (parts[0] === "tka") {
    const jenjang = parts[1].toUpperCase();
    const subtes  = parts.slice(2, -1).join(" ").replace(/_/g, " ");
    const paket   = parts[parts.length - 1];
    return {
      ujian:  `TKA ${jenjang}`,
      subtes: subtes.replace(/\b\w/g, (c) => c.toUpperCase()),
      paket:  `Paket ${paket}`,
      full:   `TKA ${jenjang} · ${subtes} · Paket ${paket}`,
    };
  }
  return { ujian: slug, subtes: "", paket: "", full: slug };
}

// ── Komponen satu soal ────────────────────────────────────────────────────────
function SoalItem({ item, nomor }) {
  const options = ["a", "b", "c", "d", "e"].filter(
    (o) => item[`pilihan_${o}`] || item[`pilihan_${o}_img`]
  );
  const statements = ["1", "2", "3", "4", "5"].filter(
    (s) => item[`pernyataan_${s}`] || item[`pernyataan_${s}_img`]
  );
  const hasBacaan = !!(item.bacaan_1?.length);
  const isHtml    = item.inner_html === "yes";

  return (
    <div className="soal-item mb-8 pb-6 border-b border-gray-200 last:border-0">

      {/* ── Bacaan / stimulus ────────────────────────────────────────────────── */}
      {hasBacaan && (
        <div className="bacaan-box bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4 text-sm leading-relaxed">
          {item.judul_text1 && (
            <p className="font-bold text-center mb-3">{item.judul_text1}</p>
          )}
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((n) => {
            const val = item[`bacaan_${n}`];
            if (!val) return null;
            const isBold = n === 10 || n === 16;
            const isHtmlBacaan = n === 14 || n === 16;
            return isHtmlBacaan ? (
              <div key={n} className="mb-2" dangerouslySetInnerHTML={{ __html: val }} />
            ) : (
              <p key={n} className={`text-justify mb-2 ${isBold ? "font-semibold text-center" : ""}`}>
                <Latex>{val}</Latex>
              </p>
            );
          })}
        </div>
      )}

      {/* ── Nomor + soal ─────────────────────────────────────────────────────── */}
      <div className="flex gap-3 mb-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 text-white text-sm font-bold flex items-center justify-center">
          {nomor}
        </span>
        <div className="flex-1 pt-1">
          {item.link_gambar && (
            <img src={item.link_gambar} alt="Gambar soal" className="mb-2 max-w-xs rounded" />
          )}
          {item.bacaan_15 && (
            <p className="mb-1 text-sm"><Latex>{item.bacaan_15}</Latex></p>
          )}
          <div className="text-sm leading-relaxed">
            {isHtml
              ? <span dangerouslySetInnerHTML={{ __html: item.soal }} />
              : <Latex>{item.soal ?? ""}</Latex>
            }
          </div>
        </div>
      </div>

      {/* ── Opsi jawaban ─────────────────────────────────────────────────────── */}
      <div className="ml-11">

        {/* Pilihan ganda */}
        {item.typeOpsi === "pilgan" && options.length > 0 && (
          <div className="space-y-1.5">
            {options.map((opt) => {
              const img = item[`pilihan_${opt}_img`];
              const txt = item[`pilihan_${opt}`];
              const isKunci = item.kunci_jawaban?.toUpperCase() === opt.toUpperCase();
              return (
                <div key={opt} className={`flex gap-2 items-start text-sm p-1.5 rounded ${isKunci ? "bg-green-50 border border-green-300" : ""}`}>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border ${isKunci ? "bg-green-600 text-white border-green-600" : "border-gray-400 text-gray-600"}`}>
                    {opt.toUpperCase()}
                  </span>
                  <div className="flex-1 pt-0.5">
                    {img && <img src={img} alt={`Pilihan ${opt}`} className="mb-1 max-w-[200px] rounded" />}
                    {txt && (isHtml
                      ? <span dangerouslySetInnerHTML={{ __html: txt }} />
                      : <Latex>{txt}</Latex>
                    )}
                  </div>
                  {isKunci && (
                    <span className="flex-shrink-0 text-green-600 text-xs font-bold mt-0.5">✓</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Benar / Salah */}
        {item.typeOpsi === "benarsalah" && (
          <div className="border rounded-lg overflow-hidden text-sm">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-r p-2 text-left font-semibold">Pernyataan</th>
                  <th className="border-b border-r p-2 w-12 text-center font-semibold">B</th>
                  <th className="border-b p-2 w-12 text-center font-semibold">S</th>
                </tr>
              </thead>
              <tbody>
                {statements.map((s, idx) => {
                  const img = item[`pernyataan_${s}_img`];
                  const txt = item[`pernyataan_${s}`];
                  // kunci_jawaban format: "1B2S3B4S5B" — ambil karakter ke idx*2+1
                  const kunciChar = item.kunci_jawaban?.[idx * 2 + 1] ?? "";
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border-r p-2">
                        {img && <img src={img} alt={`P${s}`} className="max-w-[150px] mb-1 rounded" />}
                        {txt && (isHtml
                          ? <span dangerouslySetInnerHTML={{ __html: txt }} />
                          : <Latex>{txt}</Latex>
                        )}
                      </td>
                      <td className={`border-r p-2 text-center font-bold text-green-600 ${kunciChar === "B" ? "bg-green-50" : ""}`}>
                        {kunciChar === "B" ? "✓" : ""}
                      </td>
                      <td className={`p-2 text-center font-bold text-red-500 ${kunciChar === "S" ? "bg-red-50" : ""}`}>
                        {kunciChar === "S" ? "✓" : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Checkbox */}
        {item.typeOpsi === "checkbox" && (
          <div className="space-y-1.5 text-sm">
            {statements.map((s, idx) => {
              // kunci_jawaban format: "135" → nomor pernyataan yang benar
              const isKunci = item.kunci_jawaban?.includes(s);
              return (
                <div key={idx} className={`flex gap-2 items-start p-1.5 rounded ${isKunci ? "bg-green-50 border border-green-300" : ""}`}>
                  <span className={`flex-shrink-0 w-5 h-5 rounded border-2 text-xs flex items-center justify-center mt-0.5 ${isKunci ? "bg-green-600 border-green-600 text-white font-bold" : "border-gray-400"}`}>
                    {isKunci ? "✓" : ""}
                  </span>
                  <Latex>{item[`pernyataan_${s}`] ?? ""}</Latex>
                </div>
              );
            })}
          </div>
        )}

        {/* Input angka */}
        {item.typeOpsi === "inputangka" && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500">Jawaban:</span>
            <span className="border-2 border-green-500 bg-green-50 text-green-700 font-bold px-4 py-1 rounded-lg">
              {item.kunci_jawaban ?? "—"}
            </span>
          </div>
        )}

        {/* Kunci untuk tipe selain yang sudah ditampilkan di opsi */}
        {item.typeOpsi !== "pilgan" && item.typeOpsi !== "benarsalah" &&
         item.typeOpsi !== "checkbox" && item.typeOpsi !== "inputangka" && (
          <div className="text-sm text-gray-500 mt-1">
            Kunci: <span className="font-bold text-green-700">{item.kunci_jawaban ?? "—"}</span>
          </div>
        )}

      </div>
    </div>
  );
}

// ── Halaman utama ─────────────────────────────────────────────────────────────
export default function CetakSoal() {
  const router              = useRouter();
  const { kategori }        = router.query;
  const [soal, setSoal]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const [generating, setGenerating] = useState(false);
  const contentRef          = useRef(null);

  const meta = kategori ? getLabelFromSlug(kategori) : null;

  // ── Fetch soal ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!kategori) return;
    setLoading(true);
    fetch(`/api/soal/soal?kategori=${kategori}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.data?.length) setSoal(data.data);
        else setError("Soal tidak ditemukan untuk kategori ini.");
      })
      .catch(() => setError("Gagal memuat soal. Periksa koneksi."))
      .finally(() => setLoading(false));
  }, [kategori]);

  // ── Generate PDF ────────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (!contentRef.current || generating) return;
    setGenerating(true);

    try {
      // Import html2pdf hanya di client
      const html2pdf = (await import("html2pdf.js")).default;

      const filename = `${kategori ?? "soal"}_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;

      const opt = {
        margin:      [12, 12, 12, 12], // mm: atas, kanan, bawah, kiri
        filename,
        image:       { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale:        2,             // resolusi 2x agar teks tajam
          useCORS:      true,          // izinkan gambar cross-origin
          logging:      false,
          letterRendering: true,
        },
        jsPDF: {
          unit:        "mm",
          format:      "a4",
          orientation: "portrait",
        },
        pagebreak: {
          mode:        ["avoid-all", "css"],
          avoid:       ".soal-item",  // hindari soal terpotong antar halaman
        },
      };

      await html2pdf().set(opt).from(contentRef.current).save();
    } catch (err) {
      console.error("PDF error:", err);
      alert("Gagal generate PDF. Coba lagi.");
    } finally {
      setGenerating(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <Head>
        <title>Cetak Soal — {meta?.full ?? kategori}</title>
        <style>{`
          @media print {
            .no-print { display: none !important; }
            .soal-item { page-break-inside: avoid; }
          }
          body { font-family: 'Georgia', serif; }
        `}</style>
      </Head>

      {/* ── Toolbar (tidak ikut ke PDF) ──────────────────────────────────────── */}
      <div className="no-print sticky top-0 z-50 bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <div>
          <p className="font-bold text-sm">{meta?.full ?? kategori}</p>
          <p className="text-xs text-gray-400">{soal.length} soal</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-sm rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          >
            ← Kembali
          </button>
          <button
            onClick={handleDownload}
            disabled={generating || loading || !!error}
            className="px-5 py-2 text-sm font-bold rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            {generating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Konten yang akan jadi PDF ────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-8 py-8 bg-white min-h-screen">

        {loading && (
          <div className="flex items-center justify-center py-20 text-gray-500">
            <svg className="w-6 h-6 animate-spin mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Memuat soal...
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center text-red-700">
            <p className="font-bold mb-1">Gagal Memuat</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && soal.length > 0 && (
          <div ref={contentRef}>
            {/* Kop halaman */}
            <div className="text-center mb-8 pb-4 border-b-2 border-gray-800">
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">
                Bimbel LB3R
              </p>
              <h1 className="text-2xl font-bold text-gray-900">{meta?.ujian}</h1>
              <h2 className="text-lg font-semibold text-gray-700 mt-1">{meta?.subtes}</h2>
              <div className="flex items-center justify-center gap-4 mt-2 text-sm text-gray-500">
                <span>{meta?.paket}</span>
                <span>·</span>
                <span>{soal.length} Soal</span>
                <span>·</span>
                <span>{new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
            </div>

            {/* Daftar soal */}
            {soal.map((item, idx) => (
              <SoalItem key={item.id} item={item} nomor={idx + 1} />
            ))}

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
              © Bimbel LB3R · {meta?.full} · Dokumen ini dibuat otomatis
            </div>
          </div>
        )}
      </div>
    </>
  );
}