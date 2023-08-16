import React, { useState } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID2;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const Newmember = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    nama: "",
    nisn: "",
    asalsekolah: "",
    wa: "",
    prodi1: "",
    kampus1: "",
    prodi2: "",
    kampus2: "",
  });

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

      const sheet = doc.sheetsById[SHEET_ID];
      await sheet.addRow(row);
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
    const sheet = doc.sheetsById[SHEET_ID]; // tambahkan baris ini untuk mendefinisikan sheet
    const rows = await sheet.getRows();

    // console.log(rows);
    const nisnExists = rows.find((row) => row.nisn === nisn); //penulisan row.name , name nya harus sama dengan di google sheet name
    if (!nisnExists) {
      // Name does not exist, form can be submitted
      return true;
    } else {
      // Name already exists, form cannot be submitted
      return false;
    }
  };
  // cek apakah nama sudah ada end

  const submitForm = async (e, sheet) => {
    setIsButtonDisabled(true);
    e.preventDefault();

    if (
      form.nama !== "" &&
      form.nisn !== "" &&
      form.asalsekolah !== "" &&
      form.wa !== "" &&
      form.prodi1 !== "" &&
      form.kampus1 !== "" &&
      form.prodi2 !== "" &&
      form.kampus2 !== ""
    ) {
      const canSubmit = await checkNisn(form.nisn, sheet);

      if (canSubmit) {
        const newRow = {
          nama: form.nama,
          nisn: form.nisn,
          asalsekolah: form.asalsekolah,
          wa: form.wa,
          prodi1: form.prodi1,
          kampus1: form.kampus1,
          prodi2: form.prodi2,
          kampus2: form.kampus2,
        };
        // setIsLoading(true); // set status loading menjadi true
        await appendSpreadsheet(newRow);
        // setIsLoading(false); // set status loading menjadi false setelah proses selesai
        e.target.reset();

        Swal.fire({
          title: "Kamu Berhasil Terdaftar",
          text: "Terima kasih telah bergabung program SNBT LB3R",
          icon: "success",
          confirmButtonText: "Ok",
        });
        router.push("/form/login");
      } else {
        Swal.fire({
          title: `${form.nisn} sudah terdaftar`,
          text: "Data gagal dikirim karena NISN kamu sudah terdaftar",
          icon: "warning",
          confirmButtonText: "Login",
        });
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
        <title>Daftar TO SNBT</title>
        <meta name="description" content="Seleksi Masuk PTN Jalur Tes" />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>

      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
          <Link
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-18 h-12 mr-2"
              src="/image/logolb3r.png"
              alt="logo"
            />
            SNBT Program
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Buat Akun Baru
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={submitForm}
              >
                <div>
                  <label
                    htmlFor="nama"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Kamu*
                  </label>
                  <input
                    type="text"
                    name="nama"
                    id="nama"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nama Lengkap"
                    required=""
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    htmlFor="nisn"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    NISN*
                  </label>
                  <input
                    type="text"
                    name="nisn"
                    id="nisn"
                    placeholder="NISN Kamu"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    required=""
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <p className="text-[10px] text-red-600">
                    Jika NISN kamu dimulai angka 0, misal 012345, maka tambahkan
                    angka 1 didepannya menjadi 1012345
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="asalsekolah"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Asal Sekolah*
                  </label>
                  <input
                    type="text"
                    name="asalsekolah"
                    id="asalsekolah"
                    placeholder="contoh SMA N 1 Tanjung"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    htmlFor="wa"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nomor WA Aktif*
                  </label>
                  <input
                    type="number"
                    name="wa"
                    id="wa"
                    placeholder="format 6281345346374"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                {/* Penjurusan */}
                <div>
                  <label
                    htmlFor="prodi1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pilihan Jurusan 1*
                  </label>
                  <input
                    type="text"
                    name="prodi1"
                    id="prodi1"
                    placeholder="Tulis Jurusan Pilihan Pertama"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    htmlFor="kampus1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kampus Pilihan Jurusan 1*
                  </label>
                  <input
                    type="text"
                    name="kampus1"
                    id="kampus1"
                    placeholder="Tulis Kampus Pilihan Pertama"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    htmlFor="prodi2"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pilihan Jurusan 2*
                  </label>
                  <input
                    type="text"
                    name="prodi2"
                    id="prodi2"
                    placeholder="Tulis Jurusan Pilihan Kedua"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label
                    htmlFor="kampus2"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kampus Pilihan Jurusan 2*
                  </label>
                  <input
                    type="text"
                    name="kampus2"
                    id="kampus2"
                    placeholder="Tulis Kampus Pilihan Kedua"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                {/* Penjurusan end */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <Link
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        href="/user/term"
                      >
                        Terms and Conditions (* wajib diisi)
                      </Link>
                    </label>
                  </div>
                </div>

                {isButtonDisabled ? (
                  <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
                ) : (
                  <button
                    disabled={isButtonDisabled}
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Create an account
                  </button>
                )}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/form/login"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newmember;
