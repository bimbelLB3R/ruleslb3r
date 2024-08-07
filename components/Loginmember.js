import React, { useEffect, useState } from "react";
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

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID2 = process.env.NEXT_PUBLIC_SHEET_ID2;
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID3;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const Loginmember = () => {
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
    const storedNisn = localStorage.getItem("nisn");
    localStorage.clear();
    // if (storedNisn) {
    //   // router.push('/form/snbt');
    //   localStorage.clear();
    // }
    // if (!session) {
    //   setForm((prevState) => ({
    //     ...prevState,
    //     nisn: "0987",
    //   }));
    // }
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

  // cek apakah NISN sudah ada
  const checkNisn = async (nisn) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo(); // tambahkan baris ini untuk memastikan sheet telah terdefinisi
    const sheet2 = doc.sheetsById[SHEET_ID2]; // tambahkan baris ini untuk mendefinisikan sheet
    const rows = await sheet2.getRows();

    // console.log(rows);
    const nisnExists = rows.find((row) => row.nisn === `1${nisn}`); //penulisan row.name , name nya harus sama dengan di google sheet name

    // console.log(nisnExists);
    if (!nisnExists) {
      // nisn n name does not exist, form cannt be submitted

      return false;
    } else {
      // nisn already exists, form can be submitted
      return true;
    }
  };
  // cek apakah nama sudah ada end

  const submitForm = async (e, sheet3) => {
    setIsButtonDisabled(true);
    e.preventDefault();

    if (form.nisn !== "" && form.nama !== "") {
      const canSubmit = await checkNisn(form.nisn, sheet3);

      if (canSubmit) {
        const newRow = {
          nisn: `1${form.nisn}`,
          nama: form.nama,
        };

        const link = localStorage.getItem("link");
        // await appendSpreadsheet(newRow);
        localStorage.setItem("name", form.nama);
        localStorage.setItem("nisn", `1${form.nisn}`);
        if (link === "snbt") {
          localStorage.setItem("maxTime", 2700); //30 soal 45 menit
        } else if (link === "kuantitatif") {
          localStorage.setItem("maxTime", 1200); //15 soal 20 menit
        } else if (link === "matematika") {
          localStorage.setItem("maxTime", 1800); //20 soal 30 menit
        } else if (link === "english") {
          localStorage.setItem("maxTime", 1800); //20 soal 30 menit
        } else if (link === "bacaan") {
          localStorage.setItem("maxTime", 1500); //20 soal 25 menit
        } else if (link === "penalaran") {
          localStorage.setItem("maxTime", 1800); //30 soal 30 menit
        } else if (link === "pengetahuan") {
          localStorage.setItem("maxTime", 900); //20 soal 20 menit, rev 20 soal 15 menit
        } else {
          console.log("link undetect");
        }
        // localStorage.setItem('timeLeft', 1800);
        // localStorage.setItem('remainingTime', 15);
        // cookie.set('timer', '10');
        // localStorage.setItem('waktuhabis', false);

        // e.target.reset();

        // router.push(`/form/snbt`);
        router.push({
          pathname: `/form/snbt`,
          query: { link },
        });

        Swal.fire({
          title: "Kamu Berhasil Masuk",
          text: "Tunggu sebentar soal sedang disiapkan....",
          icon: "success",
          confirmButtonText: "Oke",
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
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Head>
        <title>Login SNBT</title>
        <meta name="description" content="Seleksi Masuk PTN Jalur Tes" />
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
                    required=""
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
                    required=""
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
                    Sign in
                  </button>
                )}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/form/newmember"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginmember;
