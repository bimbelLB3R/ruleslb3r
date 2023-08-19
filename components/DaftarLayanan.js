import React, { useEffect, useState } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import Layout from "./Layout";
import Navbar from "./Navbar";
import { signIn, signOut, useSession } from "next-auth/react";
// import sendMail from "./SendMail";

// mengubah mata uang
function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}
// fungsi membatasi karakter

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_IDRULESLB3R;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const DaftarLayanan = ({ detailProgram, allPost }) => {
  const { data: session } = useSession();
  const isInputReadOnly =
    typeof session === "undefined" || session ? true : false;

  const [isDisable, setIsDisable] = useState(
    typeof session === "undefined" || session ? false : true
  );
  // console.log(isDisable);
  const [showButton, setShowButton] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // const [isNamaEmpty, setIsNamaEmpty] = useState(false);
  const [isKelasEmpty, setIsKelasEmpty] = useState(false);
  const [isAsalSekolahEmpty, setIsAsalSekolahEmpty] = useState(false);
  const [isWaEmpty, setIsWaEmpty] = useState(false);
  // const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const namaProgram = detailProgram.nama;
  const biayaProgram = detailProgram.total;

  const [inputValueProgramName, setInputValueProgramName] =
    useState(namaProgram);
  const [inputValueProgramPrice, setInputValueProgramPrice] =
    useState(biayaProgram);

  // const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    kelas: "",
    asalsekolah: "",
    wa: "",
    email: "",
    program: "",
    biaya: "",
  });

  // console.log(nama);
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  // console.log(SPREADSHEET_ID);
  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        // private_key: GOOGLE_SERVICE_PRIVATE_KEY,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      await sheet.addRow(row);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  // cek apakah nama sudah ada
  const checkName = async (nama) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo(); // tambahkan baris ini untuk memastikan sheet telah terdefinisi
    const sheet = doc.sheetsById[SHEET_ID]; // tambahkan baris ini untuk mendefinisikan sheet
    const rows = await sheet.getRows();

    // console.log(rows);
    const nameExists = rows.find((row) => row.nama === nama); //penulisan row.name , name nya harus sama dengan di google sheet name
    // const kelas = nameExists ? nameExists.kelas : null;
    // console.log(kelas);
    if (!nameExists) {
      // Name does not exist, form can be submitted
      return true;
    } else {
      // Name already exists, form cannot be submitted
      return false;
    }
  };
  // cek apakah nama sudah ada end

  const submitForm = async (e, sheet) => {
    e.preventDefault();

    if (
      // form.email !== "" &&
      // form.nama !== "" &&
      form.kelas !== "" &&
      form.kelas.length < 3 &&
      form.asalsekolah !== "" &&
      form.asalsekolah.length < 31 &&
      form.wa !== "" &&
      form.wa.length < 14 &&
      form.program !== "" &&
      form.biaya !== ""
    ) {
      setIsButtonDisabled(true);

      // const canSubmit = await checkName(form.nama, sheet);
      const canSubmit = await checkName(session.user.name, sheet);

      if (canSubmit) {
        const newRow = {
          nama: session.user.name,
          kelas: form.kelas,
          asalsekolah: form.asalsekolah,
          wa: form.wa,
          email: session.user.email,
          program: form.program,
          biaya: form.biaya,
        };
        // 1.mengirim permintaan ke api/create-transaction dan mengirim data newrow sekalian
        // 2.Request token ke end poin mid trans
        // 3.Handle submit ke sheet dan membuat tombol bayar

        const createTransaction = async (newRow) => {
          // console.log(isDisable);
          try {
            const response = await axios.post(
              "/api/create-transaction",
              newRow
            );
            // console.log(response);
            const transactionToken = response.data.transactionToken;
            const transactionRedirectUrl = response.data.transactionRedirectUrl;
            // console.log('transactionToken:', transactionToken);
            // console.log('redirectUrl:', transactionRedirectUrl);

            return transactionToken, transactionRedirectUrl;
          } catch (error) {
            console.error("Failed to create transaction:", error);
            return { error: true, message: "Pesan kesalahan di sini" };
          }
        };
        const transactionToken = await createTransaction(newRow);
        const transactionRedirectUrl = await createTransaction(newRow);
        // console.log(transactionToken); //token berhasil
        // console.log(transactionRedirectUrl); //token berhasil

        // setIsLoading(true); // set status loading menjadi true, kirim ke drive

        // sendMail(newRow.email, transactionRedirectUrl);

        const newRowWithRedirect = {
          nama: session.user.name,
          kelas: form.kelas,
          asalsekolah: form.asalsekolah,
          wa: form.wa,
          email: session.user.email,
          program: form.program,
          biaya: form.biaya,
          redirectUrl: transactionRedirectUrl,
        };
        const sendContactForm = async (newRowWithRedirect) => {
          try {
            const res = await fetch("/api/mailApi", {
              method: "POST",
              body: JSON.stringify(newRowWithRedirect),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            });

            if (!res.ok) {
              throw new Error("Failed to send message");
            }

            return res.json();
          } catch (error) {
            console.error("Failed to send message:", error);
            return { error: true, message: "Pesan kesalahan di sini" };
          }
        };

        await sendContactForm(newRowWithRedirect);
        await appendSpreadsheet(newRowWithRedirect);
        e.target.reset();
        setIsButtonDisabled(false);

        // Swal.fire({
        //   title: 'Pendaftaran Berhasil',
        //   text: 'Datamu Sudah Terkirim, Lanjut Pembayaran Ya',
        //   icon: 'success',
        //   confirmButtonText: 'ok',
        // });
        Swal.fire({
          title: `SELAMAT!${session.user.name} berhasil terdaftar di Bimbel LB3R .`,
          text: "Cek email Kamu untuk melanjutkan pembayaran",
          icon: "success",
          confirmButtonText: "Ok",
        });

        router.push("/user/term");
        // console.log(transactionRedirectUrl);
      } else {
        Swal.fire({
          title: `${session.user.name} pernah terdaftar,gunakan email lain.`,
          text: "Data gagal dikirim",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        setIsButtonDisabled(false);
      }
    }
    // } else {
    //   // ketika masih ada form salah
    //   // setIsNamaEmpty(form.nama === "");
    //   setIsKelasEmpty(form.nama === "");
    //   setIsAsalSekolahEmpty(form.nama === "");
    //   setIsWaEmpty(form.nama === "");
    //   // setIsEmailEmpty(form.nama === "");
    // }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // memeriksa apakah semua form telah terisi
    if (
      // form.nama &&
      session &&
      form.kelas !== "" &&
      form.asalsekolah !== "" &&
      form.wa !== ""
      // form.email
    ) {
      setShowButton(true); // menampilkan tombol
    }
  };

  return (
    <>
      <Navbar allPost={allPost} />
      <Head>
        <title>Lengkapi Data</title>
        <meta name="description" content="Formulir Pendaftaran" key="desc" />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>
      <Layout>
        <div className="flex justify-center items-center bg-slate-100 text-gray-900 mt-[100px]">
          <form
            className="space-y-3 w-full max-w-lg mx-auto p-5"
            onSubmit={submitForm}
          >
            <p className="font-semibold text-2xl text-center w-full bg-slate-500 p-2 text-slate-100 rounded-lg">
              Lengkapi Data
            </p>
            <div className="relative">
              <div className="absolute translate-y-1/2 right-0">
                {typeof session === "undefined" || session ? (
                  <button onClick={() => signOut()}>
                    <p className="underline text-xs">Ganti email ?</p>
                  </button>
                ) : (
                  ""
                )}
              </div>
              <input
                name="email"
                type="email"
                id="floating_outlined7"
                className="mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                placeholder=" "
                autoComplete="off"
                // onChange={handleChange}
                onFocus={!session ? signIn : ""}
                value={session ? session.user.email : ""}
                readOnly
                // disabled={isDisable}
                // onBlur={() => {
                //   if (!session.user.email) {
                //     setIsEmailEmpty(true);
                //   } else {
                //     setIsEmailEmpty(false);
                //   }
                // }}
              />
              <label
                htmlFor="floating_outlined7"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                klik disini untuk Verifikasi Email dulu ya
              </label>
              {/* {isEmailEmpty && (
                <p className="text-red-500 text-xs">Wajib diisi</p>
              )} */}
            </div>
            <div className="relative">
              <input
                name="nama"
                type="text"
                id="floating_outlined3"
                className="mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                autoComplete="off"
                // onChange={handleChange}
                value={session ? session.user.name : ""}
                disabled={isDisable}
                readOnly
                // onBlur={() => {
                //   if (!session.name || form.nama.length > 30) {
                //     setIsNamaEmpty(true);
                //   } else {
                //     setIsNamaEmpty(false);
                //   }
                // }}
              />
              <label
                htmlFor="floating_outlined3"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Nama Lengkap
              </label>
              {/* {isNamaEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 30 karakter)
                </p>
              )} */}
            </div>
            <div className="relative">
              <input
                name="kelas"
                type="number"
                id="floating_outlined4"
                className={`mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isKelasEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                onBlur={() => {
                  if (form.kelas === "" || form.kelas.length > 2) {
                    setIsKelasEmpty(true);
                  } else {
                    setIsKelasEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined4"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Kelas
              </label>
              {isKelasEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi angka (maks 2 digit)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="asalsekolah"
                type="text"
                id="floating_outlined5"
                className={`mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isAsalSekolahEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                onBlur={() => {
                  if (form.asalsekolah === "" || form.asalsekolah.length > 30) {
                    setIsAsalSekolahEmpty(true);
                  } else {
                    setIsAsalSekolahEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined5"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Asal Sekolah
              </label>
              {isAsalSekolahEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 30 karakter)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="wa"
                type="number"
                id="floating_outlined6"
                className={`mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isWaEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                onBlur={() => {
                  if (form.wa === "" || form.wa.length > 13) {
                    setIsWaEmpty(true);
                  } else {
                    setIsWaEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined6"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Nomor WA Aktif
              </label>
              {isWaEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi angka (maks 13 digit)
                </p>
              )}
            </div>

            <p className="w-full bg-slate-500 p-2 text-slate-100">
              PROGRAM YANG KAMU PILIH
            </p>
            <div className="flex items-center space-x-2">
              <input
                name="program"
                type="checkbox"
                className=""
                placeholder="program"
                onChange={handleChange}
                disabled={isDisable}
                // readOnly
                value={inputValueProgramName}
              />
              <p>{inputValueProgramName}</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                name="biaya"
                type="checkbox"
                className=""
                placeholder="biaya"
                onChange={handleChange}
                disabled={isDisable}
                // readOnly
                value={inputValueProgramPrice}
              />
              <p className="flex items-center">
                {formatCurrency(inputValueProgramPrice)} {detailProgram.rincian}
              </p>
            </div>

            {/* <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            type="submit">
            {isLoading ? (
              <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
            ) : (
              'Daftar dan Bayar' // tampilkan teks 'Submit' jika proses append selesai
            )}
          </button> */}
            {isButtonDisabled ? (
              <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
            ) : (
              showButton && (
                <button
                  disabled={isButtonDisabled}
                  id="tombolKirim"
                  type="submit"
                  className=" w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <p className="text-lg">Lanjutkan</p>
                </button>
              )
            )}
          </form>
        </div>
      </Layout>
    </>
  );
};

export default DaftarLayanan;
