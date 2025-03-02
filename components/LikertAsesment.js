import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const questions = [
  { id: 1, text: "Melakukan pengujian untuk membuktikan apakah sesuatu telah bekerja dengan benar, sesuai dengan fungsi yang diharapkan" },
  { id: 2, text: "Membuat promosi jasa/produk melalui media massa agar jasa/produk tersebut semakin diminati oleh publik" },
  { id: 3, text: "Mengintegrasikan ide dan informasi, kemudian mengkombinasikan berbagai ide dan informasi tersebut menjadi sesuatu hal yang baru?" }
];

const questions2 = [
    { id: 1, soal: "Melakukan pengujian untuk membuktikan apakah sesuatu telah bekerja dengan benar, sesuai dengan fungsi yang diharapkan", pilihan: ["A", "B", "C"] },
    { id: 2, soal: "Membuat promosi jasa/produk melalui media massa agar jasa/produk tersebut semakin diminati oleh publik", pilihan: ["A", "B", "C"] },
    { id: 3, soal: "Mengintegrasikan ide dan informasi, kemudian mengkombinasikan berbagai ide dan informasi tersebut menjadi sesuatu hal yang baru?", pilihan: ["A", "B", "C"] }
  ];

// const colors = ["bg-black", "bg-gray-500", "bg-white", "bg-yellow-500", "bg-red-500"];

export default function LikertAssessment() {
  const { data: session } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedScore, setSelectedScore] = useState(3);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [answerTimes, setAnswerTimes] = useState({});
  const [tombol,setTombol]=useState(true);
  const [tombolpilgan,setTombolPilgan]=useState(true);
  const [eemail,setEemail]=useState();
  const [showInstructions, setShowInstructions] = useState(true);
  const [isFirstPhase, setIsFirstPhase] = useState(true); // Lacak tahap pertama atau kedua
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Simpan jawaban pilihan ganda


  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
    const savedTimes = JSON.parse(localStorage.getItem("answerTimes")) || {};
    setAnswers(savedAnswers);
    setAnswerTimes(savedTimes);
    if (savedAnswers[questions[currentQuestion]?.id]) {
      setSelectedScore(savedAnswers[questions[currentQuestion]?.id]);
    }
    setStartTime(Date.now()); // Mulai hitung waktu untuk soal saat ini
    // console.log(Date.now());
    
  }, [currentQuestion]);

  useEffect(()=>{
    if(session){
        const mail = session.user.email;
        localStorage.setItem("userEmail",mail)
        setEemail(mail);
        let emails = JSON.parse(localStorage.getItem("userMails")) || [];
        if(emails.includes(mail)){
            setTombol(false);
            setTombolPilgan(false);
        }else{
            setTombol(true);
            setTombolPilgan(true);
        }

    }
  },[session])

  const addEmailToLocalStorage = (newEmail) => {
    let emails = JSON.parse(localStorage.getItem("userMails")) || [];

    // Cek apakah email sudah ada dalam array
    if (!emails.includes(newEmail)) {
        emails.push(newEmail);
        localStorage.setItem("userMails", JSON.stringify(emails));
        console.log("Email ditambahkan:", newEmail);
    } else {
        console.log("Email sudah ada:", newEmail);
    }
};


  const handleScoreChange = (score) => {
    setSelectedScore(score);
    setAnswers((prev) => {
      const updated = { ...prev, [questions[currentQuestion].id]: score };
      localStorage.setItem("answers", JSON.stringify(updated));
      return updated;
    });
  };

  const handleCancel = () => {
    localStorage.removeItem("answers");
    localStorage.removeItem("answerTimes");
    
    setAnswers({});
    setAnswerTimes({});
    setSelectedScore(3); // Kembali ke nilai default
    setCurrentQuestion(0); // Kembali ke pertanyaan pertama
    setStartTime(Date.now()); // Mulai ulang waktu
    setIsPopupOpen(false);
    // Refresh halaman
    window.location.reload();
  };


const handleNext = () => {
    if(isFirstPhase){
    if (!answers[questions[currentQuestion]?.id]) return;

    const currentTime = Date.now();
    const timeSpent = (currentTime - startTime) / 1000; // Waktu dalam detik

    const updatedTimes = {
      ...answerTimes,
      [questions[currentQuestion].id]: timeSpent
    };

    setAnswerTimes(updatedTimes);
    localStorage.setItem("answerTimes", JSON.stringify(updatedTimes));

    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
        //   alert("Asesmen slider selesai!");
        setIsFirstPhase(false); // Beralih ke tahap pilihan ganda
        setCurrentQuestion(0); // Reset ke soal pertama pilihan ganda
    // setIsPopupOpen(false);
    setSelectedScore(3); // Kembali ke nilai default
    setCurrentQuestion(0); // Kembali ke pertanyaan pertama
    setStartTime(Date.now()); // Mulai ulang waktu
    // kirim data disini
    // .......

    // hapus data setelah terkirim
    // localStorage.removeItem("answers");
    // localStorage.removeItem("answerTimes");
    // sembunyikan tombol /ganti tombol mulai asesmen
    setTombol(false); //masih muncul saat di refresh
    addEmailToLocalStorage(eemail);
    }}else{
        // Validasi jawaban di fase pilihan ganda
        if (!selectedAnswers[questions2[currentQuestion]?.id]) {
            alert("Harap pilih jawaban sebelum lanjut!");
            return;
        }

        if (currentQuestion < questions2.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // alert("Pilihan ganda selesai!");
    
    // sembunyikan tombol /ganti tombol mulai asesmen
    setTombol(false); //masih muncul saat di refresh
    setTombolPilgan(false);
    addEmailToLocalStorage(eemail);
    // kirim data disini
    // .......
    // hapus data setelah terkirim
    localStorage.removeItem("answers");
    localStorage.removeItem("answerTimes");
    localStorage.removeItem("selectedAnswers");
        // Refresh halaman
    window.location.reload();
        }
    }
  };

  const getCategory = (score) => {
    if (score >= 4.2) return "Sangat Suka";
    if (score >= 3.4) return "Suka";
    if (score >= 2.6) return "Netral";
    if (score >= 1.8) return "Tidak Suka";
    return "Sangat Tidak Suka";
  };
  const getColor = (score) => {
    if (score <= 1.8) return "#0c0a09"; // Merah
    if (score <= 2.6) return "#a8a29e"; // Oranye
    if (score <= 3.4) return "#f5f5f4"; // Kuning
    if (score <= 4.2) return "#fde047"; // Hijau
    return "#f87171"; // Biru
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => {
        const updatedAnswers = { ...prev, [questionId]: answer };
        localStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers)); 
        return updatedAnswers;
    });
};
useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("selectedAnswers")) || {};
    setSelectedAnswers(savedAnswers);
}, []);
// console.log(currentQuestion);
  return (
    <div className="">
      {!session ? (
        <button onClick={() => signIn("google")} className="px-4 py-2 bg-blue-500 text-white rounded">
          Coba Asesmen Sekarang
        </button>
      ) : (
        <div>
        {tombol?
        <button onClick={() => setIsPopupOpen(true)} className=" flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded  space-x-4 p-2">
          <p>Mulai Asesmen</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-hand-index" viewBox="0 0 16 16">
            <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 1 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 0 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.035a.5.5 0 0 1-.416-.223l-1.433-2.15a1.5 1.5 0 0 1-.243-.666l-.345-3.105a.5.5 0 0 1 .399-.546L5 8.11V9a.5.5 0 0 0 1 0V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025"/>
        </svg> 
        </button>:<div>
            <button className=" flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded  space-x-4 p-2">Asesmen tahap 1 selesai</button>
            {tombolpilgan?<button onClick={() => setIsPopupOpen(true)}>Lanjut tahap 2</button>:<button className=" flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded  space-x-4 p-2">Asesmen tahap 2 selesai</button>}
        </div>}
        </div>
      )}
      {/* end session */}
        {/* {tombol &&
        <button onClick={() => setIsPopupOpen(true)} className=" flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded  space-x-4 p-2">
          <p>Mulai Asesmen</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-hand-index" viewBox="0 0 16 16">
            <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 1 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 0 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.035a.5.5 0 0 1-.416-.223l-1.433-2.15a1.5 1.5 0 0 1-.243-.666l-.345-3.105a.5.5 0 0 1 .399-.546L5 8.11V9a.5.5 0 0 0 1 0V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025"/>
        </svg> 
        </button>} */}
        {isPopupOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      
      {/* Jika showInstructions = true, tampilkan petunjuk */}
      {showInstructions ? (
        <>
          <p className="text-lg mb-4 font-bold">Petunjuk Pengisian</p>
          <ul className="text-sm mb-4 list-disc pl-5">
            <li>Gunakan slider untuk memberi penilaian dari 1 hingga 5.</li>
            <li>1 berarti "Sangat Tidak Suka", 5 berarti "Sangat Suka".</li>
            <li>Setelah memilih nilai, klik tombol "Lanjut".</li>
          </ul>
          <button 
                onClick={() => {
                    setStartTime(Date.now()); // Simpan waktu saat tombol diklik
                    setShowInstructions(false);}} 
                className="w-full px-4 py-2 bg-green-500 text-white rounded">
                        Mulai
            </button>

        </>
      ) : (
        <>
    {isFirstPhase?
    <div>
  {/* Tampilkan kategori yang dipilih */}
  <div className="text-center font-bold text-lg mb-2">
    {getCategory(selectedScore)}
  </div>

  {/* Tampilkan pertanyaan */}
  <p className="text-lg mb-4">{questions[currentQuestion].text}</p>

  <div className="relative w-full">
    {/* Nilai di atas slider */}
    <div
      className="absolute -top-6 text-lg font-bold transition-transform duration-200 "
      style={{ 
        left: `${((selectedScore - 1) / 4) * 100}%`, 
        transform: "translateX(-50%)",
        color: getColor(selectedScore) // Ubah warna teks sesuai skor
      }}
    >
      {selectedScore.toFixed(1)}
    </div>

    {/* Slider */}
    <input
      type="range"
      min="1"
      max="5"
      step="0.1"
      value={selectedScore}
      onChange={(e) => handleScoreChange(parseFloat(e.target.value))}
      className="w-full h-2 rounded-lg appearance-none cursor-pointer transition-all duration-200 ease-in-out"
      style={{
        background: `linear-gradient(to right, 
          #0c0a09 0%,   /* Merah */
          #0c0a09 20%, 
          #a8a29e 20%,  /* Oranye */
          #a8a29e 40%, 
          #f5f5f4 40%,  /* Kuning */
          #f5f5f4 60%, 
          #fde047 60%,  /* Hijau */
          #fde047 80%, 
          #f87171 80%,  /* Biru */
          #f87171 100%)`
      }}
    />
    
  </div>

  {/* Label angka */}
  <div className="flex justify-between mt-2">
    <span className="text-[#0c0a09]">1</span>
    <span className="text-[#a8a29e]">2</span>
    <span className="text-[#f5f5f4]">3</span>
    <span className="text-[#fde047]">4</span>
    <span className="text-[#f87171]">5</span>
  </div>
  </div>
  :
  (
    // **Tahap 2: Pilihan Ganda**
    <>
      <div className="text-center font-bold text-lg mb-2">
        {`Pertanyaan ${currentQuestion + 1} dari ${questions2.length}`}
      </div>
      <p className="text-lg mb-4">{questions2[currentQuestion].soal}</p>
      <div className="flex flex-col space-y-2">
      {questions2[currentQuestion].pilihan.map((option) => (
    <label key={option} className="block">
        <input
            type="radio"
            name={`question-${questions2[currentQuestion].id}`}
            value={option}
            checked={selectedAnswers[questions2[currentQuestion].id] === option}
            onChange={() => handleAnswerSelect(questions2[currentQuestion].id, option)}
        />
        {option}
    </label>
))}
      </div>
    </>
  )
  }

  {/* Tombol Navigasi */}
  <button onClick={handleNext} className="w-full px-4 py-2 bg-blue-500 text-white rounded mt-4">
        {isFirstPhase
          ? currentQuestion < questions.length - 1
            ? "Lanjut"
            : "Ke Pilihan Ganda"
          : currentQuestion < questions2.length - 1
          ? "Lanjut"
          : "Selesai"}
      </button>
</>
      )
      
      }
      
    </div>
  </div>
)}

    </div>
  );
}
