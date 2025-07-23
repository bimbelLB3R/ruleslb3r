import React, { useEffect, useState } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useRouter } from "next/router";
// import session from 'express-session';
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import "animate.css";
import Image from "next/image";
import DropdownTipeTes from "./DropdownTipeTes";

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_IDRULESLB3R;
const SHEET_ID2 = process.env.NEXT_PUBLIC_SHEET_ID_DIAGNOSTIK;
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID_DIAGNOSTIKHASIL;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const Logindiagnostik = () => {
  const { data: session } = useSession();
  // console.log(session);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    wa: "",
    nama: "",
  });
  // console.log(form.wa);
  // cek apakah sudah ada wa dan nama di local storage
  useEffect(() => {
    const storedNisn = localStorage.getItem("wa");
    localStorage.clear();
    // if (storedNisn) {
    //   localStorage.clear();
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
  const checkNisn = async (wa) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo(); // tambahkan baris ini untuk memastikan sheet telah terdefinisi
    const sheet2 = doc.sheetsById[SHEET_ID2]; // tambahkan baris ini untuk mendefinisikan sheet
    const rows = await sheet2.getRows();

    // console.log(rows);
    const waExists = rows.find((row) => row.wa === wa); //penulisan row.name , name nya harus sama dengan di google sheet name

    // console.log(waExists);
    if (!waExists) {
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

    if (form.wa !== "" && form.nama !== "") {
      const canSubmit = await checkNisn(form.wa, sheet3);

      if (canSubmit) {
        localStorage.setItem("jenisUjian","diagnostik");
        const newRow = {
          wa: form.wa,
          nama: form.nama,
        };

        const link = localStorage.getItem("link");
        // await appendSpreadsheet(newRow);
        localStorage.setItem("name", form.nama);
        localStorage.setItem("wa",form.wa);
        if (link === "diagnostik") {
          localStorage.setItem("maxTime", 2700); //30 soal 45 menit
        } else {
          console.log("link undetect");
        }
        router.push({
          pathname: `/layanan/diagnostik/diagnostiktes`,
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
          title: `${form.wa} belum terdaftar`,
          text: "Gagal masuk",
          icon: "warning",
          confirmButtonText: "Daftar",
        });
        router.push("/layanan/diagnostik/daftar");
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
        <title>Login Diagnostik</title>
        <meta name="description" content="Masuk Tes Diagnostik" />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>

      <div className="bg-gray-50 dark:bg-gray-900 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0 animate__animated  animate__slideInDown ">
          {/* <a
            href="/"
            className="flex items-center mb-6 md:mt-20 text-2xl font-semibold text-gray-900 dark:text-white "
          >
            <img
              className="w-24 mr-2"
              src="/image/iconlb3r.png"
              alt="logo"
            />
            
          </a> */}
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
                <a
            href="/"
            className="flex items-center justify-center mb-6 "
          >
            <img
              className="w-24 mr-2"
              src="/image/iconlb3r.png"
              alt="logo"
            />
            
          </a>
              )}
              
              
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={submitForm}
              >
                <div>
                  <label
                    htmlFor="wa"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    WA Ortu Kamu
                  </label>
                  <input
                    type="number"
                    name="wa"
                    id="wa"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="WA yang dipakai saat daftar"
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
                    Nama Kamu
                  </label>
                  <input
                    type="nama"
                    name="nama"
                    id="nama"
                    placeholder="Nama Lengkap"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={isButtonDisabled}
                  />
                </div>
                <div>
                  <DropdownTipeTes disabled={isButtonDisabled} />
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
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Belum punya akun?{" "}
                  <a
                    href="./daftar"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Daftar Dulu!
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

export default Logindiagnostik;
