import Image from "next/image";
import { getMathData } from "../../utils/mathApi";
import AccordianMath from "../../components/AccordianMath";
import AccordianMathSmp from "../../components/AccordianMathSmp";
import Head from "next/head";

export async function getStaticProps() {
  const data = getMathData();
  return {
    props: {
      allMath: data.math,
    },
  };
}

export default function index({ allMath }) {
  // console.log(allGrammar);
  return (
    <>
      <Head>
        <title>Free Basic Math</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Program gratis buat memperkuat kemampuan matematikamu"
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
                Matematika SMA
              </p>
              <AccordianMath allMath={allMath} />
            </div>
            <div className="border-4 border-blue-900 mb-8 relative">
              <p className="bg-blue-900 text-gray-100 flex justify-center p-2 m-2 absolute transform  -top-8 font-bold text-xl">
                Matematika SMP
              </p>
              <AccordianMathSmp allMath={allMath} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
