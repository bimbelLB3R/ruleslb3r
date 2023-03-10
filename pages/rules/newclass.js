import Navbar from '../../components/Navbar';

const Newclass = () => {
  return (
    <>
      <Navbar
        logoUrl="../../image/logolb3r.png"
        logoAlt="Logo"
        menuItems={[
          { label: 'Kembali ke Home', url: '/' },
          { label: 'Sistem Pembayaran & Biaya', url: '/rules/payment' },
          { label: 'Aturan One Day Before', url: '/rules/odb' },
          { label: 'Ketentuan Kegiatan Belajar', url: '/rules/kbm' },
          { label: 'Ketentuan Berhenti Belajar', url: '/rules/off' },
        ]}
      />
      <div className="flex justify-center items-center m-auto overflow-scroll mb-20 md:max-w-2xl">
        <div className="bg-gray-400 text-gray-900 p-4 overflow-scroll">
          <h1 className=" text-lg font-semibold p-4 fixed z-50 md:relative top-0 left-0 bg-gray-900 w-full text-gray-100">
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
    </>
  );
};

export default Newclass;
