import Youtube from "../../../components/Youtube";
import { getEnglishData } from "../../../utils/englishApi";

export default function Detail({ detailEnglish, allEnglish }) {
  return (
    <div className="flex items-center justify-center m-auto">
      <div>
        <div className="">
          <Youtube videoId={detailEnglish.videoId} />
        </div>

        <div>
          <h1>{detailEnglish.title}</h1>
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
