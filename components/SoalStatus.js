import React, { useEffect, useState } from "react";

const SoalStatus = () => {
  const [dataSoal, setDataSoal] = useState([]);
  const [linkSudah, setLinkSudah] = useState([]);
  const [linkNow, setLinkNow] = useState();

  useEffect(() => {
    // Ambil data dari localStorage
    const storedDataSoal = JSON.parse(localStorage.getItem("dataSoal")) || [];
    const storedLinkSudah = JSON.parse(localStorage.getItem("linkSudah")) || [];
    const storedLinkNow = localStorage.getItem("link");
    
    setDataSoal(storedDataSoal);
    setLinkSudah(storedLinkSudah);
    setLinkNow(storedLinkNow);
  }, []);

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg">
      {dataSoal.map((soal, index) => (
        <div
          key={index}
          className={`px-2 py-1 rounded-md text-white text-xs ${
            linkNow.includes(soal)||linkSudah.includes(soal) ? "bg-green-500" : "bg-gray-400"
          } ${
            linkNow.includes(soal) ? "animate animate-pulse" : ""
          }`}
        >
          {soal}
        </div>
      ))}
    </div>
  );
};

export default SoalStatus;
