import Youtube from "../../../components/Youtube";
import { getEnglishData } from "../../../utils/englishApi";

export default function Detail({ detailEnglish2, allEnglish2 }) {
  return (
    <div className="flex items-center justify-center m-auto">
      <div>
        <div className="">
          <Youtube videoId={detailEnglish2.videoId} />
        </div>

        <div>
          <h1>{detailEnglish2.title}</h1>
        </div>
      </div>
    </div>
  );
}
export async function getStaticPaths() {
  const data = await getEnglishData();
  const allEnglish2 = data.english;

  const paths = allEnglish2.map((english2) => ({
    params: { slug: english2.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getEnglishData();
  const allEnglish2 = data.english;
  const englishSlug = params.slug;
  // Find the post with a matching id
  const detailEnglish2 = allEnglish2.find(
    (english2) => english2.slug == englishSlug
  );

  return {
    props: {
      detailEnglish2,
      allEnglish2,
    },
  };
}
