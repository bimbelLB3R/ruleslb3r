import React, { useState, useEffect, useRef } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import NavSoalDiagnostik from "../../../components/NavSoalDiagnostik";
import { Radio } from "antd";
import { Button } from "flowbite-react";
import Latex from "react-latex";
import Timer from "../../../components/Timer";
// from timer
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { getDiagnostikData } from "../../../utils/diagnostikApi";

dayjs.extend(duration);
// from timer end

const DiagnostikSoal = ({ allsoal }) => {
  const mydata = JSON.stringify(allsoal);
//   console.log(mydata);

  // from timer
  const [isRadioButtonDisabled, setIsRadioButtonDisabled] = useState(false);
  // console.log(isRadioButtonDisabled);true
  const [timeLeft, setTimeLeft] = useState(dayjs.duration(30, "minute"));
  const [timeStorage, setTimeStorage] = useState(null);

  useEffect(() => {
    // const timeStorage = localStorage.getItem("timeLeft");
    const storedMaxTime = localStorage.getItem("maxTime");
    setCurrentPage(1);
    // console.log(timeStorage);
    // if (timeStorage) {
    //   setTimeStorage(dayjs.duration(parseInt(timeStorage), "second"));
    //   setTimeLeft(dayjs.duration(parseInt(timeStorage), "second"));
    // }
    if (storedMaxTime) {
      const maxTimeInSeconds = parseInt(storedMaxTime);
      const currentTime = dayjs();
      const startTime = localStorage.getItem("startTime")
        ? dayjs(localStorage.getItem("startTime"))
        : currentTime; // Use current time if startTime is not set
      const elapsedTime = currentTime.diff(startTime, "second");
      const remainingTime = Math.max(0, maxTimeInSeconds - elapsedTime);
      setTimeLeft(dayjs.duration(remainingTime, "second"));
      if (!localStorage.getItem("startTime")) {
        localStorage.setItem("startTime", currentTime.toISOString());
      }
    } else {
      const defaultMaxTimeInSeconds = storedMaxTime; // 20 minutes in seconds
      localStorage.setItem("maxTime", defaultMaxTimeInSeconds);
      const currentTime = dayjs();
      localStorage.setItem("startTime", currentTime.toISOString());
      setTimeLeft(dayjs.duration(defaultMaxTimeInSeconds, "second"));
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("timeLeft", timeLeft.asSeconds());
  // }, [timeLeft]);

  useEffect(() => {
    if (!timeLeft) {
      return;
    }
    const interval = setInterval(() => {
      if (timeLeft.asSeconds() <= 0) {
        clearInterval(interval);
        // alert("Time's up!");
        Swal.fire({
          title: "Waktu Sudah Habis",
          text: "Kirim jawabanmu atau tutup dengan klik X",
          icon: "warning",
          confirmButtonText: "Oke Bos",
        });
        setIsRadioButtonDisabled(true);
      } else {
        // setTimeLeft(timeLeft.subtract(1, "second"));
        setTimeLeft((prevTimeLeft) => prevTimeLeft.subtract(1, "second"));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, setIsRadioButtonDisabled]);
  // from timer end

  const onLoad = () => {
    renderMathInElement(document.body);
  };
  // Config variables
  const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_IDRULESLB3R;
  // sheet jawaban
  const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID_DIAGNOSTIKHASIL;
  const SHEET_ID4 = process.env.NEXT_PUBLIC_SHEET_ID_DIAGNOSTIKHASIL;
  

  const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
  const GOOGLE_SERVICE_PRIVATE_KEY =
    process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

  const [sheetIdJwb, setSheetIdJwb] = useState();
  const [sheetIdAna, setSheetIdAna] = useState();
  const [link, setLink] = useState();

  useEffect(() => {
    const linkValue = localStorage.getItem("link");
    setLink(linkValue);
    if (linkValue === "diagnostik") {
      setSheetIdJwb(SHEET_ID3);
      setSheetIdAna(SHEET_ID4);
    }else {
      console.log("linkValue undetect");
    }
  }, []);

  // console.log(allsoal[0][1]);
  const tipeSoal = "diagnostik";
  const formRef = useRef(null);

  // console.log(allsoal);
  const [storedName, setStorageName] = useState("Student");
  useEffect(() => {
    // cek apakah ada name di local storage
    const storedName = localStorage.getItem("name");
    if (!storedName) {
      router.push("/layanan/diagnostik/login");
    } else {
      setStorageName(storedName);
    }
    allsoal.forEach((index) => {
      // cek apakah sudah ada nisn dan nama di local storage
      const storedNisn = localStorage.getItem("wa");
      // console.log(index[0]);
      if (storedNisn) {
        setForm({ ...form, wa: storedNisn });
      }
      const savedValue = localStorage.getItem(`group${index.id}`);

      // console.log(index[0]);
      // console.log(localStorage.key(index));
      if (savedValue) {
        setSelectedValues((selectedValues) => ({
          ...selectedValues,
          [`group${index.id}`]: savedValue,
        }));
      }
      // berisi jawaban tersimpan
      // console.log(savedValue);
    });
  }, []);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const router = useRouter();
  const [form, setForm] = useState({
    wa: "",
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  // console.log(SPREADSHEET_ID);
  const appendSpreadsheet = async (newRow) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        // private_key: GOOGLE_SERVICE_PRIVATE_KEY,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[sheetIdJwb];
      // console.log(sheet);
      await sheet.addRow(newRow);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const checkNisn = async (wa) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    const sheet3 = doc.sheetsById[sheetIdJwb];
    const sheet4 = doc.sheetsById[sheetIdAna];
    const rows = await sheet3.getRows();
    const rowToDelete = rows.find((row) => row.wa === wa);

    const rows4 = await sheet4.getRows();
    const rowToDelete4 = rows4.find((row) => row.wa === wa);

    if (rowToDelete) {
      await rowToDelete.del();
      await rowToDelete4.del();
      return true;
    }
  };

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
    if (!form.wa) {
      isValid = false;
      // errorMessage = 'NISN is required';
      setErrorMessage("WA is required");
    }
    if (isValid && !isNumber(form.wa)) {
      isValid = false;
      // errorMessage = 'NISN is must be number';
      setErrorMessage("WA must be a number");
    }

    // Check if all radiobuttons have been selected
    if (
      isValid &&
      !Object.values(selectedValues).every((value) => value !== null)
    ) {
      isValid = false;
      errorMessage = "All question must be answered";
    }
    // cek ricek end

    if (isValid) {
      const nisnAda = await checkNisn(form.wa, sheet3);
      if (nisnAda) {
        setErrorMessage("Jawabanmu sudah di update");
      }
      const newRow = {
        wa: form.wa,
        ...Object.entries(selectedValues).reduce((acc, [name, savedValue]) => {
          acc[name] = savedValue;
          return acc;
        }, {}),
      };
      // console.log(newRow);
      setIsLoading(true); // set status loading menjadi true
      appendSpreadsheet(newRow);
      setIsLoading(false); // set status loading menjadi false setelah proses selesai
      // Show a message to indicate that the data has been sent
      // Swal.fire({
      //   title: "Jawabanmu Berhasil Terkirim",
      //   text: "Lanjutkan Soal Berikutnya",
      //   icon: "success",
      // });
      // clear localstorage
      // localStorage.clear();
      // Reset the form
      setForm({ wa: "", name: "" });
      setSelectedValues({});
      localStorage.setItem("tipeSoal", tipeSoal);

      // mengulur waktu saat ambil data dari sheet
      let timerInterval;
      Swal.fire({
        title: "Nilai sedang diproses!",
        html: "I will close in <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
      // mengulur waktu saat ambil data dari sheet end
      // router.push({
      //   pathname: `/form/outputsnbt`,
      //   query: { link },
      // });
      router.push({
        pathname: `./hasil`,
        query: { link },
      });
    } else {
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
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

  const [currentPage, setCurrentPage] = useState();
  const [selectedPage, setSelectedPage] = useState(null);
  const [isChecked, setIsChecked] = useState({});
  const postsPerPage = 1;
  const paginatedPosts = allsoal.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );
  // console.log(jawab);
  const totalPages = Math.ceil(allsoal.length / postsPerPage);
  // useEffect(() => {
  //   // Simpan nilai currentPage ke localStorage setiap kali berubah
  //   localStorage.setItem("currentPage", currentPage);
  // }, [currentPage]);
  useEffect(() => {
    // Saat komponen dimuat, cek apakah ada nilai currentPage yang disimpan di localStorage
    const savedCurrentPage = localStorage.getItem("currentPage");
    // if (savedCurrentPage) {
    //   setCurrentPage(Number(savedCurrentPage));
    // }
    if (savedCurrentPage) {
      // Set status loading menjadi true saat proses pengecekan sedang berlangsung
      setIsLoading(true);
      // Simulasikan penundaan untuk menampilkan efek loading (opsional)
      const delay = setTimeout(() => {
        setCurrentPage(Number(savedCurrentPage));
        // Setelah pengecekan selesai, atur status loading menjadi false
        setIsLoading(false);
      }, 1000); // Contoh penundaan 1 detik
      // Membersihkan timeout pada unmount atau saat efek berubah
      return () => clearTimeout(delay);
    } else {
      // Jika tidak ada nilai currentPage di localStorage, atur status loading menjadi false
      setIsLoading(false);
    }
  }, []);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // console.log(pages);
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    localStorage.setItem("currentPage", currentPage - 1);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    localStorage.setItem("currentPage", currentPage + 1);
  };

  // console.log(selectedValues);
  // console.log(currentPage);
  // page dalam handle checkbox mendeteksi perubahan page pada input dan mengirimnya ke local storage. page disini hanay sbg argumen yg menerima currentpage dari input checkbox yg dipilih
  const handleCheckbox = (page) => {
    setSelectedPage(page);
    const updatedIsChecked = { ...isChecked, [page]: !isChecked[page] };
    setIsChecked(updatedIsChecked);
    localStorage.setItem("isChecked", JSON.stringify(updatedIsChecked));
  };

  useEffect(() => {
    // Mengambil data dari Local Storage
    const savedData = localStorage.getItem("isChecked");

    // Jika ada data yang tersimpan di Local Storage
    if (savedData) {
      setIsChecked(JSON.parse(savedData));
    }
  }, []);

  // const isRadioButtonDisabled = <Timer />;
  // const text = document.getElementById('textBacaan').innerText;
  // console.log(isLoading);

  return (
    <div>
      <Head>
        <title>SOAL DIAGNOSTIK  | Bimbel LB3R</title>
        <meta
          name="description"
          content="Bimbel LB3R menyelenggarakan tes diagnostik untuk mengetahui gaya belajar."
          key="desc"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
        integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
        crossOrigin="anonymous"
      ></link>
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js"
        integrity="sha384-PwRUT/YqbnEjkZO0zZxNqcxACrXe+j766U2amXcgMg5457rve2Y7I6ZJSm2A0mS4"
        crossOrigin="anonymous"
      ></script>
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js"
        integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05"
        crossOrigin="anonymous"
        onLoad={onLoad}
      ></script>
      {/* navigasi soal */}
      <div className="flex justify-center fixed bottom-0 z-50 overflow-auto left-0 right-0 ">
        <NavSoalDiagnostik
          sumSoal={allsoal}
          tipeSoal={tipeSoal}
          pages={pages}
          totalPages={totalPages}
        />

        <div className=" flex flex-row overflow-auto">
          {Array.from(
            Array(Math.ceil(allsoal.length / postsPerPage)).keys()
          ).map((page) => (
            <button
              key={page}
              className={` ${
                isChecked[page + 1]
                  ? " bg-yellow-400 pl-4 pr-4 pt-2 pb-2"
                  : "bg-gray-800 rounded-none  pl-4 pr-4 pt-2 pb-2 text-gray-50"
              }`}
              onClick={() => {
                setCurrentPage(page + 1);
                localStorage.setItem("currentPage", page + 1);
              }}
            >
              <p
                className={`${
                  currentPage === page + 1
                    ? "font-bold underline"
                    : "text-gray-50"
                }`}
              >
                {page + 1}
                {/* {jawab} */}
                {selectedValues[`group${page}`]}
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
          <div>{timeLeft ? timeLeft.format("mm:ss") : "Loading..."}</div>
          {/* from timer end */}
        </div>

        <p className="text-center  p-2 ">
          Selamat Mengerjakan tes {tipeSoal},{storedName}!
        </p>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center mt-[50px]">
          <Loader />
        </div>
      ) : (
        <main>
          <form onSubmit={submitForm} ref={formRef}>
            <div className="max-w-xl lg:max-w-full  select-none flex items-center justify-center m-auto p-4 bg-gray-300 text-gray-900">
              <div className="mb-4">
                <p className="fixed left-0 top-0  z-50  text-[8px] md:text-sm text-gray-50 p-2 md:p-3">
                  {currentPage} dari {totalPages} soal
                </p>
                <div>
                  {/* <label htmlFor="nisn">NISN:</label> */}
                  <input
                    type="hidden"
                    name="wa"
                    id="wa"
                    className="w-full"
                    value={form.wa}
                    placeholder="wa ortu"
                    onChange={(e) => setForm({ ...form, wa: e.target.value })}
                  />
                </div>
                {/* Timer */}
                <p className="mt-10 text-center font-semibold mb-2">TES DIAGNOSTIK</p>
                {paginatedPosts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 lg:drop-shadow-2xl lg:m-10 p-2"
                  >
                    {/* {console.log(item[0])} */}
                    {/* Bacaan */}
                    <div
                      className="lg:flex  lg:p-10 lg:space-x-4 "
                      id="custom-text"
                    >
                      <div
                        key={item.id}
                        id="textBacaan"
                        className={`${
                          link === "diagnostik" 
                            ? "lg:max-w-full"
                            : "lg:max-w-1/2 max-h-[500px] overflow-auto"
                        }`}
                      >
                       
                        {/* <p className="text-justify mb-2 indent-8 hover:bg-gray-100">
                          {item.soal}
                        </p> */}
                        
                      </div>
                      <div
                        className={`${
                          link === "diagnostik"
                            ?"lg:max-w-full border-dashed border-l-2 border-yellow-900":"lg:max-w-1/2  border-l-2 border-gray-400 border-dashed bg-blue-50 rounded-t-lg"
                        }`}
                      >
                        {/* Pertanyaan */}
                        <div className="flex space-x-2 p-2">
                          <p
                            className="text-justify mb-2 bg-gray-200 flex items-center p-1 "
                            id={item.id}
                          >
                            {item.nomor_soal}
                          </p>
                          <p className="text-left mb-2  bg-gray-50 p-1 border-b-2 border-t-2 border-gray-200">
                            <Latex>{item.soal}</Latex>
                          </p>
                        </div>
                        {/* Opsi Jawaban */}
                        <div className="pr-4 pl-4">
                          <Radio.Group
                            disabled={isRadioButtonDisabled}
                            onChange={handleChange}
                            value={selectedValues[`group${item.id}`]}
                            name={`group${item.id}`}
                          >
                            <div className="flex space-x-1">
                              <Radio value="A" className="text-justify">
                                <div className="flex items-center space-x-2 mb-2">
                                  <p className="font-semibold">A</p>
                                  <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-gray-100">
                                    {item.pilihan_a}
                                  </p>
                                </div>
                              </Radio>
                            </div>
                            <div className="flex space-x-1">
                              <Radio value="B" className="text-justify ">
                                <div className="flex items-center space-x-2 mb-2">
                                  <p className="font-semibold">B</p>
                                  <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-gray-100">
                                    {item.pilihan_b}
                                  </p>
                                </div>
                              </Radio>
                            </div>
                            <div className="flex space-x-1">
                              <Radio value="C" className="text-justify ">
                                <div className="flex items-center space-x-2 mb-2">
                                  <p className="font-semibold">C</p>
                                  <p className="text-justify border p-1 border-gray-600 rounded-xl hover:bg-gray-100">
                                    {item.pilihan_c}
                                  </p>
                                </div>
                              </Radio>
                            </div>
                          </Radio.Group>
                        </div>

                        <div className="checklist flex flex-col items-center mt-10 mb-10">
                          <input
                            className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            type="checkbox"
                            checked={isChecked[currentPage] || false}
                            // id={`page-${item[28]}`}
                            // nilai cek (ischecked) pada nomor sekian tru/false
                            // checked={isChecked[item[28]]}
                            onChange={() => handleCheckbox(currentPage)}
                          />
                          <label
                            htmlFor={`page-${item.nomor_soal}`}
                            className="text-xs pl-10 pr-10 text-center"
                          >
                            {/* Page {item[28]} */}
                            Tandai jika kamu masih ragu-ragu dengan jawabanmu
                            atau soal mau dilewati dulu
                          </label>
                          <p className="border-b-2 border-gray-400 p-2 text-gray-800 text-xs font-bold">
                            Soal Nomor-{item.nomor_soal}
                          </p>
                        </div>

                        {/* <div>
                      <Button
                        className={`page-button ${
                          isChecked[item[28]]
                            ? 'active bg-yellow-400'
                            : 'bg-gray-800'
                        }`}
                        onClick={() => setCurrentPage(item[28])}>
                        {item[28]}
                      </Button>
                    </div> */}
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
                      className="flex space-x-2 items-center justify-end fixed top-2 z-50 overflow-auto  text-blue-300 right-2"
                    >
                      <p className="text-xs font-bold">Kirim</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        className="bi bi-send"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
          <div className="">
            {/* tombol next n before */}
            {currentPage == 1 ? (
              ""
            ) : (
              <button
                onClick={handlePrevious}
                disabled={currentPage <= 1}
                className="bg-gray-800 p-2 text-gray-50 fixed bottom-10 sm:hidden left-0 z-50 flex items-center space-x-2 rounded-tr-full lg:rounded-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
                </svg>
                <span className="text-xs">Soal Sebelumnya</span>
              </button>
            )}
            {currentPage == totalPages ? (
              ""
            ) : (
              <button
                className="bg-gray-800 p-2 text-gray-50 fixed bottom-10 sm:hidden right-0 z-50 flex items-center space-x-2 rounded-tl-full lg:rounded-none"
                onClick={handleNext}
                disabled={
                  currentPage >= Math.ceil(allsoal.length / postsPerPage)
                }
              >
                <span className="text-xs">Soal Berikutnya</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z" />
                </svg>
              </button>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default DiagnostikSoal;

// ambil data soal dari google sheet
// export async function getServerSideProps({ query }) {
//   const link = query.link;
//   const req = await fetch(`http://localhost:3000/api/soal${link}`);
//   const res = await req.json();

//   return {
//     props: {
//       allsoal: res.data,
//     },
//   };
// }

// ambil data dari json
export async function getStaticProps() {
    const data = getDiagnostikData();
    // console.log(dataTutorial);
    return {
      props: {
        allsoal: data.soals //biar tidak merubah nama data maka pakai allsoal
      },
    };
  }
