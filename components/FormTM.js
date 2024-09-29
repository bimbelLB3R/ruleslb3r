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
import CanvaEmbed from "./CanvaEmbed1";
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
  const [isDisable, setIsDisable] = useState(
    typeof session === "undefined" || session ? false : true
  );

  // console.log(isDisable);
  const [showButton, setShowButton] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // const [isNamaEmpty, setIsNamaEmpty] = useState(false);
  const [isKelasEmpty, setIsKelasEmpty] = useState(false);
  const [isWaEmpty, setIsWaEmpty] = useState(false);
  const [isAsalSekolahEmpty, setIsAsalSekolahEmpty] = useState(false);
  const [isProfesiEmpty, setIsProfesiEmpty] = useState(false);
  const [isProfesi2Empty, setIsProfesi2Empty] = useState(false);
  const [isKotaEmpty, setIsKotaEmpty] = useState(false);
  const [isKampusEmpty, setIsKampusEmpty] = useState(false);
  const [isJurusanmuEmpty, setIsJurusanmuEmpty] = useState(false);
  const [isJurusannyaEmpty, setIsJurusannyaEmpty] = useState(false);
  const [isSukaEmpty, setIsSukaEmpty] = useState(false);
  const [isSulitEmpty, setIsSulitEmpty] = useState(false);
  const [isNonmapelEmpty, setIsNonmapelEmpty] = useState(false);
  const [isOrganisasiEmpty, setIsOrganisasiEmpty] = useState(false);
  const [isOlahragaEmpty, setIsOlahragaEmpty] = useState(false);
  const [isSeniEmpty, setIsSeniEmpty] = useState(false);
  const [isKetrampilanEmpty, setIsKetrampilanEmpty] = useState(false);
  const [isPrestasiEmpty, setIsPrestasiEmpty] = useState(false);
  const [isTodoEmpty, setIsTodoEmpty] = useState(false);

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
    wa:"",
    asalsekolah: "",
    profesi: "",
    profesi2: "",
    email: "",
    program: "",
    biaya: "",
    hobbies:[],
    otherHobby:"",
    kota:"",
    kampus:"",
    jurusanmu:"",
    jurusannya:"",
    suka:"",
    sulit:"",
    nonmapel:"",
    organisasi:"",
    olahraga:"",
    seni:"",
    ketrampilan:"",
    prestasi:"",
    todo:""
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
//   console.log(form);

  const submitForm = async (e, sheet) => {
    e.preventDefault();

    if (
      form.kelas !== "" &&
      form.kelas.length < 3 &&
      form.wa !== "" &&
      form.wa.length < 15 &&
      form.asalsekolah !== "" &&
      form.asalsekolah.length < 100 &&
      form.profesi !== "" &&
      form.profesi.length < 500 &&
      form.profesi2 !== "" &&
      form.profesi2.length < 500 &&
      form.kota !== "" &&
      form.kota.length < 300 &&
      form.kampus !== "" &&
      form.kampus.length < 300 &&
      form.jurusanmu !== "" &&
      form.jurusanmu.length < 300 &&
      form.jurusannya !== "" &&
      form.jurusannya.length < 300 &&
      form.suka !== "" &&
      form.suka.length < 300 &&
      form.sulit !== "" &&
      form.sulit.length < 300 &&
      form.nonmapel !== "" &&
      form.nonmapel.length < 300 &&
      form.organisasi !== "" &&
      form.organisasi.length < 300 &&
      form.olahraga !== "" &&
      form.olahraga.length < 300 &&
      form.seni !== "" &&
      form.seni.length < 300 &&
      form.ketrampilan !== "" &&
      form.ketrampilan.length < 300 &&
      form.prestasi !== "" &&
      form.prestasi.length < 300 &&
      form.todo !== "" &&
      form.todo.length < 300 &&
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
          wa:form.wa,
          asalsekolah: form.asalsekolah,
          email: session.user.email,
          profesi: form.profesi,
          profesi2: form.profesi2,
          hobbies: form.hobbies.join(", "),
          otherHobby:form.otherHobby,
          kota: form.kota,
          kampus: form.kampus,
          jurusanmu: form.jurusanmu,
          jurusannya: form.jurusannya,
          suka: form.suka,
          sulit: form.sulit,
          nonmapel: form.nonmapel,
          organisasi: form.organisasi,
          olahraga: form.olahraga,
          seni: form.seni,
          ketrampilan: form.ketrampilan,
          prestasi: form.prestasi,
          todo: form.todo,
          program: form.program,
          biaya: form.biaya
          
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
        localStorage.removeItem('tmData'); 
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
    const { name, value, type, checked } = e.target;

    // Handle checkbox changes for 'hobbies'
    if (type === 'checkbox') {
      if (name === 'hobbies') {
        // Handle hobbies checkboxes (multiple selection allowed)
        setForm((prevForm) => {
          const hobbies = checked 
            ? [...prevForm.hobbies, value] // Add hobby if checked
            : prevForm.hobbies.filter(hobby => hobby !== value); // Remove hobby if unchecked

          const updatedForm = { ...prevForm, hobbies };
          localStorage.setItem('tmData', JSON.stringify(updatedForm)); // Update Local Storage
          return updatedForm;
        });
      } else {
        // Handle single selection checkboxes for 'biaya' and 'program'
        setForm((prevForm) => {
          const updatedForm = { ...prevForm, [name]: checked ? value : "" }; // Save value if checked, clear if unchecked
          localStorage.setItem('tmData', JSON.stringify(updatedForm)); // Update Local Storage
          return updatedForm;
        });
      }
    } else {
      // Handle text input changes
      setForm((prevForm) => {
        const updatedForm = { ...prevForm, [name]: value };
        localStorage.setItem('tmData', JSON.stringify(updatedForm)); // Update Local Storage
        return updatedForm;
      });
    }

    
    // memeriksa apakah semua form telah terisi
    if (
      // form.nama &&
      session &&
      form.kelas !== "" &&
      form.wa !== "" &&
      form.asalsekolah !== "" &&
      form.profesi !== ""&&
      form.profesi2 !== ""&&
      form.kota !== ""&&
      form.kampus !== ""&&
      form.jurusanmu !== ""&&
      form.jurusannya !== ""&&
      form.suka !== ""&&
      form.sulit !== ""&&
      form.nonmapel !== ""&&
      form.organisasi !== ""&&
      form.olahraga !== ""&&
      form.seni !== ""&&
      form.ketrampilan !== ""&&
      form.prestasi !== ""&&
      form.todo !== ""

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

  const [currentPage, setCurrentPage] = useState(1);
  // Ambil data dari Local Storage saat komponen pertama kali di-render
  useEffect(() => {
    const savedFormData = localStorage.getItem("tmData");
    const savedPage = localStorage.getItem("currentPage");
    // localStorage.clear();

    if (savedFormData) {
      setForm(JSON.parse(savedFormData));
    }
    if (savedPage) {
      setCurrentPage(parseInt(savedPage));
    }
  },[]);

// Fungsi untuk memvalidasi halaman saat ini
  const validateCurrentPage = () => {
    const requiredFields = document.querySelectorAll(`section[data-page="${currentPage}"] input[required]`);

    // Validasi setiap input yang required
    for (let field of requiredFields) {
      if (!field.value) {
        return false; // Jika tidak valid, kembalikan false
      }
    }
    // Periksa apakah ada isi di array hobbies di Local Storage
    const savedFormData = localStorage.getItem('tmData');
    if (savedFormData) {
      const { hobbies } = JSON.parse(savedFormData);
      // Jika berada di halaman 2 dan tidak ada hobi yang dipilih, kembalikan false
      if (currentPage === 2 && (!hobbies || hobbies.length === 0)) {
        return false; 
      }
    }
    return true; // Jika semua validasi berhasil, kembalikan true
  };
  // Fungsi untuk menavigasi ke halaman berikutnya dan menyimpan ke Local Storage
  const nextPage = () => {
    if (validateCurrentPage()) {
      const nextPageNumber = currentPage + 1;
      setCurrentPage(nextPageNumber);
      localStorage.setItem("currentPage", nextPageNumber.toString());
    } else {
      alert('Harap isi semua form/centang sesuai petunjuk sebelum melanjutkan ke halaman berikutnya.');
    }
  };

  // Fungsi untuk menavigasi ke halaman sebelumnya dan menyimpan ke Local Storage
  const prevPage = () => {
    const prevPageNumber = currentPage - 1;
    setCurrentPage(prevPageNumber);
    localStorage.setItem("currentPage", prevPageNumber.toString());
  };
  const pages=[
    <section key={"page1"} data-page="1">
            <div className="lg:flex lg:items-center lg:justify-center">
            <div className="hidden lg:visible"><div><CanvaEmbed/></div></div>
              <div>
            <p className="font-semibold lg:text-2xl text-center w-full bg-gradient-to-b from-purple-800/50  to-purple-500/50 p-2 text-purple-900 rounded-lg">
              PERSEPSI & MINAT PERSONAL
            </p>
            <div className="flex items-center justify-center lg:hidden"><CanvaEmbed/></div>
            <p className="text-gray-500 text-center text-sm mb-2">Isi dan lengkapi setiap pertanyaan di bawah ini sebagai bagian penting dari proses Assessment Talents Mapping yang dilaksanakan untuk membantu anda menyusun rencana pendidikan dan karier</p>
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
                required
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
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 underline  peer-placeholder-shown:opacity-100 peer-focus:opacity-0"
              >
                Gunakan email!
              </label>
            </div>
            <div className="relative">
              <input
                name="nama"
                type="text"
                required
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
                required
                id="floating_outlined3"
                className={`mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isKelasEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.kelas}
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
                name="wa"
                type="number"
                required
                id="floating_outlined20"
                className={`mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isWaEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.wa}
                onBlur={() => {
                  if (form.wa === "" || form.wa.length > 13) {
                    setIsWaEmpty(true);
                  } else {
                    setIsWaEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined20"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Nomor WA Aktif Siswa
              </label>
              {isWaEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi angka (maks 14 digit)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="asalsekolah"
                type="text"
                required
                id="floating_outlined4"
                className={`mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isAsalSekolahEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.asalsekolah}
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
                required
                id="floating_outlined5"
                className={`mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isProfesiEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.profesi}
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
                required
                id="floating_outlined6"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isProfesi2Empty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.profesi2}
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
            </div>
            </div>
            </section>,
            <section key={"page2"} data-page="2">
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <p className="w-full bg-slate-500 p-2 text-slate-100">Kategori Profesi yang diminati (boleh pilih lebih dari satu) :
                </p>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hobby1" name="hobbies" onChange={handleChange} value="Karyawan Perusahaan (BUMN/Swasta)" checked={form.hobbies.includes("Karyawan Perusahaan (BUMN/Swasta)")}/>
                    <label htmlFor="hobby1">Karyawan Perusahaan (BUMN/Swasta)</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hobby2" name="hobbies" onChange={handleChange} value="Profesional Mandiri (Dokter, Psikolog, Pengacara, Seniman, dll )" checked={form.hobbies.includes("Profesional Mandiri (Dokter, Psikolog, Pengacara, Seniman, dll )")}/>
                    <label htmlFor="hobby2">Profesional Mandiri (Dokter, Psikolog, Pengacara, Seniman, dll )</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hobby3" name="hobbies" onChange={handleChange} value="Entrepreneur/Bisnis/Wirausaha" checked={form.hobbies.includes("Entrepreneur/Bisnis/Wirausaha")}/>
                    <label htmlFor="hobby3">Entrepreneur/Bisnis/Wirausaha</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hobbyOther" name="hobbies" onChange={handleChange} value="Lainnya" checked={form.hobbies.includes("Lainnya")}/>
                    <label htmlFor="hobbyOther">Lainnya:</label>
                    <input type="text" className="mb-2  block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" id="otherHobbyInput" name="otherHobby" placeholder="Sebutkan profesi lain" onChange={handleChange}/>
                </div>
            </div>
            </section>,

            <section key={"page3"} data-page="3">
            <p className="w-full bg-slate-500 p-2 text-slate-100">Pilihan Perguruan Tinggi dan Jurusan
                </p>
            <div className="relative">
              <input
                name="kota"
                type="text"
                required
                id="floating_outlined7"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 mt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isKotaEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.kota}
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
            <div className="relative">
              <input
                name="kampus"
                type="text"
                required
                id="floating_outlined8"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isKampusEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.kampus}
                onBlur={() => {
                  if (form.kampus === "" || form.kampus.length > 300) {
                    setIsKampusEmpty(true);
                  } else {
                    setIsKampusEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined8"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Perguruan Tinggi apa saja yang kamu akan sangat senang jika bisa diterima di sana?

              </label>
              {isKampusEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="jurusanmu"
                type="text"
                required
                id="floating_outlined9"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isJurusanmuEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.jurusanmu}
                onBlur={() => {
                  if (form.jurusanmu === "" || form.jurusanmu.length > 300) {
                    setIsJurusanmuEmpty(true);
                  } else {
                    setIsJurusanmuEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined9"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Jurusan apa saja yang kamu minati dan memang cocok untukmu?

              </label>
              {isJurusanmuEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="jurusannya"
                type="text"
                required
                id="floating_outlined10"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isJurusannyaEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.jurusannya}
                onBlur={() => {
                  if (form.jurusannya === "" || form.jurusannya.length > 300) {
                    setIsJurusannyaEmpty(true);
                  } else {
                    setIsJurusannyaEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined10"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Jurusan apa saja yang disarankan oleh orangtuamu?

              </label>
              {isJurusannyaEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            </section>,

            <section key={"page4"} data-page="4">
            <p className="w-full bg-slate-500 p-2 text-slate-100">Minat Akademik & Non Akademik
            </p>
            <div className="relative">
              <input
                name="suka"
                type="text"
                required
                id="floating_outlined11"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 mt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isSukaEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.suka}
                onBlur={() => {
                  if (form.suka === "" || form.suka.length > 300) {
                    setIsSukaEmpty(true);
                } else {
                    setIsSukaEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined11"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Sebutkan secara berurutan 3 pelajaran yang paling kamu sukai?

              </label>
              {isSukaEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="sulit"
                type="text"
                required
                id="floating_outlined12"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isSulitEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.sulit}
                onBlur={() => {
                  if (form.sulit === "" || form.sulit.length > 300) {
                    setIsSulitEmpty(true);
                } else {
                    setIsSulitEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined12"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Sebutkan secara berurutan 3 pelajaran yang paling sulit kamu pelajari?

              </label>
              {isSulitEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="nonmapel"
                type="text"
                required
                id="floating_outlined13"
                className={`mb-2  block px-2.5 pb-2.5 pt-10  w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isNonmapelEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.nonmapel}
                onBlur={() => {
                  if (form.nonmapel === "" || form.nonmapel.length > 300) {
                    setIsNonmapelEmpty(true);
                } else {
                    setIsNonmapelEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined13"
                className="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Sebutkan aktivitas lain yang tidak berhubungan dengan pelajaran yang paling sering dan senang kamu lakukan selama di sekolah?

              </label>
              {isNonmapelEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="organisasi"
                type="text"
                required
                id="floating_outlined14"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isOrganisasiEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.organisasi}
                onBlur={() => {
                  if (form.organisasi === "" || form.organisasi.length > 300) {
                    setIsOrganisasiEmpty(true);
                } else {
                    setIsOrganisasiEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined14"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Jika senang berorganisasi, peran atau tugas apa yang sering kamu ambil?
              </label>
              {isOrganisasiEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="olahraga"
                type="text"
                required
                id="floating_outlined15"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isOlahragaEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.olahraga}
                onBlur={() => {
                  if (form.olahraga === "" || form.olahraga.length > 300) {
                    setIsOlahragaEmpty(true);
                } else {
                    setIsOlahragaEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined15"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Olahraga yang kamu kuasai dan sering kamu lakukan?
              </label>
              {isOlahragaEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="seni"
                type="text"
                required
                id="floating_outlined16"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isSeniEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.seni}
                onBlur={() => {
                  if (form.seni === "" || form.seni.length > 300) {
                    setIsSeniEmpty(true);
                } else {
                    setIsSeniEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined16"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Aktivitas seni yang kamu kuasai dan sering kamu lakukan?
              </label>
              {isSeniEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="ketrampilan"
                type="text"
                required
                id="floating_outlined17"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isKetrampilanEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.ketrampilan}
                onBlur={() => {
                  if (form.ketrampilan === "" || form.ketrampilan.length > 300) {
                    setIsKetrampilanEmpty(true);
                } else {
                    setIsKetrampilanEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined17"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Keterampilan tertentu yang kamu sudah kuasai saat ini?
              </label>
              {isKetrampilanEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            <div className="relative">
              <input
                name="prestasi"
                type="text"
                required
                id="floating_outlined18"
                className={`mb-2  block px-2.5 pb-2.5 pt-8 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isPrestasiEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.prestasi}
                onBlur={() => {
                  if (form.prestasi === "" || form.prestasi.length > 300) {
                    setIsPrestasiEmpty(true);
                } else {
                    setIsPrestasiEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined18"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Prestasi atau pencapaian paling penting yang pernah kamu raih selama ini?
              </label>
              {isPrestasiEmpty && (
                <p className="text-red-500 text-xs">
                  Wajib diisi (maks 300 karakter)
                </p>
              )}
            </div>
            </section>,

            <section key={"page5"} data-page="5">
            <div className="relative">
              <input
                name="todo"
                type="text"
                required
                id="floating_outlined19"
                className={`mb-2  block px-2.5 pb-2.5 pt-32 md:pt-20 mt-20 md:mt-10 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                  isTodoEmpty ? "border-red-500" : "mb-2"
                }`}
                placeholder=" "
                autoComplete="off"
                onChange={handleChange}
                disabled={isDisable}
                value={form.todo}
                onBlur={() => {
                  if (form.todo === "" || form.todo.length > 300) {
                    setIsTodoEmpty(true);
                } else {
                    setIsTodoEmpty(false);
                  }
                }}
              />
              <label
                htmlFor="floating_outlined19"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-100 dark:bg-slate-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[24px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Jika kamu dalam kondisi yang sangat leluasa, memiliki semua sumberdaya yang kamu butuhkan, memiliki seluruh potensi dan faktor pendukung yang bisa membantumu berhasil mewujudkan impian atau karya terpenting dalam hidup, maka apa yang kamu lakukan atau ciptakan ?
              </label>
              {isTodoEmpty && (
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
                required
                className=""
                placeholder="program"
                onChange={handleChange}
                disabled={isDisable}
                checked={form.program.includes(inputValueProgramName)}
                // readOnly
                value={inputValueProgramName}
              />
              <p>{inputValueProgramName} (Wajib centang)</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <input
                name="biaya"
                type="checkbox"
                required
                className=""
                placeholder="biaya"
                onChange={handleChange}
                disabled={isDisable}
                checked={form.biaya.includes(inputValueProgramPrice)}
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
                  <div className="m-2">
                    <p className="text-purple-900">Dengan klik lanjutkan, maka pian setuju dengan <span><a href="/user/term" target="_blank" className="underline text-red-900">ketentuan LB3R</a></span></p>
                  </div>
                <button
                  disabled={isButtonDisabled}
                  id="tombolKirim"
                  type="submit"
                  className=" w-full bg-gradient-to-b from-yellow-400 to-white  text-purple-800 hover:bg-yellow-200 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
                >
                  <p className="text-lg">Kirim</p>
                </button>
                </div>
              )
            )}
            </section>
  ]

   // Fungsi untuk menghapus tmData dari localStorage dan mereset formulir
   const clearForm = () => {
    localStorage.removeItem('tmData'); // Hapus data dari localStorage
    setForm({ // Reset state form
      kelas: "",
    wa:"",
    asalsekolah: "",
    profesi: "",
    profesi2: "",
    email: "",
    program: "",
    biaya: "",
    hobbies:[],
    otherHobby:"",
    kota:"",
    kampus:"",
    jurusanmu:"",
    jurusannya:"",
    suka:"",
    sulit:"",
    nonmapel:"",
    organisasi:"",
    olahraga:"",
    seni:"",
    ketrampilan:"",
    prestasi:"",
    todo:""
    });
  };

  return (
    <>
      {/* <Navbar allPost={allPost} /> */}
      <Head>
        <title>Formulir Pra-Asesmen Talents Mapping | Bimbel LB3R</title>
        <meta name="description" content="Isi dan lengkapi setiap pertanyaan di bawah ini sebagai bagian penting dari proses Assessment Talents Mapping yang dilaksanakan untuk membantu anda menyusun rencana pendidikan dan karier" key="desc" />
        <meta
      property="og:image"
      itemProp="image"
      content="https://www.bimbellb3r.com/_next/image?url=%2Fimage%2Flogotm.png&w=1920&q=75"
    />
    <meta
      property="og:description"
      content="Bersama menemukan karir dan jurusan kuliah yang tepat"
    />
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
            
              {pages[currentPage - 1]} 
            <div className="flex items-center justify-between mt-6">  
            <div className="flex justify-center space-x-4 ">
              {currentPage > 1 && (
              <button type="button" onClick={prevPage} className="shadow-md p-2 text-gray-500 rounded ">
                Previous
              </button>
              )}
              {currentPage < pages.length && (
              <button  type="button"  onClick={nextPage} className="shadow-md p-2 text-gray-500 rounded">
                Next
              </button>
              )}
          </div>
          <button onClick={clearForm} className="text-gray-500">Kosongkan formulir</button> 
          </div>
          </form>
          </div>
        
      </Layout>
    </>
  );
};

export default FormTM;
