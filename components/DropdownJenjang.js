import { useEffect, useState } from "react";
import Dropdowntka from "./DropdownTipeSoalTka";

export default function Dropdownjenjang({ disabled }) {
  // console.log(disabled);
  const [selectedOption, setSelectedOption] = useState("");


  const handleDrop = (e) => {
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    
      localStorage.setItem("jenjang", selectedOption);

  },[selectedOption]);
  return (
    <>
      <label
        htmlFor="tipesoal"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Pilih Jenjang
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedOption}
        onChange={handleDrop}
        disabled={disabled}
        required
      >
        <option className="text-lg p-2 " value="">
          Pilih
        </option>
        {[
          { value: "sd", label: "SD/MI" },
          { value: "smp", label: "SMP/MTs" },
          { value: "sma", label: "SMA/SMK/MA" },
        ].map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <Dropdowntka selectedJenjang={selectedOption}/>
    </>
  );
}
