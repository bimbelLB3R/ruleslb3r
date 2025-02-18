"use client";

import { useState, useRef, useEffect } from "react";

export default function VoiceControl() {
  const commands = {
    "buka absen": "http://192.168.100.129/aplikasibimbel2/public/data_tentor/",
    "lihat program les": "https://www.bimbellb3r.com/layanan",
    "coba try out": "https://www.bimbellb3r.com/form/login",
    "tampilkan pengajar": "https://www.bimbellb3r.com/pengajar",
    "beri rating": "https://www.bimbellb3r.com/feedback",
    "baca artikel": "https://www.bimbellb3r.com/blogs",
    "buat kelas baru": "https://www.bimbellb3r.com/rules/newclass",
    "sistem pembayaran": "https://www.bimbellb3r.com/rules/payment",
    "mau bayar les": "https://www.bimbellb3r.com/layanan/bayarles",
    "jadwal hari ini": "https://www.bimbellb3r.com/livejadwal",
    "cari teman baru": "https://fitur-lb3r.vercel.app/",
    "cari kampus": "https://www.bimbellb3r.com/kampusku",
    "tes modalitas belajar": "https://www.bimbellb3r.com/layanan/diagnostik/login",
    "hubungi admin": "https://wa.me/6285654179908",
    "instagram": "https://www.instagram.com/bimbel_lb3r/"
  };

  const perintah = Object.keys(commands);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const perintahBoxRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    }
  }, []);

  const startListening = () => {
    if (!window.SpeechRecognition) {
      setError("Browser tidak mendukung Speech Recognition.");
      return;
    }

    const recognition = new window.SpeechRecognition();
    recognition.lang = "id-ID";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log("Perintah:", command);

      for (let key in commands) {
        if (command.includes(key)) {
          window.open(commands[key], "_blank");
          setIsListening(false);
          return;
        }
      }

      alert("Perintah tidak dikenali.");
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      // console.error("Speech recognition error:", event.error);
      setError("Terjadi kesalahan dalam mengenali suara.");
      setIsListening(false);
    };
  };

  return (
    <div className="fixed bottom-12 left-8 md:bottom-12 md:left-12 z-20">
      {/* Kotak Chat */}
      {isListening &&
      <div
        ref={perintahBoxRef}
        className="absolute -top-[235px] mb-4 p-4 w-64 bg-white shadow-lg rounded-lg border border-gray-300"
      >
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold">Pilih & ucapkan apa yang kamu inginkan</p>
          <button
            onClick={() => (perintahBoxRef.current.style.display = "none")}
            className="text-red-500 text-lg font-bold"
          >
            X
          </button>
        </div>
        <div className="max-h-40 overflow-y-auto">
          <ul className="text-sm text-gray-600">
            {perintah.map((cmd, index) => (
              <li key={index} className="py-1 px-2 bg-gray-100 rounded-md mb-1">
                {cmd}
              </li>
            ))}
          </ul>
        </div>
      </div>}

      {/* Wrapper tombol + animasi */}
      <div className="relative flex items-center justify-center">
        <span className="absolute w-16 h-16 bg-blue-400 opacity-40 rounded-full animate-ping"></span>
        <span className="absolute w-12 h-12 bg-blue-500 opacity-30 rounded-full animate-ping delay-100"></span>

        <button
          onClick={startListening}
          className="relative p-4 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          {isListening ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-mic text-red-500 animate-bounce"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
              <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
            </svg>
          ) : (
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
          )}
        </button>
      </div>

      {/* Notifikasi Error */}
      {/* {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )} */}
    </div>
  );
}
