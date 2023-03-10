import Navbar from '../../components/Navbar';

const Odb = () => {
  return (
    <>
      <Navbar
        logoUrl="../../image/logolb3r.png"
        logoAlt="Logo"
        menuItems={[
          { label: 'Kembali ke Home', url: '/' },
          { label: 'Cara Membuat Kelas Baru', url: '/rules/newclass' },
          { label: 'Sistem Pembayaran & Biaya', url: '/rules/payment' },
          { label: 'Ketentuan Kegiatan Belajar', url: '/rules/kbm' },
          { label: 'Ketentuan Berhenti Belajar', url: '/rules/off' },
        ]}
      />
      <div className="flex justify-center items-center m-auto overflow-scroll mb-20 md:max-w-2xl">
        <div className="bg-gray-400 text-gray-900 p-4 overflow-scroll">
          <h1 className=" text-lg font-semibold p-4 fixed z-50 md:relative top-0 left-0 bg-gray-900 w-full text-gray-100">
            Ketentuan Kelas ODB
          </h1>
          <table className="mt-12 md:mt-0">
            <thead></thead>
            <tbody>
              <tr>
                <td className="align-top">1.</td>
                <td className="text-justify">
                  Setiap kelas aktif otomatis akan mendapatkan ODB, kecuali jika
                  mengajukan off sementara pada kelas tersebut
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
    </>
  );
};

export default Odb;
