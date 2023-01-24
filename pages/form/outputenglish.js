import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CardHasil from '../../components/CardHasil';
import { runFireworks } from '../../libs/utils';

const ContactForm = ({ sheetdata }) => {
  // console.log(sheetdata);

  // console.log(sheetdata[0][1]);

  const [storedNisn, setStorageNisn] = useState('');
  const [storedName, setStorageName] = useState('Student');
  const [tipeSoal, setTipeSoal] = useState('');
  // console.log(storedName);
  // console.log(storedNisn);
  const filteredData = sheetdata.map((item) => item);
  const filteredNisn = filteredData.filter((item) => item[1] === storedNisn);
  // console.log(filteredNisn);
  useEffect(() => {
    runFireworks();
    // cek apakah ada name di local storage
    const storedName = localStorage.getItem('name');
    const storedNisn = localStorage.getItem('nisn');
    const tipeSoal = localStorage.getItem('tipeSoal');

    if (!storedName) {
      router.push('/form/login');
    } else {
      setStorageName(storedName);
      setStorageNisn(storedNisn);
      setTipeSoal(tipeSoal);
    }
  }, []);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const router = useRouter();
  const [form, setForm] = useState({
    nisn: '',
  });

  // cek nisn

  return (
    <div>
      <Head>
        <title>ANALISIS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="max-w-xl mb-2 flex items-center justify-center m-auto p-4 bg-gray-300 text-gray-900">
          <div className="mb-12">
            <div>
              <CardHasil
                sheetdata={sheetdata}
                filteredNisn={filteredNisn}
                storedName={storedName}
                storedNisn={storedNisn}
                tipeSoal={tipeSoal}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactForm;

// ambil data soal
export async function getServerSideProps() {
  const req = await fetch('https://ruleslb3r.vercel.app/api/analisisenglish');
  const res = await req.json();

  return {
    props: {
      sheetdata: res.data,
    },
  };
}
