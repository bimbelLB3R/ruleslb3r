import { Accordion } from 'flowbite-react';
const Faq = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="md:max-w-2xl mb-36 overflow-hidden">
        <Accordion alwaysOpen={true}>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-gray-900">BERAPA BIAYA LES DI LB3R</p>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-900 dark:text-gray-400 text-left">
                Biaya les di LB3R terbilang murah dan mudah. Biaya pendaftaran
                Rp 100.000,- dan biaya bulanannya Rp 185.000,-.
              </p>
              <p className="text-gray-900 dark:text-gray-400 text-left">
                Simak{' '}
                <a
                  href="/rules/payment"
                  className="text-blue-600 hover:underline dark:text-blue-500">
                  sistem pembayaran
                </a>{' '}
                untuk mengetahui secara detail bagaimana melakukan pembayaran di
                LB3R.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-gray-900">MAPEL APA SAJA YANG ADA?</p>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-900 dark:text-gray-400">
                Mata pelajaran di LB3R meliputi Tematik, Matematika, Bahasa
                Idonesia, Bahasa Inggris, IPA, IPS, Biologi, Kimia, Fisika,
                Ekonomi, Geografi, Sejarah dan materi berupa ketrampilan (web
                programming, menggambar,bahasa jepang, bahasa arab, bahasa
                inggris). Disamping itu, level SMA ada materi persiapan masuk
                kampus.
              </p>
              <p className="text-gray-900 dark:text-gray-400">
                Selain itu, ada materi persiapan ujian yang dikemas dalam
                program{' '}
                <a
                  href="/rules/odb"
                  className="text-blue-600 hover:underline dark:text-blue-500">
                  ODB (One Day Before)
                </a>{' '}
                menyesuaikan jadwal ujian di sekolah.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-gray-900">SEMINGGU MASUK BERAPA KALI?</p>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-900 dark:text-gray-400">
                Dalam satu minggu siswa masuk 2-3 kali pertemuan.
              </p>
              <p className="mb-2 text-gray-900 dark:text-gray-400">
                Masing-masing kelas bisa berbeda-beda
              </p>
              <p className="mb-2 text-gray-900 dark:text-gray-400">
                Lebih lengkapnya kalian bisa simak link di bawah ini:
              </p>
              <ul className="list-disc pl-5 text-gray-900 dark:text-gray-400">
                <li>
                  <a
                    href="/rules/kbm"
                    className="text-blue-600 hover:underline dark:text-blue-500">
                    Ketentuan kegiatan belajar
                  </a>
                </li>
                <li>
                  <a
                    href="/rules/newclass"
                    rel="nofollow"
                    className="text-blue-600 hover:underline dark:text-blue-500">
                    Cara membuat kelas baru
                  </a>
                </li>
              </ul>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-gray-900">
                APA KELEBIHAN LB3R DIBANDING BIMBEL LAIN?
              </p>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-900 dark:text-gray-400">
                LB3R merupakan bimbingan belajar yang mengedepankan sikap
                keterbukaan dan fleksibilitas. Kami selalu terbuka berkomunikasi
                dengan siapa saja guna mencapai tujuan bersama.
              </p>
              <p className="mb-2 text-gray-900 dark:text-gray-400">
                Secara khusus, LB3R memiliki fleksibilitas penyusunan jadwal,
                sistem pembayaran, materi belajar dan pembuatan kelas baru.
                Selain itu, LB3R tidak hanya berfokus pada pendidikan akademik,
                tetapi juga Life Skill.
              </p>
              <p className="mb-2 text-gray-900 dark:text-gray-400">
                Kalian bisa cek media sosial kami:
              </p>
              <ul className="list-disc pl-5 text-gray-900 dark:text-gray-400">
                <li>
                  <a
                    href="https://instagram.com/bimbel_lb3r/"
                    rel="nofollow"
                    target="_blank"
                    className="text-blue-600 hover:underline dark:text-blue-500">
                    IG bimbel_LB3R
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/bimbel.lb3r"
                    rel="nofollow"
                    target="_blank"
                    className="text-blue-600 hover:underline dark:text-blue-500">
                    Halaman FB Bimbel LB3R Tabalong
                  </a>
                </li>
              </ul>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-gray-900">KONTAK DAN LOKASI</p>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-900 dark:text-gray-400 text-left">
                LB3R beralamat di Jl. Ir. P. H. M. Noor RT 10 No 24 Sulingan.
                Lokasi di seberang MAN 1 Tanjung. Ada gang masuk sekitar 30
                meter. Alamat email : bimbellb3r@gmail.com
              </p>
              <p className="text-gray-900 dark:text-gray-400 text-left">
                Silahkan kontak{' '}
                <a
                  href="https://wa.me/6285654179908"
                  className="text-blue-600 hover:underline dark:text-blue-500">
                  admin
                </a>{' '}
                untuk melakukan pendaftaran. Jangan lupa siapkan foto bebas
                sebagai lampiran saat melakukan pendaftaran ya...
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <p className="text-gray-900">LOGIN TENTOR</p>
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-900 dark:text-gray-400 text-left">
                Bapak/Ibu tentor LB3R dapat melakukan log in dengan dua cara,
              </p>
              <p className="text-gray-900 dark:text-gray-400 text-left">
                pertama{' '}
                <a
                  href="http://192.168.100.193/aplikasibimbel2/public/data_tentor/"
                  className="text-blue-600 hover:underline dark:text-blue-500">
                  Login Dengan Wifi Di Kantor
                </a>{' '}
                dan kedua{' '}
                <a
                  href="http://069c-2001-448a-6021-28a4-b0b3-a7cb-1227-1162.ngrok.io/aplikasibimbel2/public/data_tentor/"
                  className="text-blue-600 hover:underline dark:text-blue-500">
                  Login Saat Di Rumah
                </a>{' '}
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
