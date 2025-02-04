import { useRouter } from "next/router";
import Youtube from "../../../components/Youtube";
import { getKonsulData } from "../../../utils/konsulApi";
import Head from "next/head";

export default function Detail({ detailKonsul, allKonsul }) {
  const router = useRouter();
  const praktisi = router.query.praktisi;
  const idKonsul = router.query.id;
  return (
    <>
      <Head>
        <title>Konsultasi Jurusan</title>
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
              videoId={detailKonsul.videoId}
              praktisi={praktisi}
              allKonsul={allKonsul}
              id={idKonsul}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const data = await getKonsulData();
  const allKonsul = data.konsul;

  const paths = allKonsul.map((konsul) => ({
    params: { slug: konsul.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getKonsulData();
  const allKonsul = data.konsul;
  const konsulSlug = params.slug;
  // Find the post with a matching id
  const detailKonsul = allKonsul.find((konsul) => konsul.slug == konsulSlug);

  return {
    props: {
      detailKonsul,
      allKonsul,
    },
  };
}
