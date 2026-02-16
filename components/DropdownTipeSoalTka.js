// components/DropdownTipeSoalTka.jsx
// Dropdown pilih subtes TKA — user pilih mana yang dikerjakan pertama.
// Khusus SMA: pilih 2 mapel peminatan dulu.
// Semua key disimpan dengan prefix "tka__".

import { useEffect, useState } from "react";
import { sessionGet, sessionSet } from "../utils/lsSession";

const JU = "tka";

const URUTAN_DEFAULT = {
  sd:  ["matematika", "ipa", "b_indonesia", "ips"],
  smp: ["matematika", "ipa", "b_indonesia", "b_inggris", "ips"],
  sma: ["matematika", "b_indonesia", "b_inggris"],
};

const SUBTES_LABEL = {
  matematika: "Matematika", ipa: "IPA", b_indonesia: "Bahasa Indonesia",
  b_inggris: "Bahasa Inggris", ips: "IPS", fisika: "Fisika",
  kimia: "Kimia", biologi: "Biologi", ekonomi: "Ekonomi",
  geografi: "Geografi", sejarah: "Sejarah", sosiologi: "Sosiologi",
};

const PEMINATAN_SMA = [
  { value: "fisika",    label: "Fisika"    },
  { value: "kimia",     label: "Kimia"     },
  { value: "biologi",   label: "Biologi"   },
  { value: "ekonomi",   label: "Ekonomi"   },
  { value: "geografi",  label: "Geografi"  },
  { value: "sejarah",   label: "Sejarah"   },
  { value: "sosiologi", label: "Sosiologi" },
];

export default function DropdownTipeSoalTka({ selectedJenjang, disabled }) {
  const [selectedSubtes, setSelectedSubtes] = useState("");
  const [mapelPilihan, setMapelPilihan]     = useState([]);
  const [linkSudah, setLinkSudah]           = useState([]);

  // Baca subtes selesai
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored    = JSON.parse(sessionGet(JU, "linkSudah") || "[]");
      const selesai   = stored.map((slug) => slug.split("_").slice(2, -1).join("_"));
      setLinkSudah(selesai);
    } catch { setLinkSudah([]); }
  }, []);

  // Restore pilihan sebelumnya
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = sessionGet(JU, "subtesAwalTka");
    if (stored) setSelectedSubtes(stored);
    if (selectedJenjang === "sma") {
      try {
        const m = JSON.parse(sessionGet(JU, "mapelPilihanSiswa") || "[]");
        setMapelPilihan(m);
      } catch { setMapelPilihan([]); }
    }
  }, [selectedJenjang]);

  // Reset saat jenjang berubah
  useEffect(() => {
    setSelectedSubtes("");
    localStorage.removeItem(`${JU}__subtesAwalTka`);
    if (selectedJenjang !== "sma") {
      setMapelPilihan([]);
      localStorage.removeItem(`${JU}__mapelPilihanSiswa`);
    }
  }, [selectedJenjang]);

  // Simpan mapelPilihan ke sessionKey
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (selectedJenjang === "sma") {
      sessionSet(JU, "mapelPilihanSiswa", JSON.stringify(mapelPilihan));
    }
  }, [mapelPilihan, selectedJenjang]);

  const handleChange = (e) => {
    const val = e.target.value;
    setSelectedSubtes(val);
    if (val) sessionSet(JU, "subtesAwalTka", val);
    else localStorage.removeItem(`${JU}__subtesAwalTka`);
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (mapelPilihan.length >= 2) { alert("Maksimal 2 mapel pilihan!"); e.target.checked = false; return; }
      setMapelPilihan((prev) => [...prev, value]);
    } else {
      setMapelPilihan((prev) => prev.filter((m) => m !== value));
      if (selectedSubtes === value) {
        setSelectedSubtes("");
        localStorage.removeItem(`${JU}__subtesAwalTka`);
      }
    }
  };

  const getOptions = () => {
    if (!selectedJenjang) return [];
    const urutan    = URUTAN_DEFAULT[selectedJenjang] ?? [];
    const peminatan = selectedJenjang === "sma" ? mapelPilihan : [];
    return [...urutan, ...peminatan].map((s) => ({
      value: s, label: SUBTES_LABEL[s] ?? s, selesai: linkSudah.includes(s),
    }));
  };

  const options    = getOptions();
  const isSmaReady = selectedJenjang !== "sma" || mapelPilihan.length === 2;

  return (
    <>
      {selectedJenjang === "sma" && (
        <div className="mb-4">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Pilih 2 Mapel Peminatan
            <span className={`ml-2 text-xs font-bold ${mapelPilihan.length === 2 ? "text-green-600" : "text-orange-500"}`}>
              ({mapelPilihan.length}/2)
            </span>
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {PEMINATAN_SMA.map((opt) => {
              const checked = mapelPilihan.includes(opt.value);
              const maxed   = !checked && mapelPilihan.length >= 2;
              return (
                <label key={opt.value} className={`flex items-center gap-2 text-sm p-1.5 rounded-lg cursor-pointer transition ${checked ? "bg-emerald-50 text-emerald-800 font-medium" : maxed ? "opacity-40 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50"}`}>
                  <input type="checkbox" value={opt.value} checked={checked} onChange={handleCheckbox} disabled={maxed || disabled} className="accent-emerald-600" />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </div>
      )}

      <label htmlFor="tipesoaltka" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Mulai dari Subtes
      </label>
      <select
        id="tipesoaltka"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        value={selectedSubtes}
        onChange={handleChange}
        disabled={disabled || !selectedJenjang || !isSmaReady}
      >
        <option value="">
          {!selectedJenjang ? "Pilih jenjang dulu"
            : selectedJenjang === "sma" && mapelPilihan.length < 2
            ? `Pilih ${2 - mapelPilihan.length} mapel peminatan lagi`
            : "Pilih subtes awal"}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.selesai}>
            {opt.label}{opt.selesai ? " ✓ selesai" : ""}
          </option>
        ))}
      </select>

      {selectedSubtes && isSmaReady && (
        <p className="text-xs text-gray-500 mt-1">
          Urutan:{" "}
          {options
            .sort((a, b) => a.value === selectedSubtes ? -1 : b.value === selectedSubtes ? 1 : 0)
            .map((o) => o.label.split(" ")[0])
            .join(" → ")}
        </p>
      )}
    </>
  );
}