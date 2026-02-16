// components/MyDropdownTipeSoal.jsx
// Dropdown pilih subtes SNBT — user pilih mana yang dikerjakan pertama.
// Menyimpan pilihan ke "snbt__subtesAwal" (bukan "subtesAwal" tanpa prefix).

import { useEffect, useState } from "react";
import { sessionGet, sessionSet } from "../utils/lsSession";

const JU = "snbt";

const SUBTES_SNBT = [
  { value: "pu",  label: "Penalaran Umum" },
  { value: "ppu", label: "Pengetahuan & Pemahaman Umum" },
  { value: "pbm", label: "Pemahaman Bacaan & Menulis" },
  { value: "pk",  label: "Pengetahuan Kuantitatif" },
  { value: "lbe", label: "Literasi Bahasa Inggris" },
  { value: "lbi", label: "Literasi Bahasa Indonesia" },
  { value: "pm",  label: "Penalaran Matematika" },
];

const URUTAN_DEFAULT = SUBTES_SNBT.map((s) => s.value);

export default function MyDropdownTipeSoal({ disabled }) {
  const [selected, setSelected]   = useState("");
  const [linkSudah, setLinkSudah] = useState([]);

  // Baca subtes yang sudah selesai
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = JSON.parse(sessionGet(JU, "linkSudah") || "[]");
      const selesai = stored.map((slug) => slug.split("_").slice(1, -1).join("_"));
      setLinkSudah(selesai);
    } catch { setLinkSudah([]); }
  }, []);

  // Restore pilihan sebelumnya
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = sessionGet(JU, "subtesAwal");
    if (stored) setSelected(stored);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setSelected(val);
    if (val) {
      sessionSet(JU, "subtesAwal", val);
    } else {
      sessionGet(JU, "subtesAwal") && localStorage.removeItem(`${JU}__subtesAwal`);
    }
  };

  // Preview urutan
  const previewUrutan = selected
    ? [selected, ...URUTAN_DEFAULT.filter((s) => s !== selected)]
    : URUTAN_DEFAULT;

  return (
    <>
      <label htmlFor="tipesoalsnbt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Mulai dari Subtes
      </label>
      <select
        id="tipesoalsnbt"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        value={selected}
        onChange={handleChange}
        disabled={disabled}
      >
        <option value="">Pilih subtes awal (opsional)</option>
        {SUBTES_SNBT.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={linkSudah.includes(opt.value)}>
            {opt.label}{linkSudah.includes(opt.value) ? " ✓ selesai" : ""}
          </option>
        ))}
      </select>

      {selected && (
        <p className="text-xs text-gray-500 mt-1">
          Urutan:{" "}
          {previewUrutan
            .map((v) => SUBTES_SNBT.find((s) => s.value === v)?.label.split(" ")[0])
            .join(" → ")}
        </p>
      )}
    </>
  );
}