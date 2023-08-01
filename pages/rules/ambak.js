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
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Siswa Bimbel LB3R khususnya kelas reguler dapat mengikuti program ini guna mempersiapkan diri dalam menghadapi ujian. Disebut One Day Before karena les ini diselenggarakan satu hari sebelum ujian"
          key="desc"
        />
      </Head>
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" allPost={allPost} />
      <div className="flex justify-center items-center m-auto overflow-scroll md:overflow-hidden mb-5 md:max-w-2xl">
        <div className=" text-gray-900 p-4 overflow-scroll md:overflow-hidden">
          <h1 className="rounded-2xl text-lg font-semibold p-4 relative top-0 left-0 bg-gray-900 w-full text-gray-100 mt-[100x]">
            Apa Manfaat Bagiku (AMBAK) ?
          </h1>
          <table className="mt-6 md:mt-0">
            <thead></thead>
            <tbody>
              <tr>
                <td className="align-top">1.</td>
                <td className="text-justify">
                  Kamu boleh ajak teman buat ikut{" "}
                  <Link href="/rules/odb">
                    <span className=" text-blue-600">kelas ODB </span>
                  </Link>
                  secara GRATIS selama kuota tersedia.
                </td>
              </tr>
              <tr>
                <td className="align-top">2.</td>
                <td className="text-justify">
                  <Link href="/rules/odb">
                    <span className=" text-blue-600">Off sementara </span>
                  </Link>{" "}
                  dan lanjut les lagi bulan depan
                </td>
              </tr>
              <tr>
                <td className="align-top">3.</td>
                <td className="text-justify">
                  Lebih efektif belajar bersama teman dari sekolah/kelas yang
                  sama
                </td>
              </tr>
              <tr>
                <td className="align-top">4.</td>
                <td className="text-justify">
                  Belajar tepat sasaran menggunakan buku paket/modul sekolah
                  masing-masing
                </td>
              </tr>
              <tr>
                <td className="align-top">5.</td>
                <td className="text-justify">
                  Memilih jam belajar siang atau malam (untuk mapel tertentu)
                </td>
              </tr>
              <tr>
                <td className="align-top">6.</td>
                <td className="text-justify">
                  Request tentor untuk bimbingan olimpiade atau lomba
                </td>
              </tr>
              <tr>
                <td className="align-top">7.</td>
                <td className="text-justify">
                  Up date ketertinggalan materi dan review materi tiap bulannya
                </td>
              </tr>
              <tr>
                <td className="align-top">8.</td>
                <td className="text-justify">
                  Up date data kehadiran dan tracking pembayaranmu
                </td>
              </tr>
              <tr>
                <td className="align-top">9.</td>
                <td className="text-justify">
                  Konsultasi kendala belajar dengan pengajar favoritmu
                </td>
              </tr>
              <tr>
                <td className="align-top">10.</td>
                <td className="text-justify">
                  Reward bagi kamu yang dapat menyelesaikan tantangan bulanan
                  dari pengajar
                </td>
              </tr>
              <tr>
                <td className="align-top">11.</td>
                <td className="text-justify">
                  Reservasi lebih awal dan dapatkan keuntungan bebas kenaikan
                  harga
                </td>
              </tr>
              <tr>
                <td className="align-top">12.</td>
                <td className="text-justify">
                  Dapatkan Free T-Shirt untuk siswa yang lolos UTBK SNBT
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Odb;
