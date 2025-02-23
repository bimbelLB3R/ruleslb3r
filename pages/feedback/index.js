import Image from "next/image";
import StarRating from "../../components/RatingTentor";
import { useState, useEffect } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import Loader from "../../components/Loader";
import Layout from "../../components/Layout";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";
import AllRatingTentor from "../../components/AllRatingTentor";
import { runFireworks } from "../../libs/utils";
// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID_RATING;
const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID_RATING1;
const SHEET_ID2 = process.env.NEXT_PUBLIC_SHEET_ID_RATING2;
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID_RATING3;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY;

const FeedbackForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  // const [userEmail, setUserEmail] = useState();
  const handleSignIn = async () => {
    try {
      // Menetapkan prompt ke 'select_account' saat memanggil signIn
      await signIn("google", { prompt: "select_account" });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // const { data: session } = useSession();
  // if (session) {
  //   setUserEmail(session.user.email);
  // }
  const [dataJadwal, setDataJadwal] = useState([]);
  const [kelasSiswa, setKelasSiswa] = useState();
  const [tanggalJadwal, setTanggalJadwal] = useState();
  const [submitedLocal, setSubmitedLocal] = useState({});
  const [cekEmail, setCekEmail] = useState();
  const [dataRows3, setDataRows3] = useState([]);

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const ambilJadwal = async () => {
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    setIsLoading(true);
    await doc.loadInfo(); // tambahkan baris ini untuk memastikan sheet telah terdefinisi
    const sheet1 = doc.sheetsById[SHEET_ID1]; // tambahkan baris ini untuk mendefinisikan sheet
    const sheet2 = doc.sheetsById[SHEET_ID2]; // tambahkan baris ini untuk mendefinisikan sheet
    const sheet3 = doc.sheetsById[SHEET_ID3]; // tambahkan baris ini untuk mendefinisikan sheet
    const rows = await sheet1.getRows(); //data jadwal
    const rows2 = await sheet2.getRows(); //data siswa
    const rows3 = await sheet3.getRows(); //data rating
    // setDataJadwal(jadwalSesuaiEmail);
    // setDataSiswa(rows2);
    // console.log(email_user);
    if (session) {
      const lowerCaseSessionEmail = session.user.email.toLowerCase();
      const cekEmailUser = rows2.find(
        (row) => row.email_user.toLowerCase() === lowerCaseSessionEmail
      ); //penulisan row.name , name nya harus sama dengan di google sheet name

      if (!cekEmailUser) {
        Swal.fire({
          title: "Email Kamu belum terdaftar, coba email lain?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Ya",
          denyButtonText: `Tidak`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            handleSignIn();
          } else if (result.isDenied) {
            // router.push("/");
            setIsLoading(false);
          }
        });
      }
      const kelasUser = cekEmailUser.kelas_user;
      const today = new Date();
      const tanggalJadwalSiswa = `${today.getFullYear()}-${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`; //tanggal saat ini format 2024-09-09
      const jadwalSesuaiKelasUser = rows.filter(
        (row) =>
          row.kelas_jadwal === kelasUser &&
          row.tanggal_jadwal === tanggalJadwalSiswa
      );

      // setKelasUserState(kelasUser);
      // console.log(jadwalSesuaiKelasUser);

      // Mengumpulkan semua data dari rows3 ke dalam sebuah array
      const allRowsData = [];
      rows3.forEach((row) => {
        allRowsData.push(row);
      });
      // Set array data ke state
      setDataRows3(allRowsData);

      setCekEmail(cekEmailUser);
      setDataJadwal(jadwalSesuaiKelasUser);
      setKelasSiswa(kelasUser);
      setTanggalJadwal(tanggalJadwalSiswa);
      setIsLoading(false);
    }
    // tentor hari ini,ambil data rating
  };
  useEffect(() => {
    // Panggil fungsi ambilJadwal disini
    // const email_user = "ikhwchemist@gmail.com";
    ambilJadwal();
  }, [session]);

  const [ratings, setRatings] = useState(0);
  const [submitted, setSubmitted] = useState({});

  const handleRatingChange = (jadwalId, value) => {
    const jadwalName = dataJadwal.find(
      (jadwal) => jadwal.id_jadwal === jadwalId
    ).pengajar_jadwal;
    if (!submitted[jadwalId]) {
      setRatings({ ...ratings, [jadwalId]: value });
      // Menyimpan data dalam local storage dengan format yang lebih terstruktur
      const dataToStore = {
        jadwalId: jadwalId,
        jadwalName: jadwalName,
        rating: value,
      };
      // localStorage.setItem(`rating_${jadwalId}`, JSON.stringify(dataToStore));
    }
  };

  // kirim ke spreadsheet
  const appendSpreadsheet = async (newRow) => {
    // console.log(newRow);
    try {
      const currentTime = new Date().getTime();
      const expirationTime = currentTime + 12 * 60 * 60 * 1000; // 12 jam dalam milidetik
      localStorage.setItem("expirationTime", expirationTime.toString());
      await doc.useServiceAccountAuth({
        client_email: GOOGLE_CLIENT_EMAIL,
        // private_key: GOOGLE_SERVICE_PRIVATE_KEY,
        private_key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
      // loads document properties and worksheets
      await doc.loadInfo();
      // console.log(SHEET_ID3);
      const sheet = doc.sheetsById[SHEET_ID3];
      // console.log(sheet);

      await sheet.addRow(newRow);
      // alert("data terkirim");
      runFireworks();
    } catch (e) {
      console.error("Error: ", e);
    }
  };
  // kirim ke spreadsheet end

  const handleSubmit = (jadwalId) => {
    const jadwalName = dataJadwal.find(
      (jadwal) => jadwal.id_jadwal === jadwalId
    ).pengajar_jadwal;
    const kodeJadwal = dataJadwal.find(
      (jadwal) => jadwal.id_jadwal === jadwalId
    ).id_jadwal;
    // Validasi apakah pengguna memberikan penilaian sebelum mengirimkan data
    if (ratings[jadwalId] !== undefined) {
      // Kirim rating ke server atau lakukan tindakan lainnya.
      console.log(`${jadwalName}'s Rating:`, ratings[jadwalId]);
      const newRow = {
        email_siswa: session.user.email,
        kelas_siswa: kelasSiswa,
        rating_pengajar: jadwalName,
        rating: ratings[jadwalId],
        tanggal_rating: tanggalJadwal,
        kode_materi: kodeJadwal,
      };
      appendSpreadsheet(newRow);
      setSubmitted({ ...submitted, [jadwalId]: true });
      localStorage.setItem(`submited${jadwalId}`, true);

      const dataToStore = {
        jadwalId: kodeJadwal,
        rating: ratings[jadwalId],
      };
      localStorage.setItem(`rating_${jadwalId}`, JSON.stringify(dataToStore));
    } else {
      alert(`Anda belum memberikan penilaian untuk ${jadwalName}`);
    }
  };

  useEffect(() => {
    const submitedLocalData = {};
    dataJadwal.forEach((jadwal) => {
      const storedSubmitedJadwaiId = localStorage.getItem(
        `submited${jadwal.id_jadwal}`
      );
      if (storedSubmitedJadwaiId) {
        submitedLocalData[jadwal.id_jadwal] = true;
      }
    });
    setSubmitedLocal(submitedLocalData);
  }, [dataJadwal]);

  useEffect(() => {
    // Ambil waktu saat ini
    const currentTime = new Date().getTime();
    // Ambil waktu kedaluwarsa dari local storage
    const expirationTime = parseInt(localStorage.getItem("expirationTime"));

    // Periksa apakah sudah melewati waktu kedaluwarsa
    if (currentTime > expirationTime) {
      // Jika sudah lewat, hapus semua data dari local storage
      localStorage.clear();
    }
  }, []); // Efek ini hanya dijalankan saat komponen dimuat
  // HAPUS SEMUA DATA LOCAL STORAGE SETELAH 12 JAM END

  // tentor hari ini

  // pilih data yang sesuai dengan aray tentor hari ini
  const arrayPengajarHariIni = dataJadwal.map((item) => item.pengajar_jadwal);
  const dataRows3SesuaiArray = dataRows3.filter((row) =>
    arrayPengajarHariIni.includes(row.rating_pengajar)
  ); //berisi data dari rows3 yang sesuai tentor di kelas anak
  // Buat objek untuk menyimpan total rating dan jumlah entri rating untuk setiap pengajar
  const ratingByPengajar = {};
  dataRows3SesuaiArray.forEach((data) => {
    const { rating_pengajar, rating } = data;
    const ratingAngka = parseInt(rating);
    // Jika nama pengajar belum ada dalam objek ratingByPengajar, inisialisasi total rating dan jumlah entri ratingnya
    if (!ratingByPengajar[rating_pengajar]) {
      ratingByPengajar[rating_pengajar] = { totalRating: 0, jumlahEntri: 0 };
    }
    // Tambahkan rating ke total rating untuk pengajar yang bersangkutan
    ratingByPengajar[rating_pengajar].totalRating += ratingAngka;
    // Tambahkan 1 ke jumlah entri rating untuk pengajar yang bersangkutan
    ratingByPengajar[rating_pengajar].jumlahEntri += 1;
  });
  // Buat objek untuk menyimpan rata-rata rating untuk setiap pengajar
  const rataRataRatingByPengajar = {};
  // Hitung rata-rata rating untuk setiap pengajar
  Object.keys(ratingByPengajar).forEach((rating_pengajar) => {
    const { totalRating, jumlahEntri } = ratingByPengajar[rating_pengajar];
    const rataRataRating = totalRating / jumlahEntri;

    // Simpan nama pengajar dan rata-rata ratingnya dalam objek rataRataRatingByPengajar
    rataRataRatingByPengajar[rating_pengajar] = rataRataRating;
  });

  // console.log(dataRows3SesuaiArray);
  return (
    <Layout>
      <Head>
        <title>Rating Pengajar | Bimbel LB3R</title>
        <meta
          name="description"
          content="Rating terhadap perfoma guru saat mengajar"
          key="desc"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
      </Head>
      <div className=" mt-20" id="content" >
        {session ? (
          <div>
            <h2 className="text-center font-bold uppercase">Beri Penilaian</h2>
            <h3 className="text-center italic text-xs lowercase">
              as {session.user.email}
            </h3>
            {isLoading ? (
              <div className="flex items-center justify-center h-screen m-auto">
                <Loader />
              </div>
            ) : (
              <div>
                {dataJadwal.length > 0 ? (
                  <div>
                    {dataJadwal.map((daJal) => (
                      <form
                        key={daJal.id_jadwal}
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit(daJal.id_jadwal);
                        }}
                      >
                        <div className="flex items-center justify-center space-x-3 border-b-2 border-gray-300 p-2 max-w-[300px] md:max-w-xl m-auto">
                          <div>
                            <Link
                              href={`https://www.bimbellb3r.com/image/tentor/${daJal.pengajar_jadwal}.png`}
                              className="flex items-center justify-center"
                            >
                              <Image
                                src={`/image/tentor/${daJal.pengajar_jadwal}.png`}
                                width={50}
                                height={50}
                                alt="No Image"
                                className="rounded-full"
                                priority
                              />
                            </Link>
                            <p className="text-center text-sm ">
                              {daJal.pengajar_jadwal}
                            </p>
                            <p className="text-center text-sm ">
                              ({" "}
                              {rataRataRatingByPengajar[
                                daJal.pengajar_jadwal
                              ] !== undefined
                                ? rataRataRatingByPengajar[
                                    daJal.pengajar_jadwal
                                  ].toFixed(2)
                                : "0,00"}
                              <span
                                style={{
                                  color: "gold",
                                }}
                              >
                                ★
                              </span>
                              )
                            </p>
                          </div>

                          <StarRating
                            onChange={(value) =>
                              handleRatingChange(daJal.id_jadwal, value)
                            }
                            // disabled={submitted[daJal.id_jadwal]}
                            jadwalId={daJal.id_jadwal}
                          />
                          <button
                            type="submit"
                            disabled={
                              submitted[daJal.id_jadwal] ||
                              submitedLocal[daJal.id_jadwal]
                            }
                          >
                            <div>
                              {submitted[daJal.id_jadwal] ||
                              submitedLocal[daJal.id_jadwal]
                                ? "terkirim"
                                : "kirim"}
                            </div>
                          </button>
                        </div>
                      </form>
                    ))}
                  </div>
                ) : (
                  <p className="text-center p-3">
                    Jadwal belum tersedia,
                    <button onClick={() => signOut()} className="underline">
                      ganti email?
                    </button>
                  </p>
                )}

                <div className="flex items-center justify-center m-6">
                  <div className="flex items-center justify-center">
                    <div>
                      <table className="table-auto w-full border-collapse border border-gray-900 mb-4">
                        <thead>
                          <tr className="bg-gray-900 text-white">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Indikator Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-gray-100 hover:bg-gray-200">
                            <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2">
                              Kamu paham apa yang diajarkan oleh guru
                            </td>
                          </tr>
                          <tr className="bg-gray-100 hover:bg-gray-200">
                            <td className="border px-4 py-2">2</td>
                            <td className="border px-4 py-2">
                              Kamu suka dengan cara guru menyampaikan materi
                            </td>
                          </tr>
                          <tr className="bg-gray-100 hover:bg-gray-200">
                            <td className="border px-4 py-2">3</td>
                            <td className="border px-4 py-2">
                              Kamu merasa terbantu oleh guru ketika ada tugas
                            </td>
                          </tr>
                          <tr className="bg-gray-100 hover:bg-gray-200">
                            <td className="border px-4 py-2">4</td>
                            <td className="border px-4 py-2">
                              Materi yang disampaikan guru sesuai dengan materi di sekolah kamu
                            </td>
                          </tr>
                          <tr className="bg-gray-100 hover:bg-gray-200">
                            <td className="border px-4 py-2">5</td>
                            <td className="border px-4 py-2">
                              Saat mengajar, guru menggunakan spidol 3 warna (hitam-biru-merah)
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <AllRatingTentor />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center  m-auto p-6 max-w-sm">
              <div>
                <div>
                  {/* <Image
                    src="/image/snbt/ujicoba.jpeg"
                    width={540}
                    height={540}
                    alt="Pengajar"
                    className=""
                    priority
                  /> */}
                  <AllRatingTentor />
                </div>
                <p className="text-center text-xs">
                  Silahkan kamu login terlebih dahulu. Gunakan email seperti
                  email yang kamu pakai saat mendaftar di LB3R
                </p>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    name="loginGoogle"
                    // onClick={() => signIn()}
                    onClick={handleSignIn}
                    className="underline text-xs font-semibold text-blue-600"
                  >
                    Login dengan Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FeedbackForm;
