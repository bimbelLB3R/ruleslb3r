import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
export default function Lowongan() {
  return (
    <>
      <Head>
        <title>Lowongan Pengajar</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Lowongan guru freelance."
          key="desc"
        />
      </Head>
      <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" />
      <Layout>
        <div className=" md:justify-center md:flex md:space-x-4">
          <Image
            src="/image/lowongan.jpg"
            width={540}
            height={960}
            alt="lowongan"
            className="mt-10 shadow-xl shadow-gray-500 mb-2"
          />
          <div className="mt-10 md:mt-20 p-4">
            <h1 className="font-semibold">Ketentuan</h1>
            <ul>
              <li>
                1. Bersedia bekerjasama minimal satu tahun ajaran sampai selesai
              </li>
              <li>
                2. Mengirimkan berkas berupa Surat Lamaran Kerja, Biodata Diri,
                Ijazah dan transkrip Nilai ke bimbellb3r@gmail.com
              </li>
              <li>3. Hal lain dibicarakan saat wawancara</li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}
