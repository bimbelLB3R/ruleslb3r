// components/VideoDraggable.js

import React, { useState } from "react";
import Draggable from "react-draggable";

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
        <div className="fixed top-20  bg-gray-900 rounded-lg p-4 cursor-move">
          <p className="text-gray-50 m-1 w-full bg-red-900 p-1 text-center">
            Seret Untuk Menutup Video Ini !!
          </p>
          <iframe
            width="280"
            height="160"
            src="https://www.youtube.com/embed/8toydm0StA4"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p className="text-gray-50 text-xs m-1 w-full bg-yellow-400 p-1 text-center">
            Kenapa pilihan kedua di SNBP peluangnya kecil sekali?
          </p>
        </div>
      </Draggable>
    </div>
  );
};

export default VideoDraggable;
