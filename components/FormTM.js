import React, { useEffect, useState } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import Layout from "./Layout";
import { signIn, signOut, useSession } from "next-auth/react";
import "animate.css";
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
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID_TM;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const FormTM = ({ detailProgram}) => {
  const { data: session } = useSession();
  const isInputReadOnly = !session ? true : false;
  const [isDisable, setIsDisable] = useState(!session);

  // console.log(isDisable);
  const [showButton, setShowButton] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // const [isNamaEmpty, setIsNamaEmpty] = useState(false);
  const [isKelasEmpty, setIsKelasEmpty] = useState(false);
  const [isAsalSekolahEmpty, setIsAsalSekolahEmpty] = useState(false);
  const [isProfesiEmpty, setIsProfesiEmpty] = useState(false);
  const [isProfesi2Empty, setIsProfesi2Empty] = useState(false);
  const [isKotaEmpty, setIsKotaEmpty] = useState(false);

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
    ttl: "",
    kelas: "",
    asalsekolah: "",
    profesi: "",
    profesi2: "",
    email: "",
    program: "",
    biaya: "",
    hobbies:[],
    otherHobby:"",
    kota:""
  });

  // Menangani checkbox perubahan
const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    
    setForm((prevForm) => {
      if (checked) {
        // Jika checkbox dipilih, tambahkan value ke array
        return { ...prevForm, hobbies: [...prevForm.hobbies, value] };
      } else {
        // Jika checkbox tidak dipilih, hapus value dari array
        return {
          ...prevForm,
          hobbies: prevForm.hobbies.filter((hobby) => hobby !== value),
        };
      }
    });
  };

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
      if (!GOOGLE_SERVICE_PRIVATE_KEY) {
        throw new Error("Environment variable `GOOGLE_SERVICE_PRIVATE_KEY` is missing");
      }
      
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
      form.ttl !== "" &&
      form.ttl.length < 200 &&
      form.kelas !== "" &&
      form.kelas.length < 3 &&
      form.asalsekolah !== "" &&
      form.asalsekolah.length < 100 &&
      form.profesi !== "" &&
      form.profesi.length < 300 &&
      form.profesi2 !== "" &&
      form.profesi2.length < 300 &&
      form.kota !== "" &&
      form.kota.length < 300 &&
      form.program !== "" &&
      form.biaya !== ""
    ) {
      setIsButtonDisabled(true);

      // const canSubmit = await checkName(form.nama, sheet);
      const canSubmit = await checkName(session.user.name, sheet);

      if (canSubmit) {
        const newRow = {
          nama: session.user.name,
          ttl: form.ttl,
          kelas: form.kelas,
          asalsekolah: form.asalsekolah,
          profesi: form.profesi,
          profesi2: form.profesi2,
          kota: form.kota,
          email: session.user.email,
          program: form.program,
          biaya: form.biaya,
          hobbies: form.hobbies.join(", "),
          otherHobby:form.otherHobby
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
        const { transactionToken, transactionRedirectUrl } = await createTransaction(newRow);

        // console.log(transactionToken); //token berhasil
        // console.log(transactionRedirectUrl); //token berhasil

        // setIsLoading(true); // set status loading menjadi true, kirim ke drive

        // sendMail(newRow.email, transactionRedirectUrl);

        const newRowWithRedirect = { ...newRow, redirectUrl: transactionRedirectUrl };
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

        await Promise.all([
            sendContactForm(newRowWithRedirect),
            appendSpreadsheet(newRowWithRedirect)
          ]);
          
        e.target.reset();
        setIsButtonDisabled(false);

        Swal.fire({
          title: `Pendaftaran ${session.user.name} berhasil`,
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
      form.ttl !== "" &&
      form.kelas !== "" &&
      form.asalsekolah !== "" &&
      form.profesi !== ""&&
      form.profesi2 !== ""&&
      form.kota !== ""

      // form.email
    ) {
      setShowButton(true); // menampilkan tombol
    }
  };
  const handleSignIn = async () => {
    try {
      // Menetapkan prompt ke 'select_account' saat memanggil signIn
      await signIn("google", { prompt: "select_account" });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <>
      {/* <Navbar allPost={allPost} /> */}
      <Head>
        <title>PERSEPSI DAN MINAT PERSONAL</title>
        <meta name="description" content="Formulir Pendaftaran" key="desc" />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>
      <Layout>
        <div className="flex justify-center items-center bg-slate-100 text-gray-900  animate__animated  animate__slideInDown mb-10">
          <form
            className="space-y-3 w-full max-w-lg mx-auto p-5"
            onSubmit={submitForm}
          >
            <p className="font-semibold text-2xl text-center w-full bg-gradient-to-b from-purple-800  to-purple-500 p-2 text-slate-100 rounded-lg">
              PERSEPSI & MINAT PERSONAL
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
                id="floating_outlined1"
                className="mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                placeholder=" "
                autoComplete="off"
                // onChange={handleChange}
                onFocus={!session ? handleSignIn : ""}
                value={session ? session.user.email : ""}
                readOnly
              />
              <label
                htmlFor="floating_outlined1"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                id="floating_outlined2"
                className="mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                autoComplete="off"
                // onChange={handleChange}
                value={session ? session.user.name : ""}
                disabled={isDisable}
                readOnly
              />
              <label
                htmlFor="floating_outlined2"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                id="floating_outlined3"
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
                htmlFor="floating_outlined3"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Kelas
              </label>
              {isKelasEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi angka (maks 3 digit)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="asalsekolah"
                type="text"
                id="floating_outlined4"
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
                htmlFor="floating_outlined4"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Asal Sekolah
              </label>
              {isAsalSekolahEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 100 karakter)
                </p>
              )}
            </div>
            
            <div className="relative">
              <input
                name="profesi"
                type="text"
                id="floating_outlined5"
                className={`mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isProfesiEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                onBlur={() => {
                  if (form.profesi === "" || form.profesi.length > 100) {
                    setIsProfesiEmpty(true);
                  } else {
                    setIsProfesiEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined5"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Profesi yang diminati (boleh lebih dari satu)
              </label>
              {isProfesiEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="profesi2"
                type="text"
                id="floating_outlined6"
                className={`mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isProfesi2Empty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                onBlur={() => {
                  if (form.profesi2 === "" || form.profesi2.length > 100) {
                    setIsProfesi2Empty(true);
                  } else {
                    setIsProfesi2Empty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined6"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Profesi yang disarankan oleh orangtua (boleh lebih dari satu) 

              </label>
              {isProfesi2Empty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <p className="w-full bg-slate-500 p-2 text-slate-100">Kategori Profesi yang diminati (boleh pilih lebih dari satu) :
                </p>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hobby1" name="hobbies" onChange={handleCheckboxChange} value="Karyawan Perusahaan (BUMN/Swasta)"/>
                    <label htmlFor="hobby1">Karyawan Perusahaan (BUMN/Swasta)</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hobby2" name="hobbies" onChange={handleCheckboxChange} value="Profesional Mandiri (Dokter, Psikolog, Pengacara, Seniman, dll )"/>
                    <label htmlFor="hobby2">Profesional Mandiri (Dokter, Psikolog, Pengacara, Seniman, dll )</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hobby3" name="hobbies" onChange={handleCheckboxChange} value="Entrepreneur/Bisnis/Wirausaha"/>
                    <label htmlFor="hobby3">Entrepreneur/Bisnis/Wirausaha</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hobbyOther" name="hobbies" onChange={handleCheckboxChange} value="Lainnya"/>
                    <label htmlFor="hobbyOther">Lainnya:</label>
                    <input type="text" className="mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" id="otherHobbyInput" name="otherHobby" placeholder="Sebutkan profesi lain" onChange={handleChange}/>
                </div>
            </div>
            <div className="relative">
              <input
                name="kota"
                type="text"
                id="floating_outlined7"
                className={`mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isKotaEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                onBlur={() => {
                  if (form.kota === "" || form.kota.length > 100) {
                    setIsKotaEmpty(true);
                  } else {
                    setIsKotaEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined7"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Sebutkan dua kota yang kamu rasa cocok untuk jadi tempat di mana kamu kuliah

              </label>
              {isKotaEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>

            <p className="w-full bg-slate-500 p-2 text-slate-100">
              CENTANG SEMUA PILIHAN DI BAWAH INI
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
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
              <p>{inputValueProgramName} (Wajib centang)</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
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
                {formatCurrency(inputValueProgramPrice)} {detailProgram.rincian}{" "}
                (Wajib Centang)
              </p>
            </div>

            {isButtonDisabled ? (
              <Loader /> // tampilkan komponen loader jika proses append sedang berlangsung
            ) : (
              showButton && (
                <div>
                  <div>
                    <p className="text-purple-900">Dengan klik lanjutkan, maka pian setuju dengan <span><a href="/user/term" target="_blank" className="underline text-red-900">ketentuan LB3R</a></span></p>
                  </div>
                <button
                  disabled={isButtonDisabled}
                  id="tombolKirim"
                  type="submit"
                  className=" w-full bg-gradient-to-b from-yellow-400 to-white  text-purple-800 hover:bg-yellow-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <p className="text-lg">Kirim</p>
                </button>
                </div>
              )
            )}
          </form>
        </div>
      </Layout>
    </>
  );
};

export default FormTM;
