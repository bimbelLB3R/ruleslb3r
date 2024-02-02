import Link from "next/link";
import Layout from "../../components/Layout";
// import Navbar from "../../components/Navbar";
import "animate.css";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Profile({ biodata }) {
  const filteredBiodata = biodata.map((item) => item);
  const { data: session } = useSession();
  const [choosenEmail, setChoosenEmail] = useState([]);
  //   console.log(choosenEmail);
  useEffect(() => {
    if (session) {
      const emailTerpilih = filteredBiodata.filter(
        (item) => item[8] == session.user.email
      );
      setChoosenEmail(emailTerpilih);
    }
  }, [session, filteredBiodata]);
  return (
    <div>
      {/* <Navbar allPost={allPost} /> */}

      <div className="grid-cols-1 m-auto max-w-md mt-20 bg-purple-400">
        {session ? (
          <div className="overflow-auto p-4 ">
            <div>
              <div className="flex justify-center">
                <Image
                  src={session.user.image}
                  width={66}
                  height={66}
                  alt="userFoto"
                  priority={true}
                  className="rounded-full shadow-2xl"
                />
              </div>
              <p className="text-center">{session.user.name}</p>
              <p className="text-center mb-4">{session.user.email}</p>

              {/* <div className="font-semibold p-2 bg-blue-200 shadow-sm shadow-amber-600 m-2 rounded-lg">
                Pembayaran Tertunda : 0
              </div>
              <div className="font-semibold p-2 bg-blue-200 shadow-sm shadow-amber-600 m-2 rounded-lg">
                Pembayaran Berhasil : 0
              </div> */}
              {choosenEmail.map((item, index) => (
                <div
                  key={index}
                  className="md:flex items-center justify-center p-2 m-auto"
                >
                  {/* <img src={item[20]} /> */}
                  <div className="p-2 bg-purple-200 shadow-sm shadow-amber-600 m-2 rounded-lg">
                    <p className="font-semibold">Pilihan Jurusan</p>
                    <p>
                      1. Pilihan Pertama : {item[4]}, {item[6]}
                    </p>
                    <p>
                      2. Pilihan Kedua : {item[5]}, {item[7]}
                    </p>
                  </div>
                  <div className="p-2 bg-purple-200 shadow-sm shadow-amber-600 m-2 rounded-lg flex flex-wrap md:max-w-xl">
                    <div className="text-center bg-yellow-300 rounded p-1 m-1">
                      <p className="text-xl text-gray-900">{item[11]}</p>
                      <p className="text-sm">LBI</p>
                    </div>
                    <div className="text-center bg-yellow-300 rounded p-1 m-1">
                      <p className="text-xl text-gray-900">{item[14]}</p>
                      <p className="text-sm">LBE</p>
                    </div>
                    <div className="text-center bg-yellow-300 rounded p-1 m-1">
                      <p className="text-xl text-gray-900">{item[16]}</p>
                      <p className="text-sm">PU</p>
                    </div>
                    <div className="text-center bg-yellow-300 rounded p-1 m-1">
                      <p className="text-xl text-gray-900">{item[15]}</p>
                      <p className="text-sm">PBM</p>
                    </div>
                    <div className="text-center bg-yellow-300 rounded p-1 m-1">
                      <p className="text-xl text-gray-900">{item[13]}</p>
                      <p className="text-sm">PM</p>
                    </div>
                    <div className="text-center bg-yellow-300 rounded p-1 m-1">
                      <p className="text-xl text-gray-900">{item[17]}</p>
                      <p className="text-sm">PPU</p>
                    </div>
                    <div className="text-center bg-yellow-300 rounded p-1 m-1">
                      <p className="text-xl text-gray-900">{item[12]}</p>
                      <p className="text-sm">PK</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center p-6 mt-20">
            <button
              type="submit"
              name="loginGoogle"
              onClick={() => signIn()}
              className="underline"
            >
              Anda Belum Login
            </button>
          </div>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#6b21a8"
            fill-opacity="1"
            d="M0,128L48,112C96,96,192,64,288,53.3C384,43,480,53,576,74.7C672,96,768,128,864,138.7C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

// ambil data soal
export async function getServerSideProps() {
  const req2 = await fetch(`https://bimbellb3r.com/api/biodata`);
  //   const req2 = await fetch(`localhost:3000/api/biodata`);
  const res2 = await req2.json();

  return {
    props: {
      biodata: res2.data,
    },
  };
}
