import { Card, Dropdown } from 'flowbite-react';
import React, { useState } from 'react';

const CardHasil = ({
  sheetdata,
  filteredNisn,
  storedName,
  storedNisn,
  tipeSoal,
}) => {
  //   console.log(filteredNisn);
  console.log(tipeSoal);
  const [hapusLocal, setHapusLocal] = useState('');
  // const [tipeSoal, setTipeSoal] = useState('');
  const handleHapus = () => {
    setHapusLocal(localStorage.clear());
  };

  return (
    <div className="max-w-sm">
      <Card>
        <p className="bg-blue-600 w-full p-4 text-[16] font-bold rounded-xl text-gray-50">
          {tipeSoal}
        </p>
        <div className="flex justify-end px-4 pt-4">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
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
                <span className="font-bold text-red-900">{item[6]}</span>
              </p>
            </div>
          ))}
          <div>
            <p className="text-xs text-justify indent-6">
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
            <a href="/">
              <button
                onClick={handleHapus}
                href="/"
                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Lanjut Soal Yang Lain
              </button>
            </a>
            <a
              href="/form/snbt"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
              Coba Kerjakan Lagi
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardHasil;