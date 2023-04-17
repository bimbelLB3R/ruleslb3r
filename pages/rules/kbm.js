import Navbar from '../../components/Navbar';
import Meta from '../../components/Meta';
import Layout from '../../components/Layout';

const Kbm = () => {
  return (
    <>
      <Meta />
      <Navbar logoUrl="../../image/logolb3r.png" logoAlt="Logo" />
      <Layout>
        <div className="flex justify-center items-center m-auto overflow-scroll xl:overflow-auto mb-10 md:max-w-2xl">
          <div className="bg-gray-400 text-gray-900 p-4 overflow-scroll xl:overflow-auto">
            <h1 className=" text-lg font-semibold p-4 relative top-0 left-0 bg-gray-900 w-full text-gray-100">
              Ketentuan Kegiatan Belajar
            </h1>
            <table className="mt-12 md:mt-0">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">1.</td>
                  <td className="text-justify">
                    Siswa belajar 2-3 pertemuan per pekan dengan waktu 60 menit
                    per pertemuan
                  </td>
                </tr>
                <tr>
                  <td className="align-top">2.</td>
                  <td className="text-justify">
                    Siswa belajar sesuai dengan jadwal yang sudah disepakati dan
                    dapat mengajukan permintaan untuk mata pelajaran tertentu
                    sesuai peraturan yang berlaku di LB3R
                  </td>
                </tr>
                <tr>
                  <td className="align-top">3.</td>
                  <td className="text-justify">
                    Permintaan perubahan jam akan di respon jika siswa meminta
                    sebelum jam 12 siang di hari tersebut. Diatas jam itu, maka
                    jadwal sudah tidak dapat dirubah lagi.
                  </td>
                </tr>
                <tr>
                  <td className="align-top">4.</td>
                  <td className="text-justify">
                    Permintaan perubahan jam harus memiliki alasan yang jelas
                    dan disepakati oleh seluruh siswa di dalam kelas tersebut
                    (tidak boleh permintaan satu atau beberapa orang saja)
                  </td>
                </tr>
                <tr>
                  <td className="align-top">5.</td>
                  <td className="text-justify">
                    Perubahan jadwal harus menyesuaikan dengan ketersediaan
                    pengajar
                  </td>
                </tr>
                <tr>
                  <td className="align-top">6.</td>
                  <td className="text-justify">
                    Materi belajar di kelas menyesuaikan dengan permintaan siswa
                    (sesuai kebutuhan siswa)
                  </td>
                </tr>
                <tr>
                  <td className="align-top">7.</td>
                  <td className="text-justify">
                    Setiap kali belajar, siswa diharapkan membawa buku atau
                    bahan ajar sesuai dengan yang ingin dipelajari. Hal itu
                    disebabkan LB3R tidak menyediakan modul khusus. Namun, jika
                    siswa tidak memiliki bahan belajar, materi akan disesuaikan
                    dengan apa yang dipelajari di sekolahnya.
                  </td>
                </tr>
                <tr>
                  <td className="align-top">8.</td>
                  <td className="text-justify">
                    Karena keterbatasan waktu, maka siswa diberi kesempatan
                    untuk bertanya langsung kepada pengajar LB3R melalui
                    whatsapp.
                  </td>
                </tr>
                <tr>
                  <td className="align-top">9.</td>
                  <td className="text-justify">
                    Siswa yang terlambat datang tidak akan mendapatkan tambahan
                    waktu, sedangkan jika pengajar terlambat datang maka siswa
                    berhak mengajukan tambahan jam di hari yang sama atau
                    diwaktu lain di minggu atau bulan yang sama. Ingat, jam
                    pengganti tidak bisa diakumulasi di bulan berikutnya.
                  </td>
                </tr>
                <tr>
                  <td className="align-top">10.</td>
                  <td className="text-justify">
                    Sebelum masuk kelas, siswa wajib mengisi presensi
                    menggunakan QRCODE masing-masing atau secara manual dengan
                    menyebutkan nomor induknya
                  </td>
                </tr>
                <tr>
                  <td className="align-top">11.</td>
                  <td className="text-justify">
                    Siswa diperbolehkan mengejar ketertinggalan materi dengan
                    masuk di kelas lain atas ijin kelas yang bersangkutan. Siswa
                    seperti ini tidak perlu mengisi presensi.
                  </td>
                </tr>
                <tr>
                  <td className="align-top">12.</td>
                  <td className="text-justify">
                    Siswa tidak diijinkan pindah dari satu kelas ke kelas lain
                    (kelasnya berubah).
                  </td>
                </tr>
                <tr>
                  <td className="align-top">13.</td>
                  <td className="text-justify">
                    Jumlah siswa maksimal per kelas adalah 10 anak. Namun, jika
                    siswa di suatu kelas menghendaki adanya penambahan siswa
                    maka diperbolehkan selama tidak menggangu KBM.
                  </td>
                </tr>
                <tr>
                  <td className="align-top">14.</td>
                  <td className="text-justify">
                    LB3R dapat menambah siswa ke kelas tertentu dengan atau
                    tanpa persetujuan kelas tersebut jika kuota masih dibawah 10
                    siswa.
                  </td>
                </tr>
                <tr>
                  <td className="align-top">15.</td>
                  <td className="text-justify">
                    LB3R dapat menutup kelas tertentu yang tidak memenuhi syarat
                    yang ditentukan LB3R
                  </td>
                </tr>
                <tr>
                  <td className="align-top">16.</td>
                  <td className="text-justify">
                    Kami akan selalu menghubungi siswa yang tidak masuk les,
                    mohon di respon ya..
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Kbm;
