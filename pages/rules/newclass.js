import Navbar from '../../components/Navbar';
import Head from 'next/head';
import Layout from '../../components/Layout';
const Newclass = () => {
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
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" />
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
                  Siswa yang baru mendaftar bisa membuat kelas sendiri.
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
        </div>
      </div>
    </Layout>
  );
};

export default Newclass;
