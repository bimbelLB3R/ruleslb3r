import Navbar from '../../components/Navbar';
import Meta from '../../components/Meta';
import Layout from '../../components/Layout';
const Off = () => {
  return (
    <Layout>
      <Meta />
      <Navbar logoUrl="../../image/logolb3r.png" logoAlt="Logo" />
      <div className="flex justify-center items-center m-auto overflow-scroll mb-10 md:max-w-2xl">
        <div className="bg-gray-400 text-gray-900 p-4 overflow-scroll">
          <h1 className=" text-lg font-semibold p-4 relative top-0 left-0 bg-gray-900 w-full text-gray-100">
            Ketentuan Berhenti Les LB3R
          </h1>
          <table className="mt-12 md:mt-0">
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
        </div>
      </div>
    </Layout>
  );
};

export default Off;
