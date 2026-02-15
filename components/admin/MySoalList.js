import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";

// ─── Helper: parse slug kategori ─────────────────────────────────────────────
// Format slug:
//   SNBT  → "snbt_{subtes}_{paket}"          contoh: "snbt_pu_01"
//   TKA   → "tka_{jenjang}_{subtes}_{paket}" contoh: "tka_smp_matematika_01"

function parseKategoriSlug(slug = "") {
  const parts = slug.split("_");
  if (parts[0] === "snbt") {
    return {
      jenisUjian: "SNBT",
      jenjang: null,
      subtes: parts[1] ?? "-",
      paket: parts[2] ?? "-",
      colorScheme: "blue",
    };
  }
  if (parts[0] === "tka") {
    return {
      jenisUjian: "TKA",
      jenjang: parts[1]?.toUpperCase() ?? "-",
      subtes: parts.slice(2, -1).join("_"),   // handle subtes multi-part (e.g. b_indonesia)
      paket: parts[parts.length - 1] ?? "-",
      colorScheme: "emerald",
    };
  }
  return { jenisUjian: slug, jenjang: null, subtes: "-", paket: "-", colorScheme: "gray" };
}

// ─── Label map sub-tes ────────────────────────────────────────────────────────
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

// ─── Tipe soal config ─────────────────────────────────────────────────────────
const TIPE_CONFIG = {
  pilgan: { label: "Pilihan Ganda", bg: "bg-blue-100", text: "text-blue-700" },
  benarsalah: { label: "Benar / Salah", bg: "bg-green-100", text: "text-green-700" },
  checkbox: { label: "Checkbox", bg: "bg-purple-100", text: "text-purple-700" },
  inputangka: { label: "Isian", bg: "bg-amber-100", text: "text-amber-700" },
};

// ─── Color scheme map ─────────────────────────────────────────────────────────
const SCHEME = {
  blue:    { accent: "text-blue-600",    ring: "focus:ring-blue-400",    btnPrimary: "bg-blue-600 hover:bg-blue-700" },
  emerald: { accent: "text-emerald-600", ring: "focus:ring-emerald-400", btnPrimary: "bg-emerald-600 hover:bg-emerald-700" },
  gray:    { accent: "text-gray-600",    ring: "focus:ring-gray-400",    btnPrimary: "bg-gray-600 hover:bg-gray-700"  },
};

// ─── Sub-komponen: Badge Tipe ─────────────────────────────────────────────────
function TipeBadge({ tipe }) {
  const cfg = TIPE_CONFIG[tipe] ?? TIPE_CONFIG.pilgan;
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      {cfg.label}
    </span>
  );
}

// ─── Sub-komponen: Empty State ────────────────────────────────────────────────
function EmptyState({ searchTerm }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <svg className="w-14 h-14 mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {searchTerm ? (
        <p className="text-sm">Tidak ada soal yang cocok dengan <strong>"{searchTerm}"</strong></p>
      ) : (
        <>
          <p className="font-semibold text-sm">Belum ada soal tersimpan</p>
          <p className="text-xs mt-1">Klik <strong>Tambah Soal</strong> untuk mulai mengisi bank soal ini.</p>
        </>
      )}
    </div>
  );
}

// ─── Sub-komponen: Skeleton Row ───────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
        </td>
      ))}
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MySoalList({ kategori, onEdit, refreshTrigger }) {
  const [soalList, setSoalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [duplicatingId, setDuplicatingId] = useState(null);

  const meta = parseKategoriSlug(kategori);
  const scheme = SCHEME[meta.colorScheme];

  // ─── Reset halaman kalau kategori berubah ──────────────────────────────────
  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm("");
  }, [kategori]);

  // ─── Fetch data ────────────────────────────────────────────────────────────
  const fetchSoalList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/soal/mylist?kategori=${encodeURIComponent(kategori)}&page=${currentPage}&limit=20`
      );
      const data = await res.json();
      if (res.ok) {
        setSoalList(data.data ?? []);
        setTotalPages(data.pagination?.totalPages ?? 1);
        setTotalData(data.pagination?.total ?? 0);
      } else {
        setSoalList([]);
      }
    } catch (err) {
      console.error("Fetch soal error:", err);
      setSoalList([]);
    } finally {
      setLoading(false);
    }
  }, [kategori, currentPage]);

  useEffect(() => {
    fetchSoalList();
  }, [fetchSoalList, refreshTrigger]);

  // ─── Hapus ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!id || !kategori) {
      Swal.fire("Error", "ID atau kategori tidak valid", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Hapus Soal?",
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(
        `/api/admin/soal/mydelete?id=${id}&kategori=${encodeURIComponent(kategori)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        Swal.fire({ title: "Terhapus!", text: data.message, icon: "success", timer: 1500, showConfirmButton: false });
        fetchSoalList();
      } else {
        Swal.fire("Gagal", data.error ?? "Terjadi kesalahan", "error");
      }
    } catch {
      Swal.fire("Error", "Terjadi kesalahan koneksi", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // ─── Duplikat ──────────────────────────────────────────────────────────────
  const handleDuplicate = async (id) => {
    const result = await Swal.fire({
      title: "Duplikat Soal?",
      text: "Soal ini akan disalin ke nomor baru di paket yang sama.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Duplikat!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    setDuplicatingId(id);
    try {
      const res = await fetch("/api/admin/soal/myduplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, kategori }),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire({ title: "Berhasil!", text: "Soal berhasil diduplikat.", icon: "success", timer: 1500, showConfirmButton: false });
        fetchSoalList();
      } else {
        Swal.fire("Gagal", data.error ?? "Gagal menduplikat soal", "error");
      }
    } catch {
      Swal.fire("Error", "Terjadi kesalahan koneksi", "error");
    } finally {
      setDuplicatingId(null);
    }
  };

  // ─── Filter lokal ──────────────────────────────────────────────────────────
  const filteredSoal = soalList.filter(
    (s) =>
      s.soal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nomor_soal?.toString().includes(searchTerm)
  );

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* ── Header: info konteks + search ───────────────────────────────────── */}
      <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">

        {/* Konteks */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            meta.colorScheme === "blue"
              ? "bg-blue-100 text-blue-700"
              : "bg-emerald-100 text-emerald-700"
          }`}>
            {meta.jenisUjian}
            {meta.jenjang ? ` · ${meta.jenjang}` : ""}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
            {SUBTES_LABEL[meta.subtes] ?? meta.subtes}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
            Paket {meta.paket}
          </span>
          {!loading && (
            <span className="text-xs text-gray-400">
              — {totalData} soal tersimpan
            </span>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari nomor atau teks soal…"
            className={`pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-full sm:w-72 focus:outline-none focus:ring-2 ${scheme.ring} focus:border-transparent`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* ── Tabel ───────────────────────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        {filteredSoal.length === 0 && !loading ? (
          <EmptyState searchTerm={searchTerm} />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide w-12">No</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide w-24">Sub-Tes</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Teks Soal</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide w-32">Tipe</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide w-16">Kunci</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide w-36">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading
                ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                : filteredSoal.map((soal, idx) => (
                    <tr
                      key={soal.id}
                      className="hover:bg-gray-50/70 transition-colors group"
                      style={{ animationDelay: `${idx * 30}ms` }}
                    >
                      {/* No */}
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold">
                          {soal.nomor_soal}
                        </span>
                      </td>

                      {/* Sub-tes (ambil dari kolom atau parse slug) */}
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {SUBTES_LABEL[soal.subtes ?? meta.subtes] ?? soal.kategori_soal ?? "-"}
                      </td>

                      {/* Teks Soal */}
                      <td className="px-4 py-3 max-w-sm">
                        <p className="truncate text-gray-800 leading-snug group-hover:text-gray-900">
                          {soal.soal}
                        </p>
                      </td>

                      {/* Tipe */}
                      <td className="px-4 py-3">
                        <TipeBadge tipe={soal.typeOpsi} />
                      </td>

                      {/* Kunci */}
                      <td className="px-4 py-3">
                        <span className={`font-bold text-sm ${scheme.accent}`}>
                          {soal.kunci_jawaban}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Edit */}
                          <button
                            onClick={() => onEdit(soal)}
                            title="Edit soal"
                            className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700 transition"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>

                          {/* Duplikat */}
                          <button
                            onClick={() => handleDuplicate(soal.id)}
                            disabled={duplicatingId === soal.id}
                            title="Duplikat soal"
                            className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 transition disabled:opacity-40"
                          >
                            {duplicatingId === soal.id ? (
                              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            )}
                          </button>

                          {/* Hapus */}
                          <button
                            onClick={() => handleDelete(soal.id)}
                            disabled={deletingId === soal.id}
                            title="Hapus soal"
                            className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 transition disabled:opacity-40"
                          >
                            {deletingId === soal.id ? (
                              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Pagination ────────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="px-5 py-3.5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-gray-50/50">
          <p className="text-xs text-gray-500">
            Halaman <span className="font-semibold text-gray-700">{currentPage}</span> dari{" "}
            <span className="font-semibold text-gray-700">{totalPages}</span>
            {" "}·{" "}
            <span className="font-semibold text-gray-700">{totalData}</span> total soal
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-white transition font-medium"
            >
              «
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-white transition font-medium"
            >
              ‹ Prev
            </button>
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
              const page = start + i;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition font-medium ${
                    page === currentPage
                      ? `${scheme.btnPrimary} text-white border-transparent`
                      : "border-gray-200 hover:bg-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-white transition font-medium"
            >
              Next ›
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-white transition font-medium"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}