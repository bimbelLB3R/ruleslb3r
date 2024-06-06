import React from "react";
import Image from "next/image";

const Service = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="m-2  relative">
          <Image
            src="/image/buatKelas.png"
            width={128}
            height={128}
            alt="service1"
            priority={true}
            className="object-scale-down"
          />
          <div className="w-full justify-center m-auto">
            <p className=" text-center text-sm text-gray-600 p-1">
              Buat kelas baru
            </p>
          </div>
        </div>
        <div className="m-2 hover:shadow-xl">
          <a href="https://fitur-lb3r.vercel.app/">
            <Image
              src="/image/cariTeman.png"
              width={128}
              height={128}
              alt="service1"
              priority={true}
              className="object-scale-down"
            />
            <div className="w-full justify-center m-auto">
              <p className=" text-center text-sm text-gray-600 p-1">
                Cari teman
              </p>
            </div>
          </a>
        </div>
        <div className="m-2 hover:shadow-xl">
        <a href="/livejadwal">
          <Image
            src="/image/lihatJadwal.png"
            width={128}
            height={128}
            alt="service1"
            priority={true}
            className="object-scale-down"
          />
          <div className="w-full justify-center m-auto">
            <p className=" text-center text-sm text-gray-600 p-1">
              Live Jadwal
            </p>
          </div>
          </a>
        </div>
        <div className="m-2 hover:shadow-xl">
        <a href="https://wa.me/6281392552459"
                  className="object-scale-down"
                >
                  <Image
            src="/image/konsulJadwal.png"
            width={128}
            height={128}
            alt="service1"
            priority={true}
            className="object-scale-down"
          />
          <div className="w-full justify-center m-auto">
            <p className=" text-center text-sm text-gray-600 p-1">
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
