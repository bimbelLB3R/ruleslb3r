import React from "react";

const JawabanSiswa = ({ answers, currentPage }) => {
    console.log(answers)
    if (!answers || typeof answers !== "object") {
      return <p className="text-gray-500">Tidak ada data jawaban.</p>;
    }
  
    const jawabanKey = `group${currentPage - 1}`; // Menentukan kunci jawaban
    const jawaban = answers[jawabanKey] || "Belum dijawab";
  
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Jawaban Anda : {jawaban}</h2>
      </div>
    );
  };
  
  export default JawabanSiswa;
  
