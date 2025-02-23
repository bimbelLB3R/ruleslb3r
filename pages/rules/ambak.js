import Head from "next/head";
import Layout from "../../components/Layout";
import { getBlogsData } from "../../utils/blogsApi";
import { getTutorialData } from "../../utils/TutorialApi";
import Link from "next/link";

export async function getStaticProps() {
  const data = getBlogsData();
  const dataTutorial = getTutorialData();
  return {
    props: {
      allPost: data.posts,
      allTutorial: dataTutorial.tutorials,
    },
  };
}

const AMBAK_LIST = [
  {
    id: 1,
    text: (
      <>
        Kamu boleh ajak teman buat ikut{" "}
        <Link href="/rules/odb">
          <span className="text-blue-600">kelas ODB</span>
        </Link>{" "}
        secara GRATIS selama kuota tersedia. ODB (One Day Before) merupakan les
        untuk persiapan ujian sekolah dan biasanya jadwal menyesuaikan jadwal
        ujian di sekolah. ODB dilaksanakan H-1 sebelum ujian.
      </>
    ),
  },
  {
    id: 2,
    text: (
      <>
        <Link href="/rules/off">
          <span className="text-blue-600">Off sementara</span>
        </Link>{" "}
        dan lanjut les lagi bulan depan. Bagi para organisatoris (OSIS,
        Pramuka, Paskibra, dll), ketika kamu les dan ada agenda besar di
        sekolah, kamu bisa ajukan off sementara.
      </>
    ),
  },
  { id: 3, text: "Lebih efektif belajar bersama teman dari sekolah/kelas yang sama." },
  { id: 4, text: "Belajar tepat sasaran menggunakan buku paket/modul sekolah masing-masing." },
  { id: 5, text: "Memilih jam belajar siang atau malam atau akhir pekan agar tidak bentrok dengan kegiatan ekskul di sekolah." },
  { id: 6, text: "Request tentor untuk bimbingan olimpiade atau lomba." },
  { id: 7, text: "Kontrol pembayaran ada di tangan kamu karena sistem pembayaran bulanan." },
  { id: 8, text: "Update data kehadiran dan tracking pembayaranmu." },
  { id: 9, text: "Konsultasi kendala belajar dengan pengajar favoritmu." },
  { id: 10, text: "Kamu bisa memberikan rating kepada pengajar untuk menilai performanya." },
  { id: 11, text: "Reservasi lebih awal dan dapatkan keuntungan bebas kenaikan harga." },
  { id: 12, text: "Dapatkan Sesi Konsultasi Eksklusif bagi peserta SNBT untuk penentuan jurusan berdasarkan bakat dan minat." },
  { id: 13, text: "Kerjakan tugas kelompok dari sekolah dengan request admin untuk menyediakan pengajar guna membantu menyelesaikan tugas kelompokmu GRATIS (S&K)." },
  { id: 14, text: "Program Hybrid, yaitu kamu bisa ikut kelas reguler dan privat sekaligus." },
];

const Odb = ({ allPost }) => {
  return (
    <Layout>
      <Head>
        <title>Benefit belajar di LB3R</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/image/logolb3r.png" />
        <meta
          name="description"
          content="Sebagai siswa LB3R kamu akan mendapatkan benefit yang tidak kamu temukan di tempat lain..."
          key="desc"
        />
      </Head>

      <div className="flex justify-center items-center m-auto mb-5 md:max-w-2xl">
        <div className="text-gray-900 p-4 overflow-auto">
          <h1 className="rounded-2xl text-lg font-semibold p-4 bg-gray-900 w-full text-gray-100">
            Apa Manfaat Bagiku (AMBAK)?
          </h1>
          <table className="mt-6">
            <tbody>
              {AMBAK_LIST.map((item) => (
                <tr key={item.id}>
                  <td className="align-top pr-2">{item.id}.</td>
                  <td>{item.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Odb;
