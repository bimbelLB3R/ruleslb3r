import Link from "next/link";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import { getBlogsData } from "../../utils/blogsApi";
import { getTutorialData } from "../../utils/TutorialApi";
import "animate.css";
import Head from "next/head";

export async function getStaticProps() {
  const data = getBlogsData();
  const dataTutorial = getTutorialData();
  // console.log(dataTutorial);
  return {
    props: {
      allPost: data.posts,
      allTutorial: dataTutorial.tutorials,
    },
  };
}
export default function Term({ allPost }) {
  return (
    <div>
      <Head>
        <title>Tata Tertib LB3R</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Selamat telah menjadi bagian keluarga bimbel LB3R. Agar lebih nyaman , yuk kenali LB3R!"
          key="desc"
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://raw.githubusercontent.com/bimbelLB3R/ruleslb3r/main/public/image/image1.webp"
        />
      </Head>
      <Navbar allPost={allPost} />
      <Layout>
        <div className="flex items-center justify-center md:max-w-2xl m-auto h-screen animate__animated  animate__slideInDown">
          <div className="m-4 text-center">
            <h1 className="font-semibold text-slate-600 mb-5 ">
              TATA TERTIB & KETENTUAN
            </h1>
            <Link href="/rules/newclass">
              <p className="text-slate-600 hover:text-slate-900 border border-orange-600 rounded p-2 mb-2">
                Cara Membuat Kelas Baru
              </p>
            </Link>
            <Link href="/rules/payment">
              <p className="text-slate-600 hover:text-slate-900 border border-orange-600 rounded p-2 mb-2">
                Cara Melakukan Pembayaran
              </p>
            </Link>
            <Link href="/rules/kbm">
              <p className="text-slate-600 hover:text-slate-900 border border-orange-600 rounded p-2 mb-2">
                Tata Tertib KBM
              </p>
            </Link>
            <Link href="/rules/odb">
              <p className="text-slate-600 hover:text-slate-900 border border-orange-600 rounded p-2 mb-2">
                Apa itu One Day Before
              </p>
            </Link>
            <Link href="/rules/off">
              <p className="text-slate-600 hover:text-slate-900 border border-orange-600 rounded p-2 mb-2">
                Off Sementara, Tentu Bisa
              </p>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}
