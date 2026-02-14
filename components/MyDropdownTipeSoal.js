// components/DropdownTipeSoal.jsx
// Dropdown pilih subtes SNBT — user bisa pilih urutan mengerjakan sendiri.
// Subtes yang dipilih akan dikerjakan PERTAMA, sisanya mengikuti urutan default.
// Paket diambil dari localStorage("paket") yang sudah di-set oleh LoginSnbtCf
// dari API /api/config/paket-aktif.

import React, { useEffect, useState } from "react";

// Urutan default subtes SNBT (jika user tidak pilih / pilih "Urutan Normal")
const URUTAN_DEFAULT = ["pu", "ppu", "pbm", "pk", "lbe", "lbi", "pm"];

const SUBTES_OPTIONS = [
  { value: "pu",  label: "Penalaran Umum" },
  { value: "lbi", label: "Literasi Bahasa Indonesia" },
  { value: "pbm", label: "Pemahaman Bacaan & Menulis" },
  { value: "lbe", label: "Literasi Bahasa Inggris" },
  { value: "pm",  label: "Penalaran Matematika" },
  { value: "ppu", label: "Pengetahuan & Pemahaman Umum" },
  { value: "pk",  label: "Pengetahuan Kuantitatif" },
];

export default function MyDropdownTipeSoal({ disabled }) {
  const [selectedSubtes, setSelectedSubtes] = useState("");
  const [linkSudah, setLinkSudah] = useState([]);

  // ── Baca subtes yang sudah dikerjakan (untuk disable opsi) ────────────────
  // linkSudah berisi array slug yang sudah selesai, e.g. ["snbt_pu_01"]
  // Kita ekstrak key subtesnya saja: "snbt_pu_01" → "pu"
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = JSON.parse(localStorage.getItem("linkSudah") || "[]");
      // Ekstrak subtes key dari slug: "snbt_pu_01" → "pu", "snbt_lbi_02" → "lbi"
      const subtesSelesai = stored.map((slug) => {
        const parts = slug.split("_");
        // slug format: snbt_{subtes}_{paket}
        // parts[0]=snbt, parts[last]=paket, sisanya=subtes
        return parts.slice(1, -1).join("_");
      });
      setLinkSudah(subtesSelesai);
    } catch {
      setLinkSudah([]);
    }
  }, []);

  // ── Saat user pilih subtes, update localStorage ───────────────────────────
  // LoginSnbtCf akan baca paket dari DB lalu build dataSoal dengan urutan baru
  const handleChange = (e) => {
    const subtesKey = e.target.value; // e.g. "lbi"
    setSelectedSubtes(subtesKey);

    if (typeof window === "undefined") return;

    if (!subtesKey) {
      // User pilih "Pilih" (kosong) → hapus preferensi, urutan kembali default
      localStorage.removeItem("subtesAwal");
      return;
    }

    // Simpan pilihan subtes awal — LoginSnbtCf akan baca ini saat submit
    localStorage.setItem("subtesAwal", subtesKey);

    // Hitung ulang dataSoal dengan subtes pilihan di depan
    // (preview saja — LoginSnbtCf yang rebuild saat submit dengan paket dari DB)
    const paket = localStorage.getItem("paket") || "01";
    const urutan = [
      subtesKey,
      ...URUTAN_DEFAULT.filter((s) => s !== subtesKey),
    ];
    const dataSoal = urutan.map((s) => `snbt_${s}_${paket}`);

    // Update link = slug pertama yang akan dikerjakan
    const link = dataSoal[0]; // e.g. "snbt_lbi_01"
    localStorage.setItem("link", link);
    localStorage.setItem("dataSoal", JSON.stringify(dataSoal));
  };

  // ── Restore pilihan jika user kembali ke halaman login ───────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedSubtes = localStorage.getItem("subtesAwal");
    if (storedSubtes) setSelectedSubtes(storedSubtes);
  }, []);

  return (
    <>
      <label
        htmlFor="tipesoal"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Mulai dari Subtes
      </label>
      <select
        id="tipesoal"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedSubtes}
        onChange={handleChange}
        disabled={disabled}
        required
      >
        <option value="">Pilih subtes awal</option>
        {SUBTES_OPTIONS.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            disabled={linkSudah.includes(opt.value)}
          >
            {opt.label}
            {linkSudah.includes(opt.value) ? " ✓ selesai" : ""}
          </option>
        ))}
      </select>

      {selectedSubtes && (
        <p className="text-xs text-gray-500 mt-1">
          Urutan:{" "}
          {[selectedSubtes, ...URUTAN_DEFAULT.filter((s) => s !== selectedSubtes)]
            .map((s) => SUBTES_OPTIONS.find((o) => o.value === s)?.label?.split(" ")[0])
            .join(" → ")}
        </p>
      )}
    </>
  );
}