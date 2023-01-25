import { Card, Dropdown } from 'flowbite-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CardHasil = ({ filteredNisn, storedName, storedNisn, tipeSoal }) => {
  const [link, setLink] = useState('');
  useEffect(() => {
    const link = localStorage.getItem('link');
    setLink(link);
  });
  //   console.log(filteredNisn);
  // console.log(tipeSoal);
  const [hapusLocal, setHapusLocal] = useState('');
  // const [tipeSoal, setTipeSoal] = useState('');
  const handleHapus = () => {
    setHapusLocal(localStorage.clear());
  };
  const handleLocal = () => {
    localStorage.removeItem('tipeSoal');
  };

  return (
    <div className="max-w-sm">
      <Card>
        <p className="bg-blue-600 w-full p-4 text-[16] font-bold rounded-xl text-gray-50">
          {tipeSoal}
        </p>
        <div className="flex justify-end px-4 pt-4">
          <p className="text-xs italic text-red-600">
            Refresh Halaman Untuk Up date Skor!
          </p>
          <Dropdown inline={true} label="">
            <Dropdown.Item>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                Download Soal
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                Download Pembahasan
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
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
          <div className="hover:cursor-pointer">
            <a href={`/form/output${link}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="currentColor"
                className="bi bi-arrow-counterclockwise"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <div className="border-b-2">
            <h5 className=" text-xl font-medium text-gray-900 dark:text-white">
              {storedName}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              NISN : {storedNisn}
            </span>
          </div>
          {filteredNisn.map((item, index) => (
            <div key={index} className="border-b-2">
              <p>
                Skor Kamu :{' '}
                <span className="font-bold text-red-900">{item[8]}/1000</span>
              </p>
              <p>
                Jumlah jawaban benar :{' '}
                <span className="font-bold text-red-900">
                  {item[5]} dari {item[7]} soal
                </span>
              </p>
              <p>
                Jumlah Peserta :{' '}
                <span className="font-bold text-red-900">{item[6]} Orang</span>
              </p>
            </div>
          ))}
          <div>
            <p className="text-xs text-justify indent-6 border-l-2 border-gray-300 p-2 mt-2">
              Perlu {storedName} ketahui bahwa dalam Try Out SNBT menggunakan
              metode IRT, skor kamu bisa berubah-ubah disebabkan penambahan
              jumlah peserta TO. Makin banyak peserta yang menjawab benar pada
              suatu soal, maka soal tersebut skornya makin rendah (soal
              dikriteriakan sebagai soal mudah). Dan sebaliknya , makin sedikit
              peserta yang menjawab benar pada suatu soal, maka soal tersebut
              memiliki skor tinggi. Itu artinya, jika kamu mampu menjawab soal
              dengan kriteria sulit, maka skormu menjadi tinggi.
            </p>
          </div>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <a href="/form/login">
              <button
                onClick={handleHapus}
                href="/"
                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Lanjut Soal Yang Lain
              </button>
            </a>
            {/* <a
              onClick={handleLocal}
              href="/form/snbt"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
              Coba Kerjakan Lagi
            </a> */}
            <div className="underline">
              <Link href={`/form/${link}`}>Ulangi Lagi</Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardHasil;
