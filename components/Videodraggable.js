// components/VideoDraggable.js

import React, { useState } from "react";
import Draggable from "react-draggable";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "./CountDownTimer";

const VideoDraggable = () => {
  const targetDate = "2025-04-23T23:59:59"; // Set tanggal tujuan Anda
  const [isVisible, setIsVisible] = useState(true);
  // Fungsi untuk menghitung posisi awal agar komponen berada di tengah layar
  const calculateInitialPosition = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const videoWidth = 560; // Lebar video
    const videoHeight = 315; // Tinggi video

    const initialX = (windowWidth - videoWidth) / 2;
    const initialY = (windowHeight - videoHeight) / 2;

    return { x: initialX, y: initialY };
  };

  const handleClose = () => {
    setIsVisible(false);
  };
  const handleDrag = (e) => {
    e.stopPropagation(); // Menghentikan penyebaran event drag ke elemen parent saat tombol close ditarik
  };

  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay dengan opacity dan handleClose */}
      <div 
        className="absolute inset-0 bg-gray-900 opacity-70"
        onClick={handleClose} // Klik pada overlay menutup modal
      ></div>

      {/* Konten utama */}
      <div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-1 w-[300px] sm:w-[300px]  shadow-[0_0_15px_5px_rgba(255,140,0,0.7)] animate-glow"
        onClick={(e) => e.stopPropagation()} // Mencegah klik dalam modal menutup modal
      >
        {/* <div className="flex justify-end items-center p-1">
        
          <button onClick={handleClose} className="bg-red-600 px-2 text-white font-bold">
            X
          </button>
        </div> */}

        {/* <p className="text-yellow-200 w-full bg-yellow-900 text-center font-roboto p-1">
          KLIK UNTUK DAFTAR!!
        </p> */}

        <Link href="https://wa.me/6285654179908">
          <Image
            src="/image/snbt/zoominar.png"
            alt="snbt image"
            width={1080}
            height={1080}
            priority={true}
            className=""
          />
        </Link>

        <p className="text-gray-50 text-xs w-full bg-gray-900 text-center p-1">
          “Tips & Trik Persiapan Menuju Kampus Impian”.
        </p>

        <div className="flex items-center justify-center p-2 bg-gray-900">
          <div className="font-bold text-white text-center p-2 bg-blue-600">
            <Link href="https://wa.me/6285654179908">AKU MAU IKUT</Link>
          </div>
        </div>
        <div className="p-2 bg-yellow-900 mt-1">
          <p className="text-center text-white">Detik-detik Menuju SNBT 2025</p>
        <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
    </div>
  );
};

export default VideoDraggable;
