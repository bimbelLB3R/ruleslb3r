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
      const kelasUser = cekEmailUser.kelas_user;
      const jadwalSesuaiKelasUser = rows.filter(
        (row) => row.kelas_jadwal === `${kelasUser}`
      );
      // setKelasUserState(kelasUser);
      // console.log(jadwalSesuaiKelasUser);
      if (!jadwalSesuaiKelasUser) {
        setDataJadwal(jadwalSesuaiKelasUser);
        setIsLoading(false);
      } else {
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
    }
  };

  const handleSubmit = (jadwalId) => {
    const jadwalName = dataJadwal.find(
      (jadwal) => jadwal.id_jadwal === jadwalId
    ).pengajar_jadwal;
    // Validasi apakah pengguna memberikan penilaian sebelum mengirimkan data
    if (ratings[jadwalId] !== undefined) {
      // Kirim rating ke server atau lakukan tindakan lainnya.
      console.log(`${jadwalName}'s Rating:`, ratings[jadwalId]);
      setSubmitted({ ...submitted, [jadwalId]: true });
    } else {
      alert(`Anda belum memberikan penilaian untuk ${jadwalName}`);
    }
  };

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
                          disabled={submitted[daJal.id_jadwal]}
                        />
                        <button
                          type="submit"
                          disabled={submitted[daJal.id_jadwal]}
                        >
                          {submitted[daJal.id_jadwal] ? "Terkirim" : "Kirim"}
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
