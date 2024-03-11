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
    const rows = await sheet1.getRows(); //data jadwal
    const rows2 = await sheet2.getRows(); //data siswa
    // setDataJadwal(jadwalSesuaiEmail);
    // setDataSiswa(rows2);
    // console.log(email_user);
    if (session) {
      const cekEmailUser = rows2.find(
        (row) => row.email_user === `${session.user.email}`
      ); //penulisan row.name , name nya harus sama dengan di google sheet name
      if (!cekEmailUser) {
        Swal.fire({
          title: "Email Kamu belum terdaftar, coba email lain?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Ya",
          denyButtonText: `Tidak`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            handleSignIn();
          } else if (result.isDenied) {
            router.push("/");
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
        (row) => row.kelas_jadwal === `${kelasUser}`
      );
      // setKelasUserState(kelasUser);
      // console.log(jadwalSesuaiKelasUser);
      setDataJadwal(jadwalSesuaiKelasUser);
      setKelasSiswa(kelasUser);
      setTanggalJadwal(tanggalJadwalSiswa);
      setIsLoading(false);
    }
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
      localStorage.setItem(`rating_${jadwalId}`, JSON.stringify(dataToStore));
    }
  };

  // kirim ke spreadsheet
  const appendSpreadsheet = async (newRow) => {
    // console.log(newRow);
    try {
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
      alert("data terkirim");
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

  // HAPUS SEMUA DATA LOCAL STORAGE SETELAH 6 JAM
  useEffect(() => {
    // Set waktu saat ini
    const currentTime = new Date().getTime();
    // Set waktu kedaluwarsa (6 jam setelah saat ini)
    const expirationTime = currentTime + 6 * 60 * 60 * 1000; // 6 jam dalam milidetik

    // Simpan waktu kedaluwarsa di local storage
    localStorage.setItem("expirationTime", expirationTime.toString());
  }, []); // Efek ini hanya dijalankan saat komponen dimuat

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
      <div className=" mt-20">
        {session ? (
          <div>
            <h2 className="text-center font-bold uppercase">Beri Penilaian</h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-screen m-auto">
                <Loader />
              </div>
            ) : (
              <div>
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
                          <Image
                            src="/image/image1.webp"
                            width={100}
                            height={100}
                            alt="Pengajar"
                            className="rounded-full"
                            priority
                          />
                          <p className="text-center">{daJal.pengajar_jadwal}</p>
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
                <div className="flex items-center justify-center m-6">
                  <div className="flex items-center justify-center">
                    <table class="table-auto w-full border-collapse border border-gray-900">
                      <thead>
                        <tr class="bg-gray-900 text-white">
                          <th class="px-4 py-2">No</th>
                          <th class="px-4 py-2">Indikator Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-gray-100 hover:bg-gray-200">
                          <td class="border px-4 py-2">1</td>
                          <td class="border px-4 py-2">
                            Kamu paham apa yang diajarkan oleh guru
                          </td>
                        </tr>
                        <tr class="bg-gray-100 hover:bg-gray-200">
                          <td class="border px-4 py-2">2</td>
                          <td class="border px-4 py-2">
                            Kamu suka dengan cara guru menyampaikan materi
                          </td>
                        </tr>
                        <tr class="bg-gray-100 hover:bg-gray-200">
                          <td class="border px-4 py-2">3</td>
                          <td class="border px-4 py-2">
                            Kamu merasa terbantu oleh guru
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center h-screen m-auto p-6 max-w-sm">
              <div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/image/image1.webp"
                    width={100}
                    height={100}
                    alt="Pengajar"
                    className="rounded-full"
                    priority
                  />
                </div>
                <p className="text-center">
                  Silahkan kamu login terlebih dahulu. Gunakan email seperti
                  email yang kamu pakai saat mendaftar di LB3R
                </p>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    name="loginGoogle"
                    // onClick={() => signIn()}
                    onClick={handleSignIn}
                    className="underline  bg-slate-900   text-slate-50 px-3 py-3 rounded-xl"
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
