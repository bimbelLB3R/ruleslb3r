import React, { useState } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import Layout from "./Layout";
import Navbar from "./Navbar";

// mengubah mata uang
function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_IDRULESLB3R;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const DaftarLayanan = ({ detailProgram, allPost }) => {
  const [showButton, setShowButton] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [isNamaEmpty, setIsNamaEmpty] = useState(false);
  const [isKelasEmpty, setIsKelasEmpty] = useState(false);
  const [isAsalSekolahEmpty, setIsAsalSekolahEmpty] = useState(false);
  const [isWaEmpty, setIsWaEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

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
      form.nama !== "" &&
      form.kelas !== "" &&
      form.asalsekolah !== "" &&
      form.wa !== "" &&
      form.email !== "" &&
      form.program !== "" &&
      form.biaya !== ""
    ) {
      setIsButtonDisabled(true);

      const canSubmit = await checkName(form.nama, sheet);

      if (canSubmit) {
        const newRow = {
          nama: form.nama,
          kelas: form.kelas,
          asalsekolah: form.asalsekolah,
          wa: form.wa,
          email: form.email,
          program: form.program,
          biaya: form.biaya,
        };
        // 1.mengirim permintaan ke api/create-transaction dan mengirim data newrow sekalian
        // 2.Request token ke end poin mid trans
        // 3.Handle submit ke sheet dan membuat tombol bayar

        const createTransaction = async (newRow) => {
          try {
            const response = await axios.post(
              "/api/create-transaction",
              newRow
            );
            const transactionToken = response.data.transactionToken;
            const transactionRedirectUrl = response.data.transactionRedirectUrl;
            // console.log('transactionToken:', transactionToken);
            // console.log('redirectUrl:', transactionRedirectUrl);

            return transactionToken, transactionRedirectUrl;
          } catch (error) {
            console.error("Failed to create transaction:", error);
            return null;
          }
        };
        const transactionToken = await createTransaction(newRow);
        const transactionRedirectUrl = await createTransaction(newRow);
        console.log(transactionToken); //token berhasil
        console.log(transactionRedirectUrl); //token berhasil

        // setIsLoading(true); // set status loading menjadi true, kirim ke drive
        await appendSpreadsheet(newRow);
        e.target.reset();
        setIsButtonDisabled(false);

        // Swal.fire({
        //   title: 'Pendaftaran Berhasil',
        //   text: 'Datamu Sudah Terkirim, Lanjut Pembayaran Ya',
        //   icon: 'success',
        //   confirmButtonText: 'ok',
        // });
        router.push(transactionRedirectUrl);
      } else {
        Swal.fire({
          title: `${form.nama} pernah terdaftar,hubungi admin.`,
          text: "Data gagal dikirim",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        setIsButtonDisabled(false);
      }
    } else {
      setIsNamaEmpty(form.nama === "");
      setIsKelasEmpty(form.nama === "");
      setIsAsalSekolahEmpty(form.nama === "");
      setIsWaEmpty(form.nama === "");
      setIsEmailEmpty(form.nama === "");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // memeriksa apakah semua form telah terisi
    if (
      form.nama !== "" &&
      form.kelas !== "" &&
      form.asalsekolah !== "" &&
      form.wa !== "" &&
      form.email !== ""
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
        <div className="flex justify-center items-center bg-slate-100 text-gray-900 mt-20">
          <form
            className="space-y-3 w-full max-w-lg mx-auto p-5"
            onSubmit={submitForm}
          >
            <p className="font-semibold text-2xl text-center w-full bg-slate-500 p-2 text-slate-100">
              Lengkapi Data
            </p>
            <div>
              <input
                name="nama"
                type="text"
                className={`w-full ${isNamaEmpty ? "border-red-500" : ""}`}
                placeholder="Nama Lengkap"
                autoComplete="off"
                onChange={handleChange}
                onBlur={() => {
                  if (form.nama === "") {
                    setIsNamaEmpty(true);
                  } else {
                    setIsNamaEmpty(false);
                  }
                }}
              />
              {isNamaEmpty && (
                <p className="text-red-500 text-xs">Wajib diisi</p>
              )}
            </div>
            <div>
              <input
                name="kelas"
                type="text"
                className={`w-full ${isKelasEmpty ? "border-red-500" : ""}`}
                placeholder="Kelas"
                autoComplete="off"
                onChange={handleChange}
                onBlur={() => {
                  if (form.kelas === "") {
                    setIsKelasEmpty(true);
                  } else {
                    setIsKelasEmpty(false);
                  }
                }}
              />
              {isKelasEmpty && (
                <p className="text-red-500 text-xs">Wajib diisi</p>
              )}
            </div>
            <div>
              <input
                name="asalsekolah"
                type="text"
                className={`w-full ${
                  isAsalSekolahEmpty ? "border-red-500" : ""
                }`}
                placeholder="Asal Sekolah"
                autoComplete="off"
                onChange={handleChange}
                onBlur={() => {
                  if (form.asalsekolah === "") {
                    setIsAsalSekolahEmpty(true);
                  } else {
                    setIsAsalSekolahEmpty(false);
                  }
                }}
              />
              {isAsalSekolahEmpty && (
                <p className="text-red-500 text-xs">Wajib diisi</p>
              )}
            </div>
            <div>
              <input
                name="wa"
                type="number"
                className={`w-full ${isWaEmpty ? "border-red-500" : ""}`}
                placeholder="wa"
                autoComplete="off"
                onChange={handleChange}
                onBlur={() => {
                  if (form.wa === "") {
                    setIsWaEmpty(true);
                  } else {
                    setIsWaEmpty(false);
                  }
                }}
              />
              {isWaEmpty && (
                <p className="text-red-500 text-xs">Wajib diisi angka</p>
              )}
            </div>
            <div>
              <input
                name="email"
                type="email"
                className={`w-full ${isEmailEmpty ? "border-red-500" : ""}`}
                placeholder="email"
                autoComplete="off"
                onChange={handleChange}
                onBlur={() => {
                  if (form.email === "") {
                    setIsEmailEmpty(true);
                  } else {
                    setIsEmailEmpty(false);
                  }
                }}
              />
              {isEmailEmpty && (
                <p className="text-red-500 text-xs">Wajib diisi</p>
              )}
            </div>
            <p className="w-full bg-slate-500 p-2 text-slate-100">
              CENTANG PILIHAN PROGRAM DAN BIAYA
            </p>
            <div className="flex items-center space-x-2">
              <input
                name="program"
                type="checkbox"
                className=""
                placeholder="program"
                onChange={handleChange}
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
                // readOnly
                value={inputValueProgramPrice}
              />
              <p>
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
