import React, { useEffect, useState } from "react";

export default function DropdownTipeTes({ disabled }) {
  // console.log(disabled);
  const [selectedOption, setSelectedOption] = useState("");
  const handleDrop = (e) => {
    // e.preventDefault();
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    localStorage.setItem("link", selectedOption);
  });
  return (
    <>
      <label
        htmlFor="tipesoal"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Pilih Jenis Tes
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedOption}
        onChange={handleDrop}
        disabled={disabled}
        id="tipesoal"
      >
        <option className="text-lg p-2 " value="">
          Pilih
        </option>
        <option className="text-lg p-2 " value="diagnostik">
          Tes Diagnostik
        </option>
        
      </select>
    </>
  );
}
