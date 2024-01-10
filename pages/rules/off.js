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
const Off = ({ allPost }) => {
  return (
    <Layout>
      <Head>
        <title>Tata Cara Berhenti Les DI Bimbel LB3R | Bimbel LB3R</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Siswa Bimbel LB3R tidak perlu khawatir jika ingin berhenti atau off sementara dan kemudian nanti lanjut les bulan berikutnya."
          key="desc"
        />
      </Head>
      {/* <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" allPost={allPost} /> */}
      <div className="flex justify-center items-center m-auto  md:overflow-hidden mb-5 md:max-w-2xl">
        <div className=" text-gray-900 p-4 overflow-auto md:overflow-hidden">
          <h1 className="rounded-2xl text-lg font-semibold p-4 relative top-0 left-0 bg-gray-900 w-full text-gray-100">
            Ketentuan Berhenti Les LB3R
          </h1>
          <table className="mt-6 md:mt-0">
            <thead></thead>
            <tbody>
              <tr>
                <td className="align-top">1.</td>
                <td className="text-justify">
                  Siswa wajib lapor ke admin bahwa akan berhenti les di LB3R,
                  baik melalui WA atau langsung ke admin
                </td>
              </tr>
              <tr>
                <td className="align-top">2.</td>
                <td className="text-justify">
                  Sebelum berhenti siswa wajib menyelesaikan biaya yang belum
                  dibayarkan. Tanyakan ke admin apakah masih ada biaya yang
                  perlu diselesaikan
                </td>
              </tr>
              <tr>
                <td className="align-top">3.</td>
                <td className="text-justify">
                  Siswa yang ingin berhenti wajib lapor satu bulan sebelumnya
                  sehingga tidak terkena biaya di bulan berikutnya. Jika
                  berhenti diawal, tengah atau akhir bulan, siswa akan dikenai
                  biaya penuh.
                </td>
              </tr>
              <tr>
                <td className="align-top">4.</td>
                <td className="text-justify">
                  Siswa dapat berhenti sementara atau berhenti permanen. Jika
                  berhenti sementara, siswa dapat lanjut les kapan saja tanpa
                  dikenai biaya pendaftaran kembali. Cukup menyebutkan nama dan
                  data akan diaktifkan kembali
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

export default Off;
