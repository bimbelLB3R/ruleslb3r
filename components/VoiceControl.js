export default function VoiceControl() {
  const commands = {
    "buka absen": "http://192.168.100.129/aplikasibimbel2/public/data_tentor/",
    "lihat program les": "https://www.bimbellb3r.com/layanan",
    "coba try out":"https://www.bimbellb3r.com/form/login",
    "tampilkan pengajar":"https://www.bimbellb3r.com/pengajar",
    "beri rating":"https://www.bimbellb3r.com/feedback",
    "baca artikel":"https://www.bimbellb3r.com/blogs",
    "buat kelas baru":"https://www.bimbellb3r.com/rules/newclass",
    "sistem pembayaran":"https://www.bimbellb3r.com/rules/payment",
    "mau bayar les":"https://www.bimbellb3r.com/layanan/bayarles",
    "jadwal hari ini":"https://www.bimbellb3r.com/livejadwal",
    "cari teman baru":"https://fitur-lb3r.vercel.app/",
    "cari kampus":"https://www.bimbellb3r.com/kampusku",
    "tes modalitas belajar":"https://www.bimbellb3r.com/layanan/diagnostik/login",
    "hubungi admin":"https://wa.me/6285654179908",
    "instagram":"https://www.instagram.com/bimbel_lb3r/"
  };
  const perintah = [
    "lihat program les",
    "coba try out",
    "tampilkan pengajar",
    "beri rating",
    "baca artikel",
    "buat kelas baru",
    "sistem pembayaran",
    "mau bayar les",
    "jadwal hari ini",
    "cari teman baru",
    "cari kampus",
    "tes modalitas belajar",
    "hubungi admin",
    "buka absen",
    "instagram"
  ];

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "id-ID";
    recognition.start();

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log("Perintah:", command);

      for (let key in commands) {
        if (command.includes(key)) {
          window.open(commands[key], "_blank");
          return;
        }
      }

      alert("Perintah tidak dikenali.");
    };
  };

  return (
    <div className="fixed bottom-12 left-8 md:bottom-12 md:left-12 z-20">
      {/* Kotak Chat */}
      <div id="perintah-box" className="absolute -top-[235px] mb-4 p-4 w-64 bg-white shadow-lg rounded-lg border border-gray-300">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold">Klik Mic & Ucapkan:</p>
          <button onClick={() => document.getElementById('perintah-box').style.display = 'none'} className="text-red-500 text-lg font-bold">X</button>
        </div>
        <div  className="max-h-40 overflow-y-auto">
          <ul className="text-sm text-gray-600">
            {perintah.map((cmd, index) => (
              <li key={index} className="py-1 px-2 bg-gray-100 rounded-md mb-1">{cmd}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Wrapper tombol + animasi */}
      <div className="relative flex items-center justify-center">
        <span className="absolute w-16 h-16 bg-blue-400 opacity-40 rounded-full animate-ping"></span>
        <span className="absolute w-12 h-12 bg-blue-500 opacity-30 rounded-full animate-ping delay-100"></span>

        <button
          onClick={startListening}
          className="relative p-4 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-mic text-blue-500"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
