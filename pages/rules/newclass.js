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
const Newclass = ({ allPost }) => {
  return (
    <Layout>
      <Head>
        <title>Cara Membuat Kelas Baru Di LB3R | Bimbel LB3R</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Siswa dapat membuat kelas sendiri bersama dengan teman satu sekolah atau satu kelas agar suasana belajar lebih nyaman."
          key="desc"
        />
      </Head>
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" allPost={allPost} />
      <div className="flex justify-center items-center m-auto overflow-scroll md:overflow-hidden mb-5 md:max-w-2xl">
        <div className=" text-gray-900 p-4 overflow-scroll md:overflow-hidden">
          <h1 className="rounded-2xl text-lg font-semibold p-4 relative top-0 left-0 bg-gray-900 w-full text-gray-100 mt-20">
            Ketentuan Kelas Baru LB3R
          </h1>
          <table className="mt-12 md:mt-0">
            <thead></thead>
            <tbody>
              <tr>
                <td className="align-top">1.</td>
                <td className="text-justify">
                  Siswa yang baru mendaftar bisa membuat kelas sendiri (Selama
                  Kuota masih tersedia)
                </td>
              </tr>
              <tr>
                <td className="align-top">2.</td>
                <td className="text-justify">
                  Jumlah minimum siswa tiap kelas adalah 3 anak atau 5 anak per
                  kelas (semua siswa baru)
                </td>
              </tr>
              <tr>
                <td className="align-top">3.</td>
                <td className="text-justify">
                  Disarankan siswa berasal dari sekolah yang sama
                </td>
              </tr>
              <tr>
                <td className="align-top">4.</td>
                <td className="text-justify">
                  Jika jumlah siswa tidak memenuhi batas minimal, maka siswa
                  yang baru mendaftar tersebut akan di gabung dengan kelas yang
                  ada atau diberi alternatif lain sesuai arahan pimpinan LB3R.
                </td>
              </tr>
              <tr>
                <td className="align-top">5.</td>
                <td className="text-justify">
                  Siswa dapat mengajak teman sekelas atau satu sekolah untuk
                  bergabung di kelas barunya
                </td>
              </tr>
              <tr>
                <td className="align-top">6.</td>
                <td className="text-justify">
                  Pihak LB3R dapat menambah siswa di kelas yang belum mencapai
                  batas maksimal (10 anak).
                </td>
              </tr>
              <tr>
                <td className="align-top">7.</td>
                <td className="text-justify">
                  Kelas yang tidak memenuhi kuota minimal, maka jumlah jam
                  belajar akan disesuaikan kembali
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

export default Newclass;
