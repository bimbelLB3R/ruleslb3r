import React, { useEffect, useState } from "react";

export default function Dropdown({ disabled }) {
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
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedOption}
        onChange={handleDrop}
        disabled={disabled}
      >
        <option className="text-lg p-2 " value="">
          Pilih
        </option>
        <option className="text-lg p-2 " value="snbt">
          Literasi BI
        </option>
        <option className="text-lg p-2 " value="english">
          Literasi English
        </option>
        <option className="text-lg p-2 " value="penalaran">
          Penalaran Umum
        </option>
        <option className="text-lg p-2 " value="bacaan">
          Pemahaman Bacaan & Menulis
        </option>
        <option className="text-lg p-2 " value="matematika">
          Penalaran Matematika
        </option>
        <option className="text-lg p-2 " value="pengetahuan">
          Pengetahuan & Pemahaman Umum
        </option>
        <option className="text-lg p-2 " value="kuantitatif">
          Pengetahuan Kuantitatif
        </option>
      </select>
    </>
  );
}
