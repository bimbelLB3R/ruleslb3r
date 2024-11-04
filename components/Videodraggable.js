// components/VideoDraggable.js

import React, { useState } from "react";
import Draggable from "react-draggable";
import Image from "next/image";
import Link from "next/link";

const VideoDraggable = () => {
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
        <div className="fixed top-20  border-4 border-double border-red-900 rounded-lg p-1 cursor-move w-[300px] sm:w-[300px]">
          <p className="text-yellow-200  w-full bg-yellow-900  text-center font-roboto p-1">
            INFORMASI SNBT 2025
          </p>
          {/* <iframe
            width="280"
            height="160"
            // src="https://www.youtube.com/embed/i5ZflnWyj94?si=s3KfJxQVp_CPNIgl"
            src="https://www.youtube.com/embed/MphBjycP72g"
            title="YouTube video player"
            allowFullScreen
          ></iframe> */}
          <Link href="/layanan/">
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
          “Kami buka kembali pendaftaran kelas eksklusif SNBT 2025. Promo diskon 25% bagi kalian yang mendaftar di bulan november dan desember 2025.”.
          </p>
        </div>
      {/* </Draggable> */}
    </div>
  );
};

export default VideoDraggable;
