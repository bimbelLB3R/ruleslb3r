import React, { useEffect, useState} from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useRouter } from "next/router";
// import session from 'express-session';
import { signIn, signOut, useSession } from "next-auth/react";
import cookie from "js-cookie";
import Dropdown from "./DropdownTipeSoal";
import Head from "next/head";
import "animate.css";
import Image from "next/image";
// from timer
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import CountdownTimer from "./CountDownTimer";

dayjs.extend(duration);
// from timer end

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID2 = process.env.NEXT_PUBLIC_SHEET_ID2;
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID3;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const Loginmember = () => {
  const [erorKoneksi,setErorKoneksi]=useState(false);
  const { data: session } = useSession();
  // console.log(session);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    nisn: "",
    nama: "",
  });
  // console.log(form.nisn);
  // cek apakah sudah ada nisn dan nama di local storage
  useEffect(() => {
    const link = localStorage.getItem("link");
        const storedMaxTime = localStorage.getItem("maxTime");
        const maxTimeInSeconds = parseInt(storedMaxTime);
        const currentTime = dayjs();
        const startTime = localStorage.getItem("startTime")
          ? dayjs(localStorage.getItem("startTime"))
          : currentTime; // Use current time if startTime is not set
        const elapsedTime = currentTime.diff(startTime, "second");
        const remainingTime = Math.max(0, maxTimeInSeconds - elapsedTime);
        // console.log(remainingTime);
        if(remainingTime>0){
          router.push({
            pathname: `/form/snbt`,
            query: { link },
          });
        }else{
          console.log('Silahkan mulai soal');
        }
  }, []);


  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        // private_key: GOOGLE_SERVICE_PRIVATE_KEY,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet3 = doc.sheetsById[SHEET_ID3];
      await sheet3.addRow(row);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  // cek apakah NISN sudah ada+penanganan eror koneksi buruk
  const checkNisn = async (nisn) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
  
      await doc.loadInfo(); // Pastikan sheet telah terdefinisi
      const sheet2 = doc.sheetsById[SHEET_ID2];
      const rows = await sheet2.getRows();
  
      if (!rows || rows.length === 0) {
        throw new Error("Data tidak dapat diambil. Periksa koneksi internet Anda.");
        setErorKoneksi(true);
      }
  
      const nisnExists = rows.find((row) => row.nisn === `1${nisn}`);
  
      return !!nisnExists; // Return true jika ditemukan, false jika tidak
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
      return null; // Return null jika terjadi kesalahan (misalnya koneksi buruk)
    }
  };
  
  // cek apakah nama sudah ada end

  // penanganan submit dan handle eror ketika koneksi buruk atau blm terdaftar
  const submitForm = async (e, sheet3) => {
    setIsButtonDisabled(true);
    e.preventDefault();
  
    try {
      if (form.nisn !== "" && form.nama !== "") {
        const canSubmit = await checkNisn(form.nisn, sheet3);
  
        if (canSubmit === null) {
          // Jika checkNisn gagal karena error (misalnya jaringan), tampilkan pesan error
          Swal.fire({
            title: "Koneksi Bermasalah",
            text: "Gagal memeriksa NISN. Pastikan koneksi internet stabil dan coba lagi.",
            icon: "error",
            confirmButtonText: "Coba Lagi",
          });
          return; // Jangan lanjutkan eksekusi
        }
  
        if (canSubmit) {
          const newRow = {
            nisn: `1${form.nisn}`,
            nama: form.nama,
          };
  
          const link = localStorage.getItem("link");
  
          localStorage.setItem("name", form.nama);
          localStorage.setItem("nisn", `1${form.nisn}`);
          localStorage.setItem("dataSoal", JSON.stringify(["snbt", "matematika", "english", "kuantitatif", "bacaan", "penalaran", "pengetahuan"]));
  
          // Atur waktu sesuai jenis soal
          const maxTimeMapping = {
            snbt: 2700, // 45 menit
            kuantitatif: 1200, // 20 menit
            matematika: 2250, // 37,5 menit
            english: 1800, // 30 menit
            bacaan: 1500, // 25 menit
            penalaran: 7200, // 30 menit
            pengetahuan: 900, // 15 menit
          };
  
          if (link in maxTimeMapping) {
            localStorage.setItem("maxTime", maxTimeMapping[link]);
          } else {
            console.log("link undetect");
          }
  
          router.push({
            pathname: `/form/snbt`,
            query: { link },
          });
        } else {
          Swal.fire({
            title: `${form.nisn} belum terdaftar`,
            text: "Data gagal dikirim karena NISN kamu belum terdaftar",
            icon: "warning",
            confirmButtonText: "Daftar",
          });
          router.push("/form/newmember");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      Swal.fire({
        title: "Terjadi Kesalahan",
        text: "Ada masalah dalam proses pendaftaran. Silakan coba lagi.",
        icon: "error",
        confirmButtonText: "Oke",
      });
    } finally {
      // Pastikan tombol tidak tetap dinonaktifkan jika terjadi error
      setIsButtonDisabled(false);
    }
  };
  
  // penanganan submit dan handle eror ketika koneksi buruk atau blm terdaftar end

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleReset=()=>{
    localStorage.clear();
    window.location.reload(); // Refresh halaman jika perlu
  }
  
  return (
    <>
      <Head>
        <title>Try Out dan Simulai UTBK SNBT</title>
        <meta name="description" content="Halaman Login Simulasi dan Try Out UTBK SNBT Program SNBT Eksklusif Bimbel LB3R" />
        <meta
      property="og:image"
      itemProp="image"
      content="https://raw.githubusercontent.com/bimbelLB3R/bimbellb3r.github.io/main/img/slider/og.jpg"
    />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="../image/logolb3r.png"
        />
      </Head>

      <div className="bg-gray-50 dark:bg-gray-900 h-screen ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0 animate__animated  animate__slideInDown ">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white "
          >
            <img
              className="w-18 h-12 mr-2"
              src="/image/logolb3r.png"
              alt="logo"
            />
            SNBT Program
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {session ? (
                <div className="flex items-center justify-center ">
                  <div className="border-2 border-white rounded-full relative shadow-md">
                    <Image
                      src={session.user.image}
                      width={72}
                      height={72}
                      alt="userFoto"
                      priority={true}
                      className="rounded-full shadow-2xl"
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Simulasi UTBK SNBT
              </h1>
              <p>{erorKoneksi&&"Koneksi internet kamu kurang bagus..!!"}</p>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={submitForm}
              >
                <div>
                  <label
                    htmlFor="nisn"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    NISN
                  </label>
                  <input
                    type="number"
                    name="nisn"
                    id="nisn"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="NISN Kamu"
                    required
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={isButtonDisabled}
                  />
                </div>
                <div>
                  <label
                    htmlFor="nama"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Panggilanmu
                  </label>
                  <input
                    type="nama"
                    name="nama"
                    id="nama"
                    placeholder="Nama panggilan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={isButtonDisabled}
                  />
                </div>
                <div>
                  <Dropdown disabled={isButtonDisabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/6281392552459"
                    target="_blank"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot NISN & Name?
                  </a>
                </div>
                {isButtonDisabled ? (
                  <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
                ) : (
                  <button
                    disabled={isButtonDisabled}
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Masuk
                  </button>
                )}
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/form/newmember"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sign up
                  </a> or {" "}
                  <button className="underline" onClick={handleReset}>Reset</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginmember;

