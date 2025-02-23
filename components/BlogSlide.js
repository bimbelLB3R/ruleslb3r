import { useState } from "react";
import Image from "next/image";

const images = [
  { src: "/image/image1.webp", alt: "Foto Pilih jurusan", caption: "SEMINAR BAKAT DAN PEMILIHAN JURUSAN" },
  { src: "/image/image2.webp", alt: "Foto Kelas Programming", caption: "KELAS PEMROGRAMAN WEB" },
  { src: "/image/image3.webp", alt: "Foto Kelas UTBK", caption: "KELAS INTENSIF UTBK SNBT" },
  { src: "/image/image4.webp", alt: "Foto Kantor Bimbel", caption: "KANTOR UTAMA BIMBEL LB3R" },
  { src: "/image/image5.webp", alt: "Foto presensi QRcode", caption: "PRESENSI DENGAN QRQODE" },
  { src: "/image/image6.webp", alt: "Foto Pengajar", caption: "BEBERAPA PENGAJAR PEREMPUAN DI LB3R" },
  { src: "/image/image7.webp", alt: "Foto Siswa Ultah", caption: "SALAH SATU SISWA MERAYAKAN ULANG TAHUN" },
];

export default function BlogSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto">
      {/* Slider Container */}
      <div className="overflow-hidden w-full h-[300px] md:h-[400px] relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={300}
                className="w-full h-auto object-cover rounded-lg"
              />
              <p className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center text-sm p-2">
                {image.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
      >
        ❯
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-2 flex justify-center w-full space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
