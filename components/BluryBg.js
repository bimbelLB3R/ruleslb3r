import Link from "next/link";

export default function BluryBg() {
  return (
    <div className=" md:max-w-2xl m-auto flex items-center justify-center px-6 md:px-16 mt-10">
      <div className="relative w-full max-w-lg">
        {/* bg 3 warna */}
        <div className="absolute top-0 -left-4 w-36 md:w-72 h-36 md:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-36 md:w-72 h-36 md:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-36 md:w-72 h-36 md:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        {/* atas bg */}
        <div className="md:m-8 relative space-y-4">
          <div className="p-2 md:p-5 bg-purple-600 rounded-lg flex items-center justify-center space-x-3">
            <div>
              <p className="font-black text-gray-50">KEUNGGULAN</p>
            </div>
          </div>
          <div className="p-2 md:p-5 bg-purple-400/50 text-gray-900 rounded-lg flex items-center  space-x-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-check2-circle"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
              </svg>
            </div>
            <div>
              Kamu boleh ajak teman buat ikut kelas ODB secara GRATIS, cek kuota
              kelasmu ya..
            </div>
          </div>
          <div className="p-2 md:p-5 bg-purple-400/50 text-gray-900 rounded-lg flex items-center  space-x-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-check2-circle"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
              </svg>
            </div>
            <div>
              Off sementara dan lanjut les lagi bulan depan (cek tatibnya ya)
            </div>
          </div>
          <div className="p-2 md:p-5 bg-purple-400/50 text-gray-900 rounded-lg flex items-center  space-x-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-check2-circle"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
              </svg>
            </div>
            <div>
              Lebih efektif belajar bersama teman dari sekolah/kelas yang sama
            </div>
          </div>
          <div className="p-2 md:p-5 bg-purple-400/50 text-gray-900 rounded-lg flex items-center  space-x-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-check2-circle"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
              </svg>
            </div>
            <div>
              Belajar tepat sasaran menggunakan buku paket/modul sekolah
              masing-masing
            </div>
          </div>
          <div className="p-2 md:p-5 bg-purple-400/50 text-gray-900 rounded-lg flex items-center  space-x-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-check2-circle"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
              </svg>
            </div>
            <div>
              Memilih jam belajar siang atau malam (untuk mapel tertentu)
            </div>
          </div>
          <Link
            href="/rules/ambak"
            className="p-2 md:p-5 bg-white/50 text-gray-900 rounded-lg flex items-center justify-center space-x-3 border border-blue-600"
          >
            <p className="text-center">Cek Lainnya....</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
