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
    <div className="flex items-center justify-center p-4 h-screen ">
      {/* <Navbar allPost={allPost} /> */}

      <div className="grid-cols-1 m-auto max-w-md  bg-purple-400 shadow-xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#6b21a8"
            fillOpacity="1"
            d="M0,96L6.5,101.3C13,107,26,117,39,149.3C51.9,181,65,235,78,224C90.8,213,104,139,117,96C129.7,53,143,43,156,58.7C168.6,75,182,117,195,122.7C207.6,128,221,96,234,90.7C246.5,85,259,107,272,144C285.4,181,298,235,311,261.3C324.3,288,337,288,350,272C363.2,256,376,224,389,224C402.2,224,415,256,428,250.7C441.1,245,454,203,467,181.3C480,160,493,160,506,160C518.9,160,532,160,545,154.7C557.8,149,571,139,584,117.3C596.8,96,610,64,623,74.7C635.7,85,649,139,662,154.7C674.6,171,688,149,701,138.7C713.5,128,726,128,739,128C752.4,128,765,128,778,133.3C791.4,139,804,149,817,165.3C830.3,181,843,203,856,192C869.2,181,882,139,895,138.7C908.1,139,921,181,934,208C947,235,960,245,973,229.3C985.9,213,999,171,1012,149.3C1024.9,128,1038,128,1051,133.3C1063.8,139,1077,149,1090,165.3C1102.7,181,1116,203,1129,197.3C1141.6,192,1155,160,1168,133.3C1180.5,107,1194,85,1206,112C1219.5,139,1232,213,1245,250.7C1258.4,288,1271,288,1284,282.7C1297.3,277,1310,267,1323,229.3C1336.2,192,1349,128,1362,138.7C1375.1,149,1388,235,1401,266.7C1414.1,299,1427,277,1434,266.7L1440,256L1440,0L1433.5,0C1427,0,1414,0,1401,0C1388.1,0,1375,0,1362,0C1349.2,0,1336,0,1323,0C1310.3,0,1297,0,1284,0C1271.4,0,1258,0,1245,0C1232.4,0,1219,0,1206,0C1193.5,0,1181,0,1168,0C1154.6,0,1142,0,1129,0C1115.7,0,1103,0,1090,0C1076.8,0,1064,0,1051,0C1037.8,0,1025,0,1012,0C998.9,0,986,0,973,0C960,0,947,0,934,0C921.1,0,908,0,895,0C882.2,0,869,0,856,0C843.2,0,830,0,817,0C804.3,0,791,0,778,0C765.4,0,752,0,739,0C726.5,0,714,0,701,0C687.6,0,675,0,662,0C648.6,0,636,0,623,0C609.7,0,597,0,584,0C570.8,0,558,0,545,0C531.9,0,519,0,506,0C493,0,480,0,467,0C454.1,0,441,0,428,0C415.1,0,402,0,389,0C376.2,0,363,0,350,0C337.3,0,324,0,311,0C298.4,0,285,0,272,0C259.5,0,246,0,234,0C220.5,0,208,0,195,0C181.6,0,169,0,156,0C142.7,0,130,0,117,0C103.8,0,91,0,78,0C64.9,0,52,0,39,0C25.9,0,13,0,6,0L0,0Z"
          ></path>
        </svg>
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
              <p className="text-center">{session.user.email}</p>

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
                  <div className="p-2 bg-purple-200 shadow-sm shadow-amber-600 m-2 rounded-lg text-xs md:text-sm">
                    <p className="font-semibold bg-purple-800 text-purple-50 p-1">
                      Pilihan Jurusan
                    </p>
                    <p>
                      1. Pilihan Pertama : {item[4]}, {item[6]}
                    </p>
                    <p>
                      2. Pilihan Kedua : {item[5]}, {item[7]}
                    </p>
                    <p className="font-semibold bg-purple-800 text-purple-50 p-1">
                      Skor Try Out
                    </p>
                    <div className="flex justify-between text-purple-900">
                      <p>Literasi Bahasa Indonesia</p>
                      <p>{item[11]}</p>
                    </div>
                    <div className="flex justify-between text-purple-900">
                      <p>Literasi Bahasa Inggris</p>
                      <p>{item[14]}</p>
                    </div>
                    <div className="flex justify-between text-purple-900">
                      <p>Penalaran Umum</p>
                      <p>{item[16]}</p>
                    </div>
                    <div className="flex justify-between text-purple-900">
                      <p>Pemahaman Bacaan & Menulis</p>
                      <p>{item[15]}</p>
                    </div>
                    <div className="flex justify-between text-purple-900">
                      <p>Penalaran Matematika</p>
                      <p>{item[13]}</p>
                    </div>
                    <div className="flex justify-between text-purple-900">
                      <p>Pengetahuan & Pemahaman Umum</p>
                      <p>{item[17]}</p>
                    </div>
                    <div className="flex justify-between text-purple-900">
                      <p>Pengetahuan Kuantitatif</p>
                      <p>{item[12]}</p>
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
            d="M0,96L6.5,101.3C13,107,26,117,39,149.3C51.9,181,65,235,78,224C90.8,213,104,139,117,96C129.7,53,143,43,156,58.7C168.6,75,182,117,195,122.7C207.6,128,221,96,234,90.7C246.5,85,259,107,272,144C285.4,181,298,235,311,261.3C324.3,288,337,288,350,272C363.2,256,376,224,389,224C402.2,224,415,256,428,250.7C441.1,245,454,203,467,181.3C480,160,493,160,506,160C518.9,160,532,160,545,154.7C557.8,149,571,139,584,117.3C596.8,96,610,64,623,74.7C635.7,85,649,139,662,154.7C674.6,171,688,149,701,138.7C713.5,128,726,128,739,128C752.4,128,765,128,778,133.3C791.4,139,804,149,817,165.3C830.3,181,843,203,856,192C869.2,181,882,139,895,138.7C908.1,139,921,181,934,208C947,235,960,245,973,229.3C985.9,213,999,171,1012,149.3C1024.9,128,1038,128,1051,133.3C1063.8,139,1077,149,1090,165.3C1102.7,181,1116,203,1129,197.3C1141.6,192,1155,160,1168,133.3C1180.5,107,1194,85,1206,112C1219.5,139,1232,213,1245,250.7C1258.4,288,1271,288,1284,282.7C1297.3,277,1310,267,1323,229.3C1336.2,192,1349,128,1362,138.7C1375.1,149,1388,235,1401,266.7C1414.1,299,1427,277,1434,266.7L1440,256L1440,320L1433.5,320C1427,320,1414,320,1401,320C1388.1,320,1375,320,1362,320C1349.2,320,1336,320,1323,320C1310.3,320,1297,320,1284,320C1271.4,320,1258,320,1245,320C1232.4,320,1219,320,1206,320C1193.5,320,1181,320,1168,320C1154.6,320,1142,320,1129,320C1115.7,320,1103,320,1090,320C1076.8,320,1064,320,1051,320C1037.8,320,1025,320,1012,320C998.9,320,986,320,973,320C960,320,947,320,934,320C921.1,320,908,320,895,320C882.2,320,869,320,856,320C843.2,320,830,320,817,320C804.3,320,791,320,778,320C765.4,320,752,320,739,320C726.5,320,714,320,701,320C687.6,320,675,320,662,320C648.6,320,636,320,623,320C609.7,320,597,320,584,320C570.8,320,558,320,545,320C531.9,320,519,320,506,320C493,320,480,320,467,320C454.1,320,441,320,428,320C415.1,320,402,320,389,320C376.2,320,363,320,350,320C337.3,320,324,320,311,320C298.4,320,285,320,272,320C259.5,320,246,320,234,320C220.5,320,208,320,195,320C181.6,320,169,320,156,320C142.7,320,130,320,117,320C103.8,320,91,320,78,320C64.9,320,52,320,39,320C25.9,320,13,320,6,320L0,320Z"
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
