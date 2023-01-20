import React, { useState, useEffect, useRef } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavSoal from '../../components/NavSoal';
import { Radio } from 'antd';
import Timer from '../../components/Timer';
import Modali from '../../components/Modali';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
// sheet jawaban
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID3;
// sheet analisis
const SHEET_ID4 = process.env.NEXT_PUBLIC_SHEET_ID4;
// sheet database siswa
const SHEET_ID2 = process.env.NEXT_PUBLIC_SHEET_ID2;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;
// console.log(SHEET_ID3);

const ContactForm = ({ sheetdata }) => {
  // console.log(sheetdata[0][1]);
  const tipeSoal = sheetdata[0][1];
  const formRef = useRef(null);

  // console.log(sheetdata);
  const [storedName, setStorageName] = useState('Student');
  useEffect(() => {
    // cek apakah ada name di local storage
    const storedName = localStorage.getItem('name');
    if (!storedName) {
      router.push('/form/login');
    } else {
      setStorageName(storedName);
    }
    sheetdata.forEach((index) => {
      // cek apakah sudah ada nisn dan nama di local storage
      const storedNisn = localStorage.getItem('nisn');

      if (storedNisn) {
        setForm({ ...form, nisn: storedNisn });
      }
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

  // // cek nisn sdh ada atau belum
  // const checkNisn = async (nisn) => {
  //   // const nisn2 = nisn.toLowerCase();
  //   await doc.useServiceAccountAuth({
  //     client_email: GOOGLE_CLIENT_EMAIL,
  //     private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  //   });
  //   await doc.loadInfo(); // tambahkan baris ini untuk memastikan sheet telah terdefinisi
  //   const sheet3 = doc.sheetsById[SHEET_ID3]; // tambahkan baris ini untuk mendefinisikan sheet
  //   const rows = await sheet3.getRows();
  //   //penulisan row.nisn , nisn nya harus sama dengan di google sheet nisn
  //   const nisnExists = rows.find((row) => row.nisn == nisn);
  //   // console.log(nisnExists);
  //   // if nisn already exist return true
  //   // tambahan untuk cek nisn yg sdh ada dijawaban
  //   // const sheetId = sheet3.sheetsByIndex[3].nisn;
  //   // tambahan untuk cek nisn yg sdh ada dijawabanend
  //   if (nisnExists) {
  //     // await sheet3.deleteRow(sheetId, rowIndex);
  //     return false;
  //   }
  //   return true;
  // };

  // cek nisn sdh ada atau belum end
  const checkNisn = async (nisn) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    const sheet3 = doc.sheetsById[SHEET_ID3];
    const sheet4 = doc.sheetsById[SHEET_ID4];
    const rows = await sheet3.getRows();
    const rowToDelete = rows.find((row) => row.nisn === nisn);

    const rows4 = await sheet4.getRows();
    const rowToDelete4 = rows4.find((row) => row.nisn === nisn);

    // if (rowToDelete) {
    //   await rowToDelete.del();
    //   await rowToDelete4.del();
    //   return true;
    // }
  };

  // Up date jawaban dan analisis
  // const checkNisn = async (nisn, newData) => {
  //   await doc.useServiceAccountAuth({
  //     client_email: GOOGLE_CLIENT_EMAIL,
  //     private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  //   });
  //   await doc.loadInfo();
  //   const sheet3 = doc.sheetsById[SHEET_ID3];
  //   const sheet4 = doc.sheetsById[SHEET_ID4];
  //   const rows1 = await sheet3.getRows();
  //   const rows2 = await sheet4.getRows();
  //   const rowToUpdate1 = rows1.find((row) => row.nisn === nisn);
  //   const rowToUpdate2 = rows2.find((row) => row.nisn === nisn);
  //   if (rowToUpdate1) {
  //     //update the data in sheet 1
  //     for (const key in newData) {
  //       rowToUpdate1[key] = newData[key];
  //     }
  //     await rowToUpdate1.save();
  //   }
  //   if (rowToUpdate2) {
  //     //update the data in sheet 2
  //     for (const key in newData) {
  //       rowToUpdate2[key] = newData[key];
  //     }
  //     await rowToUpdate2.save();
  //   } else {
  //     //if no row found in sheet 2 with the same nisn, add a new row
  //     await sheet4.addRow(newData);
  //   }
  //   return true;
  // };

  // Up date jawaban dan analisis end

  const submitForm = async (e, sheet3) => {
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
      const nisnAda = await checkNisn(form.nisn, sheet3);
      if (nisnAda) {
        setErrorMessage('Jawabanmu sudah di update');
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
        title: 'Jawabanmu Berhasil Terkirim',
        text: 'Lanjutkan Soal Berikutnya',
        icon: 'success',
      });
      // clear localstorage
      // localStorage.clear();
      // Reset the form
      setForm({ nisn: '', name: '' });
      setSelectedValues({});
      localStorage.setItem('tipeSoal', tipeSoal);
      router.push('/form/output');
    } else {
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
      });
    }
  };

  // // Duplikasi submit form, untuk yang auto submit
  // const submitFormAuto = async (sheet3) => {
  //   // cek ricek

  //   let isValid = true;
  //   // let errorMessage = '';
  //   function isNumber(value) {
  //     return /^\d+$/.test(value);
  //   }

  //   // Check if nisn is not empty
  //   if (!form.nisn) {
  //     isValid = false;
  //     // errorMessage = 'NISN is required';
  //     setErrorMessage('NISN is required');
  //   }
  //   if (isValid && !isNumber(form.nisn)) {
  //     isValid = false;
  //     // errorMessage = 'NISN is must be number';
  //     setErrorMessage('NISN must be a number');
  //   }

  //   // Check if all radiobuttons have been selected
  //   if (
  //     isValid &&
  //     !Object.values(selectedValues).every((value) => value !== null)
  //   ) {
  //     isValid = false;
  //     errorMessage = 'All question must be answered';
  //   }
  //   // cek ricek end

  //   if (isValid) {
  //     const nisnAda = await checkNisn(form.nisn, sheet3);
  //     if (nisnAda) {
  //       setErrorMessage('NISN already exist');
  //     }

  //     const newRow = {
  //       nisn: form.nisn,
  //       ...Object.entries(selectedValues).reduce((acc, [name, savedValue]) => {
  //         acc[name] = savedValue;
  //         return acc;
  //       }, {}),
  //     };
  //     appendSpreadsheet(newRow);
  //     // Show a message to indicate that the data has been sent
  //     Swal.fire({
  //       title: 'Waktu Habis, Jawabanmu Terkirim Otomatis',
  //       text: 'Lanjutkan Soal Berikutnya',
  //       icon: 'success',
  //     });
  //     // clear localstorage
  //     localStorage.clear();
  //     // Reset the form
  //     setForm({ nisn: '', name: '' });
  //     setSelectedValues({});
  //     router.push('/');
  //   } else {
  //     Swal.fire({
  //       title: 'Error',
  //       text: errorMessage,
  //       icon: 'error',
  //     });
  //   }
  // };
  // // Duplikasi submit form, untuk yang auto submit

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
      {/* Selamat datang peserta */}
      <div className="md:flex justify-center fixed top-0 z-50 overflow-auto left-0 right-0 bg-gray-900 text-gray-100">
        <p className="text-center font-semibold p-2 text-xs">
          {storedName} is doing {tipeSoal} now...
        </p>
      </div>
      <main>
        <form onSubmit={submitForm} ref={formRef}>
          <div className="max-w-xl mb-2 flex items-center justify-center m-auto p-4 bg-gray-300 text-gray-900">
            <div className="mb-12">
              <div>
                {/* <label htmlFor="nisn">NISN:</label> */}
                <input
                  type="hidden"
                  name="nisn"
                  id="nisn"
                  className="w-full"
                  value={form.nisn}
                  placeholder="isi NISN tanpa spasi"
                  onChange={(e) => setForm({ ...form, nisn: e.target.value })}
                />
              </div>
              {/* Timer */}
              <div>
                <a
                  href="/"
                  className="flex justify-start items-center space-x-2 fixed top-1 z-50 overflow-auto left-10 right-10 text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>

                  <div className="">
                    <p className="text-xs"></p>
                  </div>
                </a>
              </div>
              {sheetdata.map((item, index) => (
                <div key={index} className="bg-gray-300">
                  {/* Bacaan */}
                  <p className="text-center mb-2 indent-8 font-semibold mt-12">
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
                  <div className=" border-dashed border-l-2 border-yellow-900">
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
                          <Radio value="A" className="text-justify">
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
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold">E</p>
                              <p className="text-justify ">{item[13]}</p>
                            </div>
                          </Radio>
                        </div>
                      </Radio.Group>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                {/* <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center w-full justify-center"
                  type="submit">
                  {isLoading ? (
                    <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
                  ) : (
                    'Klik untuk Kirim Jawaban Jika Kamu sudah yakin' // tampilkan teks 'Submit' jika proses append selesai
                  )}
                </button> */}
                <button
                  type="submit"
                  className="flex space-x-2 items-center justify-end fixed top-3 z-50 overflow-auto  text-gray-100 right-10">
                  <p className="text-xs">Kirim</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-send"
                    viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
        {/* <Modali /> */}
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

// cek localstorage dari serverside
// export async function getInitialProps(ctx) {
//   if (!ctx.req && !localStorage.getItem('nisn')) {
//     Router.push('/form/login');
//   }
//   return {};
// }
