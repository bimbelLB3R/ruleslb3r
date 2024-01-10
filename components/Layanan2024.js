import React from "react";
import Image from "next/image";

const Service = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="m-2 border-4 border-yellow-400 relative">
          <Image
            src="/image/ramah.png"
            width={128}
            height={128}
            alt="service1"
            priority={true}
          />
          <div className="w-full justify-center m-auto">
            <p className=" bg-orange-400 text-center text-xs md:text-sm p-1">
              Pelayanan Ramah
            </p>
          </div>
        </div>
        <div className="m-2 border-4 border-yellow-400">
          <Image
            src="/image/kelasnyaman.png"
            width={128}
            height={128}
            alt="service1"
            priority={true}
          />
          <div className="w-full justify-center m-auto">
            <p className=" bg-orange-400 text-center text-xs md:text-sm p-1">
              Kelas Bersih & wangi
            </p>
          </div>
        </div>
        <div className="m-2 border-4 border-yellow-400">
          <Image
            src="/image/qrcode.png"
            width={128}
            height={128}
            alt="service1"
            priority={true}
          />
          <div className="w-full justify-center m-auto">
            <p className=" bg-orange-400 text-center text-xs md:text-sm p-1">
              Presensi QRcode
            </p>
          </div>
        </div>
        <div className="m-2 border-4 border-yellow-400">
          <Image
            src="/image/buktibayar.png"
            width={128}
            height={128}
            alt="service1"
            priority={true}
          />
          <div className="w-full justify-center m-auto">
            <p className=" bg-orange-400 text-center text-xs md:text-sm p-1">
              E-Kuitansi
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
