import React, { useEffect, useState } from "react";

export default function Dropdown({ disabled }) {
  // console.log(disabled);
  const [selectedOption, setSelectedOption] = useState("");
  const [linkSudah, setLinkSudah] = useState([]);

  useEffect(() => {
    // Ambil linkSudah dari localStorage
    const storedLinks = JSON.parse(localStorage.getItem("linkSudah")) || [];
    setLinkSudah(storedLinks);
  }, []);

  const handleDrop = (e) => {
    // e.preventDefault();
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    // jika user masih belum selesai (masih ada waktu) dan mau login maka diarahkan ke halaman snbt
    const cekLokal=localStorage.getItem("link");
    const cekWaktu=localStorage.getItem("maxTime")
    if(cekWaktu){
      setSelectedOption(cekLokal);
    }else{
      localStorage.setItem("link", selectedOption);

    }
  });
  return (
    <>
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
        disabled={disabled}
        required
      >
        <option className="text-lg p-2 " value="">
          Pilih
        </option>
        {[
          { value: "snbt", label: "Literasi BI" },
          { value: "english", label: "Literasi English" },
          { value: "penalaran", label: "Penalaran Umum" },
          { value: "bacaan", label: "Pemahaman Bacaan & Menulis" },
          { value: "matematika", label: "Penalaran Matematika" },
          { value: "pengetahuan", label: "Pengetahuan & Pemahaman Umum" },
          { value: "kuantitatif", label: "Pengetahuan Kuantitatif" },
        ].map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={linkSudah.includes(option.value)} // Disable jika ada di linkSudah
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
