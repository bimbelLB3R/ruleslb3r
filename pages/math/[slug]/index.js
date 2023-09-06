import { useRouter } from "next/router";
import Youtube from "../../../components/Youtube";
import { getMathData } from "../../../utils/mathApi";
import Head from "next/head";

export default function Detail({ detailMath, allMath }) {
  const router = useRouter();
  const bab = router.query.bab;
  const idMath = router.query.id;
  return (
    <>
      <Head>
        <title>Free Basic Math-{bab}</title>
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
      <div className="flex items-center justify-center m-auto ">
        <div>
          <div className="shadow-2xl p-4">
            <Youtube
              videoId={detailMath.videoId}
              bab={bab}
              allMath={allMath}
              id={idMath}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const data = await getMathData();
  const allMath = data.math;

  const paths = allMath.map((math) => ({
    params: { slug: math.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getMathData();
  const allMath = data.math;
  const mathSlug = params.slug;
  // Find the post with a matching id
  const detailMath = allMath.find((math) => math.slug == mathSlug);

  return {
    props: {
      detailMath,
      allMath,
    },
  };
}
