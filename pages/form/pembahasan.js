import React, { useState, useEffect, useRef } from 'react';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavSoal from '../../components/NavSoal';
import { Radio } from 'antd';
import Latex from 'react-latex';

const ContactForm = ({ sheetdata }) => {
  const onLoad = () => {
    renderMathInElement(document.body);
  };

  const [link, setLink] = useState();

  useEffect(() => {
    const linkValue = localStorage.getItem('link');
    setLink(linkValue);
  }, []);

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
      // console.log(index[0]);
      if (storedNisn) {
        setForm({ ...form, nisn: storedNisn });
      }
      const savedValue = localStorage.getItem(`group${index[0]}`);
      if (savedValue) {
        setSelectedValues((selectedValues) => ({
          ...selectedValues,
          [`group${index[0]}`]: savedValue,
        }));
      }
    });
  }, []);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const router = useRouter();
  const [form, setForm] = useState({
    nisn: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isChecked, setIsChecked] = useState({});
  const postsPerPage = 1;
  const paginatedPosts = sheetdata.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );
  // console.log(jawab);
  const totalPages = Math.ceil(sheetdata.length / postsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // console.log(pages);
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Head>
        <title>SNBT|LB3R</title>
        <meta name="description" content="Seleksi Masuk PTN Jalur Tes" />
      </Head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
        integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
        crossOrigin="anonymous"></link>
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js"
        integrity="sha384-PwRUT/YqbnEjkZO0zZxNqcxACrXe+j766U2amXcgMg5457rve2Y7I6ZJSm2A0mS4"
        crossOrigin="anonymous"></script>
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js"
        integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05"
        crossOrigin="anonymous"
        onLoad={onLoad}></script>
      {/* navigasi soal */}
      <div className="sm:flex justify-center fixed bottom-0 z-50 overflow-auto left-0 right-0 ">
        <NavSoal sumSoal={sheetdata} tipeSoal={tipeSoal} pages={pages} />

        <div className=" flex flex-row overflow-auto">
          {Array.from(
            Array(Math.ceil(sheetdata.length / postsPerPage)).keys()
          ).map((page) => (
            <button
              key={page}
              className={` ${
                isChecked[page + 1]
                  ? ' bg-yellow-400 pl-4 pr-4 pt-2 pb-2'
                  : 'bg-gray-800 rounded-none  pl-4 pr-4 pt-2 pb-2 text-gray-50'
              }`}
              onClick={() => {
                setCurrentPage(page + 1);
              }}>
              <p
                className={`${
                  currentPage === page + 1
                    ? 'font-bold underline'
                    : 'text-gray-50'
                }`}>
                {page + 1}
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* Selamat datang peserta */}
      <div className="flex justify-center items-center fixed top-0 z-50 overflow-auto left-0 right-0 bg-gray-900 text-gray-100 text-[8px] md:text-sm">
        <div className="bg-red-800 p-1 rounded-full">
          {/* <Timer /> */}
          {/* from timer */}
          {/* <div>{timeLeft ? timeLeft.format('mm:ss') : 'Loading...'}</div> */}
          {/* from timer end */}
        </div>

        <p className="text-center  p-2 ">Pembahasan {tipeSoal}</p>
      </div>
      <main>
        <form ref={formRef}>
          <div className="max-w-xl lg:max-w-full  select-none flex items-center justify-center m-auto p-4 bg-gray-300 text-gray-900">
            <div className="mb-20">
              <p className="fixed left-0 top-0  z-50  text-[8px] md:text-sm text-gray-50 p-2 md:p-3">
                {currentPage} dari {totalPages} soal
              </p>
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
                <div
                  key={item[0]}
                  className="bg-gray-50 lg:drop-shadow-2xl lg:m-10 p-2">
                  {/* {console.log(item[0])} */}
                  {/* Bacaan */}
                  <div className="lg:flex  lg:p-10 lg:space-x-4 ">
                    <div
                      key={item[0]}
                      id="textBacaan"
                      className={`${
                        link === 'kuantitatif' || link === 'matematika'
                          ? 'lg:max-w-1/2'
                          : 'lg:max-w-1/2 max-h-[500px] overflow-auto'
                      }`}>
                      <p className="text-center mb-2 indent-8 font-semibold mt-4 lg:mt-0">
                        {item[2]}
                      </p>
                      <div className="flex items-center justify-center hover:w-full hover:absolute hover:z-50 hover:right-0 hover:left-0 ">
                        <img src={item[27]} className="w-full " />
                      </div>
                      <p className="text-justify mb-2 indent-8 hover:bg-gray-100">
                        {item[3]}
                      </p>
                      <p className="text-justify mb-2 hover:bg-gray-100">
                        <Latex>{item[4]}</Latex>
                      </p>
                      <p className="text-justify mb-2 indent-8 hover:bg-gray-100">
                        {item[5]}
                      </p>
                      <p className="text-justify mb-2 indent-8 hover:bg-gray-100">
                        {item[6]}
                      </p>
                      <p className="text-justify mb-4 indent-8 hover:bg-gray-100">
                        {item[7]}
                      </p>
                      {/* Tambahan bacaan kolom orange */}
                      <p className="text-justify mb-4 indent-8 hover:bg-gray-100">
                        {item[14]}
                      </p>
                      <p className="text-justify mb-4 indent-8 hover:bg-gray-100">
                        {item[15]}
                      </p>
                      <p className="text-justify mb-4 indent-8 hover:bg-gray-100">
                        {item[16]}
                      </p>
                      <p className="text-justify mb-4 indent-8 hover:bg-gray-100">
                        {item[17]}
                      </p>
                      <p className="text-center mb-4 indent-8 hover:bg-gray-100 font-semibold">
                        {item[18]}
                      </p>
                      <p className="text-justify mb-4 indent-8 hover:bg-gray-100">
                        {item[19]}
                      </p>
                      <p className="text-justify mb-4 indent-8 hover:bg-gray-100">
                        {item[20]}
                      </p>
                      <p className="text-justify mb-4 indent-8 hover:bg-gray-100">
                        {item[21]}
                      </p>
                      <p className="text-justify mb-4 indent-8 hover:bg-gray-100">
                        {item[22]}
                      </p>
                      <p className="text-justify mb-4 indent-8 hover:bg-gray-100">
                        {item[23]}
                      </p>
                      <p className="text-left mb-4 text-xs font-semibold italic">
                        {item[26]}
                      </p>
                    </div>
                    <div
                      className={`${
                        link === 'kuantitatif' || link === 'matematika'
                          ? 'lg:max-w-full border-dashed border-l-2 border-yellow-900'
                          : 'lg:max-w-1/2  border-l-2 border-gray-400 border-dashed'
                      }`}>
                      {/* Pertanyaan */}
                      <div className="flex space-x-2 p-2">
                        <p
                          className="text-justify mb-2 bg-gray-200 flex items-center p-1 "
                          id={item[28]}>
                          {item[28]}
                        </p>
                        <p className="text-left mb-2  bg-gray-50 p-1 border-b-2 border-t-2 border-gray-200">
                          <Latex>{item[8]}</Latex>
                        </p>
                      </div>
                      {/* Opsi Jawaban */}
                      <div className="pr-4 pl-4">
                        <Radio.Group
                          disabled
                          value={selectedValues[`group${item[0]}`]}
                          name={`group${item[0]}`}>
                          <div className="flex space-x-1">
                            <Radio value="A" className="text-justify">
                              <div className="flex items-center space-x-2 mb-2">
                                <p className="font-semibold">A</p>
                                <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-gray-100">
                                  {item[9]}
                                </p>
                              </div>
                            </Radio>
                          </div>
                          <div className="flex space-x-1">
                            <Radio value="B" className="text-justify ">
                              <div className="flex items-center space-x-2 mb-2">
                                <p className="font-semibold">B</p>
                                <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-gray-100">
                                  {item[10]}
                                </p>
                              </div>
                            </Radio>
                          </div>
                          <div className="flex space-x-1">
                            <Radio value="C" className="text-justify ">
                              <div className="flex items-center space-x-2 mb-2">
                                <p className="font-semibold">C</p>
                                <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-gray-100">
                                  {item[11]}
                                </p>
                              </div>
                            </Radio>
                          </div>
                          <div className="flex space-x-1">
                            <Radio value="D" className="text-justify ">
                              <div className="flex items-center space-x-2 mb-2">
                                <p className="font-semibold">D</p>
                                <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-gray-100">
                                  {item[12]}
                                </p>
                              </div>
                            </Radio>
                          </div>
                          <div className="flex space-x-1">
                            <Radio value="E" className=" flex items-start">
                              <div className="flex items-center space-x-2">
                                <p className="font-semibold">E</p>
                                <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-gray-100">
                                  {item[13]}
                                </p>
                              </div>
                            </Radio>
                          </div>
                        </Radio.Group>
                        <div className="mt-6 max-w-full">
                          <p className="font-bold text-gray-900">
                            Kunci Jawaban : {console.log(item[29])}
                          </p>
                          <p className="font-bold">Pembahasan :</p>
                          <p>
                            ini adalah contoh pembahasan. Pembahasan sebenarnya
                            masih dalam proses
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
        <div className="">
          {/* tombol next n before */}
          <button
            onClick={handlePrevious}
            disabled={currentPage <= 1}
            className="bg-gray-800 p-2 text-gray-50 fixed bottom-10 sm:hidden left-0 z-50 flex items-center space-x-2 rounded-tr-full lg:rounded-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-square-fill"
              viewBox="0 0 16 16">
              <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
            </svg>
            <span className="text-xs">Soal Sebelumnya</span>
          </button>

          <button
            className="bg-gray-800 p-2 text-gray-50 fixed bottom-10 sm:hidden right-0 z-50 flex items-center space-x-2 rounded-tl-full lg:rounded-none"
            onClick={handleNext}
            disabled={
              currentPage >= Math.ceil(sheetdata.length / postsPerPage)
            }>
            <span className="text-xs">Soal Berikutnya</span>
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
export async function getServerSideProps({ query }) {
  const link = query.link;
  const req = await fetch(`https://ruleslb3r.vercel.app/api/soal${link}`);
  const res = await req.json();

  return {
    props: {
      sheetdata: res.data,
    },
  };
}
