import Navbar from "../../components/Navbar";
import Head from "next/head";
import Layout from "../../components/Layout";
import { getBlogsData } from "../../utils/blogsApi";
import { getTutorialData } from "../../utils/TutorialApi";
import Link from "next/link";
export async function getStaticProps() {
  const data = getBlogsData();
  const dataTutorial = getTutorialData();
  // console.log(dataTutorial);
  return {
    props: {
      allPost: data.posts,
      allTutorial: dataTutorial.tutorials,
    },
  };
}
const Odb = ({ allPost }) => {
  return (
    <Layout>
      <Head>
        <title>
          Program One Day Before Persiapan Ujian UAS,UTS, dan Ujian Lainnya |
          Bimbel LB3R
        </title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="../image/logolb3r.png"
        />
        <meta
          name="description"
          content="Siswa Bimbel LB3R khususnya kelas reguler dapat mengikuti program ini guna mempersiapkan diri dalam menghadapi ujian. Disebut One Day Before karena les ini diselenggarakan satu hari sebelum ujian"
          key="desc"
        />
      </Head>
      {/* <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" allPost={allPost} /> */}
      <div className="flex justify-center items-center m-auto  md:overflow-hidden mb-5 md:max-w-2xl">
        <div className=" text-gray-900 p-4 overflow-auto md:overflow-hidden">
          <h1 className="rounded-2xl text-lg font-semibold p-4 relative top-0 left-0 bg-gray-900 w-full text-gray-100">
            Ketentuan Kelas ODB
          </h1>
          <table className="mt-6 md:mt-0">
            <thead></thead>
            <tbody>
              <tr>
                <td className="align-top">1.</td>
                <td className="text-justify">
                  Setiap kelas reguler aktif otomatis akan mendapatkan ODB,
                  kecuali jika mengajukan off sementara pada kelas tersebut.
                  (Kelas selain reguler tidak mendapatkan ODB dan bisa bergabung
                  ke kelas reguler jika menginginkan ODB)
                </td>
              </tr>
              <tr>
                <td className="align-top">2.</td>
                <td className="text-justify">
                  Jika kelas dioffkan sementara, maka siswa yang ingin mengikuti
                  program ODB akan digabung dengan kelas lain yang sesuai atau
                  akan tetap diadakan ODB dikelas tersebut jika memenuhi kuota
                  yang ditentukan LB3R. Siswa yang off sementara wajib lapor ke
                  admin agar tidak kena biaya full.
                </td>
              </tr>
              <tr>
                <td className="align-top">3.</td>
                <td className="text-justify">
                  Saat ODB maka jadwal akan berubah dan menyesuaikan jadwal
                  ujian di sekolah
                </td>
              </tr>
              <tr>
                <td className="align-top">4.</td>
                <td className="text-justify">
                  Jumlah jam saat ODB tidak akan seperti biasanya (bisa kurang
                  dari biasanya) dan jika kelas mengambil program ODB artinya
                  sudah sepakat dengan ketentuan ini.
                </td>
              </tr>
              <tr>
                <td className="align-top">5.</td>
                <td className="text-justify">
                  Namun, jika siswa masih menghendaki adanya pemenuhan jumlah
                  jam, maka LB3R akan memfasilitasinya sampai tercapai batas
                  maksimal jam di bulan tersebut.
                </td>
              </tr>
              <tr>
                <td className="align-top">6.</td>
                <td className="text-justify">
                  Kelas yang mengikuti program ODB tetap dikenai biaya full
                  meskipun terjadi perubahan jumlah jam (tidak seperti biasanya)
                </td>
              </tr>
              <tr>
                <td className="align-top">7.</td>
                <td className="text-justify">
                  Tidak semua mata pelajaran akan diadakan ODB, tergantung
                  berbagai faktor (pengajar dll)
                </td>
              </tr>
              <tr>
                <td className="align-top">8.</td>
                <td className="text-justify">
                  Dalam kondisi tertentu, akan dilakukan penggabungan (merge)
                  kelas, misal ketika jumlah kelas ODB melebihi jumlah pengajar
                  yang tersedia.
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
          <Link className="flex items-center justify-end" href="/user/term">
            <p className="text-blue-600">Lihat tata tertib lainnya</p>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Odb;
