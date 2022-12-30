import Navbar from '../../components/Navbar';

const Payment = () => {
  return (
    <>
      <Navbar
        logoUrl="../../image/logolb3r.png"
        logoAlt="Logo"
        menuItems={[
          { label: 'Kembali ke Home', url: '/' },
          { label: 'Cara Membuat Kelas Baru', url: '/rules/newclass' },
          { label: 'Aturan One Day Before', url: '/rules/odb' },
          { label: 'Ketentuan Kegiatan Belajar', url: '/rules/kbm' },
          { label: 'Ketentuan Berhenti Belajar', url: '/rules/off' },
        ]}
      />
      <div className="flex justify-center items-center m-auto overflow-scroll mb-20 md:max-w-2xl">
        <div className="bg-gray-400 text-gray-900 p-4 overflow-scroll">
          <h1 className=" text-lg font-semibold p-4 fixed z-50 md:relative top-0 left-0 bg-gray-900 w-full text-gray-100">
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
                  transfer kami hanya menyediakan satu rekening Bank BSI Mandiri
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
                  Besarnya biaya pendaftaran Rp 100.000,- per anak (sekali
                  bayar), dan biaya bulanan Rp 185.000,- (Biaya bisa mengalami
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
    </>
  );
};

export default Payment;
