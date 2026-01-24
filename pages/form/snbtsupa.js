import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import { Radio } from "antd";
import Latex from "react-latex";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Paginationsnbt from "../../components/PaginasiSoalSnbt";
import QuestionNavigation from "../../components/QuestionsNavigation";
import QuestionNavigationlg from "../../components/QuestionsNavigationlg";

dayjs.extend(duration);

const MainPageSoal = () => {
  const [questions, setQuestions] = useState([]);
  const [jumlahSoal, setJumlahSoal] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [isChecked, setIsChecked] = useState({});
  const postsPerPage = 1;
  const paginatedPosts = questions.filter(item => item.nomor_soal === currentPage);
  const totalPages = Math.ceil(questions.length / postsPerPage);
  const formRef = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const router = useRouter();
  const [form, setForm] = useState({
    nisn: "",
  });
  const [jumlahSoalSelesai, setJumlahSoalSelesai] = useState();
  const [storedName, setStorageName] = useState("Student");
  const [showNav, setShowNav] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [questionnav, setQuestionNav] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRadioButtonDisabled, setIsRadioButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(dayjs.duration(30, "minute"));
  const [timeStorage, setTimeStorage] = useState(null);
  const [link, setLink] = useState();

  // Kontrol scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Mencegah back
  useEffect(() => {
    const handleBack = () => {
      history.pushState(null, "", location.href);
    };

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, []);

  // Pengecualian penghapusan data localstorage
  const clearLocalStorageExcept = (keysToKeep) => {
    const savedData = {};
    keysToKeep.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        savedData[key] = value;
      }
    });

    localStorage.clear();

    Object.keys(savedData).forEach((key) => {
      localStorage.setItem(key, savedData[key]);
    });
  };

  // Ambil data soal dari API (bukan Supabase)
  useEffect(() => {
    async function fetchQuestions() {
      const katSoal = localStorage.getItem("link");
      
      if (!katSoal) {
        router.push("/form/loginsupa");
        return;
      }

      try {
        const response = await fetch(`/api/soal/${katSoal}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }

        const result = await response.json();
        const data = result.data;
        // console.log(data);
        const jmlSoal = data.length;
        setJumlahSoal(jmlSoal);
        setQuestions(data);
        localStorage.setItem("jumlahSoal", jmlSoal);

        const storedName = localStorage.getItem("name");
        if (!storedName) {
          router.push("/form/loginsupa");
        } else {
          setStorageName(storedName);
        }

        data.forEach((item) => {
          const storedNisn = localStorage.getItem("nisn");
          if (storedNisn) {
            setForm({ ...form, nisn: storedNisn });
          }

          const savedValue = localStorage.getItem(`group${item.nomor_soal}`);
          const statements = ["1", "2", "3", "4", "5"].filter(
            (index) => item[`pernyataan_${index}`]
          );

          statements.map((statement, index) => {
            const savedValueP = localStorage.getItem(`group${item.nomor_soal}_${index}`);
            if (savedValueP) {
              setSelectedValues((selectedValues) => ({
                ...selectedValues,
                [`group${item.nomor_soal}_${index}`]: savedValueP,
              }));
            }
          });

          if (savedValue) {
            setSelectedValues((selectedValues) => ({
              ...selectedValues,
              [`group${item.nomor_soal}`]: savedValue,
            }));
          }
        });
      } catch (error) {
        console.error("Error fetching questions:", error);
        Swal.fire({
          title: "Gagal Memuat Soal",
          text: "Terjadi kesalahan saat memuat soal. Silakan coba lagi.",
          icon: "error",
        });
      }
    }

    fetchQuestions();
  }, []);

  const tipeSoal = questions.find((item) => item.id > 0)?.kategori_soal;
  // console.log(tipeSoal)
  // console.log(questions);
  // console.log(paginatedPosts)
  // Agar waktu tetap jalan meski diminimize
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const storedMaxTime = localStorage.getItem("maxTime");
        const startTime = localStorage.getItem("startTime")
          ? dayjs(localStorage.getItem("startTime"))
          : dayjs();
        const elapsedTime = dayjs().diff(startTime, "second");
        const remainingTime = Math.max(0, parseInt(storedMaxTime) - elapsedTime);
        setTimeLeft(dayjs.duration(remainingTime, "second"));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const storedMaxTime = localStorage.getItem("maxTime");
    setCurrentPage(1);
    
    if (storedMaxTime) {
      const maxTimeInSeconds = parseInt(storedMaxTime);
      const currentTime = dayjs();
      const startTime = localStorage.getItem("startTime")
        ? dayjs(localStorage.getItem("startTime"))
        : currentTime;
      const elapsedTime = currentTime.diff(startTime, "second");
      const remainingTime = Math.max(0, maxTimeInSeconds - elapsedTime);
      setTimeLeft(dayjs.duration(remainingTime, "second"));
      
      if (!localStorage.getItem("startTime")) {
        localStorage.setItem("startTime", currentTime.toISOString());
      }
    } else {
      const defaultMaxTimeInSeconds = storedMaxTime;
      localStorage.setItem("maxTime", defaultMaxTimeInSeconds);
      const currentTime = dayjs();
      localStorage.setItem("startTime", currentTime.toISOString());
      setTimeLeft(dayjs.duration(defaultMaxTimeInSeconds, "second"));
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!timeLeft) return;

    const interval = setInterval(() => {
      if (timeLeft.asSeconds() <= 0) {
        clearInterval(interval);
        setIsButtonDisabled(false);
        Swal.fire({
          title: "Waktu Habis ... !",
          text: "Kirim Jawabanmu ya",
          icon: "info",
          confirmButtonText: "OK",
        }).then(() => {
          setIsRadioButtonDisabled(true);
        });
      } else {
        setTimeLeft((prevTimeLeft) => prevTimeLeft.subtract(1, "second"));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const onLoad = () => {
    renderMathInElement(document.body);
  };

  // Kirim jawaban ke API (bukan Supabase)
  const kirimJawaban = async (data) => {
    if (!data || !data.nisn) return;

    const link = localStorage.getItem("link");

    try {
      const response = await fetch('/api/jawaban/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kategori: link,
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit answer');
      }

      console.log(result.message);
    } catch (error) {
      console.error("Error mengirim jawaban:", error);
      Swal.fire({
        title: "Gagal Mengirim Jawaban",
        text: "Terjadi kesalahan saat mengirim jawaban. Silakan coba lagi.",
        icon: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const countUniqueGroups = () => {
      const uniqueGroups = new Set();

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        
        if (key.startsWith("group") && value) {
          const groupId = key.split("_")[0];
          uniqueGroups.add(groupId);
        }
      }

      return uniqueGroups.size;
    };

    const hitung = countUniqueGroups();
    const blmdjwb = jumlahSoal - hitung;

    Swal.fire({
      title: "Kirim Jawaban?",
      text: `Masih ada ${blmdjwb} soal belum kamu jawab, sisa waktu kurang dari : ${
        timeLeft ? timeLeft.format("mm:ss") : "Loading..."
      } menit`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Kirim!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        submitForm(e);
      }
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    const reduced = Object.entries(selectedValues).reduce((acc, [name, savedValue]) => {
      if (name.startsWith("group") && name.includes("_")) {
        const groupId = name.split("_")[0];
        acc[groupId] = acc[groupId] || "";

        if (typeof savedValue === "string" && /^[0-9]+[A-Z]$/i.test(savedValue)) {
          acc[groupId] += savedValue;
        } else {
          acc[groupId] += savedValue;
        }
      } else {
        if (typeof savedValue === "string" && savedValue.includes(",")) {
          acc[name] = savedValue
            .split(",")
            .map(Number)
            .sort((a, b) => a - b)
            .join("");
        } else if (Array.isArray(savedValue)) {
          acc[name] = savedValue
            .map(Number)
            .sort((a, b) => a - b)
            .join("");
        } else {
          acc[name] = savedValue;
        }
      }
      return acc;
    }, {});

    const bsGroups = Object.keys(reduced).filter((key) => {
      const val = reduced[key];
      return typeof val === "string" && /\d+[A-Z]/i.test(val);
    });

    bsGroups.forEach((key) => {
      const matches = reduced[key].match(/\d+[A-Z]/gi);
      if (matches) {
        reduced[key] = matches
          .sort((a, b) => parseInt(a) - parseInt(b))
          .join("");
      }
    });

    const newRow = {
      nisn: form.nisn,
      ...reduced,
    };
    console.log(newRow)
    setIsLoading(true);
    // console.log(newRow);
    await kirimJawaban(newRow);
    clearLocalStorageExcept([
      "link",
      "linkSudah",
      "linkBelum",
      "name",
      "nisn",
      "dataSoal",
    ]);

    setIsLoading(false);
    setForm({ nisn: "", name: "" });
    setSelectedValues({});

    let timerInterval;
    Swal.fire({
      title: "tunggu ya ..!",
      html: "Menuju soal berikutnya dalam <b></b> milliseconds.",
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
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("Menuju soal berikutnya");
      }
    });
    
    router.push("/form/transisisoalsupa");
  };

  const handleChange = (e) => {
    setRefreshKey((prev) => prev + 1);
    const { name, value, type, checked } = e.target;

    setSelectedValues((prevValues) => {
      let updatedValues;

      if (type === "checkbox") {
        const existingValues = prevValues[name] || [];
        updatedValues = checked
          ? [...existingValues, value]
          : existingValues.filter((v) => v !== value);
        localStorage.setItem(name, updatedValues);
      } else {
        updatedValues = value;
        localStorage.setItem(name, updatedValues);
      }

      const newValues = { ...prevValues, [name]: updatedValues };
      return newValues;
    });
  };

  useEffect(() => {
    const savedCurrentPage = localStorage.getItem("currentPage");
    if (savedCurrentPage) {
      setIsLoading(true);
      const delay = setTimeout(() => {
        setCurrentPage(Number(savedCurrentPage));
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(delay);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => {
      const newPage = Math.max(prevPage - 1, 1);
      localStorage.setItem("currentPage", newPage);
      return newPage;
    });
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => {
      const newPage = Math.min(prevPage + 1, totalPages);
      localStorage.setItem("currentPage", newPage);
      return newPage;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrevious]);

  const handleCheckbox = (page) => {
    const updatedIsChecked = { ...isChecked, [page]: !isChecked[page] };
    setIsChecked(updatedIsChecked);
    localStorage.setItem("isChecked", JSON.stringify(updatedIsChecked));
  };

  useEffect(() => {
    const savedData = localStorage.getItem("isChecked");
    if (savedData) {
      setIsChecked(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const countUniqueGroups = () => {
      const uniqueGroups = new Set();

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("group")) {
          const groupId = key.split("_")[0];
          uniqueGroups.add(groupId);
        }
      }

      return uniqueGroups.size;
    };

    const hitung = countUniqueGroups();
    setJumlahSoalSelesai(hitung);
  }, []);

  const hasNoBacaan=paginatedPosts.map((item)=>item.bacaan_1==="")[0]
      // console.log(hasNoBacaan)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(min-width: 1024px)");

      const handleResize = () => {
        const isLgScreen = mediaQuery.matches;
        const link = localStorage.getItem("link") || "";
        
        const isTargetLink =
          link === "kuantitatif" || link === "matematika" || link === "penalaran";
        setQuestionNav(hasNoBacaan);
      };

      handleResize();
      mediaQuery.addEventListener("change", handleResize);

      return () => mediaQuery.removeEventListener("change", handleResize);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Latihan Soal UTBK SNBT | Bimbel LB3R</title>
        <meta
          name="description"
          content="Bimbel LB3R menyelenggarakan bimbingan UTBK SNBT dan memberikan latihan soal dengan metode Item Response Theory (IRT)"
          key="desc"
        />
        <meta name="theme-color" content="#166534" />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>
      {/* <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
        integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
        crossOrigin="anonymous"
      ></link> */}
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
      <div className="sm:flex justify-center fixed bottom-0 z-50 overflow-auto left-0 right-0 bg-gradient-to-bl from-gray-800 to-green-800">
        {/* <NavSoal
          sumSoal={questions}
          tipeSoal={tipeSoal}
          pages={pages}
          totalPages={totalPages}
        /> */}

        {/* Tombol Paginasi Soal */}
        <div>
      <Paginationsnbt
        totalPages={Math.ceil(questions.length / postsPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isChecked={isChecked}
        selectedValues={selectedValues}
        allData={paginatedPosts}
      />
    </div>
      </div>
      {/* Selamat datang peserta */}
      <div className={`flex justify-center items-center fixed top-[0.8rem] z-50 overflow-auto left-0 pl-2 text-gray-100  md:text-sm transition-all duration-700 ease-in-out  ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
        <p className="">SNBT-{tipeSoal} | {currentPage}/{totalPages}</p>
      </div>
      <div className={`flex justify-center items-center fixed top-0 z-40 overflow-auto left-0 right-0  text-gray-100 text-[12px] md:text-sm transition-all duration-700 ease-in-out  ${
        isVisible ? "translate-y-0 bg-gray-900 opacity-100" : "-translate-y-full opacity-0"
      }`}>
        <div className=" p-2 rounded-full h-12">
          {/* <Timer /> */}
          {/* from timer */} 
          {/* <div id="" className="font-bold">{timeLeft ? timeLeft.format("mm:ss") : "Loading..."}</div> */}
          {/* from timer end */}
        </div>

        {/* <p className="text-center  p-3 ">
          {storedName} is doing {tipeSoal} now...
        </p> */}
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center mt-[50px]">
          <Loader />
        </div>
      ) : (
        <main>
          <form onSubmit={handleSubmit} ref={formRef} id="myForm">
            <div className="max-w-xl lg:max-w-full  select-none flex items-center justify-center m-auto p-4 bg-white  text-gray-900 ">
              <div className="mb-4">
                {/* <p className="fixed left-0 top-0  z-50  text-[8px] md:text-sm text-gray-50 p-2 md:p-3">
                  {currentPage} dari {totalPages} soal
                </p> */}
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

                {paginatedPosts.map((item) => {
                  const options = ["A", "B", "C", "D", "E"].filter(
                    (option) => 
                      item[`pilihan_${option.toLowerCase()}`] || 
                      item[`pilihan_${option.toLowerCase()}_img`]
                  );
                   const statements = ["1", "2", "3", "4", "5"].filter(
                    (statement) => 
                      item[`pernyataan_${statement}`] || 
                      item[`pernyataan_${statement}_img`]
                  );
                  const hasBacaan=item[`bacaan_1`].length>0;
                  // console.log(hasBacaan)
                   return(
                  <div
                    key={item.id}
                    className="bg-white  lg:m-10 p-2 text-base"
                  >
                    {/* {console.log(item.link_gambar)} */}
                    {/* Bacaan */}
                    
                    <div
                      className="lg:flex lg:p-10 lg:space-x-4 lg:w-full"
                      id="custom-text"
                    >
                      <div
                        key={item.id}
                        id="textBacaan"
                        className={`${
                        hasBacaan
                          ? "lg:w-1/2 overflow-auto max-h-[500px] rounded-t-lg mt-8 mb-4 p-4 border"
                          : "hidden"
                      }`}
                      >     
                        {questionnav?<QuestionNavigationlg 
                          totalQuestions={jumlahSoal}
                          totalPages={Math.ceil(questions.length / postsPerPage)}
                          currentPage={currentPage}
                          refreshKey={refreshKey}
                          setCurrentPage={setCurrentPage}/>:""}                               
                        {/* judul text tebal*/}
                        <p className="text-center mb-2 font-semibold mt-8 lg:mt-0">
                          {item.judul_text1}
                        </p>
                        {/* <div className="flex items-center justify-center hover:w-full hover:absolute hover:z-50 hover:right-0 hover:left-0 ">
                          <img src={item.link_gambar} className="w-full " />
                        </div> */}
                        <p className="text-justify mb-2 ">
                          <Latex>{item.bacaan_1}</Latex>
                        </p>
                        <p className="text-justify mb-2  ">
                          <Latex>{item.bacaan_2}</Latex>
                        </p>
                        <p className="text-justify mb-2 ">
                          {item.bacaan_3}
                        </p>
                        <p className="text-justify mb-2 ">
                          <Latex>{item.bacaan_4}</Latex>
                        </p>
                        <p className="text-justify mb-4 ">
                          {item.bacaan_5}
                        </p>
                        {/* Tambahan bacaan kolom orange */}
                        <p className="text-center mb-2 font-semibold mt-4 lg:mt-0">
                          {item.bacaan_6}
                        </p>
                        <p className="text-justify mb-4 ">
                          <Latex>{item.bacaan_7}</Latex>
                        </p>
                        <p className="text-justify mb-4 ">
                          {item.bacaan_8}
                        </p>
                        <p className="text-justify mb-4 ">
                          {item.bacaan_9}
                        </p>
                        <p className="text-center mb-4  font-semibold">
                          {item.bacaan_10}
                        </p>
                        <p className="text-justify mb-4 ">
                          <Latex>{item.bacaan_11}</Latex>
                        </p>
                        <p className="text-justify mb-4 ">
                          {item.bacaan_12}
                        </p>
                        {/* bacaan kolom kiri */}
                        <p className="text-justify mb-4 ">
                          {item.bacaan_13}
                        </p>
                        <div className="mb-4">
                          <div dangerouslySetInnerHTML={{ __html: item.bacaan_14 }} />
                        </div>
                        
                      </div>
                      <div
                        className={`${
                        hasBacaan
                          ? "lg:w-1/2 rounded-t-lg mt-10"
                          : "lg:max-w-2xl lg:mx-auto w-full"
                      }`}
                      >
                        <div>
                        {/* Pertanyaan */}
                        <div className="flex items-center justify-center ">
                            <div className={hasNoBacaan&&'mt-10'}>
                              <p className="bg-gray-300 text-gray-900 text-xs text-center font-semibold">Soal</p>
                              <p
                                className="text-justify mb-2 font-bold flex items-center p-1 bg-gray-900 text-gray-100"
                                id={currentPage}
                              >
                              Nomor {currentPage}
                              </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 p-2">
                          <div>
                            <div>
                              <div className="flex items-center justify-center ">
                                <img src={item.link_gambar} className=" " />
                              </div>
                              <p className="text-left   p-1 ">
                                <Latex>{item.bacaan_15}</Latex>
                              {/* <div dangerouslySetInnerHTML={{ __html: item.soal }}/> */}
                              {/* <BlockMath>{item.soal}</BlockMath> */}
                              </p>
                              <p className="text-left   p-1 ">
                                <Latex>{item.soal}</Latex>
                              {/* <div dangerouslySetInnerHTML={{ __html: item.soal }}/> */}
                              {/* <BlockMath>{item.soal}</BlockMath> */}
                              </p>
                            </div>
                            <div>
                              <div className="text-left mb-2   p-1 ">
                            {/* <Latex>{item.soal}</Latex> */}
                              <div dangerouslySetInnerHTML={{ __html: item.bacaan_16 }}/>
                            {/* <BlockMath>{item.soal}</BlockMath> */}
                              </div>
                            </div>  
                          </div>
                        </div>
                        {/* Opsi Jawaban dengan Support Gambar */}
                        <div className="pr-4 pl-4">
                        {options.length > 0 ? (
                          <Radio.Group
                            disabled={isRadioButtonDisabled}
                            onChange={handleChange}
                            value={selectedValues[`group${item.nomor_soal}`] || ""}
                            name={`group${item.nomor_soal}`}
                          >
                            {options.map((option) => {
                              const hasImage = item[`pilihan_${option.toLowerCase()}_img`];
                              // console.log(hasImage);
                              const textContent = item[`pilihan_${option.toLowerCase()}`];
                              // console.log(textContent)
                              
                              return (
                                <div className="flex space-x-1" key={option}>
                                  <div
                                    className={`mb-2 p-2 rounded-2xl border w-full ${
                                      selectedValues[`group${item.nomor_soal}`] === option
                                        ? "bg-gradient-to-br from-green-400 to-green-100"
                                        : ""
                                    }`}
                                  >
                                    <Radio value={option} className="text-justify relative w-full">
                                      <div className="flex items-start space-x-4">
                                        {/* Label Opsi (A, B, C, D, E) */}
                                        <div
                                          className={`p-1 rounded-full w-[2rem] h-[2rem] flex-shrink-0 ${
                                            selectedValues[`group${item.nomor_soal}`] === option
                                              ? "border-2 bg-green-500"
                                              : "bg-gray-500"
                                          }`}
                                        >
                                          <p className="flex items-center justify-center font-bold text-gray-100">
                                            {option}
                                          </p>
                                        </div>
                                        
                                        {/* Konten Opsi (Gambar dan/atau Teks) */}
                                        <div className="flex-1">
                                          {/* Tampilkan Gambar jika ada */}
                                          {hasImage && (
                                            <img
                                              src={hasImage}
                                              alt={`Pilihan ${option}`}
                                              className="max-w-full h-auto mb-2 rounded border cursor-pointer hover:scale-105 transition-transform"
                                              onClick={(e) => {
                                                e.stopPropagation(); // Prevent radio selection
                                                Swal.fire({
                                                  imageUrl: hasImage,
                                                  imageAlt: `Pilihan ${option}`,
                                                  showConfirmButton: false,
                                                  showCloseButton: true,
                                                  width: 'auto',
                                                  padding: '1rem'
                                                });
                                              }}
                                            />
                                          )}
                                          
                                          {/* Tampilkan Text jika ada */}
                                          {textContent && (
                                            <div className="text-left text-base">
                                              {item.inner_html === "yes" ? (
                                                <div dangerouslySetInnerHTML={{ __html: textContent }} />
                                              ) : (
                                                <Latex>{textContent}</Latex>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </Radio>
                                  </div>
                                </div>
                              );
                            })}
                          </Radio.Group>
                        ) : item.typeOpsi === "benarsalah" ? (
                          <div className="border p-2 rounded-lg">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr>
                                  <th className="border p-2">Pernyataan</th>
                                  <th className="border p-2">B</th>
                                  <th className="border p-2">S</th>
                                </tr>
                              </thead>
                              <tbody>
                                {statements.map((statement, index) => {
                                  const hasImage = item[`pernyataan_${statement}_img`];
                                  const textContent = item[`pernyataan_${statement}`];
                                  
                                  return (
                                    <tr key={index}>
                                      <td className="border p-2">
                                        {hasImage && (
                                          <img
                                            src={hasImage}
                                            alt={`Pernyataan ${statement}`}
                                            className="max-w-xs h-auto mb-2 rounded cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => {
                                              Swal.fire({
                                                imageUrl: hasImage,
                                                showConfirmButton: false,
                                                showCloseButton: true,
                                                width: 'auto',
                                                padding: '1rem'
                                              });
                                            }}
                                          />
                                        )}
                                        {textContent && (
                                          <div className="text-left">
                                            {item.inner_html === "yes" ? (
                                              <div dangerouslySetInnerHTML={{ __html: textContent }} />
                                            ) : (
                                              <Latex>{textContent}</Latex>
                                            )}
                                          </div>
                                        )}
                                      </td>
                                      <td className="border p-2 text-center">
                                        <input
                                          type="radio"
                                          name={`group${item.nomor_soal}_${index}`}
                                          value={`${statement}B`}
                                          checked={selectedValues[`group${item.nomor_soal}_${index}`] === `${statement}B`}
                                          onChange={(e) => handleChange(e)}
                                          disabled={isRadioButtonDisabled}
                                        />
                                      </td>
                                      <td className="border p-2 text-center">
                                        <input
                                          type="radio"
                                          name={`group${item.nomor_soal}_${index}`}
                                          value={`${statement}S`}
                                          checked={selectedValues[`group${item.nomor_soal}_${index}`] === `${statement}S`}
                                          onChange={(e) => handleChange(e)}
                                          disabled={isRadioButtonDisabled}
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        ) : item.typeOpsi === "inputangka" ? (
                          <input
                            type="number"
                            disabled={isRadioButtonDisabled}
                            placeholder="Masukkan hanya angka"
                            className="border rounded-lg p-2 w-full"
                            value={selectedValues[`group${item.nomor_soal}`] || ""}
                            onChange={(e) =>
                              handleChange({ target: { name: `group${item.nomor_soal}`, value: e.target.value } })
                            }
                          />
                        ) : (
                          <div className="flex flex-col space-y-2">
                            {statements.map((statement, index) => (
                              <div className="flex items-center space-x-2" key={index}>
                                <input
                                  type="checkbox"
                                  disabled={isRadioButtonDisabled}
                                  id={`checkbox-${item.id}-${index}`}
                                  name={`group${item.nomor_soal}`}
                                  value={statement}
                                  checked={selectedValues[`group${item.nomor_soal}`]?.includes(statement) || false}
                                  onChange={(e) => handleChange(e)}
                                />
                                <label htmlFor={`checkbox-${item.id}-${index}`} className="text-left text-base">
                                  <Latex>{item[`pernyataan_${statement}`]}</Latex>
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                        <div className="checklist flex flex-col items-center mt-10 mb-10">
                          <input
                            className="w-4 h-4 text-red-400 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            type="checkbox"
                            checked={isChecked[currentPage] || false}
                            // id={`page-${item[28]}`}
                            // nilai cek (ischecked) pada nomor sekian tru/false
                            // checked={isChecked[item[28]]}
                            onChange={() => handleCheckbox(currentPage)}
                            disabled={isRadioButtonDisabled}
                          />
                          <label
                            htmlFor={`page-${item.nomor_soal}`}
                            className="text-xs pl-10 pr-10 text-center text-green-600"
                          >
                            {/* Page {item[28]} */}
                            Tandai jika kamu masih ragu-ragu dengan jawabanmu
                            atau soal mau dilewati dulu
                          </label>
                          <p className="border-b-2 border-gray-400 p-2 text-green-600 text-xs font-bold">
                            Soal Nomor-{currentPage}
                          </p>
                        </div>
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
                )})}
                <div className={`flex justify-end `}>
                          {isButtonDisabled ? (
                          <p className="flex space-x-2 items-center justify-end fixed top-0 z-50 overflow-auto  text-gray-50 right-2">
                            <Loader />
                          </p>
                        ) : (
                          <button
                            disabled={isButtonDisabled}
                            type="submit"
                            className={`flex space-x-2 items-center justify-end fixed top-[0.8rem] z-50 overflow-auto transition-all duration-700 ease-in-out   right-2 ${
                              isVisible ? "translate-y-0 text-green-300 opacity-100" : "-translate-y-full hidden opacity-0"
                            }`}
                          >
                            <p className="font-bold">Kirim</p>
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
                className="bg-green-500 p-4 text-gray-50 fixed bottom-[1.10rem]  left-0 z-50 flex items-center space-x-2 rounded-tr-full rounded-br-full transition duration-300 overflow-hidden"
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
                <span className="text-xs">PREVIOUS</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 blur-md animate-glow2"></span>
              </button>
            )}
            {currentPage == totalPages ? (
              ""
            ) : (
              <button
                className="bg-green-500 p-4 text-gray-50 fixed bottom-[1.10rem]  right-0 z-50 flex items-center space-x-2 rounded-tl-full rounded-bl-full transition duration-300 overflow-hidden"
                onClick={handleNext}
                disabled={
                  currentPage >= Math.ceil(questions.length / postsPerPage)
                }
              >
                <span className="text-xs">NEXT</span>
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
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 blur-md animate-glow2"></span>
              </button>
            )}
          </div>
          <div className={`fixed top-[0.8rem] z-50 right-[6rem] `}>
            <div className="flex space-x-4 text-white">
              <div id="" className={`font-bold ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
                {timeLeft ? timeLeft.format("mm:ss") : "Loading..."}
              </div>
            <button className={` ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`} onClick={() => setShowNav(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-grid-3x3-gap-fill" viewBox="0 0 16 16">
                            <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
                      </svg>
                  </button>
            </div>
               <div>
                  {showNav && <QuestionNavigation 
                  totalQuestions={jumlahSoal}
                  totalPages={Math.ceil(questions.length / postsPerPage)}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                   onClose={() => setShowNav(false)} />}
                </div>
            </div>
        </main>
      )}
    </div>
  );
};

export default MainPageSoal;


