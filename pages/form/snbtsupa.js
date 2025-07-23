import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import { Radio } from "antd";
import Latex from "react-latex";
// from timer
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { supabase } from "../../libs/supabase";
import Paginationsnbt from "../../components/PaginasiSoalSnbt";
// import { createClient } from '@supabase/supabase-js';
import QuestionNavigation from "../../components/QuestionsNavigation";
import QuestionNavigationlg from "../../components/QuestionsNavigationlg";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

dayjs.extend(duration);
// from timer end

const ContactForm = () => {
  const [questions, setQuestions] = useState([]);
  const [jumlahSoal,setJumlahSoal]=useState();
  const [currentPage, setCurrentPage] = useState();
  const [isChecked, setIsChecked] = useState({});
  const postsPerPage = 1;
  const paginatedPosts = questions.filter(item => item.id === currentPage-1);
  const totalPages = Math.ceil(questions.length / postsPerPage);
  const formRef = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});
  const router = useRouter();
  const [form, setForm] = useState({
    nisn: "",
  });
  const [jumlahSoalSelesai,setJumlahSoalSelesai]=useState();
  const [storedName, setStorageName] = useState("Student");
  const [showNav, setShowNav] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [questionnav,setQuestionNav]=useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // State untuk trigger useEffect
  // kontrol scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY); // Munculkan jika scroll ke atas
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  // mencegah back
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
  // mencegah back end
  
  // pengecualian penghapusan data localstorage
  const clearLocalStorageExcept = (keysToKeep) => {
    // Simpan nilai dari keys yang ingin dipertahankan
    const savedData = {};
    keysToKeep.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        savedData[key] = value;
      }
    });
  
    // Hapus seluruh localStorage
    localStorage.clear();
  
    // Kembalikan data yang dipertahankan
    Object.keys(savedData).forEach((key) => {
      localStorage.setItem(key, savedData[key]);
    });
  };
  
  // ambil data soal dari supabase
  useEffect(() => {    
    async function fetchQuestions() {
        const katSoal=localStorage.getItem("link");
        const { data, error } = await supabase
            .from(katSoal)
            .select("*");
        if (error) {
            console.error("Error fetching questions:", error);
        } else {
          const jmlSoal=data.length;
          setJumlahSoal(jmlSoal);
          setQuestions(data);
          localStorage.setItem("jumlahSoal",jmlSoal);
          const storedName = localStorage.getItem("name");
    if (!storedName) {
      router.push("/form/loginsupa");
    } else {
      setStorageName(storedName);
    }
    data.forEach((item) => {
      // console.log(item.id)
      // cek apakah sudah ada nisn dan nama di local storage
      const storedNisn = localStorage.getItem("nisn");
      // console.log(index[0]);
      if (storedNisn) {
        setForm({ ...form, nisn: storedNisn });
      }
      const savedValue = localStorage.getItem(`group${item.id}`); //group0 untuk nomor 1
      // menghidupak pemanggilan local khusus group0_1 dkk untuk aktifkan radio dan cekbox saat refresh
      const statements=["1","2","3","4","5"].filter((index)=>item[`pernyataan_${index}`]);
      statements.map((statement, index) =>{
        const savedValueP=localStorage.getItem(`group${item.id}_${index}`);
        if (savedValueP) {
          setSelectedValues((selectedValues) => ({
            ...selectedValues,
            [`group${item.id}_${index}`]: savedValueP,
          }));
        }
      })
      if (savedValue) {
        setSelectedValues((selectedValues) => ({
          ...selectedValues,
          [`group${item.id}`]: savedValue,
        }));
      }
      // berisi jawaban tersimpan
      // console.log(paginatedPosts);
    });
        }
    }

    fetchQuestions();
}, []);

// console.log(questions);
  // from timer
  const [isRadioButtonDisabled, setIsRadioButtonDisabled] = useState(false);
  // console.log(isRadioButtonDisabled);true
  const [timeLeft, setTimeLeft] = useState(dayjs.duration(30, "minute"));
  const [timeStorage, setTimeStorage] = useState(null);

  // agar waktu tetap jalan meski diminimize
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const storedMaxTime = localStorage.getItem("maxTime");
        const startTime = localStorage.getItem("startTime") ? dayjs(localStorage.getItem("startTime")) : dayjs();
        const elapsedTime = dayjs().diff(startTime, "second");
        const remainingTime = Math.max(0, parseInt(storedMaxTime) - elapsedTime);
        setTimeLeft(dayjs.duration(remainingTime, "second"));
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);
  
  // agar waktu tetap jalan meski diminimize end

  useEffect(() => {
    // const timeStorage = localStorage.getItem("timeLeft");
    const storedMaxTime = localStorage.getItem("maxTime");
    setCurrentPage(1);
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

//  menyederhanakan waktu habis
  useEffect(() => {
    if (!timeLeft) return;

    const interval = setInterval(() => {    
        if (timeLeft.asSeconds() <= 0) {
            clearInterval(interval); // Hentikan interval agar Swal tidak muncul terus
            setIsButtonDisabled(false);
            Swal.fire({
              title: "Waktu Habis ... !",
              text: "Kirim Jawabanmu ya",
              icon: "info",
              confirmButtonText: "OK"
          }).then(() => {
              // ✅ Set button disabled setelah user klik OK
              setIsRadioButtonDisabled(true)
          });
            
        } else {
            setTimeLeft((prevTimeLeft) => prevTimeLeft.subtract(1, "second"));
        }
    }, 1000);

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
}, [timeLeft]);

  // from timer end

  const onLoad = () => {
    renderMathInElement(document.body);
  };
  
  const [link, setLink] = useState();

  const tipeSoal=questions.find((item) => item.id === 0)?.kategori_soal;
  // console.log(questions)

//   kirim jawaban ke supa
const kirimJawaban = async (data) => {
    if (!data || !data.nisn) return; // Pastikan data dan nisn tersedia

    const link = localStorage.getItem("link");
    const lembarJawab = {
        snbt: "jwb_snbt",
        kuantitatif: "jwb_kuantitatif",
        matematika: "jwb_matematika",
        english: "jwb_english",
        bacaan: "jwb_bacaan",
        penalaran: "jwb_penalaran",
        pengetahuan: "jwb_pengetahuan",
    };

    if (link in lembarJawab) {
        const tableName = lembarJawab[link];

        try {
            // 1. Cek apakah siswa sudah mengerjakan berdasarkan NISN
            const { data: existingData, error: fetchError } = await supabase
                .from(tableName)
                .select("nisn")
                .eq("nisn", data.nisn)
                .single();

            if (fetchError && fetchError.code !== "PGRST116") {
                throw fetchError;
            }

            if (existingData) {
                // 2. Jika NISN sudah ada, lakukan update
                const { error: updateError } = await supabase
                    .from(tableName)
                    .update(data)
                    .eq("nisn", data.nisn);

                if (updateError) throw updateError;
                console.log("Jawaban diperbarui untuk NISN:", data.nisn);
            } else {
                // 3. Jika NISN belum ada, lakukan insert
                const { error: insertError } = await supabase
                    .from(tableName)
                    .insert([data]);

                if (insertError) throw insertError;
                console.log("Jawaban dikirim baru untuk NISN:", data.nisn);
            }
        } catch (error) {
            console.error("Error mengirim jawaban:", error);
        }
    } else {
        console.log("link undetect");
    }
};

    //   kirim jawaban ke supa end

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah submit form secara langsung
    const countUniqueGroups = () => {
    const uniqueGroups = new Set(); // Set untuk menyimpan soal unik
  
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key); // Ambil nilai dari key
        // Cek apakah key dimulai dengan "group" DAN memiliki value yang tidak kosong/null
        if (key.startsWith("group")&&value) {
          const groupId = key.split("_")[0]; // Ambil bagian "groupX" saja
          uniqueGroups.add(groupId);
        }
      }
  
      return uniqueGroups.size; // Jumlah soal unik
    };
  
    const hitung = countUniqueGroups();
    const blmdjwb=jumlahSoal-hitung;
    // console.log(hitung);
    Swal.fire({
      title: "Kirim Jawaban?",
      text: `Masih ada ${blmdjwb} soal belum kamu jawab, sisa waktu kurang dari : ${timeLeft ? timeLeft.format("mm:ss") : "Loading..."} menit`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Kirim!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika user mengonfirmasi, submit form
        submitForm(e);
      }
    });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
   const newRow = {
          nisn: form.nisn,
          ...Object.entries(selectedValues).reduce((acc, [name, savedValue]) => {
            if (name.startsWith("group") && name.includes("_")) {//soal benar-salah
              // Ambil ID unik (misalnya: "group3" dari "group3_1")
              const groupId = name.split("_")[0];
        
              // Gabungkan nilai berdasarkan groupId
              acc[groupId] = (acc[groupId] || "") + savedValue;
            } else {
              // Untuk data lain, simpan langsung
              acc[name] = savedValue;
              acc[name] = Array.isArray(savedValue) ? savedValue.join("") : savedValue;//soal cekbox
            }
        
            return acc;
          }, {}),
        };
      
      
      setIsLoading(true); // set status loading menjadi true
      
      kirimJawaban(newRow);
      clearLocalStorageExcept(["link","linkSudah","linkBelum","name","nisn","dataSoal"]);
        // renameAndAppendLocalStorageKey("link", "linkSudah");
      setIsLoading(false); // set status loading menjadi false setelah proses selesai
      setForm({ nisn: "", name: "" });
      setSelectedValues({});
      // localStorage.setItem("tipeSoal", tipeSoal); digunakan ketika lari ke outputsnbt.js

      // mengulur waktu saat ambil data dari sheet
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
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("Menuju soal berikutnya");
        }
      });
      router.push("/form/transisisoalsupa");
    }
  
  
  const handleChange = (e) => {
    setRefreshKey((prev) => prev + 1);
    const { name, value, type, checked } = e.target;
  
    setSelectedValues((prevValues) => {
      let updatedValues;
  
      if (type === "checkbox") {
        // Jika input checkbox, pastikan value menjadi array
        const existingValues = prevValues[name] || [];
        updatedValues = checked
          ? [...existingValues, value] // Tambahkan jika dicentang
          : existingValues.filter((v) => v !== value); // Hapus jika tidak dicentang
          localStorage.setItem(name, updatedValues); // Simpan ke local storage
      }else {
        // Jika bukan checkbox (radio atau input teks), langsung set nilainya
        updatedValues = value;
        localStorage.setItem(name,updatedValues);
      }
  
      // Simpan ke state
      const newValues = { ...prevValues, [name]: updatedValues };
      return newValues;
    });
  };
  
  useEffect(() => {
    // Saat komponen dimuat, cek apakah ada nilai currentPage yang disimpan di localStorage
    const savedCurrentPage = localStorage.getItem("currentPage");
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

  // const handlePrevious = () => {
  //   setCurrentPage(currentPage - 1);
  //   localStorage.setItem("currentPage", currentPage - 1);
  // };
  // const handleNext = () => {
  //   setCurrentPage(currentPage + 1);
  //   localStorage.setItem("currentPage", currentPage + 1);
  // };
// Fungsi untuk ke halaman sebelumnya
const handlePrevious = () => {
  setCurrentPage((prevPage) => {
    const newPage = Math.max(prevPage - 1, 1);
    localStorage.setItem("currentPage", newPage);
    return newPage;
  });
};

// Fungsi untuk ke halaman berikutnya
const handleNext = () => {
  setCurrentPage((prevPage) => {
    const newPage = Math.min(prevPage + 1, totalPages);
    localStorage.setItem("currentPage", newPage);
    return newPage;
  });
};
  // gunakan keyboard
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

  
  // page dalam handle checkbox mendeteksi perubahan page pada input dan mengirimnya ke local storage. page disini hanay sbg argumen yg menerima currentpage dari input checkbox yg dipilih
  const handleCheckbox = (page) => {
    // setSelectedPage(page);
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
  
  useEffect(() => {
    const countUniqueGroups = () => {
      const uniqueGroups = new Set(); // Set untuk menyimpan soal unik
  
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("group")) {
          const groupId = key.split("_")[0]; // Ambil bagian "groupX" saja
          uniqueGroups.add(groupId);
        }
      }
  
      return uniqueGroups.size; // Jumlah soal unik
    };
  
    const hitung = countUniqueGroups();
    setJumlahSoalSelesai(hitung);
  }, []);
// console.log(answers) 
useEffect(() => {
  if (typeof window !== "undefined") {
    // Pastikan hanya dijalankan di client-side
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = () => {
      const isLgScreen = mediaQuery.matches;
      const link=localStorage.getItem("link")||"";//menghindari null
      const isTargetLink = link === "kuantitatif" || link === "matematika" || link === "penalaran";
      // console.log(isTargetLink)
      setQuestionNav(isLgScreen && isTargetLink);
    };

    // Jalankan sekali saat komponen pertama kali di-mount
    handleResize();

    // Tambahkan event listener untuk perubahan media query
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup event listener saat unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }
},[]); // useEffect akan berjalan sekali saja

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
          href="../image/logolb3r.png"
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
                    (option) => item[`pilihan_${option.toLowerCase()}`]
                  );
                  const statements=["1","2","3","4","5"].filter((statement)=>item[`pernyataan_${statement}`])
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
                          link === "kuantitatif" || link === "matematika"|| link === "penalaran"
                            ? "lg:w-1/2 "
                            : "lg:w-1/2 overflow-auto max-h-[500px] rounded-t-lg flex mt-8 justify-center mb-4 p-1"
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
                          {item.bacaan_1}
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
                          {item.bacaan_7}
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
                          {item.bacaan_11}
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
                          link === "kuantitatif" || link === "matematika"|| link === "penalaran"
                            ? "lg:w-1/2 "
                            : "lg:w-1/2 rounded-t-lg flex  justify-center"
                        }`}
                      >
                        <div>
                        {/* Pertanyaan */}
                        <div className="flex items-center justify-center ">
                            <div>
                              <p className="bg-gray-300 text-gray-900 text-xs text-center font-semibold">Soal</p>
                              <p
                                className="text-justify mb-2 font-bold flex items-center p-1 bg-gray-900 text-gray-100"
                                id={currentPage}
                              >
                              {currentPage}/{totalPages}
                              </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 p-2">
                          <div>
                            <div>
                              <div className="flex items-center justify-center hover:w-full hover:absolute hover:z-50 hover:right-0 hover:left-0 ">
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
                        {/* Opsi Jawaban */}
                        <div className="pr-4 pl-4">
                        {/* Jika ada pilihan A-E, tampilkan Radio Button */}
                          {options.length > 0 ? (
                            <Radio.Group
                              disabled={isRadioButtonDisabled}
                              onChange={handleChange}
                              value={selectedValues[`group${item.id}`] || ""}
                              name={`group${item.id}`}
                            >
                              {options.map((option) => (
                                <div className="flex space-x-1" key={option}>
                                  <div
                                    className={`mb-2 p-2 rounded-2xl border ${
                                      selectedValues[`group${item.id}`] === option
                                        ? "bg-gradient-to-br from-green-400 to-green-100"
                                        : ""
                                    }`}
                                  >
                                    <Radio value={option} className="text-justify relative">
                                      <div className="flex items-center justify-center space-x-4 mb-2">
                                        <div
                                          className={` p-1 ml-2 rounded-full absolute -left-[0.60rem] w-[2rem] h-[2rem] ${
                                            selectedValues[`group${item.id}`] === option
                                              ? "border-2 bg-green-500"
                                              : "bg-gray-500"
                                          }`}
                                        >
                                          <p className="flex items-center justify-center font-bold text-gray-100">
                                            {option}
                                          </p>
                                        </div>
                                        <div className="text-left text-base">
                                          {item.inner_html==="yes"?
                                          <div dangerouslySetInnerHTML={{ __html: item[`pilihan_${option.toLowerCase()}`] }}/>
                                          :
                                          <Latex>{item[`pilihan_${option.toLowerCase()}`]}</Latex>
                                          }
                                        </div>
                                      </div>
                                    </Radio>
                                  </div>
                                </div>
                              ))}
                            </Radio.Group>
                          ) : item.typeOpsi === "benarsalah" ? ( 
                            // Jika tipe soal adalah B/S (Benar/Salah)
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
                                  {statements.map((statement, index) => (
                                    <tr key={index}>
                                      <td className="border p-2">{item[`pernyataan_${statement}`]}</td>
                                      <td className="border p-2 text-center">
                                        <input
                                          type="radio"
                                          name={`group${item.id}_${index}`}
                                          value={`${statement}B`}
                                          checked={selectedValues[`group${item.id}_${index}`] === `${statement}B`}
                                          onChange={(e) => handleChange(e)}
                                          disabled={isRadioButtonDisabled}
                                        />
                                      </td>
                                      <td className="border p-2 text-center">
                                        <input
                                          type="radio"
                                          name={`group${item.id}_${index}`}
                                          value={`${statement}S`}
                                          checked={selectedValues[`group${item.id}_${index}`] === `${statement}S`}
                                          onChange={(e) => handleChange(e)}
                                          disabled={isRadioButtonDisabled}
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : item.typeOpsi==="inputangka"?(
                            // Jika tidak ada opsi dan bukan B/S, tampilkan input teks
                            <input
                              type="number"
                              disabled={isRadioButtonDisabled}
                              placeholder="Masukkan hanya angka"
                              className="border rounded-lg p-2 w-full"
                              value={selectedValues[`group${item.id}`] || ""}
                              onChange={(e) =>
                                handleChange({ target: { name: `group${item.id}`, value: e.target.value } })
                              }
                            />
                          ):
                          //jika tidak ada opsi, bukan bs,bukan input text, tampilkan ceklis
                          (<><div className="flex flex-col space-y-2">
                            {statements.map((statement,index) => (
                              <div className="flex items-center space-x-2" key={index}>
                                <input
                                  type="checkbox"
                                  disabled={isRadioButtonDisabled}
                                  id={`checkbox-${item.id}-${index}`}
                                  name={`group${item.id}`}
                                  value={statement}
                                  checked={selectedValues[`group${item.id}`]?.includes(statement) || false}
                                  onChange={(e) => handleChange(e)}
                                />
                                <label htmlFor={`checkbox-${item.id}-${index}`} className="text-left text-base">
                                  <Latex>{item[`pernyataan_${statement}`]}</Latex>
                                </label>
                              </div>
                            ))}
                          </div></>)
                          }

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

export default ContactForm;


