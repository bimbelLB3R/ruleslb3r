import React, { useState, useEffect } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavSoal from '../../components/NavSoal';
import { Radio } from 'antd';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
// sheet jawaban
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID3;
// sheet database siswa
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;
// console.log(SHEET_ID3);

const ContactForm = ({ sheetdata }) => {
  // console.log(sheetdata);
  useEffect(() => {
    // Retrieve the selected values from local storage on initial render

    sheetdata.forEach((index) => {
      const savedValue = localStorage.getItem(`group${index[0]}`);
      // console.log(index[0]);
      // console.log(localStorage.key(index));
      if (savedValue) {
        setSelectedValues((selectedValues) => ({
          ...selectedValues,
          [`group${index[0]}`]: savedValue,
        }));
      }
      // berisi jawaban tersimpan
      // console.log(savedValue);
    });
  }, []);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const router = useRouter();
  const [form, setForm] = useState({
    nisn: '',
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  // console.log(SPREADSHEET_ID);
  const appendSpreadsheet = async (newRow) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        // private_key: GOOGLE_SERVICE_PRIVATE_KEY,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID3];
      // console.log(sheet);
      await sheet.addRow(newRow);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  // cek nisn sdh ada atau belum
  const checkNisn = async (nisn) => {
    // const nisn2 = nisn.toLowerCase();
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo(); // tambahkan baris ini untuk memastikan sheet telah terdefinisi
    const sheet = doc.sheetsById[SHEET_ID3]; // tambahkan baris ini untuk mendefinisikan sheet
    const rows = await sheet.getRows();
    //penulisan row.nisn , nisn nya harus sama dengan di google sheet nisn
    const nisnExists = rows.find((row) => row.nisn == nisn);
    // if nisn already exist return true
    if (nisnExists) {
      return false;
    }
    return true;
  };

  // cek nisn sdh ada atau belum end

  const submitForm = async (e, sheet) => {
    e.preventDefault();
    // cek ricek

    let isValid = true;
    // let errorMessage = '';
    function isNumber(value) {
      return /^\d+$/.test(value);
    }

    // Check if nisn is not empty
    if (!form.nisn) {
      isValid = false;
      // errorMessage = 'NISN is required';
      setErrorMessage('NISN is required');
    }
    if (isValid && !isNumber(form.nisn)) {
      isValid = false;
      // errorMessage = 'NISN is must be number';
      setErrorMessage('NISN must be a number');
    }

    // Check if all radiobuttons have been selected
    if (
      isValid &&
      !Object.values(selectedValues).every((value) => value !== null)
    ) {
      isValid = false;
      errorMessage = 'All question must be answered';
    }
    // cek ricek end

    if (isValid) {
      const nisnAda = await checkNisn(form.nisn, sheet);
      if (nisnAda) {
        setErrorMessage('NISN already exist');
      }
      const newRow = {
        nisn: form.nisn,
        ...Object.entries(selectedValues).reduce((acc, [name, savedValue]) => {
          acc[name] = savedValue;
          return acc;
        }, {}),
      };
      appendSpreadsheet(newRow);
      // Show a message to indicate that the data has been sent
      Swal.fire({
        title: 'Data has been sent',
        text: 'Thank you for submitting your data',
        icon: 'success',
      });
      // clear localstorage
      localStorage.clear();
      // Reset the form
      setForm({ nisn: '', name: '' });
      setSelectedValues({});
      router.push('/');
    } else {
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    setSelectedValues((selectedValues) => ({
      ...selectedValues,
      [name]: value,
    }));
    // Save the selected value in local storage
    localStorage.setItem(name, value);
  };

  return (
    <div>
      <Head>
        <title>SNBT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* navigasi soal */}
      <div className="md:flex justify-center fixed bottom-0 z-50 overflow-auto left-0 right-0 ">
        <NavSoal sumSoal={sheetdata} />
      </div>
      <main>
        <form onSubmit={submitForm}>
          <div className="max-w-xl mb-2 flex items-center justify-center m-auto p-4 bg-gray-200 text-gray-900">
            <div className="mb-12">
              <div>
                <label htmlFor="nisn">NISN:</label>
                <input
                  type="number"
                  name="nisn"
                  id="nisn"
                  className="w-full"
                  value={form.nisn}
                  placeholder="isi NISN tanpa spasi"
                  onChange={(e) => setForm({ ...form, nisn: e.target.value })}
                />
              </div>
              {sheetdata.map((item, index) => (
                <div key={index}>
                  {/* Bacaan */}
                  <p className="text-center mb-2 indent-8 font-semibold mt-4">
                    {item[2]}
                  </p>
                  <div className="flex items-center justify-center">
                    <img src={item[27]} className="w-full" />
                  </div>
                  <p className="text-justify mb-2 indent-8">{item[3]}</p>
                  <p className="text-justify mb-2 indent-8">{item[4]}</p>
                  <p className="text-justify mb-2 indent-8">{item[5]}</p>
                  <p className="text-justify mb-2 indent-8">{item[6]}</p>
                  <p className="text-justify mb-4 indent-8">{item[7]}</p>
                  {/* Tambahan bacaan kolom orange */}
                  <p className="text-justify mb-4 indent-8">{item[14]}</p>
                  <p className="text-justify mb-4 indent-8">{item[15]}</p>
                  <p className="text-justify mb-4 indent-8">{item[16]}</p>
                  <p className="text-justify mb-4 indent-8">{item[17]}</p>
                  <p className="text-center mb-4 indent-8 font-semibold">
                    {item[18]}
                  </p>
                  <p className="text-justify mb-4 indent-8">{item[19]}</p>
                  <p className="text-justify mb-4 indent-8">{item[20]}</p>
                  <p className="text-justify mb-4 indent-8">{item[21]}</p>
                  <p className="text-justify mb-4 indent-8">{item[22]}</p>
                  <p className="text-justify mb-4 indent-8">{item[23]}</p>
                  {/* Pertanyaan */}
                  <div className="flex space-x-2 ">
                    <p
                      className="text-justify mb-2 bg-gray-300 p-1"
                      id={item[28]}>
                      {item[28]}
                    </p>
                    <p className="text-justify mb-2 bg-gray-300 p-1">
                      {item[8]}
                    </p>
                  </div>
                  {/* Opsi Jawaban */}
                  <div className="pr-4 pl-4">
                    <Radio.Group
                      onChange={handleChange}
                      value={selectedValues[`group${index}`]}
                      name={`group${index}`}>
                      <div className="flex space-x-1">
                        <Radio value="A" className="text-justify ">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="font-semibold">A</p>
                            <p className="text-justify ">{item[9]}</p>
                          </div>
                        </Radio>
                      </div>
                      <div className="flex space-x-1">
                        <Radio value="B" className="text-justify ">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="font-semibold">B</p>
                            <p className="text-justify ">{item[10]}</p>
                          </div>
                        </Radio>
                      </div>
                      <div className="flex space-x-1">
                        <Radio value="C" className="text-justify ">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="font-semibold">C</p>
                            <p className="text-justify ">{item[11]}</p>
                          </div>
                        </Radio>
                      </div>
                      <div className="flex space-x-1">
                        <Radio value="D" className="text-justify ">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="font-semibold">D</p>
                            <p className="text-justify ">{item[12]}</p>
                          </div>
                        </Radio>
                      </div>
                      <div className="flex space-x-1">
                        <Radio value="E" className=" flex items-start">
                          <div className="flex items-center space-x-2 mb-2">
                            <p className="font-semibold">E</p>
                            <p className="text-justify ">{item[13]}</p>
                          </div>
                        </Radio>
                      </div>
                    </Radio.Group>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center w-full justify-center"
                  type="submit">
                  {isLoading ? (
                    <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
                  ) : (
                    'Klik untuk Kirim Jawaban Jika Kamu sudah yakin' // tampilkan teks 'Submit' jika proses append selesai
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ContactForm;

// ambil data soal
export async function getServerSideProps() {
  const req = await fetch('https://ruleslb3r.vercel.app/api/sheet');
  const res = await req.json();

  return {
    props: {
      sheetdata: res.data,
    },
  };
}
