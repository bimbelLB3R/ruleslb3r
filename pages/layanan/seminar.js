import React, { useState } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/Layout";
import Image from "next/image";

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_IDRULESLB3R;
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID_SEMINAR;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const Seminar = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [iswaEmpty, setIswaEmpty] = useState(false);
  const [isanakEmpty, setIsanakEmpty] = useState(false);
  const [iskelasEmpty, setIskelasEmpty] = useState(false);
  const [ismasalahEmpty, setIsmasalahEmpty] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    wa: "",
    anak: "",
    kelas: "",
    masalah: ""
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
      await doc.loadInfo();
      const sheet = doc.sheetsById[SHEET_ID3];
      await sheet.addRow(row);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const checkToken = async (anak,e) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsById[SHEET_ID3];
    const rows = await sheet.getRows();
    const tokenExists = rows.find((row) => row.anak === anak);

    if (tokenExists) {
      e.target.reset();
      Swal.fire({
        title: ` ${form.anak} sudah terdaftar`,
        text: "Data gagal dikirim",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (form.wa && form.anak && form.kelas && form.masalah) {
      setIsButtonDisabled(true);
      const canSubmit = await checkToken(form.anak,e);

      if (canSubmit) {
        const newRow = { ...form };
        await appendSpreadsheet(newRow);
        e.target.reset();
        setIsButtonDisabled(false);
        router.push(`/`);
      } else {
        setIsButtonDisabled(false);
      }
    } else {
      setIswaEmpty(!form.wa);
      setIsanakEmpty(!form.anak);
      setIskelasEmpty(!form.kelas);
      setIsmasalahEmpty(!form.masalah);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <Head>
        <title>Form Pendaftaran Seminar</title>
        <meta name="description" content="Formulir Pendaftaran Seminar" key="desc" />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>
      <Layout>
        <div className="flex justify-center items-center bg-slate-100 text-gray-900">
          <form className="space-y-6 w-full max-w-lg mx-auto p-8 m-2" onSubmit={submitForm}>
            <div className="flex flex-row justify-center items-center space-x-2 border-b p-2">
              <div>
                <Image src="/image/logolb3r.png" alt="logo lb3r" width={75} height={30} />
              </div>
              <div>
                <Image src="/image/logosmanta.png" alt="logo lb3r" width={50} height={50} />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <p className="font-medium">PRESENT</p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-center text-sm">
                Seminar Daring : "Membuka Blok Komunikasi Antara Orang Tua dan Anak Guna Mempersiapkan Mental di Jenjang Pendidikan Tinggi (Kampus)"
              </p>
            </div>
            <p className="font-semibold text-2xl text-center w-full bg-gradient-to-b from-orange-500 to-orange-400 p-2 text-slate-100">
              FORMULIR PENDAFTARAN
            </p>
            <div>
              <div className="relative">
                <input
                  name="wa"
                  type="text"
                  className={`mb-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${iswaEmpty ? "border-red-500" : ""}`}
                  onChange={handleChange}
                  placeholder=" "
                  onBlur={() => setIswaEmpty(!form.wa)}
                />
                <label
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Nomor WA Orang tua Siswa
                </label>
              </div>
              {iswaEmpty && <p className="text-red-500 text-xs mb-2">Wajib diisi</p>}
              
              <div className="relative">
                <input
                  name="anak"
                  type="text"
                  className={`mb-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${isanakEmpty ? "border-red-500" : ""}`}
                  onChange={handleChange}
                  placeholder=" "
                  onBlur={() => setIsanakEmpty(!form.anak)}
                />
                <label
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Nama Lengkap Anak
                </label>
              </div>
              {isanakEmpty && <p className="text-red-500 text-xs mb-2">Wajib diisi</p>}

              <select
                className={`w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 ${iskelasEmpty ? "border-red-500" : ""}`}
                name="kelas"
                onBlur={() => setIskelasEmpty(!form.kelas)}
                onChange={handleChange}
              >
                <option value="">Pilih Kelas</option>
                <option value="X SMA">X SMA</option>
                <option value="XI SMA">XI SMA</option>
              </select>
              {iskelasEmpty && <p className="text-red-500 text-xs mb-2">Wajib diisi</p>}

              <textarea
                className="w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 mb-2"
                placeholder="Kendala yang dihadapi orang tua dengan anak"
                name="masalah"
                onChange={handleChange}
              ></textarea>
              {ismasalahEmpty && <p className="text-red-500 text-xs mb-2">Wajib diisi</p>}
            </div>

            {isButtonDisabled ? (
              <Loader />
            ) : (
              <button
                id="tombolKirim"
                type="submit"
                className="w-full bg-gradient-to-b from-blue-400 to-white text-purple-800 hover:bg-yellow-200 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <p className="text-lg">Kirim</p>
              </button>
            )}
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Seminar;
