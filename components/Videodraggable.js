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
    <div className="flex items-center justify-center m-auto h-screen">
      {/* <Draggable
        
        onStop={handleClose} 
      > */}
      {isVisible&&
        <div className="fixed top-20  border-4 border-double border-red-900 rounded-lg p-1 cursor-move w-[300px] sm:w-[300px]">
          <div className="flex justify-end items-center p-1  ">
            <button onClick={handleClose} className="bg-red-600 px-2 text-white font-bold">X</button>
          </div>          
          <p className="text-yellow-200  w-full bg-yellow-900  text-center font-roboto p-1">
            DETIK-DETIK 
          </p>
          {/* <iframe
            width="280"
            height="160"
            // src="https://www.youtube.com/embed/i5ZflnWyj94?si=s3KfJxQVp_CPNIgl"
            src="https://www.youtube.com/embed/MphBjycP72g"
            title="YouTube video player"
            allowFullScreen
          ></iframe> */}
          <Link href="/image/snbt/snbt2025.png">
          <Image
            src="/image/snbt/snbt2025.png"
            alt="snbt image"
            width={1080}
            height={1080}
            priority={true}
            className=""
          />
          </Link>
          <p className="text-gray-50 text-xs  w-full bg-gray-900 text-center p-1">
          “Sukses Tembus Kampus Pilihan!”.
          </p>
          <div className="flex items-center justify-center p-2 bg-gray-900">
            <div className="">
              <div className="">
              <CountdownTimer targetDate={targetDate} />
              </div>
              <div className="font-bold text-white text-center p-2 bg-blue-600">
              <Link href={'/layanan/program-utbk-snbt-eksklusif'} >DAFTAR SEKARANG</Link>
              </div>
              
            </div>
          </div>
          {/* <p className="text-gray-50 text-xs  w-full bg-gray-900 text-center p-1">
          “Kami buka kembali pendaftaran kelas eksklusif SNBT 2025. Promo diskon 25% bagi kalian yang mendaftar di bulan november dan desember 2025.”.
          </p> */}
        </div>}
      {/* </Draggable> */}
    </div>
  );
};

export default VideoDraggable;
