import Youtube from "../../../components/Youtube";
import { getEnglishData } from "../../../utils/englishApi";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Detail({ detailEnglish, allEnglish }) {
  const router = useRouter();
  const theme = router.query.theme;
  const idEng = router.query.id;
  return (
    <>
      <Head>
        <title>Free Basic Math-{theme}</title>
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
      <div className="flex items-center justify-center m-auto ">
        <div>
          <div className="shadow-2xl p-4">
            <Youtube
              videoId={detailEnglish.videoId}
              theme={theme}
              allEnglish={allEnglish}
              id={idEng}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const data = await getEnglishData();
  const allEnglish = data.english;

  const paths = allEnglish.map((english) => ({
    params: { slug: english.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getEnglishData();
  const allEnglish = data.english;
  const englishSlug = params.slug;
  // Find the post with a matching id
  const detailEnglish = allEnglish.find(
    (english) => english.slug == englishSlug
  );

  return {
    props: {
      detailEnglish,
      allEnglish,
    },
  };
}
