import Link from "next/link";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Wa from "../../components/Wa";
import { getProgramsData } from "../../utils/layananApi";
import "animate.css";
import Head from "next/head";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getBlogsData } from "../../utils/blogsApi";
import { getTutorialData } from "../../utils/TutorialApi";
import Image from "next/image";
// mengubah mata uang
function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export async function getStaticProps() {
  const data = getProgramsData();
  const data2 = getBlogsData();
  const dataTutorial = getTutorialData();

  // console.log(data);
  return {
    props: {
      allProgram: data.programs,
      allPost: data2.posts,
      allTutorial: dataTutorial.tutorials,
    },
  };
}

export default function Layanan({ allProgram, allPost, allTutorial }) {
  // console.log(allPost);

  return (
    <>
      <Head>
        <title>Program Bimbel LB3R</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Program apa yang sedang kalian butuhkan?Yuk cek disini!"
          key="desc"
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://raw.githubusercontent.com/bimbelLB3R/ruleslb3r/main/public/image/image1.webp"
        />
      </Head>
      <Wa />
      {/* <Navbar logoUrl="/image/logolb3r.png" logoAlt="Logo" allPost={allPost} /> */}
      <Layout>
      <div className="flex items-center justify-center bg-gradient-to-b from-purple-800  to-purple-500 md:p-[100px]">
      <div className="md:max-w-2xl  overflow-hidden">
        <Carousel showArrows={true}
            showThumbs={false}
            autoPlay={false}
            infiniteLoop={true}>
            {allProgram.map((program, index) => (
              <div
                key={index}
                className={`card bg-gradient-to-b from-purple-600 drop-shadow-lg p-5   ${
                  (program.keterangan === "Best Seller" &&
                    "bg-gradient-to-b from-amber-500/50") ||
                  (program.keterangan === "Free/Gratis" &&
                    "bg-gradient-to-b from-gray-500/50")
                }`}
              >
                <Image src="/image/image9.png"
                alt="Foto siswa"
                width={500}
                height={500}
                priority={true}
                className="object-scale-down sm:object-cover"/>
                
                <div className="flex items-center justify-center -mt-10">
                  <div>
                    <p className="text-[20px] md:text-[40px] font-bold text-orange-900">
                      {program.nama}
                    </p>
                    <p className="text-[10px] md:text-[20px] font-bold text-orange-400">
                      {formatCurrency(program.biaya)}
                    </p>
                    <p className="text-center">{program.frekuensi}</p>
                  </div>
                </div>
                <ul className="leading-normal  p-3 text-slate-200">
                  {program.fasilitas.map((elemen, index) => (
                    <li className="flex items-center justify-center space-x-3" key={index}>
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-check-lg w-[20px]"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                      </svg> */}
                      <p className="text-[12px] md:text-sm bg-purple-800">{elemen}</p>
                    </li>
                  ))}
                </ul>
                <Link
                  href={
                    program.keterangan === "Free/Gratis"
                      ? `/form/newmember`
                      : `/layanan/${program.slug}`
                  }
                  className="flex items-center justify-center"
                >
                  <div className="bg-gradient-to-b from-yellow-400 to-white  text-purple-800 mt-5 flex items-center space-x-3 justify-center rounded-full mb-5 md:mb-10 md:w-1/2">
                    <p className="text-center font-semibold px-2 py-4 ">
                      DAFTAR SEKARANG
                    </p>
                    <div className="text-slate-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
         </Carousel>
         </div>
         </div>
      </Layout>
    </>
  );
}
