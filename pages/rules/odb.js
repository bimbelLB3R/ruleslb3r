import Navbar from '../../components/Navbar';
import Meta from '../../components/Meta';
import Layout from '../../components/Layout';
const Odb = () => {
  return (
    <Layout>
      <Meta />
      <Navbar logoUrl="../../image/logolb3r.png" logoAlt="Logo" />
      <div className="flex justify-center items-center m-auto overflow-scroll md:overflow-hidden mb-10 md:max-w-2xl">
        <div className=" text-gray-900 p-4 overflow-scroll md:overflow-hidden">
          <h1 className="rounded-2xl text-lg font-semibold p-4 relative top-0 left-0 bg-gray-900 w-full text-gray-100 mt-20">
            Ketentuan Kelas ODB
          </h1>
          <table className="mt-12 md:mt-0">
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
        </div>
      </div>
    </Layout>
  );
};

export default Odb;
