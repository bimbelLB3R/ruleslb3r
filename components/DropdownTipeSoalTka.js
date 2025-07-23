import { useEffect, useState } from "react";

export default function Dropdowntka({ selectedJenjang }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [linkSudah, setLinkSudah] = useState([]);
  const [mapelPilihan, setMapelPilihan] = useState([]); // value saja

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem("linkSudah")) || [];
    setLinkSudah(storedLinks);
  }, []);

  const handleDrop = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const cekLokal = localStorage.getItem("link");
    const cekWaktu = localStorage.getItem("maxTime");
    if (cekWaktu) {
      setSelectedOption(cekLokal);
    } else {
      localStorage.setItem("link", selectedOption);
    }
  }, [selectedOption]);

  const subjects = {
    sma: [
      { value: "mattka", label: "Matematika" },
      { value: "indtka", label: "Bahasa Indonesia" },
      { value: "engtka", label: "Bahasa Inggris" },
    ],
    sd: [
      { value: "matsd", label: "Matematika SD" },
      { value: "bindosd", label: "Bahasa Indonesia SD" },
    ],
    smp: [
      { value: "matsmp", label: "Matematika SMP" },
      { value: "bindosmp", label: "Bahasa Indonesia SMP" },
    ],
  };

  const mapelPilihanSMA = [
    { value: "bindolanjut", label: "Bahasa Indonesia Lanjutan" },
    { value: "binglanjut", label: "Bahasa Inggris Lanjutan" },
    { value: "fisika", label: "Fisika" },
    { value: "kimia", label: "Kimia" },
    { value: "biologi", label: "Biologi" },
    { value: "ekonomi", label: "Ekonomi" },
    { value: "geografi", label: "Geografi" },
    { value: "sosiologi", label: "Sosiologi" },
    { value: "sejarah", label: "Sejarah" },
    { value: "jepang", label: "Bahasa Jepang" },
  ];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (mapelPilihan.length < 2) {
        setMapelPilihan([...mapelPilihan, value]);
      } else {
        alert("Maksimal hanya boleh memilih 2 mapel pilihan!");
        e.target.checked = false;
      }
    } else {
      setMapelPilihan(mapelPilihan.filter((item) => item !== value));
    }
  };

  // 🆕 Simpan ke localStorage setiap mapelPilihan berubah
  useEffect(() => {
    if (selectedJenjang === "sma") {
      localStorage.setItem("mapelPilihanSiswa", JSON.stringify(mapelPilihan));
    }
  }, [mapelPilihan, selectedJenjang]);

  const getMapelOptions = () => {
    if (selectedJenjang === "sma") {
      const selectedMapelObjects = mapelPilihanSMA.filter((m) =>
        mapelPilihan.includes(m.value)
      );
      return [
        ...subjects.sma,
        ...selectedMapelObjects,
      ];
    } else if (selectedJenjang === "sd") {
      return subjects.sd;
    } else if (selectedJenjang === "smp") {
      return subjects.smp;
    } else {
      return [];
    }
  };

  return (
    <>
      {selectedJenjang === "sma" && (
        <div className="mb-4">
          <p className="mb-2 font-medium">Pilih Maksimal 2 Mapel Pilihan:</p>
          <div className="grid grid-cols-2 gap-2">
            {mapelPilihanSMA.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={mapelPilihan.includes(option.value)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}

      <label
        htmlFor="tipesoal"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Pilih Soal
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedOption}
        onChange={handleDrop}
        id="tipesoal"
        required
        disabled={selectedJenjang === "sma" && mapelPilihan.length < 2}
      >
        <option className="text-lg p-2 " value="">
          Pilih
        </option>
        {getMapelOptions().map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={linkSudah.includes(option.value)}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
