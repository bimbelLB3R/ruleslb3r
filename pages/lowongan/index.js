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
        <Image
          src="/image/lowongan.jpg"
          width={540}
          height={960}
          alt="lowongan"
          className="mt-10"
        />
      </Layout>
    </>
  );
}
