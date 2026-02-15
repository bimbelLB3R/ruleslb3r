// components/DropdownTipeSoalTka.jsx
// Dropdown pilih subtes TKA — user bisa pilih subtes mana yang dikerjakan pertama.
// Subtes yang dipilih akan dikerjakan PERTAMA, sisanya mengikuti urutan default.
// Khusus SMA: user pilih dulu 2 mapel peminatan via checkbox sebelum bisa
// memilih subtes awal.
//
// Paket dibaca dari localStorage("paket") yang sudah di-set LoginTkaCf dari DB.

import { useEffect, useState } from "react";

// ── Urutan default subtes per jenjang ────────────────────────────────────────
const URUTAN_DEFAULT = {
  sd:  ["matematika", "ipa", "b_indonesia", "ips"],
  smp: ["matematika", "ipa", "b_indonesia", "b_inggris", "ips"],
  sma: ["matematika", "b_indonesia", "b_inggris"], // + peminatan pilihan
};

// ── Label tampilan per subtes ─────────────────────────────────────────────────
const SUBTES_LABEL = {
  matematika:  "Matematika",
  ipa:         "IPA",
  b_indonesia: "Bahasa Indonesia",
  b_inggris:   "Bahasa Inggris",
  ips:         "IPS",
  fisika:      "Fisika",
  kimia:       "Kimia",
  biologi:     "Biologi",
  ekonomi:     "Ekonomi",
  geografi:    "Geografi",
  sejarah:     "Sejarah",
  sosiologi:   "Sosiologi",
};

// ── Mapel peminatan SMA (maks 2) ──────────────────────────────────────────────
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
  const [mapelPilihan, setMapelPilihan]     = useState([]); // peminatan SMA
  const [linkSudah, setLinkSudah]           = useState([]); // subtes sudah selesai

  // ── Baca subtes yang sudah dikerjakan (disable opsi selesai) ─────────────
  // linkSudah berisi slug e.g. ["tka_smp_matematika_01"]
  // Kita ekstrak subtes key: "tka_smp_matematika_01" → "matematika"
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = JSON.parse(localStorage.getItem("linkSudah") || "[]");
      // slug format: tka_{jenjang}_{subtes...}_{paket}
      // parts[0]=tka, parts[1]=jenjang, parts[last]=paket, sisanya=subtes
      const subtesSelesai = stored.map((slug) => {
        const parts = slug.split("_");
        return parts.slice(2, -1).join("_"); // "b_indonesia", "matematika", dll
      });
      setLinkSudah(subtesSelesai);
    } catch {
      setLinkSudah([]);
    }
  }, []);

  // ── Restore pilihan sebelumnya jika user kembali ke halaman ─────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedSubtes = localStorage.getItem("subtesAwalTka");
    if (storedSubtes) setSelectedSubtes(storedSubtes);

    if (selectedJenjang === "sma") {
      try {
        const stored = JSON.parse(localStorage.getItem("mapelPilihanSiswa") || "[]");
        setMapelPilihan(stored);
      } catch {
        setMapelPilihan([]);
      }
    }
  }, [selectedJenjang]);

  // ── Reset pilihan subtes saat jenjang berubah ────────────────────────────
  useEffect(() => {
    setSelectedSubtes("");
    localStorage.removeItem("subtesAwalTka");
    if (selectedJenjang !== "sma") {
      setMapelPilihan([]);
      localStorage.removeItem("mapelPilihanSiswa");
    }
  }, [selectedJenjang]);

  // ── Simpan mapelPilihan ke localStorage setiap berubah ──────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (selectedJenjang === "sma") {
      localStorage.setItem("mapelPilihanSiswa", JSON.stringify(mapelPilihan));
    }
  }, [mapelPilihan, selectedJenjang]);

  // ── Handle pilih subtes awal ─────────────────────────────────────────────
  const handleChange = (e) => {
    const subtesKey = e.target.value;
    setSelectedSubtes(subtesKey);
    if (typeof window === "undefined") return;

    if (!subtesKey || !selectedJenjang) {
      localStorage.removeItem("subtesAwalTka");
      return;
    }

    // Susun urutan: subtes pilihan di depan, sisanya default
    const peminatan  = selectedJenjang === "sma" ? mapelPilihan : [];
    const urutan     = URUTAN_DEFAULT[selectedJenjang] ?? [];
    const urutanFull = [...urutan, ...peminatan]; // wajib + peminatan
    const urutanFinal = [
      subtesKey,
      ...urutanFull.filter((s) => s !== subtesKey),
    ];

    // Simpan ke localStorage — LoginTkaCf akan baca ini saat submit
    localStorage.setItem("subtesAwalTka", subtesKey);

    // Preview slug dataSoal (paket dari localStorage yang sudah di-set LoginTkaCf)
    const paket    = localStorage.getItem("paket") || "01";
    const dataSoal = urutanFinal.map((s) => `tka_${selectedJenjang}_${s}_${paket}`);
    localStorage.setItem("link",     dataSoal[0]);
    localStorage.setItem("dataSoal", JSON.stringify(dataSoal));
  };

  // ── Handle checkbox peminatan SMA ────────────────────────────────────────
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (mapelPilihan.length >= 2) {
        alert("Maksimal 2 mapel pilihan!");
        e.target.checked = false;
        return;
      }
      setMapelPilihan((prev) => [...prev, value]);
    } else {
      setMapelPilihan((prev) => prev.filter((m) => m !== value));
      // Reset pilihan subtes jika mapel yang di-uncheck adalah subtes yang dipilih
      if (selectedSubtes === value) {
        setSelectedSubtes("");
        localStorage.removeItem("subtesAwalTka");
      }
    }
  };

  // ── Opsi subtes yang ditampilkan di dropdown ─────────────────────────────
  const getOptions = () => {
    if (!selectedJenjang) return [];
    const urutan   = URUTAN_DEFAULT[selectedJenjang] ?? [];
    const peminatan = selectedJenjang === "sma" ? mapelPilihan : [];
    return [...urutan, ...peminatan].map((s) => ({
      value:   s,
      label:   SUBTES_LABEL[s] ?? s,
      selesai: linkSudah.includes(s),
    }));
  };

  const options     = getOptions();
  const isSmaReady  = selectedJenjang !== "sma" || mapelPilihan.length === 2;
  const formDisabled = disabled || !selectedJenjang;

  return (
    <>
      {/* ── Checkbox peminatan (hanya SMA) ───────────────────────────────── */}
      {selectedJenjang === "sma" && (
        <div className="mb-4">
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Pilih 2 Mapel Peminatan
            <span className={`ml-2 text-xs font-bold ${mapelPilihan.length === 2 ? "text-green-600" : "text-orange-500"}`}>
              ({mapelPilihan.length}/2 dipilih)
            </span>
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {PEMINATAN_SMA.map((opt) => {
              const checked  = mapelPilihan.includes(opt.value);
              const maxed    = !checked && mapelPilihan.length >= 2;
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2 text-sm p-1.5 rounded-lg cursor-pointer transition ${
                    checked   ? "bg-emerald-50 text-emerald-800 font-medium"
                    : maxed   ? "opacity-40 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={opt.value}
                    checked={checked}
                    onChange={handleCheckbox}
                    disabled={maxed || disabled}
                    className="accent-emerald-600"
                  />
                  {opt.label}
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Dropdown subtes awal ─────────────────────────────────────────── */}
      <label
        htmlFor="tipesoaltka"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Mulai dari Subtes
      </label>
      <select
        id="tipesoaltka"
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        value={selectedSubtes}
        onChange={handleChange}
        disabled={formDisabled || !isSmaReady}
        required
      >
        <option value="">
          {!selectedJenjang
            ? "Pilih jenjang dulu"
            : selectedJenjang === "sma" && mapelPilihan.length < 2
            ? `Pilih ${2 - mapelPilihan.length} mapel peminatan lagi`
            : "Pilih subtes awal"
          }
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            disabled={opt.selesai}
          >
            {opt.label}{opt.selesai ? " ✓ selesai" : ""}
          </option>
        ))}
      </select>

      {/* Preview urutan */}
      {selectedSubtes && isSmaReady && (
        <p className="text-xs text-gray-500 mt-1">
          Urutan:{" "}
          {getOptions()
            .sort((a, b) =>
              a.value === selectedSubtes ? -1 : b.value === selectedSubtes ? 1 : 0
            )
            .map((o) => o.label.split(" ")[0])
            .join(" → ")}
        </p>
      )}
    </>
  );
}