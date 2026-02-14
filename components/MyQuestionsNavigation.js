// components/QuestionNavigation.jsx
// Navigasi soal + tampilkan jawaban per nomor.
//
// Props:
//   slug           — slug aktif, e.g. "snbt_pu_01" (wajib)
//   totalQuestions — jumlah soal
//   currentPage    — nomor soal yang sedang aktif
//   setCurrentPage — fungsi navigasi ke nomor soal tertentu
//   onClose        — fungsi tutup modal
//
// Jawaban dibaca dari localStorage dengan key berformat:
//   "{slug}__group{n}"       → pilgan / inputangka
//   "{slug}__group{n}_{i}"   → benar/salah (sub-pernyataan)
//   "{slug}__isChecked"      → data ragu-ragu (JSON)
//
// Di MainPageSoal cukup tambah satu prop slug:
//   <QuestionNavigation slug={slug} totalQuestions={...} ... />

import { useState, useEffect, useMemo } from "react";

// ── Helper: baca satu key dengan slug prefix ──────────────────────────────────
function lsGet(slug, key) {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`${slug}__${key}`);
}

// ── Helper: format jawaban per nomor soal → string ringkas atau null ──────────
function formatJawaban(nomor, slug) {
  // Cek tipe benar/salah: ada key group{n}_0, group{n}_1, dst
  const subAnswers = [];
  for (let i = 0; i <= 9; i++) {
    const val = lsGet(slug, `group${nomor}_${i}`);
    if (val && val.trim() !== "") {
      subAnswers.push({ index: i, value: val.trim() });
    } else if (i > 0 && val === null) {
      break; // tidak ada sub-pernyataan berikutnya
    }
  }

  if (subAnswers.length > 0) {
    const joined = subAnswers
      .sort((a, b) => a.index - b.index)
      .map((s) => s.value)
      .join("");
    return joined || null;
  }

  // Pilgan / inputangka / checkbox
  const val = lsGet(slug, `group${nomor}`);
  if (!val || val.trim() === "") return null;

  // Checkbox tersimpan sebagai array JSON
  try {
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) {
      if (parsed.length === 0) return null;
      return parsed
        .map((v) => parseInt(v))
        .filter((v) => !isNaN(v))
        .sort((a, b) => a - b)
        .join("");
    }
  } catch {
    // bukan JSON, lanjut
  }

  // Checkbox tersimpan sebagai string "1,3,2"
  if (val.includes(",")) {
    return val
      .split(",")
      .map((v) => parseInt(v.trim()))
      .filter((v) => !isNaN(v))
      .sort((a, b) => a - b)
      .join("");
  }

  return val.trim();
}

// ── Komponen utama ────────────────────────────────────────────────────────────
export default function MyQuestionNavigation({
  slug,
  totalQuestions,
  currentPage,
  setCurrentPage,
  onClose,
}) {
  const [answers, setAnswers]     = useState({});
  const [isChecked, setIsChecked] = useState({});

  // Baca semua jawaban + ragu-ragu dari localStorage saat modal dibuka
  useEffect(() => {
    if (!slug || !totalQuestions) return;

    const result = {};
    for (let n = 1; n <= totalQuestions; n++) {
      result[n] = formatJawaban(n, slug);
    }
    setAnswers(result);

    try {
      const raw = lsGet(slug, "isChecked");
      setIsChecked(raw ? JSON.parse(raw) : {});
    } catch {
      setIsChecked({});
    }
  }, [slug, totalQuestions]);

  const dijawab  = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);
  const belum    = totalQuestions - dijawab;
  const raguragu = useMemo(() => Object.values(isChecked).filter(Boolean).length, [isChecked]);

  return (
    <div
      className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex justify-center items-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl w-[90%] max-w-md relative shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-3 flex items-center justify-between">
          <h2 className="text-white font-bold text-sm">📋 Navigasi Soal</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-lg leading-none"
            aria-label="Tutup navigasi"
          >
            ✕
          </button>
        </div>

        {/* Ringkasan */}
        <div className="flex gap-4 px-4 py-2 bg-gray-50 border-b text-xs font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-green-600 inline-block" />
            Dijawab: {dijawab}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-gray-400 inline-block" />
            Belum: {belum}
          </span>
          {raguragu > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block" />
              Ragu: {raguragu}
            </span>
          )}
        </div>

        {/* Grid nomor soal */}
        <div className="p-4 grid grid-cols-5 gap-2 max-h-[60vh] overflow-y-auto">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const n       = i + 1;
            const jawaban = answers[n];
            const ragu    = isChecked[n];
            const aktif   = currentPage === n;

            return (
              <button
                key={n}
                onClick={() => {
                  setCurrentPage(n);
                  onClose();
                }}
                className={`
                  relative flex flex-col items-center justify-center
                  rounded-lg py-1.5 px-1 text-xs font-bold border-2 transition-all
                  ${aktif
                    ? "border-blue-500 bg-blue-50 text-blue-700 scale-105 shadow"
                    : jawaban
                    ? "border-green-500 bg-green-50 text-green-800"
                    : "border-gray-300 bg-white text-gray-500 hover:border-gray-400"
                  }
                `}
              >
                <span>{n}</span>

                {jawaban && (
                  <span className={`
                    text-[10px] font-bold mt-0.5 truncate max-w-full px-0.5
                    ${aktif ? "text-blue-600" : "text-green-700"}
                  `}>
                    {jawaban.length > 4 ? jawaban.slice(0, 4) + "…" : jawaban}
                  </span>
                )}

                {ragu && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t text-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-800 font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}