import Youtube from "../../../components/Youtube";
import { getEnglishData } from "../../../utils/englishApi";
import { useRouter } from "next/router";

export default function Detail({ detailEnglish, allEnglish }) {
  const router = useRouter();
  const theme = router.query.theme;
  const idEng = router.query.id;
  return (
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
