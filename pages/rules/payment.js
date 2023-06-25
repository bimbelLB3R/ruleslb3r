import Navbar from "../../components/Navbar";
import Head from "next/head";
import Layout from "../../components/Layout";
import { getBlogsData } from "../../utils/blogsApi";
import { getTutorialData } from "../../utils/TutorialApi";
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
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Pembayaran Les di Bimbel LB3R Tabalong sangat fleksibel."
          key="desc"
        />
      </Head>
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" allPost={allPost} />
      <div className="flex justify-center items-center m-auto overflow-scroll md:overflow-hidden mb-5 md:max-w-2xl">
        <div className=" text-gray-900 p-4 overflow-scroll md:overflow-hidden">
          <h1 className="rounded-2xl text-lg font-semibold p-4  relative top-0 left-0 bg-gray-900 w-full text-gray-100 mt-20">
            Ketentuan Pembayaran LB3R
          </h1>
          <table className="mt-12 md:mt-0">
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
                  transfer kami hanya menyediakan rekening Bank BSI Mandiri atau
                  QRIS
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
                  bayar), dan biaya bulanan Rp 195.000,- (Biaya bisa mengalami
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
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
