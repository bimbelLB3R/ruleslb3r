import React, { useState } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../../components/Layout";
import Image from "next/image";
import { getSeminarData } from "../../../utils/seminarApi";
import AccordianSeminar from "../../../components/AccordianSeminar";
import Wa from '../../../components/Wa';
import Link from "next/link";

export async function getStaticProps() {
  const data = getSeminarData();
  return {
    props: {
      allSeminar: data.seminar,
    },
  };
}

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_IDRULESLB3R;
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID_DIAGNOSTIK;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const Seminar = ({allSeminar}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isinstagramEmpty, setIsinstagramEmpty] = useState(false);
  const [iswaEmpty, setIswaEmpty] = useState(false);
  const [isanakEmpty, setIsanakEmpty] = useState(false);
  const [iskelasEmpty, setIskelasEmpty] = useState(false);
  const [issekolahEmpty, setIssekolahEmpty] = useState(false);
  const [isalamatEmpty, setIsalamatEmpty] = useState(false);
  const [iskesulitanEmpty, setIskesulitanEmpty] = useState(false);
  const [selectedClass, setSelectedClass] = useState(""); // State to manage selected class
  const [isDisabled, setIsDisabled] = useState(true); // State to manage input disable status
  const router = useRouter();
  const [form, setForm] = useState({
    instagram:"",
    wa: "",
    anak: "",
    kelas: "",
    sekolah:"",
    alamat: "",
    kesulitan: ""
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

  const checkToken = async (wa,e) => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsById[SHEET_ID3];
    const rows = await sheet.getRows();
    const tokenExists = rows.find((row) => row.wa === wa);
    // console.log(tokenExists);

    if (tokenExists) {
      e.target.reset();
      Swal.fire({
        title: `Nomor ${form.wa} sudah pernah terdaftar`,
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

    if (form.instagram && form.wa && form.anak && form.kelas && form.sekolah && form.alamat&& form.kesulitan) {
      setIsButtonDisabled(true);
      const canSubmit = await checkToken(form.wa,e);

      if (canSubmit) {
        const newRow = { ...form };
        await appendSpreadsheet(newRow);
        e.target.reset();
        setIsButtonDisabled(false);
        Swal.fire({
          title: 'Pendaftaran Berhasil',
          text: 'Silahkan Login Untuk Mulai Tes Diagnostik',
          icon: 'success',
          confirmButtonText: 'ok',
        });
        router.push(`./login`);
      } else {
        setIsButtonDisabled(false);
      }
    } else {
      setIsinstagramEmpty(!form.instagram);
      setIswaEmpty(!form.wa);
      setIsanakEmpty(!form.anak);
      setIskelasEmpty(!form.kelas);
      setIssekolahEmpty(!form.kelas);
      setIsalamatEmpty(!form.alamat);
      setIskesulitanEmpty(!form.kesulitan);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "kelas") {
      setSelectedClass(value); // Update the selected class
      setIsDisabled(value === "");
    }
  };

  return (
    <>
      <Head>
        <title>Form Tes Diagnostik</title>
        <meta name="description" content="Formulir Pendaftaran Tes Diagnostik untuk mengetahui gaya belajar anak" key="desc" />
        <meta
          property="og:image"
          itemProp="image"
          content="https://raw.githubusercontent.com/bimbelLB3R/ruleslb3r/main/public/image/image1.webp"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>
      <Layout>
        <div className="flex justify-center items-center bg-slate-100 text-gray-900 font-roboto">
          <div>
          <form className="space-y-6 w-full max-w-lg mx-auto p-8 m-2 border-b" onSubmit={submitForm}>
            
            <div className="flex items-center justify-center">
            <Image
              src="/image/iconlb3r.png"
              width={150}
              height={150}
              alt="math"
              priority={true}
              className=""
            />
          </div>
            <div className="flex items-center justify-center">
              <p className="text-center text-md bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-blue-500">
                "Tes Diagnostik Untuk Mengetahui Gaya Belajar Siswa"
              </p>
            </div>
            <p className="font-semibold text-lg text-center w-full bg-gradient-to-b from-orange-500 to-orange-400 p-2 text-slate-100">
              FORMULIR PENDAFTARAN
            </p>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Sudah punya akun?{" "}
                <Link
                  href="/layanan/diagnostik/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login disini !
                </Link>
              </p>
            <div>
            <select
                className={`w-full mb-2 px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 ${iskelasEmpty ? "border-red-500" : ""}`}
                name="kelas"
                onBlur={() => setIskelasEmpty(!form.kelas)}
                onChange={handleChange}
              >
                <option value="">Pilih Kelas Dulu ya</option>
                <option value="7 SMP">7 SMP</option>
                <option value="8 SMP">8 SMP</option>
                <option value="9 SMP">9 SMP</option>
              </select>
              {iskelasEmpty && <p className="text-red-500 text-xs mb-2">Kelas Wajib diisi</p>}

              <select
                className={`w-full mb-2 px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 ${issekolahEmpty ? "border-red-500" : ""}`}
                name="sekolah"
                onBlur={() => setIssekolahEmpty(!form.sekolah)}
                onChange={handleChange}
              >
                <option value="">Asal Sekolah</option>
                <option value="SMPIT Ashabul Kahfi">SMPIT Ashabul Kahfi</option>
                <option value="SMP Hasbunallah">SMP Hasbunallah</option>
                <option value="SMP Plus MP">SMP Plus MP</option>
                <option value="SMPN 1 Tanjung">SMPN 1 Tanjung</option>
                <option value="SMPN 2 Tanjung">SMPN 2 Tanjung</option>
                <option value="MTsN 1 Tanjung">MTsN 1 Tanjung</option>
              </select>
              {issekolahEmpty && <p className="text-red-500 text-xs mb-2">Asal Sekolah Wajib diisi</p>}

              <div className="relative">
                <input
                  name="instagram"
                  type="text"
                  className={`mb-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${isinstagramEmpty ? "border-red-500" : ""}`}
                  onChange={handleChange}
                  placeholder=" "
                  onBlur={() => setIsinstagramEmpty(!form.instagram)}
                  disabled={isDisabled}
                />
                <label
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  {selectedClass === "Umum" ? "Nomor WA" : "Nama akun istagram kamu"}
                </label>
              </div>
              {isinstagramEmpty && <p className="text-red-500 text-xs mb-2">IG Wajib diisi (tulis tidak ada jika tidak punya)</p>}

              <div className="relative">
                <input
                  name="wa"
                  type="text"
                  className={`mb-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${iswaEmpty ? "border-red-500" : ""}`}
                  onChange={handleChange}
                  placeholder=" "
                  onBlur={() => setIswaEmpty(!form.wa)}
                  disabled={isDisabled}
                />
                
                <label
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  {selectedClass === "Umum" ? "Nomor WA" : "Nomor WA Orang tua Kamu"}
                </label>
              </div>
              <p className="text-xs mb-2 text-right text-gray-500">format : 081392552459 (tanpa spasi)</p>
              {iswaEmpty && <p className="text-red-500 text-xs mb-2">Nomor WA Wajib diisi</p>}
              
              <div className="relative">
                <input
                  name="anak"
                  type="text"
                  className={`mb-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${isanakEmpty ? "border-red-500" : ""}`}
                  onChange={handleChange}
                  placeholder=" "
                  onBlur={() => setIsanakEmpty(!form.anak)}
                  disabled={isDisabled}
                />
                <label
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                 {selectedClass === "Umum" ? "Nama Lengkap" : "Nama Lengkap Kamu"}
                </label>
              </div>
              {isanakEmpty && <p className="text-red-500 text-xs mb-2">Nama Wajib diisi</p>}

              

              <textarea
                className={`w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 mb-2 ${isalamatEmpty ? "border-red-500" : ""}`}
                placeholder={selectedClass === "Umum" ? "Alasan Ikut Seminar" : "Alamat Tempat Tinggal Kamu Sekarang"}
                name="alamat"
                onChange={handleChange}
                disabled={isDisabled}
              ></textarea>
              {isalamatEmpty && <p className="text-red-500 text-xs mb-2">Alamat Wajib diisi</p>}

              <textarea
                className={`w-full px-2.5 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 mb-2 ${iskesulitanEmpty ? "border-red-500" : ""}`}
                placeholder={selectedClass === "Umum" ? "Alamat Domisili" : "Ceritakan mapel yang paling kamu sukai dan tidak kamu sukai beserta alasan"}
                name="kesulitan"
                onChange={handleChange}
                disabled={isDisabled}
              ></textarea>
              {iskesulitanEmpty && <p className="text-red-500 text-xs mb-2">Mapel Wajib diisi</p>}
            </div>

            {isButtonDisabled ? (
              <Loader />
            ) : (
              <div className="flex justify-end">
              <button
                id="tombolKirim"
                type="submit"
                className=" bg-blue-400 text-gray-100 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg  text-sm px-5 py-2.5 text-center"
              >
                <p className="text-lg">Kirim</p>
              </button>
              </div>
            )}
          </form>
          <div className="bg-gray-900 md:bg-gray-100">
          {/* <div className="flex items-center justify-center">
              <p className="text-center text-xl uppercase font-semibold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-blue-500 m-2">
                tentang seminar
              </p>
          </div> */}
          {/* <AccordianSeminar allSeminar={allSeminar} /> */}
          <Wa/>
          </div>
          {/* <div className="bg-gray-900 md:bg-gray-100 p-2">
            <p className="text-sm text-center text-gray-600 font-roboto">Diselenggarakan oleh,</p>
            <div className="flex flex-row justify-center items-center space-x-2 ">
            <div>
                <Image src="/image/logolb3r.png" alt="logo lb3r" width={75} height={30} />
            </div>
            <div>
                <Image src="/image/logosmanta.png" alt="logo lb3r" width={50} height={50} />
              </div>
            </div>
          </div> */}
        </div>
        </div>
      </Layout>
    </>
  );
};

export default Seminar;
