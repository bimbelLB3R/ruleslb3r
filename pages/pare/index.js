import Image from "next/image";
import { getEnglishData } from "../../utils/englishApi";
import AccordianEng from "../../components/AccordianEng";
import Head from "next/head";

export async function getStaticProps() {
  const data = getEnglishData();
  return {
    props: {
      allEnglish: data.english,
    },
  };
}

export default function index({ allEnglish }) {
  // console.log(allGrammar);
  return (
    <>
      <Head>
        <title>Free Basic English</title>
        <link
          rel="icon"
          type="image/png"
          sizes="4x16"
          href="/image/logolb3r.png"
        />
        <meta
          name="description"
          content="Program gratis buat memperkuat kemampuan bahasa inggrismu"
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
              src="/image/assets/pare.jpeg"
              width={300}
              height={300}
              alt="pare"
              priority={true}
              className=""
            />
          </div>

          <div className="">
            <AccordianEng allEnglish={allEnglish} />
          </div>
        </div>
      </div>
    </>
  );
}
