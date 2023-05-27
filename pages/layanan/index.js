import Link from 'next/link';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
export default function Layanan() {
  return (
    <>
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" />
      <Layout>
        <div className="flex items-center justify-center">
          <p className="mt-20 font-bold text-[20px] text-blue-600 uppercase">
            Program Bimbel LB3R
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="lg:flex overflow-scroll">
            {/* card 1 */}
            <div className="card m-4 p-10 md:p-5 border border-slate-300 w-[400px] h-[500px]">
              <p className="font-semibold text-slate-800 tracking-wider">
                Program Reguler
              </p>
              <div className="flex items-center justify-center">
                <div>
                  <p className="text-[40px] md:text-[30px] font-bold mt-10">
                    Rp 185.000,-
                  </p>
                  <p className="text-center">Per Bulan</p>
                </div>
              </div>
              <ul className="leading-normal  p-3 text-slate-600">
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Masuk 2-3 kali dalam seminggu</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Biaya Pendaftaran 150.000</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Mendapatkan Layanan ODB</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Free Konsultasi dengan tentor favorit</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Laporan Kehadiran dan Pembayaran </p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Laporan Perkembangan Materi dan Review </p>
                </li>
              </ul>
              <Link href="/form/newmember">
                <div className="bg-blue-500 hover:bg-blue-600 mt-5 flex items-center space-x-3 justify-center">
                  <p className="text-center font-semibold p-2 text-slate-50">
                    DAFTAR SEKARANG
                  </p>
                  <div className="text-slate-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-arrow-right"
                      viewBox="0 0 16 16">
                      <path
                        fillRrule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
            {/* card 2 */}
            <div className="card m-4 p-10 md:p-5 border border-slate-300 bg-fuchsia-500 w-[400px] h-[500px]">
              <p className="font-semibold text-slate-800 tracking-wider">
                Program UTBK SNBT
              </p>
              <div className="flex items-center justify-center">
                <div>
                  <p className="text-[40px] md:text-[30px] font-bold mt-10">
                    Rp 1.000.000,-
                  </p>
                  <p className="text-center">sekali bayar</p>
                </div>
              </div>
              <ul className="leading-normal  p-3 text-slate-200">
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Masuk tiap hari selama satu bulan</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Durasi waktu 2 jam per hari</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Mendapatkan FC Soal</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Pembahasan langsung di kelas</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Konsultasi Pemilihan Jurusan </p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Free T-Shirt senilai 100.000 bagi yang lolos SNBT </p>
                </li>
              </ul>
              <Link href="/form/newmember">
                <div className="bg-blue-500 hover:bg-blue-600 mt-5 flex items-center space-x-3 justify-center">
                  <p className="text-center font-semibold p-2 text-slate-50">
                    DAFTAR SEKARANG
                  </p>
                  <div className="text-slate-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-arrow-right"
                      viewBox="0 0 16 16">
                      <path
                        fillRrule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
            {/* Card 3 */}
            <div className="card m-4 p-10 md:p-5 border border-slate-300 w-[400px] h-[500px]">
              <p className="font-semibold text-slate-800 tracking-wider">
                Program Privat
              </p>
              <div className="flex items-center justify-center">
                <div>
                  <p className="text-[40px] md:text-[30px] font-bold mt-10">
                    Rp 200.000,-
                  </p>
                  <p className="text-center">deposit awal</p>
                </div>
              </div>
              <ul className="leading-normal  p-3 text-slate-600">
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Biaya pendaftaran 150.000</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Waktu, jumlah pertemuan dan mapel sesuai kesepakatan</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Biaya per pertemuan mulai 35.000</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Lebih fokus dalam belajar</p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Free Konsultasi langsung ke pengajar </p>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                  <p>Kelas nyaman dan kondusif </p>
                </li>
              </ul>
              <Link href="/form/newmember">
                <div className="bg-blue-500 hover:bg-blue-600 mt-5 flex items-center space-x-3 justify-center">
                  <p className="text-center font-semibold p-2 text-slate-50">
                    DAFTAR SEKARANG
                  </p>
                  <div className="text-slate-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-arrow-right"
                      viewBox="0 0 16 16">
                      <path
                        fillRrule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
