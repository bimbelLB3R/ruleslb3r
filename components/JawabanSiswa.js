import React from "react";

const JawabanSiswa = ({ answers, currentPage }) => {
    // console.log(answers)
    if (!answers || typeof answers !== "object") {
      return <p className="text-red-500">Kamu belum menjawab soal ini, namun tetap tulis kunci dan pembahasan dari pengajar LB3R ya...nanti kami printkan soalnya.</p>;
    }
  
    const jawabanKey = `group${currentPage - 1}`; // Menentukan kunci jawaban
    const jawaban = answers[jawabanKey] || "Belum dijawab";
  
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-green-600">Jawaban kamu : {jawaban}</h2>
        <div className="flex space-x-2">
        <p className="font-bold text-red-600">!!</p>
        <p>Catatlah kunci & pembahasan yang diberikan pengajar dalam bukumu ya..kami akan printkan soal ini nanti buat kamu belajar dirumah</p>
        </div>
      </div>
    );
  };
  
  export default JawabanSiswa;
  
