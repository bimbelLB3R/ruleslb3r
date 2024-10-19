import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Button } from 'flowbite-react';

const options = {
  A: 'Sangat Kuat',
  B: 'Kuat',
  C: 'Agak Kuat',
  D: 'Netral',
  E: 'Agak Lemah',
  F: 'Lemah',
  G: 'Sangat Lemah'
};

const scores = {
  A: 10,
  B: 6,
  C: 2,
  D: 0,
  E: -2,
  F: -6,
  G: -10
};


export default function Jobfit() {
  const [answers, setAnswers] = useState({});
  const [groupedScores, setGroupedScores] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10; // Jumlah pertanyaan per halaman

  const [questionsData, setQuestionsData]=useState({});
  const [rolesData, setRolesData] = useState({});
  const [showScores, setShowScores] = useState(false); 

  const totalPages = Math.ceil(Object.keys(questionsData).length / questionsPerPage);

  const contentRef = useRef(null);
  const generatePdf = async () => {
        const html2pdf = (await import('html2pdf.js')).default;
    
        // Atur opsi untuk mengatur margin, ukuran halaman, orientasi, dll.
        const options = {
          margin: 0.5, // Margin dalam satuan inch
          filename: 'Hasil Analisa ST30.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 }, // Membuat rendering lebih tajam
          jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' } // Mengatur ukuran dan orientasi halaman
        };
    
        // Buat PDF dengan beberapa halaman (jika kontennya panjang)
        html2pdf().set(options).from(contentRef.current).save();
      };


// Mengambil data pertanyaan dari file JSON saat komponen dimuat
useEffect(() => {
    const fetchQuestionsData = async () => {
      const response = await fetch('/activities.json');
      const data = await response.json();
      setQuestionsData(data);
    };

    fetchQuestionsData();
  }, []);

  // Mengambil data roles dari file JSON saat komponen dimuat
  useEffect(() => {
    const fetchRolesData = async () => {
      const response = await fetch('/tipologiOfactivities.json');
      const data = await response.json();
      setRolesData(data);
    };

    fetchRolesData();
  }, []);

  // Mengambil jawaban dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('answers')) || {};
    setAnswers(storedAnswers);
  }, []);


  // Fungsi untuk menghitung rata-rata skor per grup
  const calculateAverageScores = () => {
    const storedAnswers = JSON.parse(localStorage.getItem('answers')) || {};
    const scoresByGroup = {};

    // Mengelompokkan skor berdasarkan rolesData
    Object.entries(rolesData).forEach(([group, groupData]) => {
      const groupActivities = groupData.activities;

      const totalScore = Object.entries(storedAnswers).reduce((total, [activity, value]) => {
        const score = parseInt(value.split(' ')[1], 10);

        if (groupActivities.includes(activity)) {
          return total + score;
        }
        return total;
      }, 0);

      // Hitung rata-rata skor: total skor dibagi dengan jumlah aktivitas
      const averageScore = totalScore / groupActivities.length;

      scoresByGroup[group] = averageScore;
    });

    setGroupedScores(scoresByGroup);
    setShowScores(true); // Tampilkan skor setelah dihitung
  };

  const handleChange = (activity, value) => {
    const updatedAnswers = {
      ...answers,
      [activity]: `${activity} ${scores[value]}`
    };

    setAnswers(updatedAnswers);
    localStorage.setItem('answers', JSON.stringify(updatedAnswers));

    // Mengelompokkan ulang skor setiap kali jawaban berubah
    const updatedGroupedScores = {};
    Object.entries(rolesData).forEach(([group, groupData]) => {
      const groupActivities = groupData.activities;

      const groupScore = Object.entries(updatedAnswers).reduce((total, [activity, value]) => {
        const score = parseInt(value.split(' ')[1], 10);

        if (groupActivities.includes(activity)) {
          return total + score;
        }
        return total;
      }, 0);

      updatedGroupedScores[group] = groupScore;
    });

    setGroupedScores(updatedGroupedScores);
  };

  const handleSubmit = () => {
    setAnswers({}); // Kosongkan form setelah menyimpan jawaban
    setShowScores(false)
    localStorage.removeItem('answers'); // Jika ingin menghapus jawaban dari localStorage
    // alert('Jawaban telah disimpan!');

  };

  // Pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = Object.entries(questionsData).slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-lg shadow-md">
  <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
    {currentQuestions.map(([activity, question], index) => (
      <div key={activity} className="mb-4">
        <p className="font-semibold text-lg">{indexOfFirstQuestion + index + 1}. {question}</p>
        <div className="flex flex-col mt-2">
          {Object.entries(options).map(([option, label]) => (
            <label key={option} className="flex items-center mb-2">
              <input
                type="radio"
                name={activity}
                value={option}
                checked={answers[activity]?.includes(`${activity} ${scores[option]}`) || false}
                onChange={(e) => handleChange(activity, option)}
                className="mr-2 leading-tight"
              />
              <span className="text-gray-700">{option}. {label}</span>
            </label>
          ))}
        </div>
      </div>
    ))}
    <div className="flex justify-between mb-4">
      <button
        type="button"
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-400"
      >
        Sebelumnya
      </button>
      <button
        type="button"
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(Object.keys(questionsData).length / questionsPerPage)))}
        disabled={indexOfLastQuestion >= Object.keys(questionsData).length}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-400"
      >
        Berikutnya
      </button>
    </div>
    <button
      type="submit"
      className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
    >
      Kosongkan Jawaban
    </button>
  </form>
  
  {currentPage === totalPages && ( // Tampilkan tombol hitung hanya di halaman terakhir
    <div className="mt-4">
      <button
        onClick={calculateAverageScores}
        className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
      >
        Hitung Rata-Rata Skor
      </button>
      <Button outline gradientDuoTone="pinkToOrange" onClick={generatePdf} className='w-full m-3'>
                        Download
    </Button>
    </div>
  )}
  
  {showScores && (
    <div className="mt-6" ref={contentRef}>
    <h2 className="text-xl font-semibold">Skor yang Dikelompokkan Berdasarkan Roles</h2>
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border-b">Group</th>
            <th className="py-2 px-4 border-b">Rata-rata Skor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedScores)
            .sort(([, a], [, b]) => b - a) // Urutkan berdasarkan skor dari yang tertinggi ke terendah
            .map(([group, averageScore]) => (
              <tr key={group} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-gray-800">{group}</td>
                <td className="py-2 px-4 border-b text-gray-800">{averageScore.toFixed(2)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
  
  )}
</div>

  );
}
