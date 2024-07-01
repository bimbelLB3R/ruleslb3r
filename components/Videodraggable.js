// components/VideoDraggable.js

import React, { useState } from "react";
import Draggable from "react-draggable";
import Image from "next/image";

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
      <Draggable
        // defaultPosition={{ x: 0, y: 0 }}
        onStop={handleClose} // Mengaktifkan handleClose saat pergerakan drag berhenti
      >
        <div className="fixed top-20  border-4 border-double border-red-900 rounded-lg p-1 cursor-move w-[300px] sm:w-[300px]">
          <p className="text-yellow-200  w-full bg-yellow-900  text-center font-roboto p-1">
            Rekaman Webinar Buat Orang Tua
          </p>
          <iframe
            width="280"
            height="160"
            src="https://www.youtube.com/embed/i5ZflnWyj94?si=s3KfJxQVp_CPNIgl"
            title="YouTube video player"
            allowFullScreen
          ></iframe>
          {/* <Image
            src="/image/snbt/webinar.png"
            alt="webinar image"
            width={1080}
            height={1080}
            priority={true}
            className=""
          /> */}
          <p className="text-gray-50 text-xs  w-full bg-gray-900 text-center p-1">
          “Membuka Blok Komunikasi Antara Orang Tua dan Anak Guna Mempersiapkan Mental di Jenjang Pendidikan Tinggi (Kampus)”.
          </p>
        </div>
      </Draggable>
    </div>
  );
};

export default VideoDraggable;
