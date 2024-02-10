import { Card, Dropdown } from "flowbite-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Swal from "sweetalert2";

const CardHasil = ({
  filteredNisn,
  storedName,
  storedNisn,
  tipeSoal,
  choosenBiodata,
  isLoading,
}) => {
  // const { data: session } = useSession();
  // console.log(session);
  const [link, setLink] = useState("");
  useEffect(() => {
    const link = localStorage.getItem("link");
    setLink(link);
  });
  // console.log(filteredNisn);
  // console.log(tipeSoal);
  const [hapusLocal, setHapusLocal] = useState("");
  // const [tipeSoal, setTipeSoal] = useState('');
  const handleHapus = () => {
    setHapusLocal(localStorage.clear());
  };
  const handleLocal = () => {
    localStorage.removeItem("tipeSoal");
  };
  const router = useRouter();
  const handlePembahasan = () => {
    // router.push({
    //   pathname: `/form/pembahasan`,
    //   query: { link },
    // });
    Swal.fire({
      title: "Hanya Untuk Siswa",
      text: "Pembahasan dilakukan di kampus LB3R ya ..",
      icon: "warning",
    });
  };

  return (
    <div className="max-w-md bg-gradient-to-b from-purple-900">
      <Card className="bg-gradient-to-b from-purple-900 via-yellow-200 to-purple-900">
        <div className="">
          <div className="flex justify-end  items-center ">
            {/* <p className="w-full text-[16] font-bold">{tipeSoal}</p> */}

            <Dropdown inline={true} label="">
              <Dropdown.Item>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Download Soal
                </a>
              </Dropdown.Item>
              <Dropdown.Item>
                <button
                  onClick={handlePembahasan}
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Lihat Pembahasan
                </button>
              </Dropdown.Item>
              <Dropdown.Item>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Lihat Skor Peserta Lain
                </a>
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div className="flex flex-col items-center ">
            {/* <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          /> */}
            {/* <div className="hover:cursor-pointer">
              <a href={`/form/outputsnbt?link=${link}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-arrow-counterclockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                </svg>
              </a>
            </div> */}
          </div>
          <div>
            <div className="border-b-4 border-gray-600  p-1">
              {/* <div>
                <Image
                  src={session.user.image}
                  width={100}
                  className="rounded-full"
                  alt="foto"
                />
              </div> */}
              {choosenBiodata.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center m-2"
                >
                  <img
                    src={item[9]}
                    alt="foto"
                    width={96}
                    height={96}
                    className="rounded-full shadow-lg"
                  />
                </div>
              ))}
              <h5 className=" text-xl font-medium text-yellow-900  text-center">
                {storedName}
              </h5>
              <p className="text-sm text-gray-50  text-center mb-3">
                NISN : {storedNisn.toString().replace("1", "")}
              </p>
            </div>
            {filteredNisn.length > 0 ? (
              filteredNisn.map((item, index) => (
                <div key={index} className="mt-4 text-xs">
                  <p className=" p-1 text-yellow-900 text-center font-semibold">
                    Hasil Sementara Simulasi UTBK SNBT 2024
                  </p>
                  <div className="flex  justify-center">
                    <table className="border-collapse border border-gray-800">
                      <tbody>
                        <tr className="border border-gray-800">
                          <td className="border border-gray-800 p-1">
                            Materi Subtes
                          </td>
                          <td className="border border-gray-800 p-1">
                            {tipeSoal}
                          </td>
                        </tr>
                        <tr className="border border-gray-800">
                          <td className="border border-gray-800 p-1">
                            Ranking subtes
                          </td>
                          <td className="border border-gray-800 p-1">
                            {item[0]}
                          </td>
                        </tr>
                        <tr className="border border-gray-800">
                          <td className="border border-gray-800 p-1">
                            Skor Kamu
                          </td>
                          <td className="border border-gray-800 p-1">
                            {item[8]}
                          </td>
                        </tr>
                        <tr className="border border-gray-800">
                          <td className="border border-gray-800 p-1">
                            Jumlah jawaban benar
                          </td>
                          <td className="border border-gray-800 p-1">
                            {item[5]} dari {item[7]} soal
                          </td>
                        </tr>
                        <tr className="border border-gray-800">
                          <td className="border border-gray-800 p-1">
                            Jumlah Peserta
                          </td>
                          <td className="border border-gray-800 p-1">
                            {item[6]} Orang
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <a
                href="/form/outputsnbt"
                className="flex items-center justify-center"
              >
                <p className="underline">
                  Klik atau refresh halaman Untuk Melihat Hasil
                </p>
              </a>
            )}
            <div>
              <p className=" p-1 text-yellow-900 font-semibold text-xs mt-4 text-center">
                Penjelasan Metode IRT (Item Response Theory)
              </p>
              <p className="text-xs text-justify indent-6 p-2 ">
                Perlu {storedName} ketahui bahwa dalam Try Out SNBT menggunakan
                metode IRT, skor kamu bisa berubah-ubah disebabkan penambahan
                jumlah peserta TO. Makin banyak peserta yang menjawab benar pada
                suatu soal, maka soal tersebut skornya makin rendah (soal
                dikriteriakan sebagai soal mudah). Dan sebaliknya , makin
                sedikit peserta yang menjawab benar pada suatu soal, maka soal
                tersebut memiliki skor tinggi. Itu artinya, jika kamu mampu
                menjawab soal dengan kriteria sulit, maka skormu menjadi tinggi.
              </p>
            </div>
            <div className="mt-4 flex space-x-3 lg:mt-6 justify-center">
              <a href="/form/login">
                <button
                  onClick={handleHapus}
                  href="/"
                  className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Lanjut Soal Yang Lain
                </button>
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardHasil;
