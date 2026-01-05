import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import "animate.css";

// Fungsi untuk cek peserta via API
async function cekPeserta(nisn) {
  try {
    const response = await fetch('/api/peserta/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nisn: `1${nisn}` }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error checking participant');
    }
    
    return data.exists;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

// Fungsi untuk membuat peserta via API
const createPeserta = async (data, e) => {
  if (!data) return;

  try {
    const response = await fetch('/api/peserta/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error creating participant');
    }

    e.target.reset();
    Swal.fire({
      title: "Kamu Berhasil Terdaftar",
      text: "Silahkan Coba Try Out-nya",
      icon: "success",
      confirmButtonText: "Ok",
    });

    return true;
  } catch (error) {
    console.error("Error inserting data:", error);
    Swal.fire({
      title: "Gagal Mendaftar",
      text: error.message || "Terjadi kesalahan saat menyimpan data.",
      icon: "error",
      confirmButtonText: "Coba Lagi",
    });
    return false;
  }
};

export default function Newmembersup() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const { jenisujian } = router.query;
  const [adaEmail, setAdaEmail] = useState(false);
  const [adaNisn, setAdaNisn] = useState(false);
  const { data: session } = useSession();
  const [isDisable, setIsDisable] = useState(
    typeof session === "undefined" || session ? false : true
  );

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [jenjang, setJenjang] = useState("");
  const [form, setForm] = useState({
    nama: "",
    nisn: "",
    asalsekolah: "",
    wa: "",
    prodi1: "",
    kampus1: "",
    prodi2: "",
    kampus2: "",
    cekaja: "",
  });

  const handleJenjangChange = (e) => {
    const value = e.target.value;
    setJenjang(value);

    if (value === "sd" || value === "smp") {
      setForm((prev) => ({
        ...prev,
        kampus1: "kosong",
        prodi2: "kosong",
        kampus2: "kosong",
      }));
    }
  };
  
  const validateForm = (form) => {
    return (
      form.nisn !== "" &&
      form.asalsekolah !== "" &&
      form.asalsekolah.length < 100 &&
      form.wa !== "" &&
      form.wa.length < 14 &&
      form.prodi1 !== "" &&
      form.prodi1.length < 100 &&
      form.kampus1 !== "" &&
      form.kampus1.length < 100 &&
      form.prodi2 !== "" &&
      form.prodi2.length < 100 &&
      form.kampus2 !== "" &&
      form.kampus2.length < 100
    );
  };

  const submitForm = async (e) => {
    setIsButtonDisabled(true);
    e.preventDefault();

    if (!validateForm(form)) {
      Swal.fire({
        title: "Data Belum Lengkap",
        text: "Pastikan semua data terisi dengan benar.",
        icon: "warning",
      });
      setIsButtonDisabled(false);
      return;
    }

    let isPesertaExist = null;
    try {
      isPesertaExist = await cekPeserta(form.nisn);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Koneksi Bermasalah",
        text: "Gagal memeriksa NISN. Pastikan koneksi internet stabil dan coba lagi.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
      setIsButtonDisabled(false);
      return;
    }

    if (isPesertaExist === null) {
      Swal.fire({
        title: "Cek Koneksi",
        text: "Tidak bisa memeriksa NISN, coba lagi.",
        icon: "error",
      });
      setIsButtonDisabled(false);
      return;
    }

    if (isPesertaExist) {
      Swal.fire({
        title: "NISN Sudah Terdaftar",
        text: "Data gagal dikirim, NISN sudah terdaftar.",
        icon: "warning",
        confirmButtonText: "Koreksi Datamu",
      });
      setIsButtonDisabled(false);
      setShowButton(true);
      return;
    }

    // Jika belum terdaftar: Insert ke database
    const newRowData = {
      nama: session.user.name,
      nisn: `1${form.nisn}`,
      asalsekolah: form.asalsekolah,
      wa: form.wa,
      prodi1: form.prodi1,
      kampus1: form.kampus1,
      prodi2: form.prodi2,
      kampus2: form.kampus2,
      email: session.user.email,
      foto: session.user.image,
    };

    const success = await createPeserta(newRowData, e);

    if (success) {
      if (jenisujian === "tka" || jenjang === 'sd' || jenjang === 'smp') {
        router.push("/form/logintka");
      } else if (jenisujian === "snbt") {
        router.push("/form/loginsupa");
      } else {
        router.push("/");
      }
    } else {
      setIsButtonDisabled(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
    // memeriksa apakah semua form telah terisi
    if (
      session &&
      form.nisn !== "" &&
      form.asalsekolah !== "" &&
      form.wa !== "" &&
      form.prodi1 !== "" &&
      form.kampus1 !== "" &&
      form.prodi2 !== "" &&
      form.kampus2 !== ""
    ) {
      setShowButton(true);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSignIn = async () => {
    try {
      await signIn("google", { prompt: "select_account" });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <>
      <Head>
        <title>FORM PROGRAM SNBT</title>
        <meta name="description" content="Seleksi Masuk PTN Jalur Tes" />
        <meta name="theme-color" content="#581c87" />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>

      <div className="bg-gray-50 dark:bg-gray-900 animate__animated animate__slideInDown">
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
            Member Premium
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Buat Akun Baru
              </h1>
              
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={(e) => submitForm(e)}
              >
                <div className="relative">
                  <label
                    htmlFor="nama"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Verifikasi Email*
                  </label>
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
                      type="text"
                      name="nama"
                      id="nama"
                      className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        adaEmail === true ? "border-red-900" : "border-gray-300"
                      }`}
                      placeholder="Klik disini"
                      onFocus={!session ? handleSignIn : ""}
                      value={session ? session.user.name : ""}
                      readOnly
                      autoComplete="off"
                    />
                    {adaEmail === true ? (
                      <div>
                        <p className="text-xs text-red-900">
                          Email sudah terdaftar
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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
                    placeholder="Contoh : 0987654321"
                    className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      adaNisn === true ? "border-red-900" : "border-gray-300"
                    }`}
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={isDisable}
                  />
                  {adaNisn === true ? (
                    <div>
                      <p className="text-xs text-red-900">
                        NISN sudah terdaftar
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
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
                    placeholder="Contoh : SMAN 1 Jakarta"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={isDisable}
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
                    placeholder="maks 13 karakter"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={isDisable}
                  />
                </div>
                
                {/* Pilih Jenjang */}
                <div>
                  <label htmlFor="jenjang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Pilih Jenjang*
                  </label>
                  <select
                    id="jenjang"
                    name="jenjang"
                    value={jenjang}
                    onChange={handleJenjangChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="">-- Pilih Jenjang --</option>
                    <option value="sd">SD</option>
                    <option value="smp">SMP</option>
                    <option value="sma">SMA</option>
                  </select>
                </div>
                
                {/* Penjurusan */}
                <div>
                  <label htmlFor="prodi1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {jenjang === "sma" ? "Pilihan Jurusan 1*" : "Sekolah Lanjutan*"}
                  </label>
                  <input
                    type="text"
                    name="prodi1"
                    id="prodi1"
                    placeholder={jenjang === "sma" ? "Contoh : Teknik Informatika" : "Kamu mau lanjutin sekolah dimana?"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    required
                    onChange={handleChange}
                    autoComplete="off"
                    disabled={isDisable}
                  />
                </div>
                
                {/* Jika jenjang SMA */}
                {jenjang === 'sma' && (
                  <>
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
                        placeholder="contoh : Universitas Indonesia"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        onChange={handleChange}
                        autoComplete="off"
                        disabled={isDisable}
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
                        placeholder="contoh : Psikologi"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        onChange={handleChange}
                        autoComplete="off"
                        disabled={isDisable}
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
                        placeholder="Contoh : UNIBRAW"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        onChange={handleChange}
                        autoComplete="off"
                        disabled={isDisable}
                      />
                    </div>
                  </>
                )}
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="cekaja"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required=""
                      disabled={isDisable}
                      checked={isChecked}
                      onChange={handleCheckboxChange}
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
                  <Loader />
                ) : (
                  showButton && (
                    <button
                      disabled={isButtonDisabled}
                      type="submit"
                      className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Create an account
                    </button>
                  )
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}