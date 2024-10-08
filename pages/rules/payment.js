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
const Payment = ({ allPost }) => {
  return (
    <Layout>
      <Head>
        <title>Tata Cara Pembayaran | Bimbel LB3R</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="../image/logolb3r.png"
        />
        <meta
          name="description"
          content="Pembayaran Les di Bimbel LB3R Tabalong sangat fleksibel."
          key="desc"
        />
      </Head>
      {/* <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" allPost={allPost} /> */}
      <div className="flex justify-center items-center m-auto  md:overflow-hidden mb-5 md:max-w-2xl">
        <div className=" text-gray-900 p-4 overflow-auto md:overflow-hidden">
          <h1 className="rounded-2xl text-lg font-semibold p-4  relative top-0 left-0 bg-gray-900 w-full text-gray-100">
            Ketentuan Pembayaran LB3R
          </h1>
          <table className="mt-6 md:mt-0">
            <thead></thead>
            <tbody>
              <tr>
                <td className="align-top">1.</td>
                <td className="text-justify">
                  Pembayaran di LB3R menggunakan sistem pembayaran bulanan
                </td>
              </tr>
              <tr>
                <td className="align-top">2.</td>
                <td className="text-justify">
                  Batas waktu pembayaran adalah tanggal 15 setiap bulannya
                </td>
              </tr>
              <tr>
                <td className="align-top">3.</td>
                <td className="text-justify">
                  Pembayaran dapat dilakukan secara cash maupun transfer. Untuk
                  transfer kami menyediakan rekening utama Bank BSI Mandiri dan
                  rekening lain (fitur bayar les)
                </td>
              </tr>
              <tr>
                <td className="align-top">4.</td>
                <td className="text-justify">
                  Siswa yang mendaftar les dibawah tanggal 15 akan dikenakan
                  biaya les penuh tanpa potongan dan tanpa tambahan jam belajar.
                  Sedangkan jika siswa mendaftar dan masuk les diatas tanggal 15
                  maka akan disesuaikan dengan keputusan pimpinan LB3R.
                </td>
              </tr>
              <tr>
                <td className="align-top">5.</td>
                <td className="text-justify">
                  Siswa yang masih terdaftar aktif di LB3R akan dikenakan biaya
                  bulanan.
                </td>
              </tr>
              <tr>
                <td className="align-top">6.</td>
                <td className="text-justify">
                  Besarnya biaya pendaftaran Rp 150.000,- per anak (sekali
                  bayar), dan biaya bulanan Rp 225.000,- (Biaya bisa mengalami
                  kenaikan tanpa pemberitahuan).
                </td>
              </tr>
              <tr>
                <td className="align-top">7.</td>
                <td className="text-justify">
                  Setiap kali melakukan pembayaran, siswa wajib membawa kartu
                  SPP yang sudah dibagikan.
                </td>
              </tr>
              <tr>
                <td className="align-top">8.</td>
                <td className="text-justify">
                  Tidak berlaku sistem pembayaran berdasarkan persentase
                  kehadiran, kecuali untuk kelas tertentu.
                </td>
              </tr>
              <tr>
                <td className="align-top">9.</td>
                <td className="text-justify">
                  Pastikan kalian mendapatkan e-kuitansi sebagai bukti
                  elektronik pembayaran
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

export default Payment;
