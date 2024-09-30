import React from "react";
import Image from "next/image";

const Service = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="m-2 shadow-lg hover:shadow-xl hover:shadow-orange-400 p-6">
          <a href="https://www.bimbellb3r.com/rules/newclass">
          {/* <Image
            src="/image/buatKelas2.png"
            width={128}
            height={128}
            alt="service1"
            priority={true}
            className="object-scale-down"
          /> */}
          <div className="text-orange-400 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
          </svg>
          </div>
          <div className="w-full justify-center m-auto">
            <p className=" text-center text-sm text-gray-600 p-1  font-architects">
              Buat kelas baru
            </p>
          </div>
          </a>
        </div>
        <div className="m-2 shadow-lg hover:shadow-xl hover:shadow-orange-400 p-6">
          <a href="https://fitur-lb3r.vercel.app/">
            {/* <Image
              src="/image/cariTeman2.png"
              width={128}
              height={128}
              alt="service1"
              priority={true}
              className="object-scale-down"
            /> */}
            <div className="text-orange-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-search-heart w-full" viewBox="0 0 16 16">
              <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
              <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"/>
            </svg>
            </div>
            <div className="w-full justify-center m-auto">
              <p className=" text-center text-sm text-gray-600 p-1 font-architects">
                Cari teman
              </p>
            </div>
          </a>
        </div>
        <div className="m-2 shadow-lg hover:shadow-xl hover:shadow-orange-400 p-6">
        <a href="/livejadwal">
          {/* <Image
            src="/image/jadwal.png"
            width={128}
            height={128}
            alt="service1"
            priority={true}
            className="object-scale-down"
          /> */}
          <div className="text-orange-400 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-router-fill" viewBox="0 0 16 16">
            <path d="M5.525 3.025a3.5 3.5 0 0 1 4.95 0 .5.5 0 1 0 .707-.707 4.5 4.5 0 0 0-6.364 0 .5.5 0 0 0 .707.707"/>
            <path d="M6.94 4.44a1.5 1.5 0 0 1 2.12 0 .5.5 0 0 0 .708-.708 2.5 2.5 0 0 0-3.536 0 .5.5 0 0 0 .707.707Z"/>
            <path d="M2.974 2.342a.5.5 0 1 0-.948.316L3.806 8H1.5A1.5 1.5 0 0 0 0 9.5v2A1.5 1.5 0 0 0 1.5 13H2a.5.5 0 0 0 .5.5h2A.5.5 0 0 0 5 13h6a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5h.5a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 14.5 8h-2.306l1.78-5.342a.5.5 0 1 0-.948-.316L11.14 8H4.86zM2.5 11a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m4.5-.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0m2.5.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m1.5-.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0m2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0"/>
            <path d="M8.5 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
          </svg>
          </div>
          <div className="w-full justify-center m-auto">
            <p className=" text-center text-sm text-gray-600 p-1 font-architects">
              Live Jadwal
            </p>
          </div>
          </a>
        </div>
        <div className="m-2 shadow-lg hover:shadow-xl hover:shadow-orange-400 p-6">
        <a href="https://wa.me/6285654179908"
                  className="object-scale-down"
                >
                  {/* <Image
            src="/image/konsulJadwal2.png"
            width={128}
            height={128}
            alt="service1"
            priority={true}
            className="object-scale-down"
          /> */}
          <div className="text-orange-400 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
            <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
          </svg>
          </div>
          <div className="w-full justify-center m-auto">
            <p className=" text-center text-sm text-gray-600 p-1 font-architects">
              Konsultasi Jadwal
            </p>
          </div>
                </a>
          
        </div>
      </div>
    </>
  );
};

export default Service;
