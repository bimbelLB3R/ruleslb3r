import Image from "next/image";
import { getKonsulData } from "../../utils/konsulApi";
import AccordianKonsulSmanta from "../../components/AccordianKonsulSmanta";
import AccordianKonsulSmanduta from "../../components/AccordianKonsulSmanduta";
import Head from "next/head";
import AccordianKonsulMan1 from "../../components/AccordianKonsulMan1";

export async function getStaticProps() {
  const data = getKonsulData();
  return {
    props: {
      allKonsul: data.konsul,
    },
  };
}

export default function index({ allKonsul }) {
  // console.log(allGrammar);
  return (
    <>
      <Head>
        <title>Rekaman Konsultasi Pemilihan Jurusan</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Konsultasi pemilihan jurusan kuliah"
          key="desc"
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://raw.githubusercontent.com/bimbelLB3R/ruleslb3r/main/public/image/image1.webp"
        />
      </Head>
      <div className="p-4 sm:p-0 w-full md:max-w-xl sm:flex sm:items-center sm:justify-center sm:m-auto">
        <div>
          <div className="flex items-center justify-center">
            <Image
              src="/image/image4.webp"
              width={300}
              height={300}
              alt="math"
              priority={true}
              className=""
            />
          </div>

          <div className="">
            <div className="border-4 border-sky-300 mb-8 relative">
              <p className="bg-sky-300 text-gray-100 flex justify-center p-2 m-2 absolute transform  -top-8 font-bold text-xl">
                SMAN 1 Tanjung
              </p>
              <AccordianKonsulSmanta allKonsul={allKonsul} />
            </div>
            <div className="border-4 border-blue-900 mb-8 relative">
              <p className="bg-blue-900 text-gray-100 flex justify-center p-2 m-2 absolute transform  -top-8 font-bold text-xl">
                SMAN 2 Tanjung
              </p>
              <AccordianKonsulSmanduta allKonsul={allKonsul} />
            </div>
            <div className="border-4 border-orange-900 mb-8 relative">
              <p className="bg-orange-900 text-gray-100 flex justify-center p-2 m-2 absolute transform  -top-8 font-bold text-xl">
                MAN 1 Tabalong
              </p>
              <AccordianKonsulMan1 allKonsul={allKonsul} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
