import React, { useState, useEffect, useRef } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavSoal from '../../components/NavSoal';
import { Radio } from 'antd';
import { Button } from 'flowbite-react';
import Latex from 'react-latex';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
// sheet jawaban
const SHEET_ID9 = process.env.NEXT_PUBLIC_SHEET_ID9;
// sheet analisis
const SHEET_ID10 = process.env.NEXT_PUBLIC_SHEET_ID10;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;
// console.log(SHEET_ID3);

const ContactForm = ({ sheetdata }) => {
  // console.log(sheetdata[0][1]);
  const tipeSoal = sheetdata[0][1];

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
      // console.log(index[0]);
      if (storedNisn) {
        setForm({ ...form, nisn: storedNisn });
      }
      const savedValue = localStorage.getItem(`english${index[0]}`);

      // console.log(index[0]);
      // console.log(localStorage.key(index));
      if (savedValue) {
        setSelectedValues((selectedValues) => ({
          ...selectedValues,
          [`english${index[0]}`]: savedValue,
        }));
      }
      // berisi jawaban tersimpan
      // console.log(savedValue);
    });
  }, []);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
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

      const sheet = doc.sheetsById[SHEET_ID9];
      // console.log(sheet);
      await sheet.addRow(newRow);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  // cek nisn sdh ada atau belum end
  const checkNisn = async (nisn) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    const sheet9 = doc.sheetsById[SHEET_ID9];
    const sheet10 = doc.sheetsById[SHEET_ID10];
    const rows = await sheet9.getRows();
    const rowToDelete = rows.find((row) => row.nisn === nisn);

    const rows4 = await sheet10.getRows();
    const rowToDelete4 = rows4.find((row) => row.nisn === nisn);

    if (rowToDelete) {
      await rowToDelete.del();
      await rowToDelete4.del();
      return true;
    }
  };

  // Up date jawaban dan analisis end

  const submitForm = async (e, sheet3) => {
    e.preventDefault();
    setIsButtonDisabled(true);
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
      setIsLoading(true); // set status loading menjadi true
      appendSpreadsheet(newRow);
      setIsLoading(false); // set status loading menjadi false setelah proses selesai
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
      router.push('/form/outputenglish');
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

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 1;
  const paginatedPosts = sheetdata.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );
  // console.log(paginatedPosts);
  const totalPages = Math.ceil(sheetdata.length / postsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // console.log(pages);
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const [isChecked, setIsChecked] = useState(new Array(totalPages).fill(false));
  const handleCheckbox = (page) => {
    setIsChecked((prevState) => {
      const newState = [...prevState];
      newState[page] = !newState[page];
      localStorage.setItem(`isChecked-${page}`, JSON.stringify(newState[page]));
      return newState;
    });
  };

  useEffect(() => {
    const totalPages = Math.ceil(sheetdata.length / postsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const isCheckedFromStorage = pages.map((page) =>
      JSON.parse(localStorage.getItem(`isChecked-${page - 1}`))
    );
    if (isCheckedFromStorage) {
      setIsChecked(isCheckedFromStorage);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>ENGLISH |SNBT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* navigasi soal */}
      <div className="sm:flex justify-center fixed bottom-0 z-50 overflow-auto left-0 right-0 ">
        <NavSoal sumSoal={sheetdata} tipeSoal={tipeSoal} pages={pages} />

        <div className=" flex flex-row">
          {pages.map((page) => (
            <Button
              key={page}
              className={`page-button ${
                isChecked[page]
                  ? 'active bg-yellow-400'
                  : 'bg-gray-800 rounded-none '
              }`}
              onClick={() => setCurrentPage(page)}>
              {page}
            </Button>
          ))}
        </div>
      </div>
      {/* Selamat datang peserta */}
      <div className="md:flex justify-center fixed top-0 z-50 overflow-auto left-0 right-0 bg-gray-900 text-gray-100">
        <p className="text-center  p-2 text-xs">
          {storedName} is doing {tipeSoal} now...
        </p>
      </div>
      <main>
        <form onSubmit={submitForm}>
          <div className="max-w-xl  flex items-center justify-center m-auto p-4 bg-gray-300 text-gray-900">
            <div className="mb-4">
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

              {paginatedPosts.map((item) => (
                <div key={item[0]} className="bg-gray-300">
                  {/* {console.log(item[0])} */}
                  {/* Bacaan */}
                  <p className="text-center mb-2 indent-8 font-semibold mt-12">
                    {item[2]}
                  </p>
                  <div className="flex items-center justify-center hover:w-full hover:absolute hover:z-50 hover:right-0 hover:left-0] ">
                    <img src={item[27]} className="w-full " />
                  </div>
                  <p className="text-justify mb-2 indent-8 hover:bg-green-400">
                    {item[3]}
                  </p>
                  <p className="text-justify mb-2 indent-8 hover:bg-green-400">
                    <Latex>{item[4]}</Latex>
                  </p>
                  <p className="text-justify mb-2 indent-8 hover:bg-green-400">
                    {item[5]}
                  </p>
                  <p className="text-justify mb-2 indent-8 hover:bg-green-400">
                    {item[6]}
                  </p>
                  <p className="text-justify mb-4 indent-8 hover:bg-green-400">
                    {item[7]}
                  </p>
                  {/* Tambahan bacaan kolom orange */}
                  <p className="text-justify mb-4 indent-8 hover:bg-green-400">
                    {item[14]}
                  </p>
                  <p className="text-justify mb-4 indent-8 hover:bg-green-400">
                    {item[15]}
                  </p>
                  <p className="text-justify mb-4 indent-8 hover:bg-green-400">
                    {item[16]}
                  </p>
                  <p className="text-justify mb-4 indent-8 hover:bg-green-400">
                    {item[17]}
                  </p>
                  <p className="text-center mb-4 indent-8 hover:bg-green-400 font-semibold">
                    {item[18]}
                  </p>
                  <p className="text-justify mb-4 indent-8 hover:bg-green-400">
                    {item[19]}
                  </p>
                  <p className="text-justify mb-4 indent-8 hover:bg-green-400">
                    {item[20]}
                  </p>
                  <p className="text-justify mb-4 indent-8 hover:bg-green-400">
                    {item[21]}
                  </p>
                  <p className="text-justify mb-4 indent-8 hover:bg-green-400">
                    {item[22]}
                  </p>
                  <p className="text-justify mb-4 indent-8 hover:bg-green-400">
                    {item[23]}
                  </p>
                  <div className=" border-dashed border-l-2 border-yellow-900">
                    {/* Pertanyaan */}
                    <div className="flex space-x-2 ">
                      <p
                        className="text-justify mb-2 bg-yellow-300 flex items-center p-1"
                        id={item[28]}>
                        {item[28]}
                      </p>
                      <p className="text-justify mb-2 bg-gray-300 p-1 border-b-2 border-t-2 border-yellow-400">
                        <Latex>{item[8]}</Latex>
                      </p>
                    </div>
                    {/* Opsi Jawaban */}
                    <div className="pr-4 pl-4">
                      <Radio.Group
                        onChange={handleChange}
                        value={selectedValues[`english${item[0]}`]}
                        name={`english${item[0]}`}>
                        <div className="flex space-x-1">
                          <Radio value="A" className="text-justify">
                            <div className="flex items-center space-x-2 mb-2">
                              <p className="font-semibold">A</p>
                              <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-yellow-400">
                                {item[9]}
                              </p>
                            </div>
                          </Radio>
                        </div>
                        <div className="flex space-x-1">
                          <Radio value="B" className="text-justify ">
                            <div className="flex items-center space-x-2 mb-2">
                              <p className="font-semibold">B</p>
                              <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-yellow-400">
                                {item[10]}
                              </p>
                            </div>
                          </Radio>
                        </div>
                        <div className="flex space-x-1">
                          <Radio value="C" className="text-justify ">
                            <div className="flex items-center space-x-2 mb-2">
                              <p className="font-semibold">C</p>
                              <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-yellow-400">
                                {item[11]}
                              </p>
                            </div>
                          </Radio>
                        </div>
                        <div className="flex space-x-1">
                          <Radio value="D" className="text-justify ">
                            <div className="flex items-center space-x-2 mb-2">
                              <p className="font-semibold">D</p>
                              <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-yellow-400">
                                {item[12]}
                              </p>
                            </div>
                          </Radio>
                        </div>
                        <div className="flex space-x-1">
                          <Radio value="E" className=" flex items-start">
                            <div className="flex items-center space-x-2">
                              <p className="font-semibold">E</p>
                              <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-yellow-400">
                                {item[13]}
                              </p>
                            </div>
                          </Radio>
                        </div>
                      </Radio.Group>
                    </div>
                    <div className="checklist flex flex-col items-center mt-10">
                      <input
                        className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        type="checkbox"
                        id={`page-${item[28]}`}
                        checked={isChecked[item[28]]}
                        onChange={() => handleCheckbox(item[28])}
                      />
                      <label
                        htmlFor={`page-${item[28]}`}
                        className="text-xs pl-10 pr-10 text-center">
                        {/* Page {item[28]} */}
                        Tandai jika kamu masih ragu-ragu dengan jawabanmu atau
                        soal mau dilewati dulu
                      </label>
                      <p className="border-b-2 border-gray-400 p-2 text-gray-800 text-xs">
                        Page-{item[28]}
                      </p>
                    </div>
                  </div>
                </div>
                // tombol ragu2
              ))}
              <div className="flex justify-end">
                {isButtonDisabled ? (
                  <p className="flex space-x-2 items-center justify-end fixed top-0 z-50 overflow-auto  text-gray-50 right-2">
                    <Loader />
                  </p>
                ) : (
                  <button
                    disabled={isButtonDisabled}
                    type="submit"
                    className="flex space-x-2 items-center justify-end fixed top-2 z-50 overflow-auto  text-gray-100 right-2">
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
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="max-w-xl mb-20 flex items-center justify-center m-auto p-4 bg-gray-300 text-gray-900 space-x-8">
          {/* tombol next n before */}
          <button
            onClick={handlePrevious}
            disabled={currentPage <= 1}
            className="bg-green-400 p-2 text-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-square-fill"
              viewBox="0 0 16 16">
              <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
            </svg>
          </button>

          <button
            className="bg-green-400 p-2 text-gray-50"
            onClick={handleNext}
            disabled={
              currentPage >= Math.ceil(sheetdata.length / postsPerPage)
            }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-square-fill"
              viewBox="0 0 16 16">
              <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
};

export default ContactForm;

// ambil data soal
export async function getServerSideProps() {
  const req = await fetch('https://ruleslb3r.vercel.app/api/soalenglish');
  const res = await req.json();

  return {
    props: {
      sheetdata: res.data,
    },
  };
}
